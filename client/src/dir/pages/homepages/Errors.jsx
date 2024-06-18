import React from "react";
import TopNav from "../../components/reusable/TopNav";

function Errors() {
  return (
    <div className="  w-full bg h-screen">
      <div className="absolute inset-0">
        <TopNav />
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="text-3xl md:text-6xl font-bold text-white flex-wrap  text-center">
          <div>404 Error!</div>
          <div className="text-sm mb-6">
            The Page you are looking for doesnt seem to exist. Please go back
          </div>
        </div>
      </div>
    </div>
  );
}

export default Errors;
