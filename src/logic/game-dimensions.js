/**
 * Normed game dimensions in pixels, used by some components to do calculations.
 * 
 * @const
 * @property gameDimensions.screenWidth The normed width of the viewport. Identical to the table width.
 * @property gameDimensions.screenheight The normed height of the viewport.
 * @property gameDimensions.tableHeight The normed height of the playing table.
 * @property gameDimensions.cardWidth The normed width of a playing card.
 * @property gameDimensions.cardheight The normed height of a playing card.
 * 
 * @memberof logic
 */

const gameDimensions = {
    screenWidth: 1366,
    screenHeight: 768,
    tableHeight: 1366,
    cardWidth: 820, // note: these dimensions must be large or Firefox will display blurry pictures when scaled up
    cardHeight: 1220,
}

export default gameDimensions;