import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Page load', () => {
  test('loads without JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('shows app title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Radar Room Configurator')).toBeVisible();
  });

  test('shows room dimensions in header', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/4 × 4 m/)).toBeVisible();
  });
});

test.describe('Object palette', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/'); });

  test('all object types are visible', async ({ page }) => {
    for (const label of ['Bed', 'Sofa', 'Table', 'Desk', 'Chair', 'Door', 'Window', 'Radar']) {
      await expect(page.getByText(label).first()).toBeVisible();
    }
  });

  test('clicking Bed adds it to canvas', async ({ page }) => {
    await page.getByText('Bed').click();
    await expect(page.getByText(/1 object/)).toBeVisible();
  });

  test('adds multiple objects', async ({ page }) => {
    await page.getByText('Bed').click();
    await page.getByText('Sofa').click();
    await page.getByText('Door').click();
    await expect(page.getByText(/3 objects/)).toBeVisible();
  });
});

test.describe('Properties panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Bed').click();
  });

  test('shows properties panel after adding object', async ({ page }) => {
    await expect(page.getByText('bed', { exact: true })).toBeVisible();
  });

  test('rotation buttons are visible', async ({ page }) => {
    await expect(page.getByText('90°')).toBeVisible();
    await expect(page.getByText('180°')).toBeVisible();
  });

  test('width field accepts number input', async ({ page }) => {
    const input = page.locator('input[type=number]').filter({ hasValue: '1.4' }).first();
    await input.fill('1.8');
    await input.blur();
    await expect(page.locator('input[value="1.8"]').first()).toBeVisible();
  });

  test('delete button removes the object', async ({ page }) => {
    await page.getByRole('button', { name: /Delete/ }).click();
    await expect(page.getByText(/0 object/)).toBeVisible();
  });
});

test.describe('Room size', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/'); });

  test('room width field exists', async ({ page }) => {
    await expect(page.locator('input[type=number]').first()).toBeVisible();
  });

  test('changing room width updates header', async ({ page }) => {
    const inputs = page.locator('input[type=number]');
    const widthInput = inputs.first();
    await widthInput.fill('6');
    await widthInput.blur();
    await expect(page.getByText(/6 × /)).toBeVisible();
  });
});

test.describe('3D viewer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Bed').click();
  });

  test('3D button opens viewer', async ({ page }) => {
    await page.getByText(/3D/).click();
    await expect(page.getByText('3D Room View')).toBeVisible();
  });

  test('close button dismisses 3D viewer', async ({ page }) => {
    await page.getByText(/3D/).click();
    await page.getByText(/Close/).click();
    await expect(page.getByText('3D Room View')).not.toBeVisible();
  });

  test('3D viewer shows canvas (WebGL)', async ({ page }) => {
    await page.getByText(/3D/).click();
    await expect(page.locator('canvas')).toBeVisible();
  });
});

test.describe('Export modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Bed').click();
    await page.getByText(/Export/).click();
  });

  test('export modal opens', async ({ page }) => {
    await expect(page.getByText(/board/i)).toBeVisible();
  });

  test('cancel closes export modal', async ({ page }) => {
    await page.getByRole('button', { name: /[Cc]ancel/ }).click();
    await expect(page.getByText(/board/i)).not.toBeVisible();
  });
});

test.describe('Import modal', () => {
  test('import modal opens', async ({ page }) => {
    await page.goto('/');
    await page.getByText(/Import/).click();
    await expect(page.getByText(/floor plan/i)).toBeVisible();
  });
});

test.describe('Dark mode', () => {
  test('toggles dark/light mode', async ({ page }) => {
    await page.goto('/');
    await page.getByText('☀️').click();
    await expect(page.getByText('🌙')).toBeVisible();
  });
});

test.describe('Keyboard shortcuts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Bed').click();
    // Click canvas to focus keyboard handler
    await page.locator('main svg').click();
  });

  test('R key rotates selected object', async ({ page }) => {
    await page.keyboard.press('r');
    await expect(page.locator('span').filter({ hasText: '45°' })).toBeVisible();
  });

  test('ArrowRight moves object — no crash', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await expect(page.getByText(/1 object/)).toBeVisible();
  });
});

test.describe('Clear objects', () => {
  test('clear button removes all objects', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Bed').click();
    await page.getByText('Sofa').click();
    page.on('dialog', d => d.accept());
    await page.getByText('Clear').click();
    await expect(page.getByText(/0 object/)).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('no critical a11y violations on load', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('canvas')
      .analyze();
    const critical = results.violations.filter(v => v.impact === 'critical');
    if (critical.length > 0) {
      console.log('Critical a11y violations:', JSON.stringify(critical.map(v => ({ id: v.id, description: v.description, nodes: v.nodes.length })), null, 2));
    }
    expect(critical).toHaveLength(0);
  });
});

test.describe('Responsive / viewport', () => {
  test('renders on mobile viewport without overflow crash', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.getByText('Bed').click();
    expect(errors).toHaveLength(0);
  });

  test('renders on large desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.getByText('Radar Room Configurator')).toBeVisible();
  });
});
