export const fetchAllSites = async () => {
  const response = await fetch(import.meta.env.VITE_SITES_API_URL);
  if (!response.ok) throw new Error("Failed to fetch sites");
  return response.json();
};

export const fetchSiteById = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_SITES_API_URL}/${id}`);
  if (!response.ok) throw new Error("Site not found");
  return response.json();
};

// Function to delete a site
export const deleteSite = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_SITES_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete the site");
  return response.json();
};

// Function to update a site
export const updateSite = async (site) => {
  const response = await fetch(`${import.meta.env.VITE_SITES_API_URL}/${site._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(site),
  });
  if (!response.ok) throw new Error("Failed to update the site");
  return response.json();
};

// Function to create a new site
export const createSite = async (newSite) => {
  const response = await fetch(import.meta.env.VITE_SITES_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSite),
  });
  if (!response.ok) throw new Error("Failed to create site");
  return response.json();
};
