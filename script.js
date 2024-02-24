const accessKey = `WGyL9itXzwVkYFvs6pRbNEQ-ZeilkEJtKRF1ImRl-I8`;
const inputText = document.querySelector(".input-text");
const pera = document.querySelector(".pera");
const searchform = document.querySelector("form");
const searchBtn = document.querySelector("i");
const imageConatiner = document.querySelector(".image-container");
const loadMoreBtn = document.querySelector(".loadMoreBtn");

let pageNo = 1;
// using fetch api for images
const getImages = async (query, pageNo) => {
    try {
        pera.innerText = "";
        const URL = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
        console.log("fetching data....");
        const response = await fetch(URL);
        const data = await response.json();

        if (data.results.length > 0) {

            // creating image by using unplash api
            data.results.forEach(photo => {
                const ImageElement = document.createElement("div");
                ImageElement.classList.add("imageDiv");
                ImageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
                imageConatiner.appendChild(ImageElement);

                // creating overlay effect
                const overlayEffect = document.createElement("div");
                overlayEffect.classList.add("overlay");
                ImageElement.appendChild(overlayEffect);

                // creating overlay effectText
                const overlayText = document.createElement("h3");
                overlayText.innerText = `${photo.alt_description}`;
                overlayEffect.appendChild(overlayText);

                // display none for loadMoreBtn (last page)
                if (data.total_pages === pageNo) {
                    loadMoreBtn.style.display = "none";
                }
                else {
                    loadMoreBtn.style.display = "block";
                }
            })
        }
        else {
            pera.innerText = "No image found!";
        }
    } catch (error) {
        pera.innerText = "Failed to fetch images. Please try again later.";
    }
}

// add event listener for search icon
searchBtn.addEventListener("click", () => {
    if (inputText.value !== "") {
        pageNo = 1;
        getImages(inputText.value.trim(), pageNo);
    } else {
        pera.innerText = "Please enter the search query!!!";
    }
});

// add event listener for more images
loadMoreBtn.addEventListener("click", () => {
    getImages(inputText.value.trim(), ++pageNo);
});

// add event listener for submit text
searchform.addEventListener(`submit`, (e) => {
    e.preventDefault();
    if (inputText.value !== "") {
        pageNo = 1;
        getImages(inputText.value.trim(), pageNo);
    } else {
        pera.innerText = "Please enter the search query!!!";
    }
});