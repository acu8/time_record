import App from "../App";
import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";

// 各テストの前にクリーンアップを実行
beforeEach(() => {
  cleanup();
});

// 各テストの後にクリーンアップを実行
afterEach(() => {
  cleanup();
});

describe("タイトルが表示されること", () => {
  it("title", async () => {
    render(<App />);
    await waitFor(() => {
      const title = screen.getByTestId("title");
      expect(title).toHaveTextContent("学習記録一覧");
    });
  });
});

test("入力をしないで登録を押すとエラーが表示される", async () => {
  render(<App />);

  await waitFor(() => {
    // 登録ボタンをクリック
    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    const errorMessage = screen.getByText("入力されていない項目があります");
    expect(errorMessage).toBeInTheDocument();
  });
});

test("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加される", async () => {
  render(<App />);

  await waitFor(async () => await screen.getByTestId("study-content-input"), {
    timeout: 5000,
  });

  // 学習内容と時間の入力フィールドを取得
  const contentInput = screen.getByTestId("study-content-input");
  console.log(contentInput);
  const timeInput = screen.getByTestId("study-time-input");

  // 学習内容と時間を入力
  fireEvent.change(contentInput, { target: { value: "テスト学習内容" } });
  fireEvent.change(timeInput, { target: { value: "10" } });

  // 登録ボタンをクリック
  const submitButton = screen.getByTestId("submit");
  fireEvent.click(submitButton);

  // 新しい学習記録がリストに追加されたことを確認
  await waitFor(() => {
    const contentElements = screen.getAllByText((content, element) => {
      return element.textContent.includes("テスト学習内容");
    });
    const timeElements = screen.getAllByText((content, element) => {
      return element.textContent.includes("10時間");
    });

    expect(contentElements.length).toBeGreaterThan(0);
    expect(timeElements.length).toBeGreaterThan(0);

    contentElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    timeElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});

test("削除ボタンを押すと学習記録が削除される", async () => {
  render(<App />);

  // 削除ボタンが表示されるまで待機
  await waitFor(() => {
    const deleteButtons = screen.getAllByTestId("delete");
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  // 初期の学習記録の数を取得
  const initialRecords = screen.getAllByTestId("record");

  // 削除ボタンクリック
  const deleteButton = screen.getAllByTestId("delete")[0];
  fireEvent.click(deleteButton);

  // 削除後の学習記録の数を検証
  await waitFor(
    async () => {
      await screen.findAllByTestId("record");
      await new Promise((r) => setTimeout(r, 2000));
    },
    { timeout: 3000 }
  );

  const updatedRecords = await screen.findAllByTestId("record");
  console.log(updatedRecords.length);
  expect(updatedRecords.length).toBe(initialRecords.length - 1);
});
