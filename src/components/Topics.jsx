import { subscribe } from "../services/pushService";

export default function Topics() {
  const topics = ["News","entertainment","business","sports", "shop", "politics"];

  return (
    <>
      {topics.map(topic => (
        <button key={topic} onClick={() => subscribe(topic)}>
          Subscribe to {topic}
        </button>
      ))}
    </>
  );
}
