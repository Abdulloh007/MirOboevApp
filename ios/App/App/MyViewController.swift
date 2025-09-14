import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {

    override open func viewDidLoad() {
        super.viewDidLoad()
        // любой дополнительный код
    }

    // MARK: - Ручная регистрация плагина после загрузки Capacitor
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(PrinterPlugin())
    }
}
