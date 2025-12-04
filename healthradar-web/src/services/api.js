const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function apiGet(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`);

  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API GET ${path} failed`);
  }

  return res.json();
}
