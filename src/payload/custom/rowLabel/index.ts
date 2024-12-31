import path from "path";
import { fileURLToPath } from "url";

// Resolve the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const arrayRowLabelField = (props: {
  prefix: string;
  fieldName: string;
}) => {
  return {
    path: `${path.join(__dirname, "payload", "components")}#ArrayRowLabel`,
    clientProps: props,
  };
};
