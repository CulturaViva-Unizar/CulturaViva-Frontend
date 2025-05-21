export function isEmptyOrSpaces(str: string | undefined | null): boolean {
    return !str || str.match(/^ *$/) !== null;
}