import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { UpdateUserInput } from "../../types/user/UpdateUserInput";
import { UserMutationResponse } from "../../types/user/UserMutationResponse";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { Context } from "../../types/Context";
import { Upload } from "../../types/upload/Upload";

@Resolver()
export class EditProfileResolver {
  @Mutation(() => UserMutationResponse)
  async editProfile(
    @Arg("data") data: UpdateUserInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    try {
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user)
        return {
          code: 400,
          success: false,
          message: "User not found",
        };
      const { nickname, dateOfBirth, password } = data;
      if (!!nickname) user.nickname = nickname;
      if (!!dateOfBirth) user.date_of_birth = dateOfBirth;
      if (!!password) user.password = password;
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

  @Mutation(() => UserMutationResponse)
  async updateAvatar(
    @Arg("avatar", () => GraphQLUpload)
    { createReadStream, filename }: Upload,
    @Ctx() { req }: Context //@Ctx() { req, connection }: Context
  ): Promise<UserMutationResponse> {
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
              __dirname + `/../../../public/images/avatar/${newFilename}`
            )
          )
          .on("finish", async () => {
            user.avatar = `http://localhost:4000/images/avatar/${newFilename}`;
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
}
