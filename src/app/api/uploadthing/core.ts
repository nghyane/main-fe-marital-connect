import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      // Verify user is authenticated
      // const session = await auth()
      // if (!session) throw new Error("Unauthorized")

      return { userId: "user_123" }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("File URL:", file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter 