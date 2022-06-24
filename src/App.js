import React from 'react';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from "socket.io-client";

import CreateRoomPage from './components/pages/create-room-page';
import GamePage from './components/pages/game-page';
import ContactPage from './components/pages/contact-page';
import AboutPage from './components/pages/about-page';
import DeckGalleryPage from './components/pages/deck-gallery-page';
import CardGalleryPage from './components/pages/card-gallery-page';

import Localization from './logic/localization';
import { serverUrl } from './logic/server-url';

const localization = new Localization();

const socket = io(serverUrl.replace('http', 'ws').replace('/api', ''));

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {language: localization.language};
  }

  forceRerender() {
    this.setState({language: localization.language});
  }

  render() {
    return (
      <Router>
        <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Routes>
            <Route path="/" element={<CreateRoomPage localization={localization} socket={socket} forceRerender={() => this.forceRerender()}/>} />
            <Route path="/gallery" element={<DeckGalleryPage localization={localization} socket={socket} forceRerender={() => this.forceRerender()}/>} />
            <Route path="/gallery/:id" element={<CardGalleryPage localization={localization} socket={socket} forceRerender={() => this.forceRerender()}/>} />
            <Route path="/about" element={<AboutPage localization={localization} socket={socket} forceRerender={() => this.forceRerender()}/>} />
            <Route path="/contact" element={<ContactPage localization={localization} socket={socket} forceRerender={() => this.forceRerender()}/>} />
            <Route path="/:id" element={<GamePage localization={localization} socket={socket} forceRerender={() => this.forceRerender()} />} />
          </Routes>
        </div>
      </Router>
    );
  }

}

export default App;
