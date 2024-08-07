export const camelize = (str: string) => {
  const result = str.replace(/\W+(.)/g, function (match, chr) {
    return chr.toUpperCase();
  });
  return result.replace(/[^a-zA-Z0-9]/g, '');
}