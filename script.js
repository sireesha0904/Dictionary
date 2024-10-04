const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value.trim();
    if (inpWord) {
        fetch(`${url}${inpWord}`)
            .then((response) => response.json())
            .then((data) => {
                // Check if the response contains data
                if (data.length > 0) {
                    // Extract relevant information from the API response
                    const partOfSpeech = data[0].meanings[0].partOfSpeech || "N/A";
                    const phonetic = data[0].phonetic || "N/A";
                    const definition = data[0].meanings[0].definitions[0].definition || "No definition available.";
                    // Try to get the example from the response or use a default example
                    const example = data[0].meanings[0].definitions[0].example || "An apple a day keeps the doctor away.";
                    
                    // Display word and definition
                    result.innerHTML = `
                        <div class="word">
                            <h3>${inpWord}</h3>
                        </div>
                        <div class="details">
                            <p>${partOfSpeech}</p>
                            <p>/${phonetic}/</p>
                        </div>
                        <p class="word-meaning">
                            ${definition}
                        </p>
                        <p class="word-example">
                            " ${example} "
                        </p>`;
                } else {
                    result.innerHTML = `<h3 class="error">No definitions found for "${inpWord}".</h3>`;
                }
            })
            .catch(() => {
                result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
            });
    } else {
        result.innerHTML = `<h3 class="error">Please enter a word.</h3>`;
    }
});
