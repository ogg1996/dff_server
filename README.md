# 🎮 DFFriends [서버] (배포중지)
> **나와 친구들의 던전앤파이터 아이템 획득 타임로그 API**

<br>

## 📌 프로젝트 소개
이 프로젝트는 🖥️ **[dff-front](https://github.com/ogg1996/dff_front)** 웹 서비스의 백엔드 API 서버입니다.  

<br>

## 🛠 사용 기술
### 📌 Core
- Node.js
- Express.js

### 🧰 Utils / Infra
- axios
- dotenv
- cors
- p-limit
- lodash
- moment-timezone
- fs

<br>

## 🚀 API
[Neople Open API](https://developers.neople.co.kr)를 활용하여 `useData.json`에 등록된 유저 정보를 기반으로, 
해당 유저의 캐릭터들에 대한 **아이템 획득 타임로그**를 조회합니다.

✅ **예제 요청**
``` http
GET /timeline?user=<user>
```

``` json
[
  {
    "userServer": "cain",
    "characterId": "5188a06e1f2b14485474af458dd50758",
    "characterName": "유키유설#키",
    "code": 505,
    "name": "아이템 획득(던전 드랍)",
    "date": "2025-12-15 10:20",
    "data": {
      "itemId": "afe10e6cb0205ac778f595ce64db6f1b",
      "itemName": "오버클럭 하트",
      "itemRarity": "레전더리",
      "channelName": "바하이트",
      "channelNo": 4,
      "dungeonName": "종말의 숭배자",
      "mistGear": false
    }
  },
  ...
]
```

<br>

## ⚠️ 참고 사항
이 프로젝트는 개인 취미용으로 제작되었으며, 별도의 로컬 실행 방법이나 배포 안내는 제공하지 않습니다.
