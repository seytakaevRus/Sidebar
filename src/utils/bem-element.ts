// eslint-disable-next-line vue/max-len
export const bemElement = (blockName: string) => (elementName: string, mods: { [key: string]: boolean | string } = {}) => Object.entries(mods).reduce(
  (res, [key, val]) => {
    if (val === false) return res;
    if (val === true) res.push(`${blockName}__${elementName}--${key}`);
    else if (val !== '') res.push(`${blockName}__${elementName}--${key}-${val}`);
    return res;
  },
  [`${blockName}__${elementName}`],
);
