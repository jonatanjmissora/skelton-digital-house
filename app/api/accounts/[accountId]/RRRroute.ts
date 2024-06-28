import { getCookies } from "@/app/services/getCookies.services"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest) {
  try {
    const { token, accountId } = getCookies()
    const body = {
      "alias": "HOLA.MUNDO.REDONDO"
    }
    const alias = { alias: "HOLA.MUNDO.DH" }
    const aliasResp = await fetch(`https://digitalmoney.digitalhouse.com/api/account/${accountId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token,
      },
      body: JSON.stringify(body)
    })

    const aliasData = await aliasResp.json()

    console.log("***********************  RESPUESTA DEL ENDPOINT : API/ACCOUNTS")
    console.log("ALIAS: ", aliasData)

    return new NextResponse(JSON.stringify(aliasData), {
      status: 200,
    })
  } catch (e) {
    if (e instanceof Error)
      console.log("ERROR", e.message)
    return new NextResponse(JSON.stringify({
      error: 'Internal server error'
    }), {
      status: 500,
    })
  }
}