import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Pressable, Text, View } from "react-native";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
        Something went wrong
      </Text>

      <Text style={{ fontSize: 14, opacity: 0.75, marginBottom: 16 }}>
        Please try again. If it keeps happening, contact the owner.
      </Text>

      {/* Keep the error hidden in production; show it in dev only */}
      {__DEV__ ? (
        <Text style={{ fontSize: 12, opacity: 0.6, marginBottom: 16 }}>
          {String(error?.message ?? error)}
        </Text>
      ) : null}

      <Pressable
        onPress={resetErrorBoundary}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 10,
          backgroundColor: "#0B5ED7",
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Reload</Text>
      </Pressable>
    </View>
  );
}

type Props = {
  children: React.ReactNode;
};

export function AppErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        // ✅ Later: send this to Crashlytics / Sentry / Firestore logs
        console.error("AppErrorBoundary:", error);
        console.error("Component stack:", info.componentStack);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}