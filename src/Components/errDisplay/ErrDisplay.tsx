import React from "react";
import { MdError } from "react-icons/md";

type errTypeProp = {
  ErrMsg: string | null;
};

type errStateProp = {
  err: errTypeProp;
};

const ErrDisplay: React.FC<errStateProp> = ({ err }) => {
  return (
    <>
      {err.ErrMsg && (
        <div className="w-fit max-w-md mx-auto flex items-center justify-center gap-2 bg-gray-900/90 text-red-300 border border-red-500/40 rounded-none px-5 py-2.5 shadow-xl backdrop-blur-md font-medium text-xs sm:text-sm tracking-wide break-words text-center">
          <MdError className="size-4 sm:size-5 text-red-400 shrink-0" />
          <span>{err.ErrMsg}</span>
        </div>
      )}
    </>
  );
};

export default ErrDisplay;
