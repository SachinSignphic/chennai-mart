import { LineChart } from "@mui/x-charts";
import Button from "./ui/Button";
import { useState } from "react";

const xAxisGraphData = [
    {
        type: "MONTHLY",
        data: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
        ],
        series: Array.from(
            { length: 12 },
            () => Math.floor(Math.random() * (1000 - 300 + 1)) + 300
        ),
    },
    {
        type: "WEEKLY",
        data: Array.from({ length: 52 }, (_, i) => i + 1),
        series: Array.from(
            { length: 52 },
            () => Math.floor(Math.random() * (1000 - 300 + 1)) + 300
        ),
    },
    {
        type: "YEARLY",
        data: [2023, 2024, 2025, 2026],
        series: Array.from(
            { length: 4 },
            () => Math.floor(Math.random() * (10000 - 16300 + 1)) + 300
        ),
    },
];

const DashboardLineGraph = () => {
    const [timeLine, setTimeLine] = useState(0);

    return (
        <div className='shadow-md bg-white p-8 rounded-md w-full'>
            <div className="flex justify-between gap-2">
                <h3 className="font-poppins-600 text-tertiary text-xl mr-auto">SALES GRAPH</h3>
                {
                    xAxisGraphData.map((btn, i) => <Button label={btn.type} isActive={xAxisGraphData[timeLine].type == btn.type} key={btn.type} onClick={() => setTimeLine(i)} />)
                }
            </div>
            <LineChart
                xAxis={[
                    {
                        data: xAxisGraphData[timeLine].data,
                        scaleType: "point",
                    },
                ]}
                series={[
                    {
                        data: xAxisGraphData[timeLine].series,
                        label: "Orders "
                    },
                ]}
                //   width={500}
                slotProps={{
                    legend: {
                        hidden: true
                    }
                }}
                height={300}
            />
        </div>
    );
};

export default DashboardLineGraph;
