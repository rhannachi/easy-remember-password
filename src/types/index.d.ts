import { Mongoose } from "mongoose"

declare global {
  /* eslint no-var: off */
  var mongoose: {
    promise: Promise<Mongoose> | null
    conn: Mongoose | null
  }
}
