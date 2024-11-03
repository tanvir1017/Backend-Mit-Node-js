import env from "../config";
import { USER_ROLE } from "../modules/user/constant/user.constant";
import { User } from "../modules/user/model/user.model";

const seedSuperUser = {
  id: "SA-0001",
  email: "developer.tanvirhossain@gmail.com",
  password: env.SUPER_ADMIN_PASSWORD,
  role: "superAdmin",
  needsPasswordChange: false,
  passwordChangedAt: new Date(),
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  // when database is connected, we will check who is super admin
  const superAdmin = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!superAdmin) {
    await User.create(seedSuperUser);
  }
};

export default seedSuperAdmin;
