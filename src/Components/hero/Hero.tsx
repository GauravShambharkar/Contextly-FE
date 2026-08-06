
const Hero = () => {
  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="text-white flex flex-col justify-center items-center gap-3 sm:gap-5 w-full max-w-2xl text-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <span className="w-14 sm:w-20">
            <img src="Contextly.svg" className="w-14 sm:w-20" alt="Contextly Logo" />
          </span>
          <div className="relative flex justify-center items-center w-full py-2">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold absolute tracking-tighter select-none">
              Contextly
            </h1>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold absolute blur-2xl tracking-tighter select-none">
              Contextly
            </h1>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold blur-3xl tracking-tighter select-none">
              Contextly
            </h1>
          </div>
        </div>
        <div className="relative flex justify-center items-center w-full max-w-lg mt-2">
          <p className="text-[#dedede] w-full text-center mix-blend-overlay px-4 text-sm sm:text-base leading-relaxed">
            Skip the fluff. Get straight to what matters — the main points and
            conclusions, instantly.
          </p>
          <p className="text-[#dedede] w-full absolute text-center mix-blend-overlay px-4 text-sm sm:text-base leading-relaxed">
            Skip the fluff. Get straight to what matters — the main points and
            conclusions, instantly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
