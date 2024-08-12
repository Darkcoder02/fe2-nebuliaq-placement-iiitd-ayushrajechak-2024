import services from './data/services';
import NodeGraph from './components/NodeGraph';
function App() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-semibold text-gray-500 text-center">Node Graph</h1>
      <div>
        <NodeGraph data={services}/>
      </div>
    </div>
  );
}

export default App;
