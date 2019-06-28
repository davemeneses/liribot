require("dotenv").config();
const fs = require("fs");
const keys = require("./keys");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const spotify = new Spotify(keys.spotify);

// this saves what command the user is typing
let command = process.argv[2];
// this checks what information the user is providing.
let mediaInfo = process.argv.slice(3).join(" ");

// console.log(
//   "\nACCEPTED COMMANDS: movie-this, concert-this, spotify-this-song, do-what-it-says\n"
// );

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
      spotifyThis(mediaInfo);
      break;
    default:
      console.log(
        "\nACCEPTED COMMANDS: movie-this, concert-this, spotify-this-song, do-what-it-says\n"
      );
  }
};

// if (command == "movie-this" && userInput) {
//   console.log("MOVIE: " + printed + "\n");
//   movieThis();
// } else if (command == "concert-this" && userInput) {
//   console.log("ARTIST: " + printed + "\n");
//   concertThis();
// } else if (command == "spotify-this-song" && userInput) {
//   spotifyThis();
// } else if (command == "do-what-it-says" && userInput) {
//   doWhatItSays();
// }

function movieThis() {
  if (!searchTerm) {
    searchTerm = "Mr Nobody";
  }
  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        searchTerm +
        "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log(
        "\nTitle: " +
          response.data.Title +
          "\nRelease Year: " +
          response.data.Year +
          "\nIMDB Rating: " +
          response.data.imdbRating +
          "\nRotten Tomatoes Rating: " +
          response.data.Ratings[1].Value +
          "\nLocation: " +
          response.data.Country +
          "\nLanguage: " +
          response.data.Language +
          "\nPlot: " +
          response.data.Plot +
          "\nCast: " +
          response.data.Actors
      );
    });
}

function concertThis() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        searchTerm +
        "/events?app_id=codingbootcamp"
    )

    .then(function(response) {
      for (i = 0; i < 3; i++)
        console.log(
          "VENUE: " +
            response.data[i].venue.name +
            "\nLOCATION: " +
            response.data[i].venue.city +
            "\nDATE: " +
            moment(response.data[i].datetime).format("MM/DD/YYYY") +
            "\n"
        );
    });
}

function spotifyThis() {
  // searchTerm.toString
  if (!searchTerm) {
    searchTerm = "The Sign Ace of Base";
  }
  spotify.search({ type: "track", query: searchTerm }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(
      "ARTIST: " +
        data.tracks.items[0].artists[0].name +
        "\nSONG: " +
        data.tracks.items[0].name +
        "\nALBUM: " +
        data.tracks.items[0].album.name +
        "\nPREVIEW: " +
        data.tracks.items[0].preview_url +
        "\n"
    );
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      console.log("Error! " + err);
    }

    var randomThing = data.split(",");
    searchTerm = randomThing[1];
    console.log("THE UNIVERSE GRANTS YOU -- \n");
    spotifyThis();
  });
}

liriStart(command, mediaInfo);
