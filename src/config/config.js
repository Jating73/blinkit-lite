import 'dotenv/config'
import fastifySession from '@fastify/session'
import connectMongodbSession from 'connect-mongodb-session';

import { Admin } from '../models/index.js';

const MongoDBStore = connectMongodbSession(fastifySession);

export const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
})

sessionStore.on("error", (error) => {
    console.log("Session store error", error)
})

export const authenticate = async (email, password) => {
    if (email && password) {
        const user = await Admin.findOne({ email });
        if (!user) {
            return null;
        }
        if (user.password !== password) {
            return null
        }
        return Promise.resolve({
            email,
            password
        })
    }
    return null
}

export const PORT = process.env.PORT || 3000
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD