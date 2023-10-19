import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ data, options }) {
    return (
        <div className="chart-container">
            {/* <h2 style={{ textAlign: "center" }}>Line Chart</h2> */}
            <Line
                data={data}
                options={options}
                style={{height:"100vh",width:"97%",margin:"auto"}}
            />
        </div>
    );
}
export default LineChart;