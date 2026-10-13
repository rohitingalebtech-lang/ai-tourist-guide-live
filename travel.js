// PERSONALISED AI TOURIST GUIDE - TRIP PLANNER

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("advancedPlannerForm");
    const resultBox = document.getElementById("advancedPlannerResult");

    if (!form || !resultBox) {
        console.error("Trip planner form or result section not found.");
        return;
    }

    const getValue = id => {
        const element = document.getElementById(id);
        return element ? element.value.trim() : "";
    };

    const escapeHTML = text =>
        String(text ?? "").replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);

    const money = amount =>
        "₹" + Math.round(amount).toLocaleString("en-IN");

    function showMessage(message) {
        resultBox.innerHTML = `
            <div class="planner-result-card">
                <h3>✈️ Your Travel Guide</h3>
                <p>${escapeHTML(message)}</p>
            </div>
        `;

        resultBox.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function searchLink(query) {
        return "https://www.google.com/search?q=" +
            encodeURIComponent(query);
    }

    function mapsLink(origin, destination) {
        return "https://www.google.com/maps/dir/?api=1&origin=" +
            encodeURIComponent(origin) +
            "&destination=" +
            encodeURIComponent(destination);
    }

    async function findPlace(place) {
        const url =
            "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" +
            encodeURIComponent(place);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch(url, {
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error("Location service is temporarily unavailable.");
            }

            const locations = await response.json();

            if (!locations.length) {
                throw new Error(
                    "Location not found: " + place +
                    ". Try including the city and country."
                );
            }

            return locations[0];
        } catch (error) {
            if (error.name === "AbortError") {
                throw new Error(
                    "Location search timed out. Please try again."
                );
            }

            throw error;
        } finally {
            clearTimeout(timeout);
        }
    }

    function getIdeas(interest) {
        const ideas = {
            Historical: [
                "Visit famous monuments and heritage sites.",
                "Explore museums and historical landmarks.",
                "Learn about local history and culture."
            ],
            Nature: [
                "Explore gardens, lakes and scenic viewpoints.",
                "Enjoy a nature walk or outdoor activity.",
                "Take photographs and relax in nature."
            ],
            Architecture: [
                "Explore famous buildings and landmarks.",
                "Visit historic streets and architectural sites.",
                "Discover local design and cultural heritage."
            ],
            Adventure: [
                "Research safe local adventure activities.",
                "Check weather and operator safety rules.",
                "Allow time for rest and travel."
            ],
            Culture: [
                "Explore local culture and traditional areas.",
                "Visit cultural centres and museums.",
                "Look for verified local events."
            ],
            Food: [
                "Try regional food specialities.",
                "Explore well-reviewed restaurants.",
                "Check prices and opening hours."
            ]
        };

        return ideas[interest] || ideas.Culture;
    }

    function makeItinerary(days, interest, departure) {
        const ideas = getIdeas(interest);

        let html = `
            <div class="planner-section">
                <h3>🗓️ Your Personalised Itinerary</h3>
                <p class="planner-note">
                    Suggested activities. Verify timings and opening hours.
                </p>
        `;

        for (let day = 1; day <= days; day++) {
            const date = new Date(departure + "T12:00:00");
            date.setDate(date.getDate() + day - 1);

            const dateText = date.toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short"
            });

            const first = day === 1
                ? "Arrive, check in and explore the nearby area."
                : ideas[(day - 2) % ideas.length];

            const second = day === days
                ? "Enjoy some free time and prepare for departure."
                : ideas[(day - 1) % ideas.length];

            html += `
                <div class="itinerary-day">
                    <div class="itinerary-day-number">Day ${day}</div>
                    <div>
                        <h4>${escapeHTML(dateText)}</h4>
                        <p>${escapeHTML(first)}</p>
                        <p>${escapeHTML(second)}</p>
                    </div>
                </div>
            `;
        }

        return html + "</div>";
    }

    function serviceCard(title, description, link, buttonText) {
        return `
            <div class="planner-service-card">
                <h4>${escapeHTML(title)}</h4>
                <p>${escapeHTML(description)}</p>
                <a class="planner-link"
                   href="${escapeHTML(link)}"
                   target="_blank"
                   rel="noopener noreferrer">
                    ${escapeHTML(buttonText)} ↗
                </a>
            </div>
        `;
    }

    function formatDate(date) {
        return new Date(date + "T12:00:00").toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const origin = getValue("startingPoint");
        const destination = getValue("destinationPoint");
        const departure = getValue("departureDate");
        const returnDate = getValue("returnDate");
        const budget = Number(getValue("travelBudget"));
        const travellers = Number(getValue("travellerCount")) || 1;
        const transport = getValue("transportMode") || "any";
        const interest = getValue("travelInterest") || "Culture";
        const season = getValue("travelSeason") || "any";
        const style = getValue("travelStyle") || "balanced";

        if (!origin || !destination || !departure || !returnDate) {
            showMessage(
                "Please enter your starting point, destination and travel dates."
            );
            return;
        }

        if (!Number.isFinite(budget) || budget <= 0) {
            showMessage("Please enter a valid travel budget.");
            return;
        }

        const start = new Date(departure + "T12:00:00");
        const end = new Date(returnDate + "T12:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) {
            showMessage("Please select today or a future departure date.");
            return;
        }

        if (end < start) {
            showMessage("Return date must be on or after departure date.");
            return;
        }

        if (travellers < 1) {
            showMessage("Please select at least one traveller.");
            return;
        }

        const days = Math.round((end - start) / 86400000) + 1;
        const button = form.querySelector('[type="submit"]');

        if (button) {
            button.disabled = true;
            button.textContent = "Creating Your Journey...";
        }

        resultBox.innerHTML = `
            <div class="planner-result-card">
                <h3>🌍 Preparing Your Journey...</h3>
                <p>Preparing your itinerary. Please wait.</p>
            </div>
        `;

        try {
            let originPlace = null;
            let destinationPlace = null;

            // Location lookup is helpful, but must not block the itinerary.
            try {
                originPlace = await findPlace(origin);
            } catch (error) {
                console.warn("Starting location lookup:", error.message);
            }

            try {
                destinationPlace = await findPlace(destination);
            } catch (error) {
                console.warn("Destination lookup:", error.message);
            }

            const route = mapsLink(origin, destination);
            const totalPerPerson = budget / travellers;

            const budgetItems = [
                ["Transport", 0.30],
                ["Accommodation", 0.30],
                ["Food", 0.20],
                ["Activities", 0.15],
                ["Emergency savings", 0.05]
            ];

            const budgetHTML = budgetItems.map(([name, share]) => `
                <div class="budget-row">
                    <span>${escapeHTML(name)}</span>
                    <strong>${money(budget * share)}</strong>
                </div>
            `).join("");

            let transportQuery = "bus train and flight options";

            if (transport === "bus") transportQuery = "bus tickets";
            if (transport === "rail") transportQuery = "train tickets";
            if (transport === "flight") transportQuery = "flight tickets";
            if (transport === "private") transportQuery = "driving route";

            const transportLink = transport === "private"
                ? route
                : searchLink(
                    transportQuery + " " + origin + " to " + destination
                );

            const plannerHTML = `
                <div class="planner-result-card">
                    <h2>✈️ Your Personalised Travel Plan</h2>

                    <p><strong>Starting point:</strong> ${escapeHTML(origin)}</p>
                    <p><strong>Destination:</strong> ${escapeHTML(destination)}</p>
                    <p><strong>Departure:</strong> ${escapeHTML(formatDate(departure))}</p>
                    <p><strong>Return:</strong> ${escapeHTML(formatDate(returnDate))}</p>
                    <p><strong>Duration:</strong> ${days} day(s)</p>
                    <p><strong>Travellers:</strong> ${travellers}</p>
                    <p><strong>Total budget:</strong> ${money(budget)}</p>
                    <p><strong>Budget per person:</strong> ${money(totalPerPerson)}</p>
                    <p><strong>Interest:</strong> ${escapeHTML(interest)}</p>
                    <p><strong>Travel style:</strong> ${escapeHTML(style)}</p>
                    <p><strong>Preferred season:</strong> ${escapeHTML(season)}</p>

                    <a class="planner-link"
                       href="${escapeHTML(route)}"
                       target="_blank"
                       rel="noopener noreferrer">
                        Open Route in Google Maps ↗
                    </a>
                </div>

                <div class="planner-section">
                    <h3>💰 Suggested Budget Distribution</h3>
                    <p class="planner-note">
                        These are estimates, not live prices or bookings.
                    </p>
                    ${budgetHTML}
                </div>

                ${makeItinerary(days, interest, departure)}

                <div class="planner-section">
                    <h3>🌦️ Weather Information</h3>
                    <p>Check the latest forecast before travelling.</p>
                    <a class="planner-link"
                       href="${escapeHTML(searchLink(destination + " weather forecast"))}"
                       target="_blank"
                       rel="noopener noreferrer">
                        Check Weather ↗
                    </a>
                </div>

                <div class="planner-section">
                    <h3>🔎 Explore Travel Services</h3>
                    <div class="planner-services-grid">
                        ${serviceCard(
                            "🚆 Transport",
                            "Explore transport options and ticket information.",
                            transportLink,
                            "Explore Transport"
                        )}
                        ${serviceCard(
                            "🏨 Hotels",
                            "Compare accommodation and guest reviews.",
                            searchLink("hotels in " + destination),
                            "Find Hotels"
                        )}
                        ${serviceCard(
                            "🍽️ Restaurants",
                            "Discover restaurants and local food.",
                            searchLink("restaurants in " + destination),
                            "Find Restaurants"
                        )}
                        ${serviceCard(
                            "🏛️ Tourist Attractions",
                            "Explore popular attractions and historical places.",
                            searchLink("tourist attractions in " + destination),
                            "Explore Attractions"
                        )}
                        ${serviceCard(
                            "🎉 Events & Festivals",
                            "Discover events around your travel dates.",
                            searchLink("events and festivals in " + destination + " " + departure),
                            "Find Events"
                        )}
                    </div>
                </div>

                <div class="planner-section">
                    <h3>📍 Destination Details</h3>
                    <p>
                        ${destinationPlace
                            ? escapeHTML(destinationPlace.display_name)
                            : "Live location details are unavailable right now. You can still use the map and travel links above."}
                    </p>
                    <p class="planner-note">
                        Location information, when available, is provided by OpenStreetMap.
                        Prices and availability are not live bookings.
                    </p>
                </div>
            `;

            // Display the result on the page.
            resultBox.innerHTML = plannerHTML;
            resultBox.style.display = "block";

            resultBox.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        } catch (error) {
            console.error("Trip planner error:", error);
            showMessage(
                error.message ||
                "Unable to create your journey. Please try again."
            );
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = "Create My Personalised Journey ✦";
            }
        }
    });

    console.log("Trip planner loaded successfully!");
});