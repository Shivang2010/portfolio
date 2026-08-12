const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) throw new Error("Could not load projects");
  return response.json();
}

export async function sendMessage(formData) {
  const response = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not send message");
  }

  return data;
}
