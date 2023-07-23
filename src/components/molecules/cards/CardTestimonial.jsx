import { ImageBasic } from "../../atoms/image/Image";
import defaultImage from "../../../assets/images/defaultImage.jpg";
import { AiFillStar } from "react-icons/ai";
import Rating from "react-rating";
const CardTestimonial = ({ rate }) => {
   return (
      <div className="w-[300px] flex flex-col items-center gap-2 p-5 py-8 max-h-[240px] rounded-lg shadow-xl shadow-amber-100 text-amber-900 bg-white relative cursor-default">
         <div className="rounded-full w-[60px] h-[60px] bg-yellow-100 shadow-md shadow-amber-100 flex items-center absolute -top-[10%] left-50 -translate-x-50">
            <ImageBasic
               src={defaultImage}
               alt={"user profile photo"}
               styledCustom={"rounded-full"}
            />
         </div>
         <div className="my-3 capitalize">
            <p>Helka septyawan</p>
            <p className="text-slate-500 text-sm">tuban, jawa timur</p>
            <Rating
               readonly
               stop={rate}
               emptySymbol={<AiFillStar className="text-yellow-400" />}
            />
         </div>
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
            laudantium est ullam officia
         </p>
      </div>
   );
};

export default CardTestimonial;
