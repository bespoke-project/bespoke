import { useState } from "react";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    LastName: "",
    email: "",
    Password: "",
  });
  const resatFormData =()=>{
    setForm({
      name: "",
      LastName: "",
      email: "",
      Password: "",
    });
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="max-w-xl m-auto py-4 ">
        <div className="flex flex-col py-4">
          <label className="text-lg">Name</label>
          <input
            className="border border-gray-300 p-2 rounded-md"
            name="name"
            onChange={handleChange}
            type="text"
          />
        </div>
      </div>

      <div className="max-w-xl m-auto py-4  ">
        <div className="flex flex-col py-4">
          <label className="text-lg ">Last Name</label>
          <input
            className="border border-gray-300 p-2 rounded-md"
            name="LastName"
            onChange={handleChange}
            type="text"
          />
        </div>
      </div>

      <div className="max-w-xl m-auto py-4 ">
        <div className="flex flex-col py-4">
          <label className="text-lg">Email</label>
          <input
            className="border border-gray-300 p-2 rounded-md"
            name="email"
            onChange={handleChange}
            type="text"
          />
        </div>
      </div>

      <div className="max-w-xl m-auto py-4">
        <div className="flex flex-col py-4">
          <label className="text-lg">Password</label>
          <input
            className="border border-gray-300 p-2 rounded-md"
            name="Password"
            onChange={handleChange}
            type="password"
          />
        </div>
      </div>
        <div className="max-w-xl m-auto py-4 ">
            <div className="flex flex-col py-4">
            <button className="btn btn-success border-gray-300  p-2 rounded-md" onClick={resatFormData}>Upadate</button>
            </div>
        </div>


    </>
  );
};

export default Form;
