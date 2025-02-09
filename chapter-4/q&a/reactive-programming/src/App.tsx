import "./App.css";
import CollaborativeSpreadsheet from "@/CollaborativeSpreadsheet.tsx";
import MemoryLeakComponent from "@/MemoryLeakComponent.tsx";
import {useState} from "react";

function App() {
    const [showMemoryLeak, setShowMemoryLeak] = useState(false)
    return (
        <>
            <div className="m-5">
                <CollaborativeSpreadsheet />
            </div>

            <button onClick={() => setShowMemoryLeak((prev) => !prev)} className="p-2 bg-blue-500 rounded">
                {showMemoryLeak ? "Unmount MemoryLeakComponent" : "Mount MemoryLeakComponent"}
            </button>

            {showMemoryLeak && <MemoryLeakComponent/>}
        </>
    );
}

export default App;
