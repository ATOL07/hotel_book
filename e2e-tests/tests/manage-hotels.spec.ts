import { test, expect } from '@playwright/test';
import path from "path";

const UI_URL = "http://localhost:5173/";
test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);
    await page.getByRole('link', { name: 'Sign in' }).click();
     
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    
      await page.locator("[name=email]").fill("V0N1M@example.com");
      await page.locator("[name=password]").fill("password123");
    
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByText('Signed in successfull!')).toBeVisible();
});


test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotels`)

  await page.locator("[name=name]").fill("Test hotel");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test Country");
  await page.locator("[name=description]").fill("This is a description for the test hotel");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("[name=starRating]", "5");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();


  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();


});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Dublin Getaways");
  await page.locator('[name="name"]').fill("Dublin Getaways UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue(
    "Dublin Getaways UPDATED"
  );
  await page.locator('[name="name"]').fill("Dublin Getaways");
  await page.getByRole("button", { name: "Save" }).click();
});
