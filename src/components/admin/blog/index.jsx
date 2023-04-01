import Loading  from "../../Loading";
import { AiFillDelete } from "react-icons/ai";
import DeleteComponent from "../actions/DeleteComponent";
import defaultImage from "../../../assets/images/defaultImage.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAction } from "../../../redux/toggleReducer";
import Alert from "../../atoms/alerts/Alert.jsx";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getBlogs, deleteBlog} from "../../../helper/fetchBlog.js";

const Blogs = () => {
  const { data, isLoading, isError } = useQuery("blogs", getBlogs);
  const dispatch = useDispatch();
  const deleteId = useSelector(state => state.toggle.client.deleteId)
  const queryClient = useQueryClient();
  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    }
  })

  const deleteHandler = async () => {
    if(deleteId){
      deleteBlogMutation.mutate(deleteId);
      dispatch(deleteAction(null))
    }
  }

  const cancelHandler = () => {
    dispatch(deleteAction(null))
  }
  return (
      <section className="flex flex-col">
        <div className="text-center text-2xl my-4 font-flower">
          <h2>Blogs</h2>
        </div>
        <main>
          <div className="flex justify-between">
            <Link to="/admin/addblog">
              <button className="px-3 py-1 bg-yellow-50 border-white border rounded-sm hover:border-yellow-500 hover:bg-yellow-100">
                Add Content
              </button>
            </Link>
          </div>
          {deleteId && DeleteComponent({cancelHandler, deleteHandler})}
          {isLoading ? <Loading /> : isError ? <Alert error message="Something went wrong!"/> : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 sm:gap-8 gap-2 md:gap-5 mt-8 md:px-7 justify-between w-11/12">
              {data.map((obj, i) => (
                <BodyBlogs {...obj} key={i} />
              ))}
            </div>
            )}
        </main>
      </section>
  );
};

function BodyBlogs({ _id, title, img, image }) {
  const dispatch = useDispatch();
  const onDelete = async (id) => {
    dispatch(deleteAction(id))
  };
  return (
    <>
      <div className="relative mt-3">
        <div className="blur-xs flex justify-center items-center p-1 after-gg">
          <img
            src={img || image?.url || defaultImage}
            alt="img-cover"
            className="sm:w-11/12 max-h-[200px] h-50 w-full object-cover"
          />
        </div>
        <button
          onClick={() => onDelete(_id)}
          className="absolute cursor-pointer text-red-600 -right-1 -top-2 p-2 hover:text-white hover:bg-red-500 rounded-md bg-red-200 bg-opacity-40 border-red-600 border"
        >
          <AiFillDelete />
        </button>
        <div className="bg-yellow-100 px-3 py-2 md:text-xl sm:text-md text-sm capitalize">
          <p>{title}</p>
        </div>
      </div>
    </>
  );
}

export default Blogs;