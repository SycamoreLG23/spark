import { useState } from "react";
import { gratitudeVerses } from "../util/gratitudeVerses";
import { FaQuoteLeft } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
const RandomBlessing = () => {
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * gratitudeVerses.length)
  );

  const randomVerse = gratitudeVerses[randomIndex];

  const generateNewBlessing = () => {
    setRandomIndex(Math.floor(Math.random() * gratitudeVerses.length));
  };
  return (
    <>
      <Link to="/spark/">
        <IoMdArrowRoundBack className="w-5 h-5 md:ml-4 mb-4 md:h-6 md:w-6" />
      </Link>
      <div className=" max-w-[600px] mx-auto relative">
        <div className="w-full h-full rounded-lg p-6 px-7 md:p-8 md:px-9 bg-[#e8f2d7] relative">
          <p className="font-bold mb-2">{randomVerse.scripture}</p>
          <p>{randomVerse.text}</p>
          <FaQuoteLeft className="absolute top-6 left-2 md:top-7 md:left-3 md:w-5 md:h-5  text-[#3b5f5f78]" />
        </div>
        <p className="mt-2 text-[0.9em]">
          For more blessings visit{" "}
          <a
            className="font-bold text-[#3b5f5f] link-underline link-underline-black pb-1"
            href="https://sycamore.church/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sycamore Church
          </a>
        </p>
        <button
          className="w-fit mx-auto block mt-4 bg-[#003333] text-white rounded-lg p-2 hover:bg-[#003333]/80 duration-500"
          type="button"
          onClick={generateNewBlessing}
        >
          Generate New Blessing
        </button>
      </div>
    </>
  );
};

export default RandomBlessing;
