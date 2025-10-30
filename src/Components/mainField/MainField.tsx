import { useState } from "react";
import Hero from "../hero/Hero";
import UrlFeeding from "../UrlFeeding/UrlFeeding";

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
    url: string;
  };

  const [data, setData] = useState<formDataType>({
    selectType: "",
    url: "",
  });

  return (
    <>
      <div className="bg-blue-500 w-full min-h-screen p-5 flex flex-col justify-center items-center gap-10 max-[400px]:p-0 ">
        {/* hero section */}
        <Hero />

        {/* main feature */}
        <div className="w-full flex justify-center items-center">
          {/* controller */}
          <UrlFeeding setData={setData} data={data} />

          {/* checkBoxs */}
          {/* <CheckBoxed checkBoxHandler={checkBoxHandler} /> */}
        </div>
      </div>
    </>
  );
};

export default MainField;
