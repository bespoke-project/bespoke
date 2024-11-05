import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailHome = ({ coin }) => {
  const navigate = useNavigate();
  const [coinDetails, setCoinDetails] = useState(null);

  useEffect(() => {
    if (coin && coin.coinName) {
      const fetchCoinDetails = async () => {
        try {
          const formattedCoinName = coin.coinName
            .toLowerCase()
            .replace(/\s+/g, '-');
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${formattedCoinName}`
          );
          const data = await response.json();
          setCoinDetails(data);
        } catch (error) {
          console.error('Error fetching coin details:', error);
        }
      };

      fetchCoinDetails();
    }
  }, [coin]);

  const handleMoreClick = () => {
    if (coin && coin.coinName) {
      const formattedCoinName = coin.coinName
        .toLowerCase()
        .replace(/\s+/g, '-');
      navigate(`/details/${formattedCoinName}`);
    }
  };

  if (!coin) {
    return (
      <div className='mt-10'>
        <p className='text-center'>Select a coin to see its details.</p>
      </div>
    );
  }

  return (
    <div className='mt-10'>
      <div className='card w-full md:w-11/12 shadow-2xl mx-auto md:m-12'>
        <h1 className='text-center pt-10 font-extrabold text-xl'>
          {coin.coinName} Details
        </h1>

        <div className='p-4 md:p-10 flex flex-col items-center'>
          <img
            src={coin.image}
            alt={`${coin.coinName} logo`}
            className='h-20 w-20 object-cover rounded mb-4'
          />

          {coinDetails ? (
            <p className='text-center mb-4'>
              {coinDetails.description?.en || 'No description available.'}
            </p>
          ) : (
            <p className='text-center mb-4'>Loading description...</p>
          )}
        </div>

        <div className='p-4 md:p-10'>
          <button
            className='btn btn-outline w-full md:w-72'
            onClick={handleMoreClick}
          >
            More
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailHome;
