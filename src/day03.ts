type ConnectorFunction = (c: string) => boolean;

const isDigit: ConnectorFunction = (c) => c >= "0" && c <= "9";
const isSpace: ConnectorFunction = (c) => c === ".";
const isGear: ConnectorFunction = (c) => c === "*";
const isConnector: ConnectorFunction = (c) => !isDigit(c) && !isSpace(c);
const key = (x: number, y: number) => `${x},${y}`;

const createConnectorMap = (schematic: string, connectorFn: ConnectorFunction): Map<string, number> => {
  let connectors = 0;
  const connectorMap = new Map<string, number>();
  schematic.split("\n").forEach((line, y) => {
    line.split("").forEach((c, x) => {
      if (connectorFn(c)) {
        for (let i = y - 1; i <= y + 1; i++) {
          for (let j = x - 1; j <= x + 1; j++) {
            connectorMap.set(key(j, i), connectors);
          }
        }
        connectors++;
      }
    })
  });
  return connectorMap;
}

const findConnectedPartNumbers = function* (schematic: string, connectionMap: Map<string, number>) {
  const lines = schematic.split("\n");
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let start = 0; start < line.length; start++) {
      let end = start;
      while (isDigit(line.charAt(end) ?? ".")) {
        end++;
      }
      const connectedToIds = new Set<number>();
      for (let x = start; x < end; x++) {
        const id = connectionMap.get(key(x, y)) ?? null;
        if (id !== null) {
          connectedToIds.add(id);
        }
      }
      if (connectedToIds.size > 0) {
        const partNumber = Number.parseInt(line.substring(start, end));
        for (const connectorId of connectedToIds) {
          yield {
            partNumber,
            connectorId
          }
        }
        start = end - 1;
      }
    }
  }
}

export const addGearRatios = (schematic: string): number => {
  const gearMap = createConnectorMap(schematic, isGear);
  const gearParts: number[][] = Array(gearMap.size).fill(null).map(() => []);
  for (const { partNumber, connectorId: id } of findConnectedPartNumbers(schematic, gearMap)) {
    gearParts[id].push(partNumber);
  }
  return gearParts.reduce(
    (sum, parts) => sum + (parts.length > 1 ? parts.reduce((ratio, part) => ratio * part, 1) : 0),
    0
  );
}

export const addPartNumbers = (schematic: string): number => {
  let sum = 0;
  const connectorMap = createConnectorMap(schematic, isConnector);
  for (const { partNumber } of findConnectedPartNumbers(schematic, connectorMap)) {
    sum += partNumber;
  }
  return sum;
}

if (import.meta.main) {
  Bun.file(`${import.meta.dir}/day03.input`)
    .text()
    .then(text => text.trim())
    .then(text => {
      console.log("part one:", addPartNumbers(text));
      console.log("part two:", addGearRatios(text));
    })
}