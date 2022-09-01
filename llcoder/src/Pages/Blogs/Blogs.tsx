import { NetworkStatus } from "@apollo/client";
import { Button } from "../../components/UI";
import { usePagtinatedBlogsQuery } from "../../generated/graphql";
import moment from "moment";
import { Link } from "react-router-dom";

const limit = 5;

function Blogs() {
  const { data, fetchMore, networkStatus } = usePagtinatedBlogsQuery({
    variables: { limit },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const loadMoreBlogs = () =>
    fetchMore({
      variables: {
        cursor: data?.pagtinatedBlogs.cursor,
      },
    });

  return (
    <>
      <header className="">
        <h1>Bài viết nổi bật</h1>
        <div className="mt-2">
          <p>
            Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online
            và các kỹ thuật lập trình.
          </p>
        </div>
      </header>
      <div className="space-y-4 mt-6">
        {data?.pagtinatedBlogs.blogs?.map((blog) => (
          <div
            key={blog.id + blog.title}
            className="p-2 rounded dark:bg-slate-800"
          >
            <div>
              <Link
                to={blog.id}
                className="font-medium text-3xl hover:underline"
              >
                {blog.title}
              </Link>
            </div>
            <div className="flex justify-between">
              <div>
                <button className="hover:underline">Like</button>
              </div>
              <div>
                <span>{moment(blog.createdAt).format("YYYY-MM-DD")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {data?.pagtinatedBlogs.hashMore && (
        <div className="flex mt-4">
          <Button
            className="m-auto"
            onClick={loadMoreBlogs}
            isLoading={loadingMore}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
}

export default Blogs;
