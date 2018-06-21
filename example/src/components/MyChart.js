import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Form, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const testData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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

const Categories = ({ categories, handleChange }) => {
  return (
    <FormControl componentClass="select" placeholder="select" onChange={handleChange}>
      { categories.map((el, idx) => <option key={el} value={idx}>{el}</option>) }
    </FormControl>
  )
}

class MyChart extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categories: testData.categories,
      data1: testData.data[0],
      data2: testData.data[1],
      label1: testData.categories[0],
      label2: testData.categories[1]
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: testData.data[e.target.value] });
    
    // needs better idea
    if (e.target.id === 'data1')
      this.setState({ label1: testData.categories[e.target.value] });
      else
      this.setState({ label2: testData.categories[e.target.value] });
  }

  render() {
    const data = {
      labels: testData.labels,
      datasets: [{
          label: this.state.label1,
          type:'line',
          data: this.state.data1,
          fill: false,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-2'
        },{
          type: 'bar',
          label: this.state.label2,
          data: this.state.data2,
          fill: false,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C',
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
              display: false
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
        <h2>test data</h2>
        <Form inline>
          <Col md={5}>
            <FormGroup controlId="data1">
              <Col componentClass={ControlLabel} md={5}>
                Select 1
              </Col>
              <Col md={7}>
                <Categories categories={this.state.categories} handleChange={this.handleChange} />
              </Col>
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup controlId="data2">
              <Col componentClass={ControlLabel} md={5}>
                Select 2
              </Col>
              <Col md={7}>
                <Categories categories={this.state.categories} handleChange={this.handleChange} />
              </Col>
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