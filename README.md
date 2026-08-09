# color-selector

## Installation

npm install

## Running the Microservice

npm start

The microservice runs on:
http://localhost:5558

## Endpoints

GET /colors
Returns all available dashboard colors.

GET /dashboard/color
Returns the currently selected dashboard color.

PUT /dashboard/color
Changes the selected dashboard color.

Request body:
{
    "color": "purple"
}

GET /rarity/:rarity
Returns the color associated with an item rarity.

Example:
GET /rarity/rare

Response:
{
    "rarity": "rare",
    "color": "blue"
}

## Testing

Start the server:

npm start

Then in another terminal:

npm test