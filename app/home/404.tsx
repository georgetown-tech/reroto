import * as React from "react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex justify-center">
      <div className="m-4 max-w-sm overflow-hidden rounded shadow-lg">
        <div className="flex justify-center text-6xl font-light text-gray-500 text-opacity-75">
          404
        </div>
        <div className="my-2 flex justify-center text-lg font-medium text-gray-800">
          The page you&apos;re looking for is not found.
        </div>
        <hr />
        <div className="px-6 py-4">
          Make sure the address is correct. If you think this is a mistake,
          <Link href="/contact" className="ml-1 text-orange-400">
            contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
