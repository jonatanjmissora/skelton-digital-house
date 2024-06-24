import { getServicesData } from "@/app/services/services.services"

export default async function ServicesPage() {

  const servicesData = await getServicesData()
  console.log(servicesData)

  return (
    <div className="w-full flex flex-col p-8 border border-gray-500">
      <div>Servicios</div>
      {servicesData.map(service => <ServiceRow key={service.key} service={service}/>)}
    </div>
  )
}

const ServiceRow = ({service}) => {
  return (
    <div>{JSON.stringify(service, null, 2)}</div>
  )
}
