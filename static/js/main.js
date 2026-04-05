
async function analyzeReview() {

    let text = document.getElementById("review_text").value;
    let model = document.getElementById("model").value;

    try {
        let res = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                review_text: text,
                model: model
            })
        });

        let data = await res.json();
        console.log(data);

        // ================= RESULT =================
        document.getElementById("resultBox").style.display = "block";

        const predictionText = document.getElementById("predictionText");
        const confidenceText = document.getElementById("confidenceText");
        const confidenceBar = document.getElementById("confidenceBar");

        predictionText.innerText = data.prediction;
        confidenceText.innerText = data.confidence;

        // ✅ CONFIDENCE BAR (same as old + animation)
        let confidence = parseFloat(data.confidence);

        confidenceBar.style.width = "0%";

        setTimeout(() => {
            confidenceBar.style.width = confidence + "%";
        }, 100);

        confidenceBar.style.backgroundColor =
            data.prediction.includes("Fake") ? "#dc3545" : "#28a745";

        // SAME result box styling as old
        document.getElementById("resultBox").className =
            "result-box " + (data.prediction.includes("Fake") ? "fake" : "genuine");

        // ================= EXPLANATION =================
        let explanationDiv = document.getElementById("wordImportance");

        explanationDiv.innerHTML = "";

        if (data.explanation && data.explanation.important_words) {

            let wordsHTML = "<h3>🔍 Important Words</h3><ul>";

            data.explanation.important_words.forEach(w => {
                let word = w[0];
                let score = w[1].toFixed(2);

                wordsHTML += `<li>${word} (${score})</li>`;
            });

            wordsHTML += "</ul>";

            explanationDiv.innerHTML = wordsHTML;

        } else {
            explanationDiv.innerHTML = "<p>No explanation available</p>";
        }

    } catch (error) {
        console.error(error);
        alert("Backend connection error");
    }
}


function uploadCSV() {

    const fileInput = document.getElementById("csvFile");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    fetch("/batch_predict", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        const tableBody = document.querySelector("#batchTable tbody");
        tableBody.innerHTML = "";

        data.results.forEach(item => {

            const row = `
                <tr>
                    <td>${item.review}</td>
                    <td>${item.prediction}</td>
                    <td>${item.confidence}%</td>
                </tr>
            `;

            tableBody.innerHTML += row;
        });
    });
}
