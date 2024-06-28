import { getCookies } from '@/app/services/getCookies.services'
import { redirect } from 'next/navigation'

export default function DepositAmount({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined }}) {

  const { token, accountId } = getCookies()
  const amount = searchParams.amount
  const cardnum = searchParams.cardnum
  const cvu = searchParams.cvu

  const onSubmit = async (formData: FormData) => {
    "use server"
    const amount = (formData.get("amount"))
    if (amount === "0") return
    if(cvu)
      redirect(`/dashboard/accounts/${accountId}/deposit/checkout?cvu=${cvu}&amount=${amount}`)
    else
      redirect(`/dashboard/accounts/${accountId}/deposit/checkout?cardnum=${cardnum}&amount=${amount}`)
  }   
  

  return (
    <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
      <h2>¿Cuanto queres ingresar a la cuenta?</h2>
      <form action={onSubmit}>
        <input className='p-2 w-1/4' type="number" name="amount" required placeholder='$' defaultValue={Number(amount)} />
        <div className='w-full flex justify-end'>
          <button className='btn' type="submit">Continuar</button>
        </div>
      </form>
    </div>
  )
}
