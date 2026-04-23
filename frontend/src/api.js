import axios from 'axios';

// Assuming Yii runs on port 8080 (php yii serve)
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;
