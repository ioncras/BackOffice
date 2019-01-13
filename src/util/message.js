export default (model, method, params) => {
  return {
    "token": {
      "database": "test",
      "username": "test@test.com",
      "password": "test"
    },
    "model": model,
    "params": params,
    "method": method
  }
}
