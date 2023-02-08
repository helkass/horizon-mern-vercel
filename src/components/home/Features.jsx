import Container from "../Container";
import { FaMusic } from "react-icons/fa";
import { ImConnection, ImFilm } from "react-icons/im";
import logoBloob from "../../assets/images/logoAndBloob.png";
import Title, { SubTitle } from "../atoms/title/Title";
import { ButtonBasic } from "../atoms/button/Button";
import ImageSection from "../atoms/image/Image";
import { IconWithTitle } from "../atoms/icons/Icon";
import Section from "../templates/Section";

const Features = () => {
  return (
    <Section id="menu" className="bg-yellow-100 bg-opacity-50 relative">
      <div className="text-center md:text-left xl:py-8 lg:pt-7 md:pt-2 mb-12 md:mb-0">
        <Title title="Enjoy Your Coffee with facility from Horizon Coffee Shop." styledCustom="font-xl"/>
        <div className="flex my-12 sm:my-9 md:w-9/12 w-full text-center">
          <IconWithTitle title="live music" icon={FaMusic}/>
          <IconWithTitle title="free wifi" icon={ImConnection}/>
          <IconWithTitle title="film" icon={ImFilm}/>
        </div>
        <ImageSection src={logoBloob} styledCustom="bg-amber-100 bg-opacity-60 rounded-full"/>
      </div>
      <div className="relative mt-16 lg:pl-9 md:pl-6">
        <p className="text-amber-600 text-lg font-semibold">Our Coffee</p>
        <Title title="choose your Favorit coffee"/>
        <p className="my-4">
          <span className="text-amber-600 text-2xl">Drip</span> |
          Cappucino | Mocha
        </p>
        <SubTitle 
          title="Lebih dari 10 jenis kopi pilihan untuk kamu nikmati sesuai
          dengan seleramu."
          styledCustom="my-10"
          />
        <ButtonBasic title="Product List" href="/products" styledCustom="bg-amber-200 md:w-36"/>
      </div>
    </Section>
  );
};

export default Features;