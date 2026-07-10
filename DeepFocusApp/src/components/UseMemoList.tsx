import { useMemo, useState } from "react";
import { FlatList, VirtualizedList, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

function expensiveCalculation(n: number): number {
  let total = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  }
  return total;
}

export default function UseMemoList({ count }: { count: number }) {
  const [renderAmount, setRenderAmount] = useState("100");

  const numbers = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => i + 1);
  }, []);

  const visibleNumbers = useMemo(() => {
    const amount = parseInt(renderAmount, 10);
    const validAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;
    return numbers.slice(0, validAmount);
  }, [renderAmount, numbers]);

  const sum = useMemo(() => {
    return expensiveCalculation(visibleNumbers.length);
  }, [visibleNumbers]);

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <TextInput
        value={renderAmount}
        onChangeText={setRenderAmount}
        placeholder="Render amount..."
        placeholderTextColor="#999"
        keyboardType="numeric"
        style={styles.input}
      />
      <ThemedText>Count prop: {count}</ThemedText>
      <ThemedText>Rendered count: {visibleNumbers.length}</ThemedText>
      <ThemedText>Expensive sum: {sum}</ThemedText>
      <FlatList
        initialNumToRender={visibleNumbers.length}
        data={visibleNumbers}
        horizontal={true}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <ThemedText style={styles.item}>{item} </ThemedText>
        )}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    padding: Spacing.three,
    borderRadius: Spacing.four,
    gap: Spacing.two,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: Spacing.two,
    color: "#000",
  },
  list: {
    maxHeight: 256,
  },
  item: {
    paddingVertical: Spacing.one,
  },
});
