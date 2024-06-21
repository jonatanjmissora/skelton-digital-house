import { cookies, headers } from "next/headers";

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