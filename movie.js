const queryObj = queryStringToJson(window.location.search);
const movieId = queryObj.id;

const movieDetailsDiv = document.getElementById('movie-details');
const movieImagesDiv = document.getElementById('movie-images');
const movieCreditsDiv = document.getElementById('movie-credits');
const prevImgBtn = document.getElementById('prev-img');
const nextImgBtn = document.getElementById('next-img');

let currentImageIndex = 0;
let imagesArray = [];

document.getElementById('menu-icon').addEventListener('click', () => {
    document.getElementById('side-drawer').classList.toggle('open');
});

async function loadMovie() {
    const details = await movieDetails(movieId);
    // Details: title, release_date, overview, runtime, vote_average
    movieDetailsDiv.innerHTML = `
        <h2>${details.title}</h2>
        <img src="${details.poster_path ? imgUrl+'w300'+details.poster_path : 'icons/no-image.png'}" alt="${details.title}" style="float:left; margin:10px;">
        <p><strong>Release Date:</strong> ${details.release_date}</p>
        <p><strong>Runtime:</strong> ${details.runtime} min</p>
        <p><strong>Vote Average:</strong> ${details.vote_average}</p>
        <p><strong>Overview:</strong> ${details.overview}</p>
        <div style="clear:both;"></div>
    `;
}

async function loadMovieImages() {
    const images = await movieImages(movieId);
    imagesArray = images.posters || [];
    showImage(0);
}

function showImage(index) {
    if (imagesArray.length === 0) {
        movieImagesDiv.innerHTML = "<p>No images available.</p>";
        prevImgBtn.disabled = true;
        nextImgBtn.disabled = true;
        return;
    }
    currentImageIndex = index;
    prevImgBtn.disabled = index === 0;
    nextImgBtn.disabled = index === imagesArray.length - 1;
    movieImagesDiv.innerHTML = `
        <img src="${imgUrl+'w300'+imagesArray[index].file_path}" alt="Movie Image" style="max-width:300px;">
    `;
}

prevImgBtn.addEventListener('click', () => {
    showImage(currentImageIndex - 1);
});

nextImgBtn.addEventListener('click', () => {
    showImage(currentImageIndex + 1);
});

async function loadCredits() {
    // Credits for movie: /movie/{movie_id}/credits
    const creditsRes = await makeAPICall(`movie/${movieId}/credits`, "language=en-US");
    // cast array
    movieCreditsDiv.innerHTML = '';
    creditsRes.cast.forEach(person => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <img src="${person.profile_path ? imgUrl+'w185'+person.profile_path : 'icons/no-image.png'}" alt="${person.name}">
            <p><strong>${person.name}</strong></p>
            <p>Character: ${person.character}</p>
        `;
        card.addEventListener('click', () => {
            window.location.href = `person.html?id=${person.id}`;
        });
        movieCreditsDiv.appendChild(card);
    });
}

loadMovie();
loadMovieImages();
loadCredits();