import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="text-white flex flex-col justify-center items-center gap-5">
        <div className="flex flex-col justify-center items-center gap-2">
          <span className="w-20">
            <img src="Contextly.svg" className="w-20" alt="Contextly.svg" />
          </span>
          <div className="text">
            <h1 className="text-8xl font-bold absolute tracking-tighter">
              Contextly
            </h1>
            <h1 className="text-8xl font-bold absolute blur-2xl tracking-tighter">
              Contextly
            </h1>
            <h1 className="text-8xl font-bold blur-3xl tracking-tighter">
              Contextly
            </h1>
          </div>
        </div>
        <p className="text-[#dedede] w-150 text-center">
          Save your time, instead of wasting it on clickbate videos, get quick
          context, conclusion, summary in few seconds!
        </p>
      </div>
    </div>
  );
};

export default Hero;
