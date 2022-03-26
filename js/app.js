console.log("Hello World")

// GLOBAL
const deckImgs = [];
const deckPrices = [];
const deckDatas = [];
let mainDeckMonster, spellCard, trapCard, extraDeckMonster, marketPrice;

// Finding a main deck card
const getCardData = (type) => {
  return $.ajax({
    url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset&type=${type}`,
  });
}


$("#submit").on("click", (evt) => {
  evt.preventDefault();
  
  $(".arrows").css("display", "flex");

  mainDeckMonster = $("#main-deck").val();
  spellCard = $("#spell-card").val();
  trapCard = $("#trap-card").val();
  extraDeckMonster = $("#extra-deck").val();
  marketPrice = $("#get-price").val();

  if(mainDeckMonster === null || spellCard === null || trapCard === null || extraDeckMonster === null) {
    alert("Please make a selection for all");
  }
  // Find a way to push a data for each option into one single array of promises;
  // Navigate array with back and forward button

  deckDatas.push(getCardData(mainDeckMonster));
  deckDatas.push(getCardData(spellCard));
  deckDatas.push(getCardData(trapCard));
  deckDatas.push(getCardData(extraDeckMonster));

  deckDatas[1]
  .then((data) => {
    console.log(data);
    $("img").remove();
    $("p").remove();
    
    const $img = $("<img>");
    
    $img.attr("src", data.data[0].card_images[0].image_url).attr("atl", data.name).appendTo(".card-slides");
    
    deckImgs.push(data.data[0].card_images[0].image_url)
    deckPrices.push(data.data[0].card_prices[0].amazon_price)
    
    // displays card specs
    $(".card-info h1").text(data.data[0].name);
    $("<p>").text(`Type: ${data.data[0].type}`).appendTo("#details");
    $("<p>").text(`Race: ${data.data[0].race}`).appendTo("#details");
    $("<p>").text(`Level: ${data.data[0].level}`).appendTo("#details");
    $("<p>").text(`Attribute: ${data.data[0].attribute}`).appendTo("#details");
    $("<p>").text(`ATK: ${data.data[0].atk}`).appendTo("#details");
    $("<p>").text(`DEF: ${data.data[0].def}`).appendTo("#details");
    $("<p>").text(`Price on Amazon: $${data.data[0].card_prices[0].amazon_price}`).appendTo("#details");
    $("<p id='desc'>").text(data.data[0].desc).appendTo("#details");
  })

  console.log(deckImgs, deckPrices);
});
