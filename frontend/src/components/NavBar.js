import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" class="flex items-center rtl:space-x-reverse">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Home
          </span>
        </Link>
      </div>
    </nav>
  );
};
