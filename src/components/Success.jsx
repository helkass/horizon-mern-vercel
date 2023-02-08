import { BiCheck } from "react-icons/bi";
import { showAlert } from "../redux/alert/alertReducer";
import { useDispatch } from "react-redux";

const Success = ({ message }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showAlert())
  }
  return (
    <div className="container success mx-auto">
      <div className="flex relative justify-between mx-auto px-3 border bg-green-100 border-green-400 text-green-600 rounded-md md:w-3/6 w-4/6 my-4 text-md py-2 text-center items-center">
        {message}
        <button onClick={handleClick}>
          <BiCheck size={24} color={"#15803d"} />
        </button>
      </div>
    </div>
  );
}

export default Success;