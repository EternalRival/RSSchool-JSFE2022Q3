export function getRandomElements<T>(array: T[], size: number): T[] {
    const result: T[] = [...array];
    while (result.length > size) {
        result.splice(Math.floor(Math.random() * result.length), 1);
    }
    return result;
}
