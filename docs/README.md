# Marine Licensing Prototype Documentation

This directory contains comprehensive documentation for the marine licensing prototype built with the GOV.UK Prototype Kit.

## Documentation Index

### Essential Guides

- **[Version Creation Guide](version-creation-guide.md)** - Step-by-step instructions for creating new prototype versions
- **[Routing and Error Handling Guide](routing-and-error-handling.md)** - Patterns and conventions for routes and form validation  
- **[Content Style Guide](content-style-guide.md)** - Voice and tone guidelines for writing prototype content

### Implementation Guides

- **[Site Deletion Renumbering Implementation](site-deletion-renumbering-implementation.md)** - How the site deletion and renumbering feature was built
- **[Cancel Functionality Implementation Guide](cancel-functionality-implementation-guide.md)** - Comprehensive guide for cancel link behavior

### Quick Reference

For quick AI context and essential patterns, see the **[Cursor Rules](../.cursor/rules/prototype-rules.mdc)** which provide:
- Project overview and technical framework
- Marine licensing system architecture (batch system, site numbering)
- Code standards and UI component usage
- Content design guidelines
- Cancel link implementation patterns
- Essential patterns for AI assistance

### Archived Documentation

The `archive/` folder contains outdated implementation documents from previous refactoring attempts. These are kept for historical reference but should not be used for current development.

## Marine Licensing System Architecture

### Batch System
The prototype uses a **batch system** to manage multiple sites:
- Sites can be entered via file upload or manual entry
- Each batch contains settings for shared activity data
- Sites have global numbering across all batches
- Automatic renumbering when sites are deleted

### Key Functions
```javascript
// Always use these functions for site management
initializeBatch(session, entryMethod)
getCurrentBatch(session)  
addSiteToBatch(session, siteData)
findSiteByGlobalNumber(session, globalNumber)
renumberSitesAfterDeletion(session, deletedGlobalNumber)
```

## Project Structure

```
marine-licensing-prototype/
├── app/
│   ├── views/           # All templates
│   │   ├── layouts/     # Layout templates
│   │   ├── components/  # Reusable components
│   │   └── versions/    # Version-specific views
│   ├── routes/          # Route definitions
│   │   └── versions/    # Version-specific routes
│   └── routes.js        # Main route includes
├── docs/                # Project documentation
│   └── archive/         # Outdated documentation
└── .cursor/rules/       # AI context rules
```

## Getting Started

1. **Creating a new version**: Follow the [Version Creation Guide](version-creation-guide.md)
2. **Understanding routing**: Read the [Routing and Error Handling Guide](routing-and-error-handling.md)
3. **AI assistance**: The [Cursor Rules](../.cursor/rules/prototype-rules.mdc) provide context for AI tools
4. **Site management**: Always use the batch system functions for managing site data

## Resources

- [GOV.UK Prototype Kit documentation](https://govuk-prototype-kit.herokuapp.com/docs)
- [GOV.UK Design System](https://design-system.service.gov.uk)
- [GOV.UK Style Guide](https://www.gov.uk/guidance/style-guide)

Generated by Copilot 