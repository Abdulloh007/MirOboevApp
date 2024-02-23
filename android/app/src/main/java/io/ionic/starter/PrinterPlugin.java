package io.ionic.starter;

import android.content.Context;
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


    JSObject ret = new JSObject();
    ret.put("value", value);
    call.resolve(ret);
  }




}
