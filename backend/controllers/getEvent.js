const event = {
  getCoach: async (coachId, accessToken) => {
    try {
      const response = await axios.get(
        "https://your-subdomain.pike13.com/api/v2/events",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
          params: {
            staff_ids: coachId,
            starts_after: new Date().toISOString(), // Filter upcoming events
            per_page: 100, // Pagination
          },
        },
      );
      return response.data.events;
    } catch (error) {
      console.error(
        "Error fetching events:",
        error.response?.data || error.message,
      );
      return [];
    }
  },

  getClients: async (eventId, accessToken) => {
    try {
      const response = await axios.get(
        `https://your-subdomain.pike13.com/api/v2/events/${eventId}/clients`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        },
      );
      return response.data.clients;
    } catch (error) {
      console.error(
        "Error fetching clients:",
        error.response?.data || error.message,
      );
      return [];
    }
  },
};

module.exports = event;
