"use server";

import type { FileEsque, UploadFileResult } from "uploadthing/types";

import { utapi } from "@/lib/utils/utapi";

export async function uploadFiles(formData: FormData) {
  try {
    const files = formData.getAll("files");
    if (!files) {
      return { errors: "No files attached" };
    }

    const response = await utapi.uploadFiles(files as FileEsque[]);
    return response as UploadFileResult[];
  } catch (error) {
    return {
      errors: (error as Error).message,
    };
  }
}
