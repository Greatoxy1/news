export const fetchTopNews = async () => {
  const res = await fetch(
    `${import.meta.env.NEWSAPI_URL}/api/news/top`
  );

  return res.json();
};