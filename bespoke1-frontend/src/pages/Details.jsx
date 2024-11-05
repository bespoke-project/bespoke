import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinDetails from '../components/details/CoinDetails';
import AiInfo from '../components/details/AiInfo';

const Details = () => {
  const { tokenId } = useParams(); // Get tokenId from route params
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    if (tokenId) {
      const fetchCoinDetails = async () => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${tokenId}`
          );
          const data = await response.json();
          setCoinData(data);
        } catch (error) {
          console.error('Error fetching coin details:', error);
        }
      };
      fetchCoinDetails();
    }
  }, [tokenId]);

  if (!coinData) {
    return (
      <div className='min-h-screen p-4'>
        <div className='max-w-3xl mx-auto p-6 rounded-lg shadow-2xl mt-8'>
          <h2 className='text-2xl font-bold text-center mb-6'>
            Detailed Token Information
          </h2>
          <p className='text-center text-red-500'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-4'>
      <div className='max-w-3xl mx-auto p-6 rounded-lg shadow-2xl mt-8'>
        <h2 className='text-2xl font-bold text-center mb-6'>
          Detailed Token Information
        </h2>

        <CoinDetails
          tokenId={coinData.id}
          showAiInfo={false}
          renderContent={(data) => (
            <div className='space-y-6'>
              {/* Token Name */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Token Name:</h3>
                <p>{coinData.name || 'N/A'}</p>
              </div>

              {/* CA/Token Address */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>CA/Token Address:</h3>
                <p>{coinData.contract_address || 'N/A'}</p>
              </div>

              {/* Blockchain */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Blockchain:</h3>
                <p>{coinData.asset_platform_id || 'N/A'}</p>
              </div>

              {/* Image */}
              <div className='p-4 rounded-lg shadow-xl flex justify-center'>
                <img
                  src={coinData.image?.large}
                  alt={`${coinData.name} logo`}
                  className='h-20 w-20 object-cover rounded'
                />
              </div>

              {/* Token Description */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Token Description:</h3>
                <p>{coinData.description?.en || 'No description available'}</p>
              </div>

              {/* AI Feedback */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>AI Feedback:</h3>
                <AiInfo tokenAddress={coinData.contract_address} />
              </div>

              {/* Links */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Links:</h3>
                <ul className='list-disc list-inside'>
                  {coinData.links?.homepage.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-400'
                      >
                        {link}
                      </a>
                    </li>
                  )) || <li>No links available</li>}
                </ul>
              </div>

              {/* Market Cap */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Market Cap:</h3>
                <p>EUR: {coinData.market_data?.market_cap?.eur || 'N/A'}</p>
                <p>USD: {coinData.market_data?.market_cap?.usd || 'N/A'}</p>
              </div>

              {/* Market Cap Trend */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>
                  Market Cap Trend (30 Days):
                </h3>
                <p>
                  EUR:{' '}
                  {coinData.market_data
                    ?.market_cap_change_percentage_30d_in_currency?.eur ||
                    'N/A'}
                  %
                </p>
                <p>
                  USD:{' '}
                  {coinData.market_data
                    ?.market_cap_change_percentage_30d_in_currency?.usd ||
                    'N/A'}
                  %
                </p>
              </div>

              {/* Liquidity */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Liquidity:</h3>
                <p>EUR: {coinData.market_data?.total_volume?.eur || 'N/A'}</p>
                <p>USD: {coinData.market_data?.total_volume?.usd || 'N/A'}</p>
              </div>

              {/* Holder Count */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Holder Count:</h3>
                <p>{coinData.community_data?.facebook_likes || 'N/A'}</p>
              </div>

              {/* Trading Volume */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>
                  Trading Volume (24 Hours):
                </h3>
                <p>EUR: {coinData.market_data?.total_volume?.eur || 'N/A'}</p>
                <p>USD: {coinData.market_data?.total_volume?.usd || 'N/A'}</p>
              </div>

              {/* Current Price */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Current Price:</h3>
                <p>EUR: {coinData.market_data?.current_price?.eur || 'N/A'}</p>
                <p>USD: {coinData.market_data?.current_price?.usd || 'N/A'}</p>
              </div>

              {/* Price Trend */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>
                  Price Trend (24 Hours):
                </h3>
                <p>
                  Change EUR:{' '}
                  {coinData.market_data?.price_change_percentage_24h_in_currency
                    ?.eur || 'N/A'}
                  %
                </p>
                <p>
                  Change USD:{' '}
                  {coinData.market_data?.price_change_percentage_24h_in_currency
                    ?.usd || 'N/A'}
                  %
                </p>
              </div>

              {/* Price Trend (30 Days) */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>
                  Price Trend (30 Days):
                </h3>
                <p>
                  Change EUR:{' '}
                  {coinData.market_data?.price_change_percentage_30d_in_currency
                    ?.eur || 'N/A'}
                  %
                </p>
                <p>
                  Change USD:{' '}
                  {coinData.market_data?.price_change_percentage_30d_in_currency
                    ?.usd || 'N/A'}
                  %
                </p>
              </div>

              {/* Social Media Information */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>
                  Social Media Information:
                </h3>
                <ul className='list-disc list-inside'>
                  {coinData.links?.subreddit_url ? (
                    <li>
                      Subreddit:{' '}
                      <a
                        href={coinData.links.subreddit_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-400'
                      >
                        Reddit
                      </a>
                    </li>
                  ) : (
                    <li>No social media links available</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Details;
