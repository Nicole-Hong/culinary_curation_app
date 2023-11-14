var userInput = $("#ingri1").val();
var recipeApi = `https://api.spoonacular.com/food/ingredients/search?apiKey=f2ff7323d7874b7aa2f8de38094d02e7&query=${userInput}`;

$("#ingredientBtn").on("click", function () {
  $.ajax({
    url: recipeApi,
    success: function (result) {
      console.log(result);
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
