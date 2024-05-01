import React, { useState } from "react";
import nit_logo from "../assets/nit_logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { ColorButton, Input } from "./Login";
import { Link, useNavigate } from "react-router-dom";
import handleError from "../utils/handleError";
import { registerSchema } from "../zod/registerSchema.zod";
import { registerApi } from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      // const payload = registerSchema.parse({ name, email, rollNumber, password })
      // await registerApi(payload)
      navigate("/")
    } catch (err) {
      handleError(err)
    } finally {
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
        <img src={nit_logo} alt="nit_logo" />
        <p className="text-2xl text-primary font-bold underline mt-2 mb-4">
          Register
        </p>
        <form className="flex flex-col justify-center items-center" onSubmit={handleRegister} >
          <div className="flex flex-col space-y-3">
            <Input
              Icon={<AccountCircleIcon />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              type="text"
              required
            />
            <Input
              Icon={<AccountCircleIcon />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />
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
          <ColorButton
            variant="contained"
            type="submit"
            style={{ marginTop: "10px" }}
            disabled={isLoading}
          >
            Register
          </ColorButton>
        </form>
        <p className="mt-4 font-bold">
          <span className="text-white">Already have an account? </span>
          <span className="text-primary underline">
            <Link to="/login">Signin</Link>
          </span>
        </p>
        <p className="mt-4 font-bold">
          <span className="text-white">Register as Admin </span>
          <span className="text-primary underline">
            <Link to="/admin-register">Signup</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
