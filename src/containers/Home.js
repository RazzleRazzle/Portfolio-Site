import React, { Component, ImageBackground } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import Anime from 'animejs'
import _ from 'underscore'

import HomeMenu from '../components/home-components/HomeMenu'
import HomeMenuSlider from '../components/home-components/HomeMenuSlider'
import ScrollInstruction from '../components/home-components/ScrollInstruction'
import PixiDisplacementImage from '../components/general-components/PixiDisplacementImage'
import SectionCounter from '../components/home-components/SectionCounter'
import Zoom from 'react-reveal'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { currentItem: 0, direction: null }

    this.handleScroll = _.throttle(this.scrollMonitor, 1500, {
      trailing: false,
    })
  }

  componentDidMount() {
    this.wheelEvent = window.addEventListener('wheel', this.handleScroll)
  }

  componentWillUnmount() {
    console.log(this.wheelEvent)
    window.removeEventListener('wheel', this.wheelEvent)
  }

  render() {
    const { currentItem, direction } = this.state

    return (
      <div id="home" className={css(styles.homeGridContainer)}>
        <div className={css(styles.imageCell)}>
          <PixiDisplacementImage currentItem={currentItem} />
        </div>
        <HomeMenu
          onSectionClick={this.onSectionClick}
          currentItem={currentItem}
          direction={direction}
        />
        

        <SectionCounter 
          currentItem={currentItem} 
        />
        <div className={css(styles.nameCell, styles.flex)}>
          <div className={css(styles.name)}>JAKE MUSICH</div>
        </div>

        <HomeMenuSlider currentItem={currentItem} />
 
        <div className={css(styles.artistCell)}>
          <Zoom>
          <div className={css(styles.artistText)}>- Artist</div>
          </Zoom>
        </div>
        <div className={css(styles.developerCell)}>
          <Zoom duration={2000} delay={1000}>
            <div className={css(styles.developerText)}>- Developer</div>
          </Zoom>
        </div>
      </div>
    )
  }

  onSectionClick = (event, section) => {
    const _this = this
    const tl = Anime.timeline()

    tl.add({
      targets: '#home',
      easing: 'easeOutQuart',
      duration: 400,
      complete: () => {
        _this.props.history.push(`${section.route}`)
      },
    })
  }

  scrollMonitor = wheelEvent => {
    const direction = wheelEvent.deltaY > 0 ? '+' : '-'
    const { currentItem } = this.state
    let nextItem

    if (direction === '+' && currentItem === 2) {
      nextItem = 0
    } else if (direction === '+' && currentItem >= 0) {
      nextItem = currentItem + 1
    } else if (direction === '-' && currentItem !== 0) {
      nextItem = currentItem - 1
    } else if (direction === '-' && currentItem === 0) {
      nextItem = 2
    } else {
      return
    }

    this.setState({ currentItem: nextItem, direction })
  }
}

const styles = StyleSheet.create({
  homeGridContainer: {
    height: 'calc(100vh)',
    width: '100vw',
    display: 'grid',
    background: 'rgb(15,15,15)',
    gridTemplateColumns: 'repeat(5, 20%)',
    gridTemplateRows: 'repeat(5, 20%)',
  },
  imageCell: {
    gridRow: '2/5',
    gridColumn: '2/4',
    background: '#F115',
    // border: "1px solid pink"
  },
  scrollCell: {
    gridColumnStart: '3',
    gridColumnEnd: '4',
    gridRowStart: '5',
    gridRowEnd: '6',
  },
  counterCell: {
    gridColumnStart: '1',
    gridColumnEnd: '2',
    gridRowStart: '5',
    gridRowEnd: '6',
  },
  nameCell: {
    gridColumnStart: '5',
    gridColumnEnd: '6',
    gridRowStart: '2',
    gridRowEnd: '3',
    webkitWritingMode: 'vertical-rl',
    writingMode: 'vertical-rl',
    color: '#F2F2F2',
    fontFamily: ['Inconsolata', 'serif'],
    fontSize: '10px',
  },
  name: {
    height: 'auto',
    width: 'auto',
    opacity: '0.7',
    transition: '0.8s opacity',
    ':hover': {
      opacity: '0.9',
    },
  },
  circleCell: {
    gridColumnStart: '5',
    gridColumnEnd: '6',
    gridRowStart: '5',
    gridRowEnd: '6',
  },
  artistCell: {
    gridColumnStart: '3',
    gridColumnEnd: '4',
    gridRowStart: '1',
    gridRowEnd: '2',
    color: '#F2F2F2',
    fontFamily: ['Inconsolata', 'serif'],
    fontSize: '10px',
    opacity: '0.7',
    // border:'1px solid blue'
  },
  artistText: {
    height:'auto',
    width:'auto',
    // border:'1px solid white',
    marginTop: '10%',
    textAlign:'right'
  },
  developerCell: {
    gridColumnStart: '4',
    gridColumnEnd: '5',
    gridRowStart: '1',
    gridRowEnd: '2',
    color: '#F2F2F2',
    fontFamily: ['Inconsolata', 'serif'],
    fontSize: '10px',
    opacity: '0.7',
    // border:'1px solid blue'
  },
  developerText: {
    height:'auto',
    width:'auto',
    // border:'1px solid white',
    marginTop: '10%',
    textAlign:'right'
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
})
