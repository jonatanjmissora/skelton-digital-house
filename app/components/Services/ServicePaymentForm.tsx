"use client"

import { useState } from "react"
import SubmitButton from "../SubmitButton"
import { AccountDataTypes, ActivityDataTypes } from "@/app/types/account.types"
import { postTransaction } from "@/app/services/account.services"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ServiceTypes } from "@/app/types/service.types"

export default function ServicePaymentForm({ serviceData, accountData, token }: {
  serviceData: ServiceTypes, accountData: AccountDataTypes, token: string
}) {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (serviceData.invoice_value === 0) serviceData.invoice_value = 1

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    try {

      if (accountData.available_amount >= serviceData.invoice_value * 100) {
        const newTransaction = {
          amount: Math.ceil(-serviceData.invoice_value * 100),
          dated: new Date(),
          description: `Pago de ${serviceData.name}`
        }
        const transactionResp: ActivityDataTypes = await postTransaction(accountData.id.toString(), newTransaction, token)
        toast.success("Servicio pagado")
        const transactionid = transactionResp.id
        router.push(`/dashboard/services/success?serviceid=${transactionid}`)
      }
      else {
        router.push("/dashboard/services/payerror")
        toast.error("Fondos insuficientes")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full flex justify-end'>
      <SubmitButton isLoading={isLoading} text={"Pagar"} />
    </form>
  )
}
