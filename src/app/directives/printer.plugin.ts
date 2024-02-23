import { registerPlugin } from '@capacitor/core';

export interface PrinterPlugin {
    print(options: { value: string }): Promise<{ value: string }>;
}

const Printer = registerPlugin<PrinterPlugin>('Printer');

export default Printer;