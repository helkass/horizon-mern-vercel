import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { publicRequest } from "../../../requestMethods";
import Bug from "../../Bug";
import Success from "../../Success";
// show all product from DB
const AddBottle = () => {
   // declare
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [medium, setMedium] = useState("");
   const [large, setLarge] = useState("");
   const [img, setImg] = useState("");
   const [isLoading, setLoading] = useState(false);

   const [error, setError] = useState(false);
   const [success, setSuccess] = useState(false);

   // handle convert it in base64
   const handleImage = (e) => {
      const file = e.target.files[0];
      setFileToBase(file);
   };

   // encode image to base 64
   const setFileToBase = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         setImg(reader.result);
      };
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const response = await authorizationRequest.post("/item/create", {
            title,
            desc,
            image: img,
            medium,
            large,
         });
         if (response.status === 201) {
            setTitle("");
            setDesc("");
            setImg("");
            setMedium("");
            setLarge("");

            setSuccess(true);

            setTimeout(() => {
               window.location.reload(true);
            });
         }
      } catch (error) {
         error && setError(true);
      }
      setLoading(false);
   };
   return (
      <form className="grid gap-2 my-3 w-11/12">
         <div>
            <input
               className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
               placeholder="title"
               type="text"
               name="title"
               value={title}
               id="title"
               onChange={(e) => setTitle(e.target.value)}
            />
         </div>
         <div>
            <textarea
               className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
               placeholder="description"
               type="text"
               name="desc"
               value={desc}
               id="desc"
               onChange={(e) => setDesc(e.target.value)}
            />
         </div>
         <div className="grid md:grid-cols-4 grid-cols-3 items-center px-2">
            <label>700ml / Medium</label>
            <div className="flex items-center gap-2">
               <span>Rp.</span>
               <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                  placeholder="example: 30000"
                  type="text"
                  name="medium"
                  id="large"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
               />
            </div>
         </div>
         <div className="grid md:grid-cols-4 grid-cols-3 items-center px-2">
            <label>1000 ml / Large</label>
            <div className="flex items-center gap-2">
               <span>Rp.</span>
               <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                  placeholder="example; 30000"
                  type="text"
                  name="large"
                  id="large"
                  value={large}
                  onChange={(e) => setLarge(e.target.value)}
               />
            </div>
         </div>

         <label className="block">
            <img
               src={img || null}
               alt="image upload"
               className="w-12 h-12 object-cover"
            />
            <input
               type="file"
               name="img"
               onChange={handleImage}
               className="block text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-600 hover:file:bg-violet-100"
            />
         </label>
         <button
            disabled={isLoading}
            onClick={handleSubmit}
            className={`${
               isLoading ? "cursor-not-allowed bg-green-100" : "cursor-pointer"
            }bg-green-300 mt-3 flex items-center hover:bg-green-500 px-4 py-1 rounded-md text-green-700 w-max`}>
            Add product
            <span>
               <BiPlus className="px-1" size={24} />
            </span>
         </button>
         {success && (
            <Success message="success adding product, please refresh page!" />
         )}
         {error && <Bug message="input data failed" />}
         <p className="opacity-70 text-gray-500">
            Note: If you input product again please click Add Product
            <span className="text-yellow-600"> yellow button</span>
         </p>
      </form>
   );
};

export default AddBottle;
