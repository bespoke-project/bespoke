import DeatilHome from "../components/Home/DeatilHome";
import TokenHome from "../components/Home/TokenHome";

const Home = () => {
  return (
    <>
      <div className="flex gap-16 ml-10">
        <div className="w-3/12  top-10">
          <TokenHome />
        </div>

        <div className="w-8/12 flex h-auto ml-auto ">
          <div className="m-auto">
            <DeatilHome />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
