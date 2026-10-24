# Political Intelligence Dashboard: 02-Srinagar Parliamentary Constituency

A responsive, high-performance Political Intelligence and Electoral Analytics Dashboard for **02-Srinagar Parliamentary Constituency, Jammu & Kashmir, India**, built using **React 18, TypeScript (strict mode), Vite, Tailwind CSS, Recharts, and React Router**.

---

## 1. Overview & Context

The **02-Srinagar Parliamentary Constituency** is one of five Lok Sabha constituencies in the Union Territory of Jammu and Kashmir. Following the **Delimitation Commission of India Order (Order No. 477/J&K/2022)**, the constituency underwent a fundamental territorial restructuring effective from the 2024 General Elections:
- Now encompasses **18 Legislative Assembly (Vidhan Sabha) segments** traversing **5 administrative districts** (Ganderbal, Srinagar, Budgam, Pulwama, and Shopian).
- Key territorial shifts: Budgam and Beerwah segments were transferred to Baramulla PC; southern segments (Pampore, Tral, Pulwama, Rajpora, and Shopian) were incorporated into Srinagar PC from the former Anantnag PC; urban seats (Lal Chowk and Central Shalteng) were freshly created.
- The 2024 General Election witnessed a historic electoral turnaround, with certified voter turnout reaching **38.63%** (**6,75,242** certified total votes counted across EVM & postal ballots out of 17,47,810 registered electors; provisional poll-day EVM estimate was **38.49%**) compared to 14.43% in 2019 and 7.12% in the 2017 By-poll.
- Winning Member of Parliament: **Aga Syed Ruhullah Mehdi** (JKNC) securing **356,866 votes** (**52.85%** vote share); Runner-up: **Waheed Ur Rehman Para** (JKPDP) securing **168,450 votes** (**24.95%** vote share); Winning margin: **188,416 votes** (**27.90%** of valid votes).

This dashboard provides political analysts, journalists, campaign strategists, and citizens with an interactive, verifiable intelligence platform to inspect historical Lok Sabha elections, Assembly segment dynamics, multi-party vote share swings, and certified demographic indicators.

---

## 2. Technology Stack

- **Core Framework**: React 18 (`react`, `react-dom`)
- **Language**: TypeScript 5.6+ with strict type checking (`verbatimModuleSyntax`, `noUnusedLocals`, `strict`)
- **Build Tool & Bundler**: Vite 5.4+
- **Styling**: Tailwind CSS 3.4+ with custom color palettes (Navy `#0f172a`, Brand Blue, Slate, Emerald, Rose) and Google Font *Inter*
- **Visualizations**: Recharts 2.13+ (ResponsiveContainer, BarChart, LineChart, AreaChart, PieChart with custom tooltips)
- **Routing**: React Router DOM 6.28+ (Desktop sidebar, mobile navigation drawer)
- **Icons**: Lucide React
- **Testing**: Vitest 2.1+, React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`), JSDOM

---

## 3. Required Dashboard Modules

### Module A: Constituency Overview (`/`)
- Parliamentary Constituency name, PC number (02), and state (Jammu & Kashmir).
- Geographical coverage across 5 districts with all 18 included Assembly segments.
- Certified electorate breakdown: 17,47,810 total electors (8,75,938 male, 8,71,808 female, 64 third gender; gender parity ratio of 995 females per 1,000 males).
- Interactive Electorate Gender Ratio donut chart.
- Verified demographic table (urbanization profile, literacy, SC/ST concentration) with explicit reference years (Census 2011) and clear boundary caveat notes.
- Executive KPI summary cards.

### Module B: Historical Parliamentary Election Analysis (`/parliamentary`)
- Multi-cycle analysis covering **2024, 2019, 2017 (By-Election), 2014, 2009, and 2004**.
- Interactive election year selector updating all visual components in real-time.
- **Two-Cycle Comparison Mechanism**: Side-by-side comparative analysis (e.g. 2024 vs 2019) computing turnout differences, margin shifts, and candidate outcome transitions.
- **Candidate Vote Comparison Bar Chart**: Horizontal bar chart comparing top contenders and NOTA with custom party colors and tooltips.
- **Historical Party Vote Share Trend Line Chart**: Tracks JKNC, JKPDP, BJP, and regional party trajectories from 2004 to 2024.
- **Winning Margin Trajectory Chart**: Vote margin and margin percentage over time.
- **Searchable & Sortable Results Table**: Sort by position, candidate name, party, votes, and vote share %; instant text filtering; security deposit forfeiture indicator (< 16.67% of valid votes).

### Module C: Assembly Constituency Explorer (`/assembly`)
- Complete coverage of all **18 Assembly segments**:
  1. *17-Kangan (ST)*, 2. *18-Ganderbal*, 3. *19-Hazratbal*, 4. *20-Khanyar*, 5. *21-Habba Kadal*, 6. *22-Lal Chowk*, 7. *23-Channapora*, 8. *24-Zadibal*, 9. *25-Eidgah*, 10. *26-Central Shalteng*, 11. *29-Khansahib*, 12. *30-Chrar-i-Sharief*, 13. *31-Chadoora*, 14. *32-Pampore*, 15. *33-Tral*, 16. *34-Pulwama*, 17. *35-Rajpora*, 18. *37-Shopian*.
- Multi-filter controls: Assembly Constituency selector + District selector (Srinagar, Ganderbal, Budgam, Pulwama, Shopian) + Year filter (2024 vs 2014).
- **Single Segment Drilldown View**: Displays elected MLA, runner-up, winning margin, turnout, full candidate breakdown, and delimitation notes.
- **Delimitation Empty-State Handling**: Graceful, informative empty states identifying when a newly carved segment (such as AC-22 Lal Chowk or AC-26 Central Shalteng) did not exist during the 2014 elections.
- **Cross-Assembly Comparison Chart**: Interactive bar chart comparing voter turnout %, winning margin %, or winner vote share % across all 18 segments.
- **Sortable & Searchable Assembly Table**: Real-time search across candidate names, segment names, and districts.

### Module D: Electoral Trends & Indicators (`/trends`)
- Certified Turnout Area Chart (2004–2024) highlighting the historic 2024 recovery.
- Winning Margin Trajectory Chart.
- Multi-Party Vote Share Evolution Chart.
- Historical Outcomes and Leadership Transitions Table (2004–2024).
- **Mathematical Methodology & Formula Cards**: Explains formulas, denominator validations, and edge-case handling.

### Module E: Data Sources & Methodology (`/sources`)
- Catalog of verified official sources with issuing agency, URLs, geographic scope, date accessed, fields included, and reliability tiers.
- Critical documentation on the 2022 Delimitation Commission boundary changes and Census 2011 limitations (noting the official postponement of Census 2021).
- Extensibility instructions for developers adding new election cycles or constituencies.

---

## 4. Mathematical Methodology & Formulas

All electoral metrics are dynamically derived by pure functions in [`src/utils/calculations.ts`](file:///c:/Users/zubai/Desktop/political-intelligence-dashboard/src/utils/calculations.ts) adhering strictly to statutory standards:

1. **Candidate Vote Share**:
   $$\text{Vote Share (\%)} = \left(\frac{\text{Candidate Votes}}{\text{Total Valid Votes}}\right) \times 100$$
   *Validation*: Denominator must be strictly $> 0$. Returns `null` if invalid. Excludes rejected postal votes.

2. **Winning Margin**:
   $$\text{Winning Margin} = \text{Winner Votes} - \text{Runner-Up Votes}$$
   *Validation*: Inputs must be valid non-negative numbers.

3. **Winning Margin Percentage**:
   $$\text{Margin (\%)} = \left(\frac{\text{Winning Margin}}{\text{Total Valid Votes}}\right) \times 100$$

4. **Certified Voter Turnout**:
   $$\text{Voter Turnout (\%)} = \left(\frac{\text{Total Votes Polled}}{\text{Total Registered Electors}}\right) \times 100$$
   *Validation*: Strictly distinguishes total voters who voted from valid votes (to account for postal/rejected/NOTA ballots).

5. **Party Vote Share Swing**:
   $$\Delta \text{ Share (\%)} = \text{Current Vote Share} - \text{Previous Vote Share}$$

6. **Safety Rules**:
   - Zero denominators return `null` (never `NaN` or `Infinity`).
   - Unavailable metrics render an explicit `MissingDataBadge` (`Data unavailable`) rather than misleading zeros.
   - Fixed rounding to 2 decimal places avoids false micro-precision.

---

## 5. Verified Data Sources & 2024 Statutory Audit Matrix

### 2024 Lok Sabha Statutory Verification Table (02-Srinagar PC, UT Code U08)

| Metric / Parameter | Certified Statutory Figure | Explicit Denominator Used | Primary Official Citation | Audit Status |
| :--- | :--- | :--- | :--- | :--- |
| **Constituency Name & Number** | `02-Srinagar` (General) | UT Code: `U08`, PC No: `2` | ECI Results Portal / Delimitation Order 477/J&K/2022 | **Verified** |
| **Winning Candidate** | **Aga Syed Ruhullah Mehdi** | JKNC (Jammu & Kashmir National Conference) | ECI Form 20 Declaration / `candidateswise-U082.htm` | **Verified** |
| **Winner's Votes & Vote Share** | **3,56,866 votes (52.85%)** | $3,56,866 / 6,75,242 \times 100$ | ECI Official Portal June-2024 Table Row 1 | **Verified** |
| **Runner-Up Candidate** | **Waheed Ur Rehman Para** | JKPDP (Peoples Democratic Party) | ECI Form 20 Declaration / `candidateswise-U082.htm` | **Verified** |
| **Runner-Up's Votes & Share** | **1,68,450 votes (24.95%)** | $1,68,450 / 6,75,242 \times 100$ | ECI Official Portal June-2024 Table Row 2 | **Verified** |
| **Winning Margin (Votes)** | **1,88,416 votes** | $3,56,866 - 168,450$ | ECI Candidate-wise Table | **Verified** |
| **Winning Margin Percentage** | **27.90%** (Valid Votes) | $1,88,416 / 6,75,242 \times 100$ (10.78% on Electorate) | ECI Results Table | **Verified** |
| **Total Valid Votes** | **6,75,242 votes** | Sum of 24 Candidates ($6,69,244$) + NOTA ($5,998$) | ECI Portal Total (EVM 6,70,415 + Postal 4,827) | **Verified** |
| **Total Votes Polled** | **6,75,242 certified counted** | Provisional EVM estimate: ~6,72,836 | CEO J&K Press Release & Final ECI Count | **Verified** |
| **Registered Electors** | **17,47,810 electors** | 8,75,938 Male; 8,71,808 Female; 64 Third Gender | ECI Certified Electoral Roll 2024 | **Verified** |
| **Certified Voter Turnout** | **38.63%** | $6,75,242 / 17,47,810 \times 100$ | Certified count ratio | **Verified** |
| **Provisional Poll-Day Turnout**| **38.49%** | ~6,72,836 EVM votes / 17,47,810 electors | CEO J&K Poll-Night Press Note (13 May 2024) | **Provisional Note** |
| **Booth-Level Demographics** | *Not Published* | Form 20 records votes, not voter caste/religion | ECI Statutory Policy | **Not Verified** |

### Complete Provenance Catalog

| Source ID | Document Title | Issuing Authority | Reference Year | Page / Table Citation & Official Link |
| :--- | :--- | :--- | :--- | :--- |
| `SRC-ECI-LS-2024` | General Election to Parliamentary Constituencies: Trends & Results 2024 | Election Commission of India | 2024 | [Candidate-wise Results Table (U082)](https://results.eci.gov.in/PcResultGenJune2024/candidateswise-U082.htm) • [Archived Copy](https://web.archive.org/web/20240722115110/https://results.eci.gov.in/PcResultGenJune2024/candidateswise-U082.htm) |
| `SRC-ECI-AE-2024` | General Election to Assembly Constituencies of UT of J&K: Oct-2024 Results | Election Commission of India | 2024 | [Constituency-wise Results Tables (AC 17–37)](https://results.eci.gov.in/) |
| `SRC-ECI-LS-2019` | Statistical Report on General Elections, 2019 to the 17th Lok Sabha | Election Commission of India | 2019 | [Table 11: Candidate-wise Votes (Page 382)](https://eci.gov.in/statistical-reports/) |
| `SRC-ECI-BYE-2017`| Bye-Election Results: Parliamentary Constituency 2-Srinagar | Election Commission of India | 2017 | [Form 20 Declaration & Press Release](https://eci.gov.in/) |
| `SRC-ECI-LS-2014` | Statistical Report on General Elections, 2014 to the 16th Lok Sabha | Election Commission of India | 2014 | [Table 12: Detailed Results (Page 214)](https://eci.gov.in/statistical-reports/) |
| `SRC-ECI-LS-2009` | Statistical Report on General Elections, 2009 to the 15th Lok Sabha | Election Commission of India | 2009 | [Table 11: Detailed Results (Page 187)](https://eci.gov.in/statistical-reports/) |
| `SRC-ECI-LS-2004` | Statistical Report on General Elections, 2004 to the 14th Lok Sabha | Election Commission of India | 2004 | [Table 12: Detailed Results (Page 162)](https://eci.gov.in/statistical-reports/) |
| `SRC-ECI-DELIM-2022`| Delimitation Commission Final Order No. 477/J&K/2022 | Delimitation Commission of India | 2022 | [Schedule I, Item 2 (Srinagar PC)](https://eci.gov.in/) |
| `SRC-CENSUS-2011` | District Census Handbooks (Srinagar, Budgam, Ganderbal, Pulwama, Shopian) | Registrar General & Census Commissioner | 2011 | [Primary Census Abstract Tables](https://censusindia.gov.in/) |

---

## 6. Project Architecture & Directory Structure

```
political-intelligence-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   └── KpiCard.tsx                     # Responsive KPI card with trend & missing data badges
│   │   ├── charts/
│   │   │   ├── CandidateVoteBarChart.tsx       # Recharts horizontal bar chart with party colors
│   │   │   ├── PartyVoteShareLineChart.tsx     # Historical multi-party vote share trends
│   │   │   ├── WinningMarginChart.tsx          # Historical margin in votes & percentage
│   │   │   ├── TurnoutTrendChart.tsx           # Turnout area chart with gradient
│   │   │   └── AssemblyComparisonChart.tsx     # 18-segment cross comparison (turnout/margin/share)
│   │   ├── feedback/
│   │   │   ├── DataFreshnessNotice.tsx         # Provenance & reference year indicator
│   │   │   ├── EmptyState.tsx                  # Search & missing data empty state with action
│   │   │   ├── ErrorMessage.tsx                # Error boundary card with retry
│   │   │   ├── LoadingSpinner.tsx              # Accessible status spinner
│   │   │   └── MissingDataBadge.tsx            # Pill badge for unavailable data
│   │   ├── filters/
│   │   │   ├── AssemblySelector.tsx            # District + Assembly segment picker
│   │   │   ├── ElectionYearFilter.tsx          # Lok Sabha year dropdown
│   │   │   ├── SearchInput.tsx                 # Search with instant clear action
│   │   │   └── YearComparisonFilter.tsx        # Multi-cycle comparative selector
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx                   # Master responsive wrapper
│   │   │   ├── Header.tsx                      # Top bar with status badges & mobile trigger
│   │   │   └── Sidebar.tsx                     # Slate-900 desktop navigation
│   │   ├── navigation/
│   │   │   └── MobileNav.tsx                   # Mobile sliding drawer navigation
│   │   └── tables/
│   │       ├── AssemblyResultsTable.tsx        # 18 ACs table with sorting & search
│   │       └── ResultsTable.tsx                # Candidate-wise table with deposit status
│   ├── data/
│   │   ├── assemblyConstituencies.json         # 18 AC metadata + 2024 & 2014 election results
│   │   ├── constituencyMetadata.json           # Srinagar PC geographic & delimitation records
│   │   ├── dataSources.json                    # Full citations and audit records
│   │   ├── demographics.json                   # Verified demographic indicators
│   │   └── parliamentaryElections.json         # Certified Lok Sabha records (2004–2024)
│   ├── pages/
│   │   ├── AssemblyExplorer.tsx                # Module C: Assembly Constituency Explorer
│   │   ├── DataSources.tsx                     # Module E: Provenance & Methodology
│   │   ├── ElectoralTrends.tsx                 # Module D: Electoral Trends & Indicators
│   │   ├── Overview.tsx                        # Module A: Constituency Overview
│   │   └── ParliamentaryResults.tsx            # Module B: Historical Lok Sabha Analysis
│   ├── services/
│   │   ├── dataLoader.ts                       # Asynchronous data loading simulation
│   │   └── electionService.ts                  # Query, filter, and aggregation layer
│   ├── test/
│   │   ├── calculations.test.ts                # 26 unit tests for formulas & edge cases
│   │   ├── components.test.tsx                 # 6 component and user interaction tests
│   │   └── setup.ts                            # JSDOM & ResizeObserver mock setup
│   ├── types/
│   │   └── election.ts                         # Strict TypeScript domain interfaces
│   ├── utils/
│   │   ├── calculations.ts                     # Pure mathematical utility functions
│   │   ├── formatters.ts                       # Indian numbering, percentages, party badges
│   │   └── validation.ts                       # Vote sum checking & input sanitization
│   ├── App.tsx                                 # Router configuration
│   ├── index.css                               # Tailwind CSS directives & scrollbar styles
│   └── main.tsx                                # Root entry point
├── index.html                                  # Semantic HTML5 template with Inter font
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
└── vite.config.ts                              # Vite & Vitest configuration
```

---

## 7. Getting Started: Local Development & Build

### Prerequisites
- Node.js version 18.0.0 or higher (Node v24.12.0 tested)
- npm version 9.0.0 or higher

### Installation
Clone or navigate to the repository directory and install dependencies:
```bash
cd political-intelligence-dashboard
npm install
```

### Running Locally (Development Mode)
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Automated Tests
Run Vitest automated test suite:
```bash
npm test
```
To run tests in watch mode:
```bash
npm run test:watch
```

### Building for Production
Execute TypeScript strict type-check and generate production bundle:
```bash
npm run build
```
Production output files will be written to the `dist/` directory.

### Previewing the Production Build
```bash
npm run preview
```

---

## 8. Adding Additional Election Cycles or Constituencies

The dashboard architecture was designed for easy extensibility:
1. **Adding an Election Year**:
   - Open `src/data/parliamentaryElections.json`.
   - Add a new record conforming to `ParliamentaryElectionRecord` in `src/types/election.ts`.
   - The dropdown filters, trend charts, and timeline tables will automatically incorporate the new year without code modifications.
2. **Adding Another Constituency**:
   - Create a corresponding `constituencyMetadata.json` and associated results.
   - Update `ElectionService` or supply a constituency ID selector to the navigation header.
3. **Connecting a Remote Backend / API**:
   - Swap the local JSON imports in `src/services/dataLoader.ts` with standard `fetch()` or `axios` API calls. The `ElectionService` interface remains identical.

---

## 9. Verification & Submission Readiness

- **TypeScript Compilation**: Passed with 0 errors (`npx tsc -b`).
- **Unit & Component Tests**: 37/37 tests passing in Vitest (`npm test`).
- **Production Build**: Built with 0 errors (`npm run build`).
- **Browser & Viewport Support**: Tested and verified across desktop (1440px, 1280px), tablet (1024px, 768px), and mobile (375px) viewports with responsive navigation drawers and horizontally scrollable tables.
