console.log("Hello World")

$("#get-deck").on("click", (evt) => {
  evt.preventDefault();
  $.ajax({
    url: "https://db.ygoprodeck.com/api/v7/randomcard.php",
  })
  .then((data) => {
    console.log(data);
    $("img").remove();

    const $img = $("<img>");
    
    $img.attr("src", data.card_images[0].image_url);
    $img.attr("atl", data.name);
    $img.prependTo(".container");
  })
});
