document.getElementById('icon-button').addEventListener('click', () => {
    document.getElementById('drawer').classList.toggle('open');
});

const peopleQuery = queryStringToJson(window.location.search).query || '';
const searchInput = document.getElementById('search-text');
const searchBtn = document.getElementById('search-btn');
const peopleContainer = document.getElementById('people-container');
const pagination = document.getElementById('pagination');

searchInput.value = peopleQuery;

let currentPage = 1;
let totalPages = 1;

async function loadPeople(page) {
    currentPage = page || 1;
    let result;
    if (peopleQuery) {
        result = await peopleSearch(peopleQuery, currentPage);
    } else {
        result = await peoplePopular(currentPage);
    }

    totalPages = result.total_pages;
    displayPeople(result.results);
    renderPagination();
}

function displayPeople(people) {
    peopleContainer.innerHTML = '';
    people.forEach(person => {
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
            window.location.href = `person.html?id=${person.id}`;
        });

        card.innerHTML = `
            <img src="${person.profile_path ? imgUrl+'w185'+person.profile_path : 'icons/no-image.png'}" alt="${person.name}">
            <h3>${person.name}</h3>
        `;
        peopleContainer.appendChild(card);
    });
}

function renderPagination() {
    pagination.innerHTML = '';
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.addEventListener('click', () => loadPeople(currentPage - 1));
        pagination.appendChild(prevBtn);
    }

    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', () => loadPeople(currentPage + 1));
        pagination.appendChild(nextBtn);
    }
}

searchBtn.addEventListener('click', () => {
    const q = encodeURIComponent(searchInput.value);
    window.location.href = `people.html?query=${q}`;
});

loadPeople(currentPage);