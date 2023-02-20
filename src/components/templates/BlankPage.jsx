import React from "react";
import Alert from "../atoms/alerts/Alert";
import { useNavigate } from "react-router-dom";

const BlankPage = () => {
   const navigate = useNavigate();
   return (
      <main className="min-h-[437px] flex jusity-center items-center">
         <Alert
            message="404 Page Not Found! && Click To Back Home Page"
            onClick={() => navigate("/")}
            error
         />
      </main>
   );
};

export default BlankPage;
