export function randomize(min: number, max: number, isInclusive?: boolean): number {
  return Math.floor(Math.random() * (max - min + +(isInclusive ?? false))) + min;
}
export function getRandomArrayItem<T>(array: T[]): T {
  return array[randomize(0, array.length)];
}

export const converter = {
  mapToString<T>(map: Map<string, T>): string {
    return JSON.stringify(map, (_, v) => (v instanceof Map ? Array.from(v) : v));
  },
  stringToMap<T>(str = '[]'): Map<string, T> {
    return JSON.parse(str, (k, v) => (k === '' ? new Map(v) : v));
  },
  setToString<T>(set: Set<T>): string {
    return JSON.stringify(set, (_, v) => (v instanceof Set ? Array.from(v) : v));
  },
  stringToSet<T>(str = '[]'): Set<T> {
    return JSON.parse(str, (k, v) => (k === '' ? new Set(v) : v));
  },
};

export const LS = {
  saveMap<T>(key: string, map: Map<string, T>): void {
    localStorage.setItem(key, converter.mapToString(map));
  },
  loadMap<T>(key: string): Map<string, T> {
    return converter.stringToMap(localStorage.getItem(key) ?? '[]');
  },
};

export function getChunk<T>(number: number, length: number, list: T[]): T[] {
  return list.slice(number * length, (number + 1) * length);
}

export function xor(a: boolean, b: boolean): boolean {
  return (a && b) || (!a && !b);
}

export function debounce<F extends Callback<F>>(callback: Callback<F>, ms = 350): Callback<F> {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), ms);
  };
}

export const HexColor = {
  isColor(value: string): boolean {
    return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value);
  },
  get random(): string {
    return `#${randomize(0, 0xffffff).toString(16).padStart(6, '0')}`;
  },
};
