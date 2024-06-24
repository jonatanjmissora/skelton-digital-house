import { httpPost } from "./http.services";

type LoginTypes = {
  email: string;
  password: string;
}

export const logout = async () => {
  return await httpPost("api/auth/logout")
}

export const login = async ({ email, password }: LoginTypes) => {
  return httpPost("api/auth/login", { email, password })
}
