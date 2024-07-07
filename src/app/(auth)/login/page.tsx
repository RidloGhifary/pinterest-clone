"use client";

import Link from "next/link";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

import { login } from "@/actions/login";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Social } from "@/components/social";

const validationSchema = Yup.object({
  password: Yup.string().min(8, "Must be 8 or more").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Login({ searchParams }: { searchParams: any }) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const router = useRouter();

  const callbackUrl = searchParams.callbackUrl || "/";

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              setTimeout(async () => {
                login(values, callbackUrl)
                  .then((data) => {
                    if (data?.error) {
                      setError(data?.error);
                      actions.setSubmitting(false);
                      return;
                    }

                    if (data?.success) {
                      actions.resetForm();
                      setError(data?.success);
                      actions.setSubmitting(false);
                    }
                  })
                  .catch((err) => {
                    console.log("🚀 ~ setTimeout ~ err:", err);
                    actions.setSubmitting(false);
                    setError("Something went wrong!");
                  });
              }, 1000);
            }}
          >
            {(props) => (
              <Form className="space-y-6" onSubmit={props.handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
                  >
                    <span>Email address</span>
                    {props.touched.email && props.errors.email && (
                      <span className="text-red-blood">
                        {props.errors.email}
                      </span>
                    )}
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      onChange={props.handleChange}
                      value={props.values.email}
                      disabled={props.isSubmitting}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-red-blood focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="flex w-full items-center justify-between text-sm font-medium leading-6 text-gray-900"
                    >
                      <span>Password</span>
                      {props.touched.password && props.errors.password && (
                        <span className="text-red-blood">
                          {props.errors.password}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      onChange={props.handleChange}
                      value={props.values.password}
                      disabled={props.isSubmitting}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-red-blood focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />

                <button
                  type="submit"
                  disabled={props.isSubmitting}
                  className="flex w-full justify-center rounded-md bg-red-blood px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-blood/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-blood disabled:cursor-not-allowed disabled:bg-red-blood/50"
                >
                  {props.isSubmitting ? "Loading..." : "Sign in"}
                </button>

                <hr />

                <Social />
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Haven`t` an account?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-red-blood hover:text-red-blood/90"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
