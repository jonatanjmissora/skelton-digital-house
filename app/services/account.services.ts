import { httpGet, httpPatch, httpPost } from "./http.services"

export type ActivityDataTypes = {
    id: number;
    account_id: number;
    type: string;
    description: string;
    origin: string;
    destination: string;
    amount: number;
    dated: string;
    error?: string;
}

export const getAccountData = async (token: string) => {
    return await httpGet("/api/accounts", token)
}

export const editAccountAlias = async (accountId: string, dataObj: object, token: string) => {
    return await httpPatch(`/api/accounts/${accountId}`, token, dataObj)
}

export const getActivityData = async (accountId: string, token: string) => {
    return await httpGet(`/api/accounts/${accountId}/activity`, token)
}

export const postNewActivity = async (accountId: string, newActivity: object, token: string) => {
    return await httpPost(`/api/accounts/${accountId}/transactions`, newActivity, token)
}