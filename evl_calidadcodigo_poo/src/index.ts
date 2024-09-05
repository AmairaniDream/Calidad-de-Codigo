import express from "express";
import bodyParser from "body-parser";
import bookRoutes from "./routes/bookRoutes";

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use("/api", bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
