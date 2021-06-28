
export class GameRules{
  static async isTerminalState(move){
    try {
      const { game_state } = move;
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