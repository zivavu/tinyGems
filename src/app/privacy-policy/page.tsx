import { LegalMarkdown } from '@/features/legal/components/LegalMarkdown';
import { TermlyLogo } from '@/features/shared/components/TermlyLogo';
import { Typography } from '@/features/shared/components/Typography';
import { promises as fs } from 'fs';
import path from 'path';
export default async function PrivacyPolicyPage() {
  const markdownPath = path.join(process.cwd(), 'src/features/legal/markdown/privacy-policy.md');
  const markdownContent = await fs.readFile(markdownPath, 'utf8');

  return (
    <div className="container flex flex-col mx-auto px-4 py-12">
      <Typography variant="large" className="mb-20">
        Well, I&apos;ve heard that it&apos;s necessary, so here it is.
        <br />
        But in my terms is like that: I don&apos;t want your data, but sadly, you will probably need to give me some for the page to
        function. I won&apos;t sell it, or any of that bs. I won&apos;t mail you, untill you will want to be mailed. I will try my best to
        keep your data safe, but I can&apos;t guarantee it.
        <br />
        <br />
        I will probably use some analytics to have an idea of how many people are using the page, and what they are doing and stuff. And I
        will use cookies for that.
        <br />
        Also, as there are embeded streaming service players on the page, they might fuck with your data, with these juicy cookies. But
        well, I can&apos;t do anything about it.
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
