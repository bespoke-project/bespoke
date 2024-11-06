import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
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
import AiInfo from './AiInfo';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinDetails = ({
  tokenId,
  renderContent,
  showAiInfo = false,
  onCoinDataLoad,
}) => {
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tokenId) {
      setError('No token ID provided');
      setLoading(false);
      return;
    }

    const fetchCoinData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenId}`
        );
        if (!response.ok)
          throw new Error(`Error fetching data for token ID: ${tokenId}`);

        const result = await response.json();

        const marketDataResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=30`
        );
        const marketData = await marketDataResponse.json();

        const tokenData = {
          tokenId,
          tokenName: result.name || 'N/A',
          tokenAddress: result.contract_address || 'N/A',
          blockchain: result.asset_platform_id || 'N/A',
          image: result.image?.large || null,
          tokenDescription:
            result.description?.en || 'No description available',
          links: result.links.homepage
            ? [{ label: 'Homepage', url: result.links.homepage[0] }]
            : [],
          marketCap: {
            eur: result.market_data?.market_cap?.eur ?? 'N/A',
            usd: result.market_data?.market_cap?.usd ?? 'N/A',
          },
          price: {
            eur: result.market_data?.current_price?.eur ?? 'N/A',
            usd: result.market_data?.current_price?.usd ?? 'N/A',
          },
          prices: marketData.prices.map((item) => ({
            date: new Date(item[0]).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
            price: item[1],
          })),
          priceTrend24h: marketData.prices.slice(-24).map((item) => item[1]),
          marketCapTrend: marketData.market_caps.map((item) => item[1]),
          socialMedia: [
            {
              platform: 'Twitter Followers',
              value: result.community_data?.twitter_followers || 'N/A',
            },
            {
              platform: 'Reddit Subscribers',
              value: result.community_data?.reddit_subscribers || 'N/A',
            },
          ].filter((social) => social.value !== 'N/A'),
        };

        setCoinData(tokenData);

        if (onCoinDataLoad) onCoinDataLoad(tokenData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [tokenId, onCoinDataLoad]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className='text-red-500'>Error: {error}</div>;

  return (
    <div>
      {coinData && (
        <div>
          {/* Render image and description */}
          <div className='flex justify-center mb-4'>
            <img
              src={coinData.image}
              alt={`${coinData.tokenName} logo`}
              className='h-20 w-20 object-cover rounded'
            />
          </div>
          <div className='max-h-32 overflow-y-auto mb-4'>
            <p>
              <strong>Description:</strong> {coinData.tokenDescription}
            </p>
          </div>

          {/* Price Trend Chart (30 Days) */}
          <div className='p-4 rounded-lg shadow-xl'>
            <h3 className='text-lg font-semibold'>Price Trend (30 Days):</h3>
            <Line
              data={{
                labels: coinData.prices.map((item) => item.date),
                datasets: [
                  {
                    label: 'Price (USD)',
                    data: coinData.prices.map((item) => item.price),
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: { title: { display: true, text: 'Date' } },
                  y: {
                    beginAtZero: false,
                    title: { display: true, text: 'Price (USD)' },
                  },
                },
                plugins: { legend: { display: true, position: 'top' } },
              }}
            />
          </div>

          {/* 24-Hour Price Trend */}
          <div className='p-4 rounded-lg shadow-xl mt-6'>
            <h3 className='text-lg font-semibold'>Price Trend (24 Hours):</h3>
            <Line
              data={{
                labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                datasets: [
                  {
                    label: 'Price (USD)',
                    data: coinData.priceTrend24h,
                    fill: false,
                    borderColor: 'rgba(255,99,132,1)',
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: {
                    title: { display: true, text: 'Hour (24-Hour Format)' },
                  },
                  y: {
                    beginAtZero: false,
                    title: { display: true, text: 'Price (USD)' },
                  },
                },
                plugins: { legend: { display: true, position: 'top' } },
              }}
            />
          </div>

          {/* Market Cap Trend (30 Days) */}
          <div className='p-4 rounded-lg shadow-xl mt-6'>
            <h3 className='text-lg font-semibold'>
              Market Cap Trend (30 Days):
            </h3>
            <Line
              data={{
                labels: coinData.prices.map((item) => item.date),
                datasets: [
                  {
                    label: 'Market Cap (USD)',
                    data: coinData.marketCapTrend,
                    fill: false,
                    borderColor: 'rgba(54,162,235,1)',
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: { title: { display: true, text: 'Date' } },
                  y: {
                    beginAtZero: false,
                    title: { display: true, text: 'Market Cap (USD)' },
                  },
                },
                plugins: { legend: { display: true, position: 'top' } },
              }}
            />
          </div>

          {/* Social Media Links */}
          <h4 className='font-semibold mt-4'>Social Media</h4>
          <ul className='list-disc list-inside'>
            {coinData.socialMedia.map((social, index) => (
              <li key={index}>
                {social.platform}: {social.value}
              </li>
            ))}
          </ul>

          {/* AI Feedback if enabled */}
          {showAiInfo && coinData.tokenAddress !== 'N/A' && (
            <div className='p-4 rounded-lg shadow-xl mt-6'>
              <h3 className='text-lg font-semibold'>AI Feedback:</h3>
              <AiInfo
                tokenAddress={coinData.tokenAddress}
                tokenName={coinData.tokenName}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoinDetails;
