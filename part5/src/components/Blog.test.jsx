import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Roman Riquelme'
  }
  const username = 'el mamao'

  render(<Blog blog={blog} username={username} />)

  // HTML get printed
  screen.debug()

  const element1 = screen.getByText('Component testing is done with react-testing-library', { exact: false })
  const element2 = screen.getByText('Roman Riquelme', { exact: false })
  
  // no need
  // expect(element1).toBeDefined()
  // expect(element2).toBeDefined()
})