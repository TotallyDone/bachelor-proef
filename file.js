// Load country data from output.csv
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

document.getElementById('calculateBtn').addEventListener('click', function () {
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
    resultArea.innerHTML = `You would need approximately ${solarPanelsNeeded} solar panels to meet your annual energy usage with ${dailySunlightHours} hours of sunlight per day. You could save approximately $${annualSavings.toFixed(2)} per year by using solar energy.`;
});
