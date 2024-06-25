"use client";

import Link from "next/link";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Toast } from "@/lib/alert";
import { signIn } from "next-auth/react";
import Image from "next/image";

const validationSchema = Yup.object({
  password: Yup.string().min(8, "Must be 8 or more").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Login({ searchParams }: { searchParams: any }) {
  const router = useRouter();

  const callbackUrl = searchParams.callbackUrl || "/";

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              setTimeout(async () => {
                const res = await signIn("credentials", {
                  redirect: false,
                  email: values.email,
                  password: values.password,
                  callbackUrl,
                });

                if (!res?.ok) {
                  Toast.fire<any>({
                    icon: "error",
                    title: "Signed in failed",
                  });
                  actions.setSubmitting(false);
                  return;
                }

                Toast.fire<any>({
                  icon: "success",
                  title: "Signed in successfully",
                });
                router.push("/");
                actions.setSubmitting(false);
                actions.resetForm();
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

                <button
                  type="submit"
                  disabled={props.isSubmitting}
                  className="flex w-full justify-center rounded-md bg-red-blood px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-blood/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-blood disabled:cursor-not-allowed disabled:bg-red-blood/50"
                >
                  {props.isSubmitting ? "Loading..." : "Sign in"}
                </button>

                <hr />

                <button
                  type="button"
                  disabled={props.isSubmitting}
                  onClick={() =>
                    signIn("google", { callbackUrl, redirect: false })
                  }
                  className="flex w-full items-center justify-center gap-1 rounded-md border border-light-gray bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-red-blood hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:bg-white/50"
                >
                  <Image
                    src="/google.png"
                    width={20}
                    height={20}
                    alt="google"
                    className="mr-2"
                  />
                  {props.isSubmitting ? "Loading..." : "Login with google"}
                </button>
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
