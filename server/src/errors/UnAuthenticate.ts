import CustomApiError from "./customApi";
import { StatusCodes } from "http-status-codes";

class UnAuthenticateError extends CustomApiError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnAuthenticateError;
