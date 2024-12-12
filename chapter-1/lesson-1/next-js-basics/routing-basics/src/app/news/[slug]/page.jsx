const Article = async props => {
    const params = await props.params;
    const { slug } = params;
    return (
        <>
            <h1>Blog slug page</h1>
            <p>Slug: {slug}</p>
        </>
    );
};

export default Article;
