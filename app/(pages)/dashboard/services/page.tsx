import ActivityCard from "@/app/components/Activity/ActivityCard"
import ActivitySearch from "@/app/components/Activity/ActivitySearch"
import { getServicesData } from "@/app/services/services.services"
import { ServiceTypes } from "@/app/types/service.types"
import { getActualActivities } from "@/app/utils/getActualActivities"
import Link from "next/link"
import { Suspense } from "react"

export default async function ServicesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  const search = searchParams.search
  const servicesData: ServiceTypes[] = await getServicesData()
  const filteredActivities = getActualActivities(servicesData, null, search)
  const start = (Number(page) - 1) * Number(ACTIVITIES_PER_PAGE)
  const end = start + Number(ACTIVITIES_PER_PAGE)
  const activitiesToShow = filteredActivities.slice(start, end)

  return (
    <>
      <div className="card">
        <ActivitySearch />
        <input className="p-2" type="text" placeholder="Buscá entre más de 5.000 empresas" />
      </div>

      <div className="card">
        <div className="mb-4">Servicios</div>
        <Suspense key={`${search}`} fallback={"LOADING"}>
          <ActivityCard activities={activitiesToShow} />
        </Suspense>
        {/*servicesData.map(service => <ServiceRow key={service.id} service={service} />)*/}
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