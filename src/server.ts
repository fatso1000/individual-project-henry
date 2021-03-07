import app from "./app";
import { PORT } from "./config";

app
  .listen(PORT, () => {
    console.info(`Server running on port: ${PORT}`);
  })
  .on("ERROR", (e) => console.error(e));
