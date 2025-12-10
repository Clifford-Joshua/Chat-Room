import CustomApiError from "./customApi";
import { StatusCodes } from "http-status-codes";

class UnAuthorizeError extends CustomApiError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnAuthorizeError;
