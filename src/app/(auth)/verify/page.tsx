"use client";

import { Toast } from "@/lib/alert";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object({
  otpCode: Yup.number().min(4, "Must be 4").required("Required"),
});

export default function VerifyOtp() {
  const router = useRouter();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verify your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{ otpCode: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              setTimeout(async () => {
                const res = await fetch("/api/auth/verify-otp", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });

                if (!res.ok) {
                  Toast.fire<any>({
                    icon: "error",
                    title: "Verified failed",
                  });
                  actions.setSubmitting(false);
                  return;
                }

                Toast.fire<any>({
                  icon: "success",
                  title: "Verified successfully",
                });

                router.push("/login");
                actions.setSubmitting(false);
                actions.resetForm();
                return;
              }, 1000);
            }}
          >
            {(props) => (
              <Form className="space-y-6" onSubmit={props.handleSubmit}>
                <div>
                  <label
                    htmlFor="otpCode"
                    className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
                  >
                    <span>OTP Code</span>
                    {props.touched.otpCode && props.errors.otpCode && (
                      <span className="text-red-blood">
                        {props.errors.otpCode}
                      </span>
                    )}
                  </label>
                  <div className="mt-2">
                    <Field
                      id="otpCode"
                      name="otpCode"
                      type="number"
                      onChange={props.handleChange}
                      value={props.values.otpCode}
                      disabled={props.isSubmitting}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-red-blood focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={props.isSubmitting}
                  className="flex w-full justify-center rounded-md bg-red-blood px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-blood/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-blood disabled:cursor-not-allowed disabled:bg-red-blood/50"
                >
                  {props.isSubmitting ? "Loading..." : "Verify"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
