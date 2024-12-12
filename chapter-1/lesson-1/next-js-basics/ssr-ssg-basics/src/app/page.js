import Link from 'next/link';

const Home = () => {
 return (
   <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
     <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
       Basic SSR, SSG
     </h1>
     <nav>
       <ul className="flex space-x-4">
         <li>
           <Link href="/ssg/hello">
             <span className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 transition-colors duration-300">
               Basic SSG
             </span>
           </Link>
         </li>
         <li>
           <Link href="/ssr">
             <span className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 transition-colors duration-300">
               Basic SSR
             </span>
           </Link>
         </li>
       </ul>
     </nav>
   </main>
 );
};

export default Home;