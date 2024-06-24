const SWAGGER = "https://digitalmoney.digitalhouse.com/"

export const getData = async (endpoint: string, token?: string) => {
    try {
        const res = await fetch(`${SWAGGER}${endpoint}`, {
            method: "GET",
            headers: !token 
            ?{'Content-Type': 'application/json'}
            : {
                'Content-Type': 'application/json',
                "Authorization": token,
            },
        })
        if (!res.ok) {
            console.log(`${res.status} - ${res.statusText}`)
            throw new Error("Failed to get: /api/accounts")
        }
        
        return res.json();
    } catch (error) {
        if(error instanceof Error) 
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
            console.log(`${res.status} - ${res.statusText}`)
            throw new Error("Failed to post: " + endpoint)
        }

        const response = await res.json()
        console.log("---------------------------------- DATO CREADO en " + endpoint)

        return response;
    } catch (error) {
        if(error instanceof Error) 
            console.log("ERROR", error.message)
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
            console.log(`${res.status} - ${res.statusText}`)
            throw new Error("Failed to delete: " + endpoint)
        }

        console.log("---------------------------------- DATO BORRADO en " + endpoint)
        return res.json()

    } catch (error) {
        if(error instanceof Error) 
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
            console.log(`${res.status} - ${res.statusText}`)
            throw new Error("Failed to patch: " + endpoint)
        }

        const response = await res.json()
        console.log("---------------------------------- DATO EDITADO en " + endpoint)

        return response;
    } catch (error) {
        if(error instanceof Error) 
            console.log("ERROR", error.message)
    }
}