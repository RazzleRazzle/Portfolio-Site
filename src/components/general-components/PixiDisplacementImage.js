import React, { Component, ImageBackground } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import * as PIXI from 'pixi.js'
import Anime from 'animejs'

import backgroundImg from '../../../assets/home/home_bk.jpeg'
import backgroundImg2 from '../../../assets/home/home_bk_2.jpeg'

import displacementFilterImg from '../../../assets/home/displacementFilterHome.jpeg'
import { request } from 'http';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.app = PIXI.Application
    this.canvasAnchor = HTMLDivElement
    this.filterSprite = PIXI.filter
    this.count = 0
    this._animateCanvas = this.animateCanvas.bind(this)
  }

  componentDidMount() {
    Anime({
      targets: this.canvasAnchor,
      opacity:[0,1],
      duration: 1000,
      complete:() => this.initPixi()
    })
  }

  render() {
    let component = this;
    return (
      <div
        className={css(styles.homeContainer)}>
        <div
          onClick={this.changePhoto}
          className={css(styles.home)}
          ref={thisDiv => {
            component.canvasAnchor = thisDiv
          }}
        />
      </div>
    )
  }

  initPixi = () => {
    if (!PIXI.loader.resources['background']) {
      this.loaderConfig()
    } else {
      this.buildApp()
    }
  }

  loaderConfig = () => {
    PIXI.loader
      .add('background', `${backgroundImg}`)
      .add('background_2', `${backgroundImg2}`)
      .add('filter', `${displacementFilterImg}`)
      .load(this.buildApp);
  }

  buildApp = () => {
    const anchorBounds = this.canvasAnchor.getBoundingClientRect()
    // this.app = PIXI.autoDetectRenderer(256, 256);
    this.app = new PIXI.Application({
      width:  anchorBounds.width,
      height: anchorBounds.height,
      antialias: true,
      transparent: false,
      resolution: 1,
      autoResize: true,
      interactive:true
    })

    // this.app.renderer.resize(anchorBounds.height, anchorBounds.width)
    this.canvasAnchor.appendChild(this.app.view)

    this.attachFilteredImage()
  }

  attachFilteredImage = () => {
    // Create stage
    this.stageContainer = new PIXI.Container()
    this.app.stage.addChild(this.stageContainer)
    
    // Create Image itself
    const imageSprite = new PIXI.Sprite(PIXI.loader.resources['background'].texture)
    imageSprite.autoFit = true
    imageSprite.scale.set(0.3, 0.3)
    imageSprite.anchor.set(0.2,0.2)

    // Create Filter sprite 
    // const filterSprite = new PIXI.Sprite(PIXI.loader.resources['filter'].texture)
    const filterSprite = PIXI.Sprite.fromImage(`${displacementFilterImg}`);
    // Create filter
    const displacementFilter = new PIXI.filters.DisplacementFilter(filterSprite)
    displacementFilter.autoFit = true

    filterSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    filterSprite.texture.baseTexture.wrapMode
    filterSprite.scale.x = 0.6;
    filterSprite.scale.y = 0.6;
    // Add sprites and filter to container
    this.stageContainer.addChild(filterSprite)
    this.stageContainer.addChild(imageSprite)
    this.stageContainer.filters = [displacementFilter]
    
    this.animateCanvas(filterSprite)
  }

  animateCanvas = (filterSprite) => {
    let count = 0    
    this.app.ticker.add((delta) => {
      filterSprite.x = count*10
      filterSprite.y = count*10
      count += 0.05
    })
  }

  
  changePhoto = () => {
    // Create Image itself
    const imageSprite = new PIXI.Sprite(PIXI.loader.resources['background_2'].texture)
    imageSprite.autoFit = true
    imageSprite.scale.set(0.3, 0.3)
    imageSprite.anchor.set(0.2,0.2)
    this.stageContainer.addChild(imageSprite)
  }

  resizeCanvas = () => {

  }


}

const styles = StyleSheet.create({
  homeContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background:'white',
  },
  home: {
    height: '50%',
    width: '30%',
    // border: '1px solid black'
  },
})
