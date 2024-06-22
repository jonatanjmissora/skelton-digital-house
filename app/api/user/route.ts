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

export async function GET() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjQwIiwiZW1haWwiOiJqb25hdGFuam1pc3NvcmFAZ21haWwuY29tIiwiZXhwIjoxNzE5MDYzODMzfQ.fCl7ffg_voZIKXzgFJ9GDbR9uCLosHde3nIEiQ_2rOE'
  try {
    const userResp = await fetch(`https://digitalmoney.digitalhouse.com/api/users/40`, {
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

/*
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
  */