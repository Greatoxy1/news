export const fetchTopNews = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_NEWS_API_URL}/news`
  );

  return res.json();
};