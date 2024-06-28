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
      <span>{service.name}</span>
      <Link href={`/dashboard/services/${service.id}`}>Seleccionar</Link>
    </div>
  )
}