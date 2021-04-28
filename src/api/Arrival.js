import { useQuery } from "react-query";
import api from "./navitia";
function Arrival({ id }) {
  //   console.log(id);
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["route-schedule-1", id],
    () => {
      return api
        .get(`/coverage/fr-nw/stop_areas/${id}/arrivals`)
        .then((res) => {
          let details = [];
          //console.log("route schedule ", res.data.arrivals);
          //   if (res.data && res.data.departures) {
          //     res.data.departures.forEach((info) => {
          //       details.push(info.display_informations);
          //     });
          //   }
          return details;
        });
    },
    { refetchOnWindowFocus: false, staleTime: 0 }
  );
  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
}

export default Arrival;
