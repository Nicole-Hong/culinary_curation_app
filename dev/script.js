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
