import { useParams } from "react-router-dom";
import { useExerciseQuery } from "../../generated/graphql";

function Exercise() {
  const id = useParams()?.id;

  const { data } = useExerciseQuery({
    variables: { id: Number(id) },
    fetchPolicy: "no-cache",
  });

  return (
    <header className="grid grid-cols-2 gap-2 px-2">
      <div>
        <div>
          <span>Tên bài: </span>
          <span>{data?.exercise?.title}</span>
        </div>
        <div>
          <span>Thể loại: </span>
          <span>{data?.exercise?.category?.name}</span>
        </div>
        <div>
          <span>Thang điểm: </span>
          <span>{data?.exercise?.xp}</span>
        </div>
      </div>
      <div>
        <div>
          <span>Người tạo: </span>
          <span>{data?.exercise?.user.nickname}</span>
        </div>
        <div></div>
      </div>
    </header>
  );
}

export default Exercise;
