import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = headers().get("authorization") ?? ""
    const accountId = request.url.split("/")[5];

    const accountCardsResp = await fetch(`https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards`, {
      cache: "no-cache",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token,
      },
    })

    const accountCardsData = await accountCardsResp.json()

    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/ACCOUNTS/${accountId}/CARDS}`)
    console.log("ACCOUNT CARDS", accountCardsData)

    return new NextResponse(JSON.stringify(accountCardsData), {
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



export async function POST(request: NextRequest) {

  try {
    const newCard = await request.json();
    const token = cookies().get("token")?.value ?? ""
    const accountId = cookies().get("accountid")?.value ?? ""

    const newCardResp = await fetch(`https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token,
      },
      body: JSON.stringify(newCard),
    })

    const newCardData = await newCardResp.json()

    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/ACCOUNTS/${accountId}/CARDS}`)
    console.log("NEW CARD: ", newCardData)

    if (newCardData.error) {
      throw new Error(newCardData.error)
    }
    return new NextResponse(JSON.stringify({}), {
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
