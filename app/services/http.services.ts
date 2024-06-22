export const httpGet = async (endpoint: string, token: string) => {
    const res = await fetch(`http://localhost:3000/${endpoint}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token,
        },
    })
    if (!res.ok) {
        console.log(`${res.status} - ${res.statusText}`)
        throw new Error("Failed to post: " + endpoint)
    }

    return res.json();
}

export const httpPost = async (endpoint: string, data?: object, token?: string) => {
    const res = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        headers: !token
            ? { 'Content-Type': 'application/json' }
            : {
                'Content-Type': 'application/json',
                "Authorization": token
            },
        body: JSON.stringify(data ?? {})
    });
    if (!res.ok) {
        console.log(`${res.status} - ${res.statusText}`)
        throw new Error("Failed to post: " + endpoint)
    }

    return res.json();
}

export const httpDelete = async (endpoint: string, token: string) => {
    console.log(" ************************ ************** ************EN SERVICES")
    const res = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'DELETE',
        headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            },
    });
    if (!res.ok) {
        console.log(`${res.status} - ${res.statusText}`)
        throw new Error("Failed to delete: " + endpoint)
    }

    return res.json();
}