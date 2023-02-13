import React from 'react';
import Container from '../Container';

const Section = ({ children, className }) => {
  return (
    <section className={`flex ${className}`}>
        <Container>
            <div className="flex">
                <div className="container md:mt-9 grid md:grid-cols-2 sm:mx-auto mx-3 z-10">
                {children}
                </div>
            </div>
        </Container>
    </section>
  )
}

export default Section