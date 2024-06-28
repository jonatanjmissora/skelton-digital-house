import { cookies } from "next/headers";

export const getCookies = () => {
  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';
  return { token, accountId }
}
