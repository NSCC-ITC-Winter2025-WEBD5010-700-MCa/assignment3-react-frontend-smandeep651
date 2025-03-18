import { useQuery } from "@tanstack/react-query";
import SitesTable from "../components/Sites/SiteTable";

const Sites = () => {
    const { isLoading, error, data: sites } = useQuery({
        queryKey: ["sitesData"],
        queryFn: async () => {
            const response = await fetch('https://data-sites2.onrender.com/api/project_sites');
            return response.json();
        },
        staleTime: Infinity,
    });

    if (error) return <div>An error has occurred: {error.message}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold">Sites</h1>
            {isLoading ? <div>Loading...</div> : <SitesTable sites={sites} />}
        </div>
    );
};

export default Sites;
