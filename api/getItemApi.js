import basicInstance from './basicInstanse.js';

const getItemApi = async (apikey, itemName) => {
  const response = await basicInstance.get(`/items`, {
    params: {
      apikey,
      itemName
    }
  });

  return response.data;
};

export default getItemApi;
