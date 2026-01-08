import { AppButton, AppDivider, AppText } from "@/components";
import { useAppTheme } from "@/design/theme/AppThemeProvider";
import { radius } from "@/design/tokens/radius";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetTextInput,
    BottomSheetView, // <--- CHANGED: Better keyboard handling
} from "@gorhom/bottom-sheet";
import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    FlatList,
    Keyboard,
    Pressable,
    StyleSheet,
    View,
    type ListRenderItemInfo,
    type ViewStyle,
} from "react-native";

type Id = string | number;

type SingleSelectProps<T> = {
  multiple?: false;

  value?: Id | null;
  defaultValue?: Id | null;
  onChange?: (value: Id | null, item: T | null) => void;

  allowClear?: boolean;
};

type MultiSelectProps<T> = {
  multiple: true;

  values?: Id[]; // controlled
  defaultValues?: Id[]; // uncontrolled
  onChangeValues?: (values: Id[], items: T[]) => void;

  allowClear?: boolean; // clear all
  closeOnSelect?: boolean; // if true, closes on every selection (usually false for multi)
};

type CommonProps<T> = {
  label?: string;
  placeholder?: string;
  title?: string;

  data: T[];

  // How to read item
  getValue: (item: T) => Id;
  getLabel: (item: T) => string;

  // Optional custom row
  renderItem?: (args: {
    item: T;
    selected: boolean;
    onPress: () => void;
  }) => React.ReactNode;

  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  filterFn?: (item: T, query: string) => boolean;

  // UI
  disabled?: boolean;
  error?: string;
  containerStyle?: ViewStyle;

  // Bottom sheet
  snapPoints?: (string | number)[];
  closeOnSelect?: boolean; // single default true

  // Empty state
  emptyText?: string;

  // ✅ Scroll-to-selected behavior
  scrollToSelectedOnOpen?: boolean; // default true
  // Helps FlatList scrollToIndex be reliable if you use default rows.
  // If you provide custom rows with variable heights, set this off OR keep it and it will fallback safely.
  estimatedItemHeight?: number; // default 52

  // For multi display
  maxPreviewLabels?: number; // default 2 -> "A, B +3"
};

export type AppSelectFieldProps<T> = CommonProps<T> &
  (SingleSelectProps<T> | MultiSelectProps<T>);

function defaultFilter<T>(
  getLabel: (item: T) => string,
  item: T,
  query: string
) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return getLabel(item).toLowerCase().includes(q);
}

function toKey(x: Id) {
  return String(x);
}

// ✅ FIXED: Define default outside component to avoid re-creation on every render
const DEFAULT_SNAP_POINTS = ["60%"];

function AppSelectFieldBase<T>(props: AppSelectFieldProps<T>) {
  const {
    label,
    placeholder = "Select",
    title,
    data = [],
    getValue,
    getLabel,
    renderItem,

    searchable = true,
    searchPlaceholder = "Search...",
    filterFn,

    disabled = false,
    error,
    containerStyle,

    snapPoints: propSnapPoints, // Rename to allow memoization logic
    emptyText = "No items found",

    scrollToSelectedOnOpen = true,
    estimatedItemHeight = 52,

    maxPreviewLabels = 2,
  } = props;

  const isMultiple = props.multiple === true;

  const { colors, mode } = useAppTheme();

  const sheetRef = useRef<BottomSheetModal>(null);
  const listRef = useRef<FlatList<T>>(null);

  // ✅ FIXED: Memoize snapPoints. This is crucial for @gorhom/bottom-sheet
  const snapPoints = useMemo(() => {
    return propSnapPoints || DEFAULT_SNAP_POINTS;
  }, [propSnapPoints]);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false); // keep tracking open state for search clear etc if needed, but mainly for ref

  // -----------------------------
  // Selection state (single vs multi)
  // -----------------------------

  // Single internal selection
  const [internalValue, setInternalValue] = useState<Id | null>(
    !isMultiple ? props.defaultValue ?? null : null
  );

  // Multi internal selection
  const [internalValues, setInternalValues] = useState<Id[]>(
    isMultiple ? props.defaultValues ?? [] : []
  );

  // Controlled detection
  const singleIsControlled = !isMultiple && typeof props.value !== "undefined";
  const multiIsControlled = isMultiple && typeof props.values !== "undefined";

  const selectedValue: Id | null = !isMultiple
    ? (singleIsControlled ? props.value : internalValue) ?? null
    : null;

  const selectedValues: Id[] = isMultiple
    ? multiIsControlled
      ? props.values ?? []
      : internalValues
    : [];

  // Keep internal selection in sync when default changes (uncontrolled only)
  useEffect(() => {
    if (!isMultiple && !singleIsControlled) {
      setInternalValue(props.defaultValue ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!isMultiple ? props.defaultValue : undefined]);

  useEffect(() => {
    if (isMultiple && !multiIsControlled) {
      setInternalValues(props.defaultValues ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMultiple ? props.defaultValues : undefined]);

  // -----------------------------
  // Derived data
  // -----------------------------

  const filtered = useMemo(() => {
    const fn = filterFn
      ? (item: T) => filterFn(item, query)
      : (item: T) => defaultFilter(getLabel, item, query);
    return data.filter(fn);
  }, [data, filterFn, getLabel, query]);

  const selectedItem = useMemo(() => {
    if (isMultiple) return null;
    if (selectedValue == null) return null;
    const found = data.find(
      (it) => toKey(getValue(it)) === toKey(selectedValue)
    );
    return found ?? null;
  }, [data, getValue, isMultiple, selectedValue]);

  const selectedItemsMulti = useMemo(() => {
    if (!isMultiple) return [];
    const set = new Set(selectedValues.map(toKey));
    return data.filter((it) => set.has(toKey(getValue(it))));
  }, [data, getValue, isMultiple, selectedValues]);

  const displayText = useMemo(() => {
    if (!isMultiple) {
      return selectedItem ? getLabel(selectedItem) : "";
    }

    if (selectedItemsMulti.length === 0) return "";

    const labels = selectedItemsMulti.map(getLabel);
    const shown = labels.slice(0, maxPreviewLabels);
    const rest = labels.length - shown.length;

    return rest > 0 ? `${shown.join(", ")} +${rest}` : shown.join(", ");
  }, [
    getLabel,
    isMultiple,
    maxPreviewLabels,
    selectedItem,
    selectedItemsMulti,
  ]);

  // -----------------------------
  // Sheet open/close
  // -----------------------------

  const openSheet = useCallback(() => {
    if (disabled) return;
    console.log("openSheet");
    setOpen(true);
    // Optional: clear query on open?
    // setQuery("");
    sheetRef.current?.present();
  }, [disabled]);

  const closeSheet = useCallback(() => {
    setOpen(false);
    Keyboard.dismiss();
    sheetRef.current?.dismiss();
  }, []);

  // -----------------------------
  // Commit selection
  // -----------------------------
  const multiple = props.multiple === true;

  const onChangeSingle = !multiple ? props.onChange : undefined;
  const onChangeMulti = multiple ? props.onChangeValues : undefined;

  const commitSingle = useCallback(
    (next: Id | null, item: T | null) => {
      if (multiple) return;
      if (!singleIsControlled) setInternalValue(next);
      onChangeSingle?.(next, item);
    },
    [multiple, singleIsControlled, onChangeSingle]
  );

  const commitMulti = useCallback(
    (nextValues: Id[]) => {
      if (!multiple) return;
      if (!multiIsControlled) setInternalValues(nextValues);

      const set = new Set(nextValues.map(toKey));
      const items = data.filter((it) => set.has(toKey(getValue(it))));

      onChangeMulti?.(nextValues, items);
    },
    [data, getValue, multiple, multiIsControlled, onChangeMulti]
  );

  const handleSelect = useCallback(
    (item: T) => {
      const id = getValue(item);

      // multi select toggle
      if (isMultiple) {
        const exists = selectedValues.some((v) => toKey(v) === toKey(id));
        const next = exists
          ? selectedValues.filter((v) => toKey(v) !== toKey(id))
          : [...selectedValues, id];

        commitMulti(next);

        // multi: usually don't close on select unless explicitly requested
        const closeOnPick =
          typeof props.closeOnSelect === "boolean"
            ? props.closeOnSelect
            : false;
        if (closeOnPick) closeSheet();
        return;
      }

      // single select
      commitSingle(id, item);
      const closeOnPick =
        typeof props.closeOnSelect === "boolean" ? props.closeOnSelect : true;
      if (closeOnPick) closeSheet();
    },
    [
      closeSheet,
      commitMulti,
      commitSingle,
      getValue,
      isMultiple,
      props.closeOnSelect,
      selectedValues,
    ]
  );

  const handleClear = useCallback(() => {
    if (isMultiple) {
      commitMulti([]);
    } else {
      commitSingle(null, null);
    }
    closeSheet();
  }, [closeSheet, commitMulti, commitSingle, isMultiple]);

  // -----------------------------
  // Scroll-to-selected on open
  // -----------------------------

  const selectedIndexInFiltered = useMemo(() => {
    if (!scrollToSelectedOnOpen) return -1;

    if (isMultiple) {
      // In multi: scroll to the first selected item (if any)
      const first = selectedValues[0];
      if (first == null) return -1;
      return filtered.findIndex((it) => toKey(getValue(it)) === toKey(first));
    }

    if (selectedValue == null) return -1;
    return filtered.findIndex(
      (it) => toKey(getValue(it)) === toKey(selectedValue)
    );
  }, [
    filtered,
    getValue,
    isMultiple,
    scrollToSelectedOnOpen,
    selectedValue,
    selectedValues,
  ]);

  useEffect(() => {
    if (!open) return;
    if (!scrollToSelectedOnOpen) return;
    if (selectedIndexInFiltered < 0) return;

    // small delay to let BottomSheet + FlatList mount
    const t = setTimeout(() => {
      try {
        listRef.current?.scrollToIndex({
          index: selectedIndexInFiltered,
          animated: true,
          viewPosition: 0.5,
        });
      } catch {
        // safe fallback handled by onScrollToIndexFailed
      }
    }, 250);

    return () => clearTimeout(t);
  }, [open, scrollToSelectedOnOpen, selectedIndexInFiltered]);

  // If scrollToIndex fails (virtualization not ready), retry using offset.
  const onScrollToIndexFailed = useCallback(
    (info: { index: number; averageItemLength: number }) => {
      const offset =
        info.index * (info.averageItemLength || estimatedItemHeight);
      listRef.current?.scrollToOffset({ offset, animated: true });

      // retry scrollToIndex after a tick
      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: info.index,
          animated: true,
          viewPosition: 0.5,
        });
      }, 200);
    },
    [estimatedItemHeight]
  );

  // -----------------------------
  // List helpers
  // -----------------------------

  const keyExtractor = useCallback(
    (item: T) => String(getValue(item)),
    [getValue]
  );

  const isSelected = useCallback(
    (item: T) => {
      const id = getValue(item);
      if (isMultiple) return selectedValues.some((v) => toKey(v) === toKey(id));
      return selectedValue != null && toKey(selectedValue) === toKey(id);
    },
    [getValue, isMultiple, selectedValue, selectedValues]
  );

  const renderRow = useCallback(
    ({ item }: ListRenderItemInfo<T>) => {
      const selected = isSelected(item);
      const onPress = () => handleSelect(item);

      if (renderItem) return <>{renderItem({ item, selected, onPress })}</>;

      return (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.row,
            {
              backgroundColor: selected
                ? mode === "dark"
                  ? "rgba(47,128,237,0.18)"
                  : "rgba(47,128,237,0.10)"
                : "transparent",
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <AppText
            style={{
              color: colors.text,
              fontWeight: selected ? "700" : "600",
              flex: 1,
            }}
          >
            {getLabel(item)}
          </AppText>

          {/* lightweight check indicator */}
          {selected ? (
            <AppText
              style={{
                color: colors.primary,
                fontWeight: "800",
                marginLeft: 10,
              }}
            >
              ✓
            </AppText>
          ) : null}
        </Pressable>
      );
    },
    [
      colors.primary,
      colors.text,
      getLabel,
      handleSelect,
      isSelected,
      mode,
      renderItem,
    ]
  );

  const Backdrop = useCallback(
    (p: any) => (
      <BottomSheetBackdrop
        {...p}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <View style={[containerStyle, { width: "100%" }]}>
      {label ? (
        <AppText variant="muted" style={{ marginBottom: 6 }}>
          {label}
        </AppText>
      ) : null}

      {/* Field */}
      <Pressable
        onPress={openSheet}
        disabled={disabled}
        style={[
          styles.field,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
            opacity: disabled ? 0.55 : 1,
          },
        ]}
      >
        <AppText
          numberOfLines={1}
          style={{
            color: displayText ? colors.text : colors.placeholder,
            fontWeight: "600",
            flex: 1,
          }}
        >
          {displayText || placeholder}
        </AppText>
        <AppText
          style={{ color: colors.muted, fontSize: 18, fontWeight: "700" }}
        >
          ▾
        </AppText>
      </Pressable>

      {error ? (
        <AppText variant="muted" style={{ color: colors.danger, marginTop: 6 }}>
          {error}
        </AppText>
      ) : null}

      {/* Bottom Sheet */}
      <BottomSheetModal
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        // backdropComponent={Backdrop}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.divider }}
      >
        <BottomSheetView>
        <View style={styles.sheetHeader}>
          <AppText variant="subtitle">{title ?? label ?? "Select"}</AppText>

          {props.allowClear ? (
            (isMultiple ? selectedValues.length > 0 : selectedValue != null) ? (
              <Pressable
                onPress={handleClear}
                hitSlop={10}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <AppText style={{ color: colors.primary, fontWeight: "700" }}>
                  Clear
                </AppText>
              </Pressable>
            ) : (
              <View style={{ width: 44 }} />
            )
          ) : (
            <View style={{ width: 44 }} />
          )}
        </View>

        {searchable ? (
          <View style={styles.searchWrap}>
            {/* ✅ FIXED: Use BottomSheetTextInput for proper keyboard interaction */}
            <BottomSheetTextInput
              value={query}
              onChangeText={setQuery}
              placeholder={searchPlaceholder}
              placeholderTextColor={colors.placeholder}
              style={[
                styles.searchInput,
                {
                  backgroundColor:
                    mode === "dark" ? "rgba(255,255,255,0.06)" : "#F2F4F8",
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
            />
          </View>
        ) : null}

        <AppDivider />

        <FlatList
          ref={listRef}
          data={filtered}
          keyExtractor={keyExtractor}
          renderItem={renderRow}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={onScrollToIndexFailed}
          // If you keep default rows, this makes scrollToIndex more reliable:
          getItemLayout={
            renderItem
              ? undefined
              : (_data, index) => ({
                  length: estimatedItemHeight,
                  offset: estimatedItemHeight * index,
                  index,
                })
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <AppText variant="muted">{emptyText}</AppText>
            </View>
          }
        />

        {/* Multi-select footer: Done */}
        {isMultiple ? (
          <View style={styles.footer}>
            <AppButton title="Done" variant="primary" onPress={closeSheet} />
          </View>
        ) : null}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  sheetHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  searchWrap: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  searchInput: {
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "600",
  },

  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  empty: {
    padding: 16,
  },

  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export const AppSelectField = memo(
  AppSelectFieldBase
) as typeof AppSelectFieldBase;
