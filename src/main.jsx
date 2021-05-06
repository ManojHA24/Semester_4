import { useHistory } from "react-router-dom";

function Opening() {
  const history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <div>
      <p>Good moring!</p>
      <p>Log-in!</p>
      <button type="button" onClick={handleClick}>
        Login
      </button>
    </div>
  );
}

export default Opening;
