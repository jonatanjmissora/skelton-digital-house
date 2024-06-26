import { ActivityDataTypes } from "../types/account.types";
import { ACTIVITIES_PER_PAGE } from "./constants";

export const getActualActivities = (activityData: ActivityDataTypes[], page: string, filter?: string, search?: string) => {
  let filteredResult = [...activityData]
  if(filter)
    filteredResult = filteredActivities(filteredResult, filter)

  let searchedResult = [...filteredResult]
  if(search)
    searchedResult = searchedActivities(searchedResult, search)
    
  const result = getActivitiesPerPage(searchedResult, page)
      
    return result
  }


  const filteredActivities = (activityData: ActivityDataTypes[], filter: string) => {
    let result = activityData
    if(filter) {
      const [day, month, year] = new Date().toLocaleDateString().split("/");
      const correctMonth = month.length < 2 ? "0" + month : month
      const correctDay = day.length < 2 ? "0" + day : day
      const today = `${year}-${correctMonth}-${correctDay}`
      if (filter === "hoy") {
        result = activityData.filter(activity => activity.dated.substring(0, 10) === today)
      }
      if (filter === "mes") {
        result = activityData.filter(activity => activity.dated.substring(5, 7) === correctMonth &&
        activity.dated.substring(0, 4) === year)
      }
      if (filter === "anio") {
        result = activityData.filter(activity => activity.dated.substring(0, 4) === year)
      }
    }
    return result
  }

  const searchedActivities = (searchedResult: ActivityDataTypes[], search: string) => {
      return [...searchedResult].filter(activity => 
        activity
        .description
        .toLowerCase()
        .includes(search.toLowerCase()))
  }
 
  const getActivitiesPerPage = (searchedResult: ActivityDataTypes[], page: string) => {
    let actualPage = +page - 1;
    let result = [...searchedResult]
    if(actualPage === 0) {
      result = searchedResult.slice(ACTIVITIES_PER_PAGE * actualPage, ACTIVITIES_PER_PAGE * (actualPage + 1))
    }
    if(actualPage === 1)
      result = searchedResult.slice(ACTIVITIES_PER_PAGE * actualPage, ACTIVITIES_PER_PAGE * (actualPage + 1))

    return result
  }