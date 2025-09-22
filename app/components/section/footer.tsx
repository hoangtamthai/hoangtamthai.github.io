import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="flex justify-center py-10">
      <p>
        2025. By{" "}
        <Link
          className="hover:cursor-pointer hover:underline"
          to="github.com/royalheart"
        >
          Tam Thai
        </Link>
      </p>
    </div>
  );
}
