import { useState } from "react";

function Tree({ loadData }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleClick = () => {
    if (!isDataLoaded && typeof loadData === "function") {
      loadData().then(() => setIsDataLoaded(true));
    }

    setIsCollapsed((prevValue) => !prevValue);
  };

  return (
    <div>
      <div>Debug</div>
      <div>isDataLoaded: {JSON.stringify(isDataLoaded)}</div>
      <div>
        <button onClick={handleClick}>{isCollapsed ? "+" : "-"}</button>
      </div>
      <div>2</div>
      <div>3</div>
    </div>
  );
}

export default Tree;
