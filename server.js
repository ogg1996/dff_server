import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import lodash from 'lodash';
import pLimit from 'p-limit';

import usersData from './usersData.js';
import getIdApi from './api/getIdApi.js';
import getTimeLineApi from './api/getTimeLineApi.js';
import getItemApi from './api/getItemApi.js';

const allowedOrigins = [
  'http://localhost:5173',
  'https://dffriends.netlify.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const app = express();

app.use(cors(corsOptions));

app.get('/', function (req, res) {
  res.send('DFF Server');
});

// 유저의 아이템 득템 정보를 가져오는 API
app.get('/timeline', async function (req, res) {
  const user = req.query.user;

  const userData = usersData[user];

  const characterIds = await fetchCharacterIds(userData);
  const timeLines = await fetchTimeLines(
    userData.server,
    characterIds
  );

  const limit = pLimit(2);

  const results = await Promise.all(
    timeLines.map(item =>
      limit(async () => {
        if (Number(item.code) === 504) {
          const itemInfo = await getItem(item.data.itemName);
          if (
            Number(itemInfo.itemAvailableLevel) !== 115 ||
            itemInfo.itemType === '융합석'
          )
            return null;
        } else if (Number(item.code) === 505) {
          if (
            item.data.dungeonName === '폭풍의 역린 (주간)' ||
            item.data.channelName === '이스핀즈'
          )
            return null;
        } else if (Number(item.code) === 507) {
          const itemInfo = await getItem(item.data.itemName);
          if (Number(itemInfo.itemAvailableLevel) !== 115)
            return null;
        } else if (Number(item.code) === 513) {
          if (
            item.data.dungeonName === '아스라한 기록실' ||
            item.data.dungeonName === '용의 정원' ||
            item.data.dungeonName === '배신자의 저택'
          )
            return null;
        }
        return item;
      })
    )
  );

  const filterdTimeLines = results.filter(item => item !== null);

  const sortTimeLine = lodash.orderBy(
    filterdTimeLines,
    ['date'],
    ['desc']
  );

  res.json(sortTimeLine);
});

// 유저의 캐릭터들의 고유 아이디를 가져오는 로직
async function fetchCharacterIds(userData) {
  const charactersIds = [];

  for (const characterName of userData.characters) {
    const res = await getIdApi(
      process.env.API_KEY,
      userData.server,
      characterName
    );
    charactersIds.push(res.rows[0].characterId);
  }

  return charactersIds;
}

// 유저의 아이템 득템 타임라인을 가져오는 로직
async function fetchTimeLines(userServer, characterIds) {
  // 항아리, 드랍, 레이드카드, 던전카드
  const codes = ['504,505', '507,513'];
  const timeLines = [];

  for (const code of codes) {
    for (const characterId of characterIds) {
      const res = await getTimeLineApi(
        process.env.API_KEY,
        userServer,
        characterId,
        code
      );

      for (const timeline of res.timeline.rows) {
        timeLines.push({
          userServer,
          characterId,
          characterName: res.characterName,
          ...timeline
        });
      }
    }
  }

  return timeLines;
}

async function getItem(itemName) {
  const res = await getItemApi(process.env.API_KEY, itemName);

  return res.rows[0];
}

app.listen(8080, () => {
  console.log('Server is running port:8080');
});
