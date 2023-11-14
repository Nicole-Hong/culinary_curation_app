var recipeApi =
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=884e8098&app_key=b54753688c6e693be539e5e20d2ecb49";

$("#ingredientBtn").on("click", function () {
  $.ajax({
    type: "GET",
    async: false,
    url: recipeApi,
    success: function (result) {
      console.log(result);
      $("#recipeName").html(result);
    },
  });
});

// var youtubeApi = "https://www.googleapis.com/youtube/v3/search?q=cookie&part=snippet&type=video&maxResults=5&key=AIzaSyCPQrlqDUzWQXG8L_DzMhfZ64M";
// $.ajax({

//   type: "GET",
//   async: false,
//   url: youtubeApi,
//   success: function (result) {
//     console.log(result);
//   }});

// // });

async function searchYouTube() {
  // const API_KEY = 'AIzaSyCPQrlqDUzWQXG8L_DzMhfZ64M-WBvCY2Q';
  // const query = document.getElementById('query').value;
  const url = `https://www.googleapis.com/youtube/v3/search?q=cookie&part=snippet&type=video&maxResults=5&key=AIzaSyCPQrlqDUzWQXG8L_DzMhfZ64M-WBvCY2Q`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(response);
      // displayResults(data.items);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

searchYouTube();

// function displayResults(results) {
//   const resultList = document.getElementById('results');
//   resultList.innerHTML = '';

//   results.forEach((result, index) => {
//       const title = result.snippet.title;
//       const videoId = result.id.videoId;
//       const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

//       const listItem = document.createElement('li');
//       listItem.innerHTML = `${index + 1}. <a href="${videoUrl}" target="_blank">${title}</a>`;
//       resultList.appendChild(listItem);
//   })};