import { CITIES_DATA } from "../data/cities";

export default function CitySelector({ selectedCity, setSelectedCity }) {
  return (
    <div id="city-buttons">
      {Object.entries(CITIES_DATA).map(([key, city]) => (
        <button
          key={key}
          className={selectedCity === key ? "active" : ""}
          onClick={() => setSelectedCity(key)}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
}
