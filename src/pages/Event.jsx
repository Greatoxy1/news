import { Link } from "react-router-dom";
import { events } from "../data/events";

export default function Events() {
  return (
    <div>
      <h1>Events</h1>

      {events.map(event => (
        <div key={event.slug}>
          <h2>
            <Link to={`/events/${event.slug}`}>
              {event.title}
            </Link>
          </h2>

          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}