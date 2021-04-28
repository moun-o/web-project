import { useQuery } from "react-query";
import api from "./navitia";
import axios from "axios";
function PlaceQuery(place) {
  const { data, isLoading, isError, isSuccess } = useQuery(
    place,
    () => {
      //create source
      const source = axios.CancelToken.source();
      //create promise to debounce request api
      const promise = new Promise((resolve) => setTimeout(resolve, 500))
        .then(() => {
          return api.get(`/coverage/fr-nw/places?q=${place}`, {
            cancelToken: source?.token,
          });
        })
        .then((res) => {
          //start
          let dataset = [];
          // console.log("name: ", res.data.places[0].stop_area.name);
          //console.log("id: ", res.data.places[0]);
          // console.log("line", res.data.places[0].stop_area.lines);
          //console.log(res.data.places);
          res.data?.places?.forEach((place) => {
            let place_data;
            if (typeof place.stop_area !== "undefined") {
              place_data = {
                id: place.stop_area.id,
                name: place.stop_area.name,
                lines: [place.stop_area.lines],
                coord: {
                  lat: place.stop_area.coord.lat,
                  lon: place.stop_area.coord.lon,
                },
                mode: [place.stop_area.physical_modes],
              };
              dataset.push(place_data);
            }
          });

          return dataset;
          //end
        }); //end promise

      promise.cancel = () => {
        source?.cancel("Query was cancelled by React Query");
      };
      return promise;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 50000,
    }
  );

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
}

export default PlaceQuery;
