import cron from 'node-cron';
import axios from 'axios';

const BACKEND_URL = 'https://dff-server.onrender.com';

export const job = cron.schedule(
  '*/13 * * * *',
  async () => {
    try {
      const res = await axios.get(BACKEND_URL);
      console.log('ping 보내기 성공');
    } catch (error) {
      console.error('ping 보내기 실패');
    }
  },
  {
    scheduled: false
  }
);
