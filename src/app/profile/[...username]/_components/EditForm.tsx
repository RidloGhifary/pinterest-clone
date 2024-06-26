"use client";

import URL from "@/lib/UrlValidation";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().min(8, "Must be 8 or more").required("Required"),
  bio: Yup.string().max(255, "Must be 255 or less"),
  profile_link: Yup.string().matches(URL, "Enter a valid url"),
});

export default function EditForm({
  user,
  handleSubmitForm,
}: {
  user: any;
  handleSubmitForm: any;
}) {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        username: (user?.name as string) || "",
        bio: (user?.bio as string) || "",
        profile_link: (user?.profile_link as string) || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        setTimeout(async () => {
          handleSubmitForm(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }, 1000);
      }}
    >
      {(props) => (
        <Form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
            >
              <span>Username</span>
              {props.touched.username && props.errors.username && (
                <span className="text-red-blood">{props.errors.username}</span>
              )}
            </label>
            <div className="mt-2">
              <Field
                id="username"
                name="username"
                type="text"
                required
                disabled={props.isSubmitting}
                placeholder="Give your username"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-light-gray placeholder:text-gray-600 focus:outline-light-gray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="bio"
              className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
            >
              <span>Bio</span>
            </label>
            <div className="mt-2">
              <textarea
                id="bio"
                name="bio"
                rows={5}
                disabled={props.isSubmitting}
                placeholder="Write a few sentences about yourself"
                className="block w-full resize-none rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-light-gray placeholder:text-gray-600 focus:outline-light-gray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="profile_link"
              className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
            >
              <span>Profile link</span>
              {/* {props.touched.email && props.errors.email && (
                <span className="text-red-blood">{props.errors.email}</span>
              )} */}
            </label>
            <div className="mt-2">
              <Field
                id="profile_link"
                name="profile_link"
                type="text"
                disabled={props.isSubmitting}
                placeholder="https://example.com"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-light-gray placeholder:text-gray-600 focus:outline-light-gray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-1 flex items-center justify-end gap-6">
            <button
              type="submit"
              disabled={props.isSubmitting}
              className="rounded-full bg-light-gray px-6 py-3 transition hover:bg-light-gray/70 disabled:cursor-not-allowed disabled:bg-light-gray/50"
            >
              {props.isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              className="rounded-full bg-light-gray px-6 py-3 transition hover:bg-light-gray/70 disabled:cursor-not-allowed disabled:bg-light-gray/50"
              disabled={props.isSubmitting}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
