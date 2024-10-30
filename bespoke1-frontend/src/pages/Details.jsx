const Details = ({
  tokenName,
  tokenAddress,
  blockchain,
  image,
  tokenDescription,
  links,
  marketCap,
  liquidity,
  holderCount,
  price,
  socialMedia,
}) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Detailed Token Information
      </h2>

      <div className="space-y-6">
        {/* Token Name */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Token Name:</h3>
          <p className="text-gray-600">{tokenName}</p>
        </div>

        {/* CA/Token Address */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">
            CA/Token Address:
          </h3>
          <p className="text-gray-600">{tokenAddress}</p>
        </div>

        {/* Blockchain */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Blockchain:</h3>
          <p className="text-gray-600">{blockchain}</p>
        </div>

        {/* Image */}
        <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700">Image:</h3>
          {image ? (
            <img
              src={image}
              alt={`${tokenName} logo`}
              className="mt-2 h-20 w-20 object-cover rounded"
            />
          ) : (
            <p className="text-gray-600">No image available</p>
          )}
        </div>

        {/* Token Description */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">
            Token Description:
          </h3>
          <p className="text-gray-600">{tokenDescription}</p>
        </div>

        {/* Links */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Links:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {links && links.length > 0 ? (
              links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No links available</p>
            )}
          </ul>
        </div>

        {/* Market Cap */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Market Cap:</h3>
          <p className="text-gray-600">{marketCap}</p>
        </div>

        {/* Liquidity */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Liquidity:</h3>
          <p className="text-gray-600">{liquidity}</p>
        </div>

        {/* Holder Count */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Holder Count:</h3>
          <p className="text-gray-600">{holderCount}</p>
        </div>

        {/* Price */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Price:</h3>
          <p className="text-gray-600">{price}</p>
        </div>

        {/* Social Media Information */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">
            Social Media Information:
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            {socialMedia && socialMedia.length > 0 ? (
              socialMedia.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {social.platform}
                  </a>
                </li>
              ))
            ) : (
              <p className="text-gray-600">
                No social media information available
              </p>
            )}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-200 to-blue-300">
        <h1 className="text-6xl font-signature text-black relative">
          - Bespoke! -
          <span className="absolute inset-0 text-black blur-sm opacity-30 transform translate-x-1 translate-y-1">
            - Bespoke! -
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Details;
