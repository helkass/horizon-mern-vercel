import { BiBrush, BiArrowBack } from "react-icons/bi";
import Content from "../Content";
import Success from "../../Success";
import Header from "../Header";
import Bug from "../../Bug"
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { publicRequest } from "../../../requestMethods";
import { apiUrl } from "../../../constans/app";

const EditPack = () => {
    const [data, setData] = useState({});

    const location = useLocation();
    const urlId = location.pathname.split('/')[3];

    useEffect(() => {
        const fetchData = async () => {
            const response = await publicRequest.get(`/item/${urlId}`);
            setData(response.data);
        }
        fetchData();
    },[])

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false)

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
  const handleUpdate = (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);
    const pack = Object.fromEntries(newForm.entries())
    fetch(`${apiUrl}/item/edit/${urlId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pack),
    }).then((result) => {
      setSuccess(!success);
      result.json();
    }).catch(err => {
        err && setError(true);
    });
    // refresh page in 1s after update
    setTimeout(() => {
        window.location.reload(true);
    },1000);
  };
  return (
    <>
    <Header/>
        <Content>
          <div className="flex text-xl justify-center">
            <h1>Edit Cups</h1>
          </div>
          {success ? <Success message={"Data Updated"} /> : <></>}
          {error && <Bug message="failed to update"/>}
          <form className="grid gap-2 my-3" onSubmit={handleUpdate}>
            <div>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                placeholder="name"
                type="text"
                name="name"
                id="name"
                defaultValue={data.title}
              />
            </div>
            <div>
              <textarea
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                placeholder="description"
                type="text"
                name="desc"
                id="desc"
                defaultValue={data.desc}
              />
            </div>
            <div className="grid md:grid-cols-4 grid-cols-3 items-center px-2">
              <label>size</label>
              <div className="flex items-center gap-2">
                <label>gr</label>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                  placeholder="size"
                  type="text"
                  name="size"
                  id="size"
                  defaultValue={data.size}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-4 grid-cols-3 items-center px-2">
              <label>price</label>
              <div className="flex items-center gap-2">
                <span>Rp.</span>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                  placeholder="price"
                  type="text"
                  name="price"
                  id="price"
                  defaultValue={data.price}
                />
                <span className="text-gray-400 text-xs">exp:50000</span>
              </div>
            </div>
            <label className="block">
              <img
                src={data.img}
                alt={data.title}
                className="w-24 h-20 object-cover"
              />
              <input
                type="file"
                onChange={handleImage}
                className="block text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-600 hover:file:bg-violet-100"
              />
            </label>
            <div className="flex w-full justify-between">
                <button
                  type="submit"
                  className="bg-yellow-200 mt-3 flex items-center hover:bg-yellow-400 px-4 py-1 gap-2 rounded-md text-yellow-600 w-max"
                >
                  Update product
                  <span>
                    <BiBrush className="px-1" size={24} />
                  </span>
                </button>
                <Link to="/admin">
                    <button
                      className="bg-red-200 mt-3 flex items-center hover:bg-red-400 px-4 py-1 gap-2 rounded-md text-red-600 w-max"
                    >
                      Back
                      <span>
                        <BiArrowBack className="px-1" size={24} />
                      </span>
                    </button>
                </Link>
            </div>
          </form>
        </Content>
    </>
  );
};

export default EditPack;