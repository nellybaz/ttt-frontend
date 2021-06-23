import axios from "axios";
const URL = "https://ttt-api-v111.herokuapp.com/move";

export class GameEngine{
  static async move(opponent, symbol, board){
    const type =
      opponent == "s"
        ? "smart_computer"
        : opponent == "c"
        ? "computer"
        : "human";

    const body = {
      state: board,
      type,
      symbol: symbol,
    };

    try {
      const res = await axios.post(URL, body);
      return res.data;
    }
    catch(err){
      throw Error("Error getting move from game engine")
    }
  }
}