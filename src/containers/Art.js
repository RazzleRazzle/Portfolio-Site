import React, { Component, PropTypes } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

// import Socials from '../components/contact-components/Socials'

// import backgroundImg from '../../assets/home/home_bk.jpeg'

export default class Art extends Component {
  render() {
    return (
      <div className={css(styles.artContainer)}>
        <div className={css(styles.artGridWrapper)} >

        </div>
      </div>
    )
  }
}

const gridRow = props => {
  return (
    <div>
      
    </div>
  )
}

const styles = StyleSheet.create({
  artContainer: {
    height: 'calc(100vh - 5vh)',
    border:'1px solid blue',
    overflowY: 'scroll',

  },
  artGridWrapper: {
    
  }
})
