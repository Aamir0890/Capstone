

const badRequest = (res, message) => {
    return res.status(400).json({
      success: false,
      message: message || 'Bad Request'
    });
  };
  
  const unauthorized = (res, message) => {
    return res.status(401).json({
      success: false,
      message: message || 'Unauthorized'
    });
  };
  
  const forbidden = (res, message) => {
    return res.status(403).json({
      success: false,
      message: message || 'Forbidden'
    });
  };
  
  const notFound = (res, message) => {
    return res.status(404).json({
      success: false,
      message: message || 'Not Found'
    });
  };
  
  const internalServerError = (res, message) => {
    return res.status(500).json({
      success: false,
      message: message || 'Internal Server Error'
    });
  };
  
  const validationError = (res, errors) => {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: errors
    });
  };
  
  module.exports = {
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    internalServerError,
    validationError
  };