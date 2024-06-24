import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = headers().get("authorization") ?? ""
    const accountId = request.url.split("/")[5];

    const activityResp = await fetch(`https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/activity`, {
      cache: "no-cache",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token,
      },
    })

    const activityData = await activityResp.json()

    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/ACCOUNTS/${accountId}/ACTIVITY`)
    console.log("activity: ", activityData)

    return new NextResponse(JSON.stringify(activityData), {
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