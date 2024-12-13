document.getElementById('menu-icon').addEventListener('click', () => {
    document.getElementById('side-drawer').classList.toggle('open');
});

const queryObj = queryStringToJson(window.location.search);
const personId = queryObj.id;

const personDetailsDiv = document.getElementById('person-details');
const personCreditsDiv = document.getElementById('person-credits');

async function loadPerson() {
    const details = await personDetails(personId);
    // name, birthday, deathday, place_of_birth, biography, profile_path
    personDetailsDiv.innerHTML = `
        <h2>${details.name}</h2>
        <img src="${details.profile_path ? imgUrl+'w185'+details.profile_path : 'icons/no-image.png'}" alt="${details.name}" style="float:left; margin:10px;">
        <p><strong>Birthday:</strong> ${details.birthday || 'N/A'}</p>
        <p><strong>Death Date:</strong> ${details.deathday || 'N/A'}</p>
        <p><strong>Birthplace:</strong> ${details.place_of_birth || 'N/A'}</p>
        <p><strong>Biography:</strong> ${details.biography || 'No biography available.'}</p>
        <div style="clear:both;"></div>
    `;

    const credits = await makeAPICall(`person/${personId}/combined_credits`, "language=en-US");
    displayPersonCredits(credits);
}

function displayPersonCredits(credits) {
    // credits.cast array. media_type can be movie or tv
    personCreditsDiv.innerHTML = '';
    credits.cast.forEach(item => {
        if (item.media_type === 'movie' || item.media_type === 'tv') {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';

            card.addEventListener('mouseover', () => card.style.transform = 'scale(1.05)');
            card.addEventListener('mouseout', () => card.style.transform = 'scale(1)');

            card.addEventListener('click', () => {
                if (item.media_type === 'movie') {
                    window.location.href = `movie.html?id=${item.id}`;
                } else {
                    window.location.href = `series.html?id=${item.id}`;
                }
            });

            const subInfo = item.media_type === 'movie' ? 
                `Release: ${item.release_date ? item.release_date.split('-')[0] : 'N/A'}` :
                `First Air: ${item.first_air_date ? item.first_air_date.split('-')[0] : 'N/A'}`;

            card.innerHTML = `
                <img src="${item.poster_path ? imgUrl+'w185'+item.poster_path : 'icons/no-image.png'}" alt="${item.media_type === 'movie' ? item.title : item.name}">
                <h3>${item.media_type === 'movie' ? item.title : item.name}</h3>
                <p>${subInfo}</p>
                <p>Character: ${item.character || 'N/A'}</p>
            `;

            personCreditsDiv.appendChild(card);
        }
    });
}

loadPerson();