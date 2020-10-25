import { LoginQueries } from "../../endPoints/login/queries";

export const updateLoginPhoto = (username, base64string) => {
  LoginQueries.updatePhotoByUsername(username, base64string);
};
