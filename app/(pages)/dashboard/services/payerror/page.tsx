import Link from "next/link";

export default function ServicePayError() {
  return (
    <>
      <div className='card items-center'>
        <h2>Hubo un problema con tu pago</h2>
        <p className='w-[40%] text-center'>Puede deberse a fondos insuficientes
          Comunicate con la entidad emisora de la tarjeta</p>
      </div>
      <div className='w-full flex justify-end'>
        <Link className='btn' href={`/dashboard/services/`}>Volver a intentarlo</Link>
      </div>
    </>
  )
}
