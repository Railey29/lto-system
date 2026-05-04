import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  doc: f({ blob: { maxFileCount: 1, maxFileSize: "8MB" } }).onUploadComplete(
    async ({ file }) => {
      const fileUrl = file.ufsUrl;

      return {
        fileUrl,
        fileName: file.name,
      };
    },
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
