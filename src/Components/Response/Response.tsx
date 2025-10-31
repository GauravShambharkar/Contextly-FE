import React, { useState } from "react";
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";
import ReactPlayer from "react-player";

type StateType = {
  title: string | null;
  channel: string | null;
  summary: string | null;
  url: string | null;
};

type responseTypeProp = {
  chatResponse: StateType;
};

const Response: React.FC<responseTypeProp> = ({ chatResponse }) => {
  const [copy, setCopy] = useState<boolean>(false);

  function copyToClipboard() {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 5000);
    navigator.clipboard.writeText(chatResponse.summary!);
  }

  if (!chatResponse.summary) return null;
  return (
    <>
      {chatResponse.summary && (
        <div className="allcenter w-full gap-2 text-white p-4 tracking-tighter flex flex-col">
          {/* title */}
          <span className="flex gap-2 w-full">
            <label className="" htmlFor="">
              Title :
            </label>
            <h3 className="text-[#b3d3ff]">
              {chatResponse.title ? chatResponse.title : "N/A"}
            </h3>
          </span>
          {/* channel */}
          <span className="flex gap-2 w-full">
            <label className="" htmlFor="">
              Channel :
            </label>
            <h3 className="text-[#b3d3ff]">
              {chatResponse.channel ? chatResponse.channel : "N/A"}
            </h3>
          </span>
          {/* url */}
          <span className="gap-2 w-full">
            <label className="" htmlFor="">
              Url :
            </label>
            {/* <a
              target="_blank"
              href={chatResponse.url ?? "#"}
              className="text-[#b8d5ff]"
            >
              {chatResponse.url ? chatResponse.url : "N/A"}
            </a> */}
            <div className="w-full h-90 px-5">
              <ReactPlayer
              className="h-full"
                src={chatResponse.url!}
                // url={chatResponse.url ?? ""}
                controls
                width="100%"
                height="100%"
              />
            </div>
          </span>
          {/* summary */}
          <span className="gap-2 w-full">
            <div className="w-full flex justify-between">
              <label className="" htmlFor="">
                Summary :
              </label>
              {!copy ? (
                <TbCopy
                  onClick={copyToClipboard}
                  className="text-white size-6 cursor-pointer hover:text-blue-200 transition-all duration-300 ease-in-out"
                />
              ) : (
                <TbCopyCheckFilled className="text-white size-6" />
              )}
            </div>
            <h3 className="text-[#b3d3ff]">
              {(chatResponse.summary ?? "")
                .split(/\n\n|\n/) // regex handles both cases
                .map((text, i) => (
                  <p key={i}>{text ? text : "N/A"}</p>
                ))}
            </h3>
          </span>
        </div>
      )}
    </>
  );
};

export default Response;
