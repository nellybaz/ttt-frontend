import AppFixtures from "../../fixtures/App";
import { StageOne } from "../StageOne";
import { StageTwo } from "../StageTwo";
import { StageThree } from "../StageThree";
import Board from "../Board";

export default function StageDisplay(props){
  const stageDisplay = {
    0: (
      <StageOne
        showError={props.showNotification}
        inputHandler={props.inputHandler}
        buttonClickHandler={props.buttonClickHandler}
      />
    ),
    1: (
      <StageTwo
        options={AppFixtures.stageTwo()}
        inputHandler={props.inputHandler}
        buttonClickHandler={props.buttonClickHandler}
      />
    ),
    2: (
      <StageThree
        options={AppFixtures.stageThree()}
        inputHandler={props.inputHandler}
        buttonClickHandler={props.buttonClickHandler}
      />
    ),
    3: <Board board={props.board} clickHandler={props.updateBoard} lockBoard={props.lockBoard} />,
  };

  return (
    <div>
      {stageDisplay[props.stageNumber]}
    </div>
  )
}