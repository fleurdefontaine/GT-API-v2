export const formatNames = (itemName: string): string => {
  return itemName
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_');
};

export const cleanHTML = (html: string): string => {
  return html
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, '');
};