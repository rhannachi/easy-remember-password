import mongoose from "mongoose"

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined")
if (!MONGODB_DB) throw new Error("MONGODB_DB not defined")

let cached = global["mongoose"]

if (!cached) {
  cached = global["mongoose"] = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URI}/${MONGODB_DB}?retryWrites=true&w=majority`)
  }
  cached.conn = await cached.promise
  console.info("Successfully connected to database")

  return cached.conn
}

export default dbConnect
