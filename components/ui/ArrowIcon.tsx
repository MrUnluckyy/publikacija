type Direction = "right" | "left" | "up" | "down" | "up-right";

const PATHS: Record<Direction, string> = {
  right:      "M5 12 H19 M13 6 L19 12 L13 18",
  left:       "M19 12 H5 M11 6 L5 12 L11 18",
  up:         "M12 19 V5 M6 11 L12 5 L18 11",
  down:       "M12 5 V19 M6 13 L12 19 L18 13",
  "up-right": "M7 17 L17 7 M9 7 H17 V15",
};

interface Props {
  direction: Direction;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function ArrowIcon({
  direction,
  size = 16,
  strokeWidth = 2,
  className,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={PATHS[direction]} />
    </svg>
  );
}
