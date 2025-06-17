import basicInstance from './basicInstanse.js';

const getTimeLineApi = async (
  apikey,
  serverName,
  characterId,
  code
) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const curDay = now.getDay();

  let lastThursday = new Date(now);

  switch (curDay) {
    case 0:
      lastThursday.setDate(now.getDate() - 3);
      break;
    case 1:
      lastThursday.setDate(now.getDate() - 4);
      break;
    case 2:
      lastThursday.setDate(now.getDate() - 5);
      break;
    case 3:
      lastThursday.setDate(now.getDate() - 6);
      break;
    case 4:
      lastThursday.setDate(now.getDate());
      break;
    case 5:
      lastThursday.setDate(now.getDate() - 1);
      break;
    case 6:
      lastThursday.setDate(now.getDate() - 2);
      break;
  }

  const lastThursdayYear = lastThursday.getFullYear();
  const lastThursdayMonth = lastThursday.getMonth() + 1;
  const lastThursdayDate = lastThursday.getDate();

  const response = await basicInstance.get(
    `/servers/${serverName}/characters/${characterId}/timeline`,
    {
      params: {
        apikey,
        limit: 100,
        code,
        startDate:
          `${lastThursdayYear}` +
          `${
            lastThursdayMonth < 10
              ? `0${lastThursdayMonth}`
              : lastThursdayMonth
          }` +
          `${
            lastThursdayDate < 10
              ? `0${lastThursdayDate}`
              : lastThursdayDate
          }T1000`,
        endDate:
          `${year}` +
          `${month < 10 ? `0${month}` : month}` +
          `${date < 10 ? `0${date}` : date}` +
          `T${hours < 10 ? `0${hours}` : hours}` +
          `${minutes < 10 ? `0${minutes}` : minutes}`
      }
    }
  );

  return response.data;
};

export default getTimeLineApi;
