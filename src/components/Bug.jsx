import { BiErrorAlt } from "react-icons/bi";

const Bug = ({ message, onClick }) => {
  return (
    <div onClick={onClick} className="container success mx-auto">
      <div className="flex relative justify-center gap-2 mx-auto border bg-red-100 border-red-400 text-red-600 rounded-md md:w-3/6 w-4/6 my-4 text-md py-2 text-center">
        {message}
        <BiErrorAlt size={22} color={"#dc2626"} />
      </div>
    </div>
  );
}

export default Bug;