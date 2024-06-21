import { AccountDataTypes } from "../api/accounts/route"
import { httpDelete, httpGet, httpPost } from "./http.services"

export type NewCardTypes = {
    cod: number;
    expiration_date: string;
    first_last_name: string;
    number_id: number;
}

export type AccountCardsDataTypes = {
    id: number;
    account_id: number;
    number_id: number;
    first_last_name: string;
    cod: number;
    expiration_date: string;
    error?: string
}

export const getAccountData = async (token: string) => {

    return await httpGet("/api/accounts", token)

}

export const getAccountCardsData = async (accountId: string, token: string) => {

    return await httpGet(`/api/accounts/${accountId}/cards`, token)

}

export const postNewCard = async (accountId: string, newCard: NewCardTypes, token: string) => {
    return await httpPost(`/api/accounts/${accountId}/cards`, newCard, token)
}

export const deleteCard = async (cardId: string, accountId: string, token: string) => {
    return await httpDelete(`/api/accounts/${accountId}/cards/${cardId}`, token)
}