import { GameEngine } from "../services/GameEngine";

export class GameRules{
  static async isTerminalState(board, symbol, opponent){
    try {
      const { game_state } = await GameEngine.move(opponent, symbol, board);
      return {
        game_state,
        state: ["win", "draw"].includes(game_state),
      };
    } catch (error) {
      console.log(error);
    }

    return {
      state: null,
      game_state: null,
    };
  };
}