import { describe, expect, it } from "vitest";
import { formatError } from "./format-error.ts";

describe("formatError", () => {
  it("Error 메시지를 반환한다", () => {
    expect(formatError(new Error("실패"))).toBe("실패");
  });

  it("Error가 아니면 기본 메시지를 반환한다", () => {
    expect(formatError("nope")).toBe("알 수 없는 오류가 발생했습니다");
  });
});
