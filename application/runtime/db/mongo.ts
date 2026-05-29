import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface CachedConnection {
    client: MongoClient | null;
    db: Db | null;
}

// Global is used here to maintain a cached connection across hot reloads in development.
let cached = (global as any).mongo as CachedConnection;

if (!cached) {
    cached = (global as any).mongo = { client: null, db: null };
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
    if (cached.client && cached.db) {
        return { client: cached.client, db: cached.db };
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db("DHIMORA_SUPER_DATABASE");

    cached.client = client;
    cached.db = db;

    return { client, db };
}

export async function getLayoutCollection() {
    const { db } = await connectToDatabase();
    return db.collection("layouts");
}
