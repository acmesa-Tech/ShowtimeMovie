// Note: Replace with your own API key if needed
const apiKey = "c13e18e145b6b9dbb97382fbc3a279da";

const api = "https://api.themoviedb.org/3/";
const imgUrl = "https://image.tmdb.org/t/p/";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    }
};

async function makeAPICall(urlExtension, query) {
    const newURL = `${api}${urlExtension}?api_key=${apiKey}&${query}`;
    const result = await fetch(newURL, options);
    return result.json();
}

// Movies
async function moviePopular(page) {
    const pageNum = page || 1;
    const urlExtension = "movie/popular";
    const requiredQuery = `language=en-US&page=${pageNum}`;
    return await makeAPICall(urlExtension, `${requiredQuery}`);
}

async function movieDetails(movieId) {
    const urlExtension = `movie/${movieId}`;
    const requiredQuery = "language=en-US";
    return await makeAPICall(urlExtension, `${requiredQuery}`);
}

async function movieImages(movieId) {
    const urlExtension = `movie/${movieId}/images`;
    return await makeAPICall(urlExtension, "");
}

async function movieSearch(searchTerm, page) {
    const pageNum = page || 1;
    const urlExtension = "search/movie";
    const requiredQuery = `include_adult=false&language=en-US&page=${pageNum}`;
    const query = `query=${searchTerm}`;
    return await makeAPICall(urlExtension, `${requiredQuery}&${query}`);
}

// People
async function peoplePopular(page) {
    const pageNum = page || 1;
    const urlExtension = "person/popular";
    const requiredQuery = `language=en-US&page=${pageNum}`;
    return await makeAPICall(urlExtension, `${requiredQuery}`);
}

async function personDetails(personId) {
    const urlExtension = `person/${personId}`;
    const requiredQuery = "language=en-US";
    return await makeAPICall(urlExtension, `${requiredQuery}`);
}

async function personImages(personId) {
    const urlExtension = `person/${personId}/images`;
    return await makeAPICall(urlExtension, "");
}

async function peopleSearch(searchTerm, page) {
    const pageNum = page || 1;
    const urlExtension = "search/person";
    const requiredQuery = `include_adult=false&language=en-US&page=${pageNum}`;
    const query = `query=${searchTerm}`;
    return await makeAPICall(urlExtension, `${requiredQuery}&${query}`);
}

// TV
async function tvPopular(page) {
    const pageNum = page || 1;
    const urlExtension = "tv/popular";
    const requiredQuery = `language=en-US&page=${pageNum}`;
    return await makeAPICall(urlExtension, `${requiredQuery}`);
}

async function tvDetails(tvId) {
    const urlExtension = `tv/${tvId}`;
    const requiredQuery = "language=en-US";
    return await makeAPICall(urlExtension, `${requiredQuery}`);
}

async function tvImages(seriesId) {
    const urlExtension = `tv/${seriesId}/images`;
    return await makeAPICall(urlExtension, "");
}

async function tvSearch(searchTerm, page) {
    const pageNum = page || 1;
    const urlExtension = "search/tv";
    const requiredQuery = `include_adult=false&language=en-US&page=${pageNum}`;
    const query = `query=${searchTerm}`;
    return await makeAPICall(urlExtension, `${requiredQuery}&${query}`);
}

// Utilities
function queryStringToJson(queryString) {
    if (queryString.startsWith("?")) {
        queryString = queryString.substring(1);
    }
    const pairs = queryString.split('&');
    const result = pairs.reduce((acc, pair) => {
        const queryPair = pair.split("=");
        acc[queryPair[0]] = decodeURIComponent(queryPair[1] || '');
        return acc;
    }, {});
    return result;
}
