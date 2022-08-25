import { LoadingSpinner } from "../components/Loading";
import { useCheckAuth } from "../utils/useCheckAuth";

function PrivatePage({ children }: { children: React.ReactNode }) {
  const { loading } = useCheckAuth();

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner large />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default PrivatePage;
