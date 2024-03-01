# Slot Machine Game
![Alt Text](https://media.giphy.com/media/EahYBxGgJHLZ6/giphy.gif)

## Introduction

This is a simple command-line slot machine game implemented in JavaScript. The game allows the player to deposit money, select the number of lines to bet on, and place bets on each line. The slot machine reels are then spun, and the player can win based on the symbols aligned on the lines.

## How to Play

1. Clone the repository or download the source code files.
2. Make sure you have Node.js installed on your machine.
3. Open a terminal or command prompt and navigate to the project directory.
4. Run the following command to install the required dependencies:
   ```
   npm install prompt-sync
   ```
5. Run the game by executing the following command:
   ```
   node main.js
   ```
6. Follow the prompts to deposit money, choose the number of lines to bet on, and place bets.
7. The reels will spin, and the resulting symbols will be displayed.
8. If you win, your winnings will be added to your balance.
9. Continue playing until you run out of money or choose to quit.

## Gameplay Rules

- You start the game with a balance of zero.
- To begin, deposit a certain amount of money.
- Choose the number of lines you want to bet on (1-3).
- Place a bet on each line, ensuring that the bet does not exceed your available balance  divided by the number of lines.

- The reels will spin, and the resulting symbols will be displayed.
- If any of the lines have the same symbol aligned, you win a certain amount based on the bet and the symbol's value.
- Your winnings will be added to your balance.
- You can choose to play again or quit the game.
- The game ends if you run out of money or choose to quit.

## Customization

The game provides some customizable parameters that can be modified in the code:

- `ROWS`: The number of rows in the slot machine display (default: 3).
- `COLS`: The number of columns in the slot machine display (default: 3).
- `SYMBOLS_COUNT`: An object representing the count of symbols in the game. You can change the number of symbols and their counts as desired.
- `SYMBOLS_VALUES`: An object representing the values assigned to each symbol. Modify the values based on your preference.

Feel free to adjust these parameters to create a different gameplay experience.


## Acknowledgments

- This project was inspired by the classic slot machine games.
- The code implementation and prompt-sync dependency were provided as a starting point.
- This project was developed for educational purposes to demonstrate the implementation of a simple slot machine game.


## Future Enhancements

- **Graphics and Animation**: Enhance the game's visual experience by adding graphical elements, animations, and sound effects to simulate the real slot machine environment.

- **Multiple Themes**: Introduce different themes for the slot machine game, each with its own set of symbols and visual design. Themes could include fruits, animals, adventure, or any other creative concept.

- **Advanced Gameplay Features**: Implement additional gameplay features such as wild symbols, bonus rounds, free spins, or special combinations that trigger unique events.

- **Multiplayer Mode**: Add multiplayer functionality to the game, allowing multiple players to compete against each other or collaborate in a shared slot machine experience.

- **Persistent Data and Leaderboards**: Implement a system to store player data, including balances, winnings, and high scores. Create leaderboards to track the top-performing players.

- **Web or Mobile Application**: Transform the command-line application into a web or mobile application with a user-friendly interface and intuitive controls.

