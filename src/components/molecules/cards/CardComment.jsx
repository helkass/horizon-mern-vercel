import { ImageBasic } from "../../atoms/image/Image";
import defaultImage from "../../../assets/images/defaultImage.jpg";
import Rating from "react-rating";
import { AiFillStar } from "react-icons/ai";

const CardComment = ({ comment, rating, customer_name }) => {
   return (
      <div className="rounded-lg bg-amber-50 p-2 w-full sm:w-11/12 flex flex-col gap-3">
         {/* user */}
         <div className="flex justify-between">
            <div className="flex gap-2 text-sm flex-nowrap items-center">
               <div className="w-[30px] h-[30px]">
                  <ImageBasic
                     src={defaultImage}
                     alt={"user comment"}
                     styledCustom={"rounded-full object-cover"}
                  />
               </div>
               <p className="font-semibold text-amber-800">{customer_name}</p>
            </div>
            <Rating
               readonly
               initialRating={rating}
               fullSymbol={<AiFillStar className="text-yellow-400" />}
            />
         </div>
         <p className="text-amber-700">{comment}</p>
      </div>
   );
};

export default CardComment;
