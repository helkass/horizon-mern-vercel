import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCusContext } from "../../redux/customer/useCusContext";
import { useLogout } from "../../redux/customer/useLogout";
import { linkItems } from "../../constans/app";
import { ButtonBasic } from "../atoms/button/Button";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
   const { logout } = useLogout();
   const [isOpen, setIsOpen] = useState(false);
   const [navbar, setNavbar] = useState(false);
   const { customer } = useCusContext();
   const navigate = useNavigate();

   function handleLogOut() {
      logout();
      navigate("/");
   }
   const changeColor = () => {
      if (window.scrollY >= 80) {
         setNavbar(true);
      } else {
         setNavbar(false);
      }
   };
   useEffect(() => {
      window.addEventListener("scroll", changeColor);
   });
   return (
      <nav
         className={
            navbar
               ? "bg-yellow-100 bg-opacity-70 backdrop-blur-sm shadow-md text-amber-800 z-50 fixed w-screen"
               : "bg-amber-100 text-amber-700 z-50 fixed w-screen"
         }>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               <div className="flex items-center justify-between w-full">
                  <div className="-mr-2 flex md:hidden">
                     <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md outline-none"
                        aria-controls="mobile-menu"
                        aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        {!isOpen ? (
                           <FaBars size={20} />
                        ) : (
                           <AiOutlineClose size={20} />
                        )}
                     </button>
                  </div>
                  <div className="flex-shrink-0 text-2xl tracking-wide font-flower font-semibold">
                     <Link to="/">
                        <h2>HORIZON</h2>
                     </Link>
                  </div>
                  {/* decoration space between for logo header */}
                  {!customer && (
                     <span className="w-10 h-10 sm:hidden block"></span>
                  )}
                  <div className="hidden md:block">
                     <div className="flex items-baseline space-x-4">
                        {linkItems.map((link, i) => (
                           <Link to={link.href} key={i}>
                              <span
                                 className={`px-3 hover:border-amber-600 py-2 text-sm font-medium border-b-2
                        ${navbar ? " border-transparent" : "border-amber-100"}
                    `}>
                                 {link.label}
                              </span>
                           </Link>
                        ))}
                     </div>
                  </div>
                  {customer ? (
                     <div className="flex items-center gap-1">
                        <Link to={`/cuctomer/${customer._id}`}>
                           <span className="text-md cursor-pointer capitalize">
                              {customer.fullname.split(" ")[0]}
                           </span>
                        </Link>
                        <ButtonBasic
                           title="Log Out"
                           onClick={handleLogOut}
                           styledCustom="text-amber-800 bg-amber-200 hidden sm:block md:w-28"
                        />
                     </div>
                  ) : (
                     <div className="sm:flex gap-3 items-center hidden mr-2">
                        <Link to="/login">
                           <button className="px-4 py-1">Login</button>
                        </Link>
                        <Link to="/register">
                           <button
                              className={
                                 navbar
                                    ? "bg-yellow-200 px-3 py-1 rounded text-amber-800"
                                    : "bg-amber-500 px-3 py-1 rounded text-white"
                              }>
                              Register
                           </button>
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         </div>

         <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="md:hidden" id="mobile-menu">
               <div className="flex flex-col justify-center items-center gap-7 py-10">
                  {linkItems.map((link, i) => (
                     <ButtonBasic key={i} title={link.label} href={link.href} />
                  ))}
                  {customer ? (
                     <ButtonBasic
                        title="Log Out"
                        onClick={handleLogOut}
                        styledCustom="text-amber-800 bg-amber-200 text-xl px-3"
                     />
                  ) : (
                     <div className="gap-3 items-center mr-2">
                        <Link to="/login">
                           <button className="px-4 py-1">Login</button>
                        </Link>
                        <Link to="/register">
                           <button
                              className={
                                 navbar
                                    ? "bg-yellow-100 px-3 py-1 rounded text-amber-800"
                                    : "bg-yellow-400 px-3 py-1 rounded text-white"
                              }>
                              Register
                           </button>
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         </Transition>
      </nav>
   );
};

export default Navbar;
