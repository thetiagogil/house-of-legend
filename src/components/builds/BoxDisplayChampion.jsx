import { useState } from "react";
import BuildDisplay from "./BoxDisplayBuild";

const BoxDisplayChampion = ({
  championName,
  array,
  fetchAllBuilds,
  updateBuild,
}) => {
  const [showCheckbox, setShowCheckbox] = useState(false);
  return (
    <div className="mybuilds-champion-box">
      <div className="mybuilds-champion-main-div">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${championName}_0.jpg`}
          alt={"Item IMG"}
        />

        <h2>{championName}</h2>

        <button
          type="button"
          onClick={() => setShowCheckbox(!showCheckbox)}
          className="mybuilds-champion-button"
        >
          {showCheckbox ? "-" : "+"}
        </button>
      </div>

      <div>
        {!showCheckbox &&
          array.map((build, index) => (
            <BuildDisplay
              key={`${championName}${build.id}${index}`}
              build={build}
              fetchAllBuilds={fetchAllBuilds}
              updateBuild={updateBuild}
            />
          ))}
      </div>
    </div>
  );
};

export default BoxDisplayChampion;
