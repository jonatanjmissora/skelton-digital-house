import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

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

        const accountData= await accountResp.json()

        console.log("***********************  RESPUESTA DEL ENDPOINT : API/ACCOUNT")
        console.log(accountData)

        return new NextResponse(JSON.stringify(accountData), {
            status: 200,
          })
        } catch (e) {
          return new NextResponse(JSON.stringify({
            error: 'Internal server error'
          }), {
            status: 500,
          })
        }
      }
      