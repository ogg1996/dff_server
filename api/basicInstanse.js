import axios from 'axios';

const basicInstance = axios.create({
  baseURL: 'https://api.neople.co.kr/df',
  headers: {
    'Content-Type': 'application/json' // 공통 헤더
  }
});

export default basicInstance;
