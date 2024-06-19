import { cookies, headers } from "next/headers"
import { NextRequest } from "next/server";

type UserDataTypes = {
  id: number;
  firstname: string;
  lastname: string;
  dni: number;
  email: string
  phone: string;
}

export async function GET(request: NextRequest) {
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
    console.log("USERDATA :", userData)

    const username = `${userData.firstname} ${userData.lastname}`
    cookies().set('username', username, { expires: new Date(new Date().getTime() + 600000) })

    return new Response(JSON.stringify({ userData }), {
      status: 200,
    })
  } catch (e) {
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), {
      status: 500,
    })
  }
}