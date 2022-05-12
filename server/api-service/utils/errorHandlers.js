function HttpErrorHandler(error) {
  throw error;
}

function PromiseErrorHandler(e) {
  throw e;
}

module.exports = { HttpErrorHandler, PromiseErrorHandler };
