package com.lunafashion.common;

import java.text.Normalizer;
import java.util.Locale;

public final class SlugUtils {

  private SlugUtils() {
  }

  public static String from(String value) {
    if (value == null) {
      return "";
    }

    String normalized = Normalizer.normalize(value, Normalizer.Form.NFD)
        .replaceAll("\\p{M}", "")
        .replace('đ', 'd')
        .replace('Đ', 'D')
        .toLowerCase(Locale.ROOT)
        .replaceAll("[^a-z0-9]+", "-")
        .replaceAll("(^-|-$)", "");

    return normalized.replaceAll("-{2,}", "-");
  }
}
