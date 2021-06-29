import "./App.css";
import StageDisplay from "./components/StageDisplay";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import Validation from "./validations";
import { ComputerMove } from "./actions/ComputerMoves";
import { GameRules } from "./actions/GameRules";
import { GameEngine } from "./services/GameEngine";

function App() {
  const INITIAL_STATE = {
    boardSize: 0,
    opponent: "",
    playFirst: undefined,
    board: [...Array(9).keys()],
    currrentSymbol: "X",
    notificationText: "",
    computerNextMove: -1,
  };

  const [lockBoard, setLockBoard] = useState(false);
  const [lockButton, setLockButton] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    showButton: false,
    value: "",
  });
  const [showNotification, setShowNotification] = useState(false);
  const [stage, setStage] = useState(0);
  const [state, setState] = useState(INITIAL_STATE);

  const STAGEVALUE = {
    0: state.boardSize,
    1: state.opponent,
    2: state.playFirst,
  };

  const defaultBoard = () => {
    return [...Array(9).keys()];
  };

  const returntToGameStart = () => {
    setTimeout(() => {
      setStage(0);
      setState(INITIAL_STATE);
      setShowNotification();
      setLockBoard(false);
    }, 2000);
  };
  const isFirstMove = () => {
    let output = true;
    state.board.forEach((value, index) => {
      if (["O", "X"].includes(value)) output = false;
    });
    return output;
  };

  const computerShouldGoFirst = () => {
    return (
      stage === 3 && !state.playFirst && state.opponent !== "h" && isFirstMove()
    );
  };
  useEffect(() => {
    processGameNotification();

    if (computerShouldGoFirst()) {
      setLockBoard(true);
      setModal({
        show: true,
        showButton: false,
        value: "Computer is thinking...",
      });
      const newSymbol = state.currrentSymbol === "X" ? "O" : "X";
      GameEngine.move(state.opponent, newSymbol, state.board)
        .then((move) => {
          setState({
            ...state,
            currrentSymbol: "O",
            computerNextMove: move.move,
          });
        })
        .catch((err) => {
          console.log(err);
          setModal({
            show: true,
            showButton: false,
            value: "Error getting computer move 😔",
          });
          returntToGameStart();
        });
    }

    if (ComputerMove.isTurn(state.opponent, state.currrentSymbol)) {
      setModal({
        show: true,
        showButton: false,
        value: "Computer is thinking...",
      });

      updateBoard(state.computerNextMove, true);
      setModal({
        show: false,
        showButton: false,
        value: "",
      });
      setTimeout(() => {
        setLockBoard(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setLockBoard(false);
      }, 2000);
    }
  }, [stage, state.currrentSymbol]);

  const updateBoard = async (givenIndex, computerCalled = false) => {
    if (computerShouldGoFirst() && !computerCalled) return;
    setLockBoard(true);

    const currentSymbol = state.currrentSymbol;
    const newSymbol = state.currrentSymbol === "X" ? "O" : "X";
    const newBoard = state.board.map((item, index) =>
      index === givenIndex ? currentSymbol : item
    );

    setModal({
      show: true,
      showButton: false,
      value: "Validating move ...",
    });

    const move = await GameEngine.move(state.opponent, newSymbol, newBoard);

    const terminal = await GameRules.isTerminalState(move);

    if (terminal.state) {
      const terminalText = getGameTerminalText(terminal.game_state);
      setModal({ show: true, showButton: true, value: terminalText });
      setLockButton(true);
      setState({
        ...state,
        board: newBoard,
      });
      returntToGameStart();
      return;
    }

    setState({
      ...state,
      board: newBoard,
      currrentSymbol: newSymbol,
      computerNextMove: move.move,
    });
    setModal({ show: false, showButton: false, value: "" });
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
    if (lockButton) return;
    if (Validation.shouldShowError(stage, getStageValue(stage))) {
      setState({ ...state, notificationText: "Invalid response" });
      setShowNotification(true);
    } else processNextStage();
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
      return {
        ...state,
        playFirst: userInput === "y",
        // currentSymbol: userInput === "y" ? 'X' : 'O'
      };
    },
  };

  const getGameTerminalText = (terminalState) => {
    if (terminalState == "draw") return "Game is a draw";
    const isSecondPlayer = state.currrentSymbol == "O";
    const isComputerPlayer = state.opponent != "h";
    return isComputerPlayer && isSecondPlayer
      ? "Computer wins 💻"
      : isSecondPlayer
      ? "Player 2 wins"
      : "Player 1 wins";
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
          lockBoard={lockBoard}
        />
        {showNotification && (
          <small data-testid="input-error">{state.notificationText}</small>
        )}
      </header>

      {modal.show && (
        <Modal
          value={modal.value}
          showButton={modal.showButton}
          onClick={() => {
            setModal({ ...modal, show: false });
            setState({ ...state, notificationText: "" });
            setLockButton(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
