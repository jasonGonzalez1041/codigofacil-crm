#!/usr/bin/env node

async function testCRMFunctionality() {
  console.log('🔍 Testing CRM Functionality...\n');
  
  const baseUrl = 'http://localhost:3002';
  let testsPassed = 0;
  let testsTotal = 0;

  const test = async (name: string, testFn: () => Promise<boolean>) => {
    testsTotal++;
    try {
      console.log(`⏳ ${name}...`);
      const result = await testFn();
      if (result) {
        console.log(`✅ ${name} - PASSED\n`);
        testsPassed++;
      } else {
        console.log(`❌ ${name} - FAILED\n`);
      }
    } catch (error) {
      console.log(`❌ ${name} - ERROR: ${error}\n`);
    }
  };

  // Test 1: Pipeline Stages
  await test('Pipeline Stages API', async () => {
    const response = await fetch(`${baseUrl}/api/pipeline-stages`);
    const data = await response.json();
    return data.success && data.data.length >= 6;
  });

  // Test 2: Companies API
  await test('Companies API', async () => {
    const response = await fetch(`${baseUrl}/api/companies`);
    const data = await response.json();
    return data.success && data.data.length >= 3;
  });

  // Test 3: Leads API
  await test('Leads API', async () => {
    const response = await fetch(`${baseUrl}/api/leads`);
    const data = await response.json();
    return data.success && data.data.length >= 4;
  });

  // Test 4: Follow-ups API
  await test('Follow-ups API', async () => {
    const response = await fetch(`${baseUrl}/api/follow-ups`);
    const data = await response.json();
    return data.success && data.data.length >= 4;
  });

  // Test 5: Contacts API
  await test('Contacts API', async () => {
    const response = await fetch(`${baseUrl}/api/contacts`);
    const data = await response.json();
    return data.success && data.data.length >= 3;
  });

  // Test 6: Lead Creation
  await test('Lead Creation', async () => {
    const newLead = {
      title: 'Test Lead',
      description: 'Test lead creation',
      value: 1000000,
      probability: 50,
      source: 'test',
      priority: 'medium',
    };

    const response = await fetch(`${baseUrl}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead),
    });

    const data = await response.json();
    return data.success && data.data.lead.title === 'Test Lead';
  });

  // Test 7: Dashboard Page Access
  await test('Dashboard Page Access', async () => {
    const response = await fetch(`${baseUrl}/dashboard`);
    return response.status === 200;
  });

  // Test 8: Leads Page Access
  await test('Leads Page Access', async () => {
    const response = await fetch(`${baseUrl}/dashboard/leads`);
    return response.status === 200;
  });

  // Test 9: Pipeline Page Access
  await test('Pipeline Page Access', async () => {
    const response = await fetch(`${baseUrl}/dashboard/pipeline`);
    return response.status === 200;
  });

  // Test 10: Follow-ups Page Access
  await test('Follow-ups Page Access', async () => {
    const response = await fetch(`${baseUrl}/dashboard/follow-ups`);
    return response.status === 200;
  });

  // Results Summary
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('═══════════════════════');
  console.log(`✅ Tests Passed: ${testsPassed}/${testsTotal}`);
  console.log(`❌ Tests Failed: ${testsTotal - testsPassed}/${testsTotal}`);
  console.log(`📈 Success Rate: ${Math.round((testsPassed / testsTotal) * 100)}%\n`);

  if (testsPassed === testsTotal) {
    console.log('🎉 ALL TESTS PASSED! CRM is working correctly.');
    return true;
  } else {
    console.log('⚠️  Some tests failed. Please review the issues above.');
    return false;
  }
}

// Run tests
testCRMFunctionality()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('💥 Test execution failed:', error);
    process.exit(1);
  });