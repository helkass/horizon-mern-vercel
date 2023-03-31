import Container from "../Container";
import useFetchGet from "../../hooks/useFetchGet";
import Loading from "../Loading";
import Bug from "../../components/Bug";
import Title from "../atoms/title/Title";
import { ButtonBasic } from "../atoms/button/Button";
import { ImageBasic } from "../atoms/image/Image";

const Gallery = () => {
   const { data, isLoading, isError } = useFetchGet("/gallery");
   return (
      <section className="relative text-center md:my-6 h-max pt-8 md:px-0">
         <Title title="Our Gallery" styledCustom="mx-auto" />
         <Container>
            <div className="overflow-hidden">
               <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                  {isError && <Bug message="error while fetching data" />}
                  {isLoading ? (
                     <Loading />
                  ) : (
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {data &&
                           data.slice(0, 6).map((gallery) => (
                              <div
                                 className="w-full relative object-cover hover:scale-110 hover:z-20 duration-300 hover:shadow-none shadow-md shadow-slate-300 h-max"
                                 key={gallery._id}>
                                 <ImageBasic
                                    src={gallery.img || gallery.image.url}
                                    alt={gallery.title}
                                    styledCustom="rounded-xl "
                                 />
                              </div>
                           ))}
                     </div>
                  )}
               </div>
            </div>
            <ButtonBasic
               href="/galleries"
               title="see more"
               styledCustom="text-xl my-3 md:my-5 hover:bg-amber-200 px-3"
            />
         </Container>
      </section>
   );
};

export default Gallery;
