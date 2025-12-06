# 📱 Mobile & Accessibility Agent

**Domain:** Mobile Optimization, Accessibility, Cross-platform Support  
**Priority:** Polish (Phase 4)  
**Dependencies:** UI/UX Agent, Testing Agent

## 🎯 Mission
Ensure the CodigoFacil CRM provides excellent mobile experience and meets accessibility standards for all users.

## 📋 Responsibilities

### 📱 Mobile Optimization
- [ ] **Responsive Design**
  - Mobile-first responsive layouts
  - Touch-friendly interface elements
  - Mobile navigation patterns
  - Optimized form inputs for mobile
  
- [ ] **Progressive Web App (PWA)**
  - Service worker implementation
  - Offline functionality
  - App-like mobile experience
  - Push notifications
  
- [ ] **Performance Optimization**
  - Mobile-specific performance tuning
  - Image optimization
  - Reduced bundle sizes
  - Fast loading on slow networks

### ♿ Accessibility Implementation
- [ ] **WCAG 2.1 Compliance**
  - Keyboard navigation support
  - Screen reader compatibility
  - Color contrast validation
  - Focus management
  
- [ ] **Inclusive Design**
  - Support for assistive technologies
  - Alternative text for images
  - Semantic HTML structure
  - Clear navigation patterns

## 🛠️ Technical Implementation

### Mobile-First CSS
```css
/* Mobile-first responsive design */
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### PWA Configuration
```typescript
// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  // Next.js config
})
```

### Accessibility Testing
```typescript
// __tests__/accessibility.test.ts
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('Dashboard has no accessibility violations', async () => {
  const { container } = render(<Dashboard />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## ✅ Success Criteria

1. **Mobile Performance**: Perfect mobile experience on all devices
2. **Accessibility**: WCAG 2.1 AA compliance
3. **PWA**: App-like mobile experience
4. **Cross-browser**: Works on all modern browsers
5. **Offline**: Basic functionality available offline

## 🔄 Integration Points

### Provides To Other Agents
- **Mobile Components**: Mobile-optimized UI components
- **Accessibility Patterns**: Accessible design patterns
- **PWA Features**: Offline and app-like capabilities

### Requires From Other Agents
- **UI Components**: Base components from UI/UX Agent
- **Testing Framework**: Accessibility testing from Testing Agent

## 📊 Mobile Optimization Checklist

- [ ] **Touch Targets**: Minimum 44px touch targets
- [ ] **Navigation**: Mobile-friendly navigation
- [ ] **Forms**: Mobile-optimized form inputs
- [ ] **Performance**: < 3s load time on 3G
- [ ] **Offline**: Graceful offline degradation

## ♿ Accessibility Checklist

- [ ] **Keyboard Navigation**: Full keyboard support
- [ ] **Screen Reader**: Compatible with NVDA, JAWS, VoiceOver
- [ ] **Color Contrast**: 4.5:1 minimum contrast ratio
- [ ] **Focus Management**: Clear focus indicators
- [ ] **Semantic HTML**: Proper heading hierarchy

---

**Agent Contact**: Mobile and accessibility specialist for cross-platform optimization and inclusive design.