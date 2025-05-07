import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Charakters = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Charakters</h1>
      <Button
        onClick={() => {
          navigate("../Charakters/Starri");
        }}
      >
        Starri
      </Button>
    </>
  );
};
