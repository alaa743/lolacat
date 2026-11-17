import { Outlet } from "react-router-dom";
import { CustomerHeader } from "./CustomerHeader";
import { RestaurantFooter } from "./RestaurantFooter";

export function CustomerLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-cream text-brand-ink">
      <CustomerHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <RestaurantFooter />
    </div>
  );
}
