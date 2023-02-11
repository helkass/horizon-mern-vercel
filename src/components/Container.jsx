const Container = ({ children }) => {
   return (
      <div className="relative w-full items-center mx-auto md:px-14 overflow-hidden sm:px-9 px-2 max-w-7xl">
         {children}
      </div>
   );
};

export default Container;
