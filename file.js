document.getElementById('calculateBtn').addEventListener('click', function () {
    const energyUsage = parseFloat(document.getElementById('energyUsage').value);
    const dailySunlightHours = parseFloat(document.getElementById('sunlightHours').value);

    // Define the efficiency of a solar panel (e.g., 0.15 means 15% efficiency)
    const solarPanelEfficiency = 0.15;

    // Calculate the daily solar panel output (kWh) based on the efficiency and daily sunlight hours
    const dailySolarPanelOutput = dailySunlightHours * solarPanelEfficiency;

    // Calculate the annual solar panel output (kWh)
    const annualSolarPanelOutput = dailySolarPanelOutput * 365;

    // Calculate the number of solar panels needed
    const solarPanelsNeeded = energyUsage / annualSolarPanelOutput;

    // Calculate the cost savings
    const electricityCostPerKWh = 0.10; // Change this to the cost of electricity in your area
    const annualSavings = energyUsage * electricityCostPerKWh - (solarPanelsNeeded * 365 * dailySunlightHours * electricityCostPerKWh);

    // Display the results in the respective result areas in the calculator section
    const resultArea = document.getElementById('resultArea');
    resultArea.innerHTML = `You would need approximately ${Math.ceil(solarPanelsNeeded)} solar panels to meet your annual energy usage with ${dailySunlightHours} hours of sunlight per day. You could save approximately $${annualSavings.toFixed(2)} per year by using solar energy.`;

    // Clear the previous results from resultArea2
});

