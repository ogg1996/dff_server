import basicInstance from './basicInstanse.js';

const getIdApi = async (apikey, serverName, characterName) => {
  const response = await basicInstance.get(
    `/servers/${serverName}/characters`,
    {
      params: {
        apikey,
        characterName
      }
    }
  );

  return response.data;
};

export default getIdApi;
