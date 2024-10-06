const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");
const inpWord = document.getElementById("inp-word");

const fetchWordDefinition = () => {
    let word = inpWord.value.trim();
    if (word) {
        fetch(`${url}${word}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    const definition = data[0].meanings[0].definitions[0].definition || "No definition available.";
                    const phonetic = data[0].phonetic ? `/${data[0].phonetic}/` : "Pronunciation not available.";
                    
                    // Display the definition and pronunciation
                    result.innerHTML = `
                        <div class="word">
                            <h3>${word}</h3>
                        </div>
                        <p class="pronunciation">${phonetic}</p>
                        <p class="word-meaning">
                            ${definition}
                        </p>`;
                } else {
                    result.innerHTML = `<h3 class="error">No definitions found for "${word}".</h3>`;
                }
            })
            .catch(() => {
                result.innerHTML = `<h3 class="error">Couldn't find the word.</h3>`;
            });
    } else {
        result.innerHTML = `<h3 class="error">Please enter a word.</h3>`;
    }
};

// Event listeners for button click and Enter key press
btn.addEventListener("click", fetchWordDefinition);

inpWord.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        fetchWordDefinition();
    }
});
