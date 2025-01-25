import ReactMarkdown from 'react-markdown';

interface LegalMarkdownProps {
  content: string;
}

export const LegalMarkdown = ({ content }: LegalMarkdownProps) => {
  return (
    <article className="prose prose-lg prose-invert max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="text-4xl font-bold mb-6 text-white">{children}</h1>,
          h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-6 text-white">{children}</h2>,
          h3: ({ children }) => <h3 className="text-2xl font-semibold mt-8 mb-4 text-white">{children}</h3>,
          p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="space-y-3 mb-6 text-gray-300">{children}</ul>,
          li: ({ children }) => (
            <li className="flex">
              <span className="mr-2">•</span>
              <span className="flex-1">{children}</span>
            </li>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-blue-400 hover:text-blue-300 underline" rel="noopener noreferrer">
              {children}
            </a>
          ),
          em: ({ children }) => <em className="text-gray-400 italic">{children}</em>,
          strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
