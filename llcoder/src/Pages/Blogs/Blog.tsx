import moment from "moment";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { Comments } from "../../components/Comments";
import Image from "../../components/Image";
import { MarkdownView } from "../../components/Markdown";
import { Button } from "../../components/UI";
import config from "../../config";

import { useEffect, useState } from "react";

const limit = 5;

function Blog() {
  const { id = "0" } = useParams();

  const [hashMoreComments, setHashMoreComments] = useState(false);
  const [cursorComments, setCursorComments] = useState();

  return <></>;
}

export default Blog;
