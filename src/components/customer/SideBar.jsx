import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";

const Sidebar = (props) => {
  const [header, setHeader] = useState("dashboard");
    const handleComponent = (e) => {
        props.component(e)
        setHeader(e);
    }
    return (
        <div className="text-amber-800 py-10 relative">
            <div>
                <h1 className="text-center text-2xl capitalize">{header}</h1>
            </div>
            <main className="flex gap-7 relative">
                <div className="sm:w-3/12 space-y-5 space-x-2 sm:flex flex-col fixed sm:relative top-5 translate-y-10 left-0">
                  <button onClick={() => handleComponent("dashboard")}>
                    <>
                      <span className="flex sm:hidden bg-yellow-100 bg-opacity-50 rounded-md z-50 backdrop-blur p-2 top-0">
                        <AiOutlineUser size={20} />
                      </span>
                      <button className="rounded-r-full items-center gap-2 hidden sm:block hover:bg-yellow-50 pl-7 py-2 cursor-pointer">
                        Account
                      </button>
                    </>
                  </button>
                  <button onClick={() => handleComponent("order")}>
                    <>
                      <span className="flex sm:hidden bg-yellow-100 bg-opacity-50 rounded-md z-50 backdrop-blur p-2 top-0">
                        <AiOutlineShoppingCart size={20} />
                      </span>
                      <button className="pl-7 py-2 cursor-pointer hidden sm:block gap-2 items-center hover:bg-yellow-50">
                        Orders
                      </button>
                    </>
                  </button>
                </div>
                {props.children}
            </main>
        </div>
    );          
  };            

  export default Sidebar;
