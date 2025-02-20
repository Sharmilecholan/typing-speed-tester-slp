const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed tests are fun and challenging.",
    "Improve your typing by practicing every day."
];

let startTime, endTime, selectedText;

function startTest() {
    selectedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    document.getElementById("textToType").innerText = selectedText;
    document.getElementById("typingArea").value = "";
    document.getElementById("typingArea").disabled = false;
    document.getElementById("typingArea").focus();
    startTime = performance.now();
}

function restartTest() {
    document.getElementById("typingArea").value = "";
    document.getElementById("textToType").innerText = "Click 'Start' to begin the test.";
    document.getElementById("result").innerText = "";
    document.getElementById("typingArea").disabled = true;
}

document.getElementById("typingArea").addEventListener("input", function () {
    let typedText = this.value;
    let targetText = selectedText;

    let feedbackText = "";
    
    for (let i = 0; i < targetText.length; i++) {
        if (i < typedText.length) {
            if (typedText[i] === targetText[i]) {
                feedbackText += `<span style="color: green">${targetText[i]}</span>`;
            } else {
                feedbackText += `<span style="color: red">${targetText[i]}</span>`;
            }
        } else {
            feedbackText += `<span style="color: grey">${targetText[i]}</span>`;
        }
    }

    // Update the display text with real-time feedback
    document.getElementById("textToType").innerHTML = feedbackText;

    // Check if user has completed typing correctly
    if (typedText === targetText) {
        endTime = performance.now();
        let timeTaken = (endTime - startTime) / 1000 / 60; // Convert ms to minutes

        let words = targetText.split(/\s+/).length;
        let wpm = Math.round(words / timeTaken);

        if (timeTaken < 0.1) {
            document.getElementById("result").innerText = `Too fast! Try again.`;
        } else {
            document.getElementById("result").innerText = `You typed at ${wpm} words per minute!`;
        }

        document.getElementById("typingArea").disabled = true;
    }
});
