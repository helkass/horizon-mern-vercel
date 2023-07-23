import React from "react";
import Container from "../Container";
import CardTestimonial from "../molecules/cards/CardTestimonial";
import Title from "../atoms/title/Title";

const Testimonial = () => {
   return (
      <section className="text-center rounded-xl py-7 bg-yellow-100 bg-opacity-50">
         <Container>
            <Title
               title="What people think about us"
               styledCustom={"mx-auto mb-10"}
            />
            <div className="overflow-x-hidden w-full py-4">
               <div className="flex gap-4 py-4 justify-center">
                  <CardTestimonial rate={5} />
                  <CardTestimonial rate={5} />
                  <CardTestimonial rate={5} />
               </div>
            </div>
         </Container>
      </section>
   );
};

export default Testimonial;
