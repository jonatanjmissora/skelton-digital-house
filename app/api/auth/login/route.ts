import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

type JwtPayload = {
  username: string;
  email: string;
  exp: number;
}

type UserDataTypes = {
  id: number;
  firstname: string;
  lastname: string;
  dni: number;
  email: string
  phone: string;
}

type AccountDataTypes = {
  id: number;
  user_id: number;
  cvu: string;
  alias: string;
  available_amount: number;
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
    console.log("LOGINDATA: ", loginData)

    if(loginData.error) {
      throw new Error(loginData.error)
    }
    const decodeToken = jwtDecode<JwtPayload>(loginData.token)

    cookies().set('token', loginData.token, { expires: new Date(new Date().getTime() + 600000) })
    cookies().set('userid', decodeToken.username, { expires: new Date(new Date().getTime() + 600000) })

    /*
    const userResp = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${userId}`, {
    method: 'GET',
    headers: {
              'Content-Type': 'application/json',
              "Authorization": loginData.token
              },
    })      

    const userData : UserDataTypes = await userResp.json()
    console.log("USERDATA :", userData)

    if(loginData.error) {
      throw new Error(loginData.error)
    }

    const username = `${userData.firstname} ${userData.lastname}`
    const userid = userData.id.toString()
    
    const accountResp = await fetch(`https://digitalmoney.digitalhouse.com/api/account`, {
    method: 'GET',
    headers: {
              'Content-Type': 'application/json',
              "Authorization": loginData.token
              },
    })      

    const accountData : AccountDataTypes = await accountResp.json()
    console.log("ACCOUNTDATA :", accountData)

    cookies().set('username', username, { expires: new Date(new Date().getTime() + 600000) })
    cookies().set('userid', userid, { expires: new Date(new Date().getTime() + 600000) })
    */

    return new Response(JSON.stringify({}), {
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