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
        <div className="allcenter gap-2 text-red-500 bg-amber-50 p-4 tracking-tighter font-semibold">
          <MdError className="size-6" />{err.ErrMsg}
        </div>
      )}
    </>
  );
};

export default ErrDisplay;
