'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

type Props = {
    content: string;
    className?: string;
};

const components: Components = {
    p: (props) => <p className="mb-3 leading-relaxed text-main/85" {...props} />,
    h2: (props) => <h2 className="mt-6 mb-3 text-xl md:text-2xl font-serif-title font-semibold text-main" {...props} />,
    h3: (props) => <h3 className="mt-5 mb-2 text-lg font-semibold text-main" {...props} />,
    ul: (props) => <ul className="my-3 ml-5 list-disc space-y-1.5" {...props} />,
    ol: (props) => <ol className="my-3 ml-5 list-decimal space-y-1.5" {...props} />,
    li: (props) => <li className="leading-relaxed text-main/85" {...props} />,
    strong: (props) => <strong className="font-semibold text-main" {...props} />,
    em: (props) => <em className="italic text-main/90" {...props} />,
    a: (props) => <a className="font-medium text-sage underline underline-offset-2 hover:text-sage/80" {...props} />,
};

export function MarkdownProse({ content, className = '' }: Props) {
    return (
        <div
            className={`
                prose prose-sm md:prose-base max-w-none
                prose-headings:font-serif-title
                prose-headings:text-main
                prose-p:text-main/85
                prose-strong:text-main
                prose-a:text-sage
                ${className}
            `}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
