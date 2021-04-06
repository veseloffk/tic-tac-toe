import { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

import "./Game.css";

import CrossIcon from "./Cross";
import ZeroIcon from "./Zero";
import {
  selectPlayingFields,
  selectPayLine,
  selectIsFirstMove,
  makeMove,
  FieldsValues,
} from "../store/game";
// import Canvas from "./components/Canvas";

const renderField = (field: FieldsValues | null) => {
  if (field === FieldsValues.Cross) {
    return <CrossIcon />;
  } else if (field === FieldsValues.Zero) {
    return <ZeroIcon />;
  } else {
    return null;
  }
};

const renderPayLine = () => {
  return <div />;
};

const Game: FunctionComponent = () => {
  const playingFields = useSelector(selectPlayingFields);
  const payLine = useSelector(selectPayLine);
  const isFirstMove = useSelector(selectIsFirstMove);
  const dispatch = useDispatch();
  const gameOver = Boolean(payLine.length);

  useEffect(() => {
    if (gameOver) {
      document.body.style.overflow = "hidden";
    }
  }, [gameOver]);

  const onTableClick = (e: React.MouseEvent<HTMLTableElement>) => {
    const target = e.target as HTMLElement;
    const td = target.closest("td");

    if (!td) {
      return;
    }

    const tr = td.closest("tr");

    if (!tr) {
      return;
    }

    const cellIndex = td.cellIndex;
    const rowIndex = tr.rowIndex;
    const currentValue = playingFields[rowIndex][cellIndex];

    if (isFirstMove && cellIndex !== 0 && rowIndex !== 0) {
      return;
    }

    if (currentValue !== null || gameOver) {
      // field already have value or game over
      return;
    }

    dispatch(makeMove({ cellIndex, rowIndex }));
  };

  return (
    <div className="game-wrapper">
      {/* <Canvas classname="myCanvas" /> */}
      {gameOver ? <div className="game-over">Game over</div> : null}
      <table className="game-map" onClick={onTableClick}>
        <tbody>
          {playingFields.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((field, cellIndex) => (
                <td
                  className={classnames("field", {
                    "field--disabled":
                      isFirstMove && (rowIndex !== 0 || cellIndex !== 0),
                  })}
                  key={`${rowIndex}_${cellIndex}`}
                >
                  {renderField(field)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Game;
