import React, {Component} from "react";

// SERVICES
import DataService from "../services/DataService";
import Calculations from "../services/Calculations";

// ACCESSORIES
import SubmitButton from '../ACCESSORIES/SubmitButton';
import CancelButton from '../ACCESSORIES/CancelButton';

export default class UserPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId          : this.props.userId,   
      showPopup       : true,

      userName        : '',
      userJams        : this.props.userJams,
      jamId           : " ",
      jamType         : 'chat',
      createdAt       : " ",
    };

    this.onStartChat = this.onStartChat.bind(this);
  };

  componentDidMount(){
    
    DataService.getUserInfo(this.state.userId)

    .then(result =>{
      // //console.log('result en el get user info : ', result)
      // let userJams = result.userJams;
      // if (userJams === undefined){
      //   userJams.push({
      //     jamName: 'sampleJam',
      //     jamCode: '0000',
      //     jamDescription: 'This is a sample Jam',
      //     adminId: this.state.userId,
      //     createdAt: new Date(),
      //   })
      // };
      this.setState({
        flatmateName: result.email,
        flatMateId: result.uid,
      })
    })
  };

  onStartChat(e){
    e.preventDefault();
    //console.log('userJams en el create', this.state.userJams)
    let userID = this.state.userId;
    
    let userId = this.state.userId;
    let flatMateId = this.state.flatMateId;

    let chatId = userId.concat(flatMateId);
    

    let transJams = [];
    transJams = [...this.state.userJams];
    let createdAt = new Date();
    let jamCode = Calculations.generateCode();
    
    let newJam = {
      adminId: userID,
      jamType: 'chat',
      jamCode: jamCode,
      jamName: this.state.jamName,
      jamDescription: this.state.jamDescription,
      createdAt: createdAt,
      jammers: [{name: this.state.userName, userId: userID}]
    };



    DataService.createJamBeta(newJam)
    .then((result)=>{
      // //console.log('el result del create Jam = ', result)
      let jamId = result.id;
      let userID = this.state.userId;

      newJam.jamId = jamId;
      newJam.jammers = [userID];

      transJams.push(newJam)

 
      //console.log('updateJAm called with: ', userID, '/ ', transJams)

      DataService.updateJamsArrayInUser(userID, transJams);
      this.props.closePopup();

      // this.props.propsFn.push(`/home/${userId}`)

    },(error)=>{
        //console.log('Jam could not be created, error:', error);
    });
  };

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>

          <div className="popup_inner_title">
            <h1>CREATE YOUR OWN JAM IN ONE STEP !</h1>
          </div>
          
        <form className="createJam-form-container" onSubmit={this.onCreateNewJam}>

          <label id="label-short">
              <h5>Name</h5>
              <input
                  className="input-short"
                  type="text"
                  name="jamName"
                  size="350"
                  value={this.state.jamName}
                  onChange={e => {
                      this.onChangeState("jamName", e.target.value);
                  }}
              />
          </label>

          <label id="label-textarea">
              <h5>Description</h5>
              <textarea
                  className="textarea"
                  type="text"
                  name="description"
                  size="350"
                  value={this.state.jamDescription}
                  onChange={e => {
                      this.onChangeState("jamDescription", e.target.value);
                  }}
              />
          </label>

          <div className="createJam-button-area">

            <div className="createJam-button" id="create-button-left">
              <CancelButton text="Cancel" fn={this.props.closePopup}/>
            </div>

            <div className="createJam-button" id="create-button-right">
              <SubmitButton text={"Create"} fn={this.onNewEvent}/>
            </div>

          </div>
            
        </form>


        </div>
      </div>
    );
  }
}

