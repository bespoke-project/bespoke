import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const TokenHome = ({ onSelectCoin }) => {
  const [coins, setCoins] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loadingCoins, setLoadingCoins] = useState(true);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        const shuffledCoins = response.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setCoins(shuffledCoins);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      } finally {
        setLoadingCoins(false);
      }
    };

    fetchCoins();
  }, [userData?.favorites]);

  if (!userData || !userData.favorites) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
      >
        <ClipLoader color='#4A90E2' size={50} />
      </div>
    );
  }

  return (
    <div className='mt-10'>
      <div className='card w-full md:w-96 shadow-2xl mx-auto'>
        <h1 className='text-center pt-10 font-extrabold text-xl'>
          Your collection
        </h1>

        {userData.favorites.length > 0 ? (
          userData.favorites.map((favorite, index) => (
            <div key={index} className='p-4 md:p-10'>
              <button
                className='btn btn-outline w-full md:w-72'
                onClick={() => onSelectCoin(favorite)}
              >
                {favorite.coinName || 'Unknown'}
              </button>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>No favorites available.</p>
        )}

        <div className='mt-10'>
          <h2 className='text-center font-bold text-lg'>Trending Now</h2>
          {loadingCoins ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <ClipLoader color='#4A90E2' size={50} />
            </div>
          ) : (
            coins.map((coin) => (
              <div
                key={coin.id}
                className='p-4 flex justify-between items-center'
              >
                <span className='font-semibold'>{coin.name}</span>
                <span className='text-sm text-gray-600'>
                  ${coin.current_price.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenHome;
