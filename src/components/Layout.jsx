import Navbar from "./home/Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-full flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;