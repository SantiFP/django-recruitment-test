import { ChangeEvent, useState } from "react";
import { SoapCard } from "../../types/types";
import Image from "next/image";

const Card = (props: SoapCard) => {
  const { name, price, img, description, totalAmountHandler } = props;

  const [amount, setAmount] = useState<number>(1);
  const [titleSize, setTitleSize] = useState<number>(18);
  const [title, setTitle] = useState<string>(name);

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
    <form onSubmit={formHandler} className="form">
      <div className="cardDiv">
        <Image
          width={160}
          height={96}
          className="mx-auto rounded-lg h-auto"
          src={img}
          alt="soap"
          style={{ width: "auto" }}
        />
        <p style={{ fontSize: titleSize }} className="title">
          {title}
        </p>
        <label htmlFor="edit">Edit product title below!!</label>
        <input
          className="input"
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
        <div className="amountDiv">
          <p className="text-lg font-bold">${(amount * price).toFixed(2)}</p>
          <p className="amount">{amount}</p>
        </div>
        <div className="amountButtonsDiv">
          <button
            onClick={() => {
              amountHandler("-");
            }}
            className="amountButton"
          >
            -
          </button>
          <button
            onClick={() => {
              amountHandler("+");
            }}
            className="amountButton"
          >
            +
          </button>
        </div>
        <p className="text-sm font-extralight ">{description}</p>
        <div className="addToCartDiv">
          <button
            onClick={totalAmountHandler.bind(null, amount)}
            className="button"
          >
            Add to cart
          </button>
          <p className="underline">Learn More</p>
        </div>
      </div>
    </form>
  );
};
export default Card;
