import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { ButtonIconTitleResponsive } from "../atoms/button/Button";

const Sidebar = (props) => {
   const [header, setHeader] = useState("dashboard");
   const handleComponent = (e) => {
      props.component(e);
      setHeader(e);
   };
   return (
      <div className="text-amber-800 py-10 relative space-y-3">
         <div>
            <h1 className="text-center text-2xl capitalize">{header}</h1>
         </div>
         <main className="flex gap-7 relative">
            <div className="sm:w-3/12 gap-4 sm:flex flex-col fixed sm:relative top-5 translate-y-10 left-0">
               <ButtonIconTitleResponsive
                  title="Account"
                  icon={AiOutlineUser}
                  sizeIcon={22}
                  active={header === "dashboard"}
                  onClick={() => handleComponent("dashboard")}
               />
               <ButtonIconTitleResponsive
                  title="orders"
                  icon={AiOutlineShoppingCart}
                  sizeIcon={22}
                  active={header === "order"}
                  onClick={() => handleComponent("order")}
               />
            </div>
            {props.children}
         </main>
      </div>
   );
};

export default Sidebar;
