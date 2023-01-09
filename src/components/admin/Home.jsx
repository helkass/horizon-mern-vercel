import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";
import { useState } from "react";

// componnents
import Bottles from "./bottle";
import Packs from "./packs";
import Main from "./Dashboard";
import Galleries from "./gallery";
import Blogs from "./blog";
import Search from "./search";

const Dashboard = () => {
    const [component, setComponent] = useState("Home")
    // components did render
    const getComponent = (data) => {
        setComponent(data)
    }

  return (
    <>
      <Header />
      <div className="flex md:gap-3 space-x-1">
        <Sidebar component={getComponent}/>
        <Content>
            {component === "Home" && <Main/>}
            {component === "Bottles" && <Bottles/>}
            {component === "Packs" && <Packs/>}
            {component === "Gallery" && <Galleries/>}
            {component === "Blogs" && <Blogs/>}
            {component === "Search" && <Search/>}
        </Content>
      </div>
    </>
  );
}

export default Dashboard;