import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from "socket.io-client";

import CreateRoomPage from './components/pages/create-room-page';
import GamePage from './components/pages/game-page';
import Localization from './logic/localization';
import serverUrl from './logic/server-url';

const localization = new Localization();

const socket = io(serverUrl.replace('http', 'ws'));

function App() {
  return (
    <Router>
      <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Routes>
          <Route path="/" element={<CreateRoomPage localization={localization} socket={socket} />} />
          <Route path="/:id" element={<GamePage localization={localization} socket={socket} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
