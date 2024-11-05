import React, { useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import CoinDetails from "../components/details/CoinDetails";
import { TokenContext } from "../context/TokenContext";
import AiInfo from "../components/details/AiInfo";
import { useAuth } from "../context/authProvider";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const { setTokenId } = useContext(TokenContext);
  const { userData, setUserData } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [currentCoin, setCurrentCoin] = useState(null); // Store the current coin data

  const fetchSuggestions = useCallback(
    debounce(async (input) => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${input}`
        );
        const data = await response.json();
        setSuggestions(data.coins.slice(0, 5));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
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

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion.name);
    setTokenId(suggestion.id);
    localStorage.setItem("selectedTokenId", suggestion.id);
    setSuggestions([]);
    setShowDetails(false);
  };

  const handleSearch = () => {
    if (localStorage.getItem("selectedTokenId")) {
      setShowDetails(true);
    } else {
      alert("Please select a valid token from the suggestions.");
    }
  };

  const handleAddToFavorites = async () => {
    if (!currentCoin) return; // Ensure we have the actual data

    const newFavorite = {
      coinId: currentCoin.id,
      coinName: currentCoin.name,
      image: currentCoin.image,
      currentPrice: currentCoin.price?.eur || "N/A",
    };

    try {
      const updatedFavorites = [...userData.favorites, newFavorite];
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ favorites: updatedFavorites }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorites");
      }

      setUserData((prevData) => ({ ...prevData, favorites: updatedFavorites }));
      setShowNotification(true);

      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Error adding favorite coin:", error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto p-6">
        {/* Search input and button */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search for a token..."
            value={query}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Go
          </button>
        </div>

        {/* Suggestions list */}
        {suggestions.length > 0 && (
          <div className="dropdown-content bg-base-100 shadow-lg rounded-box w-full p-4 mb-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded-md"
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}

        {/* Coin details section */}
        {showDetails && localStorage.getItem("selectedTokenId") && (
          <div className="mt-8 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">{query}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg shadow-inner overflow-hidden">
                <h3 className="text-lg font-semibold mb-4">Token Overview</h3>
                <CoinDetails
                  tokenId={localStorage.getItem("selectedTokenId")}
                  renderContent={(data) => {
                    setCurrentCoin({
                      id: data.tokenId,
                      name: data.tokenName,
                      image: data.image,
                      price: data.price,
                    }); // Capture the actual coin data

                    return (
                      <div>
                        <div className="flex justify-center mb-4">
                          <img
                            src={data.image}
                            alt={`${data.tokenName} logo`}
                            className="h-20 w-20 object-cover rounded"
                          />
                        </div>
                        <div className="max-h-32 overflow-y-auto mb-4">
                          <p>
                            <strong>Description:</strong>{" "}
                            {data.tokenDescription}
                          </p>
                        </div>
                        <h4 className="font-semibold mt-4">Social Media</h4>
                        <ul className="list-disc list-inside">
                          {data.socialMedia.map((social, index) => (
                            <li key={index}>
                              {social.platform}: {social.value}
                            </li>
                          ))}
                        </ul>
                        <h4 className="font-semibold mt-4">Links</h4>
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
                        <h4 className="font-semibold mt-4">AI Feedback</h4>
                        <AiInfo tokenAddress={data.tokenAddress} />
                      </div>
                    );
                  }}
                />
              </div>

              {/* Right panel - Token information */}
              <div className="p-4 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold mb-4">
                  Token Information
                </h3>
                <CoinDetails
                  tokenId={localStorage.getItem("selectedTokenId")}
                  showAiInfo={false}
                  renderContent={(data) => (
                    <div className="space-y-2">
                      <p>
                        <strong>Token Name:</strong> {data.tokenName}
                      </p>
                      <p>
                        <strong>CA:</strong> {data.tokenAddress}
                      </p>
                      <p>
                        <strong>Blockchain:</strong> {data.blockchain}
                      </p>
                      <p>
                        <strong>Price (EUR):</strong> {data.price?.eur || "N/A"}
                      </p>
                      <p>
                        <strong>Price (USD):</strong> {data.price?.usd || "N/A"}
                      </p>
                      <p>
                        <strong>Market Cap (EUR):</strong>{" "}
                        {data.marketCap?.eur || "N/A"}
                      </p>
                      <p>
                        <strong>Market Cap (USD):</strong>{" "}
                        {data.marketCap?.usd || "N/A"}
                      </p>
                      <p>
                        <strong>Liquidity (EUR):</strong>{" "}
                        {data.liquidity?.eur || "N/A"}
                      </p>
                      <p>
                        <strong>Liquidity (USD):</strong>{" "}
                        {data.liquidity?.usd || "N/A"}
                      </p>
                      <p>
                        <strong>Holder Count:</strong>{" "}
                        {data.holderCount || "N/A"}
                      </p>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Add to Collection button */}
            <div className="text-center mt-6">
              <button
                className="btn btn-success w-full md:w-auto"
                onClick={handleAddToFavorites}
              >
                Add to Collection
              </button>
            </div>
          </div>
        )}

        {/* Success notification */}
        {showNotification && (
          <div className="toast toast-center toast-success mt-4">
            <div className="alert alert-success">
              <span>Coin added to your collection!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
