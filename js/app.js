console.log("Hello World")

// GLOBAL
let deckDatas, mainDeckMonster, spellCard, trapCard, extraDeckMonster, marketName, marketParameter, currentCardIndex,  deckTotalPrice;

// Finding a main deck card
const getCardData = (type) => {
  return $.ajax({
    url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset&type=${type}`,
  });
}

function displayCard() {
  
  $(".arrows").css("display", "flex");
  $(".total-price").css("display", "flex");
  $(".card-slides").css("display", "flex");

  deckDatas[currentCardIndex]
  .then((data) => {
    $("img").remove();
    $("p").remove();
    
    const $img = $("<img>");
    
    $img.attr("src", data.data[0].card_images[0].image_url).attr("atl", data.name).appendTo(".card-slides");
    

    // displays card specs
    $(".card-info h1").text(data.data[0].name);
    
    $("<p>").text(`Type: ${data.data[0].type}`).appendTo("#details");
    
    $("<p>").text(`Race: ${data.data[0].race}`).appendTo("#details");
    
    $("<p>").text(`Level: ${data.data[0].level}`).appendTo("#details");
    
    $("<p>").text(`Attribute: ${data.data[0].attribute}`).appendTo("#details");
    
    $("<p>").text(`ATK: ${data.data[0].atk}`).appendTo("#details");
    
    $("<p>").text(`DEF: ${data.data[0].def}`).appendTo("#details");
    
    $("<p>").text(`Price on ${marketName}: $${data.data[0].card_prices[0][marketParameter]}`).appendTo("#details");
    
    $("<p id='desc'>").text(data.data[0].desc).appendTo("#details");
  })
}

$("#submit-btn").on("click", (evt) => {
  evt.preventDefault();
  
  deckDatas = [];

  currentCardIndex = 0;

  mainDeckMonster = $("#main-deck").val();
  spellCard = $("#spell-card").val();
  trapCard = $("#trap-card").val();
  extraDeckMonster = $("#extra-deck").val();
  marketName = $("#market-choice option:selected").text();
  marketParameter = $("#market-choice").val();

  if(mainDeckMonster === null || spellCard === null || trapCard === null || extraDeckMonster === null) {
    alert("Please make a selection for all");
  }
  // Find a way to push a data for each option into one single array of promises;
  // Navigate array with back and forward button

  deckDatas.push(getCardData(mainDeckMonster));
  deckDatas.push(getCardData(spellCard));
  deckDatas.push(getCardData(trapCard));
  deckDatas.push(getCardData(extraDeckMonster));

  displayCard();

  $("#forward").on("click", (evt) => {
    console.log("forward click");
    if (currentCardIndex === deckDatas.length - 1) {
      currentCardIndex = -1;
    }
    currentCardIndex++;
    console.log(currentCardIndex);
    displayCard();
  })

  $("#back").on("click", (evt) => {
    console.log("back click");
    if(currentCardIndex === 0) {
      currentCardIndex = deckDatas.length;
    }
    currentCardIndex--;
    console.log(currentCardIndex);
    displayCard();
  })

  console.log(deckDatas, spellCard, trapCard, currentCardIndex);
});