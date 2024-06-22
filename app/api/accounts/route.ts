import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"

export type AccountDataTypes = {
  id: number;
  user_id: number;
  cvu: string;
  alias: string;
  available_amount: number;
}

export async function GET() {
  try {
    const token = headers().get("authorization") ?? ""
    const accountResp = await fetch("https://digitalmoney.digitalhouse.com/api/account", {
      cache: "no-cache",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token,
      },
    })

    const accountData = await accountResp.json()

    console.log("***********************  RESPUESTA DEL ENDPOINT : API/ACCOUNTS")
    console.log("ACCOUNT: ", accountData)

    cookies().set(
      'accountid',
      JSON.stringify(accountData.id),
      { expires: new Date(new Date().getTime() + 600000) }
    )

    return new NextResponse(JSON.stringify(accountData), {
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
