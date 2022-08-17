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
          children={String(children).replace(/\n$/, "")}
          style={dracula}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      </div>
    ) : (
      <code className="" {...props}>
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
};
