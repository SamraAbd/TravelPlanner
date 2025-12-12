import { useState, useMemo } from "react";
import { CITIES_DATA } from "../data/cities";

import CitySelector from "../components/CitySelector";
import PlacesList from "../components/PlacesList";
import TripList from "../components/TripList";
import Filters from "../components/Filters";
import Modal from "../components/Modal";

export default function Home() {
  //State for currently selected city key
  const [selectedCity, setSelectedCity] = useState("baku");
  //State for places added to the trip
  const [tripList, setTripList] = useState([]);
  //State for category filter
  const [filterCategory, setFilterCategory] = useState("All");
  //State for sorting option
  const [sortBy, setSortBy] = useState("name");
  //State for search input
  const [searchTerm, setSearchTerm] = useState("");
  //State to control custom place modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Debug log to inspect cities data
  console.log("CITIES_DATA in Home:", CITIES_DATA);

  //Get selected city object from data
  const city = CITIES_DATA?.[selectedCity];

  //Memoized filtering and sorting of places for performance
  const filteredPlaces = useMemo(() => {
    //Return empty list if city data is missing
    if (!city || !city.places) return [];

    //Filter by category and search term
    let places = city.places.filter(
      (p) =>
        (filterCategory === "All" || p.category === filterCategory) &&
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    //Sort places based on selected option
    if (sortBy === "price-low") places.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") places.sort((a, b) => b.price - a.price);

    return places;
  }, [city, filterCategory, searchTerm, sortBy]);

  //Add a place to the trip if it is not already added
  const addToTrip = (place) => {
    if (!tripList.find((p) => p.id === place.id)) {
      setTripList([...tripList, place]);
    }
  };

  //Remove a place from the trip by id
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
          <span><img style={{ height: "80px" }}src="/logo.png" alt="" /></span>
          <h1>Travella</h1>
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

      <footer style={{padding:"10px", textAlign: "center", background:"white"}}>
        <p>Copyright&copy;2025 Travella app</p>
      </footer>
    </main>
  );
}
