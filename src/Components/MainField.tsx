import { useState } from "react";
import Hero from "./Hero";
import UrlFeeding from "./UrlFeeding";

const MainField = () => {
  // const checkBoxHandler = [
  //   {
  //     id: 1,
  //     name: "Summary",
  //   },
  //   {
  //     id: 2,
  //     name: "Conclusion",
  //   },
  //   {
  //     id: 3,
  //     name: "In Short",
  //   },
  //   {
  //     id: 4,
  //     name: "In Brief",
  //   },
  // ];

  type formDataType = {
    selectType: string;
    Url: string;
  };

  const [data, setdata] = useState<formDataType>({
    selectType: "Summary",
    Url: "https://github.com/GauravShambharkar/Multi-techStack-backend-directory-Generator",
  });

  return (
    <>
      <div className="bg-blue-500 w-full h-screen flex flex-col justify-center items-center gap-10">
        {/* hero section */}
        <Hero />

        {/* main feature */}
        <div className="w-full gap-10 flex flex-col justify-center items-center">
          {/* controller */}
          <UrlFeeding setdata={setdata} data={data} />

          {/* checkBoxs */}
          {/* <CheckBoxed checkBoxHandler={checkBoxHandler} /> */}
        </div>
      </div>
    </>
  );
};

export default MainField;
