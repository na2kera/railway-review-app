import test, { expect } from "@playwright/test";

test("メールアドレスとパスワードが空の場合にエラー", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByRole("textbox", { name: "メールアドレス" }).fill("");
  await page.getByRole("textbox", { name: "パスワード" }).fill("");

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toContain("メールアドレスを入力してください");
    dialog.accept();
  });
  await page.getByRole("button", { name: "Submit" }).click();
});

test("メールアドレスの入力に不備がある場合エラー", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByRole("textbox", { name: "メールアドレス" }).fill("example");
  await page.getByRole("textbox", { name: "パスワード" }).fill("password123");

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toContain(
      "メールアドレスは正しい形式ではありません"
    );
    dialog.accept();
  });
  await page.getByRole("button", { name: "Submit" }).click();
});

test("メールアドレスとパスワードが正しいときエラーが出ない", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/login");

  let dialogShown = false;
  page.on("dialog", () => {
    dialogShown = true;
  });

  await page
    .getByRole("textbox", { name: "メールアドレス" })
    .fill("test@example.com");
  await page.getByRole("textbox", { name: "パスワード" }).fill("password123");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForTimeout(1000);
  expect(dialogShown).toBe(false);
});
