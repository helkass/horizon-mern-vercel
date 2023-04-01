import {Link} from "react-router-dom";
import defaultImage from "../../assets/images/defaultImage.jpg";
import { ButtonBasic } from "../atoms/button/Button";

const BlogItems = ({ image, title, id, date, article }) => {
  return (
    <div className="blog flex py-12 px-4 p-2">
      <div className="items-center justify-center relative flex w-5/12">
        <div className="img flex justify-center align-center relative">
          <img
            src={image || defaultImage}
            alt={title || "unknown"}
            className="sm:w-72 w-56 object-cover max-h-[280px]"
          />
        </div>
      </div>
      <div className="relative w-7/12 flex flex-col sm:pb-5 px-2 py-1">
        <Link to={"/blog/" + id.toString()}>
          <strong className="text-2xl cursor-pointer w-max hover:text-yellow-600">
            {title || "unknown"}
          </strong>
        </Link>
        <span className="text-xs text-gray-500 mt-1">
          {new Date(date).toDateString() || "unknown"}
        </span>
        <p
          className="line-clamp-3"
          dangerouslySetInnerHTML={{ __html: article }}
        />
        <ButtonBasic title="Read more" href={`/blog/${id.toString()}`} styledCustom="bg-yellow-200 px-4 my-2"/>
      </div>
    </div>
  );
};

export default BlogItems;