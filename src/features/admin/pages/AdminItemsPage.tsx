import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppData } from "@/app/providers/AppProvider";
import { PageHeader } from "@/components/common/PageHeader";
import { ConfirmDialog } from "@/components/feedback/Feedback";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { getLocalizedText, normalizeSearchText } from "@/lib/utils";
import type { MenuItem, MenuItemFormValues, SupportedLanguage } from "@/types";
import { AdminFilters, type AdminFilterValues } from "../components/AdminFilters";
import { MenuItemForm } from "../components/MenuItemForm";
import { MenuItemTable } from "../components/MenuItemTable";

export default function AdminItemsPage() {
  const { t, i18n } = useTranslation(["admin", "common"]);
  const {
    items,
    categories,
    settings,
    createItem,
    updateItem,
    deleteItem,
    toggleItemField,
    showToast,
  } = useAppData();

  const lang: SupportedLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  const [filters, setFilters] = useState<AdminFilterValues>({
    search: "",
    categoryId: "",
    availability: "all",
    sortBy: "updated",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>(undefined);
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    const categoryMap = new Map(categories.map((c) => [c.id, c]));
    const normSearch = normalizeSearchText(filters.search);

    const matched = items.filter((item) => {
      if (filters.categoryId && item.categoryId !== filters.categoryId) return false;
      if (filters.availability === "available" && !item.isAvailable) return false;
      if (filters.availability === "unavailable" && item.isAvailable) return false;
      if (normSearch) {
        const cat = categoryMap.get(item.categoryId);
        const haystacks = [item.name.en, item.name.ar, cat?.name.en ?? "", cat?.name.ar ?? ""];
        if (!haystacks.some((h) => normalizeSearchText(h).includes(normSearch))) {
          return false;
        }
      }
      return true;
    });

    if (filters.sortBy === "price_asc") {
      return [...matched].sort((a, b) => a.price - b.price);
    }
    if (filters.sortBy === "price_desc") {
      return [...matched].sort((a, b) => b.price - a.price);
    }
    return [...matched].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [items, categories, filters]);

  const handleOpenCreate = () => {
    setEditingItem(undefined);
    setDialogOpen(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleFormSubmit = (values: MenuItemFormValues) => {
    if (editingItem) {
      const res = updateItem(editingItem.id, values);
      if (res.success) {
        showToast(t("admin:items.updatedToast"));
        setDialogOpen(false);
      } else {
        showToast(res.error, "error");
      }
    } else {
      const res = createItem(values);
      if (res.success) {
        showToast(t("admin:items.createdToast"));
        setDialogOpen(false);
      } else {
        showToast(res.error, "error");
      }
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingItem) return;
    const res = deleteItem(deletingItem.id);
    if (res.success) {
      showToast(t("admin:items.deletedToast"));
    } else {
      showToast(res.error, "error");
    }
    setDeletingItem(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("admin:items.title")}
        subtitle={t("admin:items.subtitle")}
        actions={
          <Button onClick={handleOpenCreate} data-testid="add-item-btn">
            <Plus className="h-4 w-4" />
            <span>{t("admin:items.addItem")}</span>
          </Button>
        }
      />

      <AdminFilters filters={filters} categories={categories} onChange={setFilters} />

      <MenuItemTable
        items={filteredItems}
        categories={categories}
        currency={settings.currency}
        onEdit={handleOpenEdit}
        onDelete={setDeletingItem}
        onToggleField={(id, field) => {
          const res = toggleItemField(id, field);
          if (res.success) {
            showToast(t("admin:items.updatedToast"));
          }
        }}
      />

      {/* Add / Edit Item Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? t("admin:items.editItem") : t("admin:items.addItem")}
            </DialogTitle>
          </DialogHeader>
          <MenuItemForm
            initialItem={editingItem}
            categories={categories}
            onSubmit={handleFormSubmit}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={Boolean(deletingItem)}
        onOpenChange={(open) => {
          if (!open) setDeletingItem(null);
        }}
        title={t("admin:items.deleteTitle")}
        description={t("admin:items.deleteDesc", {
          name: deletingItem ? getLocalizedText(deletingItem.name, lang) : "",
        })}
        confirmLabel={t("common:common.delete")}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
