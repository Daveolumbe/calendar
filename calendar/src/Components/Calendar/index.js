import React, { Component } from 'react';
import moment, { months } from 'moment';

import './../../assets/calendar.css';

class Calendar extends Component {

    state = {
        dateContext: moment(),
        today: moment()
    }

    constructor(props) {
        super(props);
        this.width = props.width || "700px";
        this.style = props.style || {};
    }

    // Using momentjs to get weekdays, months
    weekDays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

    year = () => { return this.state.dateContext.format('Y'); }
    month = () => { return this.state.dateContext.format('MMMM'); }
    daysInMonth = () => { return this.state.dateContext.daysInMonth(); }
    currentDate = () =>  {return this.state.dateContext.get('date'); }
    currentDay = () => { return this.state.dateContext.format('D'); }

    firstDayOfMonth = () => { 
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d');
        return firstDay; 
    }

    onSelectChange = (e, data) => {
        this.setMonth(data);
    }


    setMonth = (month) => {
        let monthIndex = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthIndex);
        this.setState({
            dateContext: dateContext
        })
    }

    selectList = (props) => {
        let dropdown = props.data.map((data) => {
            return (
                <option key={data}>
                <a href="" onClick={(e) => {
                    this.onSelectChange(e, data)
                }}>{data}</a></option>
            )
        });

        return (
            <div class="form-group">
        <select class="form-control" id="exampleFormControlSelect1">
       {dropdown}
        </select>
        </div>
        )
    }

    MonthSelection = () => {
        return (
            <span className="label-month">
                <h3>{this.month()}</h3>
                <this.selectList data={this.months} />
                </span>
        )
    }

  render() {
      let weekDays = this.weekdaysShort.map((day) => {
          return (
              <td key={day} className="week-day">{day}</td>
          )
      });

      let blanks = [];
      for(let i = 0; i < this.firstDayOfMonth(); i++) {
          blanks.push(<td key={i * 80} className="emptySlot overflow-cell-color">{""}</td>);
      }
      console.log("blanks: " + blanks);

      let daysInMonth = [];
      for(let d = 1; d <= this.daysInMonth(); d++) {
          let className = (d === this.currentDate() ? "day curreny-day" : "day");
          daysInMonth.push(<td key={d} className={className}><span>{d}</span></td>);
      }
      console.log("days: " + daysInMonth);


      let totalSlots = [...blanks, ...daysInMonth];
      let rows = [];
      let cells = [];

      totalSlots.forEach((row, i) => {
          if((i % 7 ) !== 0 ) {
              cells.push(row);
          }else {
              let insertRow = cells.slice();
              rows.push(insertRow);
              cells = [];
              cells.push(row);
          }

          if(i === totalSlots.length - 1) {
              let insertRow = cells.slice();
              rows.push(insertRow);
          }
      });

      let trDaysElems = rows.map((d, i) => {
          return (
              <tr key={i*100}>{d}</tr>
          )
      });

    return (
      <div className=" container-fluid ">
      <div className="row">
      <div className="col-md-2">  </div>
      <div className="col-md-8 c-container">        
      <h2>Calendar</h2>
        <table className="table table-hover table-bordered">
        <thead>
            <tr className="calendar-header">
              <td colSpan="2">
              <this.MonthSelection />
              </td>
            </tr>
        </thead>
        <tbody>
        <tr className="table-primary">{weekDays}</tr>
        {trDaysElems}
        </tbody>
        </table>
        </div>
        <div className="col-md-2">  </div>
      </div>   
      </div>
    );
  }
}

export default Calendar;
