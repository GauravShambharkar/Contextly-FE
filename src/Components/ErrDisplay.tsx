import React from "react";

type errTypeProp = {
  err: boolean;
  ErrMsg: string;
};

type errState = {
  err: errTypeProp;
};

const ErrDisplay: React.FC<errState> = ({ err }) => {
  return (
    <div>
      <h1 className="text-white" >{err.ErrMsg}</h1>
    </div>
  );
};

export default ErrDisplay;
