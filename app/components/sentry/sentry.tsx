import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "__DSN__"
});

Sentry.setTag("myTag", "tag-value");
Sentry.setExtra("myExtra", "extra-value");
Sentry.addBreadcrumb({ message: "test" });

Sentry.captureMessage("Hello Sentry!");