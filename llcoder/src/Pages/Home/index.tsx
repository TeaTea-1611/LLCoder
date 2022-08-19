import ChatAll from "./ChatAll";
import Members from "./Members";

function Home() {
  return (
    <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
      <ChatAll />
      <Members />
    </div>
  );
}

export default Home;
