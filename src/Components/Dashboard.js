import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./Dashboard.css";
import WidgetText from "./WidgetText";
import WidgetBar from "./WidgetBar";
import WidgetColumn from "./WidgetColumn";
import WidgetDoughnut from "./WidgetDoughnut";
import Dropdown from "react-dropdown";

//excel import
const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg"
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      selectedValue: null,
      organicSource: null,
      directSource: null,
      referralSource: null,
      socialSource: null,
      emailSource: null,
      pageViews: null,
      users: null,
      newUsers: null,
      sourceArr: [],
      usersArr: [],
     sessions: null,
     NoOfSessions: null,
     PagePerSessions: null,
     sessionsArr : []
    };
  }

  getData = (arg) => {
    const arr = this.state.items;
    const arrLen = arr.length;

    let organicSource = 0;
    let directSource = 0;
    let referralSource = 0;
    let socialSource = 0;
    let emailSource = 0;
    let pageViews = 0;
    let users = 0;
    let newUsers = 0;
    let selectedValue = null;
    let sourceArr = [];
    let usersArr = [];
    let sessions = 0;
    let NoOfSessions = 0;
    let PagePerSessions = 0;
    let sessionsArr = [];

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        organicSource = arr[i].organic_source;
        directSource = arr[i].direct_source;
        referralSource = arr[i].referral_source;
        socialSource = arr[i].social_source;
        emailSource = arr[i].email_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        newUsers = arr[i].new_users;
     sessions = arr[i].sessions;
     NoOfSessions = arr[i].number_of_sessions_per_users;
     PagePerSessions = arr[i].page_per_session;
     sessionsArr.push(
        // {
        //   label: "Sessions",
        //   value: arr[i].sessions
        // },
        {
          label: "No. of sessions per users",
          value: arr[i].number_of_sessions_per_users
        },
        {
          label: "Page per sessions",
          value: arr[i].page_per_session
        }
     );
        sourceArr.push(
          // Preparing the chart data
          // const chartData = [
          {
            label: "Organic Source",
            value: arr[i].organic_source
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source
          },
          {
            label: "Social Source",
            value: arr[i].social_source
          },
          {
            label: "Email Source",
            value: arr[i].email_source
          }
        );

        usersArr.push(
          // Preparing the chart data
          // const chartData = [
          {
            label: "Users",
            value: arr[i].users
          },
          {
            label: "New Users",
            value: arr[i].new_users
          }
        );
      }
    }

    selectedValue = arg;

    this.setState(
      {
        organicSource: organicSource,
        directSource: directSource,
        referralSource: referralSource,
        pageViews: pageViews,
        socialSource: socialSource,
        emailSource: emailSource,
        users: users,
        newUsers: newUsers,
        sourceArr: sourceArr,
        usersArr: usersArr,
        sessions : sessions,
NoOfSessions: NoOfSessions,
PagePerSessions:PagePerSessions,
sessionsArr: sessionsArr
      },
      () => {}
    );
  };

  updateDashboard = (e) => {
    this.getData(e.value);
    this.setState(
      {
        selectedValue: e.value
      },
      () => {
        console.log(this.state.users);
      }
    );
  };

  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2018"
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  render() {

    return (
      <div>
        <Container fluid>
          <Row className="TopHeader">
            <Col className='heading'>Dashboard</Col>
            <Col className='dropdown'>
              <Dropdown
                options={this.state.dropdownOptions}
                onChange={this.updateDashboard}
                value={this.state.selectedValue}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="mainDashboard">
            <Col>
              <WidgetText
                title="Organic Source"
                value={this.state.organicSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Direct Source"
                value={this.state.directSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Referral Source"
                value={this.state.referralSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Social Source"
                value={this.state.socialSource}
              />
            </Col>
            {/* <Col>
              <WidgetText title="Email Source" value={this.state.emailSource} />
            </Col> */}
          </Row>
          <Row className="mainDashboard">
            <Col>
              <WidgetText title="Email Source" value={this.state.emailSource} />
            </Col>
            <Col>
              <WidgetText title="Page Views" value={this.state.pageViews} />
            </Col>
            <Col>
              <WidgetText title="Users" value={this.state.users} />
            </Col>
            <Col>
              <WidgetText title="New Users" value={this.state.newUsers} />
            </Col>
            {/* <Col>
            <WidgetText title="Direct Source" value={this.state.directSource} />
            </Col>
            <Col>
            <WidgetText title="Referral Source" value={this.state.referralSource} />
            </Col> */}
          </Row>
          <Row className="mainDashboard">
            {/* <Col>
              <WidgetText title="Users" value={this.state.users} />
            </Col>
            <Col>
              <WidgetText title="New Users" value={this.state.newUsers} />
            </Col> */}
            {/* <Col>
              <WidgetBar
                title="Source Comparison"
                data={this.state.sourceArr}
              />
            </Col> */}
            {/* <Col>
            <WidgetBar title='Source Comparison' data={this.state.sourceArr}/>
            </Col> */}
            {/* <Col>
            <WidgetDoughnut title='Users Comparison' data={this.state.usersArr}/>
            </Col> */}
          </Row>
          <br/> <br/>
          <Row className="mainDashboard">
            <Col>
              <WidgetBar
                title="Source Comparison"
                data={this.state.sourceArr}
              />
            </Col>
          </Row>
          <br/> <br/>
          <Row className="mainDashboard">
            <Col>
              <WidgetDoughnut
                title="Users Comparison"
                data={this.state.usersArr}
              />
            </Col>
          </Row>
          <br/> <br/>
          <Row className="mainDashboard">
            <Col>
              <WidgetColumn
                title="Session Comparison"
                data={this.state.sessionsArr}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default Dashboard;
