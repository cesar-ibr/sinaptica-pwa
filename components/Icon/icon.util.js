export const ICON_SIZES = {
  small: 16,
  medium: 24,
  big: 32,
};

export const getIconSize = (tag = '') => ICON_SIZES[tag];
