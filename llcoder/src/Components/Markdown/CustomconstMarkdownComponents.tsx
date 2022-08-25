import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegClone } from "react-icons/fa";

export const MarkdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");

    return !inline && match ? (
      <div className="relative">
        <CopyToClipboard text={children}>
          <span className="absolute top-2 right-2 p-2 rounded cursor-pointer hover:text-primary hover:bg-slate-300/10">
            <FaRegClone />
          </span>
        </CopyToClipboard>
        <SyntaxHighlighter
          customStyle={{ minHeight: 48 }}
          children={String(children).replace(/\n$/, "")}
          style={dracula}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      </div>
    ) : (
      <code
        className="p-1 rounded bg-slate-700 text-slate-400 font-medium"
        {...props}
      >
        {children}
      </code>
    );
  },
  img({ node, className, ...props }: any) {
    return (
      <img className={className} src={node.url} alt={node.alt} {...props} />
    );
  },
  a({ node, children, ...props }: any) {
    return (
      <a
        className="underline text-primary"
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
  hr({ node, ...props }: any) {
    return <hr className="" {...props} />;
  },
  blockquote({ node, ...props }: any) {
    return <blockquote className="border-l-2 border-sky-500 pl-2" {...props} />;
  },
  u({ node, ...props }: any) {
    return <u style={{ textDecoration: "underline" }} {...props} />;
  },
  table({ node, ...props }: any) {
    return (
      <table
        className="table-auto min-w-full leading-normal overflow-hidden shadow my-2"
        {...props}
      />
    );
  },
  th({ node, ...props }: any) {
    return (
      <th
        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider dark:bg-dark-color-2 dark:border-gray-700"
        {...props}
      />
    );
  },
  td({ node, ...props }: any) {
    return (
      <td
        className="px-5 py-2 border-b border-gray-200 bg-white dark:bg-dark-color-3 dark:border-gray-700 text-sm"
        {...props}
      />
    );
  },
};
