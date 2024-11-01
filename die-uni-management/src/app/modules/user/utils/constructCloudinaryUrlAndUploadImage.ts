import sendImgToCloudinary from "../../../utils/image-upload";
import { TUser, WithName } from "../interface/user.interface";

// TODO => Utility func to send image to cloudinary
const constructUrlAndImageUploaderUtil = async <T extends WithName>(
  payload: T,
  file: Express.Multer.File,
  userData: Partial<TUser>,
) => {
  // constructing image name using payload and user data
  const imageName = `${(payload.name.firstName + " " + (payload.name.middleName ?? "") + " " + payload.name.lastName).trim().split(" ").join("")}-${userData.id}`;
  const imagePath = file.path;
  return await sendImgToCloudinary(imagePath, imageName);
};
export default constructUrlAndImageUploaderUtil;
