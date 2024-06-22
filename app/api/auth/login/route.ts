import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type JwtPayload = {
  username: string;
  email: string;
  exp: number;
}

type UserDataTypes =
  {
    id: number;
    firstname: string;
    lastname: string;
    dni: number;
    email: string
    phone: string;
    error?: string
  }

type AccountDataTypes = {
  id: number;
  user_id: number;
  cvu: string;
  alias: string;
  available_amount: number;
  error?: string
}

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
    const decodeToken = jwtDecode<JwtPayload>(loginData.token)

    cookies().set('token', loginData.token, { expires: new Date(new Date().getTime() + 600000) })
    cookies().set('userid', decodeToken.username, { expires: new Date(new Date().getTime() + 600000) })

    //************************************************************************************* */

    const userResp = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${decodeToken.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": loginData.token
      },
    })

    const userData: UserDataTypes = await userResp.json()
    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/USERS/${decodeToken.username}`)
    console.log("USER DATA", userData)

    cookies().set(
      'username',
      JSON.stringify(`${userData.firstname} ${userData.lastname}`),
      { expires: new Date(new Date().getTime() + 600000) }
    )

    if (userData.error) {
      throw new Error(userData.error)
    }

    //************************************************************************************* */
    const accountResp = await fetch(`https://digitalmoney.digitalhouse.com/api/account`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": loginData.token
      },
    })

    const accountData: AccountDataTypes = await accountResp.json()
    console.log(`***********************  RESPUESTA DEL ENDPOINT : API/ACCOUNT`)
    console.log("ACCOUNT DATA", accountData)

    cookies().set(
      'accountid',
      JSON.stringify(accountData.id),
      { expires: new Date(new Date().getTime() + 600000) }
    )

    if (accountData.error) {
      throw new Error(accountData.error)
    }

    return new NextResponse(JSON.stringify({}), {
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



