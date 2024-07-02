import Link from 'next/link'

export default function ServiceBillError({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  const serviceid = searchParams.serviceid
  const bill = searchParams.bill

  return (
    <>
      <div className='card items-center'>
        <h2>No encontramos facturas asociadas a este dato</h2>
        <p className='w-[40%] text-center'>Revisá el dato ingresado. Si es correcto, es posible que la empresa aún no haya cargado tu factura.</p>
      </div>
      <div className='w-full flex justify-end'>
        <Link className='btn' href={`/dashboard/services/bill?serviceid=${serviceid}&bill=${bill}`}>Revisar dato</Link>
      </div>
    </>
  )
}
