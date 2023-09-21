import { ChangeEvent, useState } from "react";
import { SoapCard } from "../../types/types";
import Image from "next/image";

const Card = (props: SoapCard) => {
  const { name, price, img, description, totalAmountHandler } = props;

  const [amount, setAmount] = useState<number>(1);
  const [title, setTitle] = useState<string>(name);
  const [titleSize, setTitleSize] = useState(18);

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const amountHandler = (operation: string) => {
    operation === "+" && setAmount((prevState: number) => prevState + 1);
    operation === "-" &&
      setAmount((prevState: number) => (prevState !== 1 ? prevState - 1 : 1));
  };

  const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    !e.target.value && setTitle(name);
  };

  const titleSizeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleSize(Number(e.target.value));
  };

  return (
    <form onSubmit={formHandler} className="border-2 py-8 border-black ">
      <div className="w-5/6 mx-auto flex flex-col space-y-4 ">
        <Image
          width={160}
          height={96}
          className="mx-auto rounded-lg"
          src={img}
          alt="soap"
        />
        <p style={{ fontSize: titleSize }} className={`text-lg font-bold `}>
          {title}
        </p>
        <label htmlFor="edit">Edit product title below!!</label>
        <input
          className="border-2 pl-2 py-1 outline-none border-gray-300"
          id="edit"
          type="text"
          placeholder="Edit title!!"
          onChange={titleHandler}
        />
        <label className="text-sm" htmlFor="vol">
          Change the font size of the title!!
        </label>
        <input
          onChange={titleSizeHandler}
          type="range"
          id="vol"
          name="vol"
          min="14"
          max="28"
          value={titleSize}
        />
        <div className="flex flex-row space-x-3 justify-center pt-2 w-full items-center lg:pl-2 lg:justify-normal">
          <p className="text-lg font-bold">${(amount * price).toFixed(2)}</p>
          <p className=" border-2 border-gray-400 px-5 py-1 ">{amount}</p>
        </div>
        <div className="flex flex-row justify-center space-x-2 text-white">
          <button
            onClick={() => {
              amountHandler("-");
              totalAmountHandler(amount,'-');
            }}
            className="bg-zinc-800 px-5 pb-2 pt-1 h-full"
          >
            -
          </button>
          <button
            onClick={() => {
              amountHandler("+");
              totalAmountHandler(amount,'+')
            }}
            className="bg-zinc-800 px-5 pb-2 pt-1 h-full"
          >
            +
          </button>
        </div>
        <p className="text-sm font-extralight ">{description}</p>
        <div className="flex flex-col items-center space-y-4">
          <button className="bg-gray-300 border-2 border-black w-fit px-4 py-1 ">
            Add to cart
          </button>
          <p className="underline">Learn More</p>
        </div>
      </div>
    </form>
  );
};
export default Card;
