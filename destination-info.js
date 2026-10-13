// ==========================================
// DESTINATION INFORMATION
// Personalised AI Tourist Guide
// ==========================================

const destinationInformation = {
    "pune": {
        name: "Pune, Maharashtra",
        emoji: "🏙️",
        category: "Historical",
        description: "Discover Maharashtra's cultural capital, known for its historic forts, museums and vibrant food culture.",
        attractions: [
            "Shaniwar Wada",
            "Aga Khan Palace",
            "Sinhagad Fort",
            "Dagdusheth Halwai Ganpati Temple"
        ],
        foods: [
            "Misal Pav",
            "Mastani",
            "Puneri Bhakarwadi"
        ],
        activities: [
            "Explore historic forts",
            "Visit museums and temples",
            "Enjoy local street food"
        ],
        bestTime: "October to February"
    },

    "mumbai": {
        name: "Mumbai, Maharashtra",
        emoji: "🌆",
        category: "Architecture",
        description: "Experience India's bustling financial capital, famous for its coastline, heritage buildings and street food.",
        attractions: [
            "Gateway of India",
            "Marine Drive",
            "Elephanta Caves",
            "Chhatrapati Shivaji Maharaj Terminus"
        ],
        foods: [
            "Vada Pav",
            "Pav Bhaji",
            "Bombay Sandwich"
        ],
        activities: [
            "Walk along Marine Drive",
            "Explore heritage architecture",
            "Enjoy local street food"
        ],
        bestTime: "November to February"
    },

    "goa": {
        name: "Goa, India",
        emoji: "🏖️",
        category: "Nature",
        description: "Relax on beautiful beaches and discover Portuguese-influenced architecture and coastal culture.",
        attractions: [
            "Baga Beach",
            "Basilica of Bom Jesus",
            "Fort Aguada",
            "Dudhsagar Falls"
        ],
        foods: [
            "Goan Fish Curry",
            "Bebinca",
            "Goan Prawn Curry"
        ],
        activities: [
            "Relax at the beach",
            "Explore Old Goa",
            "Enjoy water activities"
        ],
        bestTime: "November to February"
    },

    "jaipur": {
        name: "Jaipur, Rajasthan",
        emoji: "🏰",
        category: "Historical",
        description: "Explore the Pink City, celebrated for royal palaces, colourful markets and traditional Rajasthani culture.",
        attractions: [
            "Hawa Mahal",
            "Amber Fort",
            "City Palace",
            "Jantar Mantar"
        ],
        foods: [
            "Dal Baati Churma",
            "Ghewar",
            "Pyaaz Kachori"
        ],
        activities: [
            "Visit royal forts and palaces",
            "Shop in traditional markets",
            "Taste Rajasthani cuisine"
        ],
        bestTime: "October to March"
    },

    "delhi": {
        name: "Delhi, India",
        emoji: "🏛️",
        category: "Historical",
        description: "Discover India's capital through historic monuments, museums, markets and diverse food.",
        attractions: [
            "Red Fort",
            "India Gate",
            "Qutub Minar",
            "Humayun's Tomb"
        ],
        foods: [
            "Chole Bhature",
            "Parathas",
            "Chaat"
        ],
        activities: [
            "Explore historic monuments",
            "Visit museums",
            "Discover Old Delhi markets"
        ],
        bestTime: "October to March"
    },

    "manali": {
        name: "Manali, Himachal Pradesh",
        emoji: "🏔️",
        category: "Adventure",
        description: "Enjoy Himalayan scenery, mountain villages, river valleys and outdoor adventures.",
        attractions: [
            "Solang Valley",
            "Hadimba Temple",
            "Old Manali",
            "Rohtang Pass, when accessible"
        ],
        foods: [
            "Siddu",
            "Himachali Dham",
            "Thukpa"
        ],
        activities: [
            "Enjoy mountain views",
            "Try suitable outdoor adventures",
            "Explore local villages"
        ],
        bestTime: "March to June for milder weather; winter for snow, depending on conditions"
    },

    "agra": {
        name: "Agra, Uttar Pradesh",
        emoji: "🕌",
        category: "Architecture",
        description: "Discover Mughal architecture and one of the world's most famous monuments.",
        attractions: [
            "Taj Mahal",
            "Agra Fort",
            "Fatehpur Sikri",
            "Mehtab Bagh"
        ],
        foods: [
            "Petha",
            "Bedai and Jalebi",
            "Mughlai Cuisine"
        ],
        activities: [
            "Visit Mughal monuments",
            "Explore historic architecture",
            "Try local sweets"
        ],
        bestTime: "October to March"
    },

    "nashik": {
        name: "Nashik, Maharashtra",
        emoji: "🛕",
        category: "Historical",
        description: "Explore an important pilgrimage destination known for temples, riverfronts and nearby hills.",
        attractions: [
            "Trimbakeshwar Temple",
            "Panchavati",
            "Pandavleni Caves",
            "Sula region"
        ],
        foods: [
            "Misal Pav",
            "Maharashtrian Thali",
            "Local sweets"
        ],
        activities: [
            "Visit temples",
            "Explore ancient caves",
            "Enjoy nearby nature spots"
        ],
        bestTime: "October to February"
    },

    "mahabaleshwar": {
        name: "Mahabaleshwar, Maharashtra",
        emoji: "🌿",
        category: "Nature",
        description: "Enjoy green hills, scenic viewpoints, forests and strawberry farms during the appropriate season.",
        attractions: [
            "Arthur's Seat",
            "Venna Lake",
            "Pratapgad Fort",
            "Mapro Garden"
        ],
        foods: [
            "Strawberries, when in season",
            "Corn Patties",
            "Maharashtrian Snacks"
        ],
        activities: [
            "Visit scenic viewpoints",
            "Explore nearby forts",
            "Enjoy nature walks"
        ],
        bestTime: "October to May for generally clearer sightseeing conditions"
    }
};


// Find the destination section.
const destinationSection = document.getElementById("destinations");
const destinationGrid = document.getElementById("destinationGrid");
const destinationSearch = document.getElementById("searchInput");
const destinationCount = document.getElementById("destinationCount");


// Create the information cards.
function showDestinationCards() {
    if (!destinationGrid) return;

    destinationGrid.innerHTML = "";

    Object.entries(destinationInformation).forEach(([key, place]) => {
        const card = document.createElement("article");

        card.className = "destination-card";
        card.innerHTML = `
            <div class="destination-info-icon">${place.emoji}</div>

            <div class="destination-card-content">
                <span class="destination-category">${place.category}</span>

                <h3>${place.name}</h3>

                <p>${place.description}</p>

                <button type="button"
                    class="destination-details-button"
                    data-destination="${key}">
                    Explore Destination ↗
                </button>
            </div>
        `;

        destinationGrid.appendChild(card);
    });

    if (destinationCount) {
        destinationCount.textContent =
            Object.keys(destinationInformation).length + " destinations";
    }
}


// Display the full details when a user clicks a card.
function showDestinationDetails(key) {
    const place = destinationInformation[key];

    if (!place) return;

    let oldPanel = document.getElementById("destinationDetailsPanel");

    if (oldPanel) {
        oldPanel.remove();
    }

    const panel = document.createElement("section");
    panel.id = "destinationDetailsPanel";
    panel.className = "destination-details-panel";

    panel.innerHTML = `
        <button type="button"
            class="destination-close-button"
            id="closeDestinationDetails">
            ✕ Close
        </button>

        <div class="destination-details-heading">
            <span class="destination-info-icon">${place.emoji}</span>
            <div>
                <span class="section-label">DESTINATION GUIDE</span>
                <h2>${place.name}</h2>
            </div>
        </div>

        <p class="destination-description">${place.description}</p>

        <div class="destination-detail-grid">

            <div class="destination-detail-box">
                <h3>📍 Famous Attractions</h3>
                <ul>
                    ${place.attractions.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>

            <div class="destination-detail-box">
                <h3>🍽️ Local Food</h3>
                <ul>
                    ${place.foods.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>

            <div class="destination-detail-box">
                <h3>🎯 Activities</h3>
                <ul>
                    ${place.activities.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>

            <div class="destination-detail-box">
                <h3>🗓️ Suggested Season</h3>
                <p>${place.bestTime}</p>
                <small>Check local weather and attraction opening information before travelling.</small>
            </div>

        </div>

        <button type="button"
            class="primary-button"
            id="useDestinationInPlanner">
            Plan a Trip Here ↗
        </button>
    `;

    destinationSection.appendChild(panel);
    panel.scrollIntoView({ behavior: "smooth", block: "start" });

    document.getElementById("closeDestinationDetails").addEventListener("click", () => {
        panel.remove();
    });

    document.getElementById("useDestinationInPlanner").addEventListener("click", () => {
        const destinationInput = document.getElementById("destinationPoint");

        if (destinationInput) {
            destinationInput.value = place.name;
        }

        document.getElementById("travel-planner").scrollIntoView({
            behavior: "smooth"
        });
    });
}


// Handle clicks on destination cards.
if (destinationGrid) {
    destinationGrid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-destination]");

        if (button) {
            showDestinationDetails(button.dataset.destination);
        }
    });
}


// Search the built-in destination list.
if (destinationSearch) {
    destinationSearch.addEventListener("input", () => {
        const query = destinationSearch.value.trim().toLowerCase();
        const cards = destinationGrid.querySelectorAll(".destination-card");
        let visibleCount = 0;

        cards.forEach(card => {
            const matches = card.textContent.toLowerCase().includes(query);
            card.style.display = matches ? "" : "none";

            if (matches) visibleCount++;
        });

        if (destinationCount) {
            destinationCount.textContent =
                visibleCount + " matching destinations";
        }
    });
}


// Clear the destination search.
const clearDestinationSearch = document.getElementById("clearSearch");

if (clearDestinationSearch) {
    clearDestinationSearch.addEventListener("click", () => {
        if (destinationSearch) {
            destinationSearch.value = "";
            destinationSearch.dispatchEvent(new Event("input"));
        }
    });
}


// Initialise destination cards.
showDestinationCards();


// Add styles for the new feature.
const destinationStyles = document.createElement("style");

destinationStyles.textContent = `
    .destination-card {
        padding: 24px;
        border-radius: 16px;
        border: 1px solid #e5e7eb;
        background: white;
        box-shadow: 0 5px 20px rgba(0,0,0,0.04);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .destination-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 28px rgba(0,0,0,0.09);
    }

    .destination-info-icon {
        font-size: 38px;
        margin-bottom: 12px;
    }

    .destination-category {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #64748b;
    }

    .destination-card-content h3 {
        margin: 8px 0;
    }

    .destination-details-button,
    .destination-close-button {
        padding: 10px 14px;
        border-radius: 8px;
        border: 1px solid #d1d5db;
        background: white;
        cursor: pointer;
        margin-top: 12px;
    }

    .destination-details-panel {
        margin-top: 30px;
        padding: 28px;
        border-radius: 18px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        scroll-margin-top: 30px;
    }

    .destination-close-button {
        float: right;
        margin-top: 0;
    }

    .destination-details-heading {
        display: flex;
        align-items: center;
        gap: 16px;
        margin: 18px 0;
    }

    .destination-details-heading h2 {
        margin: 6px 0;
    }

    .destination-description {
        line-height: 1.7;
    }

    .destination-detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        margin: 24px 0;
    }

    .destination-detail-box {
        padding: 18px;
        border-radius: 12px;
        background: white;
        border: 1px solid #e2e8f0;
    }

    .destination-detail-box h3 {
        font-size: 16px;
    }

    .destination-detail-box li {
        margin: 8px 0;
    }

    @media (max-width: 600px) {
        .destination-details-panel {
            padding: 16px;
        }
    }
`;

document.head.appendChild(destinationStyles);