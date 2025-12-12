import { useEffect, useMemo, useState } from "react";

import CitySelector from "../components/CitySelector";
import PlacesList from "../components/PlacesList";
import TripList from "../components/TripList";
import Filters from "../components/Filters";
import Modal from "../components/Modal";
import { fetchCities, fetchPlacesByCity } from "../services/cityService";

export default function Home() {
<<<<<<< HEAD
  //State for currently selected city key
  const [selectedCity, setSelectedCity] = useState("baku");
  //State for places added to the trip
=======
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [error, setError] = useState("");
>>>>>>> a9dd15e (Refactor UI components and pages; update dependencies across frontend and backend)
  const [tripList, setTripList] = useState([]);
  //State for category filter
  const [filterCategory, setFilterCategory] = useState("All");
  //State for sorting option
  const [sortBy, setSortBy] = useState("name");
  //State for search input
  const [searchTerm, setSearchTerm] = useState("");
  //State to control custom place modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

<<<<<<< HEAD
  //Debug log to inspect cities data
  console.log("CITIES_DATA in Home:", CITIES_DATA);

  //Get selected city object from data
  const city = CITIES_DATA?.[selectedCity];
=======
  useEffect(() => {
    const loadCities = async () => {
      setLoadingCities(true);
      setError("");
      try {
        const apiCities = await fetchCities();
        setCities(apiCities);
        if (apiCities.length > 0) {
          setSelectedCity(apiCities[0]);
        }
      } catch (err) {
        setError(err?.message || "Failed to load cities");
      } finally {
        setLoadingCities(false);
      }
    };

    loadCities();
  }, []);

  useEffect(() => {
    const loadPlaces = async () => {
      if (!selectedCity) {
        setPlaces([]);
        return;
      }

      setLoadingPlaces(true);
      setError("");
      try {
        const cityPlaces = await fetchPlacesByCity(selectedCity);
        setPlaces(cityPlaces);
      } catch (err) {
        setError(err?.message || `Failed to load places for ${selectedCity}`);
        setPlaces([]);
      } finally {
        setLoadingPlaces(false);
      }
    };

    loadPlaces();
  }, [selectedCity]);
>>>>>>> a9dd15e (Refactor UI components and pages; update dependencies across frontend and backend)

  //Memoized filtering and sorting of places for performance
  const filteredPlaces = useMemo(() => {
<<<<<<< HEAD
    //Return empty list if city data is missing
    if (!city || !city.places) return [];

    //Filter by category and search term
    let places = city.places.filter(
=======
    if (!places || places.length === 0) return [];

    const filtered = places.filter(
>>>>>>> a9dd15e (Refactor UI components and pages; update dependencies across frontend and backend)
      (p) =>
        (filterCategory === "All" || p.category === filterCategory) &&
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

<<<<<<< HEAD
    //Sort places based on selected option
    if (sortBy === "price-low") places.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") places.sort((a, b) => b.price - a.price);
=======
    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
>>>>>>> a9dd15e (Refactor UI components and pages; update dependencies across frontend and backend)

    return filtered;
  }, [places, filterCategory, searchTerm, sortBy]);

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

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    window.location.href = "/login";
  };

  return (
    <main>
      <header className="header">
        <div className="logo">
<<<<<<< HEAD
          <span><img style={{ height: "80px" }}src="/logo.png" alt="" /></span>
=======
          <span className="pin"><img style={{height:"80px"}} src="/logo.png" alt="" /></span>
>>>>>>> a9dd15e (Refactor UI components and pages; update dependencies across frontend and backend)
          <h1>Travella</h1>
        </div>

        <div className="trip-total">Trip Total: ${totalCost.toFixed(2)}</div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="city-selection">
        <h2>Choose Your Destination</h2>

        <CitySelector
          loading={loadingCities}
          cities={cities}
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
          <h2>{selectedCity ? `Explore ${selectedCity}` : "Explore"}</h2>

          {error && <p style={{ color: "salmon" }}>{error}</p>}

          <Filters
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {loadingPlaces ? (
            <p>Loading places...</p>
          ) : (
            <PlacesList
              places={filteredPlaces}
              tripList={tripList}
              addToTrip={addToTrip}
            />
          )}

          <button id="open-modal" onClick={() => setIsModalOpen(true)}>
            Add Custom
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
          cities={cities}
          selectedCity={selectedCity}
        />
      )}

      <footer style={{padding:"10px", textAlign: "center", background:"white"}}>
        <p>Copyright&copy;2025 Travella app</p>
      </footer>
    </main>
  );
}
