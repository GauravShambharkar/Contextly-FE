import React from "react";

type StateType = {
  title: string | null;
  channel: string | null;
  summary: string | null;
  url: string | null;
};

type responseTypeProp = {
  setChatResponse: React.Dispatch<React.SetStateAction<StateType>>;
  chatResponse: StateType;
};

const Response: React.FC<responseTypeProp> = ({
  setChatResponse,
  chatResponse,
}) => {
  if (!chatResponse.summary) return null;
  return (
    <>
      {chatResponse.summary && (
        <div className="allcenter gap-2 text-white p-4 tracking-tighter flex flex-col">
          {/* title */}
          <span className="flex gap-2 w-full">
            <label className="" htmlFor="">
              Title :
            </label>
            <h3 className="text-[#b3d3ff]">{chatResponse.title}</h3>
          </span>
          {/* channel */}
          <span className="flex gap-2 w-full">
            <label className="" htmlFor="">
              Channel :
            </label>
            <h3 className="text-[#b3d3ff]">{chatResponse.channel}</h3>
          </span>
          {/* url */}
          <span className="flex gap-2 w-full">
            <label className="" htmlFor="">
              Url :
            </label>
            <a
              target="_blank"
              href={chatResponse.url ?? "#"}
              className="text-[#b8d5ff]"
            >
              {chatResponse.url}
            </a>
          </span>
          {/* summary */}
          <span className="gap-2 w-full">
            <label className="" htmlFor="">
              Summary :
            </label>
            <h3 className="text-[#b3d3ff]">
              {(chatResponse.summary ?? "")
                .split(/\n\n|\n/) // ✅ regex handles both cases
                .map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
            </h3>
          </span>
        </div>
      )}
    </>
  );
};

export default Response;
