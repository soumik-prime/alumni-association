export function normalizeDatabaseUrl(connectionString: string | undefined) {
  if (!connectionString) return connectionString;

  try {
    const url = new URL(connectionString);
    const sslMode = url.searchParams.get("sslmode");

    if (
      sslMode === "prefer" ||
      sslMode === "require" ||
      sslMode === "verify-ca"
    ) {
      url.searchParams.set("sslmode", "verify-full");
      return url.toString();
    }
  } catch {
    // Leave non-URL connection strings unchanged for the driver to handle.
  }

  return connectionString;
}
