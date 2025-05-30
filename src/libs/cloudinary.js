import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (
  localFilePath,
  resourceType = "auto"
) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
    });

    fs.unlinkSync(localFilePath);

    return response.secure_url;
  } catch (error) {
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (unlinkError) {}

    return null;
  }
};

export const destroyOnCloudinary = async (publicId) => {
  if (publicId) {
    return null;
  }
  await cloudinary.uploader.destroy(publicId);
};
