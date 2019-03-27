require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var userInput = "";
userInput = process.argv;
var command = process.argv[2];
var printed = "";
var searchTerm = "";

console.log(
  "\nACCEPTED COMMANDS: movie-this, concert-this, spotify-this-song, do-what-it-says\n"
);

for (var i = 3; i < userInput.length; i++) {
  printed = printed + " " + userInput[i];
}

// Creating the search term
for (var i = 3; i < userInput.length; i++) {
  if (i > 3 && i < userInput.length) {
    searchTerm = searchTerm + "+" + userInput[i];
  } else {
    searchTerm += userInput[i];
  }
}

if (command == "movie-this" && userInput) {
  console.log("MOVIE: " + printed + "\n");
  movieThis();
} else if (command == "concert-this" && userInput) {
  console.log("ARTIST: " + printed + "\n");
  concertThis();
} else if (command == "spotify-this-song" && userInput) {
  spotifyThis();
} else if (command == "do-what-it-says" && userInput) {
  doWhatItSays();
}

function movieThis() {
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
