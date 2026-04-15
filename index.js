// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
async function fetchWeatherAlerts(state) {
    const errorDiv = document.getElementById("error-message");
const button = document.getElementById("fetch-alerts");
    // Clear previous error messages
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

    const cleanState = state.trim().toUpperCase();
    // Validate the input
    if (!/^[A-Z]{2}$/.test(cleanState)) {
        showError("Please enter a valid 2-letter state code.");
        return;
    }
button.disabled = true; // Disable the button to prevent multiple clicks
    try {
        const response = await fetch(`${weatherApi}${cleanState}`);

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        
        displayAlerts(data);

        // Clear the input field after successful fetch
        document.getElementById("state-input").value = "";
    } catch (error) {
        
        showError(error.message);
    }finally {
        button.disabled = false; // Re-enable the button after the operation is complete
    
    }
}

    // displayAlert(data)
    function displayAlerts(data) {
        const container = document.getElementById("alerts-display");

        // clear old results
        container.innerHTML = "";

        const alerts = data.features;

        //handle no alerts case
        if (!alerts || alerts.length === 0) {
            container.textContent = "No active weather alerts for this state.";
            return;
        }
        // summart 
        const summary = document.createElement("h3");
        summary.textContent = `Weather Alerts: ${alerts.length}`;
        container.appendChild(summary);

        //List of alerts
        const list = document.createElement("ul");
        alerts.forEach(alert => {
            const li = document.createElement("li");
            li.textContent = alert.properties.headline;
            list.appendChild(li);
        });
        container.appendChild(list);

    }

    function showError(message) {
        const errorDiv = document.getElementById("error-message");
        errorDiv.textContent = message;
        errorDiv.classList.remove("hidden");
    }
document.addEventListener("DOMContentLoaded", () => {    
 const botton = document.getElementById("fetch-alerts");
      if (botton) {
        botton.addEventListener("click", () => {
            const stateInput = document.getElementById("state-input").value;
            fetchWeatherAlerts(stateInput);
        });
    } 
});
