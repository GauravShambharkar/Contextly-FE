import React, { useEffect } from "react";

type UrlFeedingStateProps = {
  setdata: React.Dispatch<React.SetStateAction<any>>;
  data: object;
};

const UrlFeeding: React.FC<UrlFeedingStateProps> = ({ setdata, data }) => {
  useEffect(() => {
    console.log(data);
  });

  return (
    <div>
      <form
        action=""
        className="border border-[#ffffffba] w-190 h-15 flex justify-between"
      >
        <div className="w-fit px-2 h-full flex rounded-none justify-center items-center border bg-gray-800">
          {/* <label htmlFor="content-type" className="sr-only">
                Select Content Type
              </label> */}

          <select
            name="contentType"
            id="content-type"
            defaultValue=""
            className="text-white h-full bg-gray-800 focus:outline-none cursor-pointer "
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="in short">In Short</option>
            <option value="in boolets">In Boolets</option>
            <option value="in brief">In Brief</option>
            <option value="conclusion">Conclusion</option>
            <option value="summary">full Summary</option>
          </select>
        </div>

        <input
          type="url"
          name="url"
          id="url-input"
          className="border-t-0 text-white border-black rounded-none w-full 
             focus:border-sky-500 focus:outline-blue-500 focus:ring-0 px-2 py-1"
          placeholder="Enter the URL here..."
        />

        <div className="bg-white flex gap-1 items-center justify-center h-full px-9 cursor-pointer hover:text-blue-400 hover:scale-105 transition-all duration-200 ease-in-out">
          <button className="" >Submit</button>
          <img src="rightArrow.png" alt="" className="size-6 " />
        </div>
      </form>
    </div>
  );
};

export default UrlFeeding;
