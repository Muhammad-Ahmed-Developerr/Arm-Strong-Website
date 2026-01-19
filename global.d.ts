import type mongooseType from "mongoose"

declare global {
  var mongoose: {
    conn: typeof mongooseType | null
    promise: Promise<typeof mongooseType> | null
  }

  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      NODE_ENV: "development" | "production" | "test"
    }
  }
}
