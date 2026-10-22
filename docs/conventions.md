# Code conventions

TypeScript, naming, JSX, Redux, file layout. Styling is in a separate doc:
[`styling.md`](./styling.md).

---

## TypeScript

### `any`

Use `any` only when you actually want to allow any value. Not as a "I don't
want to type this" escape hatch. When you do use it, annotate with an
ESLint disable:

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
```

### `Function` as a type

Don't use it. Always write out the signature:

```ts
// good
onItemSelected: (item: MyItem) => void

// bad
onItemSelected: Function
```

### Array types

Use `T[]`, not `Array<T>`:

```ts
// good
const students: Student[] = [...]

// bad
const students: Array<Student> = [...]
```

---

## Naming

### Types

- `CapitalCamelCase` for all types, regardless of whether they're classes,
  enums, interfaces, or plain type aliases.
- No suffixes like `…Type` or `…Enum`.
  - good: `LoadingStatus`
  - bad: `LoadingStatusEnum`
- Type names are singular unless they truly represent a plural concept:
  ```ts
  // good
  type Direction = 'top' | 'bottom' | 'left' | 'right'
  // bad
  type Directions = 'top' | 'bottom' | 'left' | 'right'
  ```

### Enums

Enum **values** in `CAPITAL_SNAKE_CASE`:

```ts
enum MyEnum {
  VALUE_1,
  VALUE_2,
}
```

### Booleans

Always start with a predicate: `is…`, `should…`, `has…`, `can…`.

- good: `isVisible`, `shouldShowProxyList`, `hasItem`
- bad:  `visible`, `showProxyList`, `proxySwitchState`

### Event handlers

`on<Event>`:

- good: `onClick`, `onRequestTimeout`
- bad:  `clicked`, `click`, `clickHandler`, `handleRequestTimeout`

### Files

| What                         | Filename convention                 | Example                             |
| ---------------------------- | ----------------------------------- | ----------------------------------- |
| React component (default export) | `UpperCamelCase.tsx`            | `NavigationBar.tsx`                 |
| Component variant            | `BaseComponent.variant.tsx`         | `NavigationMenu.mobile.tsx`         |
| Unit test (colocated)        | `FilePrefix.test.tsx`               | `LoadingSpinner.test.tsx`           |
| Utility / data / hook        | `lowerCamelCase.ts(x)`              | `apiWrapper.tsx`, `useWindowSize.ts`|

Bad: `navigation-bar.tsx`, `MobileNavigationMenu.tsx`, `utilityFunctionsTest.tsx`.

---

## JSX

### Anonymous functions

You can pass anonymous functions as props, but prefer named functions
*outside* the JSX when:

- the body is long enough to disrupt reading the JSX structure,
- the same function is used more than once,
- the function needs to be memoised,
- you have multiple closely-related anonymous functions that could clearly
  fold into a single parameterised function.

Inside JSX, anonymous functions should be simple glue — "tie these pieces
together", nothing else.

### String props

```tsx
// good
<Dialog message="hello" />

// bad
<Dialog message={'hello'} />
```

### Conditional rendering — when operators and statements matter

- `&&`, `||`, and `?:` are fine when the resulting value is actually used
  (e.g. for rendering, for assignment).
- When the operators are used **only for side effects**, use `if` instead.

```tsx
// good — value is used for rendering
{isPremiumUser && <BillingInfo />}

// good — ternary, value used
const style = { color: isSelected ? 'green' : 'darkItemBG50' }

// bad — discarded value, only side-effect
shouldDoThing && doThingForSideEffects()
isLoggedIn ? showUserInfo() : redirectToLogout()

// good — same intent, statements
if (shouldDoThing) doThingForSideEffects()
if (isLoggedIn) showUserInfo()
else redirectToLogout()
```

### Children as arbitrary content

If a component accepts arbitrary content, use `children?: ReactNode`:

```tsx
// good
<Button>
  <Flex><PlusIcon /><Text>Add</Text></Flex>
</Button>

// bad
<Button content={<Flex>...</Flex>} />
```

---

## Idioms

### `!!` for boolean casting

Use only when a real `boolean` value is stored for later:

```ts
// good
const hasItem: boolean = !!item

// bad (needless, implicit conversion is the same)
const borderBottom = !!hasItem && !isLast ? '1px solid black' : 'none'
```

`!!value` is preferred to `Boolean(value)` for conciseness.

### One-time conditional assignment

Pick the lightest tool that fits:

```ts
// simple: ternary
const border = isLast ? '1px solid black' : 'none'

// complex: const + IIFE returning a value
const message = ((): string => {
  if (response.success)          return 'success!'
  else if (response.errorMessage) return response.errorMessage
  else                            return 'an unknown error occurred'
})()

// mapping: anonymous object
const Component = {
  mobile:  <MobileComponent />,
  tablet:  <TabletComponent />,
  desktop: <DesktopComponent />,
}[viewportSize]
```

Avoid `let` for a one-time assignment.

---

## When to split files

### Multiple components per file

OK when they're implementation details of a primary component. Reviewers may
ask you to split once the file crosses **300 lines**.

### Test fixtures

API responses in e2e tests can be inline TypeScript **only if**:

- the response is ≤ 50 lines, or
- the response is programmatically generated.

Anything larger goes in `tests/responsesMocks/` as its own file.

---

## Redux

### Selectors — make them specific

```tsx
// good
const isHapticsEnabled = useSelector(s => !!s.session.data?.haptics)

// bad
const session = useSelector(s => s.session)
const isHapticsEnabled = !!session.data?.haptics
```

Broad selectors cause unrelated state changes to re-render components.

### State shape

Plain data only — the `webext-redux` transport round-trips state through
`chrome.runtime.sendMessage`, which uses the structured clone algorithm.
Don't stash functions, DOM nodes, class instances, or anything else
structured-clone can't handle.

### Aliases

Async work that must run in the background should go through an alias.
See [`state-management.md`](./state-management.md#aliases).

---

## `api/` directory

Windscribe API calls live in `src/api/`. Redux thunks and components call
the specialised `api/...` functions. Do not call a Windscribe API endpoint
with a raw `fetch` from outside `src/api/`. The raw `fetch` calls outside
`src/api/` today are:

- `services/proxyAuth/checkIp.ts` (fetches `https://checkip.${workingApi}`)
- `utils/scriptController.ts` (fetches script files)
- `services/offscreenActions/checkIp.worker.js` and
  `services/proxyAuth/offscreen/checkIpWorker.js` (fetch
  `https://nosslscribe.com`)

```ts
// good: definition in api, call from a thunk

// src/api/endpoints.ts
const getNotifications = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<Notifications>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildAuthenticatedQueryString('Notifications'),
    undefined,
    false,
    getAuthorizationHeader(session_auth_hash),
  )

// src/state/slices/newsfeed.ts (abbreviated)
export const fetchNotifications = createAsyncThunk(
  FETCH_NOTIFICATIONS,
  async (_, { getState, dispatch }) => {
    const sessionAuthHash = getState().session.sessionData?.session_auth_hash
    if (!sessionAuthHash) {
      throw Error('No session auth hash is available')
    }

    const response = await getNotifications(dispatch, sessionAuthHash)
    // ...
  },
)
```

```ts
// bad: HTTP call outside api/
export const fetchNotifications = createAsyncThunk(
  FETCH_NOTIFICATIONS,
  async () => fetch('/Notifications?...'),
)
```

All API response types also live in `src/api/types.ts`.

---

## ESLint

Rules in `.eslintrc.js` are enforced. Disable comments require an
explanation. Changes to the ruleset must be discussed before merging.

### `react-hooks/exhaustive-deps`

Include all deps, even guaranteed-stable ones like `dispatch`. Only
disable when there's a body reference we deliberately don't want to
trigger re-runs on — and that case is usually a code smell.

---

## See also

- [`styling.md`](./styling.md) — colours, spacing, Theme-UI vs Mantine
  (direction is Mantine, though not yet adopted).
- [`state-management.md`](./state-management.md) — slice / alias / hook
  patterns.
- [`api.md`](./api.md) — endpoint layout.
