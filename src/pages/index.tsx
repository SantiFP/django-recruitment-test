import Card from "@/components/Card";
import fs from "fs";
import path from "path";
import { Soap } from "../../types/types";
import { useState } from "react";

export default function Home(props: { data: Soap[] }) {
  const { data } = props;
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const totalAmountHandler = (amount: number) => {
    setTotalAmount((prevState: number) => prevState + amount);
  };
  return (
    <>
      <div className="totalItemsDiv">
        <p className="totalItemsParagraph">TOTAL ITEMS: {totalAmount}</p>
      </div>
      <ul className="ul">
        {data.map((el: Soap) => (
          <li className="listItems" key={el.id}>
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
