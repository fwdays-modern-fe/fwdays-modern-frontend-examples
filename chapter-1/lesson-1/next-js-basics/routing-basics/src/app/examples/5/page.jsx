"use client";
import { usePathname, useRouter } from "next/navigation";

const ActiveLink = ({ children, href }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleClick = (event) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-block px-4 py-2 rounded-lg text-lg font-semibold transition duration-300 ease-in-out ${
        isActive
          ? "bg-blue-500 text-white shadow-lg transform scale-105"
          : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:transform hover:scale-105"
      }`}
    >
      {children}
    </a>
  );
};

const Post = () => {
  return (
    <nav>
      <ul className="flex justify-center space-x-4 py-4">
        <li>
          <ActiveLink href="/examples/5">Приклад номер 5</ActiveLink>
        </li>
        <li>
          <ActiveLink href="/examples/6">Приклад номер 6</ActiveLink>
        </li>
        <li>
          <ActiveLink href="/examples/7">Приклад номер 7</ActiveLink>
        </li>
      </ul>
    </nav>
  );
};

export default Post;
