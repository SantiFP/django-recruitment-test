import Card from "@/components/Card";
import fs from "fs";
import path from "path";
import { Soap } from "../../types/types";
import { useState } from "react";

export default function Home(props: { data: Soap[] }) {
  const [totalAmount, setTotalAmount] = useState(7);
  const { data } = props;

  const totalAmountHandler = (amount: number, operation: string) => {
    operation === "+" && setTotalAmount((prevState: number) => prevState + 1);
    operation === "-" &&
      setTotalAmount((prevState: number) =>
        prevState === 7 ? 7 : prevState - 1
      );
  };
  return (
    <>
      <div className=" flex justify-center mt-2">
        <p className="fixed bg-zinc-800 w-fit px-4 py-1 text-white text-3xl">
          TOTAL ITEMS: {totalAmount}
        </p>
      </div>
      <ul className="flex flex-wrap mt-14 ml-3">
        {data.map((el: Soap) => (
          <li
            className="w-5/6 mx-auto mb-4 lg:mx-0 lg:w-1/6 lg:mr-4 "
            key={el.id}
          >
            <Card
              name={el.name}
              description={el.description}
              price={el.price}
              img={el.img}
              totalAmountHandler={totalAmountHandler}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), "api", "soaps.json");

    const fileContent = await fs.promises.readFile(filePath, "utf8");

    const data = JSON.parse(fileContent);

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data");

    return {
      props: {
        data: null,
      },
    };
  }
}
