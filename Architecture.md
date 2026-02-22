# 🏗 Architecture Documentation

## 1. High-Level Architecture

We use a **Feature-First Modular Architecture**.

src/
├── components/ → shared UI components
├── design/ → theme, tokens
├── features/
│ ├── sales/
│ └── expenses/
└── navigation/

Each feature owns:

- Screens
- Components
- Bottom sheets
- Models
- Types
- Feature-specific utilities

---

## 2. Architectural Decisions

### ✅ 1. Feature-Based Structure

We DO NOT organize by "screens/components/hooks".
We organize by feature domain:

- sales/
- expenses/

Each feature is isolated.

---

### ✅ 2. Bottom Sheet Pattern

All bottom sheets follow this structure:

filterSheet/
├── index.ts
├── salesFilterSheet.model.ts
├── SalesFilterSheet.tsx (container)
├── SalesSectionTitle.tsx
├── SalesPaymentChipsRow.tsx
├── SalesItemPicker.tsx
└── ...

Pattern:

- Container component manages draft state.
- Small subcomponents are pure UI.
- Sheet receives `sheetRef` from parent.
- Sheet does NOT create its own internal ref.
- Sheet never controls global state directly.
- Sheet returns filters via `onApply`.

---

### ✅ 3. State Management Pattern

We currently use:

- Local component state (`useState`)
- Derived state via `useMemo`
- Controlled draft pattern for filters

Pattern:

1. Parent screen owns applied state.
2. Bottom sheet owns draft state.
3. On apply → pass clone to parent.
4. Parent updates real state.

We do NOT use:

- Redux
- Zustand
- MobX
- Context for business logic (yet)

---

### ✅ 4. Model Files

Each filter sheet has a `.model.ts` file.

Purpose:

- Define filter type
- Define defaults
- Provide clone helpers

Example:

Pattern:

- Container component manages draft state.
- Small subcomponents are pure UI.
- Sheet receives `sheetRef` from parent.
- Sheet does NOT create its own internal ref.
- Sheet never controls global state directly.
- Sheet returns filters via `onApply`.

---

### ✅ 3. State Management Pattern

We currently use:

- Local component state (`useState`)
- Derived state via `useMemo`
- Controlled draft pattern for filters

Pattern:

1. Parent screen owns applied state.
2. Bottom sheet owns draft state.
3. On apply → pass clone to parent.
4. Parent updates real state.

We do NOT use:

- Redux
- Zustand
- MobX
- Context for business logic (yet)

---

### ✅ 4. Model Files

Each filter sheet has a `.model.ts` file.

Purpose:

- Define filter type
- Define defaults
- Provide clone helpers

Example:
salesFilterSheet.model.ts
expenseFilters.model.ts

We always clone filter objects before mutation.

---

### ✅ 5. Theming

We use:

- useAppTheme()
- design/tokens (space, radius, typography)

No hardcoded colors unless temporary.
Spacing must come from tokens.

---

### ✅ 6. Component Rules

- UI components are dumb.
- Containers hold logic.
- No business logic inside row components.
- No state inside presentational components unless purely UI.

---

### ✅ 7. Ref Pattern (BottomSheetModal)

Ref lives in screen:
const sheetRef = useRef<BottomSheetModal | null>(null);

Passed to sheet:
<SalesFilterSheet sheetRef={sheetRef} /> ```

Sheet NEVER creates its own modal ref.
✅ 8. Naming Conventions

Types:
SalesFilters
ExpenseFilters

Components:
SalesFilterSheet
SalesPaymentChipsRow

Handlers:
onApply
onClear
onChange
State:
draft (for editable sheet state)
preset
category
payment

3. API Structure (Future)

API layer will follow:
src/api/
├── sales.api.ts
├── expenses.api.ts
└── client.ts

Rules:
No API calls inside UI components.
Services return typed data.
Screens call services.

4.Important Constraints
Strict TypeScript.
No implicit any.
No unsafe type casting.
No duplicate component responsibilities.
No circular imports.
No file casing mismatches.

5. Performance Decisions
   memo() used for heavy UI components.
   useCallback for handlers passed to children.
   useMemo for derived values.
   No unnecessary re-renders.

6. What We Explicitly Avoid
   ❌ Monolithic files
   ❌ Massive 1000-line components
   ❌ Putting entire UI in one file
   ❌ Global mutable state
   ❌ Hardcoded layout spacing
   ❌ Inline business logic in UI rows
   ❌ Multiple bottom sheet refs
   ❌ Conditional mounting of BottomSheetModal
   ❌ Passing entire objects when only one field is needed

7. Anti-Patterns to Prevent
   Sheet managing global filters
   Deep prop drilling of entire objects
   Mutating filter objects directly
   Using any to silence errors
   Using inline anonymous functions inside large FlatLists
   Mixing presentation + logic layers

---
