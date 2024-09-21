import './index.css'
import {Component} from 'react'

import CardItems from '../CardItems'
import ItemsCard from '../ItemsCard'

class GameApp extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = this.props
    this.state = {
      score: 0,
      timer: 60,
      selectedTabId: tabsList[0].tabId,
      mainImage: imagesList[0],
      isGameOver: false,
    }
  }

  componentDidMount() {
    this.uniqId = setInterval(this.timer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.uniqId)
  }

  timer = () => {
    const {timer} = this.state
    this.setState(previousState => ({timer: previousState.timer - 1}))
    if (timer === 1) {
      clearInterval(this.uniqId)
      this.setState({isGameOver: true})
    }
  }

  getRandomImage = () => {
    const {imagesList} = this.props
    return imagesList.sort(() => Math.random() - 0.5)
  }

  onClickButton = tabId => {
    this.setState({selectedTabId: tabId})
  }

  onClickThumbnail = id => {
    const {mainImage, score} = this.state
    if (id === mainImage.id) {
      const mainImageData = this.getRandomImage()[1]
      this.setState({score: score + 1, mainImage: mainImageData})
    } else {
      this.setState({isGameOver: true})
      clearInterval(this.uniqId)
    }
  }

  onClickPlayAgain = () => {
    this.setState({
      score: 0,
      timer: 60,
      isGameOver: false,
    })
    this.componentDidMount()
  }

  render() {
    const {score, timer, selectedTabId, mainImage, isGameOver} = this.state
    const {imagesList, tabsList} = this.props

    const filteredImagesList = imagesList.filter(
      each => each.category === selectedTabId,
    )

    return (
      <div className='mainContainer'>
        <nav className='navBar'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png'
            alt='website logo'
            className='websiteLogo'
          />
          <ul className='scoreTimerContainer'>
            <li className='list'>
              <p className='score'>Score:</p>
              <p className='scoreNumber'>{score}</p>
            </li>
            <li className='list'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png'
                alt='timer'
                className='timerImage'
              />
            </li>
            <li className='list'>
              <p className='timer'>{timer} sec</p>
            </li>
          </ul>
        </nav>
        <div className='subContainer'>
          <div className='cardContainer'>
            {isGameOver ? (
              <div className='gameOverContainer'>
                <div className='gameOvercardContainer'>
                  <img
                    src='https://assets.ccbp.in/frontend/react-js/match-game-trophy.png'
                    alt='trophy'
                    className='trophyImage'
                  />
                  <p className='yourScoreTitle'>Your Score</p>
                  <h1 className='score'>{score}</h1>
                  <div className='btnContainer'>
                    <button
                      type='button'
                      className='playAgainButton'
                      onClick={this.onClickPlayAgain}
                    >
                      <img
                        src='https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png'
                        alt='reset'
                        className='resetImage'
                      />
                      PLAY AGAIN
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='gameRunningContainer'>
                <img
                  src={mainImage.imageUrl}
                  alt='match'
                  className='mainImage'
                />
                <div className='buttonsMainContainer'>
                  <ul className='buttonsListContainer'>
                    {tabsList.map(each => (
                      <ItemsCard
                        each={each}
                        key={each.tabId}
                        selectedTabId={selectedTabId}
                        onClickButton={this.onClickButton}
                      />
                    ))}
                  </ul>
                </div>
                <div className='thumbnailsContainer'>
                  <ul className='thumbnailsListContainer'>
                    {filteredImagesList.map(each => (
                      <CardItems
                        each={each}
                        key={each.id}
                        onClickThumbnail={this.onClickThumbnail}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default GameApp
