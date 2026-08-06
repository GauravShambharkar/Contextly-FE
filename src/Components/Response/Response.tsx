import React, { useState, useEffect, useRef } from "react";
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

/**
 * Helper to extract YouTube video ID and generate a reliable embed URL
 */
function getYouTubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=0&rel=0`
    : null;
}

const Response: React.FC<responseTypeProp> = ({ chatResponse }) => {
  const [copy, setCopy] = useState<boolean>(false);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatResponse && chatResponse.summary && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [chatResponse]);

  function copyToClipboard() {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 5000);
    navigator.clipboard.writeText(chatResponse.summary!);
  }

  if (!chatResponse || !chatResponse.summary) return null;

  const embedUrl = getYouTubeEmbedUrl(chatResponse.url);

  return (
    <>
      {chatResponse.summary && (
        <div 
          ref={responseRef}
          className="w-full gap-4 text-white p-3 sm:p-6 bg-gray-900/80 backdrop-blur-md rounded-none border border-[#ffffffba] shadow-2xl tracking-normal flex flex-col"
        >
          {/* title */}
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full text-sm sm:text-base">
            <span className="font-semibold text-gray-300 shrink-0">Title:</span>
            <h3 className="text-[#b3d3ff] font-medium break-words">
              {chatResponse.title ? chatResponse.title : "N/A"}
            </h3>
          </div>

          {/* channel */}
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full text-sm sm:text-base">
            <span className="font-semibold text-gray-300 shrink-0">Channel:</span>
            <h3 className="text-[#b3d3ff] font-medium break-words">
              {chatResponse.channel ? chatResponse.channel : "N/A"}
            </h3>
          </div>

          {/* video url player */}
          {chatResponse.url && (
            <div className="w-full my-2 flex flex-col gap-2">
              <span className="font-semibold text-gray-300 text-sm sm:text-base">Video:</span>
              <div className="w-full aspect-video rounded-none border border-gray-700 overflow-hidden shadow-md bg-black">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={chatResponse.title || "YouTube Video Player"}
                    className="w-full h-full border-0 rounded-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  (() => {
                    const Player = ReactPlayer as any;
                    return (
                      <Player
                        url={chatResponse.url ?? ""}
                        controls
                        width="100%"
                        height="100%"
                      />
                    );
                  })()
                )}
              </div>
            </div>
          )}

          {/* summary */}
          <div className="w-full flex flex-col gap-2 mt-1">
            <div className="w-full flex justify-between items-center border-b border-gray-700/60 pb-2">
              <span className="font-semibold text-gray-200 text-base sm:text-lg">
                Summary:
              </span>
              {!copy ? (
                <TbCopy
                  onClick={copyToClipboard}
                  className="text-white size-5 sm:size-6 cursor-pointer hover:text-blue-300 transition-all duration-200"
                  title="Copy Summary"
                />
              ) : (
                <TbCopyCheckFilled className="text-green-400 size-5 sm:size-6" title="Copied!" />
              )}
            </div>
            <div className="text-[#b3d3ff] text-sm sm:text-base leading-relaxed break-words space-y-2 mt-1">
              {(chatResponse.summary ?? "")
                .split(/\n\n|\n/) // regex handles both cases
                .map((text, i) => (
                  <p key={i} className="mb-2 last:mb-0">{text ? text : "N/A"}</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Response;
