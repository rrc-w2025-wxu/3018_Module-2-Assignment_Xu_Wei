/**
 * Application entry point.
 * Starts the HTTP server and listens on the configured port.
 */

import app from "./app";
import { Server } from "http";

/** Port number the server listens on */
const PORT: string | number = process.env.PORT || 3000;

/**
 * HTTP server instance created by the Express application.
 */
const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { server };