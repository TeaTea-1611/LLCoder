import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const members = [
  {
    nickname: "llcoder",
    level: 1,
    exercises_solved: 0,
    exp: 0,
  },
];

function Members() {
  return (
    <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-40rem))] w-[19.5rem] py-10 px-8 overflow-y-auto hidden xl:block">
      <div className="">
        <h3 className="font-medium">Coder tích cực</h3>
        <div className="mt-4 space-y-1">
          {members.map((member) => (
            <div
              className="p-2 rounded shadow dark:bg-slate-800"
              key={uuidv4()}
            >
              <div className="flex justify-between text-lg">
                <Link
                  to={`/members/${member.nickname}`}
                  className="hover:underline"
                >
                  {member.nickname}
                </Link>
                <span>{member.exercises_solved}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>{member.level} </span>
                <span>{member.exp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Members;
