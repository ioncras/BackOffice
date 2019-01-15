import getMapper from './mappers'

export default (model, method, params) => {
  
  if(method === 'create') {
    params = getMapper(model)(params);
  }

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
