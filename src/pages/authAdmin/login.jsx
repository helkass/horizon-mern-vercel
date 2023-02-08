import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLogin } from "../../redux/admin/useLogin";
import InputChange from "../../components/atoms/inputs/InputChange";

function AdminLogin() {
   const { login } = useLogin();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      await login(email, password);
   };

   return (
      <div className="relative w-full h-screen leading-relaxed tracking-wider font-semibold text-amber-900">
         <Container>
            <Link to="/">
               <button className="bg-amber-100 absolute left-2 top-2 p-2 font-normal rounded-md flex space-x-2">
                  <AiOutlineArrowLeft
                     size={20}
                     color="#78350f"
                     className="flex m-auto"
                  />
                  <p>Home</p>
               </button>
            </Link>
            <div className="mx-auto bg-yellow-50 bg-opacity-50 text-left md:w-6/12 sm:w-9/12 w-11/12 md:mt-12 mt-36 rounded-md">
               <h2 className="text-2xl hover-3 text-center font-flower py-1 my-12 sm:my-0">
                  Hello Again!
               </h2>
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
            </div>
         </Container>
      </div>
   );
}

export default AdminLogin;
