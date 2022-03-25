console.log("Hello World")

$("#get-deck").on("click", (evt) => {
  evt.preventDefault();
  $.ajax({
    url: "https://db.ygoprodeck.com/api/v7/randomcard.php",
  })
  .then((data) => {
    console.log(data);
    $("img").remove();
    $("p").remove();

    const $img = $("<img>");
    
    $img.attr("src", data.card_images[0].image_url);
    $img.attr("atl", data.name);
    $img.appendTo(".card-slides");
    
    // displays card specs
    
    $("<p>").text(`Type: ${data.type}`).appendTo("#details");
    $("<p>").text(`Race: ${data.race}`).appendTo("#details");
    $("<p>").text(`Level: ${data.level}`).appendTo("#details");
    $("<p>").text(`Attribute: ${data.attribute}`).appendTo("#details");
    $("<p>").text(`ATK: ${data.atk}`).appendTo("#details");
    $("<p>").text(`DEF: ${data.def}`).appendTo("#details");
    $("<p>").text(`Price on Amazon: $${data.card_prices[0].amazon_price}`).appendTo("#details");

    // displays card name & description
    $("<p id='name'>").text(data.name).appendTo(".card-desc");
    $("<p id='desc'>").text(data.desc).appendTo(".card-desc");
  })
});
