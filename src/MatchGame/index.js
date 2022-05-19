import {Component} from 'react'

import TabItem from './TabsListItem'

import ThumbnailImg from './ThumbnailImg'

import './index.css'

class MatchGame extends Component {
  state = {
    time: 60,
    timeup: false,
    score: 0,
    tabItem: 'FRUIT',
    selectedImgList: [],
    randomId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    let ret = {}
    this.setState(prevState => {
      if (prevState.time <= 0) {
        console.log('timeup')
        ret = {time: prevState.time, timeup: true}
      } else {
        ret = {time: prevState.time - 1}
      }
      return ret
    })
  }

  whichTabFun = tabId => {
    this.setState({tabItem: tabId})
  }

  randomImageId = (ranId, id) => {
    const {imagesList} = this.props
    const {randomId} = this.state

    if (id === randomId) {
      console.log('yes')

      this.setState(prevState => ({
        score: prevState.score + 1,
        randomId: imagesList[ranId].id,
      }))
    } else {
      this.setState({
        randomId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
        timeup: true,
      })
    }
  }

  headerFun = () => {
    const {time, score} = this.state
    return (
      <nav className="header col-12 flex-row justify-content-space-between align-items-center">
        <ul className="d-flex flex-row justify-content-space-between col-12">
          <li className="col-6 align-self-center">
            <img
              className="website-logo m-1"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            />
          </li>

          <li className="col-6 score-container color-w d-flex flex-row justify-content-end p-1 align-items-center">
            <p className="time">
              score:<span>{score}</span>
            </p>

            <img
              className="timerImg"
              alt="timer"
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            />
            <p className="time">{time} sec</p>
          </li>
        </ul>
      </nav>
    )
  }

  GameContainer = () => {
    const {imagesList, tabsList} = this.props
    const {tabItem, randomId} = this.state
    const filteredSelectedItem = imagesList.filter(
      eachItem => eachItem.id === randomId,
    )
    // console.log(randomId, filteredSelectedItem, filteredSelectedItem.imageUrl)
    const filteredImagesList = imagesList.filter(
      eachItem => eachItem.category === tabItem,
    )
    // console.log(imagesList.length)
    return (
      <div className="Game-container col-12 bg-y d-flex flex-column ">
        <div className="d-flex flex-row justify-content-center col-12">
          <img
            alt="match"
            className="selected-Image-big mt-1"
            src={filteredSelectedItem[0].imageUrl}
          />
        </div>
        <ul className="tabsList d-flex flex-row col-12 justify-content-center">
          {tabsList.map(eachItem => (
            <TabItem
              hilight={eachItem.tabId === tabItem}
              key={eachItem.tabId}
              whichTabFun={this.whichTabFun}
              tabsListItem={eachItem}
            />
          ))}
        </ul>
        <ul className="col-12 d-flex flex-row flex-wrap-wrap justify-content-center">
          {filteredImagesList.map(eachItem => (
            <ThumbnailImg
              key={eachItem.id}
              randomImageId={this.randomImageId}
              imageItem={eachItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  playAgainFun = () => {
    this.setState({timeup: false, score: 0, time: 60})
  }

  GameOver = () => {
    const {score} = this.state
    return (
      <div className="game-over col-8 d-flex flex-column align-items-center justify-content-center">
        <img
          alt="trophy"
          className="tropy"
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        />
        <div className="d-flex flex-row align-items-center">
          <p>YOUR SCORE</p>
          <span>: {score}</span>
        </div>

        <button
          onClick={this.playAgainFun}
          className="playagainBtn d-flex flex-row align-items-center"
        >
          <img
            alt="reset"
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
          />
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {timeup} = this.state
    return (
      <div className="home-background-container d-flex flex-column align-items-center">
        <this.headerFun />
        {!timeup && <this.GameContainer />}
        {timeup && <this.GameOver />}
      </div>
    )
  }
}
export default MatchGame
