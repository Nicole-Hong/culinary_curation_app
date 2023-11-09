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