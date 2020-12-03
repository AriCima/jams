import React from "react";
import DataService from "../../../../services/DataService";
import { connect } from 'react-redux';


// CSS
import "./index.css";
import { setJamId } from "../../../../../redux/actions/navigateActions.js";

const StudentJammerCard = ({ userId, userJams, jI, setSection }) => {

  const jammerId = jI.userId;
  const jammerName= jI.userName;

  const onContactJammer = () => {

    const chatId = userId + jammerId;
    const reverseChatId = jammerId + userId;

    if(userJams.includes(chatId)){
      return setJamId(chatId)
    };
    
    if(userJams.includes(reverseChatId)){
      return setJamId(reverseChatId)
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

    DataService.startChat(chatId, chatInfo);
  };

  return (

    <button
      className="student-jammer-card-container"
      onClick={()=> onContactJammer(userId, jammerId)}>
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
};

const mapStateToProps = (state) => {
  return {
      userId: state.userInfo.userId,
      jamId: state.jamId,
      userJams: state.userJams,
  }
}
export default connect(mapStateToProps, { setJamId })(StudentJammerCard);
