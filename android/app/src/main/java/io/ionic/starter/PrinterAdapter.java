package io.ionic.starter;

import android.content.Context;
import android.os.Bundle;
import android.os.CancellationSignal;
import android.os.ParcelFileDescriptor;
import android.print.PageRange;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintDocumentInfo;
import android.util.Base64;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;


public class PrinterAdapter extends PrintDocumentAdapter {
  Context context = null;
  String base64Str = "";

  public PrinterAdapter(Context ctxt, String base64Str) {
    context = ctxt;
    this.base64Str = base64Str;
  }

  @Override
  public void onLayout(
    PrintAttributes oldAttributes,
    PrintAttributes newAttributes,
    CancellationSignal cancellationSignal,
    LayoutResultCallback layoutResultCallback,
    Bundle bundle
  ) {
    if (cancellationSignal.isCanceled()) {
      layoutResultCallback.onLayoutCancelled();
    } else {
      PrintDocumentInfo.Builder builder =
        new PrintDocumentInfo.Builder(" PDF Order");
      builder.setContentType(PrintDocumentInfo.CONTENT_TYPE_DOCUMENT)
        .setPageCount(PrintDocumentInfo.PAGE_COUNT_UNKNOWN)
        .build();
      layoutResultCallback.onLayoutFinished(builder.build(),
        !newAttributes.equals(oldAttributes));
    }
  }

  @Override
  public void onWrite(
    PageRange[] pageRanges,
    ParcelFileDescriptor parcelFileDescriptor,
    CancellationSignal cancellationSignal,
    WriteResultCallback writeResultCallback
  ) {
    FileOutputStream out = null;
    try {
      out = new FileOutputStream(parcelFileDescriptor.getFileDescriptor());
      out.write(Base64.decode(base64Str, Base64.NO_WRAP));

      if (cancellationSignal.isCanceled()) {
        writeResultCallback.onWriteCancelled();
      } else {
        writeResultCallback.onWriteFinished(new PageRange[]{PageRange.ALL_PAGES});
      }
    } catch (Exception e) {
      writeResultCallback.onWriteFailed(e.getMessage());

    } finally {
      try {
        out.close();
      } catch (IOException e) {
        writeResultCallback.onWriteCancelled();
      }
    }
  }
}
