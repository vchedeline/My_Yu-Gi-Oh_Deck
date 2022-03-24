My Yu-Gi-Ooooh Deck
====================

### Getting Started
:star: [My Website][myWebsite] :star:

Ever dreamed on being of having your own Yu-Gi-Oh deck? Now you can! Get your cards virtually and plan out your deck using the information provided for each card, including the total amount to spend in real life!

#### API used 
Website: _[Yu-Gi-Oh!][apiWebsite]_

API endpoint - Random: https://db.ygoprodeck.com/api/v7/randomcard.php

### Parameters

###### Random: none

### Features
>:warning: **This is not an exhausted list**
>> *Results may vary for each card*
+ **id**: *num*
+ **name**: *string*
+ **base**: *string*
+ **type**: *string*
+ **desc**: *string of card description*
+ **atk**: *num*
+ **def**: *num*
+ **level**: *num*
+ **race**: *string*
+ **attribute**: *string*
+ **archetype**: *string*
+ **card_sets**: [set_name, set_code, set_rarity, set_price]
+ **card_image**: [image_url, image_url_small]
+ **card_prices**: [cardmarket_price, tcgplayer_price, ebay_price, amazon_price]

### User Stories
- [ ] Click on button to generate deck of 5 yu-gi-oh cards
- [ ] Click through to see each card and their info
  - displays name, type, description, race, attribute,and price
- [ ] Click on which market to display total price of deck
> Bonus User Stories
> + TBD

### Wireframes

## Technologies Used
+ **Javascript**
+ **HTML**
+ **CSS**

### Stretch Goals/Future Goals
- Allow user to make more than one deck and choose where the card will go.

[apiWebsite]: https://db.ygoprodeck.com/api-guide/
[myWebsite]: link