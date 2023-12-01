document.addEventListener('DOMContentLoaded', function () {
    const symbols = [1, 2, 3, 4];
    const cardsArray = [...symbols, ...symbols];

    function shuffle(elements) {
        return elements.sort(() => Math.random() - 0.5);
    }

    const shuffledCards = shuffle(cardsArray);

    function createGameBoard(cardsArray) {
        let firstNum = undefined;
        let secondNum = undefined;
        let firstElement = undefined;
        let secondElement = undefined;
        let attempts = 0;
        let maxAttempts = 10;
        let attemptsElement = document.getElementById('attempts-count')
        const gameBoard = document.getElementById('cards-board');
        cardsArray.forEach((element) => {
            const cardItem = document.createElement('div');
            cardItem.classList.add('card');

            cardItem.innerHTML = `
                <div class="card-container">
                    <div class="card-front"></div>
                    <div class="card-back">${element}</div>
                </div>
            `;
            gameBoard.appendChild(cardItem);

            cardItem.addEventListener('click', function () {
                flipCard(cardItem);
                if (attempts >= maxAttempts) {
                    window.alert("You have reached maximum number of attempts");
                    return
                }

                if (secondNum == undefined && firstNum !== undefined) {
                    secondNum = element
                    secondElement = cardItem
                    attempts++
                    attemptsElement.textContent = attempts;
                }
                if (firstNum == undefined) {
                    firstNum = element
                    firstElement = cardItem
                } 
                //akoo prvi i drugi broj nisu jednaki hocu da ih flipujem nazad
                //inace ako su jednaki necu da uradim nista za pocetak
                setTimeout(() => {
                    if (firstNum !== undefined && secondNum !== undefined && firstNum !== secondNum) {
                        flipCard(firstElement)
                        flipCard(secondElement)
                        firstNum = undefined;
                        secondNum = undefined;
                        firstElement = undefined;
                        secondElement = undefined;
                    } 
                }, 1000)
               
                if (firstNum !== undefined && secondNum !== undefined && firstNum === secondNum) {
                    firstNum = undefined;
                    secondNum = undefined;
                    firstElement = undefined;
                    secondElement = undefined;
                }

                console.log(firstNum, secondNum)
                console.log(firstElement, secondElement)
                
                
            });
        });
    }

    function flipCard(card) {
        const cardContainer = card.querySelector('.card-container');
        cardContainer.classList.toggle('flipCard');
    }

    createGameBoard(cardsArray);
});





