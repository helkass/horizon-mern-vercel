import Container from "../Container";
import { FaMusic, FaMoneyBillWave } from "react-icons/fa";
import { ImConnection, ImFilm } from "react-icons/im";
import logoBloob from "../../assets/images/logoAndBloob.png";
import Title, { SubTitle } from "../atoms/title/Title";
import { ButtonBasic } from "../atoms/button/Button";
import ImageSection from "../atoms/image/Image";
import { IconWithTitle } from "../atoms/icons/Icon";
import Section from "../templates/Section";
import { CiCoffeeBean } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";

const features = [
   {
      title: "98,9%",
      desc: "great coffee from horizon",
   },
   {
      title: "5/5",
      desc: "assessment from reviews",
   },
   {
      title: "30%",
      desc: "more affordable and cheaper prices",
   },
   {
      title: "50mb+",
      desc: "good connection for bussines",
   },
];

const icons = [CiCoffeeBean, AiFillStar, FaMoneyBillWave, ImConnection];

const Features = () => {
   let IconFeature = null;
   return (
      <>
         <Section
            id="menu"
            className="bg-yellow-100 bg-opacity-50 relative my-6">
            {/* left content */}
            <div className="text-center md:text-left xl:py-8 lg:pt-7 md:pt-2 mb-12 md:mb-0 space-y-3 md:pr-8">
               <Title
                  title="Enjoy Your Coffee with facility from Horizon Coffee Shop."
                  styledCustom="text-xl"
               />
               <ImageSection
                  src={logoBloob}
                  styledCustom="bg-amber-100 bg-opacity-60 rounded-full lg:w-3/6"
               />
            </div>
            {/* end left */}
            {/* right content */}
            <div className="relative mt-16 lg:pl-9 md:pl-6 pb-4 lg:pb-0">
               <p className="text-amber-600 text-lg font-semibold">
                  Our Coffee
               </p>
               <Title
                  styledCustom="text-xl"
                  title="choose your Favorit coffee"
               />
               <p className="my-4">
                  <span className="text-amber-600 text-2xl">Drip</span> |
                  Cappucino | Mocha
               </p>
               <SubTitle
                  title="Lebih dari 10 jenis kopi pilihan untuk kamu nikmati sesuai
          dengan seleramu."
                  styledCustom="my-10"
               />
               <ButtonBasic
                  title="Product List"
                  href="/products"
                  styledCustom="bg-amber-200 md:w-36 text-yellow-700 px-3 md:px-0"
               />
            </div>
            {/* end right */}
         </Section>
         <Container>
            <div className="flex gap-3 bg-yellow-50 justify-evenly py-12 rounded-md overflow-auto relative flex-nowrap pl-72 sm:pl-0">
               {features.map((feature, i) => {
                  IconFeature = icons[i];
                  return (
                     <div
                        key={i}
                        className="text-left text-yellow-700 flex flex-col md:p-5 p-3 rounded-xl bg-white gap-3 w-56 justify-between min-w-[160px]">
                        <IconFeature size={30} />
                        <p className="lg:text-3xl text-2xl">{feature.title}</p>
                        <p className="text-black/50">{feature.desc}</p>
                     </div>
                     // <FeaturesCard
                     //    key={feature.title}
                     //    title={feature.title}
                     //    icon={icons}
                     //    desc={feature.desc}
                     // />
                  );
               })}
            </div>
         </Container>
      </>
   );
};

const FeaturesCard = (props) => {
   const Icon = props.icon;
   return (
      <div className="text-left text-yellow-700 flex flex-col md:p-5 p-3 rounded-xl bg-white gap-3 w-56 justify-between min-w-[160px]">
         <Icon size={30} />
         <p className="lg:text-3xl text-2xl">{props.title}</p>
         <p className="text-black/50">{props.desc}</p>
      </div>
   );
};

export default Features;
