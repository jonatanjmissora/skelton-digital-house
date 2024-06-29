import { getServicesData } from "@/app/services/services.services"
import { ServiceTypes } from "@/app/types/service.types"
import Link from "next/link"

export default async function ServicesPage() {

  const servicesData: ServiceTypes[] = await getServicesData()

  return (
    <>
      <div className="card">
        <input className="p-2" type="text" placeholder="Buscá entre más de 5.000 empresas" />
      </div>

      <div className="card">
        <div className="mb-4">Servicios</div>
        {servicesData.map(service => <ServiceRow key={service.id} service={service} />)}
      </div>
    </>
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