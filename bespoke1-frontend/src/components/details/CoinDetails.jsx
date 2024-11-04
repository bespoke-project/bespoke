import React, { useState, useEffect } from "react";
import AiInfo from "./AiInfo";

const CoinDetails = ({ tokenId, renderContent, showAiInfo = false }) => {
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

        const tokenData = {
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
        };

        console.log("Fetched tokenData:", tokenData);

        setCoinData(tokenData);
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

  return (
    <div>
      {coinData && renderContent(coinData)}
      {showAiInfo && coinData.tokenAddress !== "N/A" && (
        <div className="p-4 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold">AI Feedback:</h3>
          <AiInfo
            tokenAddress={coinData.tokenAddress}
            tokenName={coinData.tokenName} // Übergabe von tokenName an AiInfo.jsx
          />
        </div>
      )}
    </div>
  );
};

export default CoinDetails;
