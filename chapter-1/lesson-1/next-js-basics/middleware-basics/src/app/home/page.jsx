import { cookies } from 'next/headers';

const Home = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");


    console.log('token', token);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Домашня сторінка</h1>
                <h3 className="text-2xl">Ласкаво просимо !</h3>
            </div>
        </main>
    );
};

export default Home;
