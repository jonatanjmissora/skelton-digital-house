import { getCookies } from '@/app/services/getCookies.services'
import { redirect } from 'next/navigation'

export default function ServiceBill({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  const serviceid = searchParams.serviceid

  const onSubmit = async (formData: FormData) => {
    "use server"
    const billnum = (formData.get("billnum"))
    if (billnum === "99999999999")
      redirect(`/dashboard/services/checkout?serviceid=${serviceid}`)
    else
      redirect(`/dashboard/services/billerror?serviceid=${serviceid}`)
  }

  return (
    <div className='card'>
      <h2>Numero de cuenta sin el primer 2</h2>
      <form action={onSubmit}>
        <input className='p-2 w-1/4' type="number" name="billnum" required placeholder='0' defaultValue={"99999999999"} />
        <p className='my-2'>Son 11 números sin espacios, sin el “2” inicial. Agregá ceros adelante si tenés menos. </p>
        <div className='w-full flex justify-end'>
          <button className='btn' type="submit">Continuar</button>
        </div>
      </form>
    </div>
  )
}
