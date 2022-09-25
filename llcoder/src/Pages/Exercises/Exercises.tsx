import { Button } from "../../components/UI";
import { Table, Td } from "../../components/UI";
import { usePagtinatedExercisesQuery } from "../../generated/graphql";
import HeaderExercisesPage from "./Header";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import config from "../../config";

function Exercises() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 10;
  const navigate = useNavigate();

  const { data } = usePagtinatedExercisesQuery({
    variables: {
      page: currentPage,
      limit: currentLimit,
    },
  });

  return (
    <>
      <HeaderExercisesPage />
      <div className="my-6">
        <Table
          thead={["Tên bài", "Độ khó", "Thể loại", "Dạng bài", "xp", "Tác vụ"]}
        >
          <tbody>
            {data?.pagtinatedExercises.exercises?.map((item) => (
              <tr key={item.id}>
                <Td>
                  <Link to={item.id}>{item.title}</Link>
                </Td>
                <Td>{item.difficulty?.name_vi}</Td>
                <Td>{item.category?.name}</Td>
                <Td>
                  {item.form?.reduce(
                    (previousValue, currentValue, i) =>
                      i === 0
                        ? previousValue + currentValue.name_vi
                        : previousValue + ", " + currentValue.name_vi,
                    ""
                  )}
                </Td>
                <Td>{item?.xp}</Td>
                <Td className="space-x-1">
                  <Button>Đúng</Button>
                  <Button>Sai</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="my-4 flex justify-end">
          <Pagination
            page={currentPage}
            totalPages={Math.ceil(
              (data?.pagtinatedExercises.totalCount || 0) / currentLimit
            )}
            onChangePage={(p) => {
              navigate(config.routes.exercises + "?page=" + p);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Exercises;
