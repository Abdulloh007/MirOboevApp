package io.ionic.starter;

import android.content.Context;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintJob;
import android.print.PrintManager;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

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




}
