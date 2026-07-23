# Extractable Components

## Header
- Source: `src/components/layout/Header.tsx`
- Category: layout
- Description: Sticky report brand and primary navigation.
- Extractable props: active route
- Hardcoded: shield icon, brand label, route labels, colors and spacing

## Footer
- Source: `src/components/layout/Footer.tsx`
- Category: layout
- Description: Report metadata and secondary links.
- Extractable props: edition label
- Hardcoded: layout, icon set and typography

## LifecycleNav
- Source: `src/components/report/LifecycleNav.tsx`
- Category: layout
- Description: Seven-stage sticky Survey navigator.
- Extractable props: activeStage, stages
- Hardcoded: stage icons and compact row treatment

## DataTable
- Source: `src/components/report/DataTable.tsx`
- Category: basic
- Description: Horizontally scrollable report table with sticky headers.
- Extractable props: columns, rows, caption
- Hardcoded: slate table styling

## CitationText
- Source: `src/components/report/CitationText.tsx`
- Category: basic
- Description: Body copy renderer that links bracketed citations to bibliography entries.
- Extractable props: text
- Hardcoded: citation chip treatment

