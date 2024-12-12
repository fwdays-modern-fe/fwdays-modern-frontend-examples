'use client';
import { useParams } from 'next/navigation';

const Article = () => {
    const params = useParams();
    const { slug } = params;
    return (
        <>
            <h1>Blog slug page</h1>
            <p>Slug: {slug}</p>
        </>
    );
};

export default Article;
