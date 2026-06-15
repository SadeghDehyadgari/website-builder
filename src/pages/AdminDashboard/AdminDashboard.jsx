// NEW: Full CRUD implementation for Admin Dashboard using 'name' field (matches db.json)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePages, useCreatePage, useDeletePage } from "../../hooks/usePages";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Modal from "../../components/Modal/Modal";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: pages = [], isLoading, isError, error } = usePages();
  const createPageMutation = useCreatePage();
  const deletePageMutation = useDeletePage();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

  // Form state for create page (using 'name' not 'title')
  const [newPageName, setNewPageName] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");

  // Slug duplicate check using existing pages data
  const isSlugDuplicate = (slug) => {
    return pages.some((page) => page.slug.toLowerCase() === slug.toLowerCase());
  };

  const validateSlug = (slug) => {
    if (!slug.trim()) return "Slug نمی‌تواند خالی باشد";
    if (slug.includes(" ")) return "Slug نباید شامل فاصله باشد";
    if (!/^[a-zA-Z0-9-]+$/.test(slug))
      return "Slug فقط می‌تواند شامل حروف انگلیسی، اعداد و خط تیره باشد";
    if (isSlugDuplicate(slug)) return "این Slug قبلاً استفاده شده است";
    return null;
  };

  const handleCreatePage = (e) => {
    e.preventDefault();
    const slugError = validateSlug(newPageSlug);
    if (slugError) {
      toast.error(slugError);
      return;
    }
    if (!newPageName.trim()) {
      toast.error("نام صفحه الزامی است");
      return;
    }

    // Use 'name' and 'slug' as expected by pagesApi.createPage
    createPageMutation.mutate(
      { name: newPageName.trim(), slug: newPageSlug.trim() },
      {
        onSuccess: (newPage) => {
          toast.success(`صفحه "${newPage.name}" با موفقیت ایجاد شد`);
          setIsCreateModalOpen(false);
          setNewPageName("");
          setNewPageSlug("");
          navigate(`/admin/builder/${newPage.id}`);
        },
        onError: (err) => {
          toast.error(`خطا در ایجاد صفحه: ${err.message}`);
        },
      },
    );
  };

  const handleDeleteClick = (page) => {
    setDeleteTarget({ id: page.id, name: page.name });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deletePageMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(`صفحه "${deleteTarget.name}" حذف شد`);
        setDeleteTarget(null);
      },
      onError: (err) => {
        toast.error(`خطا در حذف صفحه: ${err.message}`);
        setDeleteTarget(null);
      },
    });
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage message={error?.message || "خطا در بارگذاری صفحات"} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>مدیریت صفحات</h1>
        <button
          className={styles.createBtn}
          onClick={() => setIsCreateModalOpen(true)}
        >
          + صفحه جدید
        </button>
      </div>

      {/* Grid layout for pages */}
      <div className={styles.grid}>
        {pages.map((page) => (
          <div key={page.id} className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.pageTitle}>{page.name}</h3>
              <p className={styles.pageSlug}>slug: {page.slug}</p>
              <div className={styles.cardActions}>
                <button
                  className={styles.editBtn}
                  onClick={() => navigate(`/admin/builder/${page.id}`)}
                >
                  ویرایش
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteClick(page)}
                  disabled={deletePageMutation.isPending}
                >
                  {deletePageMutation.isPending &&
                  deleteTarget?.id === page.id ? (
                    <LoadingSpinner />
                  ) : (
                    "حذف"
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for creating a new page */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setNewPageName("");
          setNewPageSlug("");
        }}
        title="ایجاد صفحه جدید"
      >
        <form onSubmit={handleCreatePage} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">نام صفحه</label>
            <input
              id="name"
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              placeholder="مثال: درباره ما"
              disabled={createPageMutation.isPending}
              autoFocus
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="slug">Slug (آدرس یکتا)</label>
            <input
              id="slug"
              type="text"
              value={newPageSlug}
              onChange={(e) => setNewPageSlug(e.target.value.toLowerCase())}
              placeholder="مثال: about-us"
              disabled={createPageMutation.isPending}
              dir="ltr"
            />
            <small>فقط حروف انگلیسی، اعداد و خط تیره - بدون فاصله</small>
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => {
                setIsCreateModalOpen(false);
                setNewPageName("");
                setNewPageSlug("");
              }}
              disabled={createPageMutation.isPending}
            >
              انصراف
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={createPageMutation.isPending}
            >
              {createPageMutation.isPending ? <LoadingSpinner /> : "ایجاد"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal isOpen={!!deleteTarget} onClose={cancelDelete} title="حذف صفحه">
        <div className={styles.deleteConfirm}>
          <p>آیا از حذف صفحه "{deleteTarget?.name}" اطمینان دارید؟</p>
          <div className={styles.deleteActions}>
            <button
              className={styles.cancelDeleteBtn}
              onClick={cancelDelete}
              disabled={deletePageMutation.isPending}
            >
              انصراف
            </button>
            <button
              className={styles.confirmDeleteBtn}
              onClick={confirmDelete}
              disabled={deletePageMutation.isPending}
            >
              {deletePageMutation.isPending ? <LoadingSpinner /> : "حذف"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
