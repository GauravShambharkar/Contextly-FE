import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import ErrDisplay from "./ErrDisplay";

type formDataTypeProp = {
  selectType: string;
  url: string;
};

type StateProps = {
  setData: React.Dispatch<React.SetStateAction<formDataTypeProp>>;
  data: formDataTypeProp;
};

const UrlFeeding: React.FC<StateProps> = ({ setData, data }) => {
  // onchange function
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setData((prev: formDataTypeProp) => ({
      ...prev,
      [name as keyof formDataTypeProp]: value,
    }));
  }

  type errType = {
    err: boolean;
    ErrMsg: string;
  };

  const [err, setErr] = useState<errType>({
    err: false,
    ErrMsg: "input fields are missing",
  });

  // on Submit function
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (data.url || data.selectType) {
      setErr((prev) => ({ ...prev, ErrMsg: "URL and select Type is must!!" }));
    }

    console.log("Submitted Data:", data);
  }

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border border-[#ffffffba] w-190 h-15 flex justify-between max-[760px]:w-120 max-[430px]:w-100 max-[430px]:h-10 max-[400px]:w-90"
      >
        <div className="w-fit px-2 h-full flex rounded-none justify-center items-center border bg-gray-800 ">
          {/* <label htmlFor="content-type" className="sr-only">
                Select Content Type
              </label> */}

          <select
            name="contentType"
            id="content-type"
            value={data.selectType}
            onChange={handleChange}
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
          onChange={handleChange}
          value={data.url}
          id="url-input"
          className="border-t-0 text-white border-black rounded-none w-full 
             focus:border-sky-500 focus:outline-blue-500 focus:ring-0 px-2 py-1"
          placeholder="Enter the URL here..."
        />

        <div className="bg-white flex gap-1 items-center justify-center h-full px-9 cursor-pointer hover:text-blue-400 hover:scale-105 transition-all duration-200 ease-in-out">
          <button type="submit" className="">
            Submit
          </button>
          <img src="rightArrow.png" alt="" className="size-6 " />
        </div>
      </form>

      <div className="border h-30 p-5 flex items-center justify-center mt-10">
        <ErrDisplay err={err} />
      </div>
    </div>
  );
};

export default UrlFeeding;
