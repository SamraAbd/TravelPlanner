import { useState, useMemo } from "react";
import { CITIES_DATA } from "../data/cities";

import CitySelector from "../components/CitySelector";
import PlacesList from "../components/PlacesList";
import TripList from "../components/TripList";
import Filters from "../components/Filters";
import Modal from "../components/Modal";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("baku");
  const [tripList, setTripList] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("CITIES_DATA in Home:", CITIES_DATA);

  const city = CITIES_DATA?.[selectedCity];

  const filteredPlaces = useMemo(() => {
    if (!city || !city.places) return [];

    let places = city.places.filter(
      (p) =>
        (filterCategory === "All" || p.category === filterCategory) &&
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (sortBy === "price-low") places.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") places.sort((a, b) => b.price - a.price);

    return places;
  }, [city, filterCategory, searchTerm, sortBy]);

  const addToTrip = (place) => {
    if (!tripList.find((p) => p.id === place.id)) {
      setTripList([...tripList, place]);
    }
  };

  const removeFromTrip = (id) => {
    setTripList(tripList.filter((p) => p.id !== id));
  };

  const totalCost = tripList.reduce((sum, p) => sum + p.price, 0);

  // ❗ DEBUG SAFE OUTPUT — shows exactly what the problem is
  if (!city) {
    return (
      <main style={{ padding: "30px", color: "white", whiteSpace: "pre-wrap" }}>
        <h2>CITIES_DATA Debug Info</h2>
        <div>CITIES_DATA typeof: {typeof CITIES_DATA}</div>
        <div>Raw value:</div>
        <pre>{JSON.stringify(CITIES_DATA, null, 2)}</pre>
      </main>
    );
  }

  return (
    <main>
        
      <header className="header">
        <div className="logo">
          <span className="pin">📍</span>
          <h1>Travel Planner</h1>
        </div>

        <div className="trip-total">
          💵 Trip Total: ${totalCost.toFixed(2)}
        </div>  

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("logged_in_user");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </header>


      <section className="city-selection">
        <h2>Choose Your Destination</h2>
        
        <CitySelector
          selectedCity={selectedCity}
          setSelectedCity={(key) => {
            setSelectedCity(key);
            setFilterCategory("All");
            setSearchTerm("");
            setSortBy("name");
          }}
        />
      </section>

      <div className="content">
        <section className="places">
          <h2>{`Explore ${city.name}`}</h2>

          <Filters
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <PlacesList
            places={filteredPlaces}
            tripList={tripList}
            addToTrip={addToTrip}
          />

          <button id="open-modal" onClick={() => setIsModalOpen(true)}>
            ➕ Add Custom
          </button>
        </section>

        <aside className="trip-list">
          <TripList
            tripList={tripList}
            removeFromTrip={removeFromTrip}
            totalCost={totalCost}
          />
        </aside>
      </div>

      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          tripList={tripList}
          setTripList={setTripList}
        />
      )}
    </main>
  );
}
