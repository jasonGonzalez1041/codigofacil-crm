#!/usr/bin/env node
import { seedDatabase } from '../lib/seed.js';

async function main() {
  try {
    await seedDatabase();
    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();