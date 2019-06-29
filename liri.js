require("dotenv").config();
const fs = require("fs");
const keys = require("./keys");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let mediaInfo = process.argv.slice(3).join(" ");

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
        "\nWelcome to Liri! Here are the commands that you can execute:\n \n 1) movie-this <option movie title>\n 2) concert-this <option artist name>\n 3) spotify-this-song <optional song title>\n 4) do-what-it-says\n"
      );
  }
};

let logInfo = mediaInfo => {
  fs.appendFile("log.txt", JSON.stringify(mediaInfo) + " \n", err => {
    if (err) return console.log(err);

    console.log("log.txt was updated.");
  });
};

const movieThis = mediaInfo => {
  !mediaInfo
    ? (console.log(
        "\nI see you didn't include a movie to search. Here's my favorite movie:\n"
      ),
      (mediaInfo = "Way of the Samurai"))
    : mediaInfo;

  axios
    .get(
      "http://www.omdbapi.com/?t=" + mediaInfo + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      let movie = response.data;
      console.log(
        "\nTitle: " +
          movie.Title +
          "\n" +
          "\nRelease Year: " +
          movie.Year +
          "\nIMDB Rating: " +
          movie.imdbRating +
          "\nRotten Tomatoes Rating: " +
          movie.Ratings[1].Value +
          "\nLocation: " +
          movie.Country +
          "\nLanguage: " +
          movie.Language +
          "\nCast: " +
          movie.Actors +
          "\n" +
          "\nSynopsis: " +
          movie.Plot +
          "\n"
      );
    });
};

const concertThis = mediaInfo => {
  !mediaInfo
    ? (console.log(
        "\nI see you didn't search for an artist's tour dates. Here's Pitbull's next 3 shows:\n"
      ),
      (mediaInfo = "Pitbull"))
    : (mediaInfo, console.log(`\n${mediaInfo}'s next three shows:\n`));

  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        mediaInfo +
        "/events?app_id=codingbootcamp"
    )

    .then(function(response) {
      let shows = response.data;
      for (i = 0; i < 3; i++)
        console.log(
          "Venue: " +
            shows[i].venue.name +
            "\nLocation: " +
            shows[i].venue.city +
            "\nDate: " +
            moment(shows[i].datetime).format("MM/DD/YYYY") +
            "\n"
        );
    });
};

const spotifyThis = mediaInfo => {
  !mediaInfo
    ? (console.log(
        "\nI see you didn't choose a song. Here's one of my favorites: \n"
      ),
      (mediaInfo = "Good Day Nappy Roots"))
    : mediaInfo;

  spotify.search({ type: "track", query: mediaInfo }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(
      "\nArtist: " +
        data.tracks.items[0].artists[0].name +
        "\nSong: " +
        data.tracks.items[0].name +
        "\nAlbum: " +
        data.tracks.items[0].album.name +
        "\nPreview: " +
        data.tracks.items[0].preview_url +
        "\n"
    );
  });
};

const doWhatItSays = () => {
  fs.readFile("random.txt", "utf8", function(err, data) {
    let randomThing = data.split(",");
    mediaInfo = randomThing[1];
    console.log("\nTHE UNIVERSE GRANTS YOU: \n");
    spotifyThis(mediaInfo);
  });
};

liriStart(command, mediaInfo);
