const getTime = async () => {
  const response = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Europe/London",
    { next: { revalidate: 2 } }
  );

  return response?.json();
};

const SSRExample = async () => {
  const time = await getTime();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Місцевий час: {new Date(time?.dateTime).toLocaleTimeString()}
      </h1>
    </main>
  );
};

export default SSRExample;
