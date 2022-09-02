import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegClone } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";

interface MarkdownViewProps {
  value?: string;
  className?: string;
}

function MarkdownView({ value = "", className }: MarkdownViewProps) {
  return (
    <ReactMarkdown
      children={value}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <div className="relative group">
              <CopyToClipboard text={children}>
                <div className="absolute hidden group-hover:block top-2 right-2 p-2 rounded cursor-pointer hover:text-primary bg-slate-300/10 hover:bg-slate-300/20">
                  <FaRegClone />
                </div>
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
            <img
              className={className}
              src={node.url}
              alt={node.alt}
              {...props}
            />
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
          return (
            <blockquote className="border-l-2 border-sky-500 pl-2" {...props} />
          );
        },
        u({ node, ...props }: any) {
          return <u style={{ textDecoration: "underline" }} {...props} />;
        },
        table({ node, ...props }: any) {
          return (
            <table
              className="table-markdown bg-slate-50 dark:bg-slate-900"
              {...props}
            />
          );
        },
      }}
      className={
        className
          ? `${className} overflow-auto w-full h-full p-2`
          : "overflow-auto w-full h-full p-2"
      }
    />
  );
}

export default MarkdownView;
