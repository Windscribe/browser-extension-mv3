# Styling

We use **Theme-UI** today (`theme-ui: ^0.14.6` in `package.json`). The
direction is Mantine — once adopted, new components should be written in Mantine, old
components stay Theme-UI until someone migrates them. Don't mix the two in
a single component.

The rules in this doc cover both.

---

## Colours

All colours come from the palette (theme `colors` object in `src/styles/colors.ts`). Never use raw
hex / rgba in components. When adding a palette colour, give it the exact
name it has in Zeplin.

```tsx
// good
color: 'primaryText',   // semantic token, changes with light / dark mode
color: 'halfWhite',     // fixed palette colour, same in both modes

// bad
color: 'rgba(229, 229, 229, 0.15)',
color: '#e5e5e5',
```

`colors.ts` has two kinds of names:

- **Semantic tokens** (`background`, `foreground`, `primaryText`,
  `secondaryText`, `border`, `iconBgSolid`, …). They have overrides under
  `modes.light`, and Theme-UI switches them when the user changes the theme
  in Preferences. Use these for anything that must change between light
  and dark mode.
- **Fixed palette names** (`halfWhite`, `lakeBlue`, `neonGreen`, …). Use
  these only for colours that stay the same in both modes.

---

## Spacing

Always use **literal `rem` values**, never the theme `space` array or `px`.

```tsx
// good
mr: '1.6rem',

// bad
mr: 2,
mr: '16px',
```

Rationale: the `space` array was meant to let us change spacing globally,
but nobody's going to ever re-tune a shipped extension's spacing scale, so
the indirection is just noise.

---

## Font sizes

Same story as spacing — literal `rem` values only.

```tsx
// good
fontSize: '1.4rem',

// bad
fontSize: 3,
fontSize: '14px',
```

---

## Responsive values

Prefer media-query-driven responsive arrays over JS-driven viewport
checks, because `useBreakpointIndex` returns a wrong value on first render
and causes flicker.

```tsx
// good
pb: ['1.4rem', '1.1rem'],

// bad
const index = useBreakpointIndex()
pb: index === 0 ? '1.4rem' : '1.1rem',
```

---

## `gap` for inter-child spacing

In flex layouts, prefer the CSS `gap` property over `:not(:last-child)`
tricks.

```tsx
<Flex
  sx={{
    flexDirection: ['column', 'row'],

    // good
    gap: '8rem',

    // bad
    '& > :not(:last-child)': {
      mb: ['8rem', 0],
      mr: [0, '8rem'],
    },
  }}
>
  {children}
</Flex>
```

`gap` also handles `flex-wrap` cleanly, which the sibling-selector
approach does not.

---

## Mantine — writing new components and migrating old ones

> **Note:** Mantine is not yet integrated into the project (not in `package.json`). The guidance below describes the planned migration path.

When you write a new component in Mantine, or migrate an existing Theme-UI
component to Mantine, these rules apply:

1. **Keep static, simple properties inline as `style={{ ... }}`.** Don't
   create a CSS module for every component.

   ```tsx
   // good (static, simple)
   <Flex style={{ alignItems: 'center', padding: '1.6rem' }}>

   // bad — over-engineered
   import styles from './Foo.module.css'
   <Flex className={styles.row}>
   ```

2. **Use CSS modules only for responsive styling or anything with media
   queries / pseudo-selectors.** Mantine's `style` prop does not accept
   responsive arrays, so that's when you reach for a `.module.css`.

   ```tsx
   // good
   import styles from './Foo.module.css'
   <Box className={styles.responsive}>
   ```

   ```css
   /* Foo.module.css */
   .responsive { padding: 1.6rem; }
   @media (min-width: 768px) { .responsive { padding: 2.4rem; } }
   ```

3. **Convert Theme-UI shorthand props to real CSS properties.** `py`, `px`,
   `mx`, `my`, `mb`, `mr`, `bg` etc. are Theme-UI inventions — Mantine
   doesn't understand them. Spell them out.

   | Theme-UI  | Mantine (`style`)                      |
   | --------- | -------------------------------------- |
   | `py`      | `paddingTop` + `paddingBottom`         |
   | `px`      | `paddingLeft` + `paddingRight`         |
   | `my`      | `marginTop` + `marginBottom`           |
   | `mx`      | `marginLeft` + `marginRight`           |
   | `mb`      | `marginBottom`                         |
   | `mr`      | `marginRight`                          |
   | `bg`      | `background` (or `backgroundColor`)    |
   | `sx.border` | `border`                             |

4. **Responsive arrays that were for sizes need to become real media
   queries in CSS modules.** A value like `pb: ['1.4rem', '1.1rem']` in
   Theme-UI maps to different padding at different breakpoints. In Mantine
   you have to write that as a media query in a module.

   ```tsx
   // before
   <Box sx={{ pb: ['1.4rem', '1.1rem'] }}>

   // after
   <Box className={styles.stackedPadding}>
   ```

   ```css
   .stackedPadding { padding-bottom: 1.4rem; }
   @media (min-width: 768px) { .stackedPadding { padding-bottom: 1.1rem; } }
   ```

5. **Don't mix Mantine and Theme-UI on the same component.** If you start
   migrating a file, finish it — don't leave half of it driven by `sx`.

---

## `ThemeUiElement` typing

Existing Theme-UI components are typed as `ThemeUiElement`. In new code
(especially Mantine components), use standard `FunctionComponent<Props>` /
`FC<Props>` instead.

---

## ESLint

We use ESLint for anything auto-enforceable (see `.eslintrc.js`). Rules
are deliberate; disable comments require a reason.

### `react-hooks/exhaustive-deps`

Always include `dispatch` (and other stable refs) in dependency arrays,
even though they're guaranteed stable. Only disable the rule when there's
a reference in the hook body that we *deliberately* don't want to trigger
re-runs on — and even then, that usually means the surrounding code is
odd.

---

## See also

- [`conventions.md`](./conventions.md) — broader code conventions (naming,
  JSX patterns, Redux, etc.).
- [`../AGENTS.md`](../AGENTS.md) — summary of these rules for AI agents.
