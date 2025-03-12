import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import SitesTable from "../components/Sites/SiteTable";

const Sites = () => {
  const { isPending, error, data: sites } = useQuery({
    queryKey: ["sitesData"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}`);
      return response.json(); // returns a promise of our data
    },
    staleTime: Infinity, // cache the data & store it locally
  });

  if (error) return <div>{`An error has occurred: ${error.message}`}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Sites</h1>

      {isPending ? <div>Loading...</div> : <SitesTable sites={sites} />}

      <Outlet />
    </div>
  );
};

export default Sites;
