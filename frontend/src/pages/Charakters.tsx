import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetCharactersQuery } from "../store/enhancedApi";

export const Charakters = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCharactersQuery();

  return (
    <>
      <h1>Characters</h1>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => navigate("/Charakters/Create")}>
          Neuer Charakter
        </Button>
      </div>

      <section style={{ marginTop: 16 }}>
        {isLoading && <div>Lade Charaktere...</div>}
        {error && (
          <div style={{ color: "red" }}>Konnte Charaktere nicht laden</div>
        )}
        {data && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {data.map((c) => (
              <li key={c.id} style={{ marginBottom: 6 }}>
                <Link
                  to={`/Charakters/${c.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <strong>{c.name}</strong>
                  {c.klasse ? ` (${c.klasse})` : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};
