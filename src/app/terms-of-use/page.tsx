import { LegalMarkdown } from '@/features/shared/components/LegalMarkdown';
import { TermlyLogo } from '@/features/shared/components/TermlyLogo';
import { Typography } from '@/features/shared/components/Typography';
import { promises as fs } from 'fs';
import Link from 'next/link';
import path from 'path';

export default async function TermsOfUsePage() {
  const markdownPath = path.join(process.cwd(), 'src/features/shared/markdown/terms-of-use.md');
  const markdownContent = await fs.readFile(markdownPath, 'utf8');

  return (
    <div className="container flex flex-col mx-auto px-4 py-12">
      <Typography variant="large" className="mb-20">
        Yooo, first of all, shutout to{' '}
        <Link href="https://app.termly.io" target="_blank" className="text-blue-400 hover:text-blue-300 underline">
          Termly
        </Link>{' '}
        for providing the terms of use template, some smart people in suits tell me that it&apos;s necessary, and I want to be legit. Also
        sorry termly for converting the thing into .md, but I couldn&apos;t get it to work :(( .
        <br />
        <br />
        And the terms of use in my terms is to: don&apos;t do illegal stuff, don&apos;t spam some weird stuff, if you successfully hack the
        page - let me know if possible, you can steal as much content as you want. Yeah.
      </Typography>

      <TermlyLogo />

      <LegalMarkdown content={markdownContent} />
    </div>
  );
}
