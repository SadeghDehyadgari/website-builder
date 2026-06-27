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
// [NEW] Import the extracted form component
import PageForm from "./PageForm";
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

  // [UPDATED] Edit modal states
  // We only need to track the target page. Form inputs are now managed inside PageForm.
  const [editTarget, setEditTarget] = useState(null); // { id, name, slug }

  // [REMOVED] newPageName, newPageSlug, editPageName, editPageSlug
  // [NEW] Reason: PageForm now handles its own internal state, eliminating redundant parent state.

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

  // [UPDATED] Now receives clean formData from PageForm instead of event object
  const handleCreatePage = (formData) => {
    const slugError = validateSlug(formData.slug); // excludeId is null by default
    if (slugError) {
      toast.error(slugError);
      return;
    }
    if (!formData.name.trim()) {
      toast.error("نام صفحه الزامی است");
      return;
    }

    // Use 'name' and 'slug' as expected by pagesApi.createPage
    createPageMutation.mutate(formData, {
      onSuccess: (newPage) => {
        toast.success(`صفحه "${newPage.name}" با موفقیت ایجاد شد`);
        closeFormModal();
        navigate(`/admin/builder/${newPage.id}`);
      },
      onError: (err) => {
        toast.error(`خطا در ایجاد صفحه: ${err.message}`);
      },
    });
  };

  // [NEW] Handlers for Edit Modal (Command pattern)
  const handleEditClick = (page) => {
    setEditTarget({ id: page.id, name: page.name, slug: page.slug });
  };

  // [NEW] Centralized command to reset and close form modal (Tell, don't ask)
  const closeFormModal = () => {
    setIsCreateModalOpen(false);
    setEditTarget(null);
  };

  // [UPDATED] Now receives clean formData from PageForm instead of event object
  const handleUpdatePage = (formData) => {
    if (!editTarget) return;

    // Pass editTarget.id to exclude current page from duplicate check
    const slugError = validateSlug(formData.slug, editTarget.id);
    if (slugError) {
      toast.error(slugError);
      return;
    }
    if (!formData.name.trim()) {
      toast.error("نام صفحه الزامی است");
      return;
    }

    updatePageMutation.mutate(
      {
        id: editTarget.id,
        data: formData,
      },
      {
        onSuccess: () => {
          toast.success(`صفحه "${formData.name}" با موفقیت ویرایش شد`);
          closeFormModal();
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

  // [NEW] Derived state for cleaner JSX rendering
  const isFormModalOpen = isCreateModalOpen || !!editTarget;

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

      {/* [UPDATED] Unified Modal for both Create and Edit actions to eliminate JSX duplication */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        title={editTarget ? "ویرایش اطلاعات صفحه" : "ایجاد صفحه جدید"}
      >
        {/* [NEW] The 'key' prop forces React to unmount/remount the form when switching 
            between create/edit modes. This guarantees a fresh internal state without 
            needing complex useEffects or manual state resets. (React Best Practice) */}
        <PageForm
          key={editTarget?.id || "create-mode"}
          initialName={editTarget?.name || ""}
          initialSlug={editTarget?.slug || ""}
          onSubmit={editTarget ? handleUpdatePage : handleCreatePage}
          onCancel={closeFormModal}
          isPending={
            createPageMutation.isPending || updatePageMutation.isPending
          }
          submitLabel={editTarget ? "ذخیره تغییرات" : "ایجاد"}
        />
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
