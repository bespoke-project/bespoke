import CardProfile from "../components/profile/CardProfile";
import Form from "../components/profile/Form";

const Profile = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="w-full md:w-6/12 p-4">
          <div className="m-auto">
            <Form />
          </div>
        </div>
        <div className="w-full md:w-6/12 p-4 flex">
          <div className="m-auto w-full">
            <CardProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
