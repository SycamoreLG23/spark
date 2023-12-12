import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type Props = {
  time: Date;
  text: string;
  selectedItem: string | null;
  setSelectedItem: (item: string | null) => void;
  onDelete: () => void;
}

const GratitudeCard: React.FC<Props> = ({
  text,
  time,
  selectedItem,
  setSelectedItem,
  onDelete,
}) => {
  const maxLines = 4;
  const [showFullText, setShowFullText] = useState(false);
  const [longText, setLongText] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(
        getComputedStyle(textRef.current).lineHeight || "0",
        10
      );
      const maxHeight = lineHeight * maxLines;
      setLongText(textRef.current.clientHeight >= maxHeight);
    }
  }, [text, maxLines]);

  const toggleShowFullText = () => {
    setShowFullText((prev) => !prev);
  };

  const deleteHandler = async () => {
    await onDelete();
    setShowMenu(false);
  };

  return (
    <li
      className="max-w-[600px] mx-auto z-0 relative bg-[#e8f2d7] rounded-lg p-6 px-7 md:p-8 md:px-9 w-full"
      onClick={() => {
        setShowMenu(false);
        setSelectedItem(null);
      }}
    >
      <div className="flex justify-between border-b border-[#0000003d] mb-2">
        <p className="text-sm text-gray-500">{formatDistanceToNow(time)} ago</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(time.toString());
            setShowMenu((prev) =>
              selectedItem != time.toString() ? true : !prev
            );
          }}
        >
          <HiOutlineDotsHorizontal className=" text-[#4b4b4bc0] z-10" />
        </button>
      </div>
      <p
        ref={textRef}
        className={`${
          longText && !showFullText ? "line-clamp-4" : ""
        } break-all `}
      >
        {text}
      </p>
      {longText && (
        <button
          className="text-[#847e7e] text-sm hover:underline duration-300"
          onClick={toggleShowFullText}
        >
          {showFullText ? "Read Less" : "Read More"}
        </button>
      )}
      {showMenu && selectedItem === time.toString() && (
        <>
          <div className="z-[10] absolute p-2 rounded-lg bg-white top-11 right-6">
            <button onClick={deleteHandler} className="text-sm text-red-700">
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default GratitudeCard;
