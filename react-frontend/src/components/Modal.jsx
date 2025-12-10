import { useState } from "react";

export default function Modal({ setIsModalOpen, tripList, setTripList }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Restaurant");
  const [price, setPrice] = useState("");

  const addCustomPlace = () => {
    if (!name || price === "") return;

    setTripList([
      ...tripList,
      {
        id: Date.now(),
        name,
        category,
        price: Number(price),
        description: "Custom place",
      },
    ]);

    setIsModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Add Custom Place</h2>

        <label>Place Name</label>
        <input
          type="text"
          placeholder="e.g. Local Restaurant"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Restaurant</option>
          <option>Museum</option>
          <option>Park</option>
          <option>Landmark</option>
          <option>Shopping</option>
        </select>

        <label>Price ($)</label>
        <input
          type="number"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="primary-btn" onClick={addCustomPlace}>
          Add to Trip
        </button>

        <button
          className="secondary-btn"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
