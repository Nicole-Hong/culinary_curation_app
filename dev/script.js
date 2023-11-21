var ingredientPage = document.querySelector(".ingredientPage");
var recipePage = document.querySelector(".recipePage");
var startPage = document.querySelector(".startPage");
var startBtn = document.querySelector("#startBtn");
var ingredientBtn = document.querySelector("#ingredientBtn");
var regenerateBtn = document.querySelector("#regenerateBtn");
var restartBtn = document.querySelector("#restartBtn");
// global variables for the regenerateBtn
var result = [];
var currentRecipeIndex = 0;

// Function to hide the selected HTML element and its nested HTML elements by adding an "inactive" CSS class
function hide(element) {
  element.classList.add("inactive");
}

// Function to show the selected HTML element and its nested HTML elements by removing the "inactive" CSS class
function show(element) {
  element.classList.remove("inactive");
}

function fadeIn(element) {
  element.classList.add("fadeIn");
}

window.addEventListener("load", function () {
  hide(ingredientPage);
  hide(recipePage);
  fadeIn(startPage);
});

startBtn.addEventListener("click", function () {
  hide(startPage);
  show(ingredientPage);
  fadeIn(ingredientPage);
});

restartBtn.addEventListener("click", function () {
  window.location.assign("./index.html");
});

$("#ingredientBtn").on("click", function () {
  var ingredientItem1 = $("#ingri1").val();
  var ingredientItem2 = $("#ingri2").val();
  var ingredientItem3 = $("#ingri3").val();
  let ingredientItem1LC = ingredientItem1.toLowerCase();
  let ingredientItem2LC = ingredientItem2.toLowerCase();
  let ingredientItem3LC = ingredientItem3.toLowerCase();
  var recipeApi = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientItem1LC},${ingredientItem2LC},${ingredientItem3LC}&apiKey=f2ff7323d7874b7aa2f8de38094d02e7`;
  result = [];
  $.ajax({
    url: recipeApi,
    dataType: "json",
    success: function (response) {
      result = response;
      if (result == false) {
        console.log($("#errorHandler"));
        $("#errorHandler")[0].innerText =
          "Please enter at least 1 VALID ingredient";
        return;
      } else {
        hide(ingredientPage);
        show(recipePage);
        fadeIn(recipePage);
        $("#recipeImage").attr("src", result[0].image);
        $("#recipeImage").attr("alt", `Recipe image for ${result[0].title}`);
        $("#recipeName").text(result[0].title);
        $("#nutritionLabel").attr(
          "src",
          `https://api.spoonacular.com/recipes/${result[0].id}/nutritionLabel.png?apiKey=f2ff7323d7874b7aa2f8de38094d02e7`
        );
        $("#nutritionLabel").attr(
          "alt",
          `Nutrition label for ${result[0].title} recipe`
        );
        function getRecipeUrl() {
          $.ajax({
            url: `https://api.spoonacular.com/recipes/${result[0].id}/information?includeNutrition=false&apiKey=f2ff7323d7874b7aa2f8de38094d02e7`,
            dataType: "json",
            success: function (response) {
              result = response;
              $("#recipeBtnLink").attr("href", result.sourceUrl);
            },
          });
        }
        // Get Youtube video titles & video ids using YouTube api based on the recipe title returned by the Spoonacular api.
        getRecipeUrl();
        youtubeCall();

        displayNextRecipe(
          ingredientItem1LC,
          ingredientItem2LC,
          ingredientItem3LC
        );
      }
    },
  });

  function displayNextRecipe(
    ingredientItem1LC,
    ingredientItem2LC,
    ingredientItem3LC
  ) {
    $("#regenerateBtn").on("click", function () {
      currentRecipeIndex++;
      $.ajax({
        url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientItem1LC},${ingredientItem2LC},${ingredientItem3LC}&apiKey=f2ff7323d7874b7aa2f8de38094d02e7`,
        dataType: "json",
        success: function (response) {
          result = response;
          if (currentRecipeIndex < result.length) {
            console.log(result[currentRecipeIndex]);
            $("#recipeImage").attr("src", result[currentRecipeIndex].image);
            $("#recipeImage").attr(
              "alt",
              `Recipe image for ${result[currentRecipeIndex].title}`
            );
            $("#recipeName").text(result[currentRecipeIndex].title);
            $("#nutritionLabel").attr(
              "src",
              `https://api.spoonacular.com/recipes/${result[currentRecipeIndex].id}/nutritionLabel.png?apiKey=f2ff7323d7874b7aa2f8de38094d02e7`
            );
            $("#nutritionLabel").attr(
              "alt",
              `Nutrition label for ${result[currentRecipeIndex].title} recipe`
            );
            $.ajax({
              url: `https://api.spoonacular.com/recipes/${result[currentRecipeIndex].id}/information?includeNutrition=false&apiKey=f2ff7323d7874b7aa2f8de38094d02e7`,
              dataType: "json",
              success: function (response) {
                result = response;
                $("#recipeBtnLink").attr("href", result.sourceUrl);
              },
            });
            $(".videos").html("");
            // Update youtube titles and videos when the find another recipe button is clicked
            youtubeCall();
            console.log(currentRecipeIndex);
          } else {
            $("#recipeErrorHandler")[0].innerText =
              "No more recipes available.";
          }
        },
      });
    });
  }
});

// Function that calls youtube api and adds the fetched content to the videos section
var youtubeCall = function () {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${result[currentRecipeIndex].title}-receipe&key=AIzaSyDIxMa6ugmv0MhIeChjhS0vRITCJvRWZJM`
  )
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      var videoList = data.items;
      for (var i = 0; i < 4; i++) {
        var embeddedVideo = `<iframe id="video-player" type="text/html" width="60" height="30" src="https://www.youtube.com/embed/${videoList[i].id.videoId}" frameborder="0" allow="fullscreen"></iframe>`;
        $(".videos").append(
          `<div class="recipe-video">${videoList[i].snippet.title} ${embeddedVideo}</div>`
        );
      }
    });
};

var requestOptions = {
  method: "GET",
};

function matchWeather(userWeather) {
  var bearSpeechBubble = $("#bearSpeechBubble");
  switch (userWeather) {
    case "Clouds":
      bearSpeechBubble.text(
        "Grey skies? Lets brighten up your day with something yummy."
      );
      break;
    case "Rain":
      bearSpeechBubble.text(
        "Don't forget your umbrella today. Maybe some soup today?"
      );
      break;
    case "Clear":
      bearSpeechBubble.text(
        "Your skies are so clear. Let's cook something pretty!"
      );
      break;
    case "Snow":
      bearSpeechBubble.text("Brr... It's cold! Warm up with something yummy!");
      break;
    default:
      bearSpeechBubble.text("Welcome! Let's find a delicious recipe for you.");
  }

  // Animate the bearSpeechBubble text
  i = 0;
  speed = 30;
  typeWriter(bearSpeechBubble.text());
}

function typeWriter(textContent) {
  var bearSpeechBubble = $("#bearSpeechBubble");
  if (i < textContent.length) {
    bearSpeechBubble.text(textContent.substring(0, i) + textContent.charAt(i));
    i++;
    setTimeout(function () {
      typeWriter(textContent);
    }, speed);
  }
}

function getUserCity() {
  fetch(
    "https://api.geoapify.com/v1/ipinfo?&apiKey=ac81076e7bbd48f88fba77c2d523e8b2",
    requestOptions
  )
    .then((response) => response.json())
    .then(function (response) {
      var userLocation = response.city.name;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=4d25c521dda0430b5616db00d103b5a4`,
        requestOptions
      )
        .then((response) => response.json())
        .then(function (response) {
          var userWeather = response.weather[0].main;
          matchWeather(userWeather);
        });
    })
    .catch((error) => console.log("error", error));
}

getUserCity();
