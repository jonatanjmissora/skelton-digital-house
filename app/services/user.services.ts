import { getData, patchData } from "./direct.services";

export const getUserData = async (userId: string, token: string) => {
  return getData(`api/users/${userId}`, token,)
}

export const editUser = async (userId: string, dataObj: object, token: string) => {
  return patchData(`api/users/${userId}`, dataObj, token)
}
  