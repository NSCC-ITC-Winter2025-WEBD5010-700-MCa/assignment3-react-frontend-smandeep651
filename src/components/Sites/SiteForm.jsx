import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function SiteForm({ onDataCollection, initialData }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('location', initialData.location);
      setValue('start_date', initialData.start_date?.split('T')[0]); // Ensure date is in YYYY-MM-DD
      setValue('end_date', initialData.end_date?.split('T')[0]);
    }
  }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(onDataCollection)} className="space-y-4 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center">Site Information</h2>

      {/* Site Name */}
      <div>
        <label className="block font-medium">Site Name</label>
        <input
          {...register('name', { required: 'Site Name is required!' })}
          type="text"
          placeholder="Enter site name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Location */}
      <div>
        <label className="block font-medium">Location</label>
        <input
          {...register('location', { required: 'Location is required!' })}
          type="text"
          placeholder="Enter site location"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
      </div>

      {/* Start Date */}
      <div>
        <label className="block font-medium">Start Date</label>
        <input
          {...register('start_date', { required: 'Start Date is required!' })}
          type="date"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
      </div>

      {/* End Date */}
      <div>
        <label className="block font-medium">End Date</label>
        <input
          {...register('end_date', { required: 'End Date is required!' })}
          type="date"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
      >
        Submit Site
      </button>
    </form>
  );
}
