import "dotenv/config";
import { Application } from "./Application";
import { parseJson } from "./middlewares/json-parser";
import { usersRouter } from "./users/users-router";
import { parseUrl } from "./middlewares/url-parser";

const PORT = process.env.PORT || '5000';

const app = new Application();

app.use(parseJson);
app.use(parseUrl);
app.addRouter(usersRouter);


async function start() {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (error) {
    console.log((error))
  }
}

start();