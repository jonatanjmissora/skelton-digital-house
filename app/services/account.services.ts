import { getData, patchData, postData } from "./direct.services";

//*****************************************************************************
//                  ACCOUNT
export const getAccountData = async (token: string) => {
    return getData("api/account", token)
}

export const editAlias = async (accountId: string, dataObj: object, token: string) => {
    return await patchData(`api/accounts/${accountId}`, dataObj, token)
}

//*****************************************************************************
//                  ACTIVITY
export const getActivitiesData = async (accountId: string, token: string) => {
    return getData(`api/accounts/${accountId}/activity`, token)
}

export const getTransactionData = async (transactionId: string, accountId: string, token: string) => {
    return getData(`api/accounts/${accountId}/transactions/${transactionId}`, token)
}

//*****************************************************************************
//                  DEPOSIT
export const postDeposit = async (accountId: string, newDeposit: object, token: string) => {
    return postData(`api/accounts/${accountId}/deposits`, newDeposit, token)
}

//*****************************************************************************
//                  TRANSFERENCE
export const postTransference = async (accountId: string, newTransference: object, token: string) => {
    return postData(`api/accounts/${accountId}/transferences`, newTransference, token)
}

export const postNewActivity = async (accountId: string, newActivity: object, token: string) => {
    return
}

