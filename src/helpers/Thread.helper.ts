export class ThreadHelper {

    static Sleep(ms): Promise<number> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}