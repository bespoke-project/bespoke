import { IoPerson } from "react-icons/io5";
import { PiCoinVerticalDuotone } from "react-icons/pi";

const CardProfile = () => {
  return (
    <>
      <div className="card bg-base-100 w-full max-w-md mx-auto shadow-xl">
        <figure className="px-4 pt-4 sm:px-10 sm:pt-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/340px-Brad_Pitt-69858.jpg"
            className="rounded-xl"
            alt="Profile"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Siamak</h2>
          <div className="flex gap-2">
            <IoPerson size="18px" />
            <p>Name: Siamak Mehrnia</p>
          </div>
          <div className="flex gap-2">
            <IoPerson size="18px" />
            <p>Email: SiamakME@gmail.com</p>
          </div>

          <h2 className="card-title">Favorite Coin</h2>
          <div className="flex gap-2 group">
            <PiCoinVerticalDuotone size="20px" />
            <p className="cursor-pointer">Bitcoin</p>
            <button className="btn btn-xs btn-outline btn-error invisible group-hover:visible">
              Delete
            </button>
          </div>
          <div className="flex gap-2 group">
            <PiCoinVerticalDuotone size="20px" />
            <p className="cursor-pointer">Dogecoin</p>
            <button className="btn btn-xs btn-outline btn-error invisible group-hover:visible">
              Delete
            </button>
          </div>
          <div className="flex gap-2 group">
            <PiCoinVerticalDuotone size="20px" />
            <p className="cursor-pointer">Litecoin</p>
            <button className="btn btn-xs btn-outline btn-error invisible group-hover:visible">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfile;
