function setupGame() {
  const width = 10
  const gridSize = width ** 2
  const grid = document.querySelector('.grid')
  const cells = []

  let player = 95
  let missile = 95
  let alien = 5
  let alien2 = 6





  for (let i = 0; i < gridSize; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cell.addEventListener('click', () => {
          cell.classList.toggle('alien')
      })
      cells.push(cell)
  }




  cells[alien].classList.add('alien')
  cells[alien2].classList.add('alien2')
  cells[player].classList.add('player')
  cells[missile].classList.add('missile')

  document.addEventListener('keyup', (e) => {
      switch (e.key) {


          case "ArrowLeft":
              {
                  if ((player < 91)) {
                      return
                  }
                  cells[player].classList.remove('player')
                  player = player - 1
                  cells[player].classList.add('player')
                  break
              }
          case "ArrowRight":
              {
                  if (player === ((gridSize) - 1)) {
                      return
                  }
                  cells[player].classList.remove('player')
                  player = player + 1
                  cells[player].classList.add('player')
                  break
              }
          case "f":
              {

                  cells[missile].classList.remove('missile')
                  missile = player - 10
                  cells[missile].classList.add('missile')

                  break
              }


      }



  })

  function missileMooves() {


      cells[missile].classList.remove('missile')
      missile -= 10
      cells[missile].classList.add('missile')








  }

  // cells[missile].classList.remove('missile')
  // missile = player - 10
  // cells[missile].classList.add('missile')
  // break



  function gameLoop() {
      setTimeout(gameLoop, 1000)
      missileMooves()




  }
  gameLoop()
}

document.addEventListener('DOMContentLoaded', setupGame)