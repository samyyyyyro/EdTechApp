import React from "react";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex flex-col items-center gap-8 w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="w-full flex flex-col items-center pb-5">
          <img src={Logo} alt="Logo" className="object-contain mb-4" />
          <div className="flex gap-3 mb-4">
            {["About", "Catalog"].map((ele, i) => (
              <div
                key={i}
                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
              >
                <Link to={ele.toLowerCase()}>{ele}</Link>
              </div>
            ))}
          </div>
          <hr className="w-full border-richblack-700" />
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => (
              <div
                key={i}
                className={` ${
                  BottomFooter.length - 1 === i
                    ? ""
                    : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                } px-3 `}
              >
                <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                  {ele}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">Made with ❤️ CodeHelp © 2023 Studynotion</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
