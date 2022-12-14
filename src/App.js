import React, { Component } from 'react';
import './App.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { sendNotification } from './utility/telegram';
import { postMessageToGoogle } from './utility/ggSheet'

const MySwal = withReactContent(Swal);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staff: '',
      working: '',
      done: '',
      todo: ''
    }
  }

  initialState = {
    staff: '',
    working: '',
    done: '',
    todo: ''
  }

  state = this.initialState

  handleFormReset = () => {
    this.setState(() => this.initialState)
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  successSubmit = () => {
    MySwal.fire({
      title: <strong>Good job!</strong>,
      icon: 'success'
    });
  }

  pushMessToTele = () => {
    let message =
      `
<pre>${new Date()}</pre>
<b>${this.state.staff}</b>
Working: <b><i>${this.state.working}</i></b>
--------------------------------------------------
<b>Done Tasks</b>
${this.state.done}
--------------------------------------------------
<b>Today Tasks</b>
${this.state.todo}
`;

    sendNotification(message, 'HTML');
  }

  submitToForm = () => {
    const formData = new FormData();

    const GGL_FORM_STAFF_ID = 'entry.1446492779';
    const GGL_FORM_WORKING_ID = 'entry.510634023';

    formData.append(GGL_FORM_STAFF_ID, this.state.staff)
    formData.append(GGL_FORM_WORKING_ID, this.state.working)
    postMessageToGoogle(formData);
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.pushMessToTele();
    this.submitToForm();
    this.successSubmit();
    e.target.reset();
  };

  render() {
    return (
      <div className="row">
        <div className='col-md-12'>
          <form className='Form' onSubmit={this.onSubmit} onReset={this.handleFormReset}>
            <h1>Daily Commitment</h1>
            <fieldset>
              <legend><span className='Number'>1</span> Your Info</legend>
              <label htmlFor="staff">Name:</label>
              <select id="staff" name="staff" onChange={this.handleInput} value={this.state.staff}>
                <option value="">Select...</option>
                <optgroup label="Hanoi">  
                  <option value="L?? Thu H???i An">L?? Thu H???i An</option>
                  <option value="Nguy???n Trung Hi???u">Nguy???n Trung Hi???u</option>
                  <option value="V?? Th??? Minh Ho??i">V?? Th??? Minh Ho??i</option>
                </optgroup>
                <optgroup label="Ho Chi Minh">
                  <option value="V?? Ho??ng Vi???t">V?? Ho??ng Vi???t</option>
                  <option value="Nguy???n Ng???c Minh">Nguy???n Ng???c Minh</option>
                  <option value="Nguy???n Gia B???o">Nguy???n Gia B???o</option>
                  <option value="Nguy???n Ng???c H??n">Nguy???n Ng???c H??n</option>
                  <option value="????o Thi??n Anh Khoa">????o Thi??n Anh Khoa</option>
<option value="V?? T T?????ng Duy">V?? T T?????ng Duy</option>
                </optgroup>
              </select>

              <label>Working:</label>
              <input type="radio" id="offline" value="OFFLINE" name="working" className="Option-input Radio" onChange={this.handleInput} />
              <label htmlFor="offline" className="Light">In Office</label>
              <br />
              <input type="radio" id="remote" value="ONLINE" name="working" className="Option-input Radio" onChange={this.handleInput} />
              <label htmlFor="remote" className="Light">Remote</label>
              <br />
              <input type="radio" id="off_with_permission" value="NGH??? PH??P" name="working" className="Option-input Radio" onChange={this.handleInput} />
              <label htmlFor="off_with_permission" className="Light">Ngh??? c?? ph??p</label>
              <br />
              <input type="radio" id="off_without_permission" value="NGH??? KH??NG PH??P" name="working" className="Option-input Radio" onChange={this.handleInput} />
              <label htmlFor="off_without_permission" className="Light">Ngh??? 0 ph??p</label>
            </fieldset>

            <fieldset>

              <legend><span className="Number">2</span> Your Progress</legend>

              <label htmlFor="done">Done Tasks:</label>
              <textarea id="done" name="done" value={this.state.done} onChange={this.handleInput}></textarea>

              <label htmlFor="today_tasks">Today Tasks:</label>
              <textarea id="today_tasks" name="todo" value={this.state.todo} onChange={this.handleInput}></textarea>
            </fieldset>

            <button id="myBtn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
