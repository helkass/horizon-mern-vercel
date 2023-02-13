import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import BlogList from "./pages/blogs/blogList";
import Galleries from "./pages/galleries";
import Home from "./pages/home";
import Blog from "./pages/blogs/blog";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Products from "./pages/products";
import AdminLogin from "./pages/authAdmin/login";
import Admin from "./pages/admin";
import Order from "./pages/products/order";
import OrderWa from "./pages/products/orderwa";
import EditBottle from "./components/admin/bottle/EditBottle";
import EditPack from "./components/admin/packs/EditPack";
import AddBlog from "./components/admin/actions/AddBlog";
import Customer from "./pages/customer";

import { useAdminContext } from "./redux/admin/useAdminContext";
import Register from "./pages/register";
import BlankPage from "./components/templates/BlankPage";
import { useCusContext } from "./redux/customer/useCusContext";

function App() {
   const { admin } = useAdminContext();
   const { customer } = useCusContext();
   const customerLocal = localStorage.getItem("customer");

   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galleries" element={<Galleries />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<BlankPage message="Wrong pages" />} />
            <Route path="/products" element={<Products />} />
            <Route
               path="/order"
               element={
                  customer || customerLocal ? (
                     <Order />
                  ) : (
                     <Navigate to={<Login />} replace />
                  )
               }
            />
            <Route path="/products/orderwa" element={<OrderWa />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:id" element={<Customer />} />

            {/* admin */}
            <Route
               path="/auth"
               element={!admin ? <AdminLogin /> : <Navigate to="/admin" />}
            />
            <Route
               path="/admin"
               element={admin ? <Admin /> : <Navigate to="/auth" />}
            />
            <Route path="/admin/editbottle/:id" element={<EditBottle />} />
            <Route path="/admin/editpack/:id" element={<EditPack />} />
            <Route path="/admin/addblog" element={<AddBlog />} />
         </Routes>
      </Router>
   );
}

export default App;
