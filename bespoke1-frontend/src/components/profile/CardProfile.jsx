import { IoMail, IoPerson } from 'react-icons/io5';
// import { PiCoinVerticalDuotone } from "react-icons/pi";
import { useAuth } from '../../context/AuthProvider';

const CardProfile = () => {
  const { userData, setUserData } = useAuth();

  const handleDelete = async (coinId) => {
    try {
      // Create a new favorites array excluding the deleted coin
      const updatedFavorites = userData.favorites.filter(
        (coin) => coin.coinId !== coinId
      );

      // Send a PUT request to update the favorites in the backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials if necessary
          body: JSON.stringify({ favorites: updatedFavorites }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }

      // Update the frontend state with the new favorites array
      setUserData((prevData) => ({ ...prevData, favorites: updatedFavorites }));
    } catch (error) {
      console.error('Error deleting favorite coin:', error);
    }
  };

  return (
    <div className='card bg-base-100 w-96 shadow-xl'>
      <figure className='px-10 pt-10'>
        {/* <img src={userData.image} className="rounded-xl" alt="Profile" /> */}
        {/* <img
          src={
            userData
              ? userData.image
              : 'https://i.pinimg.com/736x/bd/42/af/bd42af6c1deea1760a9ac6f98539dab1.jpg'
          }
          alt='Profile'
        /> */}
        <img
          src={
            userData.image && userData.image.trim() !== ''
              ? userData.image
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
          alt='Profile'
          className='rounded-full'
        />
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{userData.username}</h2>
        <div className='flex gap-2'>
          <IoPerson size='18px' />
          <p>Name: {`${userData.firstName} ${userData.lastName}`}</p>
        </div>
        <div className='flex gap-2'>
          <IoMail size='18px' />
          <p>Email: {userData.email}</p>
        </div>

        <h2 className='card-title'>Favorite Coins</h2>
        {userData.favorites && userData.favorites.length > 0 ? (
          userData.favorites.map((coin) => (
            <div key={coin.coinId} className='flex items-center gap-4 group'>
              <img src={coin.image} alt={coin.coinName} className='w-8 h-8' />
              <div className='flex flex-col'>
                <p className='cursor-pointer font-semibold'>{coin.coinName}</p>
                <p className='text-sm text-gray-600'>
                  Price: ${coin.currentPrice}
                </p>
              </div>
              <button
                className='btn btn-xs btn-outline btn-error invisible group-hover:visible'
                onClick={() => handleDelete(coin.coinId)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No favorite coins added.</p>
        )}
      </div>
    </div>
  );
};

export default CardProfile;
