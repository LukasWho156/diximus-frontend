/**
 * Shared logic between components
 * 
 * @namespace logic
 */

/**
 * Components used by this app
 * 
 * @namespace components
 */

/**
 * Components that are full pages
 * 
 * @namespace components.pages
 */

/**
 * Components that are shared between different pages
 * 
 * @namespace components.shared
 */

/**
 * An object containing player information
 * @typedef Player
 * @property {string} name the player's nickname
 * @property {string} id the player's id
 * @property {object} avatar contains configuration information about the player's avatar
 * @property {number} avatar.eyes the index of the player's eyes
 * @property {number} avatar.hair the index of the player's hair
 * @property {number} avatar.accessory the index of the player's accessory
 * @property {number} avatar.color the index of the player's color
 * @property {object} score contains information about the player's score
 * @property {number} score.total total score
 * @property {number} score.thisTurn the amount of points awarded to the player this turn
 * @property {number} score.throughGoodCards the amount of points awarded to the player because other people guessed their cards
 * @property {number} score.throughGoodHints the amount of points awarded to the player because they described their card "well"
 * @property {number} score.throughGoodGuesses the amount of points awarded to the player because they guessed the correct card
 * @property {boolean} admin true if the player started the game
 * @property {boolean} active true if the player is currently the round leader
 * @property {boolean} pending true if the player is currently expected to do something
 * @property {boolean} disconnected true if the websocket connection disconnected
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
