export async function fetchFromURL(url){
  const rawData = await fetch(url)
  return await rawData.json()
}
