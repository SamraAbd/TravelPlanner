const CITIES_DATA = {
  baku: {
    name: 'Baku',
    country: 'Azerbaijan',
    places: [
      { id: 1, name: 'Flame Towers', category: 'Landmark', price: 15, description: 'Iconic skyscrapers of Baku' },
      { id: 2, name: 'Old City (Icherisheher)', category: 'Landmark', price: 0, description: 'Historic walled city' },
      { id: 3, name: 'Maiden Tower', category: 'Museum', price: 10, description: 'Ancient defensive tower' },
      { id: 4, name: 'Boulevard', category: 'Park', price: 0, description: 'Seaside promenade' },
      { id: 5, name: 'Nargiz Restaurant', category: 'Restaurant', price: 40, description: 'Traditional Azerbaijani cuisine' },
      { id: 6, name: 'Heydar Aliyev Center', category: 'Museum', price: 12, description: 'Modern architectural marvel' },
      { id: 7, name: 'Taza Bazaar', category: 'Shopping', price: 20, description: 'Traditional market experience' },
      { id: 8, name: 'Firuze Restaurant', category: 'Restaurant', price: 35, description: 'Fine dining with city views' }
    ]
  },
  paris: {
    name: 'Paris',
    country: 'France',
    places: [
      { id: 9, name: 'Louvre Museum', category: 'Museum', price: 17, description: 'World\'s largest art museum' },
      { id: 10, name: 'Eiffel Tower', category: 'Landmark', price: 28, description: 'Iconic iron lattice tower' },
      { id: 11, name: 'Notre-Dame Cathedral', category: 'Landmark', price: 0, description: 'Gothic cathedral masterpiece' },
      { id: 12, name: 'Luxembourg Gardens', category: 'Park', price: 0, description: 'Beautiful public gardens' },
      { id: 13, name: 'Le Jules Verne', category: 'Restaurant', price: 180, description: 'Michelin-starred dining' },
      { id: 14, name: 'Musée d\'Orsay', category: 'Museum', price: 16, description: 'Impressionist art collection' },
      { id: 15, name: 'Galeries Lafayette', category: 'Shopping', price: 50, description: 'Luxury department store' },
      { id: 16, name: 'Café de Flore', category: 'Restaurant', price: 45, description: 'Historic Parisian café' }
    ]
  },
  rome: {
    name: 'Rome',
    country: 'Italy',
    places: [
      { id: 17, name: 'Colosseum', category: 'Landmark', price: 18, description: 'Ancient amphitheater' },
      { id: 18, name: 'Vatican Museums', category: 'Museum', price: 20, description: 'Papal art collection' },
      { id: 19, name: 'Trevi Fountain', category: 'Landmark', price: 0, description: 'Baroque fountain' },
      { id: 20, name: 'Villa Borghese', category: 'Park', price: 0, description: 'Large landscape garden' },
      { id: 21, name: 'La Pergola', category: 'Restaurant', price: 200, description: 'Three Michelin stars' },
      { id: 22, name: 'Pantheon', category: 'Landmark', price: 5, description: 'Ancient Roman temple' },
      { id: 23, name: 'Via Condotti', category: 'Shopping', price: 100, description: 'Luxury shopping street' },
      { id: 24, name: 'Trattoria Monti', category: 'Restaurant', price: 50, description: 'Authentic Roman cuisine' }
    ]
  },
  tokyo: {
    name: 'Tokyo',
    country: 'Japan',
    places: [
      { id: 25, name: 'Senso-ji Temple', category: 'Landmark', price: 0, description: 'Ancient Buddhist temple' },
      { id: 26, name: 'Tokyo National Museum', category: 'Museum', price: 10, description: 'Japanese art and antiquities' },
      { id: 27, name: 'Shibuya Crossing', category: 'Landmark', price: 0, description: 'Famous pedestrian scramble' },
      { id: 28, name: 'Shinjuku Gyoen', category: 'Park', price: 5, description: 'Large park with gardens' },
      { id: 29, name: 'Sukiyabashi Jiro', category: 'Restaurant', price: 300, description: 'Three Michelin stars sushi' },
      { id: 30, name: 'Tokyo Skytree', category: 'Landmark', price: 25, description: 'Broadcasting tower with views' },
      { id: 31, name: 'Ginza District', category: 'Shopping', price: 150, description: 'Upscale shopping area' },
      { id: 32, name: 'Ichiran Ramen', category: 'Restaurant', price: 15, description: 'Famous ramen chain' }
    ]
  },
  london: {
    name: 'London',
    country: 'United Kingdom',
    places: [
      { id: 33, name: 'British Museum', category: 'Museum', price: 0, description: 'World culture and history' },
      { id: 34, name: 'Tower of London', category: 'Landmark', price: 32, description: 'Historic royal palace' },
      { id: 35, name: 'Big Ben', category: 'Landmark', price: 0, description: 'Iconic clock tower' },
      { id: 36, name: 'Hyde Park', category: 'Park', price: 0, description: 'Large royal park' },
      { id: 37, name: 'The Ledbury', category: 'Restaurant', price: 150, description: 'Two Michelin stars' },
      { id: 38, name: 'Tate Modern', category: 'Museum', price: 0, description: 'Modern art gallery' },
      { id: 39, name: 'Oxford Street', category: 'Shopping', price: 80, description: 'Major shopping destination' },
      { id: 40, name: 'Dishoom', category: 'Restaurant', price: 35, description: 'Bombay-style café' }
    ]
  }
};

let selectedCity = 'baku';
let tripList = [];
let filterCategory = 'All';
let sortBy = 'name';
let searchTerm = '';

const cityButtons = document.getElementById('city-buttons');
const categoryFilters = document.getElementById('category-filters');
const placesList = document.getElementById('places-list');
const cityName = document.getElementById('city-name');
const totalCostEl = document.getElementById('total-cost');
const totalCostBottom = document.getElementById('total-cost-bottom');
const tripCount = document.getElementById('trip-count');
const tripItems = document.getElementById('trip-items');

const modal = document.getElementById('modal');
const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('close-modal');
const addCustomBtn = document.getElementById('add-custom');

function renderCities() {
  cityButtons.innerHTML = '';
  for (const [key, city] of Object.entries(CITIES_DATA)) {
    const btn = document.createElement('button');
    btn.textContent = city.name;
    btn.className = selectedCity === key ? 'active' : '';
    btn.onclick = () => {
      selectedCity = key;
      renderCities();
      renderPlaces();
    };
    cityButtons.appendChild(btn);
  }
}


function renderFilters() {
  const categories = ['All', 'Museum', 'Restaurant', 'Park', 'Landmark', 'Shopping'];
  categoryFilters.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    if (filterCategory === cat) btn.classList.add('active');
    btn.onclick = () => {
      filterCategory = cat;
      renderFilters();
      renderPlaces();
    };
    categoryFilters.appendChild(btn);
  });
}

function renderPlaces() {
  const city = CITIES_DATA[selectedCity];
  cityName.textContent = `Explore ${city.name}`;

  let places = city.places.filter(p =>
    (filterCategory === 'All' || p.category === filterCategory) &&
    (p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm))
  );

  if (sortBy === 'price-low') places.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') places.sort((a, b) => b.price - a.price);

  placesList.innerHTML = '';
  for (const p of places) {
    const card = document.createElement('div');
    card.className = 'place-card';
    if (tripList.find(t => t.id === p.id)) card.classList.add('added');

    card.innerHTML = `
      <h4>${p.name}</h4>
      <p>${p.category} — ${p.price === 0 ? 'Free' : '$' + p.price}</p>
      <small>${p.description}</small>
    `;
    card.onclick = () => addToTrip(p);
    placesList.appendChild(card);
  }
}

function renderTrip() {
  tripItems.innerHTML = '';
  let total = 0;
  for (const p of tripList) {
    total += p.price;
    const item = document.createElement('div');
    item.className = 'trip-item';
    item.innerHTML = `
      <span>${p.name} (${p.category})</span>
      <span>$${p.price} <button onclick="removeFromTrip(${p.id})">❌</button></span>
    `;
    tripItems.appendChild(item);
  }
  totalCostEl.textContent = total.toFixed(2);
  totalCostBottom.textContent = total.toFixed(2);
  tripCount.textContent = tripList.length;
}

function addToTrip(place) {
  if (!tripList.find(p => p.id === place.id)) {
    tripList.push(place);
    renderPlaces();
    renderTrip();
  }
}

function removeFromTrip(id) {
  tripList = tripList.filter(p => p.id !== id);
  renderPlaces();
  renderTrip();
}

// Search, sort
document.getElementById('search').oninput = e => {
  searchTerm = e.target.value.toLowerCase();
  renderPlaces();
};
document.getElementById('sort').onchange = e => {
  sortBy = e.target.value;
  renderPlaces();
};

// Modal handlers
openModal.onclick = () => modal.classList.remove('hidden');
closeModal.onclick = () => modal.classList.add('hidden');
addCustomBtn.onclick = () => {
  const name = document.getElementById('custom-name').value;
  const category = document.getElementById('custom-category').value;
  const price = parseFloat(document.getElementById('custom-price').value || 0);
  if (!name) return;
  const newPlace = { id: Date.now(), name, category, price, description: 'Custom added place' };
  tripList.push(newPlace);
  renderTrip();
  modal.classList.add('hidden');
};

// Initialize
renderCities();
renderFilters();
renderPlaces();
renderTrip();
