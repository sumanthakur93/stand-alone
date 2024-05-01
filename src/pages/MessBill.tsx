import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useMe from "../hooks/useMe";
import {
  GetMessBillApiType,
  GetTransactionApiResponseApi,
  createMessBillOrder,
  getMessBillApi,
  getTransactionApi,
  verifyOrderApi,
} from "../api";
import handleError from "../utils/handleError";
import monthConvert from "../utils/monthConvert";

export default function MessBill() {
  const me = useMe();
  const [messBill, setMessBill] = useState<GetMessBillApiType[]>([]);
  const [transaction, setTransaction] = useState<
    GetTransactionApiResponseApi[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        // // const responses = await Promise.all([
        // //   getMessBillApi(),
        // //   getTransactionApi(),
        // ]);
        // setMessBill(responses[0].data);
        // setTransaction(responses[1].data);
      } catch (err) {
        handleError(err);
      }
    })();
  }, []);
  async function handlePayment(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (messBill.length === 0 || messBill[0].balance <= 0) {
      alert("Nothing to Pay");
      return;
    }
    setIsLoading(true);
    let amount = messBill[0].balance * 100;
    try {
      const { data } = await createMessBillOrder({
        amount,
        currency: "INR",
      });
      /**@ts-ignore */
      const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RZP_KEY_ID,
        amount,
        currency: "INR",
        name: me?.name,
        order_id: data.id,
        /**@ts-ignore */
        handler: async function (response) {
          try {
            setIsLoading(true);
            await verifyOrderApi({ ...response, amount });
          } catch (err) {
            handleError(err);
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: me?.name,
          email: me?.email,
        },
        theme: {
          color: "#481315",
        },
      });
      /**@ts-ignore */
      rzp.on("payment.failed", function (response) {
        handleError(response);
      });
      rzp.open();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="homeBg h-screen">
      <Navbar me={me} />
      <div
        style={{
          background:
            "linear-gradient(180.03deg, rgba(217, 217, 217, 0.74) 2.4%, rgba(217, 217, 217, 0.43) 99.98%)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
          marginTop: "2rem",
        }}
      >
        <p>Mess Bill</p>
        <table className="w-full">
          <thead>
            <th>S.No.</th>
            <th>Month</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Balance</th>
          </thead>
          <tbody>
            {messBill.map((item, index) => (
              <tr
                key={`${item.rollNumber}-${item.month}-${item.year}-${index}`}
                className="text-center border"
              >
                <td>{index + 1}</td>
                <td>{monthConvert(item.month)}</td>
                <td>{item.year}</td>
                <td>{item.amount}</td>
                <td>{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          background:
            "linear-gradient(180.03deg, rgba(217, 217, 217, 0.74) 2.4%, rgba(217, 217, 217, 0.43) 99.98%)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
          marginTop: "2rem",
        }}
      >
        <p>Transactions</p>
        <table className="w-full">
          <thead>
            <th>S.No.</th>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
          </thead>
          <tbody>
            {transaction.map((item, index) => (
              <tr
                key={`${item.razorpay_order_id}-${index}`}
                className="text-center border"
              >
                <td>{index + 1}</td>
                <td>{item.razorpay_payment_id}</td>
                <td>{item.createdAt.toString()}</td>
                <td>{item.amount/100}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="text-center w-full bg-primary text-white text-xl mt-3 p-3"
        onClick={handlePayment}
        disabled={isLoading}
      >
        Pay Mess Bill
      </button>
    </div>
  );
}
