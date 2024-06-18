import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {

  try {

    cookies().delete('username')

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