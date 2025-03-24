export const Spinner = ({ color = "border-white" }) => (
  <div className="flex justify-center items-center">
    <div
      className={`size-6 border-4 border-t-transparent ${color} rounded-full animate-spin`}
    />
  </div>
);
