import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { MarkdownEditor } from "../../components/Markdown";
import { Button, Input } from "../../components/UI";
import { useCreateBlogMutation } from "../../generated/graphql";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  const handleChangeMarkdownEditor = useCallback(
    (val: string) => {
      setMarkdown(val);
    },
    [setMarkdown]
  );

  const [craeteBlog, { loading }] = useCreateBlogMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await craeteBlog({
      variables: {
        data: {
          title,
          text: markdown,
        },
      },
    });

    if (response.data?.createBlog.success) {
      toast(response.data.createBlog.message);
      setTitle("");
      setMarkdown("");
    } else if (response.data?.createBlog) {
    }
  };

  return (
    <>
      <header>
        <h1>Create Blog</h1>
      </header>
      <div className="mt-12">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Title"
            value={title}
            onChange={(val) => setTitle(val)}
          />
          <MarkdownEditor
            value={markdown}
            onChange={handleChangeMarkdownEditor}
            placeholder="Aa"
          />
          <div className="flex">
            <Button type="submit" className="ml-auto" isLoading={loading}>
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlog;
