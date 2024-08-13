import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login.tsx";

test("メールアドレスとパスワードの入力フィールドが存在すること", () => {
  render(<Login />);

  const emailInput = screen.getByLabelText("メールアドレス");
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute("type", "email");

  const passwordInput = screen.getByLabelText("パスワード");
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute("type", "password");
});

test("ログインボタンが存在すること", () => {
  render(<Login />);

  const loginButton = screen.getByRole("button", { name: "ログイン" });
  expect(loginButton).toBeInTheDocument();
});
