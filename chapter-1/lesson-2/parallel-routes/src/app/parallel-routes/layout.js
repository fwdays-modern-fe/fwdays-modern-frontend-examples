export default function Example1Layout({ children, route1, route2 }) {
  return (
    <section>
      <div style={{ padding: "20px" }}>{route1}</div>
      <div style={{ padding: "20px" }}>{route2}</div>
      {children}
    </section>
  );
}
