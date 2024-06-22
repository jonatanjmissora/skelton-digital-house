import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  try {
    const { amount, dated, description } = await request.json();
    const token = cookies().get("token")?.value ?? ""
    const accountId = cookies().get("accountid")?.value ?? ""
    console.log("NEWACTIVITY", { amount, dated, description })

    const newActivityResp = await fetch(`https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token,
      },
      body: JSON.stringify({ amount, dated, description }),
    })

    const newActivityData = await newActivityResp.json()

    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/ACCOUNTS/${accountId}/TRANSACTIONS}`)
    console.log("NEW ACTIVITY: ", newActivityData)

    if (newActivityData.error) {
      throw new Error(newActivityData.error)
    }
    return new NextResponse(JSON.stringify({ newActivityData }), {
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