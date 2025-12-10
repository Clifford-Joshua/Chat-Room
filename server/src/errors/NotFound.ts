import CustomApiError from "./customApi";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomApiError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;
