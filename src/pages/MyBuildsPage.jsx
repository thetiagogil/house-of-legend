import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BuildDisplay from "../components/BuildDisplay";

const MyBuildsPage = () => {
  const [builds, setBuilds] = useState([]);

  /* FETCH BUILDS */
  const fetchAllBuilds = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/builds`);
    if (response.ok) {
      const allBuilds = await response.json();
      setBuilds(allBuilds);
      console.log(allBuilds);
    }
  };

  useEffect(() => {
    fetchAllBuilds();
  }, []);

  useEffect(() => {}, [builds]);

  /* UPDATE BUILD */
  const updateBuild = async (build, type, value) => {
    let newValue = value + 1;

    if (type === "win") {
      build.win = newValue;
    } else if (type === "loss") {
      build.loss = newValue;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/builds/${build.id}`,
        {
          method: "PUT",
          body: JSON.stringify(build),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        await fetchAllBuilds();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>My Builds</h1>

      <Link to="/builds/new">
        <button>New Build</button>
      </Link>

      <ul>
        {builds.map((build) => (
          <BuildDisplay
            key={build.id}
            build={build}
            fetchAllBuilds={fetchAllBuilds}
            updateBuild={updateBuild}
          />
        ))}
      </ul>
    </div>
  );
};

export default MyBuildsPage;
