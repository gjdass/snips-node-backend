export interface ISnipsHandler {
    Activate(intentName: string, payload: any): void;
    Contains(intentName: string): boolean;
}