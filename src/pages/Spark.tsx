import { IoMdArrowRoundBack } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Spark = () => {
  const text = `Jesus, I have confident hope in you. In the highs, lows, and in-between, I am never afraid because with you, I am bold and would always win.

Jesus, I have confident hope in you. I may be pressed hard on every side, struck down but not destroyed because in you my strength abides.

Jesus, I have confident hope in you. Though the seas of life may rage and wind may blow, I am not swallowed up because with you, I am safe, and it's so good to know.

Jesus, I have confident hope in you. There may be so many voices that try to push my life into a tantrum, but because of you, I know peace through the storm.

Jesus, I have confident hope in you. I may be misunderstood and mistreated, but because of you, I belong, and I am loved.

Hope, a radiant beam of sunlight, Illuminating our weary hearts. But sometimes, shadows loom, casting doubts, Dimming that brilliant hope's part.

Yet, remember a man, JESUS adorned in splendid attire, crowned with love's grace and care. He calls to us, offering more light, While distractions cloud our air.

He beckons us to trust in Him, in Hope's embrace, yet impatience makes us leap away. Still, He persists, shining ever bright, will you cast off doubt and stay?

Hope, like sunlight, shines so bright, But doubts can dim its guiding light. Jesus stands, full of love and grace, Calling us to a brighter place.

Despite distractions, He's always near, His light of hope, forever clear. Will you trust Him, without delay, And let His love light up your way?`;

  const paragraphs = text.split('\n').map((paragraph, index) => (
    <p key={index} className="text-left">{paragraph}</p>
  ));

  return (
    <>
          <Link to="/spark/">
        <IoMdArrowRoundBack className="w-5 h-5 md:ml-4 mb-4 md:h-6 md:w-6" />
      </Link>
      <div className="max-w-[600px] mx-auto relative">
      <div className="mb-4 break-before-all">In the midst of life's challenges, this poem is a profound expression of unwavering hope and faith in Jesus. It beautifully encapsulates the promise of hope and love found in a connection with Christ.</div>

        <div className="w-full h-full rounded-lg p-6 px-7 md:p-8 md:px-9 bg-[#e8f2d7] relative text-[#3b5f5f]">
        <p className="font-bold mb-2">THE PROMISE OF HOPE</p>

          <div className="gap-3 grid">{paragraphs}</div>
          <FaQuoteLeft className="absolute top-6 left-2 md:top-7 md:left-3 md:w-5 md:h-5 text-[#3b5f5f78]" />
        </div>
        <p className="mt-2 text-[0.9em]">
          To learn more about the promise of hope, visit{" "}
          <a
            className="font-bold text-[#3b5f5f] link-underline link-underline-black pb-1"
            href="https://sycamore.church/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sycamore Church
          </a>.
        </p>
        </div>
    </>
  );
};

export default Spark;
