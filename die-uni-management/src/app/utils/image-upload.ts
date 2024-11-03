import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";
import fs from "fs";
import path from "path";
import env from "../config";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// TODO => Upload image to cloudinary | Way 01
// Using async/wait
/* const sendImgToCloudinary = async (imagePath: string, imageName: string) => {
  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader.upload(imagePath, {
      public_id: imageName,
    });
    return uploadResult;
  } catch (error) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}; */

// TODO => Upload image to cloudinary | Way 02
// Using Promise

const sendImgToCloudinary = (
  imagePath: string,
  imageName: string,
): Promise<UploadApiErrorResponse | UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imagePath,
      {
        public_id: imageName,
      },
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);

          // TODO => Delete file from folder after successfully uploaded to cloudinary
          fs.unlink(imagePath, function (error) {
            if (error) {
              reject(error);
            } else {
              console.log(
                `file is deleted from ${path.join(process.cwd() + "/public/uploads")} ✅`,
              );
            }
          });
        }
      },
    );
  });
};

export default sendImgToCloudinary;
