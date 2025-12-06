import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EnhancedDataTable } from '@/components/data-table-enhanced'

interface TestData {
  id: string
  name: string
  email: string
  status: string
}

describe('EnhancedDataTable', () => {
  const mockData: TestData[] = [
    { id: '1', name: 'John Doe', email: 'john@test.com', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@test.com', status: 'inactive' },
    { id: '3', name: 'Bob Johnson', email: 'bob@test.com', status: 'active' }
  ]

  const mockColumns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'status', title: 'Status', sortable: false }
  ]

  const mockOnAdd = jest.fn()
  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()
  const mockOnView = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render table with data correctly', () => {
    render(
      <EnhancedDataTable
        data={mockData}
        columns={mockColumns}
        title="Test Table"
        onAdd={mockOnAdd}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    )

    expect(screen.getByText('Test Table')).toBeInTheDocument()
    expect(screen.getByText('3 records')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@test.com')).toBeInTheDocument()
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
  })

  it('should filter data based on search input', async () => {
    const user = userEvent.setup()

    render(
      <EnhancedDataTable
        data={mockData}
        columns={mockColumns}
        title="Test Table"
      />
    )

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'John')

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
      expect(screen.getByText('2 results')).toBeInTheDocument()
    })
  })

  it('should sort data when sortable column header is clicked', async () => {
    const user = userEvent.setup()

    render(
      <EnhancedDataTable
        data={mockData}
        columns={mockColumns}
        title="Test Table"
      />
    )

    const nameHeader = screen.getByText('Name')
    await user.click(nameHeader)

    // Check if sort indicator appears
    await waitFor(() => {
      expect(screen.getByText('↑')).toBeInTheDocument()
    })

    // Click again to reverse sort
    await user.click(nameHeader)

    await waitFor(() => {
      expect(screen.getByText('↓')).toBeInTheDocument()
    })
  })

  it('should show empty state when no data', () => {
    render(
      <EnhancedDataTable
        data={[]}
        columns={mockColumns}
        title="Empty Table"
        emptyMessage="No data available"
      />
    )

    expect(screen.getByText('0 records')).toBeInTheDocument()
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('should show loading state', () => {
    render(
      <EnhancedDataTable
        data={mockData}
        columns={mockColumns}
        title="Loading Table"
        isLoading={true}
      />
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should call action callbacks when clicked', async () => {
    const user = userEvent.setup()

    render(
      <EnhancedDataTable
        data={mockData}
        columns={mockColumns}
        title="Test Table"
        onAdd={mockOnAdd}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    )

    // Test add button
    const addButton = screen.getByRole('button', { name: /add new/i })
    await user.click(addButton)
    expect(mockOnAdd).toHaveBeenCalledTimes(1)

    // Test action menu
    const actionButtons = screen.getAllByRole('button', { name: '' })
    const firstActionButton = actionButtons[0]
    await user.click(firstActionButton)

    // Test view action
    const viewMenuItem = screen.getByText('View')
    await user.click(viewMenuItem)
    expect(mockOnView).toHaveBeenCalledWith(mockData[0])
  })

  it('should show search results count', async () => {
    const user = userEvent.setup()

    render(
      <EnhancedDataTable
        data={mockData}
        columns={mockColumns}
        title="Test Table"
      />
    )

    expect(screen.getByText('3 results')).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'nonexistent')

    await waitFor(() => {
      expect(screen.getByText('0 results')).toBeInTheDocument()
      expect(screen.getByText('No results found for "nonexistent"')).toBeInTheDocument()
    })
  })

  it('should handle nested data access', () => {
    const nestedData = [
      { id: '1', user: { name: 'John Doe', profile: { email: 'john@test.com' } } }
    ]

    const nestedColumns = [
      { key: 'user.name', title: 'Name' },
      { key: 'user.profile.email', title: 'Email' }
    ]

    render(
      <EnhancedDataTable
        data={nestedData}
        columns={nestedColumns}
        title="Nested Data Table"
      />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@test.com')).toBeInTheDocument()
  })
})