import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

const SiteTable = ({ sites }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteSiteMutation = useMutation({
    mutationFn: async (siteId) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/data_sites/${siteId}`, {
        method: 'DELETE',
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['data_sites']);
    },
    onError: () => {
      alert('Unable to delete');
    },
  });

  const handleDelete = (siteId) => {
    if (window.confirm(`Are you sure you wish to delete site with ID: ${siteId}`)) {
      deleteSiteMutation.mutate(siteId);
    }
  };

  return (
    <>
      <p>
        <Link to="/admin/sites/create">Add New Site</Link>
      </p>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{site.id}</td>
              <td className="border border-gray-300 px-4 py-2">{site.name}</td>
              <td className="border border-gray-300 px-4 py-2">{site.location}</td>
              <td className="border border-gray-300 px-4 py-2">{site.start_date}</td>
              <td className="border border-gray-300 px-4 py-2">{site.end_date}</td>
              <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                <button
                  className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
                >
                  Details
                </button>
                <button
                  onClick={() => navigate(`/admin/sites/${site.id}/edit`)}
                  className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(site.id)}
                  className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
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

export default SiteTable;
