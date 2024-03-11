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
      Socket sock = new Socket(host, port);
      OutputStream outputStream = sock.getOutputStream();
      outputStream.write(decodedBytes);
      outputStream.close();
      sock.close();
      ret.put("status", "Success");
} catch (IOException e) {
  ret.put("status", e.getMessage());
  } finally {
  call.resolve(ret);
  }
  }

}
