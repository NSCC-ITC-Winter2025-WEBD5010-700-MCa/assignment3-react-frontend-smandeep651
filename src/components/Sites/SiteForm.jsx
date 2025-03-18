import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function SiteForm({ onDataCollection, initialData }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        if (initialData) {
            setValue('project_name', initialData.project_name);
            setValue('city', initialData.city);
            setValue('general_contractor', initialData.general_contractor);
            setValue('completion_date', initialData.completion_date);
            setValue('status', initialData.status);
        }
    }, [initialData, setValue]);

    return (
        <form onSubmit={handleSubmit(onDataCollection)} className="space-y-4">
            <div>
                <input
                    {...register('project_name', { required: 'Project name is required!' })}
                    type="text"
                    placeholder="Project Name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.project_name && <p className="text-red-500 text-sm">{errors.project_name.message}</p>}
            </div>
            <div>
                <input
                    {...register('city', { required: 'City is required!' })}
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            </div>
            <div>
                <input
                    {...register('general_contractor', { required: 'Contractor is required!' })}
                    type="text"
                    placeholder="General Contractor"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.general_contractor && <p className="text-red-500 text-sm">{errors.general_contractor.message}</p>}
            </div>
            <div>
                <input
                    {...register('status', { required: 'Status is required!' })}
                    type="text"
                    placeholder="Status"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
                Submit Changes
            </button>
        </form>
    );
}
