// eslint-disable-next-line vue/max-len
export const bemBlock = (blockName: string) => (mods: { [key: string]: boolean | string } = {}) => Object.entries(mods).reduce(
  (res, [key, val]) => {
    if (val === false) return res;
    if (val === true) res.push(`${blockName}--${key}`);
    else if (val !== '') res.push(`${blockName}--${key}-${val}`);
    return res;
  },
  [blockName],
);
