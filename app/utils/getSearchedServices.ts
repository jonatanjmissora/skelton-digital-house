import { ServiceTypes } from "../types/service.types"

export const getSearchedServices = (servicesData: ServiceTypes[], search: string) => {
  return [...servicesData].filter(activity =>
    activity
      .name
      .toLowerCase()
      .includes(search.toLowerCase()))
}