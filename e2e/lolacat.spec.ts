import fs from "node:fs";
import { expect, test } from "@playwright/test";
import jsQR from "jsqr";
import { PNG } from "pngjs";

test.describe("Lolacat>< Complete Digital Menu E2E", () => {
  test("splash -> Arabic RTL -> category -> search -> details -> admin CRUD -> QR download & decode", async ({
    page,
  }) => {
    // 1. Open the application
    await page.goto("/");

    // 2. See the noodle bowl splash screen
    const splash = page.getByTestId("noodle-splash-screen");
    await expect(splash).toBeVisible();
    await expect(page.getByAltText("Lolacat>< ramen noodle bowl")).toBeVisible();

    // 3. Enter the public menu (wait for auto-transition or click enter)
    await expect(splash).toBeHidden({ timeout: 5000 });
    await expect(page.getByRole("heading", { name: /Little bites\. Big happiness\./i })).toBeVisible();

    // 4. Switch to Arabic
    await page.getByTestId("lang-btn-ar").click();

    // 5. Verify RTL layout
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.getByRole("heading", { name: "لقيمات صغيرة.. سعادة كبيرة." })).toBeVisible();

    // Switch back to EN or continue in Arabic (test Sushi Rolls in Arabic!)
    // 6. Open Sushi Rolls
    await page.getByTestId("category-card-sushi-rolls").click();
    await expect(page).toHaveURL(/\/menu\/category\/cat-sushi-rolls/);
    await expect(page.getByRole("heading", { name: "لفائف السوشي" })).toBeVisible();

    // 7. Search for a dish (bilingual search works in either language!)
    await page.getByTestId("menu-search-input").fill("Dragon");
    await expect(page.getByTestId("menu-item-card-dragon-roll")).toBeVisible();

    // 8. Open item details
    await page.getByTestId("menu-item-card-dragon-roll").click();
    await expect(page).toHaveURL(/\/menu\/item\/item-dragon-roll/);
    await expect(page.getByRole("heading", { name: "دراجون رول" })).toBeVisible();

    // 9. Return to the main menu
    await page.getByRole("article").getByRole("link", { name: "تصفح القائمة الكاملة" }).click();
    await expect(page).toHaveURL(/\/$/);

    // Switch back to EN for English admin assertions
    await page.getByTestId("lang-btn-en").click();
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

    // 10. Open admin dashboard
    await page.goto("/admin");
    await expect(page.getByRole("heading", { name: "Dashboard Overview" })).toBeVisible();

    // 11. Add a new dish
    await page.goto("/admin/items");
    await page.getByTestId("add-item-btn").click();
    await page.locator('input[name="nameEn"]').fill("Kawaii Miso Roll");
    await page.locator('input[name="nameAr"]').fill("رول ميسو كاواي");
    await page.locator('textarea[name="descEn"]').fill("Rich miso-glazed salmon roll.");
    await page.locator('textarea[name="descAr"]').fill("رول سلمون بصلصة الميسو الغنية.");
    await page.locator('input[name="ingredientsEn"]').fill("Salmon, Miso Glaze, Rice");
    await page.locator('input[name="ingredientsAr"]').fill("سلمون، ميسو، أرز");
    await page.getByTestId("save-item-btn").click();

    await expect(page.getByTestId("admin-item-row-kawaii-miso-roll")).toBeVisible();

    // 12. Verify it appears in the public menu
    await page.goto("/");
    const publicCard = page.getByTestId("menu-item-card-kawaii-miso-roll");
    await expect(publicCard).toBeVisible();
    await expect(publicCard).not.toContainText("Currently Unavailable");

    // 13. Change its availability
    await page.goto("/admin/items");
    await page.locator('[data-testid="toggle-avail-kawaii-miso-roll"]:visible').first().click();

    // 14. Verify it is no longer available to customers
    await page.goto("/");
    const updatedCard = page.getByTestId("menu-item-card-kawaii-miso-roll");
    await expect(updatedCard).toContainText("Currently Unavailable");

    // 15. Generate a QR code
    await page.goto("/admin/qr-code");
    await expect(page.getByTestId("qr-canvas-wrapper")).toBeVisible();
    const expectedOriginUrl = `${new URL(page.url()).origin}/`;
    await expect(page.getByTestId("qr-url-input")).toHaveValue(expectedOriginUrl);

    // 16. Download the QR code
    const downloadPromise = page.waitForEvent("download");
    await page.getByTestId("download-qr-png").click();
    const download = await downloadPromise;
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();

    // 17. Verify the generated QR contains the correct public URL
    const buffer = fs.readFileSync(downloadPath!);
    const png = PNG.sync.read(buffer);
    const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
    expect(decoded?.data).toBe(expectedOriginUrl);
  });

  test("responsive layout has zero horizontal overflow across required viewports", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.sessionStorage.setItem("lolacat_splash_seen_v1", "1");
    });

    for (const width of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(hasOverflow, `Horizontal overflow at width ${width}px`).toBe(false);
    }
  });
});
