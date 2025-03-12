import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const SitesTable = ({ sites }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const deleteSiteMutation = useMutation({
        mutationFn: async (siteId) => {
            const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}/${siteId}`, {
                method: 'DELETE'
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['data_sites']);
        },
        onError: () => {
            alert('Unable to delete');
        }
    });

    const handleDelete = (siteId) => {
        if (window.confirm(`Are you sure you want to delete site ${siteId}?`)) {
            deleteSiteMutation.mutate(siteId);
        }
    };

    return (
        <>
            <p><Link to="/admin/sites/create">Add New Site</Link></p>
            <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Project Name</th>
                        <th className="border border-gray-300 px-4 py-2">City</th>
                        <th className="border border-gray-300 px-4 py-2">Contractor</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map(site => (
                        <tr key={site.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{site.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{site.project_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{site.city}</td>
                            <td className="border border-gray-300 px-4 py-2">{site.general_contractor}</td>
                            <td className="border border-gray-300 px-4 py-2">{site.status}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button onClick={() => navigate(`/admin/sites/${site.id}/edit`)}>Edit</button>
                                <button onClick={() => handleDelete(site.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default SitesTable;
