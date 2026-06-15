// src/pages/PageBuilder/PageBuilder.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePage, useUpdatePageSections } from "../../hooks/usePages";
import useBuilderStore from "../../store/builderStore";
import { getSection } from "../../sections/registry";
import AddSectionMenu from "../../components/AddSectionMenu";
import SectionSettingsPanel from "../../components/SectionSettingsPanel";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import styles from "./PageBuilder.module.css";

// Simple debounce
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const PageBuilder = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();

  const { selectedSectionId, selectSection, clearSelection } =
    useBuilderStore();
  const { data: page, isLoading, error, refetch } = usePage({ id: pageId });
  const updateSectionsMutation = useUpdatePageSections();

  const [sections, setSections] = useState([]);
  const prevPageIdRef = useRef();

  // Sync when page changes
  useEffect(() => {
    if (page?.id && prevPageIdRef.current !== page.id) {
      prevPageIdRef.current = page.id;
      setSections(page.sections || []);
    }
  }, [page]);

  // Save to server (optimistic update is done by caller before calling this)
  const persistSections = useCallback(
    (newSections, showToast = false) => {
      updateSectionsMutation.mutate(
        { pageId, sections: newSections },
        {
          onSuccess: () => {
            if (showToast) toast.success("ذخیره شد");
          },
          onError: () => {
            toast.error("خطا در ذخیره");
          },
        },
      );
    },
    [pageId, updateSectionsMutation],
  );

  // Debounced persist for typing
  const debouncedPersist = useRef(
    debounce((newSections) => persistSections(newSections, false), 600),
  ).current;

  // ----- Handlers -----
  const handleAddSection = (newSection) => {
    const newSections = [...sections, newSection];
    setSections(newSections);
    persistSections(newSections, true);
  };

  const handleUpdateSectionProps = (sectionId, newProps) => {
    const updated = sections.map((sec) =>
      sec.id === sectionId ? { ...sec, props: newProps } : sec,
    );
    setSections(updated);
    debouncedPersist(updated);
  };

  const handleDeleteSection = (sectionId) => {
    const newSections = sections.filter((sec) => sec.id !== sectionId);
    setSections(newSections);
    persistSections(newSections, true);
    if (selectedSectionId === sectionId) clearSelection();
  };

  const moveSection = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    )
      return;
    const newSections = [...sections];
    const target = direction === "up" ? index - 1 : index + 1;
    [newSections[index], newSections[target]] = [
      newSections[target],
      newSections[index],
    ];
    setSections(newSections);
    persistSections(newSections, true);
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
        <h1>ویرایشگر صفحه: {page.name}</h1>
        <button
          onClick={() => navigate("/admin")}
          className={styles.backButton}
        >
          داشبورد
        </button>
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
      {updateSectionsMutation.isPending && (
        <div className={styles.savingIndicator}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default PageBuilder;
