import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { cardId: string }}) {

    try {
      const token = cookies().get("token")?.value ?? ""
      const accountId = cookies().get("accountid")?.value ?? ""
      const {cardId} = params;

      const deleteCardResp = await fetch(`https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
                  'Content-Type': 'application/json',
                  "Authorization": token,
                  },
      })
  
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
  