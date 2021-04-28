//import React from "react";
import { useQuery } from "react-query";
import api from "./navitia";
function Journeys({ id }) {
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["route-schedule" + id],
    () => {
      return api
        .get(`/coverage/fr-nw/stop_areas/${id}/journeys?count=200`)
        .then((results) => {
          let data = [];
          results?.data?.journeys?.forEach((res) => {
            const dataset = { ...res, destination: res.to.name };
            data.push(dataset);
          });
              
          return data;
        });
    },
    { refetchOnWindowFocus: false, staleTime: 100000 }
  );
  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
}

export default Journeys;
