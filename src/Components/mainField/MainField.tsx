import { useState } from "react";
import Hero from "../hero/Hero";
import UrlFeeding from "../UrlFeeding/UrlFeeding";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

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
      <div className="bg-blue-500 w-full min-h-screen px-3 py-8 sm:p-8 flex flex-col justify-center items-center gap-6 sm:gap-10 overflow-x-hidden">
        {/* hero section */}
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        {/* main feature */}
        <div className="w-full flex justify-center items-center">
          {/* controller */}
          <ErrorBoundary>
            <UrlFeeding setData={setData} data={data} />
          </ErrorBoundary>

          {/* checkBoxs */}
          {/* <CheckBoxed checkBoxHandler={checkBoxHandler} /> */}
        </div>
      </div>
    </>
  );
};

export default MainField;
