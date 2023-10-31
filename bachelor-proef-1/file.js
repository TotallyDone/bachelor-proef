

// Load country data from output.csv
document.getElementById('searchBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value;
    const country = document.getElementById('countryInput').value;
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const sunrise = new Date(data.sys.sunrise * 1000); // Convert UNIX timestamp to local time
            const sunset = new Date(data.sys.sunset * 1000); // Convert UNIX timestamp to local time

            const resultArea = document.getElementById('resultArea1');
            resultArea.innerHTML = `Average sunrise time: ${sunrise.toLocaleTimeString()}<br>
                                    Average sunset time: ${sunset.toLocaleTimeString()}`;
        })
        .catch(error => {
            console.log('Error fetching sunlight information: ', error);
            const resultArea = document.getElementById('resultArea1');
            resultArea.innerHTML = 'Failed to fetch sunlight information. Please check the city and country.';
        });
});


fetch('output.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1); // Remove the header
        const countrySelect = document.getElementById('countrySelect');
        
        rows.forEach(row => {
            const [country, price] = row.split(',');
            const option = document.createElement('option');
            option.value = price;
            option.text = country;
            countrySelect.appendChild(option);
        });
        
    });
  
    
    document.getElementById('calculateBtn').addEventListener('click', function() {
        const energyUsage = parseFloat(document.getElementById('energyUsage').value);
        const dailySunlightHours = parseFloat(document.getElementById('sunlightHours').value);
        const electricityCostPerKWh = parseFloat(document.getElementById('countrySelect').value); // Get the electricity cost for the selected country
    
        // Constants
        const solarPanelWattage = 300;  // 300W panel
        const solarPanelEfficiency = 0.2;  // 20% efficiency
        const dailySolarPanelOutput = dailySunlightHours * solarPanelEfficiency * solarPanelWattage / 1000;  // kWh per day per panel
        const annualSolarPanelOutput = dailySolarPanelOutput * 365;  // kWh per year per panel
    
        // Calculate the number of solar panels needed
        const solarPanelsNeeded = Math.ceil(energyUsage / annualSolarPanelOutput);
    
        // Calculate the cost savings
        const annualElectricityCostWithoutSolar = energyUsage * electricityCostPerKWh;
        const annualElectricityCostWithSolar = (energyUsage - annualSolarPanelOutput * solarPanelsNeeded) * electricityCostPerKWh;
        const annualSavings = annualElectricityCostWithoutSolar - annualElectricityCostWithSolar;
    
        // Display the results
        const resultArea = document.getElementById('resultArea');
        resultArea.innerHTML = ` Based on GL energy calculator a number of ${solarPanelsNeeded} solar panels meets your annual energy usage with ${dailySunlightHours} hours of sunlight per day. You save approximately $${annualSavings.toFixed(2)} per year by using solar energy.`;
        
    });
      


