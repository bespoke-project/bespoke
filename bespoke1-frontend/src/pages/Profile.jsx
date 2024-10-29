import CardProfile from "../components/profile/CardProfile";
import Form from "../components/profile/Form";
const Profile = () => {
  return (
    <>
      <div className="flex gap-16">
        <div className="w-6/12 m-auto ">
          <div className="m-auto">
            <Form />
          </div>
        </div>
        <div className="w-6/12 flex">
          <div className=" m-auto ">
            <CardProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
