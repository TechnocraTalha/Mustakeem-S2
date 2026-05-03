import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

console.log("CLOUDINARY CONFIG CHECK:", {
  name: process.env.CLOUDINARY_CLOUD_NAME ? "YES" : "NO",
  key: process.env.CLOUDINARY_API_KEY ? "YES" : "NO",
  secret: process.env.CLOUDINARY_API_SECRET ? "YES" : "NO",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "mustakeem_salon", resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary SDK Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json({ error: error.message || "Upload failed." }, { status: 500 });
  }
}
