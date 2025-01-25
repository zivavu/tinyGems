import { LegalMarkdown } from '@/features/legal/components/LegalMarkdown';
import { TermlyLogo } from '@/features/shared/components/TermlyLogo';
import { Typography } from '@/features/shared/components/Typography';
import { promises as fs } from 'fs';
import path from 'path';

export default async function TermsOfUsePage() {
  const markdownPath = path.join(process.cwd(), 'src/features/legal/markdown/terms-of-use.md');
  const markdownContent = await fs.readFile(markdownPath, 'utf8');

  return (
    <div className="container flex flex-col mx-auto px-4 py-12">
      <Typography variant="large" className="mb-20">
        The terms of use in my terms is to: don&apos;t do illegal stuff, don&apos;t spam some weird stuff, if you successfully hack the page
        - let me know if possible. You can steal as much content as you want. Yeah.
      </Typography>

      <TermlyLogo />

      <LegalMarkdown content={markdownContent} />
    </div>
  );
}
