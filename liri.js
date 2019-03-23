// Pseudocode

// install all the given packages

// require("dotenv").config();
// require keys.js
    // var keys = require("./keys.js")
// * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

// * [Axios](https://www.npmjs.com/package/axios)

//   * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

// * [Moment](https://www.npmjs.com/package/moment)

// * [DotEnv](https://www.npmjs.com/package/dotenv)


//var spotify = new Spotify(keys.spotify);

// User command choice 
    // process.argv or inquirer
// userChoice for movie/song/concert
     // process.argv or inquirer

// check for user command
    // if or switch
        // cond(concert-this)
            // create a function concert(userChoice) 
        // cond(spotify-this-song)
            // create a function spotify() 
        // cond(movie-this)
            // create a function movie() 
        // cond(do-what-it-says)
            // create a function dowhatitsays() 

// concert(userChoice)
    // have to use axios
    // use this url : "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    // display name, location, date

// dowhatitsays()
    // fs.readFile
        // data.split(', ')[1]
        // spotify(data.split(', ')[1])