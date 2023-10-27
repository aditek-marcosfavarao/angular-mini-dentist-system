export function generateId() {
  const newId = Math.floor(
    Math.random() * Math.floor(Math.random() * Date.now())
  ).toString(16);

  return newId;
}
