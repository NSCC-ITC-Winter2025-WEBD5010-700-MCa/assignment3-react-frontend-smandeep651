import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import SiteForm from './SiteForm';

const SiteCreate = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Mutation to create a new site
    const createSiteMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error creating site');
            }
            return response.json();  // Return the newly created site
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['data_sites']);  // Refetch the sites list
            navigate('/admin/sites');  // Navigate back to the sites list page
        },
        onError: (error) => {
            console.error('Error creating site:', error);
            alert('There was an error creating the site.');
        },
    });

    // Handle form submission to create a site
    const handleCreateSite = (data) => {
        createSiteMutation.mutate(data);  // Trigger mutation
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-center">Create a New Site</h2>
            <SiteForm onDataCollection={handleCreateSite} />
        </div>
    );
};

export default SiteCreate;
