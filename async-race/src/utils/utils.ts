export function randomize(min: number, max: number, isInclusive?: boolean): number {
  return Math.floor(Math.random() * (max - min + +(isInclusive ?? false))) + min;
}
export function getRandomArrayItem<T>(array: T[]): T {
  return array[randomize(0, array.length)];
}

export const HexColor = {
  isColor(value: string): boolean {
    return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value);
  },
  get random(): string {
    return `#${randomize(0, 0xffffff).toString(16).padStart(6, '0')}`;
  },
};
