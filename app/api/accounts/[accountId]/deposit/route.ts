import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  try {
    const { amount, dated, description } = await request.json();
    const token = cookies().get("token")?.value ?? ""
    const accountId = cookies().get("accountid")?.value ?? ""
    console.log("NEWADEPOSIT", { amount, dated, description })

    const newDepositResp = await fetch(`https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token,
      },
      body: JSON.stringify({ amount, dated, description }),
    })

    const newDepositData = await newDepositResp.json()

    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/ACCOUNTS/${accountId}/DEPOSIT}`)
    console.log("NEW ACTIVITY: ", newDepositData)

    if (newDepositData.error) {
      throw new Error(newDepositData.error)
    }
    return new NextResponse(JSON.stringify({ newDepositData }), {
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