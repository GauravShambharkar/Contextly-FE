import React from "react";

type CheckBoxedProps = {
  checkBoxHandler: { id: number; name: string }[];
};

const CheckBoxed: React.FC<CheckBoxedProps> = ({ checkBoxHandler }) => {
  return (
    <div>
      <form className="flex gap-2" action="">
        {checkBoxHandler.map((item) => (
          <label
            key={item.id}
            htmlFor={item.name}
            className="flex justify-center items-center px-3 py-1 gap-2 rounded-md cursor-pointer"
          >
            <input
              type="radio"
              id={item.name}
              name="contentType"
              value={item.name}
              className="size-5 rounded-none cursor-pointer"
            />
            <span className="text-white">{item.name}</span>
          </label>
        ))}
      </form>
    </div>
  );
};

export default CheckBoxed;
