import React, { useState, useEffect } from "react";
import AiInfo from "./AiInfo";

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
      setError("No token ID provided");
      setLoading(false);
      return;
    }

    const fetchCoinData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch main coin data
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenId}`
        );
        if (!response.ok)
          throw new Error(`Error fetching data for token ID: ${tokenId}`);

        const result = await response.json();

        // Fetch historical market data for 30 days
        const marketDataResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=30`
        );
        const marketData = await marketDataResponse.json();

        const tokenData = {
          tokenId,
          tokenName: result.name || "N/A",
          tokenAddress: result.contract_address || "N/A",
          blockchain: result.asset_platform_id || "N/A",
          image: result.image?.large || null,
          tokenDescription:
            result.description?.en || "No description available",
          links: result.links.homepage
            ? [{ label: "Homepage", url: result.links.homepage[0] }]
            : [],
          marketCap: {
            eur: result.market_data?.market_cap?.eur ?? "N/A",
            usd: result.market_data?.market_cap?.usd ?? "N/A",
          },
          price: {
            eur: result.market_data?.current_price?.eur ?? "N/A",
            usd: result.market_data?.current_price?.usd ?? "N/A",
          },
          liquidity: {
            eur: result.market_data?.total_volume?.eur ?? "N/A",
            usd: result.market_data?.total_volume?.usd ?? "N/A",
          },
          holderCount: result.community_data?.twitter_followers || "N/A",
          volume: {
            buys: {
              eur: result.market_data?.total_volume?.eur ?? "N/A",
              usd: result.market_data?.total_volume?.usd ?? "N/A",
            },
            sells: {
              eur: result.market_data?.total_volume?.eur ?? "N/A",
              usd: result.market_data?.total_volume?.usd ?? "N/A",
            },
          },
          socialMedia: [
            {
              platform: "Twitter Followers",
              value: result.community_data?.twitter_followers || "N/A",
            },
            {
              platform: "Reddit Subscribers",
              value: result.community_data?.reddit_subscribers || "N/A",
            },
          ].filter((social) => social.value !== "N/A"),

          // New fields based on historical data for trends
          marketCapTrend: {
            usd: marketData.market_caps.map((item) => item[1]) || "N/A",
          },
          priceTrend24h: {
            usd: marketData.prices.slice(-24).map((item) => item[1]) || "N/A",
          },
          priceTrend30d: {
            usd: marketData.prices.map((item) => item[1]) || "N/A",
            dates: marketData.prices.map((item) =>
              new Date(item[0]).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            ),
          },
        };

        setCoinData(tokenData);

        // Call onCoinDataLoad only once when data is loaded
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
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      {coinData && typeof renderContent === "function" ? (
        renderContent(coinData)
      ) : (
        <div>
          {/* Standardanzeige, falls renderContent nicht übergeben wird */}
          <div className="flex justify-center mb-4">
            <img
              src={coinData.image}
              alt={`${coinData.tokenName} logo`}
              className="h-20 w-20 object-cover rounded"
            />
          </div>
          <div className="max-h-32 overflow-y-auto mb-4">
            <p>
              <strong>Description:</strong> {coinData.tokenDescription}
            </p>
          </div>
          <h4 className="font-semibold mt-4">Social Media</h4>
          <ul className="list-disc list-inside">
            {coinData.socialMedia.map((social, index) => (
              <li key={index}>
                {social.platform}: {social.value}
              </li>
            ))}
          </ul>
          <h4 className="font-semibold mt-4">Links</h4>
          <ul className="list-disc list-inside">
            {coinData.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {showAiInfo && coinData.tokenAddress !== "N/A" && (
            <div className="p-4 rounded-lg shadow-xl">
              <h3 className="text-lg font-semibold">AI Feedback:</h3>
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
