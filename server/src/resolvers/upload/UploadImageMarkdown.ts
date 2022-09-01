import { AuthenticationError } from "apollo-server-core";
import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { Context } from "../../types/Context";
import { Upload } from "../../types/upload/Upload";
import { UploadImageResponse } from "../../types/upload/UploadImageMarkdown";

@Resolver()
export class UploadImageMarkdownResolver {
  @Mutation(() => UploadImageResponse)
  async uploadImage(
    @Arg("image", () => GraphQLUpload)
    { createReadStream, filename }: Upload,
    @Ctx() { req }: Context
  ): Promise<UploadImageResponse | null> {
    try {
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user) throw new AuthenticationError("Not authentication");
      const filenameArr = filename.split(".");
      const extension = filenameArr[filenameArr.length - 1];
      const newFilename = `${Date.now()}.${extension}`;

      return new Promise(async (resolve, reject) => {
        createReadStream()
          .pipe(
            createWriteStream(
              __dirname + `/../../../public/images/markdown/${newFilename}`
            )
          )
          .on("finish", async () => {
            resolve({
              url: `http://localhost:4000/images/markdown/${newFilename}`,
            });
          })
          .on("error", () => {
            reject(null);
          });
      });
    } catch (err) {
      return null;
    }
  }
}
