# Web team style guide

## Typing

- Explicit use of `any` should be reserved for cases where we actually want to allow any
  value, not in the case of simply not wishing to specify the type. When explicit any
  is used, we should provide an override via an ESLint ignore comment:

  ```typescript
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ```

- The use of `Function` as a type should be avoided in favour of explicit function signature
  types

  - ```typescript
    // good
    onItemSelected: (item: MyItem) => void
    ```
  - ```typescript
    // bad
    onItemSelected: Function
    ```

- Array types should be expressed using the `Type[]` syntax rather than `Array<Type>`.

  - ```typescript
    // good
    const students: Student[] = [{ name: 'John', age: 28 }, { name: 'Mary': age: 31 }]

    // bad
    const students: Array<Student> = [{ name: 'John', age: 28 }, { name: 'Mary': age: 31 }]
    ```

## Naming

### Types

- All types should be named with `CapitalCamelCase`, no matter whether they're classes,
  enums, types etc.
- All types should be named according to what they represent, without any suffix
  denoting the type of type
  - good: `LoadingStatus`
  - bad: `LoadingStatusEnum`
- Type names should agree in plurality with the represented concept, which almost always
  means singular.
  - ```typescript
    // good
    type Direction = 'top' | 'bottom' | 'left' | 'right'
    ```
  - ```typescript
    // bad
    type Directions = 'top' | 'bottom' | 'left' | 'right'
    ```

#### Enums

Enum values should be in `CAPITAL_SNAKE_CASE`.

```typescript
enum MyEnum {
  VALUE_1,
  VALUE_2,
}
```

### Variables

#### Booleans

Booleans should always have names that _start_ with a predicate verb to minimize ambiguity.

- - good: `isVisible`, `shouldShowProxyList`
  - bad: `visible`, `showProxyList`
- - good: `isTextCentered`
  - bad: `textIsCentered`
- - good: `isProxySwitchChecked`
  - bad: `proxySwitchState`

#### Event handlers

Event handler names should take the form `on<Event>`.

- - good: `onClick`
  - bad: `clicked`, `click`, `clickHandler`
- - good: `onRequestTimeout`
  - bad: `requestTimedOut`, `handleRequestTimeout`

### Files

#### React components

Files that export a React component as default should be named with `UpperCamelCase.tsx`,
with a name that corresponds to the component being exported.

- good: `NavigationBar.tsx`, `ModalPrompt.tsx`
- bad: `navigation-bar.tsx`, `modalPrompt.tsx`

Sometimes there are variations of certain components that are defined in other files.
These should be named with `BaseComponent.variant.tsx`.

- good: `NavigationMenu.mobile.tsx`, `NavigationMenu.desktopAndTablet.tsx`
- bad: `MobileNavigationMenu.tsx`, `DesktopAndTabletNavigationMenu.tsx`

#### Unit tests

Unit tests should be colocated in the same directory as the files that they test.
The name of the file should be `FilePrefixBeingTested.test.tsx`.

- good: `utilityFunctions.test.tsx`, `LoadingSpinner.test.tsx`,
  `DropdownMenu.desktopAndTablet.test.tsx`
- bad: `utilityFunctionsTest.tsx`, `LoadingSpinnerTest.tsx`,
  `DropdownMenu.desktopAndTabletTest.tsx`

#### Files that do not export a React component as the default

Files that export non-React-components, such as data, utility functions, etc should be named with `lowerCamelCase`.

- good: `apiWrapper.tsx`, `customRulesData.tsx`
- bad: `ApiWrapper.tsx`, `custom-rules-data.tsx`

## JSX

### Anonymous functions

Anonymous functions can be passed as props to components in JSX, but named functions
defined outside the JSX are preferred in the following cases:

- The anonymous function contains enough lines of code to disrupt the reader's flow
  when looking at the JSX
- The exact same function is used more than once (to avoid duplication)
- There are multiple related functions that can be easily and clearly refactored into
  limiting cases of a single function
- The function needs to be defined externally or memoized for performance reasons

When passing anonymous functions to components via props in JSX, the following guidelines
should be followed:

- Limit the logic inside of anonymous functions in JSX to very simple,
  tying-the-pieces-together logic.
- Avoid using too many anonymous functions in a single block of JSX as it takes
  up considerable vertical space in the structure, making it harder to read all at once.
- Authors should think carefully about whether their use of anonymous functions violates
  any of these principles, and reviewers should give their peers the benefit of the
  doubt in their intentions and how well they were realized.

### String props

For props of type `string`, it is preferred to pass values via a string in double quotes,
rather than using curly braces and a JS string inside.

```tsx
// good
<Dialog message="hello" />

// bad
<Dialog message={'hello'} />
```

## Idioms

### Use of `!!` for casting to boolean

Only use `!!` when a boolean value is actually needed. Using the implicit boolean conversion is
preferred when the resulting logic is identical without it.

```typescript
// good (boolean value is stored for later use):
const hasItem: boolean = !!item
```

```typescript
// good (boolean value only needed for single condition, no need to cast):
const borderBottom = hasItem && !isLast ? '1px solid black' : 'none'

// bad (unnecessarily verbose since it behaves identically without them):
const borderBottom = !!hasItem && !isLast ? '1px solid black' : 'none'
```

`!!value` should be preferred to `Boolean(value)` due to its conciseness.

### Conditional one-time assignment

- For simple if/else conditional assignment, the ternary operator should be used.
- When the logic is complex enough that the ternary operator becomes awkward, the
  value should be set to a `const` variable using an immediately executing function.
- For choosing a value based simply on the value of another variable, a keyed lookup on an
  anonymous object can be used.

```typescript
// simple assignment that uses ternary operator
const border = isLast ? '1px solid black' : 'none'

// bad: use of `let` for one-time assignment
let message
if (response.success) {
  message = 'success!'
} else if (response.errorMessage) {
  message = response.errorMessage
} else {
  message = 'an unknown error occurred'
}

// bad: `const` assignment to function (note that `message` is a function)
const message = (): string => {
  if (response.success) {
    return 'success!'
  } else if (response.errorMessage) {
    return response.errorMessage
  } else {
    return 'an unknown error occurred'
  }
}

// good: use of `const` with immediately executing function (note that `message` is a string)
const message = (): string => {
  if (response.success) {
    return 'success!'
  } else if (response.errorMessage) {
    return response.errorMessage
  } else {
    return 'an unknown error occurred'
  }
}()

// good: use of key lookup on anonymous object for simple mapping-based assignments
const Component = {
  'mobile': <MobileComponent />,
  'tablet': <TabletComponent />,
  'desktop': <DesktopComponent />
}[viewportSize]
```

### Use of logical and ternary operators with side effects

Uses of the operators `&&`, `||` and `condition ? trueExpr : falseExpr` should be avoided
in the case where the value is discarded and only the side effects are used. `if` statements
should be used instead in these cases.

```tsx
// good
if (shouldDoThing) {
  doThingForSideEffects()
}

// bad
shouldDoThing && doThingForSideEffects()

// good
if (isLoggedIn) {
  showUserInfo()
} else {
  redirectToLogout()
}

// bad
isLoggedIn ? showUserInfo() : redirectToLogout()
```

Note that this rule only applies when the expressions are only executed for _side effects_.
The following examples are fine:

```tsx
// fine since we use the value of the boolean expression to conditionally render
const userView = (
  <Flex>
    <UserInfo />
    {isPremiumUser && <BillingInfo />}
  </Flex>
)

// use of ternary operator is fine here because we actually use the value
const style = {
  color: isSelected ? 'green' : 'darkItemBG50',
}
```

## When to split apart files

### Multiple React components in a single file

Multiple components may co-exist in a single file. This is often a natural consequence of
breaking a large primary component into smaller subcomponents, and especially when only
the primary component is exported (i.e. the subcomponents are just implementation details),
this is quite benign. When the total file size exceeds **300 lines**, reviewers may at their
own discretion ask the author to break the subcomponents into their own files.

### Standalone fixtures vs inline code for API responses in e2e tests

For defining API responses to be returned via cy.intercept, there are 2 options: a fixture
(a JSON file stored in the fixtures directory) or TypeScript code written in the same file
as the test itself.

It is permitted to use inline TypeScript code in the following circumstances:

- the API response is **50 lines or less in length** and is not used by multiple tests
- the API response is best written in a programmatically generated way rather than a
  single hardcoded object

In all other circumstances, fixtures should be preferred.

## Styling / theming

### Colours

All colours used in the app should be mapped to a string value defined in the colors array in the theme, rather than using direct hex or RGBA values. When adding new colours to the palette, they should be given the exact same name as they have in Zeplin.

Historically, another mapping layer - from colour names in the palette to "semantic" names - had been used (for example "text" as a colour instead of "white"). The idea was to support multiple colour themes (light/dark), but this mapping should be avoided in future code in favour of directly referencing names in the palette.

```tsx
// good:
color: 'white15',

// bad:
color: 'rgba(229, 229, 229, 0.15)',
color: '#e5e5e5',
color: 'accent' // old semantic naming style
```

### Space

Spaces should be defined using _literal inline `rem` values_ rather than the `space` array
in theme-ui.

Historically, we had used the `space` array to connect spacing values to the theme, but
it is unrealistic to think about ever changing the values of this array, so it ended up just
being an unnecessary layer of indirection.

```tsx
// good
mr: '1.6rem',

// bad
mr: 2,
mr: '16px',
```

### Font size

Font size, like space, should also be defined using literal `rem` values instead of
theme values, in spite of a historical use of the theme `fontSizes` array in the code.

```tsx
// good
fontSize: '1.4rem',

// bad
fontSize: 3,
fontSize: '14px',
```

### Responsive arrays vs `useBreakpointIndex`

We should always prefer the responsive array syntax (which generate media queries) to using
javascript for styling different viewport sizes. We have seen instances where the
`useBreakpointIndex` call returns an incorrect value initially before the correct value is
returned, causing the UI to flicker and render incorrectly.

```tsx
// good
pb: ['1.4rem','1.1rem'],

// bad
const index = useBreakpointIndex()

...

pb: index === 0 ? '1.4rem' : '1.1rem',
```

### Use of CSS `gap` property

When defining padding _between_ children in a flex layout, we should prefer
[the CSS `gap` property](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) instead of
a more verbose and tedious approach using `:not(:last-child)` and responsive arrays:

```tsx
<Flex
  sx={{
    flexDirection: ['column', 'row'],

    // good: `gap` takes care of the location of the padding as well as only being applied
    // to space between elements
    gap: '8rem',

    // bad: more verbose/error prone, and unlike `gap`, does not handle `flex-wrap`
    '& > :not(:last-child)': {
      mb: ['8rem', 0],
      mr: [0, '8rem'],
    },
  }}
>
  {children}
</Flex>
```

## ESLint

We use ESLint to enforce what rules we _can_ automatically without even relying on the style
guide.

Rules defined in our ESLint configuration (`.eslintrc.js`) are there for a deliberate reason,
and any exceptions to these rules in the code (through `// eslint-disable-next-line` comments)
should bring with them an explanation of why they were necessary.

Any changes to the rule configuration should be discussed with the team before being added.

### Use of // eslint-disable-next-line react-hooks/exhaustive-deps

By default, our configuration will cause ESLint to complain when all dependencies to a
`useEffect`, `useCallback` or `useMemo` call are not provided. Although some common
dependencies are guaranteed to never change and can then be safely omitted from the
dependency array (such as dispatch), they are still required by this ESLint rule. Although
their inclusion is redundant, it is still preferred to redundantly include them rather
than to disable the rule using a `// eslint-disable-next-line react-hooks/exhaustive-deps`
comment. This is because it is very easy to miss dependencies and the errors resulting from
this mistake can be very subtle and hard to find.

The only time that the `react-hooks/exhaustive-deps` ESLint disable comment is permitted is
when there is a reference in the body of the `use{Effect,Callback,Memo}` function argument
that we don't want to update the effect or memoized value. These situations should be very
rare and are more likely symptomatic of something strange about the code in question.

## Redux

### Selectors

Selectors should be as specific as possible, to avoid re-renders when properties not relevant
to us change.

```tsx
// good
const isHapticsEnabled = useAppSelector(s => !!s.session.data?.haptics)

// bad
const session = useAppSelector(s => s.session)
const isHapticsEnabled = !!session.data?.haptics
```

## React components

### Arbitrary content and the `children` prop

If a component takes arbitrary content for rendering, the _primary_ content that the component
takes should be passed in via a `children?: ReactNode` prop, which also allows for the
convenient JSX syntax of nesting the children inside the tags of the component rather than
as an attribute-style prop.

```jsx
// good
<Button>
  <Flex>
    <PlusIcon />
    <Text>Add</Text>
  </Flex>
</Button>

// bad
<Button content={
  <Flex>
    <PlusIcon />
    <Text>Add</Text>
  </Flex>
} />
```

## `api` directory

### API call functions

All API calls (that directly call `get`, `post`, `http`, etc) should be placed in a file
in the `api` directory. Sometimes Redux thunks or even components need to make API
requests, and these should be made by importing a specialized function from `api` rather
than calling any of the HTTP methods directly.

```jsx
/**
 * good (definitions in separate files)
 */

// in `api/rules.ts`
export const getFiltersHttp = (profileId: string): GetFiltersResponse =>
  get(`/rules/filter${profileId ? `?rp_id=${profileId}` : ''}`)

// in `api/filters.ts`
export const getFilters = createAsyncThunk(
  'filters/get',
  async (_, { getState }) => {
    const profileId = (getState() as RootState).persistData.currentProfileId
    return getFiltersHttp(profileId)
  },
)


/**
 * bad: direct use of HTTP functions outside of `api` folder
 */

// in `api/filters.ts`
export const getFilters = createAsyncThunk(
  'filters/get',
  async (_, { getState }) => {
    const profileId = (getState() as RootState).persistData.currentProfileId
    return get(`/rules/filter${profileId ? `?rp_id=${profileId}` : ''}`)
  },
)
```

### API types

All API types (objects returned from the API) should be defined in a file in
the `api` directory.
