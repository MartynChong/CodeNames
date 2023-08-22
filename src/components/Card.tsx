import { useState } from "react";

interface Props {
  children: string;
  onButtonClick: (item: string) => void;
}

function Card() {
  const [colorIndex, setColour] = useState(0);

  return (
    <div className="card">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
}

export default Card;
