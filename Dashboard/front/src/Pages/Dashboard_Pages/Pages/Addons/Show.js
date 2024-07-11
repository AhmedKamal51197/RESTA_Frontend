import "../DataTable.css";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function Show() {
  const { id } = useParams();

  return (
    <div className="Show">
      <h1>show {id}</h1>
    </div>
  );
}
