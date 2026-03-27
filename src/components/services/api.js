export const fetchTopNews = async () => {
  const res = await fetch(
    `${import.meta.env.NEWS_API_URL}/api/news/top`
  );

  return res.json();
};