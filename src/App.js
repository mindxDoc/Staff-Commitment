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
                <optgroup label="Hanoi">
                  <option value="">Select...</option>
                  <option value="Lê Thu Hải An">Lê Thu Hải An</option>
                  <option value="Nguyễn Trung Hiếu">Nguyễn Trung Hiếu</option>
                  <option value="Vũ Thị Minh Hoài">Vũ Thị Minh Hoài</option>
                  <option value="Đinh Quang Minh">Đinh Quang Minh</option>
                  <option value="Nguyễn Đình Phước">Nguyễn Đình Phước</option>
                </optgroup>
                <optgroup label="Ho Chi Minh">
                  <option value="Võ Hoàng Việt">Võ Hoàng Việt</option>
                  <option value="Nguyễn Ngọc Minh">Nguyễn Ngọc Minh</option>
                  <option value="Trần Gia Bảo">Trần Gia Bảo</option>
                </optgroup>
              </select>

              <label>Working:</label>
              <input type="radio" id="offline" value="Offline" name="working" className="Option-input Radio" onChange={this.handleInput} />
              <label htmlFor="offline" className="Light">In Office</label>
              <br />
              <input type="radio" id="remote" value="Online" name="working" className="Option-input Radio" onChange={this.handleInput} />
              <label htmlFor="remote" className="Light">Remote</label>
              <br />
              <input type="radio" id="off_with_permission" value="Nghỉ phép" name="working" className="Option-input Radio" onChange={this.handleInput} />
              <label htmlFor="off_with_permission" className="Light">Nghỉ có phép</label>
              <br />
              <input type="radio" id="off_without_permission" value="Nghỉ 0 phép" name="working" className="Option-input Radio" onChange={this.handleInput} />
              <label htmlFor="off_without_permission" className="Light">Nghỉ 0 phép</label>
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
