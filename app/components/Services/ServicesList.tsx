import Link from 'next/link'
import { ServiceTypes } from '../../types/service.types'

export default async function ServicesList({ services }: { services: ServiceTypes[] }) {
  return (
    <div>
      <h2>Más recientes</h2>
      <div className='py-2'>
        {services.length === 0 && <span>No hay actividad</span>}
        {services.length !== 0 &&
          services.map(service =>
            <ServiceRow key={service.id} service={service} />
          )
        }
      </div>
    </div>
  )
}

const ServiceRow = ({ service }: { service: ServiceTypes }) => {
  return (
    <div className="w-full flex justify-between py-1 hover:bg-white">
      <span className="w-1/3">{service.name}</span>
      <div className="w-1/3 flex justify-between">
        <span>id : {service.id}</span>
        <span>date : {service.date}</span>
      </div>
      <div className="w-1/3">
        <Link className="w-full flex justify-end border-none" href={`/dashboard/services/bill?serviceid=${service.id}`}>Seleccionar</Link>
      </div>
    </div>
  )
}