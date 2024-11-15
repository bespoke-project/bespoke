import { IoMail, IoPerson } from 'react-icons/io5';
import { useAuth } from '../../context/AuthProvider';

const CardProfile = () => {
  const { userData, setUserData, checkUser } = useAuth();

  const handleDelete = async (coinId) => {
    try {
      const updatedFavorites = userData.favorites.filter(
        (coin) => coin.coinId !== coinId
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ favorites: updatedFavorites }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }

      await checkUser();
    } catch (error) {
      console.error('Error deleting favorite coin:', error);
    }
  };

  return (
    <div className='card bg-base-100 w-96 shadow-xl mx-auto'>
      <figure className='px-10 pt-10'>
        <img
          src={
            userData.image && userData.image.trim() !== ''
              ? userData.image
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
          alt='Profile'
          className='rounded-full mx-auto'
        />
      </figure>
      <div className='card-body text-center'>
        <h2 className='card-title text-center mx-auto'>{userData.username}</h2>

        <div className='flex items-center justify-center gap-2 mx-auto p-1'>
          <IoPerson size='18px' />
          <p>Name: {`${userData.firstName} ${userData.lastName}`}</p>
        </div>

        <div className='flex items-center justify-center gap-2 mx-auto'>
          <IoMail size='18px' />
          <p>Email: {userData.email}</p>
        </div>

        <h2 className='card-title text-center mt-4 mx-auto'>Favorite Coins</h2>

        {userData.favorites && userData.favorites.length > 0 ? (
          userData.favorites.map((coin) => (
            <div
              key={coin.coinId}
              className='flex items-center gap-4 justify-between w-full group'
            >
              <img src={coin.image} alt={coin.coinName} className='w-8 h-8' />
              <p className='cursor-pointer font-semibold flex-1 text-left'>
                {coin.coinName}
              </p>
              <p className='text-sm text-gray-600'>
                Price: ${coin.currentPrice}
              </p>
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
