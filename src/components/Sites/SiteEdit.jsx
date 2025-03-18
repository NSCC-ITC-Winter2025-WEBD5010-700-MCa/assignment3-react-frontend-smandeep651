import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SiteForm from './SiteForm';

export default function SiteEdit() {
    const { id } = useParams();  // Get the ID from the URL
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch site data by object id
    const { data, isLoading, error } = useQuery({
        queryKey: ['data_sites', id],
        queryFn: async () => {
            const response = await fetch(`https://data-sites2.onrender.com/api/project_sites/${id}`);
            return response.json();
        },
    });

    // Mutation for editing the site
    const editSiteMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`https://data-sites2.onrender.com/api/project_sites/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['data_sites']);
            navigate('/admin/sites');
        },
        onError: (error) => {
            console.error('Error updating site:', error);
            alert('There was an error updating the site.');
        },
    });

    // Handle form submission
    const processData = (data) => {
        editSiteMutation.mutate(data);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Site - {data?.project_name}</h2>
            <SiteForm onDataCollection={processData} initialData={data} />
        </div>
    );
}
