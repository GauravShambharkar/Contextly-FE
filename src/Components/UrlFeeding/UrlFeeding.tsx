import React, {
  useEffect,
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from "react";
import ErrDisplay from "../errDisplay/ErrDisplay";
import axios, { isAxiosError } from "axios";
import Response from "../Response/Response";
import { MdOutlineSentimentVerySatisfied } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { ENDPOINTS } from "../../config";

type formDataTypeProp = {
  selectType: string;
  url: string;
};

type StateProps = {
  setData: React.Dispatch<React.SetStateAction<formDataTypeProp>>;
  data: formDataTypeProp;
};

const SELECT_OPTIONS = [
  { label: "In Short", value: "in short" },
  { label: "In Brief", value: "in brief" },
  { label: "In Boolets", value: "in boolets" },
  { label: "Conclusion", value: "conclusion" },
  { label: "Detailed", value: "detailed" },
  { label: "Key Takeaways", value: "key takeaways" },
];

const UrlFeeding: React.FC<StateProps> = ({ setData, data }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prev: formDataTypeProp) => ({
      ...prev,
      [name as keyof formDataTypeProp]: value,
    }));
  }

  function handleSelectOption(value: string) {
    setData((prev) => ({ ...prev, selectType: value }));
    setIsDropdownOpen(false);
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
      const res = await axios.post(ENDPOINTS.SUMMARIZE, {
        url: data.url,
        summarizeType: data.selectType,
      });

      console.log("Submitted Data:", res.data);

      if (res.data.ok) {
        setIsLoading(false);
        setChatResponse((prev) => ({
          ...prev,
          summary: res.data.summary ?? null,
          title: res.data.metadata?.title ?? null,
          channel: res.data.metadata?.channel ?? null,
          url: res.data.url ?? null,
        }));
        return console.log(res.data);
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        let message = "An error occurred";
        if (!error.response) {
          message = "Network error: Unable to connect to the server.";
        } else {
          message =
            error.response.data?.details ||
            error.response.data?.error ||
            "Server error";
        }

        setErr((prev) => ({ ...prev, ErrMsg: message }));

        setTimeout(() => {
          setErr((prev) => ({ ...prev, ErrMsg: null }));
        }, 6000);
        console.error("API Error:", error.response?.data || error.message);
      } else {
        setErr((prev) => ({ ...prev, ErrMsg: "An unexpected error occurred" }));
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {}, [err]);

  const selectedLabel =
    SELECT_OPTIONS.find((opt) => opt.value === data.selectType)?.label ||
    "Select Type";

  return (
    <div className="w-full flex flex-col items-center px-3 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className="border border-[#ffffffba] rounded-none w-full max-w-3xl flex flex-col sm:flex-row min-h-12 sm:h-15 justify-between bg-gray-900/80 backdrop-blur-md"
      >
        {/* Custom Dropdown Modal Selector */}
        <div
          ref={dropdownRef}
          className="relative w-full sm:w-auto shrink-0 border-b sm:border-b-0 sm:border-r border-gray-700"
        >
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-full h-full px-4 py-3 sm:py-0 flex items-center justify-between sm:justify-center gap-2 bg-gray-800 text-white rounded-none text-xs sm:text-sm cursor-pointer hover:bg-gray-700 transition-colors duration-150 focus:outline-none"
          >
            <span className="font-medium whitespace-nowrap">
              {selectedLabel}
            </span>
            <IoIosArrowDown
              className={`size-3.5 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown Modal List */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full sm:w-52 bg-gray-800 border border-gray-700 rounded-none shadow-2xl z-[999] py-1 max-h-60 overflow-y-auto">
              {SELECT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelectOption(option.value)}
                  className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm rounded-none transition-colors duration-150 flex items-center justify-between cursor-pointer ${
                    data.selectType === option.value
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-200 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>{option.label}</span>
                  {data.selectType === option.value && (
                    <span className="text-xs text-blue-200 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Field */}
        <input
          type="url"
          name="url"
          onChange={handleInputChange}
          value={data.url}
          id="url-input"
          className="border-t-0 text-white border-black rounded-none w-full text-sm sm:text-base focus:border-sky-500 focus:outline-none focus:ring-0 px-3 py-3 sm:py-0 placeholder-gray-400 bg-transparent"
          placeholder="Enter any youtube video url..."
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-white rounded-none text-black flex gap-2 items-center justify-center py-3 sm:py-0 px-8 shrink-0 transition-all duration-200 ease-in-out ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-blue-500 hover:text-white"
          }`}
        >
          <span className="text-sm sm:text-base font-medium">
            {isLoading ? "Loading..." : "Submit"}
          </span>
          {!isLoading && (
            <img src="rightArrow.png" alt="" className="size-5 shrink-0" />
          )}
        </button>
      </form>

      {err.ErrMsg && (
        <div className="w-full max-w-3xl flex items-center justify-center mt-6">
          <ErrDisplay err={err} />
        </div>
      )}

      {isLoading ? (
        <div className="w-full max-w-3xl flex items-center justify-center mt-6">
          <div className="w-fit max-w-md mx-auto flex items-center justify-center gap-2.5 bg-gray-900/90 text-blue-300 border border-blue-500/40 rounded-none px-5 py-2.5 shadow-xl backdrop-blur-md font-medium text-xs sm:text-sm tracking-wide animate-pulse">
            <MdOutlineSentimentVerySatisfied className="size-5 shrink-0 text-blue-400" />
            <span>Getting what you want, please wait...</span>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl p-1 sm:p-5 flex mt-6">
          <Response chatResponse={chatResponse} />
        </div>
      )}
    </div>
  );
};

export default UrlFeeding;
