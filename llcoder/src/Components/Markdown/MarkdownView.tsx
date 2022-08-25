import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { MarkdownComponents } from "./CustomconstMarkdownComponents";

interface MarkdownViewProps {
  value: string;
  className?: string;
}

function MarkdownView({ value, className }: MarkdownViewProps) {
  return (
    <ReactMarkdown
      children={value}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={MarkdownComponents}
      className={className ? className : "overflow-auto w-full h-full p-2"}
    />
  );
}

export default MarkdownView;
