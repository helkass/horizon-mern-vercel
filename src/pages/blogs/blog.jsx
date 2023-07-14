import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Navbar from "../../components//home/Navbar";
import defaultImage from "../../assets/images/defaultImage.jpg";
import {useLocation} from "react-router-dom";
import {publicRequest} from "../../requestMethods";
import {memo, useEffect, useState} from "react";
import SeoHelmetComponent from "../../components/SeoHelmetComponent.jsx";

const DetailBlog = () => {
    const [data, setData] = useState({});
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchData = async () => {
            const response = await publicRequest.get(`/blog/${id}`);
            setData(response.data);
        };
        fetchData();
    }, []);

    return (
        <>
            <SeoHelmetComponent
                title={"horizon blog"}
                content={"blog coffee shop horizon, kumpulan artikel seputar perkopian dan keseharian"}
                href={`/blog/${id}`}
            />
            <Navbar/>
            <Container>
                <div className="md:px-20 my-20">
                    {/* header */}
                    <header className="text-center items-center my-6 space-x-2">
                        {/* time published */}
                        <p className="text-gray-700 text-opacity-70 text-xs">
                            Published {new Date(data.createdAt).toDateString()}
                        </p>
                        {/* title */}
                        <p className="text-2xl font-semibold">{data.title}</p>
                    </header>
                    {/* image content */}
                    <div className="relative w-full h-full flex justify-center item-center">
                        <img
                            src={data.image?.url || defaultImage}
                            alt={data.title}
                            className="md:h-[420px] h-[300px] sm:h-96 object-cover w-10/12"
                        />
                    </div>
                    {/* main content article */}
                    <p
                        className="md:px-10 px-2 my-4 tracking-wide"
                        dangerouslySetInnerHTML={{__html: data.article}}
                    />
                </div>
            </Container>
            <Footer/>
        </>
    );
};

export default memo(DetailBlog);
