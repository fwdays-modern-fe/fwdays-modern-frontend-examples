"use client";
import { useRouter } from "next/navigation";

const ReadMore = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <span
        className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:from-purple-600 hover:to-blue-500"
        onClick={() => router.push("/profile")}
      >
        Профіль
      </span>
      <span
        className="inline-block bg-gradient-to-r from-green-500 to-teal-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:from-teal-600 hover:to-green-500"
        onClick={() => router.back()}
      >
        Повернутися на попередню сторінку
      </span>
      <span
        className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:from-orange-600 hover:to-yellow-500"
        onClick={() => router.push("/post/abc")}
      >
        Перейти на динамічну сторінку
      </span>
      <span
        className="inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:from-pink-600 hover:to-red-500"
        onClick={() => router.replace("/")}
      >
        На головну сторінку
      </span>
    </div>
  );
};

export default ReadMore;