// Hier ggf alle relevanten Coin Daten fetchen und sie dann von hier aus importieren?
// src/components/details/CoinDetails.jsx
import React, { useState, useEffect } from "react";

const CoinDetails = ({ tokenId, renderContent }) => {
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
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenId}`
        );
        if (!response.ok)
          throw new Error(`Error fetching data for token ID: ${tokenId}`);

        const result = await response.json();

        setCoinData({
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
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [tokenId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Render only if coinData exists and has the necessary properties
  return coinData && renderContent ? renderContent(coinData) : null;
};

export default CoinDetails;
