import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="flex justify-center py-10">
      <p>
        2026. By{" "}
        <Link
          className="hover:cursor-pointer hover:underline"
          to="https://github.com/hoangtamthai"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tam Thai
        </Link>
      </p>
    </div>
  );
}
