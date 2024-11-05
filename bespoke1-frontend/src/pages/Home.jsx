import DetailHome from "../components/Home/DetailHome";
import TokenHome from "../components/Home/TokenHome";

const Home = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-16 ml-4 md:ml-10">
        <div className="w-full md:w-3/12">
          <TokenHome />
        </div>

        <div className="w-full md:w-8/12 flex h-auto">
          <div className="m-auto w-full">
            <DetailHome />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
