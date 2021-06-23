import { GameEngine } from "../services/GameEngine";

export class ComputerMove {
  static async make(opponent, board, currentSymbol, callback){
    
      const res = await GameEngine.move(opponent, currentSymbol, board);
      const computer_move = res["move"];
      callback(computer_move);
    };

    static isTurn(opponent, currentSymbol){
      const computer_opponent = ["s", "c"].includes(opponent);
      const computer_move = currentSymbol == "O";
      return computer_opponent && computer_move;
    }
}