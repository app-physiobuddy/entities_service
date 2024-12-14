import express, {Application} from 'express';
import { router } from './adapters/routes.js';
import ErrorHandler from './utils/errors/ErrorHandler.js';





const app: Application = express();
app.use(express.json());

// Mount the routes
app.use('', router);

// express specific error handling middleware
app.use(ErrorHandler.middleware);

const APP_PORT = process.env.APP_PORT;
app.listen(APP_PORT, () => {
    console.log(`TS Entities service is running on http://localhost:${APP_PORT}`);
});