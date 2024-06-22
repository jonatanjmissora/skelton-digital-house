import { httpGet } from "./http.services";

export const getUserData = async (token: string) => {
  return await httpGet("/api/user", token)
}

export const editUser = async (userId: string, newUser: object, token: string) => {
}

/*
export const getUserData = async () => {

  const res = await fetch(`http://localhost:3000/api/user`, {
    cache: 'no-cache',
    headers: headers()

  });
  if (!res.ok) {
    console.log(`${res.status} - ${res.statusText}`)
    throw new Error("Failed to post: " + "/api/user")
  }

  return res.json();
}

export const editUser2 = async (userId: string, newUser: object, token: string) => {

  const res = await fetch(`http://localhost:3000/api/user`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ userId, newUser })

  });
  if (!res.ok) {
    console.log(`${res.status} - ${res.statusText}`)
    throw new Error("Failed to patch: " + "/api/user")
  }

  return res.json();
}
*/