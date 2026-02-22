/**
 * API client – base HTTP client for all API calls.
 * Per ARCHITECTURE: No API calls inside UI components. Screens call services.
 * TODO: Configure base URL, auth headers, error handling when backend is ready.
 */

const BASE_URL = ""; // TODO: Set when backend exists

export type ApiError = {
  message: string;
  status?: number;
};

export async function apiGet<T>(path: string): Promise<T> {
  // Placeholder – no real network yet
  const url = BASE_URL ? `${BASE_URL}${path}` : path;
  const res = await fetch(url).catch(() => {
    throw { message: "Network error", status: 0 } as ApiError;
  });
  if (!res.ok) {
    throw { message: res.statusText, status: res.status } as ApiError;
  }
  return res.json() as Promise<T>;
}

export async function apiPost<T, B = unknown>(
  path: string,
  body: B
): Promise<T> {
  const url = BASE_URL ? `${BASE_URL}${path}` : path;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {
    throw { message: "Network error", status: 0 } as ApiError;
  });
  if (!res.ok) {
    throw { message: res.statusText, status: res.status } as ApiError;
  }
  return res.json() as Promise<T>;
}
