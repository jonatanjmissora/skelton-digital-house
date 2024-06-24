import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { accountId: string, cardId: string } }) {
  const token = cookies().get("token")?.value ?? ""
  const { accountId, cardId } = params

  try {
    const deleteCardResp = await fetch(`https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token,
      },
    })

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

export async function GET(request: Request, { params }: { params: { cardId: string } }) {

  try {
    const token = headers().get("authorization") ?? ""
    const { cardId } = params
    const accountId = request.url.split("/")[5]

    const accountCardResp = await fetch(`https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards/${cardId}`, {
      cache: "no-cache",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token,
      },
    })

    const accountCardData = await accountCardResp.json()

    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/ACCOUNTS/${accountId}/CARDS}`)
    console.log("ACCOUNT CARDS", accountCardData)

    return new NextResponse(JSON.stringify(accountCardData), {
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
