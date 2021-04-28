import { useQuery } from "react-query";
import api from "./navitia";

function RegionsQuery() {
  const fetchCoverage = () => {
    return api
      .get("/coverage")
      .then((res) => {
        const franceCoverage = res.data.regions.filter((region) => {
          return region.name?.match(/^France/);
        });
        let regionsId = [];
        for (let region of franceCoverage) {
          regionsId.push(region.id);
        }
        return regionsId;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const { data, isLoading, isError, isSuccess } = useQuery(
    "coverage",
    fetchCoverage,
    {
      refetchOnWindowFocus: false,
      staleTime: 5000,
    }
  );
  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
}

export default RegionsQuery;
