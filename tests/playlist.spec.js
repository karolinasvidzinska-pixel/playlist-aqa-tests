require('dotenv').config();
const { test, expect } = require('@playwright/test');

const BASE_URL =
  process.env.BASE_URL || 'https://vite-react-alpha-lemon.vercel.app/';

test.describe('Playlist App Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Search filters tracks correctly', async ({ page }) => {
    // Точный поиск по label "Search"
    const searchInput = page.getByLabel('Search');

    await searchInput.fill('Summer');

    // Треки — это <p> с названиями
    const trackTitles = page.locator('#tracklist p');

    await expect(trackTitles.first()).toContainText('Summer Breeze');
  });

  test('Add track to playlist using + button', async ({ page }) => {
    // Кнопки "+" имеют текст "+"
    const addButtons = page.getByRole('button', { name: '+' });

    await addButtons.first().click();

    // После добавления меняется текст в #playlist-duration
    const durationText = page.locator('#playlist-duration');
    await expect(durationText).not.toHaveText('No tracks on playlist');
  });

  test('Verify total duration is calculated correctly in seconds', async ({ page }) => {
    const addButtons = page.getByRole('button', { name: '+' });

    // Добавляем 2 трека:
    // Summer Breeze → 03:35 → 215 сек
    // Autumn Leaves → 03:00 → 180 сек
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();

    // Проверяем итог
    const totalDuration = page.locator('#playlist-duration');
    await expect(totalDuration).toHaveText('395'); // 215 + 180 = 395
  });

});




