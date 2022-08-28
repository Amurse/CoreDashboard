import React from 'react';
import { useHistory } from 'react-router-dom';
import amurseLetters from '../../images/landingPage/amurseLetters.png';
import amurseLogo from '../../images/landingPage/amurseLogo.png'


const styles = (props) => ({
  width: props.scale? '100%': props.width,
  height: props.scale? '100%': !props.width && (props.height || 24),
  minWidth: props.minWidth,
  maxWidth: props.maxWidth,
  maxHeight: props.maxHeight
})

const ImageImporter = (props) => {

  const history = useHistory();
  

  
  const redirect = () => props.redirectLink && history.push(props.redirectLink);
  const amurseSrc = () => props.mobileView ? amurseLogo : amurseLetters
  const src = props.source ? props.source : amurseSrc();



  return (
    <div onClick={redirect} className={props.enableHover && 'hover'}>
      <img src={src} style={styles(props)}></img>
    </div>
  )
}

export default ImageImporter