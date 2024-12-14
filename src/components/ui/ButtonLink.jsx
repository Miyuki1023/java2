import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to}  style={{ color: '#F9F9F4', textDecoration: 'none' }} className="bg-indigo-500 px-4 py-1 rounded-md">
    {children}
  </Link>
);