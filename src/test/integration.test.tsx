import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import App from "@/app/App";
import { STORAGE_KEYS } from "@/config/app.config";
import { BRAND } from "@/config/brand.config";

beforeAll(async () => {
  await import("@/features/menu/pages/MainMenuPage");
});

describe("Lolacat>< Integration Flows", () => {
  it("switches language between English and Arabic and toggles RTL/LTR", async () => {
    window.sessionStorage.setItem(BRAND.SPLASH.SESSION_KEY, "1");
    window.history.pushState({}, "", "/");
    const user = userEvent.setup();

    render(<App />);

    await waitFor(
      () => {
        expect(
          screen.getByRole("heading", { name: /Little bites\. Big happiness\./i }),
        ).toBeInTheDocument();
      },
      { timeout: 6000 },
    );

    await user.click(screen.getByTestId("lang-btn-ar"));
    await waitFor(() => {
      expect(document.documentElement.dir).toBe("rtl");
      expect(document.documentElement.lang).toBe("ar");
      expect(
        screen.getByRole("heading", { name: /لقيمات صغيرة\.\. سعادة كبيرة\./ }),
      ).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("lang-btn-en"));
    await waitFor(() => {
      expect(document.documentElement.dir).toBe("ltr");
      expect(document.documentElement.lang).toBe("en");
    });
  });

  it("navigates to category details, searches, and opens item details", async () => {
    window.sessionStorage.setItem(BRAND.SPLASH.SESSION_KEY, "1");
    window.history.pushState({}, "", "/");
    const user = userEvent.setup();

    render(<App />);

    const sushiCard = await screen.findByTestId("category-card-sushi-rolls", {}, { timeout: 6000 });
    await user.click(sushiCard);

    await waitFor(
      () => {
        expect(screen.getByRole("heading", { name: "Sushi Rolls" })).toBeInTheDocument();
      },
      { timeout: 6000 },
    );

    const searchInput = screen.getByTestId("menu-search-input");
    await user.type(searchInput, "Dragon");

    await waitFor(() => {
      expect(screen.getByTestId("menu-item-card-dragon-roll")).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("menu-item-card-dragon-roll"));

    await waitFor(
      () => {
        expect(screen.getByRole("heading", { name: "Dragon Roll" })).toBeInTheDocument();
        expect(screen.getByText("Shrimp Tempura")).toBeInTheDocument();
      },
      { timeout: 6000 },
    );
  });

  it("supports creating, editing, toggling availability, and deleting a menu item with LocalStorage sync", async () => {
    window.sessionStorage.setItem(BRAND.SPLASH.SESSION_KEY, "1");
    window.history.pushState({}, "", "/admin/items");
    const user = userEvent.setup();

    render(<App />);

    const addBtn = await screen.findByTestId("add-item-btn", {}, { timeout: 6000 });
    await user.click(addBtn);

    await user.type(screen.getByPlaceholderText("e.g. Matcha Ramen Roll"), "Volcano Tuna Roll");
    await user.type(screen.getByPlaceholderText("مثال: رول ماتشا"), "فولكانو تونة رول");

    const textareas = screen.getAllByRole("textbox");
    const descEn = textareas.find((el) => el.getAttribute("name") === "descEn")!;
    const descAr = textareas.find((el) => el.getAttribute("name") === "descAr")!;
    const ingEn = screen.getByPlaceholderText("Salmon, Sushi Rice, Avocado");
    const ingAr = screen.getByPlaceholderText("سلمون، أرز سوشي، أفوكادو");

    await user.type(descEn, "Torched spicy tuna over crispy rice.");
    await user.type(descAr, "تونة حارة محمصة فوق أرز مقرمش.");
    await user.type(ingEn, "Tuna, Crispy Rice");
    await user.type(ingAr, "تونة، أرز مقرمش");

    await user.click(screen.getByTestId("save-item-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("admin-item-row-volcano-tuna-roll")).toBeInTheDocument();
    });

    // Edit the newly created item
    await user.click(screen.getAllByLabelText("Edit Volcano Tuna Roll")[0]!);
    const nameEnInput = screen.getByPlaceholderText("e.g. Matcha Ramen Roll");
    await user.clear(nameEnInput);
    await user.type(nameEnInput, "Volcano Tuna Deluxe");
    await user.click(screen.getByTestId("save-item-btn"));

    await waitFor(() => {
      expect(screen.getAllByText("Volcano Tuna Deluxe").length).toBeGreaterThan(0);
    });

    // Toggle availability off and verify on public menu
    await user.click(screen.getAllByTestId("toggle-avail-volcano-tuna-roll")[0]!);
    expect(window.localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)).toContain("Volcano Tuna Deluxe");

    const previewLink = screen.getAllByRole("link", { name: /Preview Menu/i })[0]!;
    await user.click(previewLink);

    await waitFor(() => {
      const publicCard = screen.getByTestId("menu-item-card-volcano-tuna-roll");
      expect(publicCard).toHaveTextContent("Currently Unavailable");
    });

    // Return to admin and delete the item
    await user.click(screen.getAllByRole("link", { name: /^Admin$/i })[0]!);
    const itemsNav = await screen.findByRole("link", { name: "Menu Items" }, { timeout: 6000 });
    await user.click(itemsNav);

    const deleteBtns = await screen.findAllByLabelText("Delete Volcano Tuna Deluxe");
    await user.click(deleteBtns[0]!);
    await user.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(screen.queryByText("Volcano Tuna Deluxe")).not.toBeInTheDocument();
    });
  });

  it("supports creating and editing a category", async () => {
    window.sessionStorage.setItem(BRAND.SPLASH.SESSION_KEY, "1");
    window.history.pushState({}, "", "/admin/categories");
    const user = userEvent.setup();

    render(<App />);

    const addCatBtn = await screen.findByTestId("add-category-btn", {}, { timeout: 6000 });
    await user.click(addCatBtn);

    await user.type(screen.getByPlaceholderText("e.g. Signature Bento"), "Seasonal Specials");
    await user.type(screen.getByPlaceholderText("مثال: أطباق بنتو"), "أطباق موسمية");

    const textareas = screen.getAllByRole("textbox");
    const descEn = textareas.find((el) => el.getAttribute("name") === "description.en")!;
    const descAr = textareas.find((el) => el.getAttribute("name") === "description.ar")!;
    await user.type(descEn, "Limited seasonal chef creations.");
    await user.type(descAr, "إبداعات الشيف الموسمية.");

    await user.click(screen.getByTestId("save-category-btn"));

    await waitFor(() => {
      expect(screen.getByText("Seasonal Specials")).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText("Edit Seasonal Specials"));
    const catNameInput = screen.getByPlaceholderText("e.g. Signature Bento");
    await user.clear(catNameInput);
    await user.type(catNameInput, "Chef Specials");
    await user.click(screen.getByTestId("save-category-btn"));

    await waitFor(() => {
      expect(screen.getByText("Chef Specials")).toBeInTheDocument();
    });
  });

  it("updates restaurant settings and persists them in LocalStorage", async () => {
    window.sessionStorage.setItem(BRAND.SPLASH.SESSION_KEY, "1");
    window.history.pushState({}, "", "/admin/settings");
    const user = userEvent.setup();

    render(<App />);

    const emailInput = await screen.findByDisplayValue(
      "hello@lolacat.kitchen",
      {},
      { timeout: 6000 },
    );
    await user.clear(emailInput);
    await user.type(emailInput, "orders@lolacat.kitchen");

    await user.click(screen.getByTestId("save-settings-btn"));

    await waitFor(() => {
      expect(screen.getByText("Restaurant settings saved")).toBeInTheDocument();
      expect(window.localStorage.getItem(STORAGE_KEYS.SETTINGS)).toContain(
        "orders@lolacat.kitchen",
      );
    });
  });

  it("filters and sorts menu items using the custom DropdownSelect menus", async () => {
    window.sessionStorage.setItem(BRAND.SPLASH.SESSION_KEY, "1");
    window.history.pushState({}, "", "/");
    const user = userEvent.setup();

    render(<App />);

    const spiceTrigger = await screen.findByTestId("filter-spice-dropdown", {}, { timeout: 6000 });
    await user.click(spiceTrigger);

    const hotOption = await screen.findByRole("option", { name: "Hot" });
    await user.click(hotOption);

    await waitFor(() => {
      const fullMenu = document.getElementById("full-menu")!;
      expect(within(fullMenu).getByTestId("menu-item-card-spicy-miso-ramen")).toBeInTheDocument();
      expect(
        within(fullMenu).queryByTestId("menu-item-card-classic-california-roll"),
      ).not.toBeInTheDocument();
    });
  });
});
