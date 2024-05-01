import axios from "axios";
import { RegisterSchemaType } from "../zod/registerSchema.zod";
import { LoginSchemaType } from "../zod/loginSchema.zod";
import { z } from "zod";
import { AdminRegisterSchemaType } from "../zod/adminRegister.zod";
import { AdminLoginSchemaType } from "../zod/adminLogin.zod";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const registerApi = (payload: RegisterSchemaType) =>
  api.post("/api/auth/register", payload);

export const adminRegisterApi = (payload: AdminRegisterSchemaType) => api.post("/api/auth/admin-register",payload)
export const adminLoginApi = (payload: AdminLoginSchemaType) => api.post("/api/auth/admin-login",payload)

// export const loginApi = (payload: LoginSchemaType) =>
//   api.post("/api/auth/login", payload);

export const refreshApi = () => api.post("/api/auth/refresh");

export const MeApiResponseSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    roles: z.string(),
    profilePhotoId: z.string(),
    verified: z.boolean(),
    rollNumber: z.string(),
  })
  .strict();
export type MeApiResponseType = z.infer<typeof MeApiResponseSchema>;
// export const meApi = () => api.get<MeApiResponseType>("/api/auth/me");

export const AdminApiResponseSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  roles: z.string(),
  profilePhotoId: z.string(),
  adminId: z.number().int(),
}) 
export type AdminApiResponseType = z.infer<typeof AdminApiResponseSchema>
// export const adminApi = () => api.get<AdminApiResponseType>("/api/auth/admin");

export const logoutApi = () => api.get("/api/auth/logout");

export const GetMessBillApiSchema = z.object({
  rollNumber: z.string(),
  amount: z.number(),
  balance: z.number(),
  month: z.number(),
  createdAt: z.string().datetime(),
  year: z.number(),
});
export type GetMessBillApiType = z.infer<typeof GetMessBillApiSchema>;
export const getMessBillApi = () =>
  api.get<GetMessBillApiType[]>("/api/messBill/get");

export type CreateMessBillOrderPayloadType = {
  amount: number;
  currency: string;
};
export type CreateMessBillOrderResponseType = {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: any[];
  offer_id: null;
  receipt: null;
  status: string;
};
export const createMessBillOrder = (payload: CreateMessBillOrderPayloadType) =>
  api.post<CreateMessBillOrderResponseType>(
    "/api/messBill/createOrder",
    payload
  );

export type VerifyOrderApiPayloadType = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  amount: number;
};
export const verifyOrderApi = (payload: VerifyOrderApiPayloadType) =>
  api.post("/api/messBill/verifyOrder", payload);

export type GetTransactionApiResponseApi = {
  amount: number;
  createdAt: Date;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  rollNumber: string;
};
export const getTransactionApi = () =>
  api.get<GetTransactionApiResponseApi[]>("/api/messBill/getTransaction");

export type delRebateApiPayloadType = {
  rebateId: string;
};

export const delRebateApi = (payload: delRebateApiPayloadType) => api.post("/api/rebate/delRebate", payload)
export const AdminDelRebateApi = (payload: delRebateApiPayloadType) => api.post("/api/rebate/admin/delRebate", payload);

export type AddRebateApiPayloadType = {
  rollNumber: string;
  days: number;
  from: string;
  to: string;
};

export const addRebateApi = (payload: AddRebateApiPayloadType) =>
  api.post("/api/rebate/addRebate", payload);

export type GetRebateApiResponseType = {
  rebateId: string;
  rollNumber: string;
  from: string;
  to: string;
  days: number;
};   
export const getRebateApi = () =>
  api.get<GetRebateApiResponseType[]>("/api/rebate/getRebate");

export const getAdminRebateApi = () =>
  api.get<GetRebateApiResponseType[]>("/api/rebate/admin-getRebate");

export const updateProfilePhotoIdApi = (payload: { profilePhotoId: string }) =>
  api.post("/api/profile/update/profilePhotoId", payload);

export type AddBillApiPayload = {
  rollNumber: string;
  month: number;
  year: number;
  amount: number;  
}
export const addBillApi = (payload: AddBillApiPayload) => api.post("/api/messBill/addBill",payload);
