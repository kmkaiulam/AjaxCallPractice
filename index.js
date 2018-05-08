/* This app doesn't follow a11y best practices, and the JS file is incomplete. Complete the getDataFromApi, displaySearchData, and watchSubmit functions. When you're done, this app should allow a user to search for an artist and song title (both should be required), and display the song lyrics. You should make requests to this API: https://lyricsovh.docs.apiary.io/# . Also make any necessary adjustments to make this app accessible. */
//API Endpoint
const SONGLYRICS_URL = 'https://api.lyrics.ovh/v1/'

function getDataFromApi(artist, title, displaySearchData) {
  const settings = {
    url: `${SONGLYRICS_URL}${artist}/${title}`,
    dataType: 'json',
    data: {q:''},
    'type': 'GET',
    success: function(data) {
      displaySearchData(data, artist, title);
    }
  }
  $.ajax(settings);
}

function displaySearchData(data, artist, title) {
  console.log(data);
  const songSearchResults = `
  <div id = 'results'>
    <div class = 'js-song-artist'><h1>Artist: ${artist}</h1></div>
    <div class = 'js-song-title'><h2>Title: ${title}</h2></div> 
    <div class = 'js-song-lyrics'><p>Lyrics: ${data.lyrics}</p></div>
  </div>
` 
  $('.js-search-results').html(songSearchResults);
}

//when form is submitted take value for the artist and the title to use as parameters for ajax call
//clear input forms upon submission of form
//pass into getDataFromAPI
function watchSubmit() {
$('.js-search-form').submit(event => {
  event.preventDefault();
//artist   
  const userInputArtist = $(event.currentTarget).find('.js-query-artist')
  const artist = userInputArtist.val();
  userInputArtist.val('');
//title
  const userInputTitle = $(event.currentTarget).find('.js-query-title')
  const title = userInputTitle.val();
  userInputTitle.val('');
  getDataFromApi(artist, title, displaySearchData)
});
}

$(watchSubmit);