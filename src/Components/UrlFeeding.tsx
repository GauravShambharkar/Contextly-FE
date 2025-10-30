import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import ErrDisplay from "./ErrDisplay";
import axios, { isAxiosError } from "axios";
import Response from "./Response/Response";
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
    title: "Is It Still Worth Learning to Code? (The Truth)",
    channel: "CodeWithHarry",
    url: "https://www.youtube.com/watch?v=2jmiNO3jwrA",
    summary:
      'Here is a summary of the video "Is It Still Worth Learning to Code? (The Truth)":\n\n1.  Learning to code remains valuable, as AI is primarily an augmentation tool that enhances productivity rather than fully replacing human programmers.\n2.  There is a continued demand for coding skills, with projections indicating significant growth in software development roles.\n3.  Successful programmers in the current landscape must adapt by integrating AI tools into their workflow and continuously upskilling to work effectively alongside artificial intelligence.\n4.  Mastering fundamental programming concepts, including logic, data structures, and algorithms, is critical for understanding, reviewing, and refining AI-generated code.\n5.  Coding fosters computational thinking and problem-solving abilities, which are essential skills in an increasingly technology-driven world.\n6.  Python is highly recommended as a starting language for beginners due to its ease of learning, extensive community support, and broad applicability in various fields like data science and AI.\n7.  A career in programming offers diverse opportunities across areas such as web development, data science, and AI, provided one focuses on practical application and real-world projects.',
  });

  // on Submit function
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!data.url || !data.selectType) {
      setErr((prev) => ({
        ...prev,
        ErrMsg: "URL and select Type is must!!",
      }));
      return setTimeout(() => {
        setErr((prev) => ({
          ...prev,
          ErrMsg: null,
        }));
      }, 4000);
    }

    try {
      const res = await axios.post("http://localhost:5000/summarize", {
        url: data.url,
        summarizeType: data.selectType,
      });
      console.log("Submitted Data:", res.data);
      if (res.data.ok) {
        setIsLoading(false);
        setChatResponse((prev) => ({
          ...prev,
          summary: res.data.summary,
          title: res.data.metadata.title,
          channel: res.data.metadata.channel,
          url: res.data.url,
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
        <div className="w-190 border p-5 flex items-center justify-center mt-10">
          <ErrDisplay err={err} />
        </div>
      )}

      {isLoading ? (
        <div className="w-190 border p-5 flex items-center justify-center mt-10">
          <div className="allcenter gap-2 flex text-blue-500 bg-amber-50 p-4 tracking-tighter font-semibold">
            <MdOutlineSentimentVerySatisfied />
            getting what you want, please wait...
          </div>
        </div>
      ) : (
        <Response
          setChatResponse={setChatResponse}
          chatResponse={chatResponse}
        />
      )}
    </div>
  );
};

export default UrlFeeding;
