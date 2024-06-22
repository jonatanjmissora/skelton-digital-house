import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server";

export type UserDataTypes = {
  id: number;
  firstname: string;
  lastname: string;
  dni: number;
  email: string
  phone: string;
  error: string;
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {

    const token = cookies().get('token')?.value ?? ''
    const userId = cookies().get('userid')?.value ?? ''

    if (!token || !userId) return

    const userResp = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      },
    })

    const userData: UserDataTypes = await userResp.json()

    const username = `${userData.firstname} ${userData.lastname}`

    // NO FUNCIONA NADA DE TODO ESTO
    cookies().set('username2', username)
    request.headers.set("username2", username)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('username2', username)

    const response = new NextResponse(JSON.stringify({ userData }), {
      status: 200,
      // NO FUNCIONA
      //headers: requestHeaders
      headers: {"username2":username}
    })

    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/USERS/${userId}`)
    console.log(userData)

    return new NextResponse(JSON.stringify(userData), {
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

export async function PATCH(request: NextRequest) {
  try {

    const token = cookies().get('token')?.value ?? ''
    //const userId = cookies().get('userid')?.value ?? ''

    const { userId, newUser } = await request.json();

    if (!token || !userId) return

    const userEditResp = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      },
      body: JSON.stringify(newUser)
    })

    const userEditData: UserDataTypes = await userEditResp.json()
    //const username = `${userEditData.firstname} ${userEditData.lastname}`

    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/USERS/${userId}`)
    console.log(userEditData)

    return new NextResponse(JSON.stringify(userEditData), {
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