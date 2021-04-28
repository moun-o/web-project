//import React from "react";
import { useQuery } from "react-query";
import api from "./navitia";
function Departures({ id }) {
  //   console.log(id);
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["departures", id],
    () => {
      return api
        .get(`/coverage/fr-nw/stop_areas/${id}/departures?count=60`)
        .then((res) => {
          let details = [];
          if (res.data && res.data.departures) {
            res.data.departures.forEach((info) => {
              details.push(info);
            });
          }
          return details;
        });
    },
    { refetchOnWindowFocus: false, staleTime: 10000 }
  );
  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
}

export default Departures;
