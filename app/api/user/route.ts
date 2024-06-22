import { jwtDecode } from "jwt-decode";
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server";

export type DecodeTokenTypes = {
  username: string;
  email: string;
  exp: number;
}

export type UserDataTypes = {
  id: number;
  firstname: string;
  lastname: string;
  dni: number;
  email: string
  phone: string;
  error: string;
}

export async function GET() {
  const token = headers().get("authorization") ?? ""
  const decodeToken = jwtDecode<DecodeTokenTypes>(token)
  const userId = decodeToken.username
  try {
    const userResp = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      },
    })

    const userData: UserDataTypes = await userResp.json()
    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/USERS/40`)
    console.log("USER DATA", userData)

    cookies().set(
      'username',
      JSON.stringify(`${userData.firstname} ${userData.lastname}`),
      { expires: new Date(new Date().getTime() + 600000) }
    )

    if (userData.error) {
      throw new Error(userData.error)
    }

    return new NextResponse(JSON.stringify(userData), {
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

// NO FUNCIONA NADA DE TODO ESTO
/*
    const username = `${userData.firstname} ${userData.lastname}`
    cookies().set('username2', username)
    request.headers.set("username2", username)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('username2', username)
 
    const response = new NextResponse(JSON.stringify({ userData }), {
      status: 200,
      //headers: requestHeaders
      headers: {"username2":username}
    })
*/


export async function PATCH(request: NextRequest) {
  try {

    const token = cookies().get('token')?.value ?? ''
    const { userId, newUser } = await request.json();
    console.log({ token, userId, newUser })
    if (!token || !userId) return new NextResponse(JSON.stringify({ error: "No toke, ni userId" }), {
      status: 400,
    })

    const userEditResp = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      },
      body: JSON.stringify(newUser)
    })

    const userEditData: UserDataTypes = await userEditResp.json()

    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/USERS/${userId}`)
    console.log(userEditData)

    return new NextResponse(JSON.stringify(userEditData), {
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
