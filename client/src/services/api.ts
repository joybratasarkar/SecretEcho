const BASE_URL = "http://localhost:5000"; // or use process.env.NEXT_PUBLIC_API_URL

export const login = async (username: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

// export const register = async (email: string, password: string) => {
//   const res = await fetch(`${BASE_URL}/api/auth/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return res.json();
// };

// api.ts
export const register = async (username: string, email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};



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


export const fetchMessages = async (token: string, userId: string) => {
  const res = await fetch(`${BASE_URL}/api/conversations/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  return res.json();  // returns array of conversation documents with populated messages
};
