
import { useNavigate } from "react-router-dom";

const DetailHome = () => {
    const navigate =useNavigate()
const handleMoreClick=()=>{
    navigate("/details")
}
  return (
    <>
      <div className="mt-10">
        <div className="card w-11/12 shadow-2xl m-12">
          <h1 className="text-center pt-10 font-extrabold text-xl">Details</h1>

          <div className="p-10 flex">
            <p className="text-center">
              Hier ist der Inhalt im p-Tag, der Informationen über Details
              enthält. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Est quas perspiciatis minima ex aperiam autem dolores molestiae
              quis excepturi eos dicta id ea, sapiente nobis quisquam quod rem
              explicabo non pariatur possimus. Porro quaerat modi veniam? Fuga
              placeat molestias voluptates tempora culpa minus velit quam odio,
              animi omnis molestiae voluptatum ab veritatis tenetur ut
              laudantium excepturi harum rem officiis quasi labore pariatur
              soluta. Non delectus inventore ducimus, quis modi rerum corrupti
              cumque alias cupiditate officia tempore. Fuga atque odit
              reiciendis aspernatur molestiae perferendis porro modi?
              Consectetur beatae non dolorum adipisci at? Esse, est delectus
              saepe eaque nam beatae non architecto ducimus explicabo minus,
              autem fuga sunt veniam sapiente ratione. At quis est porro
              praesentium voluptatem voluptatibus reprehenderit aliquid odit
              facere amet doloremque temporibus quas tempore perspiciatis saepe
              similique quam earum illo iusto eos, nesciunt alias omnis
              voluptate. Nobis, id? Minus expedita, placeat numquam sunt
              mollitia, illum quam necessitatibus earum, iusto excepturi libero
              fugit nihil omnis autem ad aspernatur nemo ullam ab quod quidem?
              Non totam nihil, ab sapiente in, atque aut nostrum qui aliquid
              quos nulla id et error consequatur! Eius nostrum suscipit facere,
              architecto ad accusamus sunt? Quae, molestias. Ipsa aliquam fugiat
              quas fugit ullam atque laboriosam facere. Distinctio eveniet
              reiciendis repellendus nesciunt aut beatae error dolor voluptatem
              debitis placeat. Perspiciatis architecto, ullam tempore omnis quae
              molestias dignissimos! Sunt tempora velit laborum nulla
              consequuntur odit nemo, cumque qui? Praesentium ullam cumque
              reiciendis amet quas illo distinctio possimus officia inventore
              magnam, repellat dolorem error officiis sed odit delectus
              voluptatibus ipsam.  Hier ist der Inhalt im p-Tag, der Informationen über Details
              enthält. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Est quas perspiciatis minima ex aperiam autem dolores molestiae
              quis excepturi eos dicta id ea, sapiente nobis quisquam quod rem
              explicabo non pariatur possimus. Porro quaerat modi veniam? Fuga
              placeat molestias voluptates tempora culpa minus velit quam odio,
              animi omnis molestiae voluptatum ab veritatis tenetur ut
              laudantium excepturi harum rem officiis quasi labore pariatur
              soluta. Non delectus inventore ducimus, quis modi rerum corrupti
              cumque alias cupiditate officia tempore. Fuga atque odit
              reiciendis aspernatur molestiae perferendis porro modi?
              Consectetur beatae non dolorum adipisci at? Esse, est delectus
              saepe eaque nam beatae non architecto ducimus explicabo minus,
              autem fuga sunt veniam sapiente ratione. At quis est porro
              praesentium voluptatem voluptatibus reprehenderit aliquid odit
              facere amet doloremque temporibus quas tempore perspiciatis saepe
              similique quam earum illo iusto eos, nesciunt alias omnis
              voluptate. Nobis, id? Minus expedita, placeat numquam sunt
              mollitia, illum quam necessitatibus earum, iusto excepturi libero
              fugit nihil omnis autem ad aspernatur nemo ullam ab quod quidem?
              Non totam nihil, ab sapiente in, atque aut nostrum qui aliquid
              quos nulla id et error consequatur! Eius nostrum suscipit facere,
              architecto ad accusamus sunt? Quae, molestias. Ipsa aliquam fugiat
              quas fugit ullam atque laboriosam facere. Distinctio eveniet
              reiciendis repellendus nesciunt aut beatae error dolor voluptatem
              debitis placeat. Perspiciatis architecto, ullam tempore omnis quae
              molestias dignissimos! Sunt tempora velit laborum nulla
              consequuntur odit nemo, cumque qui? Praesentium ullam cumque
              reiciendis amet quas illo distinctio possimus officia inventore
              magnam, repellat dolorem error officiis sed odit delectus
              voluptatibus ipsam.

            </p>
          </div>

          <div className="p-10">
            <button className="btn btn-outline w-72" onClick={handleMoreClick}>More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailHome;
