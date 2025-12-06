/**
 * Functional System Test
 * Tests the complete CRM system functionality
 */

import fetch from 'node-fetch'

const BASE_URL = 'http://localhost:3002'

// Type assertion for Node fetch
global.fetch = fetch as any

async function testSystemFunctionality() {
  console.log('🔍 Starting Comprehensive System Test...\n')

  const results = {
    passed: 0,
    failed: 0,
    tests: []
  }

  async function runTest(name: string, testFn: () => Promise<void>) {
    try {
      await testFn()
      console.log(`✅ ${name}`)
      results.passed++
      results.tests.push({ name, status: 'PASSED' })
    } catch (error) {
      console.log(`❌ ${name}: ${error.message}`)
      results.failed++
      results.tests.push({ name, status: 'FAILED', error: error.message })
    }
  }

  // Test 1: API Endpoints
  await runTest('Companies API - GET /api/companies', async () => {
    const response = await fetch(`${BASE_URL}/api/companies`)
    const data = await response.json()
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (!data.success) throw new Error('API returned success: false')
    if (!Array.isArray(data.data)) throw new Error('Data is not an array')
    if (data.data.length === 0) throw new Error('No companies found')
  })

  await runTest('Leads API - GET /api/leads', async () => {
    const response = await fetch(`${BASE_URL}/api/leads`)
    const data = await response.json()
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (!data.success) throw new Error('API returned success: false')
    if (!Array.isArray(data.data)) throw new Error('Data is not an array')
  })

  await runTest('Contacts API - GET /api/contacts', async () => {
    const response = await fetch(`${BASE_URL}/api/contacts`)
    const data = await response.json()
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (!data.success) throw new Error('API returned success: false')
    if (!Array.isArray(data.data)) throw new Error('Data is not an array')
  })

  await runTest('Pipeline Stages API - GET /api/pipeline-stages', async () => {
    const response = await fetch(`${BASE_URL}/api/pipeline-stages`)
    const data = await response.json()
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (!data.success) throw new Error('API returned success: false')
    if (!Array.isArray(data.data)) throw new Error('Data is not an array')
    if (data.data.length === 0) throw new Error('No pipeline stages found')
  })

  await runTest('Follow-ups API - GET /api/follow-ups', async () => {
    const response = await fetch(`${BASE_URL}/api/follow-ups`)
    const data = await response.json()
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (!data.success) throw new Error('API returned success: false')
    if (!Array.isArray(data.data)) throw new Error('Data is not an array')
  })

  // Test 2: CRUD Operations
  let testCompanyId: string

  await runTest('Create Company - POST /api/companies', async () => {
    const newCompany = {
      name: `Test Company ${Date.now()}`,
      industry: 'Testing',
      website: 'https://test.example.com',
      city: 'San José'
    }

    const response = await fetch(`${BASE_URL}/api/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCompany)
    })
    const data = await response.json()
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (!data.success) throw new Error('Failed to create company')
    if (!data.data.id) throw new Error('No ID returned')
    
    testCompanyId = data.data.id
  })

  await runTest('Get Single Company - GET /api/companies/[id]', async () => {
    const response = await fetch(`${BASE_URL}/api/companies/${testCompanyId}`)
    const data = await response.json()
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (!data.success) throw new Error('Failed to fetch company')
    if (data.data.id !== testCompanyId) throw new Error('Wrong company returned')
  })

  await runTest('Update Company - PUT /api/companies/[id]', async () => {
    const updateData = { notes: `Updated via test - ${new Date().toISOString()}` }
    
    const response = await fetch(`${BASE_URL}/api/companies/${testCompanyId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    })
    const data = await response.json()
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (!data.success) throw new Error('Failed to update company')
    if (data.data.notes !== updateData.notes) throw new Error('Notes not updated')
  })

  await runTest('Delete Company - DELETE /api/companies/[id]', async () => {
    const response = await fetch(`${BASE_URL}/api/companies/${testCompanyId}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (!data.success) throw new Error('Failed to delete company')
  })

  // Test 3: Dashboard Pages
  await runTest('Dashboard Page - GET /dashboard', async () => {
    const response = await fetch(`${BASE_URL}/dashboard`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (!response.headers.get('content-type')?.includes('text/html')) {
      throw new Error('Not HTML response')
    }
  })

  await runTest('Leads Dashboard - GET /dashboard/leads', async () => {
    const response = await fetch(`${BASE_URL}/dashboard/leads`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
  })

  await runTest('Pipeline Dashboard - GET /dashboard/pipeline', async () => {
    const response = await fetch(`${BASE_URL}/dashboard/pipeline`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
  })

  await runTest('Follow-ups Dashboard - GET /dashboard/follow-ups', async () => {
    const response = await fetch(`${BASE_URL}/dashboard/follow-ups`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
  })

  // Test 4: Error Handling
  await runTest('404 for Non-existent Company', async () => {
    const response = await fetch(`${BASE_URL}/api/companies/non-existent-id`)
    const data = await response.json()
    
    if (response.status !== 404) throw new Error(`Expected 404, got ${response.status}`)
    if (data.success !== false) throw new Error('Expected success: false')
  })

  await runTest('Validation Error for Invalid Company', async () => {
    const invalidCompany = { industry: 'Test' } // Missing required name
    
    const response = await fetch(`${BASE_URL}/api/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidCompany)
    })
    const data = await response.json()
    
    if (response.status !== 400) throw new Error(`Expected 400, got ${response.status}`)
    if (data.success !== false) throw new Error('Expected success: false')
  })

  // Test 5: Data Integrity
  await runTest('Database Data Integrity', async () => {
    const companiesRes = await fetch(`${BASE_URL}/api/companies`)
    const companies = await companiesRes.json()
    
    const leadsRes = await fetch(`${BASE_URL}/api/leads`)
    const leads = await leadsRes.json()
    
    if (companies.data.length === 0) throw new Error('No companies in database')
    if (leads.data.length === 0) throw new Error('No leads in database')
    
    // Check if leads have proper relations
    const leadsWithCompanies = leads.data.filter(lead => lead.company)
    if (leadsWithCompanies.length === 0) {
      throw new Error('No leads have company relations')
    }
  })

  // Results Summary
  console.log('\n' + '='.repeat(50))
  console.log('📊 SYSTEM TEST RESULTS')
  console.log('='.repeat(50))
  console.log(`✅ Passed: ${results.passed}`)
  console.log(`❌ Failed: ${results.failed}`)
  console.log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`)

  if (results.failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! System is fully functional! 🚀')
  } else {
    console.log('\n⚠️ Some tests failed. Check the errors above.')
    console.log('\nFailed tests:')
    results.tests
      .filter(test => test.status === 'FAILED')
      .forEach(test => console.log(`   - ${test.name}: ${test.error}`))
  }

  return results
}

// Export for Jest
export default testSystemFunctionality

// Run if called directly
if (require.main === module) {
  testSystemFunctionality().catch(console.error)
}