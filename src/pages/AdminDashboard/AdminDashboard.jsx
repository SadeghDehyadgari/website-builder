import { useState } from "react";
import { useNavigate } from "react-router-dom";
// [UPDATED] Added useUpdatePage to imports
import {
  usePages,
  useCreatePage,
  useDeletePage,
  useUpdatePage,
} from "../../hooks/usePages";
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
  // [NEW] Update mutation hook
  const updatePageMutation = useUpdatePage();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

  // [NEW] Edit modal states
  const [editTarget, setEditTarget] = useState(null); // { id, name, slug }
  const [editPageName, setEditPageName] = useState("");
  const [editPageSlug, setEditPageSlug] = useState("");

  // Form state for create page (using 'name' not 'title')
  const [newPageName, setNewPageName] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");

  // [UPDATED] Added excludeId to prevent duplicate error when editing the same page
  const isSlugDuplicate = (slug, excludeId = null) => {
    return pages.some(
      (page) =>
        page.slug.toLowerCase() === slug.toLowerCase() && page.id !== excludeId,
    );
  };

  // [UPDATED] Added excludeId parameter
  const validateSlug = (slug, excludeId = null) => {
    if (!slug.trim()) return "Slug نمی‌تواند خالی باشد";
    if (slug.includes(" ")) return "Slug نباید شامل فاصله باشد";
    if (!/^[a-zA-Z0-9-]+$/.test(slug))
      return "Slug فقط می‌تواند شامل حروف انگلیسی، اعداد و خط تیره باشد";
    if (isSlugDuplicate(slug, excludeId))
      return "این Slug قبلاً استفاده شده است";
    return null;
  };

  const handleCreatePage = (e) => {
    e.preventDefault();
    const slugError = validateSlug(newPageSlug); // excludeId is null by default
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

  // [NEW] Handlers for Edit Modal (Command pattern)
  const handleEditClick = (page) => {
    setEditTarget({ id: page.id, name: page.name, slug: page.slug });
    setEditPageName(page.name);
    setEditPageSlug(page.slug);
  };

  // [NEW] Centralized command to reset and close edit modal (Tell, don't ask)
  const closeEditModal = () => {
    setEditTarget(null);
    setEditPageName("");
    setEditPageSlug("");
  };

  const handleUpdatePage = (e) => {
    e.preventDefault();
    if (!editTarget) return;

    // Pass editTarget.id to exclude current page from duplicate check
    const slugError = validateSlug(editPageSlug, editTarget.id);
    if (slugError) {
      toast.error(slugError);
      return;
    }
    if (!editPageName.trim()) {
      toast.error("نام صفحه الزامی است");
      return;
    }

    updatePageMutation.mutate(
      {
        id: editTarget.id,
        data: { name: editPageName.trim(), slug: editPageSlug.trim() },
      },
      {
        onSuccess: () => {
          toast.success(`صفحه "${editPageName}" با موفقیت ویرایش شد`);
          closeEditModal();
        },
        onError: (err) => {
          toast.error(`خطا در ویرایش صفحه: ${err.message}`);
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
                {/* [UPDATED] Changed to open edit modal for name/slug */}
                <button
                  className={styles.editBtn}
                  onClick={() => handleEditClick(page)}
                  disabled={updatePageMutation.isPending}
                >
                  ویرایش نام
                </button>
                {/* [NEW] Button to navigate to the visual builder */}
                <button
                  className={styles.builderBtn}
                  onClick={() => navigate(`/admin/builder/${page.id}`)}
                >
                  ویرایشگر
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

      {/* [NEW] Modal for editing page name and slug */}
      <Modal
        isOpen={!!editTarget}
        onClose={closeEditModal}
        title="ویرایش اطلاعات صفحه"
      >
        <form onSubmit={handleUpdatePage} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="edit-name">نام صفحه</label>
            <input
              id="edit-name"
              type="text"
              value={editPageName}
              onChange={(e) => setEditPageName(e.target.value)}
              placeholder="مثال: درباره ما"
              disabled={updatePageMutation.isPending}
              autoFocus
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="edit-slug">Slug (آدرس یکتا)</label>
            <input
              id="edit-slug"
              type="text"
              value={editPageSlug}
              onChange={(e) => setEditPageSlug(e.target.value.toLowerCase())}
              placeholder="مثال: about-us"
              disabled={updatePageMutation.isPending}
              dir="ltr"
            />
            <small>فقط حروف انگلیسی، اعداد و خط تیره - بدون فاصله</small>
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={closeEditModal}
              disabled={updatePageMutation.isPending}
            >
              انصراف
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={updatePageMutation.isPending}
            >
              {updatePageMutation.isPending ? (
                <LoadingSpinner />
              ) : (
                "ذخیره تغییرات"
              )}
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
