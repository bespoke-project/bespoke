import { Line } from "react-chartjs-2";
import CoinDetails from "../components/details/CoinDetails";
import AiInfo from "../components/details/AiInfo";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
  return new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const Details = () => {
  const tokenId = localStorage.getItem("selectedTokenId");

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
          showAiInfo={false}
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
                  className="h-25 w-25 object-cover rounded"
                />
              </div>

              {/* Token Description */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Token Description:</h3>
                <p>{data.tokenDescription || "No description available"}</p>
              </div>

              {/* AI Feedback */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">AI Feedback:</h3>
                <AiInfo tokenAddress={data.tokenAddress} />
              </div>

              {/* Aktueller Preis */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Current Price:</h3>
                <p>
                  EUR: {data.price?.eur ? formatNumber(data.price.eur) : "N/A"}
                </p>
                <p>
                  USD: {data.price?.usd ? formatNumber(data.price.usd) : "N/A"}
                </p>
              </div>

              {/* Price Trend Chart (24 Hours) */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">
                  Price Trend (24 Hours):
                </h3>
                <Line
                  data={{
                    labels: Array.from(
                      { length: data.priceTrend24h?.usd?.length || 0 },
                      (_, i) => `${String(i).padStart(2, "0")}:00`
                    ),
                    datasets: [
                      {
                        label: "Price (USD)",
                        data: data.priceTrend24h?.usd || [],
                        fill: false,
                        borderColor: "rgba(153,102,255,1)",
                        tension: 0.1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Time (24-hour format)",
                        },
                      },
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Price (USD)",
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                    },
                  }}
                />
              </div>

              {/* Price Trend Chart (30 Days) */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">
                  Price Trend (30 Days):
                </h3>
                <Line
                  data={{
                    labels: data.priceTrend30d?.dates || [],
                    datasets: [
                      {
                        label: "Price (USD)",
                        data: data.priceTrend30d?.usd || [],
                        fill: false,
                        borderColor: "rgba(255,159,64,1)",
                        tension: 0.1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Date",
                        },
                      },
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Price (USD)",
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                    },
                  }}
                />
              </div>

              {/* Market Cap */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Market Cap:</h3>
                <p>
                  EUR:{" "}
                  {data.marketCap?.eur
                    ? formatNumber(data.marketCap.eur)
                    : "N/A"}
                </p>
                <p>
                  USD:{" "}
                  {data.marketCap?.usd
                    ? formatNumber(data.marketCap.usd)
                    : "N/A"}
                </p>
              </div>

              {/* Market Cap Trend Chart */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">
                  Market Cap Trend (30 Days):
                </h3>
                <Line
                  data={{
                    labels: Array.from(
                      { length: data.marketCapTrend?.usd?.length || 0 },
                      (_, i) => `Day ${i + 1}`
                    ),
                    datasets: [
                      {
                        label: "Market Cap (USD)",
                        data: data.marketCapTrend?.usd || [],
                        fill: false,
                        borderColor: "rgba(75,192,192,1)",
                        tension: 0.1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                    },
                  }}
                />
              </div>

              {/* Aktuelle Liquidität */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Current Liquidity:</h3>
                <p>
                  EUR:{" "}
                  {data.liquidity?.eur
                    ? formatNumber(data.liquidity.eur)
                    : "N/A"}
                </p>
                <p>
                  USD:{" "}
                  {data.liquidity?.usd
                    ? formatNumber(data.liquidity.usd)
                    : "N/A"}
                </p>
              </div>

              {/* Holder Count */}
              <div className="p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Holder Count:</h3>
                <p>{data.holderCount || "N/A"}</p>
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
