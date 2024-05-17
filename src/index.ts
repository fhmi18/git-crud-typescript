import express, { Express } from "express";
import dotenv from "dotenv";
import notFound from "./handler/notFound";
import errorHandler from "./handler/errorHandler";
import crudRoutes from "./routes";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", crudRoutes);

app.use(notFound);
app.use(errorHandler);