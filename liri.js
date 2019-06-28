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
      doWhatItSays();
      break;
    default:
      console.log(
        "\nRecognized Commands: movie-this, concert-this, spotify-this-song, do-what-it-says\n"
      );
  }
};

const movieThis = mediaInfo => {
  // condition ? value if true : value if false
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

// condition ? value if true : value if false

const concertThis = mediaInfo => {
  if (!mediaInfo) {
    console.log(
      "\nI see you didn't search for an artist's tour dates. Here's Bruno Mars's next 3 shows: \n"
    ),
      (mediaInfo = "Bruno Mars");
  }

  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        mediaInfo +
        "/events?app_id=codingbootcamp"
    )

    .then(function(response) {
      let shows = response.data;
      console.log("\n");
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
  if (!mediaInfo) {
    console.log(
      "\nI see you didn't choose a song. Here's one of my favorites: \n"
    ),
      (mediaInfo = "Good Day Nappy Roots");
  }

  // searchTerm.toString

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

    // console.log(data.tracks.items[0]);
  });
};

// condition ? value if true : value if false

const doWhatItSays = () => {
  // fs.readFile("random.txt", "utf8", function(err, data) {
  //   err && console.log("Error! " + err);
  //   let randomThing = data.split(",");
  //   mediaInfo = randomThing[1];
  //   console.log("THE UNIVERSE GRANTS YOU: \n");
  //   spotifyThis(mediaInfo);
  // });
  console.log("\nTHE UNIVERSE GRANTS YOU: ");
  mediaInfo = "I Get Knocked Down";
  spotifyThis(mediaInfo);
};

liriStart(command, mediaInfo);

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
