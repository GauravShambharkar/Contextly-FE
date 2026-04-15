import MainField from "./Components/mainField/MainField";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-200 ">
        <ErrorBoundary>
          <MainField />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
