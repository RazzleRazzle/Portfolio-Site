import React, { Component, PropTypes } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import WheelIndicator from 'wheel-indicator'
import _ from 'underscore'

import HomeMenu from './home-menu/HomeMenu'

export default class Scroller extends Component {
  constructor(props) {
    super(props)

    this.state = { currentItem: 0 }

    this.handleScroll = _.throttle(this.scrollMonitor, 1500, {trailing: false});
  }

  scrollMonitor = (wheelEvent) => {
    const direction = wheelEvent.deltaY > 0 ? 'up' : 'down'
    const { currentItem } = this.state
    let nextItem;

    if (direction === 'down' && currentItem === 4) {
      nextItem = 0
    } else if (direction === 'down' && currentItem >= 0) {
      nextItem = (currentItem + 1)
    } else if (direction === 'up' && currentItem !== 0) {
      nextItem = (currentItem - 1)
    } else if (direction === 'up' && currentItem === 0 ) {
      nextItem = 4
    } else { return }

    this.setState({ currentItem: nextItem })
  }


  render() {
    const { currentItem } = this.state
    return (
      <div
        id="scroll-monitor"
        className={css(styles.scroller)}
        onWheel={this.handleScroll}
      >
        <HomeMenu currentItem={currentItem} />
      </div>
    )
  };
}

const styles = StyleSheet.create({
  scroller: {
    height: '100vh',
  }
});


// PropTypes = {}



// import { Injectable } from '@angular/core';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
//
//
// declare var WheelIndicator: any;
// declare var Hammer: any;
// declare var _ : any;
//
// @Injectable()
// export class ScrollMainNavigationService  {
//
//    private current_page_source = new BehaviorSubject<number>(0);
//    private numberOfPillars: number = 4;
//    private currentPage = 0;
//    private scroll: any = null;
//    private touch: any = null;
//    private throttleWaitTime : number = 800;
//    private throttleKey : any;
//
//
//    current_page = this.current_page_source.asObservable();
//
//    constructor() { }
//
//    init = () => {
//      this.initScroll();
//      this.initTouch();
//      this.initKey();
//    }
//   destory = () => {
//     this.scroll.destroy();
//     this.touch.destroy();
//     this.destroyKey();
//   }
//
//
//
//   private initScroll = () => {
//     let throttleScroll = _.throttle(this.onScroll, this.throttleWaitTime, {trailing: false});
//     this.scroll = new WheelIndicator({
//       elem: window,
//       callback: throttleScroll,
//     });
//   }
//
//   private initTouch = () => {
//     this.touch = new Hammer.Manager(window, {
//       recognizers: [
//         [Hammer.Swipe],
//       ]
//     });
//     this.attachSwipeEvents();
//   }
//
//   private initKey = () => {
//     this.throttleKey = _.throttle(this.onKey, this.throttleWaitTime, {trailing: false});
//     window.addEventListener("keydown", this.throttleKey);
//   }
//
//   private onKey = (e) => {
//       if (e.keyCode === 40) {
//         this.pageChangeHandler('down');
//       } else if (e.keyCode === 38) {
//         this.pageChangeHandler('up');
//       } else {
//         return
//       }
//   }
//
//   private destroyKey = () => {
//     window.removeEventListener("keydown", this.throttleKey);
//   }
//
//
//   private onScroll = (e) => {
//       this.pageChangeHandler(e.direction);
//   }
//
//   private attachSwipeEvents = () => {
//     let throttleSwipeUp = _.throttle(this.swipUp, this.throttleWaitTime, {trailing: false});
//     let throttleSwipeDown = _.throttle(this.swipDown, this.throttleWaitTime, {trailing: false});
//     let _pageChangeHandler = this.pageChangeHandler;
//     //Swipe-Up-Event-Listener
//     this.touch.on("swipeup", throttleSwipeUp);
//     //Swipe-Down-Event-Listener
//     this.touch.on("swipedown", throttleSwipeDown);
//   }
//
//   private swipUp = (direction) => {
//     this.pageChangeHandler('down')
//   }
//
//   private swipDown = (direction) => {
//     this.pageChangeHandler('up')
//
//   }
//
//
//
//   pageChangeHandler = (direction) => {
//     if(direction === 'up' && this.currentPage === 0){
//       this.currentPage = 0; //this.currentPage = 4;
//     } else if (direction === 'down' && this.currentPage <= (this.numberOfPillars - 1)) {
//       this.currentPage = (this.currentPage + 1); // % (this.numberOfPillars + 1);
//     } else if (direction === 'up' && this.currentPage !== 0) {
//       this.currentPage--;
//     }
//     else {
//       return;
//     }
//     this.registerScroll(this.currentPage);
//   }
//
//   //registers the current_page for subscription
//   private registerScroll = (current_page) => {
//     this.current_page_source.next(current_page);
//   }
//
//   public reset = (pageNumber : number) => {
//     this.currentPage = pageNumber;
//   }
//
//
// }
