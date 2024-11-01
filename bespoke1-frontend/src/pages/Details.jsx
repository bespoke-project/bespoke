// src/pages/Details.jsx
import React from "react";
import CoinDetails from "../components/details/CoinDetails";

const Details = () => {
  const tokenId = localStorage.getItem("selectedTokenId"); // tokenId aus LocalStorage lesen

  if (!tokenId) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-2xl mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Detailed Token Information
          </h2>
          <p className="text-center text-red-500">
            Error: No token ID provided
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-2xl mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Detailed Token Information
        </h2>

        <CoinDetails
          tokenId={tokenId}
          renderContent={(data) => (
            <div className="space-y-6">
              {/* Token Name */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Token Name:</h3>
                <p>{data.tokenName || "N/A"}</p>
              </div>

              {/* CA/Token Address */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">CA/Token Address:</h3>
                <p>{data.tokenAddress || "N/A"}</p>
              </div>

              {/* Blockchain */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Blockchain:</h3>
                <p>{data.blockchain || "N/A"}</p>
              </div>

              {/* Image */}
              <div className="p-4 rounded-lg shadow-xl flex justify-center">
                <img
                  src={data.image}
                  alt={`${data.tokenName} logo`}
                  className="h-20 w-20 object-cover rounded"
                />
              </div>

              {/* Token Description */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Token Description:</h3>
                <p>{data.tokenDescription || "No description available"}</p>
              </div>

              {/* Links */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Links:</h3>
                <ul className="list-disc list-inside">
                  {data.links.map((link, index) => (
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
              </div>

              {/* Market Cap */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Market Cap:</h3>
                <p>EUR: {data.marketCap?.eur || "N/A"}</p>
                <p>USD: {data.marketCap?.usd || "N/A"}</p>
              </div>

              {/* Market Cap Verlauf */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">
                  Market Cap Verlauf (30 Tage):
                </h3>
                <p>EUR: {data.marketCapTrend?.eur.join(", ") || "N/A"}</p>
                <p>USD: {data.marketCapTrend?.usd.join(", ") || "N/A"}</p>
              </div>

              {/* Liquidity */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Liquidity:</h3>
                <p>EUR: {data.liquidity?.eur || "N/A"}</p>
                <p>USD: {data.liquidity?.usd || "N/A"}</p>
              </div>

              {/* Holder Count */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Holder Count:</h3>
                <p>{data.holderCount || "N/A"}</p>
              </div>

              {/* Handelsvolumen */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">
                  Handelsvolumen (7 Tage):
                </h3>
                <p>Käufe (EUR): {data.volume?.buys?.eur || "N/A"}</p>
                <p>Käufe (USD): {data.volume?.buys?.usd || "N/A"}</p>
                <p>Verkäufe (EUR): {data.volume?.sells?.eur || "N/A"}</p>
                <p>Verkäufe (USD): {data.volume?.sells?.usd || "N/A"}</p>
              </div>

              {/* Aktueller Preis */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Aktueller Preis:</h3>
                <p>EUR: {data.price?.eur || "N/A"}</p>
                <p>USD: {data.price?.usd || "N/A"}</p>
              </div>

              {/* Preisverlauf */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">
                  Preisverlauf (24 Stunden):
                </h3>
                <p>EUR: {data.priceTrend24h?.eur.join(", ") || "N/A"}</p>
                <p>USD: {data.priceTrend24h?.usd.join(", ") || "N/A"}</p>
              </div>
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">
                  Preisverlauf (30 Tage):
                </h3>
                <p>EUR: {data.priceTrend30d?.eur.join(", ") || "N/A"}</p>
                <p>USD: {data.priceTrend30d?.usd.join(", ") || "N/A"}</p>
              </div>

              {/* Social Media Information */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">
                  Social Media Information:
                </h3>
                <ul className="list-disc list-inside">
                  {data.socialMedia.map((social, index) => (
                    <li key={index}>
                      {social.platform}: {social.value}
                    </li>
                  ))}
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
