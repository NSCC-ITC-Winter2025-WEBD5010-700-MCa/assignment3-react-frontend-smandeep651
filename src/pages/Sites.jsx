import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Custom hook to fetch data from the /data_sites endpoint
const fetchProjectSites = async () => {
  const apiUrl = import.meta.env.VITE_SITE_API_URL ; // Check if API URL is correct
  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    throw new Error(`Error fetching project sites: ${response.statusText}`);
  }

  return response.json();
};

const Sites = () => {
  // Use React Query to fetch data
  const { data, error, isLoading } = useQuery('projectSites', fetchProjectSites);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>No project sites found.</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Project Sites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Loop over the project site data and display each item */}
        {data.map((site) => (
          <div key={site._id.$oid} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold">{site.project_name}</h3>
            <p><strong>City:</strong> {site.city}</p>
            <p><strong>General Contractor:</strong> {site.general_contractor}</p>
            <p><strong>Status:</strong> {site.status}</p>
            <p>
              <strong>Completion Date:</strong> {site.completion_date ? new Date(site.completion_date).getFullYear() : 'N/A'}
            </p>
            <div>
              <strong>Employees for Project:</strong>
              {site.employees_for_project.length > 0 ? (
                <ul className="list-disc list-inside">
                  {site.employees_for_project.map((employee, index) => (
                    <li key={index}>{employee}</li>
                  ))}
                </ul>
              ) : (
                <p>No employees assigned.</p>
              )}
            </div>
            <div>
              <strong>Managed By:</strong>
              {Object.keys(site.managed_by).length > 0 ? (
                <ul className="list-disc list-inside">
                  {Object.entries(site.managed_by).map(([manager, status], index) => (
                    <li key={index}>
                      {manager}: {status === 'Yes' ? 'Yes' : 'No'}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No managers assigned.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sites;
