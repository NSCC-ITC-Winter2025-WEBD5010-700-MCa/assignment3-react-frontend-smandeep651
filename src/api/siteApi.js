// API methods in api/siteApi.js

export const fetchAllSites = async () => {
  const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}`);
  if (!response.ok) throw new Error("Failed to fetch sites");
  return response.json();
};

export const fetchSiteById = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}/${id}`);
  if (!response.ok) throw new Error("Site not found");
  return response.json();
};

export const deleteSite = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete the site");
  return response.json();
};

export const updateSite = async (site) => {
  const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}/${site._id}`, {
    method: "PATCH",  // Using PATCH for updates
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(site),
  });
  if (!response.ok) throw new Error("Failed to update the site");
  return response.json();
};

export const createSite = async (newSite) => {
  const response = await fetch(`${import.meta.env.VITE_SITE_API_URL}`, {
    method: "POST",  // POST for creating new sites
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSite),
  });
  if (!response.ok) throw new Error("Failed to create the site");
  return response.json();
};
