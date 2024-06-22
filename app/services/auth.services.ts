import { httpGet, httpPost } from "./http.services";

type LoginTypes = {
  email: string;
  password: string;
}

export const logout = async () => {
  return await httpPost("api/auth/logout")
}

export const login = async ({ email, password }: LoginTypes) => {

  const loginRes = await httpPost("api/auth/login", { email, password })

  if (loginRes.token) {

    const userPromise = await httpGet("api/user", loginRes.token)
    const accountPromise = await httpGet("api/accounts", loginRes.token)

    await Promise.all([userPromise, accountPromise])

  }

}
