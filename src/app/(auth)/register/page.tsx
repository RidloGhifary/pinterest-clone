"use client";

import Link from "next/link";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { register } from "@/actions/register";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Social } from "@/components/social";

const validationSchema = Yup.object({
  username: Yup.string().max(25, "Must be 15 or less").required("Required"),
  password: Yup.string().min(8, "Must be 8 or more").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Register() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const router = useRouter();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              setError("");
              setSuccess("");

              register(values).then((data) => {
                if (data.error) {
                  setError(data.error);
                  actions.setSubmitting(false);
                  return;
                }

                setSuccess(data.success);
                actions.resetForm();
                actions.setSubmitting(false);
              });
            }}
          >
            {(props) => (
              <Form className="space-y-6" onSubmit={props.handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
                  >
                    <span>Username</span>
                    {props.touched.username && props.errors.username && (
                      <span className="text-red-blood">
                        {props.errors.username}
                      </span>
                    )}
                  </label>
                  <div className="mt-2">
                    <Field
                      id="username"
                      name="username"
                      type="username"
                      onChange={props.handleChange}
                      value={props.values.username}
                      disabled={props.isSubmitting}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-red-blood focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

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
                  {props.isSubmitting ? "Loading..." : "Sign up"}
                </button>

                <hr />

                <Social />
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-red-blood hover:text-red-blood/90"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
