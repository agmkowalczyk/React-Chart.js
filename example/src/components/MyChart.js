import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Form, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const testData = {
  xAxisLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  categories: ['category-0', 'category-1', 'category-2', 'category-3', 'category-4', 'category-5'],
  data: [
    [51, 65, 40, 49, 60, 37, 40],
    [100, 185, 590, 621, 250, 400, 95],
    [200, 18, 20, 621, 150, 41, 95],
    [300, 185, 590, 621, 250, 400, 95],
    [400, 85, 590, 38, 25, 100, 95],
    [500, 15, 59, 621, 250, 250, 95]
  ]
}

const Categories = ({ categories, handleChange, label }) => {
  return (
    <FormControl componentClass="select" onChange={handleChange} value={label}>
      { categories.map((el, idx) => <option key={el} value={el} id={idx}>{el}</option>) }
    </FormControl>
  )
}

class MyChart extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      xAxisLabels: testData.xAxisLabels,
      categories: testData.categories,
      data1: testData.data[2],
      data2: testData.data[3],
      label1: testData.categories[2],
      label2: testData.categories[3]
    }

    this.handleChange = this.handleChange.bind(this);
  }

  setLabel(e) {
    // needs better idea
    if (e.target.id === 'data1')
      this.setState({ label1: e.target.value });
      else
      this.setState({ label2: e.target.value });
  }

  selectData(e) {
    for (let elem of e.target.children) {
      if (elem.value === e.target.value) {
        this.setState({ [e.target.id]: testData.data[elem.id] });
      }
    }
  }

  handleChange(e) {
    this.selectData(e);
    this.setLabel(e);
  }

  render() {
    const data = {
      labels: testData.xAxisLabels,
      datasets: [{
          label: this.state.label1,
          data: this.state.data1,
          type:'line',
          fill: false,
          borderColor: '#c0392b',
          backgroundColor: '#c0392b',
          pointBorderColor: '#c0392b',
          pointBackgroundColor: '#c0392b',
          pointHoverBackgroundColor: '#c0392b',
          pointHoverBorderColor: '#c0392b',
          yAxisID: 'y-axis-2'
        },{
          type: 'bar',
          label: this.state.label2,
          data: this.state.data2,
          fill: false,
          backgroundColor: '#d0dbe5',
          borderColor: '#d0dbe5',
          hoverBackgroundColor: '#d0dbe5',
          hoverBorderColor: '#d0dbe5',
          yAxisID: 'y-axis-1'
        }]
    };

    const options = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: true
            },
            labels: {
              show: true
            }
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
      }
    };

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillText("This text drawn by a plugin", 100, 100);
        }
    }];

    return (
      <div>
        <h2>Performance monitor</h2>
        <h4>Here is a subtitle for this table</h4>
        <Form>
          <Col md={5}>
            <FormGroup controlId="data1" bsSize="small">
              <ControlLabel>Select 1</ControlLabel>
              <Categories categories={this.state.categories} handleChange={this.handleChange} label={this.state.label1} />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup controlId="data2" bsSize="small">
              <ControlLabel>Select 2</ControlLabel>
              <Categories categories={this.state.categories} handleChange={this.handleChange} label={this.state.label2} />
            </FormGroup>
          </Col>
        </Form>
            
          
        <Bar
          data={data}
          options={options}
          plugins={plugins}
        />
        
      </div>
    );
  }
};


export default MyChart;