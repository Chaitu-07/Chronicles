const API_URL = import.meta.env.VITE_API_URL;

export async function getRecord(slug) {
  const response = await fetch(
    `${API_URL}/records/${slug}`
  );

  if (!response.ok) {
    throw new Error("Historical record not found");
  }

  return response.json();
}

export async function getRecords() {
  const response = await fetch(
    `${API_URL}/records`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical records");
  }

  return response.json();
}