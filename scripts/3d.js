function setupGame() {
  const width = 10
  const gridSize = width ** 2
  const grid = document.querySelector('.grid')

  const cells = []

  let player = 95

  let missile = 95
  let alien = 5
  let alien2 = 6

  // ********************************************** Grid
  for (let i = 0; i < width * width; i++) {
      const cell = document.createElement('div')
      if (i < width) cell.classList.add('ceiling')
      if (i > width ** 2 - width - 1) cell.classList.add('floor')
      cells.push(cell) //creates new array of divs
      grid.appendChild(cell)
  }
  // ********************************************* player
  player = cells[player].classList.add('player')

  function moveSpaceship() {
      // find the square with the class of spaceship
      const player = cells.find(cell => cell.classList.contains('player'))
          // remove the class of spaceship from that square
      player.classList.remove('player')
          // add the class of player to square the player should move to
      cells[player].classList.add('player')
  }
  // ALIENS ====================================================================
  function createAlien() { // create alien array
      alienArray.forEach(alien => {
          // console.log('alien array foreach', squares[alien])
          cells[alien].classList.add('alien')
      })
  }

  // MOVE ALIENS ===============================================================
  function moveAliens() {
      alienArray.forEach(alien => {
          cells[alien].classList.remove('alien') // loop through aliens & remove all aliens
      })
      alienArray = alienArray.map(alien => alien + alienMovement[currentAlienMove]) //find new alien positions
      alienArray.forEach(alien => {
          cells[alien].classList.add('alien') //add class of alien to all aliens
      })
      currentAlienMove++ // increment currentMove
      if (currentAlienMove === alienMovement.length) currentAlienMove = 0
      if (alienArray.some(alien => alien >= 210)) {
          gameOver('Game Over <i class="far fa-thumbs-down"></i>')
      }
      // let bottomAliens = alienArray.slice(20)
  }
  // ALIEN BOMB ================================================================
  function alienBomb() {
      let bombIndex = alienArray[Math.floor(Math.random() * alienArray.length)]
      alienBombAudio()

      const alienBombMovementId = setInterval(() => {
          bombIndex = drawBullet(bombIndex, width, 'bomb')
          if (collision(bombIndex, 'spaceship', 'bomb', alienBombMovementId)) {
              loseLife()
          }
          collision(bombIndex, 'floor', 'bomb', alienBombMovementId)
          console.log('hello')
          if (!gameInPlay) clearInterval(alienBombMovementId)
      }, 400)
  }

  function drawBullet(index, next, missile) {
      if (cells[index + next]) {
          cells[index].classList.remove(missile)
          index += next
          cells[index].classList.add(missile)
      } else {
          cells[index].classList.remove(missile)
      }
      return index
  }

  // COLLISION =================================================================
  function collision(index, target, shot, interval) {
      if (squares[index].classList.contains(target)) {
          console.log(`At ${index}, ${target} hit by ${shot}`)
          squares[index].classList.remove(shot)
          squares[index].classList.add('explosion')
          setTimeout(() => {
              squares[index].classList.remove('explosion')
          }, 300)
          clearInterval(interval)
          return true
      } else return false
  }

  function alienDeath(index) {
      squares[index].classList.remove('activeAlien')
      const alienIndex = alienArray.indexOf(index)
      alienArray.splice(alienIndex, 1)
  }

  function updateScore() {
      scoreTally++
      scoreId.innerText = scoreTally
  }

  // FIRE BULLET ===============================================================
  function fire() {
      let bulletIndex = spaceshipIndex
      const bulletIntervalId = setInterval(() => {
          bulletIndex = drawBullet(bulletIndex, -width, 'bullet')
          if (collision(bulletIndex, 'activeAlien', 'bullet', bulletIntervalId)) {
              alienDeath(bulletIndex)
              updateScore()
              if (alienArray.length === 0) {
                  gameOver('<i class="far fa-hand-spock"></i> You win! <i class="far fa-hand-spock"></i>')
              }
          }
          collision(bulletIndex, 'ceiling', 'bullet', bulletIntervalId)
      }, 100)
  }

  // USER BULLET ===============================================================
  document.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) {
          bulletAudio()
          fire()
      }
  })

  // USER SPACESHIP ============================================================
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




  // for (let i = 0; i < gridSize; i++) {
  //     const cell = document.createElement('div')
  //     grid.appendChild(cell)
  //         // cell.addEventListener('click', () => {
  //         //     cell.classList.toggle('alien')
  //         // })
  //     cells.push(cell)
  // }




  // cells[alien].classList.add('alien')
  // cells[alien2].classList.add('alien2')
  // cells[player].classList.add('player')
  // cells[missile].classList.add('missile')

  // document.addEventListener('keyup', (e) => {
  //     switch (e.key) {


  //         case "ArrowLeft":
  //             {
  //                 if ((player < 91)) {
  //                     return
  //                 }
  //                 cells[player].classList.remove('player')
  //                 player = player - 1
  //                 cells[player].classList.add('player')
  //                 break
  //             }
  //         case "ArrowRight":
  //             {
  //                 if (player === ((gridSize) - 1)) {
  //                     return
  //                 }
  //                 cells[player].classList.remove('player')
  //                 player = player + 1
  //                 cells[player].classList.add('player')
  //                 break
  //             }
  //         case "f":
  //             {

  //                 cells[missile].classList.remove('missile')
  //                 missile = player - 10
  //                 cells[missile].classList.add('missile')

  //                 break
  //             }


  //     }



  // })

  // function missileMooves() {


  //     cells[missile].classList.remove('missile')
  //     missile -= 10
  //     cells[missile].classList.add('missile')








  // }

  // // cells[missile].classList.remove('missile')
  // // missile = player - 10
  // // cells[missile].classList.add('missile')
  // // break



  // function gameLoop() {
  //     setTimeout(gameLoop, 1000)
  //     missileMooves()




  // }
  // gameLoop()
}

document.addEventListener('DOMContentLoaded', setupGame)