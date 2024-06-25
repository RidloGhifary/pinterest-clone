"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Edit() {
  const { status, data } = useSession();
  const router = useRouter();

  if (status === "loading") {
    <p>...</p>;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg">
        <h2 className="text-left text-5xl font-semibold leading-9 tracking-tight md:text-7xl">
          Edit Profile
        </h2>
        <p className="text-left">
          Keep your profile up to date with your information.
        </p>
        <div className="mt-10 space-y-8">
          <div className="flex items-center gap-6">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full bg-light-gray text-4xl`}
            >
              X
            </div>
            <button className="rounded-full bg-light-gray px-6 py-3 transition hover:bg-light-gray/70">
              Change
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
              >
                <span>Username</span>
                {/* {props.touched.email && props.errors.email && (
                <span className="text-red-blood">{props.errors.email}</span>
              )} */}
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
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
                {/* {props.touched.email && props.errors.email && (
                <span className="text-red-blood">{props.errors.email}</span>
              )} */}
              </label>
              <div className="mt-2">
                <textarea
                  id="bio"
                  name="bio"
                  required
                  rows={5}
                  placeholder="Write a few sentences about yourself"
                  className="block w-full resize-none rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-light-gray placeholder:text-gray-600 focus:outline-light-gray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="link"
                className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
              >
                <span>Profile link</span>
                {/* {props.touched.email && props.errors.email && (
                <span className="text-red-blood">{props.errors.email}</span>
              )} */}
              </label>
              <div className="mt-2">
                <input
                  id="link"
                  name="link"
                  type="text"
                  required
                  placeholder="https://example.com"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-light-gray placeholder:text-gray-600 focus:outline-light-gray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-1 flex items-center justify-end gap-6">
              <button className="rounded-full bg-light-gray px-6 py-3 transition hover:bg-light-gray/70">
                Save
              </button>
              <button
                className="rounded-full bg-light-gray px-6 py-3 transition hover:bg-light-gray/70"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
