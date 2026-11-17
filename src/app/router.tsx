import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadingState } from "@/components/feedback/Feedback";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { CustomerLayout } from "@/components/layout/CustomerLayout";

const MainMenuPage = lazy(() => import("@/features/menu/pages/MainMenuPage"));
const CategoryDetailsPage = lazy(() => import("@/features/categories/pages/CategoryDetailsPage"));
const ItemDetailsPage = lazy(() => import("@/features/items/pages/ItemDetailsPage"));
const NotFoundPage = lazy(() => import("@/features/menu/pages/NotFoundPage"));

const AdminOverviewPage = lazy(() => import("@/features/admin/pages/AdminOverviewPage"));
const AdminItemsPage = lazy(() => import("@/features/admin/pages/AdminItemsPage"));
const AdminCategoriesPage = lazy(() => import("@/features/admin/pages/AdminCategoriesPage"));
const AdminQrCodePage = lazy(() => import("@/features/admin/pages/AdminQrCodePage"));
const AdminSettingsPage = lazy(() => import("@/features/admin/pages/AdminSettingsPage"));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingState />}>
        <Routes>
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<MainMenuPage />} />
            <Route path="/menu/category/:categoryId" element={<CategoryDetailsPage />} />
            <Route path="/menu/item/:itemId" element={<ItemDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverviewPage />} />
            <Route path="items" element={<AdminItemsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="qr-code" element={<AdminQrCodePage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
