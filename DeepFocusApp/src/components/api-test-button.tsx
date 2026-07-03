import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { loginUser } from "@/api/auth";
import { getAuthToken, removeAuthToken, setAuthToken } from "@/api/client";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export function ApiTestButton() {
  const [status, setStatus] = useState("");
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    getAuthToken().then((token) => setHasToken(!!token));
  }, []);

  async function handleTestPost() {
    setStatus("Sending...");
    const result = await loginUser("test@example.com", "password123");
    setStatus(result.ok ? "Posted successfully" : `Error: ${result.error}`);
  }

  async function handleTokenToggle() {
    if (hasToken) {
      await removeAuthToken();
      setHasToken(false);
      setStatus("Token removed");
    } else {
      await setAuthToken("demo-token-123");
      setHasToken(true);
      setStatus("Token created");
    }
  }

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedView style={styles.row}>
        <Pressable onPress={handleTestPost} style={styles.button}>
          <ThemedText type="smallBold">Test Axios POST</ThemedText>
        </Pressable>

        <Pressable onPress={handleTokenToggle} style={styles.button}>
          <ThemedText type="smallBold">
            {hasToken ? "Remove auth token" : "Create auth token"}
          </ThemedText>
        </Pressable>
      </ThemedView>

      {status ? <ThemedText type="small">{status}</ThemedText> : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.two,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: Spacing.two,
  },
  button: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    backgroundColor: "#3c87f7",
    borderRadius: Spacing.two,
  },
});
