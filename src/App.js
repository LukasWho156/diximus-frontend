import React from 'react';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from "socket.io-client";

import CreateRoomPage from './components/pages/create-room-page';
import GamePage from './components/pages/game-page';
import ContactPage from './components/pages/contact-page';
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
        <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Routes>
            <Route path="/" element={<CreateRoomPage localization={localization} socket={socket} forceRerender={() => this.forceRerender()}/>} />
            <Route path="/contact" element={<ContactPage localization={localization} socket={socket} forceRerender={() => this.forceRerender()}/>} />
            <Route path="/:id" element={<GamePage localization={localization} socket={socket} forceRerender={() => this.forceRerender()} />} />
          </Routes>
        </div>
      </Router>
    );
  }

}

export default App;
