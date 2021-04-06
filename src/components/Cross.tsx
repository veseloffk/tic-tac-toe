import "./Cross.css";

function Cross() {
  return (
    <svg
      viewBox="0 0 128 128"
      style={{
        height: "24px",
        width: "24px",
      }}
    >
      <path
        className="hFJ9Ve"
        d="M16,16L112,112"
        style={{
          stroke: "rgb(84, 84, 84)",
          strokeDasharray: 135.764,
          strokeDashoffset: 0,
        }}
      ></path>
      <path
        className="hFJ9Ve"
        d="M112,16L16,112"
        style={{
          stroke: "rgb(84, 84, 84)",
          strokeDasharray: 135.764,
          strokeDashoffset: 0,
        }}
      ></path>
    </svg>
  );
}

export default Cross;
