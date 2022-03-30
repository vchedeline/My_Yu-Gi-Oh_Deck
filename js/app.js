// GLOBAL
const spellCardType = "spell%20card"; 
const trapCardType  = "trap%20card";
let deckDatas, mainDeckMonster, extraDeckMonster, marketName, marketParameter, currentCardIndex,  deckTotalPrice, monsterRace;

// Finding a main deck card
const getCardData = (type, race) => {
  return $.ajax({
    url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset&type=${type}&race=${race}`,
  });
}

function displayCard() {
  
  $("#gif").css("display", "none");
  $(".arrows").css("display", "flex");

  deckDatas[currentCardIndex]
  .then((data) => {
    $("img").remove();
    $("p").remove();
    
    let cardType = data.data[0].type;
 
    const $img = $("<img id='card'>");
    
    $img.attr("src", data.data[0].card_images[0].image_url).attr("atl", data.name).appendTo(".card-slides");
    
    // displays card specs
    $(".card-info h1").text(data.data[0].name);
    
    $("<p>").text(`Type: ${data.data[0].type}`).appendTo("#details");
    
    $("<p>").text(`Race: ${data.data[0].race}`).appendTo("#details");

    if (cardType !== "Spell Card" && cardType !== "Trap Card") {
      
      $("<p>").text(`Attribute: ${data.data[0].attribute}`).appendTo("#details");
      
      $("<p>").text(`ATK: ${data.data[0].atk}`).appendTo("#details");
     
      if(cardType === "Link Monster") {
          $("<p>").text(`Link Val: ${data.data[0].linkval}`).appendTo("#details");
        }
      else {
        $("<p>").text(`DEF: ${data.data[0].def}`).appendTo("#details");
      
        $("<p>").text(`Level: ${data.data[0].level}`).appendTo("#details");
      }
    }

    $("<p>").text(`Price on ${marketName}: $${data.data[0].card_prices[0][marketParameter]}`).appendTo("#details");
    
    $("<p id='desc'>").text(data.data[0].desc).appendTo("#details");
  
  })
}

$("#submit-btn").on("click", (evt) => {
  evt.preventDefault();
  
  deckDatas = [];

  currentCardIndex = 0;

  mainDeckMonster = $("#main-deck").val();
  extraDeckMonster = $("#extra-deck").val();
  monsterRace = $("#race").val();
  marketName = $("#market-choice option:selected").text();
  marketParameter = $("#market-choice").val();

  spellCardRace = $("#spell-card").val();
  trapCardRace = $("#trap-card").val();

  if(mainDeckMonster === null || extraDeckMonster === null || monsterRace === null || spellCardRace === null || trapCardRace === null) {
    alert("Please make a selection for all");
    return 0;
  }
  // Find a way to push a data for each option into one single array of promises;
  // Navigate array with back and forward button

  deckDatas.push(getCardData(mainDeckMonster, monsterRace));
  deckDatas.push(getCardData(extraDeckMonster, monsterRace));
  deckDatas.push(getCardData(spellCardType, spellCardRace));
  deckDatas.push(getCardData(trapCardType, trapCardRace));

  displayCard();

  $("#forward").on("click", (evt) => {
    if (currentCardIndex === deckDatas.length - 1) {
      currentCardIndex = -1;
    }
    currentCardIndex++;
    displayCard();
  })

  $("#back").on("click", (evt) => {
    if(currentCardIndex === 0) {
      currentCardIndex = deckDatas.length;
    }
    currentCardIndex--;
    displayCard();
  })

});