const router = require('express').Router();
const emotionPlaylists = {
  intense: '3674407242',
  upbeat: '1964085082',
  romantic: '10023968002',
  chill: '3526107782',
  sad: '9636242862',
};

router.get('/', async (req, res) => {
  try {
    // Extract the emotion parameter from the request query
    const { emotion } = req.query;
    // Retrieve the playlist ID for the selected emotion
    const playlistId = emotionPlaylists[emotion];
    // Render the musicpage.handlebars template with the playlist ID
    res.render('profile', { playlistId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;



// const router = require('express').Router();
// const fetch = require('node-fetch');
// require('dotenv').config();

// const deezerApiKey = process.env.DEEZER_API_KEY;

// const emotionPlaylists = {
//   intense: '3674407242',
//   upbeat: '1964085082',
//   romantic: '10023968002',
//   chill: '3526107782',
//   sad: '9636242862',
// };

// const fetchPlaylistData = async (playlistId) => {
//   try {
//     const url = `https://api.deezer.com/playlist/${playlistId}`;
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-RapidAPI-Key': deezerApiKey,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch playlist data. Status: ${response.status}`);
//     }

//     const playlistData = await response.json();
//     return playlistData;
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };

// router.get('/', async (req, res) => {
//     try {
//       // Extract the emotion parameter from the request query
//       const { emotion } = req.query;
//       // Retrieve the playlist ID for the selected emotion
//       const playlistId = emotionPlaylists[emotion];
//       // Fetch playlist data for the selected emotion
//       const playlistData = await fetchPlaylistData(playlistId);
//       // Render the musicpage.handlebars template with the playlist data and playlist ID
//       res.render('musicpage', { playlistData, playlistId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
// module.exports = router;


// const router = require('express').Router();
// const fetch = require('node-fetch'); // Import the fetch function
// require('dotenv').config();

// const deezerApiKey = process.env.DEEZER_API_KEY;

// // Array of playlist IDs for each emotion
// const emotionPlaylists = {
//   intense: '3674407242',
//   upbeat: '1964085082',
//   romantic: '10023968002',
//   chill: '3526107782',
//   sad: '9636242862',
// };

// const fetchPlaylistData = async (playlistId) => {
//   try {
//     const url = `https://api.deezer.com/playlist/${playlistId}`;
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // Include your Deezer API key in the headers
//         'X-RapidAPI-Key': deezerApiKey,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch playlist data. Status: ${response.status}`);
//     }

//     const playlistData = await response.json();
//     console.log(playlistData);
//     return playlistData;
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };

// router.get('/', async (req, res) => {
//   try {
//     // Example usage for fetching playlist data for each emotion
//     const playlistDataArray = await Promise.all(
//       Object.entries(emotionPlaylists).map(async ([emotion, playlistId]) => {
//         const data = await fetchPlaylistData(playlistId);
//         return { emotion, data };
//       })
//     );

//     res.json(playlistDataArray);
//     // Perform actions with the playlist data (e.g., display music player)
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;


// // const router = require('express').Router()
// // require('dotenv').config()
// // const deezerApiKey = process.env.DEEZER_API_KEY;

// // // Array of playlist IDs for each emotion
// // const emotionPlaylists = {
// //   intense: '3674407242',
// //   upbeat: '1964085082',
// //   romantic: '10023968002',
// //   chill: '3526107782',
// //   sad: '9636242862',
// // };
// // const fetchPlaylistData = async (playlistId) => {
// //     try {
// //       const url = `https://api.deezer.com/playlist/${playlistId}`;
// //       const response = await fetch(url, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           // Include your Deezer API key in the headers
// //           'X-RapidAPI-Key': deezerApiKey,
// //         },
// //       });
  
// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch playlist data. Status: ${response.status}`);
// //       }
  
// //       const playlistData = await response.json();
// //       console.log(playlistData);
// //       return playlistData;
// //     } catch (error) {
// //       console.error(error.message);
// //       throw error;
// //     }
// //   };
// // router.get('/', async (req, res)=>{
// //     // Example usage for fetching playlist data for each emotion
// // for (const emotion in emotionPlaylists) {
// //     if (Object.hasOwnProperty.call(emotionPlaylists, emotion)) {
// //       const playlistId = emotionPlaylists[emotion];
// //       fetchPlaylistData(playlistId)
// //         .then((data) => {
// //           console.log(`${emotion} Playlist Data:`, data);
// //           res.json(data)
// //           // Perform actions with the playlist data (e.g., display music player)
// //         })
// //         .catch((error) => console.error(error));
// //     }
// //   }
// // })
// // module.exports = router