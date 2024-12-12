import Link from 'next/link';

const Home = () => {
    return (
        <ul>
            <li>
                <Link href="/">
                    Головна
                </Link>
            </li>
            <li>
                <Link href="/profile">
                    Профіль
                </Link>
            </li>
            <li>
                <Link href="/blog/sport">
                    Про спорт
                </Link>
            </li>
        </ul>
    );
};

export default Home;
