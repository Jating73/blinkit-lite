import fastify from "fastify";
import { fetchUser, loginCustomer, loginDeliveryPartner, refreshToken } from "../controllers/auth/auth";
import { verifyToken } from "../middleware/auth";

export const authRoutes = async (fastify, options) => {
    fastify.post("/customer/login", loginCustomer)
    fastify.post("/delivery/login", loginDeliveryPartner)
    fastify.post("/refresh-token", refreshToken)
    fastify.post("/user", { preHandler: [verifyToken] }, fetchUser)
}