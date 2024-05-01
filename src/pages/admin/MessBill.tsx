import { FC, useState } from "react";
import Navbar from "../../components/Navbar";
import useMe from "../../hooks/useMe";
import { ColorButton, Input } from "../Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import handleError from "../../utils/handleError";
import { addBillApi } from "../../api";

interface MessBillProps {}

const MessBill: FC<MessBillProps> = ({}) => {
  const me = useMe();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    rollNumber: "",
    month: "",
    year: "",
    amount: "",
  });

  const handleMessBill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await addBillApi({
        rollNumber: data.rollNumber,
        month: parseInt(data.month),
        year: parseInt(data.year),
        amount: Number(data.amount),
      });
      alert("Mess Bill Added Successfully")
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="homeBg h-screen">
      <Navbar me={me} />
      <div
        style={{
          marginTop: "2rem",
        }}
        className="flex justify-center items-center"
      >
        <div
          style={{
            background:
              "linear-gradient(180.03deg, rgba(217, 217, 217, 0.74) 2.4%, rgba(217, 217, 217, 0.43) 99.98%)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
            width: "50vw",
          }}
          className="p-3 rounded-md"
        >
          <p className="font-bold">Add Bill</p>
          <form className="flex flex-col space-y-3" onSubmit={handleMessBill}>
            <Input
              Icon={<AccountCircleIcon />}
              type="text"
              required
              value={data.rollNumber}
              onChange={(e) =>
                setData((prev) => ({ ...prev, rollNumber: e.target.value }))
              }
              placeholder="Enter Roll Number"
            />
            <Input
              Icon={<AccountCircleIcon />}
              type="number"
              required
              value={data.month}
              onChange={(e) =>
                // @ts-ignore
                setData((prev) => ({
                  ...prev,
                  month: Math.min(12, Math.max(1, parseInt(e.target.value))),
                }))
              }
              placeholder="Enter Month"
            />
            <Input
              Icon={<AccountCircleIcon />}
              type="number"
              required
              value={data.year}
              onChange={(e) =>
                // @ts-ignore
                setData((prev) => ({
                  ...prev,
                  year: Math.max(2023, parseInt(e.target.value)),
                }))
              }
              placeholder="Enter Year"
            />
            <Input
              Icon={<AccountCircleIcon />}
              type="number"
              required
              value={data.amount}
              onChange={(e) =>
                // @ts-ignore
                setData((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
              placeholder="Enter Amount"
            />
            <ColorButton variant="contained" type="submit" disabled={isLoading} >
              Add Bill
            </ColorButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessBill;
