import { BiBrush } from "react-icons/bi";
import Header from "../Header";
import Content from "../Content";
import Success from "../../Success";
import Bug from "../../Bug";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../../requestMethods";

const EditBottle = ({ cup }) => {
    const [data, setData] = useState({})
    const [img, setImg] = useState(data.img);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const location = useLocation()
    const urlId = location.pathname.split('/')[3];

      //fetching data by id
      useEffect(() => {
        const fetchData = async () => {
            const response  = await publicRequest.get(`/item/${urlId}`)
            setData(response.data)
        }
        fetchData();
      },[])
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
      const newData = new FormData(e.target)
      const object = Object.fromEntries(newData.entries())
      // console.log(Object.values(items));
      fetch("http://localhost:5000/api/item/edit/" + data._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...object, img: data.img}),
      }).then((result) => {
        setSuccess(!success);
        result.json();
      }).catch(err => {
        err && setError(true)
      })
    };
    return (
        <>
          <Header/>
            <div className="flex text-xl justify-center">
              <h1>Edit Bottle</h1>
            </div>
            {success ? <Success message={"Data Updated"} /> : <></>}
            {error && <Bug message="failed on update!"/>}
        <Content>
            <form className="grid gap-2 my-3" onSubmit={handleUpdate}>
              <div>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                  placeholder="name"
                  type="text"
                  name="title"
                  id="name"
                  defaultValue={data.title}
                />
              </div>
              <div>
                <textarea
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                  placeholder="description"
                  type="text"
                  name="desc"
                  id="desc"
                  defaultValue={data.desc}
                />
              </div>
              <div className="grid md:grid-cols-4 grid-cols-3 items-center px-2">
                <label>700 ml</label>
                <div className="flex items-center gap-2">
                  <span>Rp.</span>
                  <input
                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                    placeholder="price"
                    type="text"
                    name="medium"
                    id="medium"
                    defaultValue={data.medium}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-3 items-center px-2">
                <label>1000 ml</label>
                <div className="flex items-center gap-2">
                  <span>Rp.</span>
                  <input
                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
                    placeholder="price"
                    type="text"
                    name="large"
                    id="large"
                    defaultValue={data.large}
                  />
                </div>
              </div>
              <label className="block">
                <img
                  src={img || data.img}
                  className="w-20 h-24 object-cover"
                  alt={data.title}
                />
                <input
                  type="file"
                  onChange={handleImage}
                  className="block text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-600 hover:file:bg-violet-100"
                />
              </label>
              <button
                type="submit"
                className="bg-yellow-200 mt-3 flex items-center hover:bg-yellow-400 px-4 py-1 rounded-md text-yellow-600 w-max"
              >
                Update product
                <span>
                  <BiBrush className="px-1" size={24} />
                </span>
              </button>
            </form>
        </Content>
    </>
  );
};

export default EditBottle;