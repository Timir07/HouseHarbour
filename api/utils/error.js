export const errorHandler = (statusCode, message) => {//everything is manual
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
  };