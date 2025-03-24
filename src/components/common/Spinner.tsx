import classNames from "classnames";

interface SpinnerProps {
  color?: string;
  className?: string;
}

export const Spinner = ({
  color = "border-white",
  className,
}: SpinnerProps) => (
  <div className="flex justify-center items-center">
    <div
      className={classNames(
        `size-6 border-4 border-t-transparent ${color} rounded-full animate-spin`,
        className
      )}
    />
  </div>
);
