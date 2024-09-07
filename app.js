import "dotenv/config"
import fastify from "fastify"
import { connectDB } from "./src/config/connect.js"
import { PORT } from "./src/config/config.js"
import { buildAdminRouter, admin } from "./src/config/setup.js"
import { registerRoutes } from "./src/routes/index.js"
import fastifySocketIO from "fastify-socket.io"

const start = async () => {

    await connectDB(process.env.MONGO_URI)

    const app = fastify()

    app.register(fastifySocketIO, {
        cors: {
            origin: "*"
        },
        pingInterval: 1000,
        pingTimeout: 5000,
        transports: ['websocket']
    })

    await buildAdminRouter(app)
    await registerRoutes(app)

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

    app.ready().then(() => {
        app.io.on("connection", (socket) => {
            console.log("A User connected ✅")

            socket.io("joinRoom", (orderId) => {
                socket.join(orderId)
                console.log(`🔴 User joined room ${orderId}`)
            })

            socket.io.on("disconnect", () => {
                console.log("User disconnected ❌")
            })
        })
    })
}

start()