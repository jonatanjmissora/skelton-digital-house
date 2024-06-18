import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {

  try {
    const { firstname, lastname } = await request.json();
    const username = `${firstname} ${lastname}`
    cookies().set('username', username, { expires: new Date(new Date().getTime() + 60000) })

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