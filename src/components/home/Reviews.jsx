import Container from "../Container";
import BtnToProduct from "../BtnToProduct";
import { Disclosure } from "@headlessui/react";
import { AiOutlineDown } from "react-icons/ai";
import Title, { SubTitle } from "../atoms/title/Title";
import { ButtonBasic } from "../atoms/button/Button";

const Reviews = () => {
   return (
      <Container>
         <section
            id="reviews"
            className="flex md:text-left text-center text-amber-900 md:px-8 sm:px-3">
            <div className="grid md:grid-cols-2">
               <div className="w-full py-2 hover-1">
                  <p className="mb-7 font-semibold text-xl">Questions?</p>
                  <Title
                     styledCustom="my-7 w-full capitalize font-semiblod tracking-wide"
                     title="Pertanyaan yang sering ditanyakan"
                  />
                  <SubTitle
                     title="Kami selalau memberikan yang terbaik untuk membuat pelanggan kami
              senang dengan layanan kami"
                  />
               </div>
               <Disclosures />
            </div>
         </section>
         <TakeOut />
      </Container>
   );
};

function Disclosures() {
   return (
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
         <Disclosure>
            {({ open }) => (
               <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-amber-100 px-4 py-2 text-left text-sm font-medium text-amber-900 hover:bg-amber-200 focus:outline-none focus-visible:ring focus-visible:ring-amber-500 focus-visible:ring-opacity-75">
                     <span>Bisakah saya memeilih kopinya?</span>
                     <AiOutlineDown
                        className={`${
                           open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-amber-500`}
                     />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                     Kami menyediakan Anda dengan biji kopi terbaik, sehingga
                     Anda dapat mengalami rasa dan rasa yang berbeda untuk
                     setiap pengiriman. Kami ingin menjaga elemen kejutan untuk
                     Anda ketika Anda membuka kotak Gordi. Dengan mengingat hal
                     ini, Anda tidak dapat menyesuaikan pilihan kopi tertentu
                     untuk setiap pengiriman.
                  </Disclosure.Panel>
               </>
            )}
         </Disclosure>
         <Disclosure className="mt-2" as="div">
            {({ open }) => (
               <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-amber-100 px-4 py-2 text-left text-sm font-medium text-amber-900 hover:bg-amber-200 focus:outline-none focus-visible:ring focus-visible:ring-amber-500 focus-visible:ring-opacity-75">
                     <span>Darimana saja kopi yang dipilih Horizon?</span>
                     <AiOutlineDown
                        className={`${
                           open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-amber-500`}
                     />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                     Kami membuat biji kopi Anda dari berbagai roaster di
                     Indonesia dan mancanegara. Terkadang, Anda juga akan
                     mendapatkan biji kopi dari pemanggang Internasional sebagai
                     kejutan.
                  </Disclosure.Panel>
               </>
            )}
         </Disclosure>
         <Disclosure as="div" className="mt-2">
            {({ open }) => (
               <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-amber-100 px-4 py-2 text-left text-sm font-medium text-amber-900 hover:bg-amber-200 focus:outline-none focus-visible:ring focus-visible:ring-amber-500 focus-visible:ring-opacity-75">
                     <span>bagaimana saya biasa order online?</span>
                     <AiOutlineDown
                        className={`${
                           open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-amber-500`}
                     />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                     kami melayani order online menggunakan aplikasi gojek,
                     whatsapp, atau bisa langsung kontak email
                  </Disclosure.Panel>
               </>
            )}
         </Disclosure>
      </div>
   );
}

const TakeOut = () => {
   return (
      <div className="text-center text-amber-900 leading-relaxed tracking-wide">
         <div className="grid md:grid-cols-2 gap-5 my-14 md:text-left items-center max-h-max">
            <div className="font-semibold pl-10">
               <Title title="ambil kopimu sekarang!" />
            </div>
            <div className="text-center">
               <SubTitle
                  title="Jangan biarkan kopimu dingin, dan segeralah ke Horizon Coffee Shop
              dan nikmati secangkir kopi panas yang nikmat. Anda juga bisa memesan
              dan kami siap antar ketempat anda."
               />
            </div>
         </div>
         <ButtonBasic
            title="Order Sekarang"
            href="/products"
            styledCustom="bg-amber-100 px-3"
         />
      </div>
   );
};
export default Reviews;
