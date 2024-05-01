import React, { useEffect, useState } from "react";
import useMe from "../hooks/useMe";
import Navbar from "../components/Navbar";
import * as Dialog from "@radix-ui/react-dialog";
import handleError from "../utils/handleError";
import { GetRebateApiResponseType, addRebateApi, getRebateApi, delRebateApi } from "../api";

export default function Rebate() {
  const me = useMe();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rebate, setRebate] = useState<GetRebateApiResponseType[]>([])

  useEffect(() => {
    (async () => {
      try {
        // const responses = await Promise.all([getRebateApi()])
        // setRebate(responses[0].data)
      } catch (err) { }
    })()
  }, [])

  async function handleSaveChanges(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if ((new Date(to).getTime() - new Date(from).getTime()) <= 0) {
      alert("to should be greater than from")
      return
    }
    setIsLoading(true);
    try {
      await addRebateApi({
        from,
        to,
        /**@ts-ignore */
        rollNumber: me?.rollNumber as string,
        days: Math.ceil(
          (new Date(to).getTime() - new Date(from).getTime()) /
          (1000 * 3600 * 24)
        ),
      });
      window.location.reload();

    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  } 

  async function handleDelete(rebateId: string) {
    try {
        console.log(rebateId);
      await delRebateApi( {rebateId }); 
      // Refresh rebate data after successful deletion

      const responses = await Promise.all([getRebateApi()])
      setRebate(responses[0].data)

    } catch (err) {
      handleError(err);
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
        <p>Rebate</p>
        <table className="w-full">
          <thead>
            <th>S.No.</th>
            <th>Rebate Id</th>
            <th>No. of Days</th>
            <th>From</th>
            <th>To</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {rebate.map((ele, index) => (
              <tr key={`${ele.rebateId}`} className="text-center border" >
                <td>{index + 1}</td>
                <td>{ele.rebateId}</td>
                <td>{ele.days}</td>
                <td>{ele.from}</td>
                <td>{ele.to}</td>
                <td>
                  <button onClick={() => handleDelete(ele.rebateId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="text-center w-full bg-primary text-white text-xl mt-3 p-3">
            Add Rebate
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Add Rebate
            </Dialog.Title>
            {/* <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description> */}
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="name"
              >
                From
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                defaultValue="Pedro Duarte"
                type="date"
                onChange={(e) => setFrom(e.target.value)}
                value={from}
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="username"
              >
                To
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="username"
                defaultValue="@peduarte"
                type="date"
                onChange={(e) => setTo(e.target.value)}
                value={to}
              />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              {/* <Dialog.Close asChild> */}
              <button
                className="text-center w-full bg-primary text-white text-xl mt-3 p-3"
                onClick={handleSaveChanges}
                disabled={isLoading}
              >
                Save Changes
              </button>
              {/* </Dialog.Close> */}
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                {/* <Cross2Icon /> */}
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
