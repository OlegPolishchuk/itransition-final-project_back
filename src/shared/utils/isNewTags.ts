export const isNewTags = (newTags: string[], allTags: string[]) => {
  if (newTags.length > allTags.length) return true;

  const result: number[] = [];

  newTags.forEach((tag) => {
    if (allTags.indexOf(tag) === -1) {

      result.push(-1)
    }
  })

  return result[0] === -1;
}