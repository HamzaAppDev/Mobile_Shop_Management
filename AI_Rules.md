# 🤖 AI Coding Rules (STRICT)

These rules MUST be followed by any AI assistant working on this codebase.

---

# 1. DO NOT BREAK ARCHITECTURE

Never:

- Collapse feature folders
- Move filterSheet components outside feature
- Merge container + UI components
- Introduce global state without explicit request

---

# 2. Bottom Sheet Rules

- Sheet MUST receive sheetRef from parent.
- Sheet MUST NOT create its own ref.
- Sheet MUST use draft state pattern.
- Sheet MUST return cloned filters.
- Sheet MUST not call navigation directly.

---

# 3. File Creation Rules

When creating a new filter sheet:

You MUST create:

- model.ts
- container component
- section title component
- row components
- index.ts barrel export

Do not put everything in one file.

---

# 4. TypeScript Rules

- No `any`
- No `as unknown as`
- No unsafe casting
- Use union types for preset/payment
- Clone objects before mutating

---

# 5. State Management Rules

Parent screen owns applied state.
Sheet owns draft state.

Never reverse this pattern.

---

# 6. Theming Rules

- Always use useAppTheme()
- Always use design tokens for spacing
- No hardcoded spacing like 12, 18 unless token missing
- No inline color literals except temporary debug

---

# 7. Performance Rules

- Use memo() for pure UI rows
- useCallback for handler props
- useMemo for derived labels
- Avoid re-creating arrays inline in render

---

# 8. Explicitly Forbidden

- Redux
- Zustand
- MobX
- Context-based business logic
- Global singleton stores
- Massive God components
- Duplicate UI logic across features
- Side effects inside UI rows

---

# 9. When Extending Features

If adding:

- New filter → update model + UI component + container wiring
- New payment type → update union type
- New preset → update preset union + row component

Never modify structure casually.

---

# 10. Before Writing Code

AI must:

1. Check existing architecture.
2. Reuse patterns.
3. Follow folder structure.
4. Avoid introducing new patterns unless explicitly asked.

If unsure → follow Sales filter pattern.

---

# 11. Known Bugs to Be Careful Of

- File name casing mismatch.
- Incorrect barrel exports.
- Multiple sheet refs.
- Forgetting BottomSheetModalProvider.
- Icon name type mismatch.

---

This project prioritizes:
Clarity > Cleverness  
Structure > Speed  
Consistency > Creativity
