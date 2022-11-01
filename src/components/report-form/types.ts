import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const FirstStepFormSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(2, { message: "First name must have at least 2 characters" }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(2, { message: "Last name must have at least 2 characters" }),
  birthday: z.date({ required_error: "Date of birth is required" }),
  phoneNumber: z.number({ required_error: "Phone number is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  policyNumber: z
    .string({ required_error: "Policy number is required" })
    .min(1, { message: "Policy number is required" }),
});

export type FirstStepFormType = z.infer<typeof FirstStepFormSchema>;

const travelPurpose = z.enum(
  ["tourism", "study / mental work", "physical work", "high-risk sport"],
  { required_error: "Purpose of travel is required" }
);

export type TravelPurposeType = z.infer<typeof travelPurpose>;

export const SecondStepFormSchema = z.object({
  purposeOfTravel: travelPurpose,

  country: z
    .string({ required_error: "Country is required" })
    .min(1, "Country must have at least 1 character"),
  address: z
    .string({ required_error: "Address is required" })
    .min(2, "Address must have at least 2 characters"),
  date: z.date({ required_error: "Date is required" }),
  incidentDescription: z
    .string({ required_error: "Description is required" })
    .min(3, "Description must have at least 3 characters")
    .max(300, "Descripbtion must be 300 or fewer characters long"),
});

export type SecondStepFormType = z.infer<typeof SecondStepFormSchema>;

export const ThirdStepFormSchema = z.object({
  expenseReport: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
    })
  ),
});

export type ThirdStepFormType = z.infer<typeof ThirdStepFormSchema>;

export type FormsCollection = {
  firstStep: FirstStepFormType;
  secondStep: SecondStepFormType;
  thirdStep: ThirdStepFormType;
};

export type FormContentType =
  | { step: 1; values: FirstStepFormType }
  | { step: 2; values: SecondStepFormType }
  | { step: 3; values: ThirdStepFormType };

export type onPageSubmit = () => void;

export const AllFormsValidator = zodResolver(
  z.object({
    firstStep: FirstStepFormSchema,
    secondStep: SecondStepFormSchema,
    thirdStep: ThirdStepFormSchema,
  })
);
