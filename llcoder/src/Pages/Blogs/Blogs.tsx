import { NetworkStatus } from "@apollo/client";
import { Button } from "../../components/UI";
import { useBlogsQuery } from "../../generated/graphql";

const limit = 5;

function Blogs() {
  const { data, fetchMore, networkStatus } = useBlogsQuery({
    variables: { limit },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const loadMoreBlogs = () =>
    fetchMore({
      variables: {
        cursor: data?.blogs.cursor,
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
        {data?.blogs.blogs?.map((blog) => (
          <div
            key={blog.id + blog.title}
            className="p-2 rounded dark:bg-slate-800"
          >
            <div>
              <h3>{blog.title}</h3>
            </div>
            <div>
              <p>{blog.markdown}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <button className="hover:underline">Xem</button>
              </div>
              <div>
                <span>{blog.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {data?.blogs.hashMore && (
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
