import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SiteForm from './SiteForm';

export default function SiteEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['data_sites', id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}/${id}`);
            return response.json();
        }
    });

    const editSiteMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['data_sites']);
            navigate('/admin/sites');
        }
    });

    const processData = (data) => {
        editSiteMutation.mutate(data);
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Site - Id: {data?.id}</h2>
            <SiteForm onDataCollection={processData} initialData={data} />
        </div>
    );
}
