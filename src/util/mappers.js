const mappers = {
  default: (body) => [body],
  "ioncras.guia": guia => {
    console.log(guia)
    guia.guia_line_ids = guia.guia_line_ids.map(line => [0,0,line])
    return [guia];
  } 
}


export default (resource) => {
  if(mappers.hasOwnProperty(resource)) {
    return mappers[resource]
  } else {
    return mappers["default"];
  }
}