import type { NavItemConfig } from "./types";

export type PathMap = Record<string, boolean>;

export function getActivePathMap(
  config: NavItemConfig[],
  activePath?: string
): PathMap {
  const pathMap: PathMap = {};

  function walk(items: NavItemConfig[]): boolean {
    let found = false;

    for (const item of items) {
      const isSelf = item.path === activePath;
      const hasChildActive = item.children ? walk(item.children) : false;

      const isSelected = isSelf || hasChildActive;

      if (item.path) {
        pathMap[item.path] = isSelected;
      }

      if (isSelected) found = true;
    }

    return found;
  }

  walk(config);
  return pathMap;
}
