import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.unike.admin",
  appName: "UNIKE Admin",
  webDir: "dist",
  server: { androidScheme: "https" }
};

export default config;
