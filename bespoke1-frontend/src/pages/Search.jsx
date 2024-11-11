import React, { useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { TokenContext } from '../context/TokenContext';
import { useAuth } from '../context/AuthProvider';
import { ClipLoader } from 'react-spinners';

const Search = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setTokenId } = useContext(TokenContext);
  const { userData, setUserData, checkUser } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const fetchSuggestions = useCallback(
    debounce(async (input) => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${input}`
        );
        const data = await response.json();
        setSuggestions(data.coins.slice(0, 5));
        setError(null);
      } catch (error) {
        setError('Failed to fetch suggestions. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input.length > 0) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    setQuery(suggestion.name);
    setTokenId(suggestion.id);
    localStorage.setItem('selectedTokenId', suggestion.id);
    setSuggestions([]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${suggestion.id}`
      );
      const coinData = await response.json();
      setSelectedCoin({
        coinId: coinData.id,
        coinName: coinData.name,
        image: coinData.image?.large || '',
        description: coinData.description?.en || 'No description available.',
        blockchain: coinData.asset_platform_id || 'N/A',
        currentPriceEUR: coinData.market_data?.current_price?.eur || 'N/A',
        currentPriceUSD: coinData.market_data?.current_price?.usd || 'N/A',
        marketCapEUR: coinData.market_data?.market_cap?.eur || 'N/A',
        marketCapUSD: coinData.market_data?.market_cap?.usd || 'N/A',
        holderCount: coinData.holderCount || 'N/A',
        link: coinData.links?.homepage[0] || 'N/A',
        socialMedia: coinData.community_data?.twitter_followers || 'N/A',
      });
    } catch (error) {
      setError('Network Error, Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = async () => {
    if (!selectedCoin || !selectedCoin.coinId || !selectedCoin.coinName) {
      return;
    }

    const newFavorite = {
      coinId: selectedCoin.coinId,
      coinName: selectedCoin.coinName,
      image: selectedCoin.image,
      currentPrice: selectedCoin.currentPriceEUR,
    };

    const isAlreadyFavorite = userData.favorites.some(
      (favorite) => favorite.coinId === newFavorite.coinId
    );

    if (isAlreadyFavorite) {
      return;
    }

    const updatedFavorites = [...userData.favorites, newFavorite];

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/update`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ favorites: updatedFavorites }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }

      await checkUser();
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Error adding favorite coin:', error);
    }
  };

  return (
    <div className='min-h-screen p-4'>
      <div className='max-w-3xl mx-auto p-6'>
        <div className='flex items-center space-x-4 mb-6'>
          <input
            type='text'
            placeholder='Search for a token...'
            value={query}
            onChange={handleInputChange}
            className='input input-bordered w-full'
          />
        </div>
        {loading && (
          <div className='flex justify-center items-center'>
            <ClipLoader size={50} color='#fff' />
          </div>
        )}
        {error && <p className='text-red-500'>{error}</p>}
        {suggestions.length > 0 && (
          <div className='dropdown-content bg-base-100 shadow-lg rounded-box w-full p-4 mb-4'>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className='p-2 cursor-pointer hover:bg-gray-100 rounded-md'
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
        {selectedCoin && (
          <>
            {' '}
            <img
              src={selectedCoin.image}
              alt={selectedCoin.coinName}
              className='h-full w-32 object-cover rounded mx-auto mb-4'
            />
            <h2 className='text-center text-3xl font-semibold'>
              {selectedCoin.coinName}
            </h2>
            <div className='mt-8 p-4 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-4 rounded-lg shadow-inner'>
                <div className='space-y-2'>
                  <p>
                    <strong>Description:</strong>{' '}
                    {showFullDescription
                      ? selectedCoin.description
                      : `${selectedCoin.description.slice(0, 200)}...`}
                    {selectedCoin.description.length > 200 && (
                      <button
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                        className='text-blue-500 underline ml-2'
                      >
                        {showFullDescription ? 'Show Less' : 'More'}
                      </button>
                    )}
                  </p>
                  <p>
                    <strong>Social Media:</strong> Twitter Followers:{' '}
                    {selectedCoin.socialMedia}
                  </p>
                  <p>
                    <strong>Link:</strong>{' '}
                    <a
                      href={selectedCoin.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-400'
                    >
                      {selectedCoin.link}
                    </a>
                  </p>
                </div>
              </div>

              <div className='p-4 rounded-lg shadow-inner'>
                <div className='space-y-2'>
                  <p>
                    <strong>Token Name:</strong> {selectedCoin.coinName}
                  </p>
                  <p>
                    <strong>Blockchain:</strong> {selectedCoin.blockchain}
                  </p>
                  <p>
                    <strong>Price (EUR):</strong> {selectedCoin.currentPriceEUR}
                  </p>
                  <p>
                    <strong>Price (USD):</strong> {selectedCoin.currentPriceUSD}
                  </p>
                  <p>
                    <strong>Market Cap (EUR):</strong>{' '}
                    {selectedCoin.marketCapEUR}
                  </p>
                  <p>
                    <strong>Market Cap (USD):</strong>{' '}
                    {selectedCoin.marketCapUSD}
                  </p>
                </div>
              </div>

              <div className='col-span-2 text-center mt-6'>
                <button
                  className='btn btn-success w-full md:w-auto'
                  onClick={handleAddToFavorites}
                >
                  Add to Collection
                </button>
              </div>
            </div>
          </>
        )}
        {showNotification && (
          <div className='toast toast-center toast-success mt-4'>
            <div className='alert alert-success'>
              <span>Coin added to your collection!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
