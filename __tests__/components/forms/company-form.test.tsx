import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CompanyForm } from '@/components/forms/company-form'

describe('CompanyForm', () => {
  const mockOnSubmit = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render form fields correctly', () => {
    render(
      <CompanyForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    )

    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/industry/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create company/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('should populate form with existing company data', () => {
    const existingCompany = {
      id: '1',
      name: 'Test Company',
      industry: 'Technology',
      website: 'https://test.com',
      phone: '+506 1234-5678'
    }

    render(
      <CompanyForm
        company={existingCompany}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    )

    expect(screen.getByDisplayValue('Test Company')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Technology')).toBeInTheDocument()
    expect(screen.getByDisplayValue('https://test.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('+506 1234-5678')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /update company/i })).toBeInTheDocument()
  })

  it('should validate required fields', async () => {
    const user = userEvent.setup()

    render(
      <CompanyForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    )

    // Try to submit without filling required fields
    const submitButton = screen.getByRole('button', { name: /create company/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/company name is required/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should validate website URL format', async () => {
    const user = userEvent.setup()

    render(
      <CompanyForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    )

    // Fill required field
    const nameInput = screen.getByLabelText(/company name/i)
    await user.type(nameInput, 'Test Company')

    // Enter invalid URL
    const websiteInput = screen.getByLabelText(/website/i)
    await user.type(websiteInput, 'invalid-url')

    const submitButton = screen.getByRole('button', { name: /create company/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid url/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    mockOnSubmit.mockResolvedValue(undefined)

    render(
      <CompanyForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    )

    // Fill form with valid data
    await user.type(screen.getByLabelText(/company name/i), 'Test Company')
    await user.type(screen.getByLabelText(/industry/i), 'Technology')
    await user.type(screen.getByLabelText(/website/i), 'https://test.com')
    await user.type(screen.getByLabelText(/phone/i), '+506 1234-5678')

    const submitButton = screen.getByRole('button', { name: /create company/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Test Company',
        industry: 'Technology',
        website: 'https://test.com',
        phone: '+506 1234-5678',
        address: '',
        city: '',
        country: 'Costa Rica',
        notes: ''
      })
    })
  })

  it('should call onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <CompanyForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    )

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    await user.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalledTimes(1)
  })

  it('should show loading state during submission', async () => {
    const user = userEvent.setup()
    mockOnSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))

    render(
      <CompanyForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    )

    // Fill required field and submit
    await user.type(screen.getByLabelText(/company name/i), 'Test Company')
    const submitButton = screen.getByRole('button', { name: /create company/i })
    await user.click(submitButton)

    // Check for loading state
    expect(screen.getByRole('button', { name: /create company/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled()
  })
})