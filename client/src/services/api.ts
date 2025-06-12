// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const BASE_URL= "https://secretecho-drzv.onrender.com"


// login
export const login = async (username: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

// register
export const register = async (username: string, email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};

// sendMessage
export const sendMessage = async (token: string, message: string) => {
  const res = await fetch(`${BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });
  return res.json();
};

// fetchMessages
export const fetchMessages = async (token: string, userId: string) => {
  const res = await fetch(`${BASE_URL}/api/conversations/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
};
