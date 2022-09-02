import moment from "moment";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { Comments } from "../../components/Comments";
import Image from "../../components/Image";
import { MarkdownView } from "../../components/Markdown";
import config from "../../config";
import { useBlogCommentsQuery, useBlogQuery } from "../../generated/graphql";

const limit = 20;

function Blog() {
  const { id = "0" } = useParams();

  const { data } = useBlogQuery({
    variables: {
      id: parseInt(id as string),
    },
  });

  const {
    data: _dataComment,
    fetchMore,
    networkStatus,
  } = useBlogCommentsQuery({
    variables: { blogId: parseInt(id as string), limit },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <>
      <header className="space-y-6 mb-6">
        <h1>{data?.blog?.title}</h1>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Link to={config.routes.members + "/" + data?.blog?.user.id}>
              <Image
                className="w-12 h-12 rounded-full"
                src={data?.blog?.user.avatar}
              />
            </Link>
            <div className="flex flex-col py-1">
              <Link to={config.routes.members + "/" + data?.blog?.user.id}>
                <p className="font-medium">{data?.blog?.user.nickname}</p>
              </Link>
              <p>{moment(data?.blog?.createdAt).format("YYYY-MM-DD")}</p>
            </div>
          </div>
          <div>
            <FiMoreHorizontal />
          </div>
        </div>
        <div>
          {data?.blog?.tags?.map((item) => (
            <div className="" key={item.name}></div>
          ))}
        </div>
      </header>
      <div className="leading-8 text-lg space-y-6">
        <MarkdownView value={data?.blog?.text} />
      </div>
      <footer className="my-8">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1 ">
            <span className="text-2xl cursor-pointer">
              <AiOutlineHeart />
            </span>
            <span>{data?.blog?.likesCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-2xl cursor-pointer">
              <FaRegCommentDots size={24} />
            </span>
            <span>{data?.blog?.commentsCount}</span>
          </div>
        </div>
        <div>
          <Comments comments={_dataComment?.blogComments.comments || []} />
        </div>
      </footer>
    </>
  );
}

export default Blog;
