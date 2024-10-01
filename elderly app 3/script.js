document.getElementById("searchButton").addEventListener("click", function() {
    const drugName = document.getElementById("drugName").value;

    if (drugName === "") {
        alert("Please enter a drug name.");
        return;
    }

    // Call the OpenFDA API with the drug name, setting limit to 5 results
    fetch(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:${drugName}&limit=5`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";  // Clear any previous results

            if (data.results && data.results.length > 0) {
                data.results.forEach(result => {
                    const drugDiv = document.createElement("div");
                    drugDiv.classList.add("drug-info");

                    drugDiv.innerHTML = `
                        <strong>Drug Name:</strong> ${result.openfda.brand_name ? result.openfda.brand_name[0] : "N/A"}<br>
                        <strong>Generic Name:</strong> ${result.openfda.generic_name ? result.openfda.generic_name[0] : "N/A"}<br>
                        <strong>Manufacturer:</strong> ${result.openfda.manufacturer_name ? result.openfda.manufacturer_name[0] : "N/A"}<br>
                        <button class="btn buy-now">Buy Now</button>
                        <button class="btn add-to-cart">Add to Cart</button>
                    `;

                    resultsDiv.appendChild(drugDiv);
                });
            } else {
                resultsDiv.innerHTML = `<p>No results found for "${drugName}".</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching drug data:", error);
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "<p>There was an error fetching the drug data. Please try again later.</p>";
        });
});
