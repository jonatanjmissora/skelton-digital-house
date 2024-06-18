type LoginTypes = {
  firstname: string;
  lastname: string;
}

export const logout = async () => {
  const res = await fetch(`http://localhost:3000/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    console.log(`${res.status} - ${res.statusText}`)
    throw new Error("Failed to post: " + "/api/auth/logout")
  }
  return res.json();
}

export const login = async ({ firstname, lastname }: LoginTypes) => {
  const res = await fetch(`http://localhost:3000/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstname, lastname })
  });
  if (!res.ok) {
    console.log(`${res.status} - ${res.statusText}`)
    throw new Error("Failed to post: " + "/api/auth/login")
  }
  return res.json();
}
