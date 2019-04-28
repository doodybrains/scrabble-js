function Letters(tiles) {
  const allTiles = [];

  tiles.map((letter, i) => {
    let tile = {name: letter.name, points: letter.points};
    for (var l=0; l < letter.count; l++) {
      allTiles.push(tile);
    }
  })

  return allTiles
}

export {Letters};
