import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

export default function SiteEdit() {
  const { siteId } = useParams(); // Get site ID from URL
  const [siteData, setSiteData] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch site data when component mounts
  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/data_sites/${siteId}`);
        if (!response.ok) throw new Error('Failed to fetch site data');
        const data = await response.json();
        setSiteData(data);

        // Pre-fill form fields
        setValue('siteName', data.siteName);
        setValue('siteDescription', data.siteDescription);
        setValue('contactEmail', data.contactEmail);
        setValue('phoneNumber', data.phoneNumber);
      } catch (error) {
        console.error(error);
        alert('Error fetching site data.');
      }
    };

    fetchSiteData();
  }, [siteId, setValue]);

  // Mutation for updating site settings
  const updateSiteSettings = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/data_sites/${siteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update site settings');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['data_sites']);
      navigate('/admin/settings');
    },
    onError: () => {
      alert('Error updating site settings.');
    },
  });

  const onSubmit = (data) => {
    updateSiteSettings.mutate(data);
  };

  if (!siteData) return <p>Loading site data...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center">Edit Site</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('siteName', { required: 'Site Name is required!' })}
            type="text"
            placeholder="Site Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.siteName && <p className="text-red-500 text-sm mt-1">{errors.siteName.message}</p>}
        </div>
        <div>
          <textarea
            {...register('siteDescription', { required: 'Description is required!' })}
            placeholder="Site Description"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.siteDescription && <p className="text-red-500 text-sm mt-1">{errors.siteDescription.message}</p>}
        </div>
        <div>
          <input
            {...register('contactEmail', { required: 'Contact Email is required!' })}
            type="email"
            placeholder="Contact Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>}
        </div>
        <div>
          <input
            {...register('phoneNumber', { required: 'Phone Number is required!' })}
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          disabled={updateSiteSettings.isLoading}
        >
          {updateSiteSettings.isLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
