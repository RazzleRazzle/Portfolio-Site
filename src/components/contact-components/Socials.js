import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important'
import '../../styles/index.css'

const socials = [
  "github",
  'linkedin',
  'medium',
  'instagram'
]

export default class Socials extends Component {

  render() {
    return (
      <div className={css(styles.socialContainer)}>
        {socials.map( (item, index) =>
          <div>
            {item}
          </div>
        )}
      </div>
    )
  }


}

const styles = StyleSheet.create({
  socialContainer: {
    padding:"10%",
    color:"white",
    fontFamily:"Source-Sans-Pro",
    letterSpacing:"3px"
  },

})
