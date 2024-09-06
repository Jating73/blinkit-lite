import "dotenv/config"
import fastify from "fastify"
import { connectDB } from "./src/config/connect.js"
import { PORT } from "./src/config/config.js"
import { buildAdminRouter, admin } from "./src/config/setup.js"

const start = async () => {

    await connectDB(process.env.MONGO_URI)

    const app = fastify()

    await buildAdminRouter(app)

    app.listen({
        port: PORT,
        host: "0.0.0.0"
    }, (err, addr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Blinkit Started on http://localhost:${PORT}${admin.options.rootPath}`)
        }
    })
}

start()