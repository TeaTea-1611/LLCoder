import { User } from "../../entities/User";
import { UserResponse, UsersResponse } from "../../types/UserResponse";
import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CreateUserInput, UpdateUserInput } from "../../types/InputType";
import { Context } from "../../types/Context";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import { createWriteStream } from "fs";
import { isAuth } from "../../middlewares/auth";
import bcrypt from "bcryptjs";
import { validateRegister } from "../../utils/validate";

@Resolver()
export class UsersResolver {
  @Query(() => UsersResponse)
  async users(): Promise<UsersResponse> {
    try {
      const users = await User.find();

      return {
        code: 200,
        success: true,
        users,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }

  @Query(() => UserResponse)
  async user(@Arg("id", () => ID) id: number): Promise<UserResponse> {
    const user = await User.findOne({ where: { id } });
    if (!user)
      return {
        code: 400,
        success: false,
        message: "User not found",
      };
    try {
      return {
        code: 200,
        success: true,
        user,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }

  @Mutation(() => UserResponse)
  async updateUser(
    @Arg("data") data: UpdateUserInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    try {
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user)
        return {
          code: 400,
          success: false,
          message: "User not found",
        };
      const { nickname, dateOfBirth, password } = data;
      if (nickname) user.nickname = nickname;
      if (dateOfBirth) user.dateOfBirth = dateOfBirth;
      if (password) user.password = password;
      await user.save();
      return {
        code: 200,
        success: true,
        user,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }

  @Mutation(() => UserResponse)
  async uploadAvatar(
    @Arg("avatar", () => GraphQLUpload)
    { createReadStream, filename }: Upload,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    try {
      const filenameArr = filename.split(".");
      const extension = filenameArr[filenameArr.length - 1];
      const newFilename = `${Date.now()}.${extension}`;
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user)
        return { code: 400, success: false, message: "User not found" };

      return new Promise(async (resolve, reject) => {
        createReadStream()
          .pipe(
            createWriteStream(
              __dirname + `/../../../public/images/${newFilename}`
            )
          )
          .on("finish", async () => {
            user.avatar = `http://localhost:4000/images/${newFilename}`;
            await user.save();
            resolve({
              code: 200,
              success: true,
              user,
            });
          })
          .on("error", () => {
            reject({
              code: 500,
              success: false,
              message: "Internal server error",
            });
          });
      });
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }

  @UseMiddleware(isAuth([0]))
  @Mutation(() => UserResponse)
  async createUser(@Arg("data") data: CreateUserInput): Promise<UserResponse> {
    try {
      const { username, email, password, role } = data;
      const errors = validateRegister(data);
      if (errors.length > 0) return { code: 400, success: false, errors };
      const checkUser = await User.findOne({
        where: [{ username }, { email }],
      });
      if (checkUser) {
        const field = checkUser.username === username ? "username" : "email";
        return {
          code: 400,
          success: false,
          errors: [
            {
              field: field,
              message: `${field} already exists`,
            },
          ],
        };
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        username,
        nickname: username,
        email,
        password: hashedPassword,
        confirmed: true,
        role,
      }).save();
      return {
        code: 200,
        success: true,
        user,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }
}
