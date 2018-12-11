declare module 'open-native-app' {
    export function open(url: string, wxCb: (type: string) => void, errorCb: () => void, delay?: number): void;
}