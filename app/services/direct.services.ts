import { cookies } from "next/headers"

const SWAGGER = "https://digitalmoney.digitalhouse.com/"

export const getData = async (endpoint: string, token?: string, userId?: string) => {
    try {
        const res = await fetch(`${SWAGGER}${endpoint}`, {
            method: "GET",
            headers: !token
                ? { 'Content-Type': 'application/json' }
                : {
                    'Content-Type': 'application/json',
                    "Authorization": token,
                    "Id": userId ?? "",
                },
        })
        if (!res.ok) {
            console.log(`${res.status} - ${res.statusText || "No text error"} - POST - ${SWAGGER}${endpoint}`)
            const response = await res.json()
            throw new Error(response.error)
        }

        return res.json();
    } catch (error) {
        if (error instanceof Error)
            console.log("ERROR", error.message)
    }

}

export const postData = async (endpoint: string, dataObj?: object | null, token?: string) => {
    try {
        const res = await fetch(`${SWAGGER}${endpoint}`, {
            method: 'POST',
            headers: !token
                ? { 'Content-Type': 'application/json' }
                : {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
            body: JSON.stringify(dataObj ?? {})
        });
        if (!res.ok) {
            console.log(`${res.status} - ${res.statusText || "No text error"} - POST - ${SWAGGER}${endpoint}`)
            const response = await res.json()
            throw new Error(response.error)
        }

        console.log("---------------------------------- DATO CREADO en " + endpoint)
        const response = await res.json()
        return response

    } catch (error: any) {
        console.log("ERROR : ", error.message)
        return ({ error: error.message })
    }
}

export const deleteData = async (endpoint: string, token: string) => {
    try {
        const res = await fetch(`${SWAGGER}${endpoint}`, {
            method: 'DELETE',
            headers: !token
                ? { 'Content-Type': 'application/json' }
                : {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
        });
        if (!res.ok) {
            console.log(`${res.status} - ${res.statusText || "No text error"} - POST - ${SWAGGER}${endpoint}`)
            const response = await res.json()
            throw new Error(response.error)
        }

        console.log("---------------------------------- DATO BORRADO en " + endpoint)
        return res.json()

    } catch (error) {
        if (error instanceof Error)
            console.log("ERROR", error.message)
    }
}

export const patchData = async (endpoint: string, dataObj?: object | null, token?: string) => {
    try {
        const res = await fetch(`${SWAGGER}${endpoint}`, {
            method: 'PATCH',
            headers: !token
                ? { 'Content-Type': 'application/json' }
                : {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
            body: JSON.stringify(dataObj ?? {})
        });
        if (!res.ok) {
            console.log(`${res.status} - ${res.statusText || "No text error"} - POST - ${SWAGGER}${endpoint}`)
            const response = await res.json()
            throw new Error(response.error)
        }

        console.log("---------------------------------- DATO EDITADO en " + endpoint)
        const response = await res.json()
        return response

    } catch (error: any) {
        console.log("ERROR : ", error.message)
        return ({ error: error.message })
    }
}