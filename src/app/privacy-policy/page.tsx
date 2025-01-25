import { LegalMarkdown } from '@/features/shared/components/LegalMarkdown';
import { TermlyLogo } from '@/features/shared/components/TermlyLogo';
import { Typography } from '@/features/shared/components/Typography';
import { promises as fs } from 'fs';
import Link from 'next/link';
import path from 'path';
export default async function PrivacyPolicyPage() {
  const markdownPath = path.join(process.cwd(), 'src/app/privacy-policy/privacy-policy.md');
  const markdownContent = await fs.readFile(markdownPath, 'utf8');

  return (
    <div className="container flex flex-col mx-auto px-4 py-12">
      <Typography variant="large" className="mb-20">
        Yooo, first of all, shutout to{' '}
        <Link href="https://app.termly.io" target="_blank" className="text-blue-400 hover:text-blue-300 underline">
          Termly
        </Link>{' '}
        for providing the privacy policy template, some smart people in suits tell me that it&apos;s necessary, and I want to be legit. Also
        sorry termly for converting the thing into .md, but I couldn&apos;t get it to work :((.
        <br />
        <br />
        And now when it comes to the legal bs underneath.
        <br />
        In my terms is like that: I don&apos;t want your data, but sadly, you will probably need to give me some for the page to function. I
        won&apos;t sell it, or any of that bs. I won&apos;t mail you, untill you will want to be mailed. I will try my best to keep your
        data safe, but I can&apos;t guarantee it, cause I&apos;m not a smart person in suits.
        <br />
        <br />
        I will probably use some analytics to have an idea of how many people are using the page, and what they are doing and stuff. And I
        will use cookies for that.
        <br />I will keep your data untill you will want me to delete it. For now you can mail me, but later I&apos;ll implement deleting
        from the interface.
        <br />
        Idc bout from part of this funny rock are you, but the law does, so some stuff needed to be written about that too. That&apos;s it
        ig.
      </Typography>

      <TermlyLogo />

      <LegalMarkdown content={markdownContent} />
    </div>
  );
}
