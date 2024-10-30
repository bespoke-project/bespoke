const LogForm = () => {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <h1>Login</h1>
        <div>
            <form>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email" className="input input-bordered" />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Password" className="input input-bordered" />
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
      </div>
    </>
  );
};

export default LogForm;
