import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import { useState } from "react";

export const Starri = () => {
  const [value, setValue] = useState<number | null>(2);

  return (
    <>
      <h1>Starri der Unsterbliche</h1>
      <div className="rowOne">
        <h4>Volk</h4>
        <h4>Beruf</h4>
      </div>
      <div className="rowTwo">
        <h4>Mensch</h4>
        <h4>Kämpfer</h4>
      </div>
      <div className="rowThree">
        <Button>Stärke</Button>
        <Button>Geschick</Button>
        <Button>Verstand</Button>
        <Button>Empathie</Button>
        <Box sx={{ "& > legend": { mt: 2 } }}>
          <Typography component="legend">Controlled</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </div>
    </>
  );
};
