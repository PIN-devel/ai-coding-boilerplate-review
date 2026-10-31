import { afterEach, describe, expect, it, vi } from "vitest";
import { http } from "./http.ts";

describe("http", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("성공 응답의 JSON을 반환한다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1 }),
      }),
    );

    await expect(http<{ id: number }>("/api/example")).resolves.toEqual({ id: 1 });
  });

  it("실패 응답이면 에러를 던진다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    await expect(http("/api/example")).rejects.toThrow("요청이 실패했습니다 (500)");
  });
});
