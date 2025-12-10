# nullvariant-tools

Interactive web tools for applying naming conventions based on 100-year design principles.

## Tools

### Directory Naming Assistant

An interactive tool to help you choose appropriate directory names following universal principles:

- 10 prioritized naming principles
- Interactive validation and suggestions
- Quick reference guide
- Tier-based convention strength

**Status**: Coming Soon

### File Naming Validator

An interactive tool for validating file names against established conventions.

**Status**: Planned

## Structure

This is an npm workspace monorepo:

```
nullvariant-tools/
├── apps/              # Individual tools
└── packages/          # Shared components
```

## Development

```bash
# Install dependencies
npm install

# Run development mode
npm run dev

# Build for production
npm run build
```

## License

To be determined.

## About

Developed by [Null;Variant](https://github.com/nullvariant) with a focus on creating tools that make complex naming conventions accessible through interactive interfaces.

## Commit Signatures

Commits in this repository are automatically signed with IDE, extension, and AI model information:

```text
🖥️ IDE: [VS Code](https://code.visualstudio.com/)
🔌 Extension: [Claude Code](https://claude.com/claude-code)

Co-authored-by: Claude Opus 4.5 <claude-opus-4-5@anthropic.com>
Model-Raw: claude-opus-4-5-20251101
```

This enables tracking of which environment and AI model contributed to each commit.
