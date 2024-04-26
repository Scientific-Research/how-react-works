import { useState } from "react";

interface IContent {
  summary: string;
  details: string;
}

interface ITab {
  // num, activeTab, onClick
  num: number;
  activeTab: number;
  onClick: () => void;
}

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

export const Tabbed: React.FC<{ content: IContent[] }> = ({ content }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
};

const Tab: React.FC<{
  num: number;
  activeTab: number;
  onClick: (n: number) => void;
}> = ({ num, activeTab, onClick }) => {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
};

function TabContent({ item }: { item: IContent | undefined }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    // setLikes(likes + 1);
    // NOTE: without call back we will have the same result, and it works well, but when i repeat this function in below function for three times and then click on the +++ button to call this function, it will increase only 1 time, although i repeated it for three times. but when i add the call back to it, it will increase three time and when other three commands are there too and not commented out, it will increase it 6 times!
    setLikes((likes) => likes + 1);
  }
  // const clonedArray = JSON.parse(JSON.stringify(nodesArray));

  function handleTripleInc() {
    // NOTE: below commands work due to the call back function and when i click on the +++ button, it will increase by three and not by one!
    setLikes((like) => like + 1);
    setLikes((like) => like + 1);
    setLikes((like) => like + 1);
    // NOTE: below commands don't work! when i click on the +++ button, it only increase by one and not by three!
    // setLikes(() => likes + 1);
    // setLikes(() => likes + 1);
    // setLikes(() => likes + 1);

    // handleInc();
    // handleInc();
    // handleInc();
  }

  const handleUndo = () => {
    setShowDetails(true);
    setLikes(0);
  };

  // after clicking on the Undo in 2s button, it will call the handleUndo function 2000 ms later, it means the state would be reset 2 seconds later!
  const handleUndoLater = () => {
    // NOTE: this works well...
    // NOTE: not forget that: when we have call back => this two paranthesis => we have to call the function with paranthesis too => handleUndo();, otherwise, function without paranthesis will not work! or just remove all four paranthesis, curly braces, arrow and semicolon and write only the name of the function like what i wrote at below as second option and it will work too!
    setTimeout(() => {
      handleUndo();
    }, 2000);

    // NOTE: this works well too...
    // setTimeout(handleUndo, 2000);
  };

  return (
    <div className="tab-content">
      <h4>{item?.summary}</h4>
      {showDetails && <p>{item?.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
