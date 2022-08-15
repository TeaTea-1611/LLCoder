import { Button } from "../../Components/Tags";
import { Table, Td } from "../../Components/Tags";
import HeaderExercisesPage from "./HeaderExercisesPage";

const data = [
  {
    exercise: "Exercise 1",
    difficulty: "Easy",
    category: "Arithmetic",
    exp: 10,
  },
  {
    exercise: "Exercise 2",
    difficulty: "Medium",
    category: "Arithmetic",
    exp: 20,
  },
];

function Exercises() {
  return (
    <>
      <HeaderExercisesPage />
      <div>
        <div className="my-6">
          <Table
            thead={["Exercise", "Difficulty", "Category", "Exp", "Action"]}
          >
            <tbody>
              {data.map((item) => (
                <tr key={item.exercise}>
                  <Td>{item.exercise}</Td>
                  <Td>{item.difficulty}</Td>
                  <Td>{item.category}</Td>
                  <Td>{item.exp}</Td>
                  <Td className="space-x-1">
                    <Button>Đúng</Button>
                    <Button>Sai</Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Exercises;
