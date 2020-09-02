import React from "react";

import DataService from "../../../../services/DataService";

import { connect } from 'react-redux';


// CSS
import "./index.css";
import { setJam } from "../../../../../redux/actions/jamId";
import {setJamSection} from "../../../../../redux/actions/jamSection";

const StudentJammerCard = (props) => {

  const { user, userJams, jI, jamInfo } = props
  //console.log('props en el jammerCard = ', props)
  const userId = user.uid;
  const jammerId = jI.userId;
  const jammerName= jI.userName;

  const onContactJammer = () => {

    const chatId = userId + jammerId;
    const reverseChatId = jammerId + userId;

    if(userJams.includes(chatId)){
      return setJam(chatId)
    };
    
    if(userJams.includes(reverseChatId)){
      return setJam(reverseChatId)
    }

    const chatInfo = { 
      createdAt: new Date(), 
      adminId: userId, 
      user2Id: jammerId,
      user2Name: jammerName,
      jamId: chatId, 
      jamType: 'chat', 
      messages: [] 
    }

    DataService.startChat(chatId, chatInfo)
    .then(res => {
      //console.log('res del startChat = ', res)
    })
    DataService.addJamToUser(userId, chatInfo);
    DataService.addJamToUser(jammerId, chatInfo);
    props.setJamSection('chat')
  }

  return (

    <button className="student-jammer-card-container" onClick={()=> onContactJammer(user.id, jammerId)}>

      <div className="student-jammer-img">
        <img src={"/"} alt="img" />
      </div>

      <div className="student-jammer-info">

        <div className="student-jammer-info-upperLine">
          <div className="student-jammer-info-upperLine-block">
            <p>{jI.userName} - {jI.country}</p>
          </div>
        </div>
        <div className="student-jammer-info-lowerLine">
          <div className="student-jammer-info-lowerLine-block">
            <p>{jI.study}, {jI.school}</p>
          </div>
        </div>
      </div>

    </button>
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    // nombre de la función que paso como prop: (arg) => dispatch(nombre del action creator(argumento))
    setJamSection: () => dispatch(setJamSection('chat'))
  }
}


const mapStateToProps = (state) => {
  return {
      user: state.firebase.auth,
      jamId: state.jamId,
      userJams: state.userJams,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentJammerCard);
