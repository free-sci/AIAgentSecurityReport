# Page Dependency Trees

## `/`

- `src/pages/HomePage.tsx`
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/home/StatCard.tsx`
  - `src/components/home/OverviewCard.tsx`
  - `src/components/home/TOCSection.tsx`
  - `src/data/reportData.ts`

## `/survey`

- `src/pages/SurveyPage.tsx`
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/report/CitationText.tsx`
  - `src/components/report/LifecycleNav.tsx`
  - `src/data/surveyContent.ts`

## `/research`, `/products`, `/policy`, `/tables`

- matching page in `src/pages/`
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/report/DataTable.tsx`
  - matching data module in `src/data/`

## `/incidents`

- `src/pages/IncidentsPage.tsx`
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/incidents/TimelineMonth.tsx`
  - `src/components/incidents/IncidentCard.tsx`
  - `src/data/incidentsData.ts`

## `/references`

- `src/pages/ReferencesPage.tsx`
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/data/referencesData.ts`

All pages also depend on `src/index.css`.

