## Description

<!-- Brief description of changes -->

## AI_RULES Compliance Checklist

- [ ] No `any` or `as unknown as` (Rule #4)
- [ ] Bottom sheet receives `sheetRef` from parent, uses draft state, returns cloned filters (Rule #2)
- [ ] Spacing from design tokens; no hardcoded values (Rule #6)
- [ ] `memo()` for UI rows, `useCallback` for handlers, `useMemo` for derived values (Rule #7)
- [ ] No Redux/Zustand/MobX/Context for business logic (Rule #8)
- [ ] New filter sheet includes model.ts, container, section title, row components, index.ts (Rule #3)

## Files Changed

<!-- List key files -->

## Tests

<!-- Unit/integration tests added or updated -->

## Performance / Security

<!-- Any checks run (lint, typecheck, manual QA) -->
