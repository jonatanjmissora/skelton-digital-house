import SearchBar from "@/app/components/SearchBar"
import ServicesList from "@/app/components/Services/ServicesList"
import { getServicesData } from "@/app/services/services.services"
import { ServiceTypes } from "@/app/types/service.types"
import { getSearchedServices } from "@/app/utils/getSearchedServices"
import { Suspense } from "react"

export default async function ServicesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  const search = searchParams.search?.toString() ?? ""
  const servicesData: ServiceTypes[] = await getServicesData()
  const searchedServices = getSearchedServices(servicesData, search)

  return (
    <>
      <div className="card">
        <SearchBar placeholder={"Buscá entre más de 5.000 empresas"} />
      </div>

      <div className="card">
        <Suspense key={`${search}`} fallback={"LOADING"}>
          <ServicesList services={searchedServices} />
        </Suspense>
      </div>
    </>
  )
}
