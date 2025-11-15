# Directory Naming Assistant

## Overview

An interactive web tool that helps you choose appropriate directory names following universal naming principles designed for long-term sustainability.

The tool simplifies 10 prioritized naming principles into an easy-to-use interface for developers who want quick guidance without reading lengthy documentation.

## Features

### 🔍 Name Validation
- Instantly validates directory names against 10 universal principles
- Shows which principles apply and why
- Explains issues when a name doesn't follow conventions

### ✨ Name Suggestion
- Select your directory's purpose (system structure, state management, frequency, etc.)
- Get appropriate name suggestions automatically
- One-click copy to clipboard
- See which principles apply to each suggestion

### 📚 Rules Reference
- View all 10 principles with priority ordering
- Read detailed explanations and examples
- Quick reference for common patterns

## The 10 Universal Principles

1. **Prefix Rules** (Priority 1)
   - `_` : System structure directories
   - `.` : Tool configuration directories
   - `__` : System reserved directories

2. **Chronological Directories** (Priority 2)
   - `YYYY/`, `MM/`, `DD/` : ISO 8601 compliant

3. **International Standards & Abbreviations** (Priority 3)
   - Language codes: `en/`, `ja/`, `zh/`
   - Industry abbreviations: `prd/`, `i18n/`, `spec/`

4. **Industry Conventions** (Priority 4)
   - `lib/`, `hooks/`, `tests/`, `docs/`, `fixtures/`, `utils/`

5. **System Reserved** (Priority 5)
   - `temp/`, `cache/`, `node_modules/`, `__pycache__/`

6. **Lifecycle States** (Priority 6)
   - Past participle: `archived/`, `implemented/`, `deprecated/`
   - Adjectives: `active/`, `inactive/`

7. **Frequency Attributes** (Priority 7)
   - `daily/`, `weekly/`, `monthly/`, `yearly/`, `ondemand/`

8. **Visibility & Attributes** (Priority 8)
   - `public/`, `private/`, `internal/`, `permanent/`, `temporary/`

9. **Functional Categories** (Priority 9)
   - Base verbs: `generate/`, `validate/`, `process/`
   - Singular nouns: `governance/`, `content/`, `operations/`

10. **General Rules** (Priority 10)
    - Abbreviations or plural nouns: `adr/`, `issues/`, `materials/`, `drafts/`

## How to Use

### Basic Usage

1. **Validation Mode**
   - Enter a directory name in the input field
   - See instant feedback on whether it follows conventions
   - Read explanations for why it's appropriate or not

2. **Suggestion Mode**
   - Select directory purpose from dropdown
   - Browse suggested names
   - Click copy button to use a suggestion

### Understanding Priority

- Lower numbers = higher priority
- When principles conflict, follow the higher priority rule
- Some rules have exceptions (e.g., `active/` is an adjective but acceptable as a state)
- Rules can combine in some cases

## Technical Stack

- **HTML5**: Semantic structure
- **Tailwind CSS**: Responsive design via CDN
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## Running the Tool

1. Open `index.html` in a web browser
2. No build step or server required
3. Works entirely in the browser

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

To be determined.

## Version

- Current version: 1.0.0
- Last updated: 2025-11-15

---

**Note**: This tool provides guidance based on universal naming principles. Final decisions should consider your project's specific context and requirements.
