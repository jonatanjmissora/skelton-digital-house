import { getData } from "./direct.services"

export const getServicesData = async () => {
    return getData("service")
}