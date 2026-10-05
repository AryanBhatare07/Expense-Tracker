import React from "react";

const ChartTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];

  return (
    <div
      style={{
        backgroundColor: "#0e192a",
        border: "1px solid #334155",
        borderRadius: "12px",
        padding: "10px 14px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
      }}
    >
      <p
        style={{
          color: "#a5b4fc",
          fontSize: "13px",
          fontWeight: "600",
          marginBottom: "4px",
        }}
      >
        {item.name}
      </p>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "13px",
          margin: 0,
        }}
      >
        Amount:{" "}
        <span
          style={{
            color: "#ffffff",
            fontWeight: "600",
          }}
        >
          ₹{item.value}
        </span>
      </p>
    </div>
  );
};

export default ChartTooltip;