
let isNavOpen = false;

const drawer = document.getElementById("drawer");
const mask = document.getElementById("mask");

const sidebarLinks = document.querySelectorAll('.sidebar li');

const contentSections = document.querySelectorAll('.content .section');

const searchInput = document.getElementById("search-text");
const allButton = document.getElementById("all-button");
const movieButton = document.getElementById("movie-button");
const tvButton = document.getElementById("tv-button");
const personButton = document.getElementById("person-button");


function searchEventListeners(element) {
    element.addEventListener("click", e => {
        e.preventDefault();
        const query = encodeURIComponent(searchInput.value);
        window.location.href = `${element.href}?query=${query}`;
    })
}

searchEventListeners(allButton);
searchEventListeners(movieButton);
searchEventListeners(tvButton);
searchEventListeners(personButton);

// Load popular Movies, TV, People
moviePopular().then(result => {
    const container = document.getElementById('popular-movies');
    displayCards(result.results.slice(0,8), container, 'movie');
}).catch(console.error);

tvPopular().then(result => {
    const container = document.getElementById('popular-tv');
    displayCards(result.results.slice(0,8), container, 'tv');
}).catch(console.error);

peoplePopular().then(result => {
    const container = document.getElementById('popular-people');
    displayCards(result.results.slice(0,8), container, 'person');
}).catch(console.error);

function displayCards(items, container, type) {
    container.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => cardClick(item, type));
        card.style.transition = 'transform 0.2s';

        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
        });

        let title = '';
        let imgPath = '';
        let subInfo = '';
        let voteAvg = '';

        if (type === 'movie') {
            title = item.title;
            imgPath = item.poster_path;
            subInfo = `Year: ${item.release_date ? item.release_date.split('-')[0] : 'N/A'}`;
            voteAvg = `⭐ ${item.vote_average.toFixed(1)}`;
        } else if (type === 'tv') {
            title = item.name;
            imgPath = item.poster_path;
            subInfo = `First Air: ${item.first_air_date ? item.first_air_date.split('-')[0] : 'N/A'}`;
            voteAvg = `⭐ ${item.vote_average.toFixed(1)}`;
        } else if (type === 'person') {
            title = item.name;
            imgPath = item.profile_path;
            subInfo = '';
            voteAvg = '';
        }

        card.innerHTML = `
          <img src="${imgPath ? imgUrl+'w185'+imgPath : 'icons/no-image.png'}" alt="${title}">
          <h3>${title}</h3>
          <p>${subInfo}</p>
          <p>${voteAvg}</p>
        `;

        container.appendChild(card);
    });
}

function cardClick(item, type) {
    if (type === 'movie') {
        window.location.href = `movie.html?id=${item.id}`;
    } else if (type === 'tv') {
        window.location.href = `serie.html?id=${item.id}`;
    } else if (type === 'person') {
        window.location.href = `person.html?id=${item.id}`;
    }
}

// Drawer menu
const menuIcon = document.getElementById('icon-button');
const sideDrawer = document.getElementById('drawer');

menuIcon.addEventListener('click', () => {
    sideDrawer.classList.toggle('open');
});

function toggleMask() {
    isNavOpen = !isNavOpen;
    drawer.dataset.open = `${isNavOpen}`;
    mask.dataset.open = `${isNavOpen}`;

}

document.getElementById("nav-button").addEventListener("click", () => {
    toggleMask();
});

mask.addEventListener("click", () => {
    toggleMask();
})
