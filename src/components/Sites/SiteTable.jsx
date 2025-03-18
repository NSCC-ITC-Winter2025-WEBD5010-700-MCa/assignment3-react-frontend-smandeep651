import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const SitesTable = ({ sites }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Delete site mutation
    const deleteSiteMutation = useMutation({
        mutationFn: async (siteId) => {
            const response = await fetch(`https://data-sites2.onrender.com/api/project_sites/${siteId}`, {
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
            <p className="mb-4">
                <Link 
                    to="/admin/sites/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white  font-semibold py-1 px-4 rounded-md shadow-md transition-all"
                >
                    Add New Site
                </Link>
            </p>
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
                        <tr key={site._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{site._id}</td>
                            <td className="border border-gray-300 px-4 py-2">{site.project_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{site.city}</td>
                            <td className="border border-gray-300 px-4 py-2">{site.general_contractor}</td>
                            <td className="border border-gray-300 px-4 py-2">{site.status}</td>
                            <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                <Link 
                                    to={`/admin/sites/${site._id}/edit`} 
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded-md shadow-md transition-all"
                                >
                                    Edit
                                </Link>
                                <button 
                                    onClick={() => handleDelete(site._id)} 
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-md shadow-md transition-all"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default SitesTable;
