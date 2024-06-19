import { cookies } from "next/headers"

type UserDataTypes = {
    id: number;
    firstname: string;
    lastname: string;
    dni: number;
    email: string
    phone: string;
  }

export async function GET() {
    try {
        const userId = cookies().get("userid")?.value ?? ""
        const token = cookies().get("token")?.value ?? ""
        console.log(userId,token)
        if(!token || !userId) throw new Error("No existe token")

        const userResp = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${userId}`, {
            method: 'GET',
            headers: {
                      'Content-Type': 'application/json',
                      "Authorization": token
                      },
        })      
    
        const userData : UserDataTypes = await userResp.json()
        console.log("USERDATA :", userData)
    
        const username = `${userData.firstname} ${userData.lastname}`
        cookies().set('username', username, { expires: new Date(new Date().getTime() + 600000) })

        return new Response(JSON.stringify({userData}), {
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