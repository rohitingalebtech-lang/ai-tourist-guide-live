// Connect the map search to the trip planner
document.addEventListener("DOMContentLoaded", function () {
    const mapSearchButton = document.getElementById("mapSearchButton");
    const destinationInput = document.getElementById("destinationPoint");
    const plannerSection = document.getElementById("advancedPlannerForm");

    if (!mapSearchButton || !destinationInput || !plannerSection) {
        console.warn("Map-to-planner connection elements were not found.");
        return;
    }

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.textContent = "Use Map Search for My Journey";
    copyButton.className = "planner-link";
    copyButton.style.marginTop = "10px";

    mapSearchButton.insertAdjacentElement("afterend", copyButton);

    copyButton.addEventListener("click", function () {
        const mapInput = document.getElementById("mapLocation");

        if (!mapInput || !mapInput.value.trim()) {
            alert("Please search for a location on the map first.");
            return;
        }

        destinationInput.value = mapInput.value.trim();
        plannerSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});