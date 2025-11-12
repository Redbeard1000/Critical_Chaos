import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetCharaktereQuery } from "../store/enhancedApi";
import CreateCharacter from "./CreateCharakters";

export const Charakters = () => {
  const navigate = useNavigate();

  const { data } = useGetCharaktereQuery();
  console.log(data);

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
      <CreateCharacter onCreated={() => window.location.reload()} />
    </>
  );
};
