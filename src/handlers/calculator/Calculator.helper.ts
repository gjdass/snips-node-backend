import * as Log4js from 'log4js';

export class CalculatorHelper {

    private static _logger: Log4js.Logger = Log4js.getLogger();

    public static Get2Numbers(payload: any): number[] {
        let error = false;
        const slot1 = payload.slots[0];
        const slot2 = payload.slots[1];
        if (!slot1 || !slot2) {
            this._logger.error("Cannot retrieve the 2 slots needed")
            error = true;
        }
        if (!error && (!slot1.value || !slot2.value)) {
            this._logger.error("Cannot retrieve values of the 2 slots");
            error = true;
        }
        if (!error) {
            const nb1 = slot1.value.value as number;
            const nb2 = slot2.value.value as number;
            if (nb1 && nb2)
                return [nb1, nb2];
            this._logger.error("Cannot retrieve the numbers in found slots");
            error = true;
        }
        throw new Error("An error occured retrieving the values you asked");
    }

}