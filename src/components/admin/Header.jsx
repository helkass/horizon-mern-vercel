import { Link } from "react-router-dom";
import defaultImage from "../../assets/images/defaultImage.jpg";
import { useAdminContext } from "../../redux/admin/useAdminContext";

const Header = () => {
  const { admin } = useAdminContext();
  return (
    <header className="bg-amber-300 max-w-[2340px]">
      <div className="flex font-medium justify-between w-full items-center md:py-4 py-2 md:px-7 px-4">
        <Link to="/admin">
          <h1 className="md:text-2xl text-2xl font-txthead cursor-pointer">
            Horizon
            {admin ? (
              <span className="text-xs ml-1">{admin.email}</span>
            ) : (
              <></>
            )}
          </h1>
        </Link>
        <div className="gap-3 rounded-full">
          <div className="object-cover text-sm rounded-full max-w-14 border-none flex items-center justify-center">
            <img
              alt="horizon"
              src={defaultImage}
              className="rounded-full object-cover w-16 h-16"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;