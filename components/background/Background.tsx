export function Background() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${`/bg.jpeg`})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "repeat-y",
        position: "absolute",
      }}
    ></div>
  );
}
