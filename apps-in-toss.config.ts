import { defineConfig } from "@apps-in-toss/web-framework/config";

import { TOSS_APP_NAME } from "./src/shared/config";

export default defineConfig({
  appName: TOSS_APP_NAME,
  brand: {
    primaryColor: "#7f39fa",
  },
  permissions: [],
  webView: {
    allowsBackForwardNavigationGestures: false,
  },
  webBundleDir: "out",
});
