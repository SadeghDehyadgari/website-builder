// src/pages/PageBuilder/PageBuilder.jsx
import { useParams, useNavigate, useBlocker } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { usePage, useUpdatePageSections } from "../../hooks/usePages";
import useBuilderStore from "../../store/builderStore";
import { getSection } from "../../sections/registry";
import AddSectionMenu from "../../components/AddSectionMenu";
import SectionSettingsPanel from "../../components/SectionSettingsPanel";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";
import styles from "./PageBuilder.module.css";

const PageBuilder = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { selectedSectionId, selectSection, clearSelection } =
    useBuilderStore();

  const { data: page, isLoading, error, refetch } = usePage({ id: pageId });
  const updateSectionsMutation = useUpdatePageSections();

  const [sections, setSections] = useState(page?.sections || []);
  const [isDirty, setIsDirty] = useState(false);

  // [FIX] Adjusting state during rendering (React Best Practice)
  const [lastSyncedPageId, setLastSyncedPageId] = useState(page?.id);
  if (page?.id && page.id !== lastSyncedPageId) {
    setLastSyncedPageId(page.id);
    setSections(page.sections || []);
    setIsDirty(false);
  }

  const blocker = useBlocker(isDirty);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleSave = useCallback(() => {
    updateSectionsMutation.mutate(
      { pageId, sections },
      {
        onSuccess: () => {
          setIsDirty(false);
          toast.success("تغییرات با موفقیت ذخیره شد");
        },
        onError: () => {
          toast.error("خطا در ذخیره تغییرات");
        },
      },
    );
  }, [pageId, sections, updateSectionsMutation]);

  const handleAddSection = (newSection) => {
    setSections((prev) => [...prev, newSection]);
    setIsDirty(true);
  };

  const handleUpdateSectionProps = (sectionId, newProps) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId ? { ...sec, props: newProps } : sec,
      ),
    );
    setIsDirty(true);
  };

  const handleDeleteSection = (sectionId) => {
    setSections((prev) => prev.filter((sec) => sec.id !== sectionId));
    setIsDirty(true);
    if (selectedSectionId === sectionId) clearSelection();
  };

  const moveSection = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    )
      return;

    setSections((prev) => {
      const newSections = [...prev];
      const target = direction === "up" ? index - 1 : index + 1;
      [newSections[index], newSections[target]] = [
        newSections[target],
        newSections[index],
      ];
      return newSections;
    });
    setIsDirty(true);
  };

  const renderSectionWithControls = (section, idx) => {
    const entry = getSection(section.type);
    if (!entry) {
      return (
        <div key={section.id} className={styles.unknownSection}>
          نوع سکشن نامعتبر: {section.type}
        </div>
      );
    }
    const { Component } = entry;
    const isSelected = selectedSectionId === section.id;
    return (
      <div
        key={section.id}
        className={`${styles.sectionCard} ${isSelected ? styles.selected : ""}`}
        onClick={() => selectSection(section.id)}
      >
        <div className={styles.sectionControls}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              moveSection(idx, "up");
            }}
            disabled={idx === 0}
            className={styles.moveButton}
            title="انتقال به بالا"
          >
            ↑
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              moveSection(idx, "down");
            }}
            disabled={idx === sections.length - 1}
            className={styles.moveButton}
            title="انتقال به پایین"
          >
            ↓
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteSection(section.id);
            }}
            className={styles.deleteButton}
            title="حذف سکشن"
          >
            🗑️
          </button>
        </div>
        <div className={styles.sectionPreview}>
          <Component {...section.props} />
        </div>
      </div>
    );
  };

  if (isLoading)
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );

  if (error || !page)
    return (
      <div className={styles.errorContainer}>
        <ErrorMessage
          message="خطا در بارگذاری صفحه"
          onRetry={() => refetch()}
        />
        <button
          onClick={() => navigate("/admin")}
          className={styles.backButton}
        >
          بازگشت به داشبورد
        </button>
      </div>
    );

  return (
    <div className={styles.pageBuilder}>
      <header className={styles.header}>
        <div className={styles.headerTitleWrapper}>
          <h1>ویرایشگر صفحه: {page.name}</h1>
          {isDirty && <span className={styles.unsavedBadge}>ذخیره نشده *</span>}
        </div>

        <div className={styles.headerActions}>
          <button
            onClick={() => navigate("/admin")}
            className={styles.backButton}
          >
            داشبورد
          </button>

          <button
            onClick={handleSave}
            className={`${styles.saveBtn} ${isDirty ? styles.dirty : ""}`}
            disabled={!isDirty || updateSectionsMutation.isPending}
          >
            {updateSectionsMutation.isPending ? (
              <LoadingSpinner />
            ) : (
              "ذخیره تغییرات"
            )}
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.sectionsList}>
          <div className={styles.addSectionWrapper}>
            <AddSectionMenu onAdd={handleAddSection} />
          </div>
          {sections.length === 0 && (
            <div className={styles.emptyState}>
              <p>هیچ سکشنی وجود ندارد. از دکمه بالا سکشن اضافه کنید.</p>
            </div>
          )}
          {sections.map((s, i) => renderSectionWithControls(s, i))}
        </div>
        <SectionSettingsPanel
          sections={sections}
          onUpdateSection={handleUpdateSectionProps}
        />
      </div>

      <Modal
        isOpen={blocker.state === "blocked"}
        onClose={() => blocker.reset()}
        title="تغییرات ذخیره نشده"
      >
        <div className={styles.blockerContent}>
          <p>
            شما تغییرات ذخیره نشده‌ای دارید. آیا مطمئنید که می‌خواهید این صفحه
            را ترک کنید؟
          </p>
          <div className={styles.blockerActions}>
            <button
              className={styles.blockerCancelBtn}
              onClick={() => blocker.reset()}
            >
              ماندن در صفحه
            </button>
            <button
              className={styles.blockerConfirmBtn}
              onClick={() => blocker.proceed()}
            >
              ترک صفحه (بدون ذخیره)
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PageBuilder;
