import React,{Component } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import jQuery from 'jquery'

 
class Chart_Quoc extends Component
{
  constructor(props) {
    super(props); 
      this.state = {
      lineChartData:{
        labels: ["2021-07-01","2021-07-02","2021-07-03","2021-07-04","2021-07-05","2021-07-06","2021-07-07","2021-07-08","2021-07-09","2021-07-10","2021-07-11","2021-07-12","2021-07-13","2021-07-14","2021-07-15","2021-07-16","2021-07-17"   ],
        datasets: [
          {
            data: [335.90, 335.92, 335.93, 335.95, 335.91, 335.95, 335.92, 335.91, 335.95, 335.98, 335.95, 335.92, 335.91, 335.95, 335.98, 335.98, 335.95],
            label: "Quỹ A",
            borderColor: "#E87722",
            backgroundColor: "#E87722",
            fill: false,        
            
          },
          {
            data: [335.94, 335.95, 335.97, 335.98, 335.94, 335.96, 335.96, 335.96, 335.95, 335.97,335.94, 335.95, 335.97, 335.98, 335.94, 335.96, 335.96],
            label: "Quỹ B",
            borderColor: "#6ECEB2",
            backgroundColor: "#6ECEB2",
            fill: false,
            
          },
          {
            data: [335.96, 335.92, 335.92, 335.94, 335.95, 335.97, 335.92, 335.94, 335.92, 335.99,335.92, 335.92, 335.94, 335.95, 335.97,335.97, 335.92],
            label: "Quỹ C",
            borderColor: "#FED141",
            backgroundColor: "#FED141",
            fill: false
          }
          
        ]
      },
      config:{          
        responsive: true, 
        containerID: 'legend',        
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats:{
                day: 'DD/MM'
              },
              // Luxon format string
              tooltipFormat: 'DD/MM/YYYY'
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 5
              
          }
          },
          y:{
            ticks: {  
              beginAtZero:true,            
              
                callback: function(value) {                   
                    var k = value - Math.floor(value)  
                    if(k === 0.00){
                      k = 1.00;
                      return Number(k).toFixed(2);
                    } 
                    else{
                      return  Number(k).toFixed(2);
                    }                          
                                                     
              },
              stepSize: 0.02,              
            }, 
          
            
          }       
        },
        
        plugins: {
          legend: {
            display: false,
            labels: {
              usePointStyle: true,
              pointStyle: 'rect',             
            },
            align: 'end',            
          },
          tooltip: {
            enabled: false,            
            callbacks: {
                label: function(context) {
                    console.log(context)
                    var label = context.dataset.label || '';        
                    if (label) {
                      label = '';         
                    }
                    if (context.parsed.y !== null) {
                        label += ' Giá trị quỹ : ' + context.parsed.y;
                    }
                    console.log(label)
                    return label;
                    },
            },
            //tooltipHandle
            external: function(context) {
              // Tooltip Element
              var tooltipEl = document.getElementById('chartjs-tooltip');

              // Create element on first render
              if (!tooltipEl) {
                  tooltipEl = document.createElement('div');
                  tooltipEl.id = 'chartjs-tooltip';
                  tooltipEl.innerHTML = '<table></table>';
                  document.body.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              var tooltipModel = context.tooltip;
              if (tooltipModel.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
              }

              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                  tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                  tooltipEl.classList.add('no-transform');
              }

              function getBody(bodyItem) {
                  return bodyItem.lines;
              }

              // Set Text
              if (tooltipModel.body) {
                  var titleLines = tooltipModel.title || [];
                  var bodyLines = tooltipModel.body.map(getBody);

                  var innerHtml = '<thead>';

                  titleLines.forEach(function(title) {
                      innerHtml += '<tr><th style ="background-color: #0A3B32; color: white;">' +'Ngày: ' + title + '</th></tr>';
                  });
                  innerHtml += '</thead><tbody>';

                  bodyLines.forEach(function(body, i) {
                      var colors = tooltipModel.labelColors[i];
                      var style = 'background:' + colors.backgroundColor;
                      style += '; border-color:' + colors.borderColor;
                      style += '; border-width: 2px';
                      var span = '<span style="' + style + '"></span>';
                      innerHtml += '<tr><td>' + span + body + '</td></tr>';
                  });
                  innerHtml += '</tbody>';

                  var tableRoot = tooltipEl.querySelector('table');
                  tableRoot.innerHTML = innerHtml;
              }

              var position = context.chart.canvas.getBoundingClientRect();
             // var bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

              // Display, position, and set styles for font
              tooltipEl.style.opacity = 1;
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
              tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
             // tooltipEl.style.font = bodyFont.string;
              tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
              tooltipEl.style.pointerEvents = 'none';
              tooltipEl.style.background = 'white';
              tooltipEl.style.border = "1px solid #E87722";
              tooltipEl.style.borderRadius = "5px"
          },
          //tooltipHandle
          },
         
        },
       
      },
      qChart :{},
      congTac: true, 
      intervID: 1,
      
    }   

    this.removeData = this.removeData.bind(this);
    this.addData = this.addData.bind(this);
    this.addDataInterval = this.addDataInterval.bind(this);
  }
    
  removeData(){
    var xoaData = this.state.lineChartData;
    console.log(xoaData);
    var dsLabels =xoaData.labels;    
    dsLabels.pop();  
    xoaData.datasets.forEach(ob => {
        ob.data.pop();
        });       
        this.setState({lineChartData : xoaData});
        console.log(this.state.lineChartData);
        this.state.qChart.update();
  }

  addData(){
    var themData = this.state.lineChartData;
   // console.log(themData);
    var dsLabels =themData.labels;    
    var ngayCuoi = dsLabels[dsLabels.length -1];
    if(dsLabels.length == 0){
      ngayCuoi = new Date().toISOString().slice(0,10).toString();
    }      
    var d = new Date(ngayCuoi);    
    var ngayKeTiep= d.setDate(d.getDate() + 1);        
    ngayKeTiep = new Date(ngayKeTiep).toISOString().slice(0,10).toString();
    //console.log(ngayKeTiep);
    themData.labels.push(ngayKeTiep);       
    themData.datasets.forEach(ob => {
        var dataQuy = (Math.random() * (335.99 - 335.90) + 335.90).toFixed(2);
        var dtrd = parseFloat(dataQuy);       
        ob.data.push(dtrd);
        });     
        this.setState({lineChartData : themData});
       // console.log(this.state.lineChartData);
        this.state.qChart.update();
      }

  addDataInterval(){
    if(this.state.congTac){
      this.setState({congTac:false});
      this.state.intervID =  setInterval(() => {
        this.addData();         
     },1000);     
    }else{
        clearInterval(this.state.intervID);
        this.setState({congTac:true});
    }        
      
   }   
   
  getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
  
    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'row';
      listContainer.style.margin = 0;
      listContainer.style.padding = 0;
  
      legendContainer.appendChild(listContainer);
    }
  
    return listContainer;
  }
  afterUpdate = (chart, args, options) => {
    const ul = this.getOrCreateLegendList(chart, 'legend');

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach(item => {
      const li = document.createElement('li');
      li.style.alignItems = 'center';
      li.style.cursor = 'pointer';
      li.style.display = 'flex';
      li.style.flexDirection = 'row';
      li.style.marginLeft = '30px';
     
      li.onclick = () => {
        const {type} = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + 'px';
      boxSpan.style.display = 'inline-block';
      boxSpan.style.height = '20px';
      boxSpan.style.marginRight = '10px';
      boxSpan.style.width = '20px';

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  }
//tooltipHanle
 getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

externalTooltipHandler = (context) => {
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = this.getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = 0;

      const th = document.createElement('th');
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};
//tooltipHandle

  componentDidMount(){
    var ctx = document.getElementById('myChart');
    this.state.qChart = new Chart(ctx, {
    type: "line",   
    data: this.state.lineChartData, 
    options:this.state.config
  });
  this.setState({lineChartData: this.state.lineChartData });
  this.afterUpdate(this.state.qChart, this.state.config);
  
}

  
  render() { 
    
    return (
       
        <div>
          <div id="bieu-do">
            <div id="legend" className="d-flex justify-content-end px-5 "></div>  
            <div id="do-thi">
            <canvas id="myChart" ></canvas> 
            </div>
          </div>      
          <div className="row py-3 text-center ">
              <div className="col-4">
                  <button type="button" onClick= {this.addData} className="btn btn-success">Add data</button>
              </div>
              <div className="col-4">
                  <button type="button" onClick= {this.removeData}   className=" btn btn-danger"> Remove data</button>
              </div>
              <div className="col-4">
                  <button type="button" onClick= {this.addDataInterval}  className=" btn btn-warning">Add data interval</button>
              </div>

          </div>
        
		</div>
     
  )
  }
}

export default Chart_Quoc