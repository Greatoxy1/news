export const fetchTopNews = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_NEWSAPI_URL}/api/news/top`
  );

  return res.json();
};