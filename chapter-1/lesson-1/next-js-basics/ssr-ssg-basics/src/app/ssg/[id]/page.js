const SSGExample = async props => {
  const { id } = (await props?.params) || { id: "Does not exist" };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        ID: {id}
      </h1>
    </main>
  );
 };
 
 export const generateStaticParams = () => {
  console.log("generateStaticParams");
  const ids = ["id_1", "id_2", "id_3"];
  return ids.map((id) => ({ id }));
 };
 
 export default SSGExample;