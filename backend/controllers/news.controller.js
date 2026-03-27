export const getTopNews = async (req, res) => {
  try {
    

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};