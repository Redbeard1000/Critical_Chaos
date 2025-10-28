import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World test");
});

app.get("/charaktere", (req, res) => {
  res.send(
    JSON.stringify([
      { name: "Harald D Lonz", klasse: "Dieb" },
      { name: "Gandalf", klasse: "Magier" },
      { name: "Legolas", klasse: "Bogenschütze" },
    ])
  );
});

app.listen(3000);
