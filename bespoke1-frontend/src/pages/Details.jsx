import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import CoinDetails from '../components/details/CoinDetails';
import AiInfo from '../components/details/AiInfo';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const formatNumber = (number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const Details = () => {
  const { tokenId: paramTokenId } = useParams();
  const tokenId = paramTokenId || localStorage.getItem('selectedTokenId');
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
          renderContent={() => (
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

              {/* Current Price */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Current Price:</h3>
                <p>
                  EUR:{' '}
                  {formatNumber(coinData.market_data?.current_price?.eur) ||
                    'N/A'}
                </p>
                <p>
                  USD:{' '}
                  {formatNumber(coinData.market_data?.current_price?.usd) ||
                    'N/A'}
                </p>
              </div>

              {/* Price Trend Chart (24 Hours) */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>
                  Price Trend (24 Hours):
                </h3>
                <Line
                  data={{
                    labels: Array.from(
                      {
                        length:
                          coinData.market_data?.sparkline_7d?.price.length || 0,
                      },
                      (_, i) => `${i}:00`
                    ),
                    datasets: [
                      {
                        label: 'Price (USD)',
                        data: coinData.market_data?.sparkline_7d?.price || [],
                        fill: false,
                        borderColor: 'rgba(153,102,255,1)',
                        tension: 0.1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        title: { display: true, text: 'Time (24-hour format)' },
                      },
                      y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Price (USD)' },
                      },
                    },
                    plugins: { legend: { display: true, position: 'top' } },
                  }}
                />
              </div>

              {/* Price Trend Chart (30 Days) */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>
                  Price Trend (30 Days):
                </h3>
                <Line
                  data={{
                    labels: Array.isArray(
                      coinData.market_data
                        ?.price_change_percentage_30d_in_currency?.usd
                    )
                      ? coinData.market_data?.price_change_percentage_30d_in_currency?.usd.map(
                          (_, i) => `Day ${i + 1}`
                        )
                      : [],
                    datasets: [
                      {
                        label: 'Price (USD)',
                        data: Array.isArray(
                          coinData.market_data
                            ?.price_change_percentage_30d_in_currency?.usd
                        )
                          ? coinData.market_data
                              .price_change_percentage_30d_in_currency.usd
                          : [],
                        fill: false,
                        borderColor: 'rgba(255,159,64,1)',
                        tension: 0.1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      x: { title: { display: true, text: 'Date' } },
                      y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Price (USD)' },
                      },
                    },
                    plugins: { legend: { display: true, position: 'top' } },
                  }}
                />
              </div>

              {/* Market Cap */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Market Cap:</h3>
                <p>
                  EUR:{' '}
                  {formatNumber(coinData.market_data?.market_cap?.eur) || 'N/A'}
                </p>
                <p>
                  USD:{' '}
                  {formatNumber(coinData.market_data?.market_cap?.usd) || 'N/A'}
                </p>
              </div>

              {/* Market Cap Trend Chart */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>
                  Market Cap Trend (30 Days):
                </h3>
                <Line
                  data={{
                    labels: Array.from(
                      { length: 30 },
                      (_, i) => `Day ${i + 1}`
                    ),
                    datasets: [
                      {
                        label: 'Market Cap (USD)',
                        data: Array.isArray(
                          coinData.market_data
                            ?.market_cap_change_percentage_30d_in_currency?.usd
                        )
                          ? coinData.market_data
                              .market_cap_change_percentage_30d_in_currency.usd
                          : [],
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        tension: 0.1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: true, position: 'top' } },
                  }}
                />
              </div>

              {/* Liquidity */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Liquidity:</h3>
                <p>
                  EUR:{' '}
                  {formatNumber(coinData.market_data?.total_volume?.eur) ||
                    'N/A'}
                </p>
                <p>
                  USD:{' '}
                  {formatNumber(coinData.market_data?.total_volume?.usd) ||
                    'N/A'}
                </p>
              </div>

              {/* Holder Count */}
              <div className='p-4 rounded-lg shadow-xl'>
                <h3 className='text-lg font-semibold'>Holder Count:</h3>
                <p>{coinData.community_data?.facebook_likes || 'N/A'}</p>
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
