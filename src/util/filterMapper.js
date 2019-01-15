export default (filters) => {
  const filterArr = []

  for (let filterName in filters) {
    if (filters.hasOwnProperty(filterName)) {
      filterArr.push([filterName,'=',filters[filterName]])
    }
  }
  console.log(filterArr)
  return [filterArr]
}