# Task Completion Checklist

## Before Committing Code
1. **Lint Check**: Run `npm run lint` and fix any issues
2. **Build Test**: Run `npm run build` to ensure production build works
3. **Type Check**: Verify TypeScript compilation with no errors
4. **Manual Testing**: Test functionality in browser at http://localhost:3000
5. **Responsive Testing**: Check mobile and desktop layouts

## Code Quality Standards
- All TypeScript errors resolved
- ESLint warnings addressed
- Proper error handling implemented
- Accessibility considerations met
- Performance implications considered

## File Requirements
- Use TypeScript for all new files
- Follow established naming conventions
- Include proper type definitions
- Use path aliases (@/*) for internal imports
- Keep components focused and reusable

## Testing Considerations
- Test in both light and dark modes
- Verify responsive design on different screen sizes
- Check keyboard navigation where applicable
- Ensure proper loading and error states

## Git Best Practices
- Write descriptive commit messages
- Keep commits focused and atomic
- Use conventional commit format when possible
- Test locally before pushing

## Documentation
- Update CLAUDE.md if new patterns are introduced
- Add comments for complex logic
- Document component props and usage
- Keep README.md updated with new features