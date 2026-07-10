// const BASE_URL = "https://unrollable-psychodelic-dalia.ngrok-free.dev";
const BASE_URL = "http://localhost:8000/";
// const BASE_URL = "https://hr-backend-1y26.onrender.com/";

interface ApiRequest {
  endpoint: string;
  params?: any;
  options?: RequestInit;
}

function getAuthToken(): string | null {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const user = JSON.parse(raw) as { token?: string };
    return user?.token ?? null;
  } catch {
    return null;
  }
}

export async function api<T = unknown>({
  endpoint,
  params,
  options = {},
}: ApiRequest): Promise<T> {
  const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(safeEndpoint, BASE_URL);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, String(value));
    }
  }

  const token = getAuthToken();

  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",

      ...(options.headers as Record<string, string>),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json().catch(() => null);

  // if (!response.ok) {
  //   throw { status: response.status, message: response.statusText, data };
  // }
if (!response.ok) {
  return data as T;
}
  return data as T;
}
