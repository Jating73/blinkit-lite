import fastify from "fastify"
import { authRoutes } from "./auth"

const prefix = "/api"

export const registerRoutes = async (fastify) => {
    fastify.register(authRoutes, { prefix: prefix })
}