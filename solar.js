let map;
let selectedMarker = null;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 50.8503, lng: 4.3517 },
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.HYBRID  // Set map type to HYBRID
    });

    map.addListener("click", (mapsMouseEvent) => {
        // If there is already a marker, remove it
        if (selectedMarker) {
            selectedMarker.setMap(null);
        }

        // Create a new marker where the map is clicked
        selectedMarker = new google.maps.Marker({
            position: mapsMouseEvent.latLng,
            map: map
        });

        // Store the clicked location
        selectedLocation = mapsMouseEvent.latLng.toJSON();
    });

    // Add event listener to the button
    document.getElementById("calculateButton").addEventListener("click", function() {
        if (selectedLocation) {
            getSolarData(selectedLocation.lat, selectedLocation.lng);
        } else {
            alert("Please select a location on the map first.");
        }
    });
}


function getSolarData(latitude, longitude) {
    const url = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=AIzaSyC8NiIAZ4-FtKNQRRY2lDPtIFfJ4DjnUns`;
    console.log(`Requesting data for lat: ${latitude}, lng: ${longitude}`);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); // Print the entire response to the console
            processSolarData(data); // Process and display the solar data in HTML
        })
        .catch(error => console.error('Error:', error));
}


// Define the processSolarData function
function processSolarData(response) {
    if (!response || !response.solarPotential) {
        console.error('Invalid response data');
        return;
    }

    const maxPanels = response.solarPotential.maxArrayPanelsCount;
    let totalYearlyEnergyKwh = 0;

    if (response.solarPotential.solarPanelConfigs) {
        response.solarPotential.solarPanelConfigs.forEach(config => {
            totalYearlyEnergyKwh += config.yearlyEnergyDcKwh;
        });
    }

    // Constructing the result text
    const resultText = `Maximum number of solar panels possible: ${maxPanels}\nTotal yearly energy production: ${totalYearlyEnergyKwh.toFixed(2)} kWh`;
    document.getElementById('result').innerText = resultText; // Display the results in HTML
}



