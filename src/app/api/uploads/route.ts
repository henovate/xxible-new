import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireUser } from "@/lib/requireUser";
import { toAppError, AppError } from "@/lib/errors";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    await requireUser();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      throw new AppError("file is required", 400);
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "xxible",
          resource_type: "image",
        },
        (error, res) => {
          if (error) reject(error);
          else resolve(res);
        }
      );
      stream.end(bytes);
    });

    return NextResponse.json(
      { url: result.secure_url, publicId: result.public_id },
      { status: 201 }
    );
  } catch (err) {
    const appErr = toAppError(err);
    return NextResponse.json({ error: appErr.message }, { status: appErr.status });
  }
}
