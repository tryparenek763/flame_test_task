export const getIdByUrl = (url: string) => {
  return url.match(/\d/g)?.join('')
}
