import React from "react";
import Image from "next/image";

const Prizes = ({ prizes, prizeIndex, isDoubled }) => {
  return (
    <div className="flex flex-col-reverse gap-3 pt-14 pl-10">
      {prizes.map((prize, index) => {
        return (
          <div
            key={index}
            className={`p-2 text-white flex justify-center items-center border-2 border-white rounded-full w-72
            ${prizeIndex == index ? "bg-[#CEB239]" : ""} 
            `}
          >
            <p className="text-3xl flex items-center gap-2">
              {" "}
              <span>
                <Image src="/wine-glass.png" width={24} height={24} alt="" />
              </span>{" "}
              {prize}
              {isDoubled ? "(2x)" : ""}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Prizes;
