// ==========================================
// PERSONALised TOURIST GUIDE CHATBOT
// English, Hindi and Marathi
// Free rule-based chatbot
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");

    // Create missing language selector automatically.
    let languageSelect = document.getElementById("chatLanguage");

    if (!languageSelect && form) {
        languageSelect = document.createElement("select");
        languageSelect.id = "chatLanguage";
        languageSelect.setAttribute("aria-label", "Chat language");

        languageSelect.innerHTML = `
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
        `;

        form.insertBefore(languageSelect, input);
    }

    // Create or find the send button.
    let sendButton = document.getElementById("chatSendButton");

    if (!sendButton && form) {
        sendButton = form.querySelector('button[type="submit"]');

        if (sendButton) {
            sendButton.id = "chatSendButton";
        }
    }

    if (!form || !input || !messages || !languageSelect || !sendButton) {
        console.error("Chatbot HTML elements are missing.");
        return;
    }

    const replies = {
        en: {
            name: "Travel Assistant",
            greeting: "Hello! 👋 I can help you explore tourist places, budgets, hotels, transport, food and travel plans. Where would you like to go?",
            attractions: "Tell me your destination. You can explore famous attractions, historical places, nature spots and cultural experiences.",
            budget: "Your travel budget should include transport, accommodation, food, sightseeing and emergency expenses. Open the Budget Planner to estimate your expenses.",
            hotels: "Choose your destination and compare hotel prices, locations and recent reviews before booking.",
            transport: "You can travel by bus, train, flight or private vehicle. Enter your starting point and destination in the Trip Planner to explore suitable options.",
            weather: "Weather depends on your destination and travel dates. Check a reliable weather forecast close to your departure date.",
            food: "Explore local food, traditional dishes and restaurants at your destination. Check current opening hours and reviews before visiting.",
            history: "You can explore historical places such as the Taj Mahal, Ajanta Caves and the Red Fort. Tell me which place interests you.",
            festivals: "Festival dates may change each year. Check the official tourism website or event organiser for confirmed dates.",
            itinerary: "Use the Trip Planner to enter your starting point, destination, dates, budget and interests to generate a suggested itinerary.",
            safety: "Keep emergency contacts handy, follow local rules, check weather alerts and use trusted transport and accommodation.",
            map: "Open the World Map section to search for a city or landmark and explore locations.",
            greeting2: "Hello! Namaste! Namaskar! 😊 Where are you planning to travel?",
            fallback: "I can help with destinations, budgets, hotels, transport, food, weather, history and itineraries. Try asking a specific travel question."
        },

        hi: {
            name: "यात्रा सहायक",
            greeting: "नमस्ते! 👋 मैं पर्यटन स्थलों, बजट, होटल, परिवहन और यात्रा योजना में मदद कर सकता हूँ। आप कहाँ घूमना चाहते हैं?",
            attractions: "अपना गंतव्य बताइए। मैं प्रसिद्ध पर्यटन स्थलों, ऐतिहासिक जगहों और प्राकृतिक स्थानों के बारे में मदद कर सकता हूँ।",
            budget: "बजट में परिवहन, होटल, भोजन, घूमने और आपातकालीन खर्च शामिल करें। खर्च का अनुमान लगाने के लिए बजट प्लानर खोलें।",
            hotels: "बुकिंग से पहले होटल की कीमत, स्थान, सुविधाएँ और हाल की समीक्षाएँ जाँचें।",
            transport: "आप बस, ट्रेन, फ्लाइट या निजी वाहन से यात्रा कर सकते हैं। विकल्प देखने के लिए ट्रिप प्लानर में शुरुआती स्थान और गंतव्य भरें।",
            weather: "मौसम आपके गंतव्य और यात्रा की तारीख पर निर्भर करता है। यात्रा से पहले मौसम का पूर्वानुमान जाँचें।",
            food: "अपने गंतव्य के स्थानीय व्यंजन और रेस्टोरेंट खोजें। जाने से पहले समय और समीक्षाएँ जाँचें।",
            history: "आप ताजमहल, अजंता की गुफाओं और लाल किले जैसे ऐतिहासिक स्थानों के बारे में जान सकते हैं।",
            festivals: "त्योहारों की तारीखें हर साल बदल सकती हैं। आधिकारिक वेबसाइट से तारीखों की पुष्टि करें।",
            itinerary: "ट्रिप प्लानर में शुरुआती स्थान, गंतव्य, तारीखें, बजट और पसंद भरें। इससे यात्रा की सुझाई गई योजना मिलेगी।",
            safety: "आपातकालीन संपर्क रखें, स्थानीय नियमों का पालन करें और भरोसेमंद परिवहन व होटल चुनें।",
            map: "शहर या प्रसिद्ध जगह खोजने और स्थान देखने के लिए वर्ल्ड मैप खोलें।",
            greeting2: "नमस्ते! 😊 आप कहाँ घूमने की योजना बना रहे हैं?",
            fallback: "मैं पर्यटन स्थलों, बजट, होटल, परिवहन, भोजन और यात्रा योजना में मदद कर सकता हूँ। कृपया स्पष्ट सवाल पूछें।"
        },

        mr: {
            name: "प्रवास सहाय्यक",
            greeting: "नमस्कार! 👋 मी पर्यटनस्थळे, बजेट, हॉटेल, वाहतूक आणि प्रवासाचे नियोजन याबाबत मदत करू शकतो. तुम्हाला कुठे फिरायला जायचे आहे?",
            attractions: "तुमचे गंतव्य सांगा. मी प्रसिद्ध पर्यटनस्थळे, ऐतिहासिक ठिकाणे आणि निसर्गरम्य जागा शोधण्यात मदत करू शकतो.",
            budget: "प्रवासाच्या बजेटमध्ये वाहतूक, हॉटेल, जेवण, पर्यटन आणि आपत्कालीन खर्च समाविष्ट करा. अंदाजासाठी बजेट प्लॅनर उघडा.",
            hotels: "हॉटेल बुक करण्यापूर्वी किंमत, ठिकाण, सुविधा आणि अलीकडील अभिप्राय तपासा.",
            transport: "तुम्ही बस, रेल्वे, विमान किंवा खासगी वाहनाने प्रवास करू शकता. पर्याय पाहण्यासाठी ट्रिप प्लॅनरमध्ये सुरुवातीचे ठिकाण आणि गंतव्य भरा.",
            weather: "हवामान तुमचे गंतव्य आणि प्रवासाच्या तारखांवर अवलंबून असते. प्रवासापूर्वी हवामानाचा अंदाज तपासा.",
            food: "तुमच्या गंतव्यावरील स्थानिक पदार्थ आणि रेस्टॉरंट शोधा. जाण्यापूर्वी वेळ आणि अभिप्राय तपासा.",
            history: "तुम्ही ताजमहाल, अजिंठा लेणी आणि लाल किल्ला यांसारख्या ऐतिहासिक ठिकाणांबद्दल जाणून घेऊ शकता.",
            festivals: "सणांच्या तारखा दरवर्षी बदलू शकतात. अधिकृत वेबसाइटवरून खात्री करा.",
            itinerary: "ट्रिप प्लॅनरमध्ये सुरुवातीचे ठिकाण, गंतव्य, तारखा, बजेट आणि आवडी भरा. त्यातून प्रवासाचा सुचवलेला आराखडा मिळेल.",
            safety: "आपत्कालीन संपर्क जवळ ठेवा, स्थानिक नियम पाळा आणि विश्वासार्ह वाहतूक व हॉटेल निवडा.",
            map: "शहर किंवा प्रसिद्ध ठिकाण शोधण्यासाठी वर्ल्ड मॅप उघडा.",
            greeting2: "नमस्कार! 😊 तुम्ही कुठे फिरायला जाण्याचा विचार करत आहात?",
            fallback: "मी पर्यटनस्थळे, बजेट, हॉटेल, वाहतूक, जेवण आणि प्रवासाच्या नियोजनात मदत करू शकतो. कृपया स्पष्ट प्रश्न विचारा."
        }
    };
    // ===== DESTINATION-SPECIFIC TRAVEL SUGGESTIONS =====

const destinationSuggestions = {
    pune: "🏛️ Famous places in Pune:\n1. Shaniwar Wada\n2. Aga Khan Palace\n3. Sinhagad Fort\n4. Dagdusheth Ganpati Temple\n5. Pataleshwar Cave Temple\n\nBest for: History, culture and food.",

    mumbai: "🌆 Famous places in Mumbai:\n1. Gateway of India\n2. Marine Drive\n3. Elephanta Caves\n4. Siddhivinayak Temple\n5. Juhu Beach\n\nBest for: City life, shopping and coastal views.",

    goa: "🏖️ Famous places in Goa:\n1. Baga Beach\n2. Fort Aguada\n3. Basilica of Bom Jesus\n4. Dudhsagar Falls\n5. Anjuna Beach\n\nBest for: Beaches, nature and Portuguese heritage.",

    delhi: "🏰 Famous places in Delhi:\n1. India Gate\n2. Red Fort\n3. Qutub Minar\n4. Humayun's Tomb\n5. Lotus Temple\n\nBest for: History, architecture and culture.",

    jaipur: "🕌 Famous places in Jaipur:\n1. Hawa Mahal\n2. Amber Fort\n3. City Palace\n4. Jantar Mantar\n5. Nahargarh Fort\n\nBest for: Heritage, architecture and shopping.",

    nashik: "🛕 Famous places in Nashik:\n1. Trimbakeshwar Temple\n2. Panchavati\n3. Sula Vineyards\n4. Pandav Leni Caves\n5. Ramkund\n\nBest for: Spiritual tourism, history and nature.",

    mahableshwar: "🌄 Famous places in Mahabaleshwar:\n1. Arthur's Seat\n2. Venna Lake\n3. Elephant's Head Point\n4. Mapro Garden\n5. Pratapgad Fort\n\nBest for: Hills, viewpoints and nature.",

    hyderabad: "🏛️ Famous places in Hyderabad:\n1. Charminar\n2. Golconda Fort\n3. Hussain Sagar Lake\n4. Chowmahalla Palace\n5. Salar Jung Museum\n\nBest for: History, architecture and local food.",

    bengaluru: "🌳 Famous places in Bengaluru:\n1. Lalbagh Botanical Garden\n2. Cubbon Park\n3. Bangalore Palace\n4. ISKCON Temple\n5. Vidhana Soudha\n\nBest for: Gardens, culture and city experiences.",

    kolkata: "🎭 Famous places in Kolkata:\n1. Victoria Memorial\n2. Howrah Bridge\n3. Dakshineswar Kali Temple\n4. Indian Museum\n5. Prinsep Ghat\n\nBest for: Culture, history and food."
};
// ===== LIVE WEATHER FEATURE =====

async function getLiveWeather(city) {
    try {
        const geoUrl =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            return "Sorry, I couldn't find that city. Please try another city name.";
        }

        const place = geoData.results[0];

        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (!weatherData.current) {
            return "Sorry, weather information is currently unavailable.";
        }

        const current = weatherData.current;

        const descriptions = {
            0: "Clear sky ☀️",
            1: "Mainly clear 🌤️",
            2: "Partly cloudy ⛅",
            3: "Overcast ☁️",
            45: "Foggy 🌫️",
            48: "Foggy 🌫️",
            51: "Light drizzle 🌦️",
            53: "Drizzle 🌦️",
            55: "Heavy drizzle 🌧️",
            61: "Light rain 🌧️",
            63: "Moderate rain 🌧️",
            65: "Heavy rain 🌧️",
            71: "Light snow ❄️",
            80: "Rain showers 🌦️",
            81: "Rain showers 🌧️",
            82: "Heavy rain showers ⛈️",
            95: "Thunderstorm ⛈️"
        };

        const condition =
            descriptions[current.weather_code] || "Weather conditions available";

        return `🌦️ Current Weather: ${place.name}, ${place.country}

${condition}

🌡️ Temperature: ${current.temperature_2m}°C
🤔 Feels like: ${current.apparent_temperature}°C
💧 Humidity: ${current.relative_humidity_2m}%
💨 Wind speed: ${current.wind_speed_10m} km/h

Weather data by Open-Meteo.com`;

    } catch (error) {
        console.error("Weather error:", error);
        return "Unable to fetch live weather. Please check your internet connection and try again.";
    }
}
async function sendMessage(question) {
    const cleanQuestion = question.trim();

    if (!cleanQuestion) return;

    addMessage(cleanQuestion, "user");

    const language = replies[languageSelect.value]
        ? languageSelect.value
        : "en";

    const asksWeather =
        /\b(weather|temperature|rain|raining|forecast|humidity|wind)\b/i.test(cleanQuestion) ||
        /हवामान|पाऊस|तापमान|मौसम|बारिश/.test(cleanQuestion);

    if (asksWeather) {
        const cityMatch = cleanQuestion.match(
            /(?:weather|temperature|rain|raining|forecast|humidity|wind)\s+(?:in|at|for)\s+([a-zA-Z\s]+)/i
        );

        const marathiMatch = cleanQuestion.match(
            /(?:हवामान|पाऊस|तापमान)\s+([a-zA-Z\s]+?)(?:\s+मध्ये|\s+कसे|\s+कसा|\s+आहे)?$/i
        );

        const city = cityMatch
            ? cityMatch[1].trim()
            : marathiMatch
                ? marathiMatch[1].trim()
                : null;

        if (!city) {
            addMessage(
                "Please include a city name. Example: Weather in Pune",
                "bot"
            );
            return;
        }

        addMessage("Checking current weather... 🌍", "bot");

        const result = await getLiveWeather(city);
        addMessage(result, "bot");
        return;
    }

    const cityReply = getDestinationReply(cleanQuestion);
    const topic = detectTopic(cleanQuestion);
    const answer = cityReply || replies[language][topic] || replies[language].fallback;

    setTimeout(function () {
        addMessage(answer, "bot");
    }, 300);
}

    function detectTopic(question) {
        const q = question.toLowerCase();

        if (/hello|hi\b|hey|नमस्ते|नमस्कार|नमस्कार/.test(q)) {
            return "greeting2";
        }

        if (/budget|cost|price|money|खर्च|बजेट|पैसे/.test(q)) {
            return "budget";
        }

        if (/hotel|stay|resort|हॉटेल|होटल/.test(q)) {
            return "hotels";
        }

        if (/bus|train|flight|transport|रेल्वे|बस|विमान|वाहतूक/.test(q)) {
            return "transport";
        }

        if (/weather|rain|temperature|हवामान|पाऊस|मौसम/.test(q)) {
            return "weather";
        }

        if (/food|restaurant|eat|जेवण|खाणे|खाना/.test(q)) {
            return "food";
        }

        if (/history|historical|monument|इतिहास|ऐतिहासिक/.test(q)) {
            return "history";
        }

        if (/festival|event|सण|उत्सव|त्योहार/.test(q)) {
            return "festivals";
        }

        if (/itinerary|plan|trip|योजना|आराखडा|प्रवास योजना/.test(q)) {
            return "itinerary";
        }

        if (/safe|safety|emergency|सुरक्षा|सुरक्षित/.test(q)) {
            return "safety";
        }

        if (/map|direction|route|नकाशा|नक्शा|मार्ग|रस्ता/.test(q)) {
            return "map";
        }

        if (/attraction|tourist|places|visit|पर्यटन|ठिकाण|जागा|घूमने/.test(q)) {
            return "attractions";
        }

        return "fallback";
    }

    function addMessage(message, sender) {
        const bubble = document.createElement("div");
        bubble.className = "chat-message " +
            (sender === "user" ? "user-message" : "bot-message");

        const title = document.createElement("strong");
        title.textContent = sender === "user"
            ? "You"
            : replies[languageSelect.value].name;

        const paragraph = document.createElement("p");
        paragraph.textContent = message;

        bubble.appendChild(title);
        bubble.appendChild(paragraph);
        messages.appendChild(bubble);

        messages.scrollTop = messages.scrollHeight;
    }

    function sendMessage(question) {
        const cleanQuestion = question.trim();

        if (!cleanQuestion) return;

        addMessage(cleanQuestion, "user");

        const language = replies[languageSelect.value]
            ? languageSelect.value
            : "en";

        const topic = detectTopic(cleanQuestion);
       const cityReply = getDestinationReply(cleanQuestion);
const answer = cityReply || replies[language][topic] || replies[language].fallback;

        window.setTimeout(function () {
            addMessage(answer, "bot");
        }, 200);
    }

    form.addEventListener("submit", function (event) {
    event.preventDefault();

    const question = input.value.trim();

    if (!question) {
        return;
    }

    addMessage(question, "user");

    const language = replies[languageSelect.value]
        ? languageSelect.value
        : "en";

    const topic = detectTopic(question);
    const answer = replies[language][topic] || replies[language].fallback;

    input.value = "";

    setTimeout(function () {
        addMessage(answer, "bot");
    }, 300);

    input.focus();
});

    languageSelect.addEventListener("change", function () {
        const language = languageSelect.value;

        input.placeholder = {
            en: "Ask me about your next trip...",
            hi: "अपनी यात्रा के बारे में पूछें...",
            mr: "तुमच्या प्रवासाबद्दल विचारा..."
        }[language] || "Ask me about your next trip...";

        sendButton.textContent = {
            en: "Send ➤",
            hi: "भेजें ➤",
            mr: "पाठवा ➤"
        }[language] || "Send ➤";

        addMessage(replies[language].greeting, "bot");
    });

    input.placeholder = "Ask me about your next trip...";
    sendButton.textContent = "Send ➤";

    addMessage(replies.en.greeting, "bot");

    console.log("Travel chatbot is ready.");
});