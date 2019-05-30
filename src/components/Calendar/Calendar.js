//Calendar Component for rental reservations Ski World Rental Management
//5/18/19


import React from "react";
import dateFns from "date-fns";
import ReturnSetupTable from '../ReturnSetupTable/ReturnSetupTable';
import {Badge, Row, Col} from 'reactstrap';
import "./styles.css";

export default class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      invData: this.fetchData(this.selectedDate),
      totItems: 1
    };
  }
  fetchData(date){
    let returnedJSON = [{
      "sysId":"123456789012", "fName": "John", "lName": "Doe", "type": "customer", "streetAdd":  "1234 Mona Ave", "aptNum": "",
      "city": "Norfolk", "state": "VA", "zipCode": "23518", "homePhone": "(757)555-5555", "cell": "", "email": "john@johndoe.com",
      "altEmail": "", "birthdate": "04/12/1994", "activity":[
        {"items":{
          "type": "ski w/ boot", "ski": "Rossi EXP 160", "boot": "rossi 25.5", "poles": "54in", "insurance": "true"
        }, "dateOut": "02/15/2019", "dateIn:": "02/20/2019", "actDateIn": "02/20/2019", "weight": "180lb", "height": "5ft8in", "skierType": "2", "status": "returned", "skierCode": "K", "setting":"6.0", "tecnician":"Chris Creason"}
      ]
    },
    {
      "sysId":"123456789012", "fName": "John", "lName": "Doe", "type": "customer", "streetAdd":  "1234 Mona Ave", "aptNum": "",
      "city": "Norfolk", "state": "VA", "zipCode": "23518", "homePhone": "(757)555-5555", "cell": "", "email": "john@johndoe.com",
      "altEmail": "", "birthdate": "04/12/1994", "activity":[
        {"items":{
          "type": "ski w/ boot", "ski": "Rossi EXP 160", "boot": "rossi 25.5", "poles": "54in", "insurance": "true"
        }, "dateOut": "02/15/2019", "dateIn:": "02/20/2019", "actDateIn": "02/20/2019", "weight": "180lb", "height": "5ft8in", "skierType": "2", "status": "returned", "skierCode": "K", "setting":"6.0", "tecnician":"Chris Creason"}
      ]
    },
    {
      "sysId":"123456789012", "fName": "John", "lName": "Doe", "type": "customer", "streetAdd":  "1234 Mona Ave", "aptNum": "",
      "city": "Norfolk", "state": "VA", "zipCode": "23518", "homePhone": "(757)555-5555", "cell": "", "email": "john@johndoe.com",
      "altEmail": "", "birthdate": "04/12/1994", "activity":[
        {"items":{
          "type": "ski w/ boot", "ski": "Rossi EXP 160", "skiSerial":"SW1234", "boot": "rossi 25.5", "bootSerial":"SW2234", "poles": "54in", "poleSerial": "3234", "insurance": "true"
        }, "dateOut": "02/15/2019", "dateIn:": "02/20/2019", "actDateIn": "02/20/2019", "weight": "180lb", "height": "5ft8in", "skierType": "2", "status": "returned", "skierCode": "K", "setting":"6.0", "tecnician":"Chris Creason"}
      ]
    }];
    return returnedJSON;
  }
  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            {dateFns.isSameDay(day, selectedDate) ?
            (<span className="content">
              <p>Returns: <Badge color="primary">90</Badge> </p>
              <p>Setups: <Badge color="primary">40</Badge> </p>
            </span>):""}
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }


  onDateClick = day => {
    this.setState({
      selectedDate: day,
      invData: this.fetchData(day)
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="reservations">
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div><hr/>
        <h3 className="mt-3">{dateFns.format(this.state.selectedDate, "dddd, MMM Do, YYYY")}</h3>
        <Row>
          <Col xs="6" className="my-3">
            <h3>Setups:</h3>
            <ReturnSetupTable status="Setups" data={this.state.invData}/>
          </Col>
          <Col xs="6" className="returns my-3">
            <h3>Returns:</h3>
            <ReturnSetupTable status="Returns" data={this.state.invData}/>
          </Col>
        </Row>
      </div>
    );
  }
}
