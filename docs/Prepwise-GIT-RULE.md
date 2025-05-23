# Zetos Git Workflow Rules

This document outlines the Git workflow and branch management rules for the Zara Quotation System project.

## Branch Structure

The repository maintains three main branches, each with a specific purpose:

1. **master** - Production branch
   - Contains stable, production-ready code
   - Direct commits are not allowed; changes must come through pull requests from `preprod`
   - Tagged for releases

2. **preprod** - Pre-production/Staging branch
   - Used for testing before deploying to production
   - Changes must be tested here before being merged into `master`
   - Receives changes from `dev` branch

3. **dev** - Development branch
   - Primary branch for ongoing development
   - All new features and non-emergency bug fixes should start here
   - May be unstable at times

## Development Workflow

### 1. Starting New Work

Always start new work from the latest version of the `dev` branch:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name
```

### 2. Feature Development

- Make regular, small commits with clear messages
- Keep features focused and concise
- Update your branch regularly with changes from `dev`:

```bash
git checkout dev
git pull origin dev
git checkout feature/your-feature-name
git merge dev
```

### 3. Code Review & Integration

When your feature is complete:

1. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a pull request (PR) to merge your changes into the `dev` branch
3. Address any feedback or comments from code review
4. Once approved, merge the PR into `dev`

### 4. Progression to Staging

Regularly merge `dev` into `preprod` for testing:

```bash
git checkout preprod
git pull origin preprod
git merge dev
git push origin preprod
```

### 5. Production Deployment

After testing in `preprod`:

1. Create a PR from `preprod` to `master`
2. Review the changes carefully
3. After approval, merge into `master`
4. Tag the release with a version number:
   ```bash
   git checkout master
   git pull origin master
   git tag -a v1.x.x -m "Version 1.x.x"
   git push origin v1.x.x
   ```

## Validation Process

The project follows a strict validation process for merging between branches:

### Dev to Preprod Validation
- **Initiator**: Development Lead initiates the Pull Request
- **Validator**: Project Manager (PM) reviews and approves the PR
- **Requirements**:
  - All tests must pass
  - Code must adhere to project standards
  - Documentation must be updated
  - PM must verify that the changes align with sprint/release goals

### Preprod to Master Validation
- **Initiator**: Development Lead initiates the Pull Request
- **Validators**: Both Solution Architect (SA) and Project Manager (PM) must approve
- **Requirements**:
  - All tests must pass in preprod environment
  - SA must verify technical implementation and architecture alignment
  - PM must verify business requirements are met
  - User acceptance testing (UAT) must be completed
  - Release notes must be prepared

The dual validation for production deployments ensures both technical excellence and business alignment before code reaches the production environment.

## Commit Message Guidelines

All commit messages should follow this format:

```
<type>(<scope>): <subject>

<body>
```

Where:
- `<type>` is one of:
  - **feat**: A new feature
  - **fix**: A bug fix
  - **docs**: Documentation changes
  - **style**: Code style changes (formatting, etc.)
  - **refactor**: Code refactoring
  - **test**: Adding or updating tests
  - **chore**: Maintenance tasks

- `<scope>` is optional and indicates the part of the codebase affected
- `<subject>` is a short description of the change
- `<body>` is optional and provides additional context

Example:
```
feat(quote): add automatic price calculation

Added new feature to automatically calculate prices based on the selected features.
```

## Handling Hotfixes

For urgent production fixes:

1. Create a hotfix branch directly from `master`:
   ```bash
   git checkout master
   git checkout -b hotfix/critical-issue
   ```

2. Make the necessary fixes
3. Create a PR to merge into `master`
4. After merging to `master`, also merge the changes into `preprod` and `dev`:
   ```bash
   git checkout preprod
   git merge master
   git push origin preprod
   
   git checkout dev
   git merge preprod
   git push origin dev
   ```

## Google Apps Script Integration

When working with the Google Apps Script platform:

1. Make changes in a local branch first
2. Test changes in a test Google Apps Script project
3. Once approved, copy the code to the production Google Apps Script project
4. Commit and push the changes to the appropriate Git branch

For detailed instructions on migrating code to Google Apps Script, refer to the [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md) file.

## Questions and Support

If you have questions about the Git workflow or need help, please contact the repository administrator.