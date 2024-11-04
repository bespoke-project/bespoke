import { useNavigate } from "react-router-dom";

const DetailHome = () => {
  const navigate = useNavigate();
  const handleMoreClick = () => {
    navigate("/details");
  };

  return (
    <>
      <div className="mt-10">
        <div className="card w-full md:w-11/12 shadow-2xl mx-auto md:m-12">
          <h1 className="text-center pt-10 font-extrabold text-xl">Details</h1>

          <div className="p-4 md:p-10 flex">
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              ullam, et aliquam recusandae neque nemo, tenetur earum sunt
              deserunt veritatis explicabo. Optio voluptatibus accusantium,
              minima libero doloremque officiis aliquam quisquam praesentium
              error voluptatem harum vero esse dolorum corrupti officia eum
              explicabo eaque expedita mollitia tempore soluta quo dicta!
              Similique sapiente excepturi consequuntur fugiat dolorum commodi
              sint, ut illo exercitationem aspernatur, quam molestiae? Harum
              quis tenetur, minus modi quod rem ipsam laboriosam reprehenderit
              ipsum quam, quo fugit, iure asperiores! Natus et placeat adipisci
              nesciunt! Error, facere illum dolores tenetur maxime officia
              magnam deleniti nobis nulla veniam porro totam, amet consectetur
              inventore cupiditate obcaecati fugit eum ut dolorum aut unde
              consequuntur quo laboriosam adipisci. Laudantium id voluptatem
              corrupti nihil quidem maiores tenetur veritatis ipsam ab
              laboriosam fuga in excepturi aut, quasi ratione minima aspernatur,
              dolor incidunt! Iure blanditiis molestias accusantium voluptates
              nobis, similique impedit asperiores quaerat molestiae id ipsum
              corrupti iusto atque quis quae accusamus repellat eum rerum alias
              beatae ullam architecto vel. Alias, atque unde iusto sapiente
              repudiandae voluptatum quis in et recusandae ad? Veniam ad,
              incidunt vitae porro aspernatur similique, et non nemo voluptate
              laboriosam tempora provident repellendus quisquam quia animi
              sapiente ipsam maiores natus? Doloremque suscipit consequuntur
              deleniti. Ab dolores voluptas recusandae eveniet cupiditate
              voluptate ut laboriosam reiciendis, eligendi minima provident eos
              vero tempora sunt quae quidem maiores quam. Quo corrupti sint,
              repellendus debitis similique atque nostrum voluptates expedita
              asperiores corporis ullam veritatis consequuntur culpa incidunt
              est, eveniet dolorem vitae ex quaerat, modi velit quidem facere
              adipisci. Pariatur, adipisci?
            </p>
          </div>

          <div className="p-4 md:p-10">
            <button
              className="btn btn-outline w-full md:w-72"
              onClick={handleMoreClick}
            >
              More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailHome;
