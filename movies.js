document.getElementById('icon-button').addEventListener('click', () => {
document.getElementById('drawer').classList.toggle('open');
});

const queryObj = queryStringToJson(window.location.search);
const searchTerm = queryObj.query || '';
const searchInput = document.getElementById('search-text');
const searchBtn = document.getElementById('search-btn');
const moviesContainer = document.getElementById('movies-container');
const pagination = document.getElementById('pagination');

searchInput.value = searchTerm;

let currentPage = 1;
let totalPages = 1;

async function loadMovies(page) {
    currentPage = page || 1;
    if (searchTerm) {
        const result = await movieSearch(searchTerm, currentPage);
        totalPages = result.total_pages;
        displayMovies(result.results);
    } else {
        const result = await moviePopular(currentPage);
        totalPages = result.total_pages;
        displayMovies(result.results);
    }
    renderPagination();
}

function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.transition = 'transform 0.2s';
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
        });
        card.addEventListener('click', () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        card.innerHTML = `
            <img src="${movie.poster_path ? imgUrl+'w185'+movie.poster_path : 'icons/no-image.png'}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Year: ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
            <p>⭐ ${movie.vote_average.toFixed(1)}</p>
        `;
        moviesContainer.appendChild(card);
    });
}

function renderPagination() {
    pagination.innerHTML = '';
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.addEventListener('click', () => loadMovies(currentPage - 1));
        pagination.appendChild(prevBtn);
    }

    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', () => loadMovies(currentPage + 1));
        pagination.appendChild(nextBtn);
    }
}

searchBtn.addEventListener('click', () => {
    const q = encodeURIComponent(searchInput.value);
    window.location.href = `movies.html?query=${q}`;
});

loadMovies(currentPage);