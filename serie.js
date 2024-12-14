document.getElementById('menu-icon').addEventListener('click', () => {
    document.getElementById('side-drawer').classList.toggle('open');
});

const queryObj = queryStringToJson(window.location.search);
const seriesId = queryObj.id;

const seriesDetailsDiv = document.getElementById('series-details');
const seriesCreditsDiv = document.getElementById('serie-credits');

async function loadSeries() {
    const details = await tvDetails(seriesId);
    // name, first_air_date, last_air_date, number_of_seasons, number_of_episodes, vote_average, overview
    const startYear = details.first_air_date ? details.first_air_date.split('-')[0] : 'N/A';
    const endYear = details.last_air_date ? details.last_air_date.split('-')[0] : 'N/A';

    seriesDetailsDiv.innerHTML = `
        <h2>${details.name}</h2>
        <img src="${details.poster_path ? imgUrl+'w300'+details.poster_path : 'icons/no-image.png'}" alt="${details.name}" style="float:left; margin:10px;">
        <p><strong>Years Running:</strong> ${startYear}-${endYear}</p>
        <p><strong>Seasons:</strong> ${details.number_of_seasons}</p>
        <p><strong>Episodes:</strong> ${details.number_of_episodes}</p>
        <p><strong>Vote Average:</strong> ${details.vote_average}</p>
        <p><strong>Overview:</strong> ${details.overview}</p>
        <div style="clear:both;"></div>
    `;
}

async function loadSeriesCredits() {
    const credits = await makeAPICall(`tv/${seriesId}/credits`, "language=en-US");
    seriesCreditsDiv.innerHTML = '';
    credits.cast.forEach(person => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.cursor = 'pointer';

        card.addEventListener('mouseover', () => card.style.transform = 'scale(1.05)');
        card.addEventListener('mouseout', () => card.style.transform = 'scale(1)');

        card.addEventListener('click', () => {
            window.location.href = `person.html?id=${person.id}`;
        });

        card.innerHTML = `
            <img src="${person.profile_path ? imgUrl+'w185'+person.profile_path : 'icons/no-image.png'}" alt="${person.name}">
            <p><strong>${person.name}</strong></p>
            <p>Character: ${person.character}</p>
        `;
        seriesCreditsDiv.appendChild(card);
    });
}

loadSeries();
loadSeriesCredits();