export const getUserData = async (token: string) => {

    const res = await fetch(`http://localhost:3000/api/user`, {
        method: "GET",
        cache: 'no-cache',
        headers:  {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    console.log("ahi llego", res.status)
    if (!res.ok) {
      console.log(`${res.status} - ${res.statusText}`)
      throw new Error("Failed to post: " + "/api/user")
    }
    return res.json();
  }