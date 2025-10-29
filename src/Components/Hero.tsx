import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="text-white flex flex-col justify-center items-center gap-5 ">
        <div className="flex flex-col justify-center items-center gap-2 ">
          <span className="w-20">
            <img src="Contextly.svg" className="w-20" alt="Contextly.svg" />
          </span>
          <div className="text ">
            <h1 className="text-8xl font-bold absolute tracking-tighter max-[430px]:text-4xl">
              Contextly
            </h1>
            <h1 className="text-8xl font-bold absolute blur-2xl tracking-tighter max-[430px]:text-4xl">
              Contextly
            </h1>
            <h1 className="text-8xl font-bold blur-3xl tracking-tighter max-[430px]:text-4xl">
              Contextly
            </h1>
          </div>
        </div>
        <div className="flex">
          <p className="text-[#dedede] w-150 text-center mix-blend-overlay max-[430px]:w-100 px-3  max-[400px]:w-90">
            Skip the fluff. Get straight to what matters <br /> — the main points and
            conclusions, instantly.
          </p>
          <p className="text-[#dedede] w-150 absolute text-center mix-blend-overlay max-[430px]:w-100 px-3 max-[400px]:w-90">
            Skip the fluff. Get straight to what matters <br />  — the main points and
            conclusions, instantly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
