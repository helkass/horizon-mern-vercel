// pages for customer
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import logo from "../../assets/images/login-logo.png";
import { useLogin } from "../../redux/customer/useLogin";
import { useSelector } from "react-redux";
import Success from "../../components/Success";
import InputChange from "../../components/atoms/inputs/InputChange";
import Alert from "../../components/atoms/alerts/Alert";
import Loading from "../../components/Loading";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { login, isLoading } = useLogin();
   const alert = useSelector((state) => state.alert);

   const handleSubmit = async (e) => {
      e.preventDefault();
      await login(email, password);
   };
   return (
      <Layout>
         <main className="sm:min-h-screen flex sm:flex-row flex-col pt-18">
            {isLoading && (
               <Loading styledCustom="absolute top-0 left-0 right-0 cursor-not-allowed" />
            )}
            <div className="sm:w-1/2 relative bg-yellow-100 sm:min-h-[568px] sm:flex hidden justify-center items-center">
               <div className="bg-yellow-400 bg-opacity-70 rounded-t-full">
                  <img src={logo} alt="img" />
               </div>
            </div>
            <div className="sm:w-1/2 sm:min-h-[568px] flex justify-center items-center my-20 sm:my-0">
               <div className="w-full max-w-xs">
                  <h2 className="text-2xl hover-3 text-center font-flower py-1 my-12 sm:my-0">
                     Hello Again!
                  </h2>
                  {alert.status && alert.type === "success" ? (
                     <Alert success message={alert.message} />
                  ) : (
                     alert.type === "error" && (
                        <Alert
                           error
                           message={alert.message || "unauthorized"}
                        />
                     )
                  )}
                  <form
                     onSubmit={handleSubmit}
                     className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                     <InputChange
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        label="email"
                        border
                     />
                     <InputChange
                        required
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        label="password"
                        border
                     />
                     <div className="flex items-center justify-center flex-col mt-6">
                        <button
                           className="bg-yellow-200 hover:bg-yellow-500 tracking-wide text-yellow-600 hover:text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                           type="submit">
                           Sign In
                        </button>
                     </div>
                  </form>
                  <p className="text-center text-gray-400 text-xs">
                     Don&apos;t have an account yet?
                     <Link to="/register">
                        <span className="text-yellow-500 mx-1 text-sm cursor-pointer">
                           Sign Up
                        </span>
                     </Link>
                  </p>
               </div>
            </div>
         </main>
      </Layout>
   );
};

export default Login;
