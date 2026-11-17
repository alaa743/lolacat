import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppData } from "@/app/providers/AppProvider";
import { PageHeader } from "@/components/common/PageHeader";
import { ConfirmDialog } from "@/components/feedback/Feedback";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input, Select } from "@/components/ui/Input";
import { getLocalizedText, normalizeSearchText } from "@/lib/utils";
import type { MenuCategory, MenuCategoryFormValues, SupportedLanguage } from "@/types";
import { CategoryForm } from "../components/CategoryForm";
import { CategoryTable } from "../components/CategoryTable";

export default function AdminCategoriesPage() {
  const { t, i18n } = useTranslation(["admin", "common"]);
  const {
    categories,
    items,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryActive,
    showToast,
  } = useAppData();

  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<MenuCategory | undefined>(undefined);
  const [deletingCat, setDeletingCat] = useState<MenuCategory | null>(null);
  const [deleteMode, setDeleteMode] = useState<"reassign" | "delete_items">("reassign");
  const [reassignTargetId, setReassignTargetId] = useState<string>("");

  const filteredCategories = useMemo(() => {
    const q = normalizeSearchText(search);
    if (!q) return categories;
    return categories.filter(
      (cat) =>
        normalizeSearchText(cat.name.en).includes(q) ||
        normalizeSearchText(cat.name.ar).includes(q),
    );
  }, [categories, search]);

  const deletingItemCount = deletingCat
    ? items.filter((i) => i.categoryId === deletingCat.id).length
    : 0;

  const otherCategories = deletingCat ? categories.filter((c) => c.id !== deletingCat.id) : [];

  const handleOpenDelete = (cat: MenuCategory) => {
    setDeletingCat(cat);
    const others = categories.filter((c) => c.id !== cat.id);
    if (others.length > 0) {
      setDeleteMode("reassign");
      setReassignTargetId(others[0]?.id ?? "");
    } else {
      setDeleteMode("delete_items");
      setReassignTargetId("");
    }
  };

  const handleFormSubmit = (values: MenuCategoryFormValues) => {
    if (editingCat) {
      const res = updateCategory(editingCat.id, values);
      if (res.success) {
        showToast(t("admin:categories.updatedToast"));
        setDialogOpen(false);
      } else {
        showToast(res.error, "error");
      }
    } else {
      const res = createCategory(values);
      if (res.success) {
        showToast(t("admin:categories.createdToast"));
        setDialogOpen(false);
      } else {
        showToast(res.error, "error");
      }
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingCat) return;
    const strategy =
      deletingItemCount > 0 && deleteMode === "reassign" && reassignTargetId
        ? ({ mode: "reassign", targetCategoryId: reassignTargetId } as const)
        : ({ mode: "delete_items" } as const);

    const res = deleteCategory(deletingCat.id, strategy);
    if (res.success) {
      showToast(t("admin:categories.deletedToast"));
    } else {
      showToast(res.error, "error");
    }
    setDeletingCat(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("admin:categories.title")}
        subtitle={t("admin:categories.subtitle")}
        actions={
          <Button
            onClick={() => {
              setEditingCat(undefined);
              setDialogOpen(true);
            }}
            data-testid="add-category-btn"
          >
            <Plus className="h-4 w-4" />
            <span>{t("admin:categories.addCategory")}</span>
          </Button>
        }
      />

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("admin:categories.searchPlaceholder")}
          className="ps-10"
        />
      </div>

      <CategoryTable
        categories={filteredCategories}
        items={items}
        onEdit={(cat) => {
          setEditingCat(cat);
          setDialogOpen(true);
        }}
        onDelete={handleOpenDelete}
        onToggleActive={(id) => {
          const res = toggleCategoryActive(id);
          if (res.success) showToast(t("admin:categories.updatedToast"));
        }}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCat ? t("admin:categories.editCategory") : t("admin:categories.addCategory")}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            initialCategory={editingCat}
            nextOrder={categories.length + 1}
            onSubmit={handleFormSubmit}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deletingCat)}
        onOpenChange={(open) => {
          if (!open) setDeletingCat(null);
        }}
        title={t("admin:categories.deleteTitle")}
        description={
          deletingItemCount > 0
            ? t("admin:categories.deleteWithItemsDesc", {
                name: deletingCat ? getLocalizedText(deletingCat.name, lang) : "",
                count: deletingItemCount,
              })
            : t("admin:categories.deleteEmptyDesc", {
                name: deletingCat ? getLocalizedText(deletingCat.name, lang) : "",
              })
        }
        confirmLabel={t("common:common.delete")}
        onConfirm={handleConfirmDelete}
      >
        {deletingItemCount > 0 && (
          <div className="bg-brand-pink-soft/60 space-y-3 rounded-2xl border border-brand-pink-border p-4 text-sm">
            {otherCategories.length > 0 && (
              <label className="flex cursor-pointer items-center gap-2 font-medium">
                <input
                  type="radio"
                  checked={deleteMode === "reassign"}
                  onChange={() => setDeleteMode("reassign")}
                  className="accent-brand-burgundy"
                />
                <span>{t("admin:categories.reassignOption")}</span>
              </label>
            )}

            {deleteMode === "reassign" && otherCategories.length > 0 && (
              <Select
                value={reassignTargetId}
                onChange={(e) => setReassignTargetId(e.target.value)}
                aria-label={t("admin:categories.targetCategory")}
              >
                {otherCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {getLocalizedText(c.name, lang)}
                  </option>
                ))}
              </Select>
            )}

            <label className="flex cursor-pointer items-center gap-2 font-medium text-red-700">
              <input
                type="radio"
                checked={deleteMode === "delete_items"}
                onChange={() => setDeleteMode("delete_items")}
                className="accent-red-600"
              />
              <span>{t("admin:categories.deleteAllOption")}</span>
            </label>
          </div>
        )}
      </ConfirmDialog>
    </div>
  );
}
