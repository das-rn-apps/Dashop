const API_URL = "http://192.168.31.161:3000/api";

export const request = async (
  endpoint: string,
  method = "GET",
  body?: any,
  token?: string
) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  // console.log(res);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};
