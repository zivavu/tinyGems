import { writeFileSync } from 'fs';
import { join } from 'path';
import { faker } from '@faker-js/faker';
import { generateGems } from '../src/lib/dummy/gems';
import { GemType } from '../src/lib/types/gems';

// Set a seed for reproducible results
faker.seed(123);

// Configuration for how many of each type to generate
const GEMS_PER_TYPE: Record<GemType, number> = {
  music: 50,
  art: 30,
  craft: 20,
  content: 25,
  words: 15,
  video: 15,
  photography: 15,
};

// Generate gems for each type
const allGems = Object.entries(GEMS_PER_TYPE).flatMap(([type, count]) =>
  generateGems(count).map((gem) => ({
    ...gem,
    type, // Ensure the type is set correctly
  })),
);

// Shuffle the array to mix different types
const shuffledGems = faker.helpers.shuffle(allGems);

// Save to file
const outputPath = join(process.cwd(), 'src', 'lib', 'dummy', 'generatedGems.json');

try {
  writeFileSync(outputPath, JSON.stringify(shuffledGems, null, 2));
  console.log(`✨ Successfully generated ${shuffledGems.length} gems!`);
  console.log(`📝 File saved to: ${outputPath}`);

  // Log count by type
  const countByType = shuffledGems.reduce(
    (acc, gem) => {
      acc[gem.type] = (acc[gem.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  console.log('\n📊 Gems by type:');
  Object.entries(countByType).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
  });
} catch (error) {
  console.error('❌ Error saving gems:', error);
  process.exit(1);
}
