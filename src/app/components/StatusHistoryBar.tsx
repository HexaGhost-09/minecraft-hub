import React from "react";

type StatusType = "up" | "partial" | "down";

interface StatusHistoryBarProps {
  history: StatusType[];
}

const statusColor: Record<StatusType, string> = {
  up: "#22c55e",
  partial: "#eab308",
  down: "#ef4444",
};

const StatusHistoryBar: React.FC<StatusHistoryBarProps> = ({ history }) => (
  <div style={{ display: "flex", gap: 4 }}>
    {history.map((status, idx) => (
      <div
        key={idx}
        title={status.charAt(0).toUpperCase() + status.slice(1)}
        style={{
          width: 20,
          height: 8,
          borderRadius: 4,
          backgroundColor: statusColor[status],
          border: "1px solid #3333",
        }}
      />
    ))}
  </div>
);

export default StatusHistoryBar;