async function predictRisk() {
    // 1. Get values
    const age = parseInt(document.getElementById("age").value);
    const smoking = parseInt(document.getElementById("smoking").value);
    const pollution = parseFloat(document.getElementById("pollution").value);
    const pollen = parseFloat(document.getElementById("pollen").value);
    const pm25 = parseFloat(document.getElementById("pm25").value);
    const temp = parseFloat(document.getElementById("temp").value);

    // 2. Validation
    if (isNaN(age) || isNaN(smoking) || isNaN(pollution) || 
        isNaN(pollen) || isNaN(pm25) || isNaN(temp)) {
        alert("Please fill in all fields!");
        return;
    }

    // 3. Loading
    const btn = document.querySelector(".btn-primary");
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    btn.disabled = true;

    const data = {
        "Age": age,
        "Smoking": smoking,
        "PollutionExposure": pollution,
        "PollenExposure": pollen,
        "PM2.5": pm25,
        "Temp_C": temp
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        const resultDiv = document.getElementById("result");
        resultDiv.style.display = "block";
        resultDiv.className = "";

        if (result.prediction === 1) {
            resultDiv.classList.add("risk-high");
            resultDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i><br>
                <span class="risk-label">High Asthma Risk</span>
                <span class="risk-sub">Redirecting to recommendations...</span>
            `;
            
            // Save result for analytics page
            localStorage.setItem("asthmaRisk", "high");
            
            // Redirect after 10 seconds
            setTimeout(() => {
                window.location.href = "analytics.html";
            }, 10000);

        } else {
            resultDiv.classList.add("risk-low");
            resultDiv.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px;"></i><br>
                <span class="risk-label">Low Asthma Risk</span>
                <span class="risk-sub">Redirecting to recommendations...</span>
            `;
            
            // Save result for analytics page
            localStorage.setItem("asthmaRisk", "low");
            
            // Redirect after 10 seconds
            setTimeout(() => {
                window.location.href = "analytics.html";
            }, 10000);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to server!");
        btn.innerHTML = 'Analyze Risk';
        btn.disabled = false;
    }
}