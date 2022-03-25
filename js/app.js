console.log("Hello World")

// GLOBAL
const deckImgs = [];
const deckPrices = [];
let mainDeckMonster, spellCard, trapCard, extraDeckMonster, marketPrice;

// Finding a main deck card
const getMainDeckMonster = (type) => {
  return $.ajax({
    url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset&type=${type}`,
  });
}


$("#get-deck").on("click", (evt) => {
  evt.preventDefault();
  mainDeckMonster = $("#main-deck").val();
  spellCard = $("#spell-card").val();
  trapCard = $("#trap-card").val();
  extraDeckMonster = $("#extra-deck").val();
  marketPrice = $("#get-price").val();
  
  if(mainDeckMonster === null) {
    alert("Please make a selection for all");
  }
  // Find a way to push a data for each option into one single array of promises;
  // Navigate array with back and forward button

  getMainDeckMonster(mainDeckMonster) 
  .then((data) => {
    console.log(data);
    $("img").remove();
    $("p").remove();

    const $img = $("<img>");
    
    $img.attr("src", data.data[0].card_images[0].image_url).attr("atl", data.name).appendTo(".card-slides");
    
    deckImgs.push(data.data[0].card_images[0].image_url)
    deckPrices.push(data.data[0].card_prices[0].amazon_price)
    
    // displays card specs
    
    $("<p>").text(`Type: ${data.data[0].type}`).appendTo("#details");
    $("<p>").text(`Race: ${data.data[0].race}`).appendTo("#details");
    $("<p>").text(`Level: ${data.data[0].level}`).appendTo("#details");
    $("<p>").text(`Attribute: ${data.data[0].attribute}`).appendTo("#details");
    $("<p>").text(`ATK: ${data.data[0].atk}`).appendTo("#details");
    $("<p>").text(`DEF: ${data.data[0].def}`).appendTo("#details");
    $("<p>").text(`Price on Amazon: $${data.data[0].card_prices[0].amazon_price}`).appendTo("#details");

    // displays card name & description
    $("<p id='name'>").text(data.data[0].name).appendTo(".card-desc");
    $("<p id='desc'>").text(data.data[0].desc).appendTo(".card-desc");
  })
  console.log(deckImgs, deckPrices);
});
