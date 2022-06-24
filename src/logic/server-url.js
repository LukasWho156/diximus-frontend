const serverUrl = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:3000/api';
const frontendUrl = process.env.REACT_APP_FRONTEND_URL ?? 'http://localhost:8000';
const version = '0.2.1 (beta)'

export {serverUrl, frontendUrl, version};