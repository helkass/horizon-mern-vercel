import {
  AiOutlineHome,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import {FaPrescriptionBottle} from "react-icons/fa"
import { GrGallery, GrArticle } from "react-icons/gr";
import { RiRedPacketLine } from "react-icons/ri";
import { useLogout } from "../../redux/admin/useLogout";
import { useNavigate } from "react-router-dom";

const icons = [
  AiOutlineHome,
  FaPrescriptionBottle,
  RiRedPacketLine,
  GrGallery,
  GrArticle,
  FiSearch
];
const links = [ "Home", "Bottles", "Packs", "Gallery", "Blogs", "Search"];

const Sidebar = (props) => {
  const navigate = useNavigate();
    const { logout } = useLogout();

    const handleLogOut = () => {
      logout();
      return navigate("/");
    };

    const handleComponent = (e) => {
      props.component(e)
    }

     return (
    <nav className=" z-50 md:w-2/12 bg-yellow-50 text-slate-900 mt-4 rounded-r-lg w-12 sm:w-16 h-full flex justify-center text-center">
      <div className="h-4/6 font-semibold py-5 space-y-12 w-full sm:pl-4">
        {links.map((link, i) => {
          const Icon = icons[i];
          return (
              <button onClick={() => handleComponent(link)} key={i} className="hover:bg-white items-center w-full flex gap-2 md:py-2 pb-1 pl-1 rounded-l-full">
                <Icon size={22} />
                <span className="hidden md:block" >{link}</span>
              </button>
          );
        })}
        <button
          onClick={handleLogOut}
          className="flex justify-center items-center gap-3 pl-1"
        >
          <AiOutlinePoweroff size={20} />
          <span className="hidden md:flex">Log Out</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;