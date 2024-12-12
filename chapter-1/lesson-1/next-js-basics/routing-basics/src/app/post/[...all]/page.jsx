const Post = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { all } = params;
  const { foo } = searchParams;

  console.log(all); // масив рядків

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">Post Page (декілька path params)</h1>
        <p className="text-xl text-gray-300">Path params: {all?.join(", ")}</p>
        <p className="text-xl text-gray-300">Query Param: {foo || "Foo parameter not found"}</p>
      </div>
    </div>
  );
};

export default Post;
