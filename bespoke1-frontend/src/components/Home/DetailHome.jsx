import { useEffect, useState } from 'react';
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
          console.log('Fetching details for:', formattedCoinName);

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
      <div className="mt-10 flex justify-center items-center">
        <p className="text-center text-2xl font-semibold text-gray-500 animate-pulse shadow-2lg rounded-lg px-4 py-2 ">
          Please select a coin to reveal its mysteries! 💰✨
        </p>
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
            <p className='mb-4'>
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
