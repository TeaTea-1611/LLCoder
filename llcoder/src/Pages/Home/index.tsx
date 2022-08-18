import ChatAll from "./ChatAll";
import TopMembers from "./TopMembers";

function Home() {
  return (
    <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
      <ChatAll />
      <TopMembers />
    </div>
  );
}

export default Home;
