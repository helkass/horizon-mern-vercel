import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { publicRequest } from "../../../requestMethods";
import Success from "../../Success";
import Layout from "../Layout";

// show all product from DB
const AddPack = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // declare
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [img, setImg] = useState("");
  const type = "pack";

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
    try {
      const response = await publicRequest.post("/item/create", {title, desc, size, img, price, type});
      if(response.status === 201){
        setTitle("");
        setDesc("");
        setImg("");
        setSize(0);
        setPrice(0);

        setSuccess(true)
      }
    } catch (error) {
      error && setError(true);
    }
  };
  return (
    <form className="grid gap-2 my-3 w-11/12">
      <div className="flex justify-center item-center">
        {success && <Success message="data berhasil ditambahkan, refresh page untuk melihat hasil"/>}
        {error && <Bug message="input data failed"/>}
      </div>
      <div className="flex items-center gap-2">
        <label>title</label>
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
      <div className="flex items-center gap-2">
        <label>price</label>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
          placeholder="price"
          type="text"
          name="price"
          value={price}
          id="price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="size">size</label>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
          placeholder="size"
          type="number"
          name="size"
          value={size}
          id="size"
          onChange={(e) => setSize(e.target.value)}
        />
        <label htmlFor="size">gr</label>
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
      <label className="block">
        <input
          type="file"
          name="img"
          onChange={handleImage}
          className="block text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-600 hover:file:bg-violet-100"
        />
      </label>
      <button
        onClick={handleSubmit}
        className="bg-green-300 mt-3 flex items-center hover:bg-green-500 px-4 py-1 rounded-md text-green-700 w-max"
      >
        Add Coffee
        <span>
          <BiPlus className="px-1" size={24} />
        </span>
      </button>
      <p className="opacity-70 text-gray-500">
        Note: If you input product again please click Add Coffee pack
        <span className="text-yellow-600"> yellow button</span>
      </p>
    </form>
  );
};

export default AddPack;