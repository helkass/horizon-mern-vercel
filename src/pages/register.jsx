import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import logo from "../assets/images/logo.png";
import { InputRegister } from "../components/Form";
import Success from "../components/Success";
import { useRegister } from "../redux/customer/useRegister";
import { useSelector } from "react-redux";

const Register = () => {

    const { register } = useRegister();
    const { status } = useSelector(state => state.alert)

    const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const form = Object.fromEntries(data.entries());
    await register(form);
  };
  return (
    <Layout>
      <main className="sm:min-h-screen flex sm:flex-row flex-col sm:pt-18 ">
        <div className="w-4/12 relative bg-yellow-100 sm:min-h-[568px] sm:flex hidden justify-center items-center">
          <div className="bg-yellow-400 bg-opacity-70 rounded-t-full">
            <img
              src={logo}
              className=""
              alt="img"
            />
          </div>
        </div>
        <div className="sm:min-h-[568px] flex justify-center items-center sm:w-7/12 my-6 sm:my-0">
          <div className="w-full max-w-xl mt-16">
            <h2 className="text-2xl text-center font-flower my-4 sm:my-2">
              Welcome!
            </h2>
            {status && <Success message="Yey pendaftaran berhasil"/>}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4 space-y-2">
                <InputRegister name="fullname" className="w-full" />
                <div className="flex space-x-2">
                  <InputRegister name="phone" />
                  <InputRegister name="email" type="email" />
                </div>
                <InputRegister name="address" className="w-full" />
                <div className="flex space-x-2">
                  <InputRegister name="city" />
                  <InputRegister name="province" />
                </div>
                <InputRegister name="password" type="password" className="w-1/2" />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-yellow-200 hover:bg-yellow-500 tracking-wide text-yellow-600 hover:text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-center text-gray-400 text-xs">
              Already have an account?
              <Link to="/login">
                <span className="text-yellow-500 mx-1 text-sm cursor-pointer">
                  Login
                </span>
              </Link>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Register;