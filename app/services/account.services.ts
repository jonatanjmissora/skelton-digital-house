import { ActivityDataTypes } from "../types/account.types";
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

export const getActivityData = async (activityId: string, accountId: string, token: string) => {
    const activityData: ActivityDataTypes[] = await getActivitiesData(accountId, token)
    return activityData.filter(activity => activity.id === +activityId)[0]
}

//*****************************************************************************
//                  DEPOSIT
export const postDeposit = async (accountId: string, newDeposit: object, token: string) => {
    return postData(`api/accounts/${accountId}/deposits`, newDeposit, token)
}
   
//*****************************************************************************
//                  TRANSACTION
export const getTransactionData = async (transactionId: string, accountId: string, token: string) => {
    return getData(`api/accounts/${accountId}/transactions/${transactionId}`, token)
}
export const postTransaction = async (accountId: string, newTransaction: object, token: string) => {
    return postData(`api/accounts/${accountId}/transactions`, newTransaction, token)
}

