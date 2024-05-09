package io.ionic.starter;

import android.content.Context;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintJob;
import android.print.PrintManager;
import android.util.Base64;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Arrays;

@CapacitorPlugin(name = "Printer")
public class PrinterPlugin extends Plugin {

  @PluginMethod()
  public void print(PluginCall call) {
    String value = call.getString("value");


    // Get a PrintManager instance
    PrintManager printManager = (PrintManager) getActivity()
      .getSystemService(Context.PRINT_SERVICE);

    String jobName = R.string.app_name + " Document";

    // Get a print adapter instance
    PrintDocumentAdapter printAdapter = new PrinterAdapter(getContext(), value);

    // Create a print job with name and adapter instance
    PrintJob printJob = printManager.print(jobName, printAdapter,
      new PrintAttributes.Builder().build());

    call.resolve();
  }

  @PluginMethod()
  public void printTest(PluginCall call) {
    String host = call.getString("host");
    Integer port = call.getInt("port");
    String base64Value = call.getString("value");
    byte[] decodedBytes = Base64.decode(base64Value, Base64.NO_WRAP);


    JSObject ret = new JSObject();
    try {
      Socket sock = new Socket(host, Integer.valueOf(9100));
      OutputStream outputStream = sock.getOutputStream();
//      outputStream.write("<ESC>%–12345X".getBytes());
      outputStream.write(decodedBytes);
      outputStream.close();
      sock.close();
      ret.put("status", "Печать запущена...");
    } catch (IOException e) {
      ret.put("status", e.getMessage());
    } finally {
      call.resolve(ret);
    }
  }

  public String generatePCL3GUI() {
    StringBuilder pclCode = new StringBuilder();

    pclCode.append("\u001B%-12345X@PJL JOB\r\n");
    pclCode.append("@PJL ENTER LANGUAGE=PCL3GUI\r\n");

    pclCode.append("\u001B*s0M"); // Set color mode to monochrome
    pclCode.append("\u001B*t300R"); // Set resolution to 300 dpi
    pclCode.append("\u001B*r0F"); // Set orientation to portrait


    pclCode.append("\u001B(8U"); // Select font: Courier New
    pclCode.append("\u001BE"); // Start of the print job
    pclCode.append("\u001B&a100H"); // Set position (x=100, y=100)
    pclCode.append("Hello, world!\r\n"); // Print text

    pclCode.append("\u001B%-12345X@PJL EOJ\r\n");

    return pclCode.toString();
  }


}
