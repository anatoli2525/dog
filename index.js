const BASE_URL = "https://dog.ceo/api/breeds";
const RANDOM_IMAGE_URL = `${BASE_URL}/image/random`;
const ALL_BREEDS_URL = `${BASE_URL}/list/all`;
const button = document.getElementById("button")
const showBridsButton = document.getElementById("showBrid")
const breedContainer = document.getElementById('breedContainer')
const image = document.getElementById("img")
const breedTypeImg = document.getElementById('breedTypeImage')

button.addEventListener("click", () => {
    const request = new XMLHttpRequest()
    request.open("GET", RANDOM_IMAGE_URL)
    request.send()
    request.addEventListener("load", () => {
        image.src = JSON.parse(request.response).message
        img.width = 400;
        img.height = 400;
    })
})

function onShowBridsButtonClick() {
    const requestBridsType = new XMLHttpRequest();
    requestBridsType.open("GET", ALL_BREEDS_URL);
    requestBridsType.send();
    requestBridsType.addEventListener('load', () => {
        const breedsObj = JSON.parse(requestBridsType.response).message;
        breedContainer.innerHTML = '';
        for (let breed in breedsObj) {
            const li = document.createElement('li');
            li.textContent = breed;
            li.addEventListener('click', () => {
                const breedType = new XMLHttpRequest();
                breedType.open("GET", `https://dog.ceo/api/breed/${breed}/images/random/10`);
                breedType.send();
                breedType.addEventListener("load", () => {
                    const images = JSON.parse(breedType.response).message;
                    breedContainer.innerHTML = '';
                    images.forEach(imageUrl => {
                        const img = document.createElement('img');
                        img.src = imageUrl;
                        img.width = 100;
                        img.height = 100;
                        breedContainer.append(img);
                    });
                });
            });
            breedContainer.append(li);
        }
    });
}
showBridsButton.addEventListener('click', onShowBridsButtonClick)