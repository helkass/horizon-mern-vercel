import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import logo from "../../assets/images/logo.png";
import { InputRegister } from "../../components/Form";
import Success from "../../components/Success";
import { useRegister } from "../../redux/customer/useRegister";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Alert from "../../components/atoms/alerts/Alert";

const Register = () => {
   const { register, isLoading } = useRegister();
   const alert = useSelector((state) => state.alert);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const form = Object.fromEntries(data.entries());
      await register(form);
   };
   return (
      <Layout>
         <main className="sm:min-h-screen flex sm:flex-row flex-col sm:pt-18 justify-evenly">
            {isLoading && (
               <Loading styledCustom="absolute top-0 left-0 right-0 cursor-not-allowed" />
            )}
            <div className="w-4/12 relative sm:min-h-[568px] sm:flex hidden justify-center items-center">
               <div className="bg-yellow-50 bg-opacity-70 rounded-t-full flex justify-center items-center">
                  <img src={logo} className="sm:w-10/12" alt="img" />
               </div>
            </div>
            <div className="sm:min-h-[568px] flex justify-center items-center sm:w-7/12 my-6 sm:my-0">
               <div className="w-full max-w-xl mt-16">
                  <h2 className="text-2xl text-center font-flower uppercase my-4 sm:my-2">
                     Welcome <span className="text-yellow-600">!</span>
                  </h2>
                  {alert.Success && alert.type === "success" ? (
                     <Success message={alert.message} />
                  ) : (
                     alert.type === "error" && (
                        <Alert
                           error
                           message={alert.message || "something went wrong!"}
                        />
                     )
                  )}
                  <form
                     onSubmit={handleSubmit}
                     className="bg-white rounded px-8 pt-6 pb-8 mb-4">
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
                        <InputRegister
                           name="password"
                           type="password"
                           className="w-1/2"
                        />
                     </div>
                     <div className="flex items-center justify-center">
                        <button
                           className="bg-yellow-200 hover:bg-yellow-500 tracking-wide text-yellow-600 hover:text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                           type="submit">
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
