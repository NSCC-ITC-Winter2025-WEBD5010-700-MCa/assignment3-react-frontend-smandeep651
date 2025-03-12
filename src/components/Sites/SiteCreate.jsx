import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import SiteForm from './SiteForm';

const SiteCreate = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createSiteMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['data_sites']);
            navigate('/admin/sites');
        },
    });

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-center">Create a New Site</h2>
            <SiteForm onDataCollection={createSiteMutation.mutate} />
        </div>
    );
};

export default SiteCreate;
