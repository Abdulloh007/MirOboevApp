import { registerPlugin } from '@capacitor/core';

export interface PrinterPlugin {
    print(options: { value: string }): Promise<{ value: string }>;
    printTest(options: { host: string, port: number, value: string }): Promise<{ status: string }>;
}

const Printer = registerPlugin<PrinterPlugin>('Printer');

export default Printer;