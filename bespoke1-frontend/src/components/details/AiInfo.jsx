import React, { useState, useEffect } from "react";

const AiInfo = ({ tokenAddress, tokenName }) => {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Import API key von .env
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
    // Prüft ob tokenName und tokenAddress korrekt übernommen wurden
    console.log("Received tokenName:", tokenName);
    console.log("Received tokenAddress:", tokenAddress);

    if (!tokenAddress || !apiKey) {
      setError("Token address or API key missing");
      setLoading(false);
      return;
    }

    const fetchAiInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                {
                  role: "user",
                  content: `Summarize the key details (name, symbol, blockchain) and potential, purpose, unique features and recent news or events of ${tokenName} (Token Contract Address: ${tokenAddress}) in a brief, informative response.`,
                },
              ],
              max_tokens: 150,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching AI info: ${response.statusText}`);
        }

        const data = await response.json();
        const message =
          data.choices?.[0]?.message?.content?.trim() || "No response from AI";

        setAiResponse(message);
      } catch (error) {
        console.error("Error fetching AI info:", error);
        setError(error.message || "Failed to fetch AI information");
      } finally {
        setLoading(false);
      }
    };

    fetchAiInfo();
  }, [tokenAddress, tokenName, apiKey]);

  if (loading) return <div>Loading AI feedback...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="rounded-lg">
      <h3 className="text-lg font-semibold mb-2"></h3>
      <p>{aiResponse}</p>
    </div>
  );
};

export default AiInfo;
