import LoadingSpinner from "../UI/LoadingSpinner";

type Props = {
  text: string;
  loading?: boolean;
  type: "submit" | "button";
  disable?: boolean;
};

const PrimaryButton = (props: Props) => {
  return (
    <button
      className="text-white w-full bg-[#003333] rounded-lg py-3 hover:bg-[#003333]/80 duration-500 disabled:cursor-not-allowed"
      disabled={props.disable}
      type={props.type}
    >
      {props.loading ? <LoadingSpinner /> : props.text}
    </button>
  );
};

export default PrimaryButton;
