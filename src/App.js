import logo from './logo.svg';
import './App.css';
import Chart_Quoc from './components/Chart_Quoc';
import TraCuu from './components/Tra_cuu';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { install } from "resize-observer";

if (typeof window !== "undefined") {
  install();
  }
  
  // if you don't use next.js, this should work
  
  install();
function App() {
  const myLongText = "Nhằm cung cấp cho bạn đầy đủ thông tin về giá trị quỹ trong cả hiện tại và quá khứ, bạn có thể tùy chọn thời điểm tra cứu  theo khung thời gian bạn muốn "
  return (    
    <div className="container bg-secondary" id="giao-dien" >
      <div className="container" id="giao-dien-con">     
      <div className="text-center">
        <h1 className="chu-mau-cam">TRA CỨU GIÁ ĐƠN VỊ</h1>
        <p id="xem-them-desktop">
        Nhằm cung cấp cho bạn đầy đủ thông tin về giá trị quỹ trong cả hiện tại 
        và quá khứ, bạn có thể tùy chọn thời điểm tra cứu theo khung thời gian bạn muốn
        </p>
        <div id = "xem-them-mobile">
        <ReactReadMoreReadLess 
                charLimit={70}
                readMoreText={"Xem thêm"}
                readLessText={"Read less ▲"}
            >
                {myLongText}
            </ReactReadMoreReadLess>
            </div>
      </div>
      <div >  
       
     <TraCuu/>
      <div className="py-5">  
     <Chart_Quoc/>
      </div>   
      </div> 
      </div>       
    </div>       
                 
        
  );
}

export default App;
