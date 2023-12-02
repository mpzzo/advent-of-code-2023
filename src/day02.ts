type CubeSet = { [color: string]: number };

interface Game {
  id: number,
  sets: CubeSet[]
}

const readGameFromLine = (line: string): Game => {
  try {
    const match = [...line.matchAll(/^Game (\d+): (.*)$/g)][0]
    const id = Number.parseInt(match[1], 10);
    const sets: CubeSet[] = match[2]
      .split("; ")
      .map(setString => setString
        .split(", ")
        .reduce((set, cubeString) => {
          const [ amount, color ] = cubeString.split(" ");
          set[color] = Number.parseInt(amount);
          return set;
        }, {} as CubeSet)
      );
    return { id, sets };
  } catch (e) {
    throw new Error(`Game cannot be read from line: "${line}"`, { cause: e })
  }
}

const isPossibleGame = (game: Game, bag: CubeSet): boolean => {
  return game.sets.every(set => 
    Object.entries(set)
      .every(([color, cubes]) => cubes <= (bag[color] ?? 0))
  )
}

const calculateGamePower = (game: Game): number => {
  const bag: CubeSet = game.sets.reduce((bag, set) => {
    Object.entries(set).forEach(([color, cubes]) => {
      if (cubes > (bag[color] ?? 0)) {
        bag[color] = cubes;
      }
    });
    return bag;
  }, {} as CubeSet);
  return Object.values(bag).reduce((power, cubes) => power === 0 ? cubes : power * cubes, 0)
}

export const addPowersOfGames = (input: string): number => {
  return input.split("\n")
    .map(line => {
      const game = readGameFromLine(line);
      const power = calculateGamePower(game);
      return power;
    })
    .reduce((sum, power) => sum + power, 0);
}

export const addIdsOfPossibleGames = (input: string): number => {
  const bag: CubeSet = {
    "red": 12,
    "green": 13,
    "blue": 14
  };
  return input.split("\n")
    .map(line => readGameFromLine(line))
    .filter(game => isPossibleGame(game, bag))
    .reduce((sum, game) => sum + game.id, 0);
}

if (import.meta.main) {
  Bun.file(`${import.meta.dir}/day02.input`)
    .text()
    .then(text => text.trim())
    .then(text => {
      console.log("part one:", addIdsOfPossibleGames(text));
      console.log("part two:", addPowersOfGames(text));
    })
}