import { CreateWebpackConfigArgs } from "gatsby";
import path from "path";

exports.onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      extensions: [".ts", ".tsx"],
      alias: {
        "~": path.resolve(__dirname, "src/"),
      },
    },
  });
};
