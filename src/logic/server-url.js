/**
 * The URL where http requests should be sent to. Should be saved in an envrionment variable
 * called `REACT_APP_SERVER_URL`. Defaults to `'http://localhost:3000/api'`
 * 
 * @const
 * @type string
 * @memberof logic
 */
const serverUrl = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:3000/api';
/**
 * The base URL where the frontend can be found, used to display the link to the game. Should
 * be saved in an environment variable called `REACT_APP_FRONTEND_URL`. Defaults to 
 * `'http://localhost:8000'`
 * 
 * @const
 * @type string
 * @memberof logic
 */
const frontendUrl = process.env.REACT_APP_FRONTEND_URL ?? 'http://localhost:8000';
/**
 * The version number displayed on the about page.
 * 
 * @const
 * @type string
 * @memberof logic
 */
const version = '0.3.0 (beta)'

export {serverUrl, frontendUrl, version};