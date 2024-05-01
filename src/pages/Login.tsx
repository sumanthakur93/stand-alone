import React, { useState } from "react";
import nitKkr from "../assets/nit_logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import handleError from "../utils/handleError";
import { loginSchema } from "../zod/loginSchema.zod";
// import { loginApi } from "../api";
import { ActionType, initialState } from '../redux/root';  
import { useDispatch } from 'react-redux';


export const ColorButton = styled(Button)({
  boxShadow: "none",
  backgroundColor: "#481315",
  "&:hover": {
    backgroundColor: "#481315",
  },
});

export default function Login() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      // const payload = loginSchema.parse({ rollNumber, password });
      // await loginApi(payload)
      dispatch({type:ActionType.USERLOGIN});
      console.log('Loginntbh')
      navigate("/");
    } catch (err) {
      handleError(err)
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="loginBg w-screen h-screen flex justify-center items-center">
      <div
        className="w-[350px] py-3 flex flex-col justify-center items-center"
        style={{
          background:
            "linear-gradient(180.03deg, rgba(217, 217, 217, 0.74) 2.4%, rgba(217, 217, 217, 0.43) 99.98%)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
          borderRadius: "20px",
        }}
      >
        <img src={nitKkr} alt="nit_logo" />
        <p className="text-2xl text-primary font-bold underline mt-2 mb-4">
          Login
        </p>
        <form className="flex flex-col justify-center items-center" onSubmit={handleLogin} >
          <div className="flex flex-col space-y-3">
            <Input
              Icon={<AccountCircleIcon />}
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Roll Number"
              type="text"
              required
            />
            <Input
              Icon={<LockOpenIcon />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <p className="my-3 font-bold">Forgot Password?</p>
          <ColorButton variant="contained" type="submit" disabled={isLoading}>
            Login
          </ColorButton>
        </form>
        <p className="mt-4 font-bold">
          <span className="text-white">Don't have an account? </span>
          <span className="text-primary underline">
            <Link to="/register">Signup</Link>
          </span>
        </p>
        <p className="mt-4 font-bold">
          <span className="text-white">Login as Admin </span>
          <span className="text-primary underline">
            <Link to="/admin-login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export function Input({
  Icon,
  value,
  onChange,
  placeholder,
  type,
  required,
}: {
  Icon: React.ReactNode;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="border rounded-3xl border-black p-1 bg-white flex space-x-2">
      {Icon}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="outline-none"
        required={required}
      />
    </div>
  );
}
