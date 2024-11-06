import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const AiInfo = ({ tokenName }) => {
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
    if (!tokenName || !apiKey) {
      setError('Token name or API key missing');
      setLoading(false);
      return;
    }

    console.log('Token Name:', tokenName);

    const fetchAiInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-4',
              messages: [
                {
                  role: 'user',
                  content: `Please provide insights on the cryptocurrency token "${tokenName}". Include:
                  • Basic details like the token's symbol, name, and blockchain,
                  • An overview of its purpose and notable features,
                  • Recent events or news related to this token,
                  • Relevant metrics (market cap, liquidity, recent volume),
                  • Community engagement metrics, such as Twitter and Reddit followers,
                  • Community sentiment and any notable influencer mentions.

                  Summarize the information in a clear and concise way.`,
                },
              ],
              max_tokens: 300,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching AI info: ${response.statusText}`);
        }

        const data = await response.json();
        const message =
          data.choices?.[0]?.message?.content?.trim() || 'No response from AI';

        setAiResponse(message);
      } catch (error) {
        console.error('Error fetching AI info:', error);
        setError(error.message || 'Failed to fetch AI information');
      } finally {
        setLoading(false);
      }
    };

    fetchAiInfo();
  }, [tokenName, apiKey]);

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center space-y-2'>
        <ClipLoader color='#3498db' size={50} />
        <div>Loading AI feedback, please wait...</div>
      </div>
    );
  }

  if (error) return <div className='text-red-500'>Error: {error}</div>;

  return (
    <div className='rounded-lg'>
      <p>{aiResponse}</p>
    </div>
  );
};

export default AiInfo;
