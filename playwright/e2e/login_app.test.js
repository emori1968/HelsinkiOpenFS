const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog } = require('./helper')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'vergara',
        username: 'jacinto',
        password: 'ramos'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Blogs')).toBeVisible()
    await expect(page.getByText('log in')).toBeVisible()
  })

  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {

        await page.goto('http://localhost:5173')
        await page.getByRole('button', { name: 'log in' }).click()
        await page.getByRole('textbox').first().fill('jacinto')
        await page.getByRole('textbox').last().fill('ramos')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('vergara logged in')).toBeVisible()  })

    test('fails with wrong credentials', async ({ page }) => {

        await page.goto('http://localhost:5173')
        await page.getByRole('button', { name: 'log in' }).click()
        await page.getByRole('textbox').first().fill('jacinto')
        await page.getByRole('textbox').last().fill('ramose')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('username')).toBeVisible()  })
    })


  
  describe('when logged in', () => {

    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').first('jacinto')
      await page.getByTestId('password').last('ramos')
      await page.getByRole('button', { name: 'login' }).click()
    })
    
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a title created by playwright', 'author fill in', 'url fill in',true )
      await expect(page.getByText('a title created by playwright')).toBeVisible()
    })  
  })

  })