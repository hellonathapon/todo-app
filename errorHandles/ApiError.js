class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
  static badRequest(msg) {
    return new ApiError(400, msg);
  }
  static unauthorized(message) {
    return new ApiError(401, message);
  }
}

module.exports = ApiError;
