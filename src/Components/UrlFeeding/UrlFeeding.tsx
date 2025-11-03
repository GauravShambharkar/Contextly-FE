import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import ErrDisplay from "../errDisplay/ErrDisplay";
import axios, { isAxiosError } from "axios";
import Response from "../Response/Response";
import { MdOutlineSentimentVerySatisfied } from "react-icons/md";

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

  const [err, setErr] = useState<{
    ErrMsg: string | null;
  }>({
    ErrMsg: null,
  });

  const [chatResponse, setChatResponse] = useState<{
    title: string | null;
    channel: string | null;
    url: string | null;
    summary: string | null;
  }>({
    title: null,
    channel: null,
    url: null,
    summary: null,
  });

  // on Submit function
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!data.url || !data.selectType) {
      setErr((prev) => ({
        ...prev,
        ErrMsg: "URL and select Type is must !!",
      }));
      return setTimeout(() => {
        setErr((prev) => ({
          ...prev,
          ErrMsg: null,
        }));
      }, 6000);
    }
    setIsLoading(true);

    try {
      const res = await axios.post("https://contextly-backend.onrender.com/summarize", {
        url: data.url,
        summarizeType: data.selectType,
      });
      console.log("Submitted Data:", res.data);

      if (res.data.ok) {
        setIsLoading(false);
        setChatResponse((prev) => ({
          ...prev,
          summary: res.data.summary ?? null,
          title: res.data.metadata.title ?? null,
          channel: res.data.metadata.channel ?? null,
          url: res.data.url ?? null,
        }));
        return console.log(res.data);
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const errorData = err.response?.data;
        setErr({ ...err, ErrMsg: errorData.details });

        setTimeout(() => {
          setErr({ ...err, ErrMsg: null });
        }, 6000);
        return console.log(errorData);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {}, [err]);

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
            name="selectType"
            id="selectType"
            value={data.selectType}
            onChange={handleChange}
            className="text-white h-full bg-gray-800 focus:outline-none cursor-pointer "
          >
            <option value="" disabled>
              Select Type
            </option>

            <option value="in short">In Short</option>
            <option value="in brief">In Brief</option>
            <option value="in boolets">In Boolets</option>
            <option value="conclusion">Conclusion</option>
            <option value="detailed">Detailed</option>
            <option value="key takeaways">Key takeaways</option>
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

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-white flex gap-1 items-center justify-center h-full px-9 transition-all duration-200 ease-in-out ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:text-blue-400 hover:scale-105"
          }`}
        >
          <span>{isLoading ? "Loading..." : "Submit"}</span>
          {!isLoading && <img src="rightArrow.png" alt="" className="size-6" />}
        </button>
      </form>
      {err.ErrMsg && (
        <div className="w-190 p-5 flex items-center justify-center mt-10">
          <ErrDisplay err={err} />
        </div>
      )}

      {isLoading ? (
        <div className="w-190 p-5 flex items-center justify-center mt-10">
          <div className="allcenter gap-2 flex text-blue-500 bg-amber-50 p-4 tracking-tighter font-semibold">
            <MdOutlineSentimentVerySatisfied className="size-6" />
            getting what you want, please wait...
          </div>
        </div>
      ) : (
        <div className="w-190 p-5 flex mt-10">
          <Response chatResponse={chatResponse} />
        </div>
      )}
    </div>
  );
};

export default UrlFeeding;
