require("dotenv").config();
const fs = require("fs");
const keys = require("./keys");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let mediaInfo = process.argv.slice(3).join(" ");

//function that reads the user input and executes the correct command
const liriStart = (command, mediaInfo) => {
  switch (command) {
    case "movie-this":
      movieThis(mediaInfo);
      break;
    case "concert-this":
      concertThis(mediaInfo);
      break;
    case "spotify-this-song":
      spotifyThis(mediaInfo);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log(
        `\nWelcome to Liri! Here are the commands that you can execute:\n \n 1) movie-this <option movie title>\n 2) concert-this <option artist name>\n 3) spotify-this-song <optional song title>\n 4) do-what-it-says\n`
      );
  }
};

//command that shows movie data
const movieThis = mediaInfo => {
  !mediaInfo
    ? (console.log(
        `\nI see you didn't include a movie to search. Here's my favorite movie:`
      ),
      (mediaInfo = "Way of the Samurai"))
    : (mediaInfo, console.log(`\nYou Searched: ${mediaInfo}`));
  axios
    .get(`http://www.omdbapi.com/?t=${mediaInfo}&y=&plot=short&apikey=trilogy`)
    .then(function(response) {
      let movie = response.data;
      console.log(
        `\nTitle: ${movie.Title}\n\nRelease Year: ${movie.Year}\nIMDB Rating: ${
          movie.imdbRating
        }\nRotten Tomatoes Rating: ${movie.Ratings[1].Value}\nLocation: ${
          movie.Country
        }\nLanguage: ${movie.Language}\nCast: ${movie.Actors}\n\nSynopsis: ${
          movie.Plot
        }\n`
      );
    });
};

//command that find the next 3 shows an artist has booked
const concertThis = mediaInfo => {
  !mediaInfo
    ? (console.log(
        `\nI see you didn't search for an artist's tour dates. Here's Pitbull's next 3 shows:\n`
      ),
      (mediaInfo = "Pitbull"))
    : (mediaInfo, console.log(`\n${mediaInfo}'s next three shows:\n`));

  axios
    .get(
      `https://rest.bandsintown.com/artists/${mediaInfo}/events?app_id=codingbootcamp`
    )

    .then(function(response) {
      let shows = response.data;
      for (i = 0; i < 3; i++)
        console.log(
          `Venue: ${shows[i].venue.name}\nLocation: ${
            shows[i].venue.city
          }\nDate: ${moment(shows[i].datetime).format("MM/DD/YYYY")}\n`
        );
    });
};

//command that searches Spotify for a specific song
const spotifyThis = mediaInfo => {
  !mediaInfo
    ? (console.log(
        `\nI see you didn't choose a song. Here's one of my favorites: `
      ),
      (mediaInfo = "Good Day Nappy Roots"))
    : mediaInfo;

  spotify.search({ type: "track", query: mediaInfo }, function(err, data) {
    if (err) {
      return console.log(`Error occurred: ${err}`);
    }
    let song = data.tracks.items;
    console.log(
      `\nYou Searched: ${mediaInfo}\n\nArtist: ${
        song[0].artists[0].name
      }\nSong: ${song[0].name}\nAlbum: ${song[0].album.name}\nPreview: ${
        song[0].preview_url
      }\n`
    );
  });
};

//command that reads from the random.txt file
const doWhatItSays = () => {
  fs.readFile("random.txt", "utf8", function(err, data) {
    let randomThing = data.split(",");
    mediaInfo = randomThing[1];
    console.log(`\nTHE UNIVERSE GRANTS YOU: \n`);
    spotifyThis(mediaInfo);
  });
};

liriStart(command, mediaInfo);
