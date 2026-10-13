// ==========================================
// PERSONALISED AI TOURIST GUIDE
// Interactive World Map
// Uses Leaflet + OpenStreetMap
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const mapElement = document.getElementById("travelMap");

    if (!mapElement || typeof L === "undefined") {
        console.error("Map could not load. Check the Leaflet script.");
        return;
    }

    // Create the interactive map
    const map = L.map("travelMap").setView([20, 10], 2);

    // Free OpenStreetMap map tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Famous tourist destinations around the world
    const touristPlaces = [
        {
            name: "Taj Mahal",
            country: "Agra, India",
            lat: 27.1751,
            lng: 78.0421,
            info: "A famous white-marble monument built by Mughal emperor Shah Jahan."
        },
        {
            name: "India Gate",
            country: "New Delhi, India",
            lat: 28.6129,
            lng: 77.2295,
            info: "A historic war memorial in the heart of New Delhi."
        },
        {
            name: "Ajanta Caves",
            country: "Maharashtra, India",
            lat: 20.5519,
            lng: 75.7033,
            info: "Ancient Buddhist caves famous for paintings and rock-cut architecture."
        },
        {
            name: "Gateway of India",
            country: "Mumbai, India",
            lat: 18.9220,
            lng: 72.8347,
            info: "An iconic monument overlooking Mumbai Harbour."
        },
        {
            name: "Jaipur City Palace",
            country: "Jaipur, India",
            lat: 26.9258,
            lng: 75.8237,
            info: "A historic royal palace showcasing Rajasthan's architecture."
        },
        {
            name: "Red Fort",
            country: "New Delhi, India",
            lat: 28.6562,
            lng: 77.2410,
            info: "A historic Mughal fort and UNESCO World Heritage Site."
        },
        {
            name: "Eiffel Tower",
            country: "Paris, France",
            lat: 48.8584,
            lng: 2.2945,
            info: "One of the world's most recognisable landmarks."
        },
        {
            name: "Colosseum",
            country: "Rome, Italy",
            lat: 41.8902,
            lng: 12.4922,
            info: "An ancient Roman amphitheatre."
        },
        {
            name: "Statue of Liberty",
            country: "New York, USA",
            lat: 40.6892,
            lng: -74.0445,
            info: "A famous monument symbolising freedom."
        },
        {
            name: "Big Ben",
            country: "London, United Kingdom",
            lat: 51.5007,
            lng: -0.1246,
            info: "The famous clock tower landmark beside the UK Parliament."
        },
        {
            name: "Great Wall of China",
            country: "China",
            lat: 40.4319,
            lng: 116.5704,
            info: "A historic defensive structure stretching across northern China."
        },
        {
            name: "Burj Khalifa",
            country: "Dubai, UAE",
            lat: 25.1972,
            lng: 55.2744,
            info: "One of the tallest buildings in the world."
        },
        {
            name: "Petra",
            country: "Jordan",
            lat: 30.3285,
            lng: 35.4444,
            info: "An ancient city famous for its rock-cut architecture."
        },
        {
            name: "Machu Picchu",
            country: "Peru",
            lat: -13.1631,
            lng: -72.5450,
            info: "An ancient Inca settlement in the Andes Mountains."
        },
        {
            name: "Sydney Opera House",
            country: "Sydney, Australia",
            lat: -33.8568,
            lng: 151.2153,
            info: "A world-famous performing arts centre."
        },
        {
            name: "Mount Fuji",
            country: "Japan",
            lat: 35.3606,
            lng: 138.7274,
            info: "Japan's iconic mountain and popular sightseeing destination."
        },
        {
            name: "Pyramids of Giza",
            country: "Giza, Egypt",
            lat: 29.9792,
            lng: 31.1342,
            info: "Ancient Egyptian pyramids near Cairo."
        },
        {
            name: "Santorini",
            country: "Greece",
            lat: 36.3932,
            lng: 25.4615,
            info: "A Greek island famous for white buildings and sea views."
        },
        {
            name: "Christ the Redeemer",
            country: "Rio de Janeiro, Brazil",
            lat: -22.9519,
            lng: -43.2105,
            info: "A monumental statue overlooking Rio de Janeiro."
        },
        {
            name: "Niagara Falls",
            country: "Canada and USA",
            lat: 43.0962,
            lng: -79.0377,
            info: "A famous group of waterfalls on the Canada–USA border."
        }
    ];

    // Add destination markers to the map
    touristPlaces.forEach(function (place) {
        const marker = L.marker([place.lat, place.lng]).addTo(map);

        marker.bindPopup(`
            <div class="tourist-map-popup">
                <h3>${place.name}</h3>
                <p><strong>Location:</strong> ${place.country}</p>
                <p>${place.info}</p>
                <a
                    href="https://www.google.com/search?q=${encodeURIComponent(place.name + " " + place.country)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >Explore this place ↗</a>
            </div>
        `);
    });

    // Map search elements
    const searchInput = document.getElementById("mapLocation");
    const searchButton = document.getElementById("mapSearchButton");
    const mapStatus = document.getElementById("mapStatus");

    // Search a place using OpenStreetMap's public geocoding service
    async function searchPlace() {
        const query = searchInput ? searchInput.value.trim() : "";

        if (!query) {
            if (mapStatus) {
                mapStatus.textContent = "Please enter a city, landmark or destination.";
            }
            return;
        }

        if (mapStatus) {
            mapStatus.textContent = "Searching for " + query + "...";
        }

        if (searchButton) {
            searchButton.disabled = true;
        }

        try {
            const url =
                "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=" +
                encodeURIComponent(query);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Search service is temporarily unavailable.");
            }

            const results = await response.json();

            if (!results.length) {
                if (mapStatus) {
                    mapStatus.textContent =
                        "No location found. Try another city or landmark.";
                }
                return;
            }

            const result = results[0];
            const latitude = Number(result.lat);
            const longitude = Number(result.lon);

            map.setView([latitude, longitude], 13);

            L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup(`
                    <div class="tourist-map-popup">
                        <h3>${result.name || query}</h3>
                        <p>${result.display_name}</p>
                    </div>
                `)
                .openPopup();

            if (mapStatus) {
                mapStatus.textContent = "Location found: " + result.display_name;
            }
        } catch (error) {
            console.error("Map search error:", error);

            if (mapStatus) {
                mapStatus.textContent =
                    "Search failed. Please check your internet connection and try again.";
            }
        } finally {
            if (searchButton) {
                searchButton.disabled = false;
            }
        }
    }

    // Search only when the user clicks or presses Enter
    if (searchButton) {
        searchButton.addEventListener("click", searchPlace);
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                searchPlace();
            }
        });
    }

    // Make the map accessible to other project scripts if needed
    window.touristGuideMap = map;

    console.log("Tourist map loaded successfully!");
});