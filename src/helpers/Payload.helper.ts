export class PayloadHelper {

    static GetSessionId(payload: any): string {
        let sessionId = "";
        try {
            sessionId = payload.sessionId;
        } catch {}
        return sessionId;
    }

    static GetSessionIdObj(payload: any): object {
        return { sessionId: this.GetSessionId(payload) };
    }

}