document.getElementById('icon-button').addEventListener('click', () => {
    document.getElementById('drawer').classList.toggle('open');
});

const queryObj = queryStringToJson(window.location.search);
const tvQuery = queryObj.query || '';
const searchInput = document.getElementById('search-text');
const searchBtn = document.getElementById('search-btn');
const tvContainer = document.getElementById('tv-container');
const pagination = document.getElementById('pagination');

searchInput.value = tvQuery;

let currentPage = 1;
let totalPages = 1;

async function loadTV(page) {
    currentPage = page || 1;
    let result;
    if (tvQuery) {
        result = await tvSearch(tvQuery, currentPage);
    } else {
        result = await tvPopular(currentPage);
    }

    totalPages = result.total_pages;
    displayTV(result.results);
    renderPagination();
}

function displayTV(shows) {
    tvContainer.innerHTML = '';
    shows.forEach(show => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.transition = 'transform 0.2s';

        card.addEventListener('mouseover', () => card.style.transform = 'scale(1.05)');
        card.addEventListener('mouseout', () => card.style.transform = 'scale(1)');

        card.addEventListener('click', () => {
            window.location.href = `serie.html?id=${show.id}`;
        });

        card.innerHTML = `
            <img src="${show.poster_path ? imgUrl+'w185'+show.poster_path : 'icons/no-image.png'}" alt="${show.name}">
            <h3>${show.name}</h3>
            <p>First Air: ${show.first_air_date ? show.first_air_date.split('-')[0] : 'N/A'}</p>
            <p>⭐ ${show.vote_average.toFixed(1)}</p>
        `;
        tvContainer.appendChild(card);
    });
}

function renderPagination() {
    pagination.innerHTML = '';
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.addEventListener('click', () => loadTV(currentPage - 1));
        pagination.appendChild(prevBtn);
    }

    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', () => loadTV(currentPage + 1));
        pagination.appendChild(nextBtn);
    }
}

searchBtn.addEventListener('click', () => {
    const q = encodeURIComponent(searchInput.value);
    window.location.href = `tvSeries.html?query=${q}`;
});

loadTV(currentPage);