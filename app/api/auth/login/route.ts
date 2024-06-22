import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { DecodeTokenTypes } from "../../user/route";

export async function POST(request: NextRequest) {

  try {
    const { email, password } = await request.json();

    const loginResp = await fetch("https://digitalmoney.digitalhouse.com/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const loginData = await loginResp.json()
    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/LOGIN`)
    console.log("LOGINDATA: ", loginData)

    if (loginData.error) {
      throw new Error(loginData.error)
    }
    const decodeToken = jwtDecode<DecodeTokenTypes>(loginData.token)

    cookies().set('token', loginData.token, { expires: new Date(new Date().getTime() + 600000) })
    cookies().set('userid', decodeToken.username, { expires: new Date(new Date().getTime() + 600000) })


    return new NextResponse(JSON.stringify(loginData), {
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



