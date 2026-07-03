import { apiClient } from "./client";

export async function loginUser(email: string, password: string) {
  const controller = new AbortController();

  try {
    const { data } = await apiClient.post(
      "/post",
      { email, password },
      { signal: controller.signal }
    );

    return { ok: true, data };
  } catch (err: any) {
    if (err.code === "ECONNABORTED") {
      return { ok: false, error: "Request timed out" };
    }
    return { ok: false, error: err.message };
  }
}
