const destinations = [
    {
        name: "Taj Mahal",
        country: "Agra, India",
        category: "Historical",
        description: "Discover the magnificent marble mausoleum and its timeless Mughal architecture.",
        search: "Taj Mahal Agra India",
        icon: "🏛️"
    },
    {
        name: "India Gate",
        country: "New Delhi, India",
        category: "Historical",
        description: "Visit the iconic war memorial standing proudly in the heart of India's capital.",
        search: "India Gate New Delhi",
        icon: "🏛️"
    },
    {
        name: "Ajanta Caves",
        country: "Maharashtra, India",
        category: "Historical",
        description: "Explore remarkable rock-cut Buddhist caves famous for ancient paintings and sculptures.",
        search: "Ajanta Caves Maharashtra India",
        icon: "🪨"
    },
    {
        name: "Ellora Caves",
        country: "Maharashtra, India",
        category: "Historical",
        description: "Experience extraordinary cave temples carved into solid rock over centuries.",
        search: "Ellora Caves Kailasa Temple India",
        icon: "🪨"
    },
    {
        name: "Hawa Mahal",
        country: "Jaipur, India",
        category: "Architecture",
        description: "Admire Jaipur's famous pink palace with its intricate honeycomb windows.",
        search: "Hawa Mahal Jaipur India",
        icon: "🏰"
    },
    {
        name: "Gateway of India",
        country: "Mumbai, India",
        category: "Architecture",
        description: "See Mumbai's celebrated waterfront monument overlooking the Arabian Sea.",
        search: "Gateway of India Mumbai",
        icon: "🏛️"
    },
    {
        name: "Red Fort",
        country: "New Delhi, India",
        category: "Historical",
        description: "Explore the historic red sandstone fort at the centre of India's capital.",
        search: "Red Fort Delhi India",
        icon: "🏰"
    },
    {
        name: "Hampi",
        country: "Karnataka, India",
        category: "Historical",
        description: "Discover the spectacular ruins of the Vijayanagara Empire among giant boulders.",
        search: "Hampi Karnataka India ruins",
        icon: "🛕"
    },
    {
        name: "Varanasi Ghats",
        country: "Uttar Pradesh, India",
        category: "Historical",
        description: "Experience ancient riverside steps, historic temples, and living cultural traditions.",
        search: "Varanasi ghats Ganges India",
        icon: "🪔"
    },
    {
        name: "Kerala Backwaters",
        country: "Kerala, India",
        category: "Nature",
        description: "Cruise through peaceful waterways lined with palms and traditional villages.",
        search: "Kerala backwaters India houseboat",
        icon: "🌴"
    },
    {
        name: "Valley of Flowers",
        country: "Uttarakhand, India",
        category: "Nature",
        description: "Discover an extraordinary Himalayan valley filled with seasonal wildflowers.",
        search: "Valley of Flowers Uttarakhand India",
        icon: "🌸"
    },
    {
        name: "Ladakh",
        country: "Ladakh, India",
        category: "Adventure",
        description: "Experience dramatic mountains, high-altitude lakes, and Himalayan monasteries.",
        search: "Pangong Lake Ladakh India",
        icon: "🏔️"
    },
    {
        name: "Eiffel Tower",
        country: "Paris, France",
        category: "Architecture",
        description: "Experience one of the world's most recognisable landmarks in the City of Light.",
        search: "Eiffel Tower Paris France",
        icon: "🗼"
    },
    {
        name: "Colosseum",
        country: "Rome, Italy",
        category: "Historical",
        description: "Step into ancient Roman history at the iconic amphitheatre.",
        search: "Colosseum Rome Italy",
        icon: "🏛️"
    },
    {
        name: "Great Wall of China",
        country: "China",
        category: "Historical",
        description: "Explore one of humanity's most remarkable historic fortifications.",
        search: "Great Wall of China mountains",
        icon: "🧱"
    },
    {
        name: "Pyramids of Giza",
        country: "Giza, Egypt",
        category: "Historical",
        description: "Marvel at ancient pyramids that have fascinated travellers for thousands of years.",
        search: "Pyramids of Giza Egypt",
        icon: "🔺"
    },
    {
        name: "Statue of Liberty",
        country: "New York, USA",
        category: "Architecture",
        description: "Visit the famous monument welcoming visitors to New York Harbor.",
        search: "Statue of Liberty New York",
        icon: "🗽"
    },
    {
        name: "Machu Picchu",
        country: "Cusco Region, Peru",
        category: "Historical",
        description: "Discover the breathtaking Inca citadel high in the Andes Mountains.",
        search: "Machu Picchu Peru mountains",
        icon: "🏔️"
    },
    {
        name: "Mount Fuji",
        country: "Japan",
        category: "Nature",
        description: "Admire Japan's iconic volcanic mountain and its surrounding landscapes.",
        search: "Mount Fuji Japan lake",
        icon: "🗻"
    },
    {
        name: "Burj Khalifa",
        country: "Dubai, UAE",
        category: "Architecture",
        description: "See the celebrated skyscraper rising above Dubai's modern cityscape.",
        search: "Burj Khalifa Dubai",
        icon: "🏙️"
    },
    {
        name: "Santorini",
        country: "Cyclades, Greece",
        category: "Nature",
        description: "Enjoy whitewashed villages, blue domes, and dramatic Aegean Sea views.",
        search: "Santorini Greece blue domes",
        icon: "🌊"
    },
    {
        name: "Swiss Alps",
        country: "Switzerland",
        category: "Adventure",
        description: "Discover mountain trails, alpine villages, and spectacular snowy peaks.",
        search: "Swiss Alps Switzerland mountains",
        icon: "🏔️"
    },
    {
        name: "Serengeti National Park",
        country: "Tanzania",
        category: "Nature",
        description: "Explore vast African plains famous for extraordinary wildlife and migration.",
        search: "Serengeti National Park Tanzania wildlife",
        icon: "🦁"
    },
    {
        name: "Grand Canyon",
        country: "Arizona, USA",
        category: "Adventure",
        description: "Witness immense colourful cliffs carved by the Colorado River.",
        search: "Grand Canyon Arizona USA",
        icon: "🏜️"
    },
    {
        name: "Petra",
        country: "Ma'an, Jordan",
        category: "Historical",
        description: "Explore the ancient Nabataean city carved into rose-coloured sandstone cliffs.",
        search: "Petra Treasury Jordan",
        icon: "🏛️"
    },
    {
        name: "Bali",
        country: "Indonesia",
        category: "Nature",
        description: "Experience tropical landscapes, traditional temples, and lush rice terraces.",
        search: "Bali Indonesia rice terraces temple",
        icon: "🌴"
    },
    {
        name: "Sydney Opera House",
        country: "Sydney, Australia",
        category: "Architecture",
        description: "Admire the celebrated performing arts centre beside Sydney Harbour.",
        search: "Sydney Opera House Australia",
        icon: "🎭"
    },
    {
        name: "Banff National Park",
        country: "Alberta, Canada",
        category: "Adventure",
        description: "Discover turquoise lakes, rugged peaks, and beautiful Canadian wilderness.",
        search: "Banff National Park Lake Louise Canada",
        icon: "🏞️"
    },
    {
        name: "Angkor Wat",
        country: "Siem Reap, Cambodia",
        category: "Historical",
        description: "Explore the immense temple complex and remarkable Khmer architecture.",
        search: "Angkor Wat Cambodia temple",
        icon: "🛕"
    },
    {
        name: "Victoria Falls",
        country: "Zambia and Zimbabwe",
        category: "Nature",
        description: "Witness one of the world's most spectacular waterfalls.",
        search: "Victoria Falls Zambia Zimbabwe",
        icon: "💧"
    }
];


const grid = document.getElementById("destinationGrid");
const searchInput = document.getElementById("destinationSearch");
const count = document.getElementById("destinationCount");
const clearSearch = document.getElementById("clearSearch");

let selectedCategory = "All";
let searchTerm = "";
const imageCache = new Map();


function getSavedFavourites() {
    try {
        return JSON.parse(localStorage.getItem("wanderwise-favourites")) || [];
    } catch {
        return [];
    }
}


function saveFavourites(favourites) {
    localStorage.setItem(
        "wanderwise-favourites",
        JSON.stringify(favourites)
    );
}


function makeCard(place, index) {
    const card = document.createElement("article");
    card.className = "destination-card";

    const favourites = getSavedFavourites();
    const isSaved = favourites.includes(place.name);

    card.innerHTML = `
        <div class="card-image">
            <img
                alt="${place.name}, ${place.country}"
                loading="${index < 6 ? "eager" : "lazy"}"
            >

            <div class="image-fallback">${place.icon}</div>

            <span class="card-category">${place.category}</span>

            <button
                class="favorite-button ${isSaved ? "saved" : ""}"
                type="button"
                aria-label="${isSaved ? "Remove favourite" : "Save favourite"}"
                title="Save favourite"
            >${isSaved ? "♥" : "♡"}</button>
        </div>

        <div class="card-content">
            <div class="card-country">${place.country}</div>

            <h3>${place.name}</h3>

            <p>${place.description}</p>

            <div class="card-bottom">
                <span class="card-type">✦ ${place.category}</span>
                <a
                    class="learn-more"
                    href="https://www.google.com/search?q=${encodeURIComponent(place.name + " " + place.country + " official tourism")}"
                    target="_blank"
                    rel="noopener noreferrer"
                >Explore place ↗</a>
            </div>
        </div>
    `;

    const img = card.querySelector("img");
    const fallback = card.querySelector(".image-fallback");

    img.addEventListener("error", () => {
        img.classList.add("image-failed");
        fallback.classList.add("visible");
    });

    const cachedImage = imageCache.get(place.name);

    if (cachedImage) {
        img.src = cachedImage;
    } else {
        loadCommonsImage(place, img, fallback);
    }

    card.querySelector(".favorite-button").addEventListener("click", event => {
        const button = event.currentTarget;
        const saved = getSavedFavourites();
        const alreadySaved = saved.includes(place.name);

        const updated = alreadySaved
            ? saved.filter(name => name !== place.name)
            : [...saved, place.name];

        saveFavourites(updated);

        button.classList.toggle("saved", !alreadySaved);
        button.textContent = alreadySaved ? "♡" : "♥";
        button.setAttribute(
            "aria-label",
            alreadySaved ? "Save favourite" : "Remove favourite"
        );
    });

    return card;
}


async function loadCommonsImage(place, img, fallback) {
    const query = place.search || `${place.name} ${place.country} tourist attraction`;

    try {
        const url = new URL("https://commons.wikimedia.org/w/api.php");

        url.search = new URLSearchParams({
            action: "query",
            generator: "search",
            gsrsearch: query + " filemime:image",
            gsrnamespace: "6",
            gsrlimit: "10",
            prop: "imageinfo",
            iiprop: "url",
            iiurlwidth: "650",
            format: "json",
            origin: "*"
        }).toString();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Image search unavailable");
        }

        const data = await response.json();
        const pages = Object.values(data.query?.pages || {});

        const imagePage = pages.find(page => {
            const image = page.imageinfo?.[0];
            const imageUrl = image?.thumburl || image?.url || "";

            return imageUrl &&
                /\.(jpe?g|png|webp)(\?|$)/i.test(imageUrl);
        });

        if (!imagePage) {
            fallback.classList.add("visible");
            return;
        }

        const imageUrl =
            imagePage.imageinfo[0].thumburl ||
            imagePage.imageinfo[0].url;

        imageCache.set(place.name, imageUrl);

        img.onload = () => {
            img.classList.remove("image-failed");
            fallback.classList.remove("visible");
        };

        img.onerror = () => {
            img.classList.add("image-failed");
            fallback.classList.add("visible");
        };

        img.src = imageUrl;
        img.alt = `${place.name}, ${place.country}`;
        img.title = `Image source: Wikimedia Commons — ${imagePage.title}`;

    } catch (error) {
        console.error("Could not load image for " + place.name, error);
        fallback.classList.add("visible");
    }
}