import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from '../App'

describe('App', () => {
  it('renders the hero heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /organiza tareas/i,
        level: 1,
      }),
    ).toBeInTheDocument()
  })

  it('renders demo task titles', () => {
    render(<App />)

    expect(
      screen.getAllByText('Revisar presupuesto semanal').length,
    ).toBeGreaterThan(0)
  })
})