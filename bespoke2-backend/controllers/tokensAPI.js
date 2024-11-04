import axios from "axios";

export const getTokensList = async (req, res,next) => {
    try {
        // API A, Liste
        const responseA = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const tokensList = responseA.data;
        res.json(tokensList);
       
    } catch (error) {
      //  res.status(500).json({ error: 'Failed to fetch data' });
      next(error);
    }
}