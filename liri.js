var keys = require("./keys.js");
var axios = require("axios");
var userInput = "";
userInput = process.argv;
var command = process.argv[2];
var printed = "";
var searchTerm = "";
// var Spotify = require("node-spotify-api");
// var spotify = new Spotify({
//     id: ,
//     secret:
//   });

for (var i = 3; i < userInput.length; i++) {
  printed = printed + " " + userInput[i];
}

for (var i = 3; i < userInput.length; i++) {
  if (i > 3 && i < userInput.length) {
    searchTerm = searchTerm + "+" + userInput[i];
  } else {
    searchTerm += userInput[i];
  }
}

if (command == "movie-this" && userInput) {
  console.log("Your movie is:" + printed);

  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        searchTerm +
        "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log("The movie's rating is: " + response.data.imdbRating);
    });
} else if (command == "concert-this" && userInput) {
  console.log("Your concert is:" + printed);

  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        searchTerm +
        "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log("The movie's rating is: " + response.data.imdbRating);
    });
} else if (command == "spotify-this-song" && userInput) {
  console.log("Your song is:" + printed);
} else if (command == "do-what-it-says" && userInput) {
  console.log("BITCH:" + printed);
}

// function getMovie() {

//     axios
//         .get(
//             "http://www.omdbapi.com/?t=" + inputMovie + "&y=&plot=short&apikey=trilogy"
//         )
//         .then(function (response) {
//             console.log("The movie's rating is: " + response.data.imdbRating);
//         });
// }
