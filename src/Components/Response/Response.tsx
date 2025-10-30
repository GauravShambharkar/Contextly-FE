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
  return (
    <>
      {chatResponse.summary && (
        <div className="allcenter gap-2 text-white p-4 tracking-tighter flex flex-col">
          {/* title */}
          <label htmlFor="">Title</label>
          <h3>{chatResponse.title}</h3>
          {/* channel */}
          <h3>{chatResponse.channel}</h3>
          {/* url */}
          <h3>{chatResponse.url}</h3>
          {/* summary */}
          <h3>{chatResponse.summary}</h3>
        </div>
      )}
    </>
  );
};

export default Response;
