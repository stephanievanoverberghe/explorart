// src/lib/db/connect.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env.local');
}

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongooseCache: MongooseCache | undefined;
}

export async function connectToDatabase(): Promise<Mongoose> {
    if (global.mongooseCache?.conn) {
        return global.mongooseCache.conn;
    }

    if (!global.mongooseCache) {
        global.mongooseCache = { conn: null, promise: null };
    }

    if (!global.mongooseCache.promise) {
        // 👇 ICI la correction : MONGODB_URI! (non-null assertion)
        global.mongooseCache.promise = mongoose.connect(MONGODB_URI!);
    }

    global.mongooseCache.conn = await global.mongooseCache.promise;
    return global.mongooseCache.conn;
}
