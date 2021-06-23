import "./App.css";
import StageDisplay from "./components/StageDisplay";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import Validation from "./validations";
import { ComputerMove } from "./actions/ComputerMoves";
import { GameRules } from "./actions/GameRules";

function App() {
  const [modalValue, setModalValue] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [stage, setStage] = useState(0);
  const [state, setState] = useState({
    boardSize: 0,
    opponent: "",
    playFirst: undefined,
    board: [...Array(9).keys()],
    currrentSymbol: "X",
    notificationText: "Invalid response",
  });

  const [showModal, setShowModal] = useState(false);

  const STAGEVALUE = {
    0: state.boardSize,
    1: state.opponent,
    2: state.playFirst,
  };

  const defaultBoard = () => {
    return [...Array(9).keys()];
  };

  useEffect(() => {
    processGameNotification();

    if (ComputerMove.isTurn(state.opponent, state.currrentSymbol))
      ComputerMove.make(
        state.opponent,
        state.board,
        state.currrentSymbol,
        updateBoard
      );
  }, [stage, state.currrentSymbol]);

  
  const updateBoard = async (givenIndex) => {
    const currentSymbol = state.currrentSymbol;
    const newSymbol = state.currrentSymbol === "X" ? "O" : "X";
    const newBoard = state.board.map((item, index) =>
      index === givenIndex ? currentSymbol : item
    );

    const terminal = await GameRules.isTerminalState(newBoard, currentSymbol, state.opponent);

    if (terminal.state) {
      const terminalText = `Game is a ${terminal.game_state.toUpperCase()}`;
      setModalValue(terminalText);
      setShowModal(true);
      setTimeout(() => {
        setStage(0);
      }, 5000);
      return;
    }

    setState({ ...state, board: newBoard, currrentSymbol: newSymbol });
  };

  const getStageValue = (stage) => {
    return STAGEVALUE[stage];
  };

  const processGameNotification = () => {
    if (stage === 3) {
      setShowNotification(true);
      setState({
        ...state,
        notificationText: `Player ${
          state.currrentSymbol === "X" ? "1" : "2"
        }'s turn`,
      });
    }
  };

  const processNextStage = () => {
    if (state.opponent === "h" && stage === 1) setStage(stage + 2);
    else setStage(stage + 1);
  };

  const buttonClickHandler = (_) => {
    if (Validation.shouldShowError(stage, getStageValue(stage)))
      setShowNotification(true);
    else processNextStage();
  };

  const inputHandlerDataHash = {
    0: (userInput) => {
      return { ...state, boardSize: parseInt(userInput) };
    },
    1: (userInput) => {
      return {
        ...state,
        opponent: userInput,
        board: [...Array(state.boardSize * state.boardSize).keys()],
      };
    },
    2: (userInput) => {
      return { ...state, playFirst: userInput === "y" };
    },
  };

  const inputHandler = (event) => {
    const userInput = event.target.value;
    setState(inputHandlerDataHash[stage](userInput));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ font: "35px" }}>Welcome to tic-tac-toe game</h1>
        <br />
        <StageDisplay
          stageNumber={stage}
          showNotification={showNotification}
          inputHandler={inputHandler}
          buttonClickHandler={buttonClickHandler}
          board={state.board}
          updateBoard={updateBoard}
        />
        {showNotification && (
          <small data-testid="input-error">{state.notificationText}</small>
        )}
      </header>

      {showModal && (
        <Modal
          value={modalValue}
          onClick={() => {
            setShowModal(false);
            // setState({ ...state, board: defaultBoard() });
          }}
        />
      )}
    </div>
  );
}

export default App;
