import React from 'react'

const CustomXAxisTick = ({ x, y, payload,data }) => {
  const item = data[payload.index];

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Category */}
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize={13}
      >
        {payload.value}
      </text>

      {/* Date */}
      <text
        x={0}
        y={0}
        dy={34}
        textAnchor="middle"
        fill="#64748b"
        fontSize={11}
      >
        {item?.date}
      </text>
    </g>
  );
};

export default CustomXAxisTick