import Foundation
import Capacitor
import UIKit

@objc(PrinterPlugin)
public class PrinterPlugin: CAPPlugin, CAPBridgedPlugin {

    // MARK: - CAPBridgedPlugin требования
    public let identifier = "PrinterPlugin"
    public let jsName = "Printer"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "print", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "printTest", returnType: CAPPluginReturnPromise)
    ]

    // MARK: - Печать через системный диалог
    @objc func print(_ call: CAPPluginCall) {
        guard let base64 = call.getString("value") else {
            call.reject("Не передан параметр 'value'")
            return
        }

        guard let data = Data(base64Encoded: base64, options: .ignoreUnknownCharacters) else {
            call.reject("Не удалось декодировать base64")
            return
        }

        let tempURL = FileManager.default.temporaryDirectory.appendingPathComponent("temp.pdf")
        do {
            try data.write(to: tempURL)
        } catch {
            call.reject("Не удалось записать PDF: \(error.localizedDescription)")
            return
        }

        DispatchQueue.main.async {
            let printController = UIPrintInteractionController.shared
            let printInfo = UIPrintInfo(dictionary: nil)
            printInfo.jobName = "PDF Document"
            printInfo.outputType = .general
            printController.printInfo = printInfo
            printController.printingItem = tempURL

            printController.present(animated: true) { (_, completed, error) in
                if let error = error {
                    call.reject("Ошибка печати: \(error.localizedDescription)")
                } else {
                    call.resolve([
                        "status": completed ? "Печать завершена" : "Печать отменена"
                    ])
                }
            }
        }
    }

    // MARK: - Прямая печать по TCP (Raw Socket)
    @objc func printTest(_ call: CAPPluginCall) {
        guard let host = call.getString("host"),
              let port = call.getInt("port"),
              let base64 = call.getString("value"),
              let data = Data(base64Encoded: base64, options: .ignoreUnknownCharacters)
        else {
            call.reject("Неверные параметры")
            return
        }

        Task.detached {
            do {
                let stream = try await self.connectTo(host: host, port: port)
                try await self.send(data: data, using: stream)
                call.resolve(["status": "Печать запущена..."])
            } catch {
                call.resolve(["status": "Ошибка: \(error.localizedDescription)"])
            }
        }
    }

    // MARK: - Вспомогательные функции для TCP
    private func connectTo(host: String, port: Int) async throws -> OutputStream {
        var outStream: OutputStream?
        Stream.getStreamsToHost(withName: host, port: port, inputStream: nil, outputStream: &outStream)

        guard let output = outStream else {
            throw NSError(domain: "PrinterPlugin", code: -1, userInfo: [NSLocalizedDescriptionKey: "Не удалось открыть соединение"])
        }

        output.open()
        return output
    }

    private func send(data: Data, using stream: OutputStream) async throws {
        let result = data.withUnsafeBytes {
            stream.write($0.bindMemory(to: UInt8.self).baseAddress!, maxLength: data.count)
        }

        if result <= 0 {
            throw NSError(domain: "PrinterPlugin", code: -2, userInfo: [NSLocalizedDescriptionKey: "Ошибка при отправке данных"])
        }

        stream.close()
    }
}
