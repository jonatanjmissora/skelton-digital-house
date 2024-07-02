import { getService } from '@/app/services/services.services';
import { ServiceTypes } from '@/app/types/service.types';
import Link from 'next/link';

export default async function ServicePage({ params }: { params: { id: string } }) {

  const { id } = params
  const actualService: ServiceTypes = await getService(id)
  if (actualService.invoice_value === 0) actualService.invoice_value = 1

  return (
    <div className="card">
      <h2>Servicio</h2>
      <div className='w-full flex justify-between mt-4'>
        <span>Nombre: {actualService.name}</span>
        <span>Fecha: {actualService.date}</span>
        {actualService.invoice_value && <span>Valor: {Math.ceil(actualService.invoice_value * 100)}</span>}
      </div>
      <div className='w-full flex justify-end'>
        <Link className='btn mt-4' href={`/dashboard/services/checkout?serviceid=${id}`}>Continuar</Link>
      </div>
    </div>
  )
}


