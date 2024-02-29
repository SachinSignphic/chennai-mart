import { LineChart } from "@mui/x-charts"

const DashboardLineGraph = () => {
  return (
      <div className="shadow-md bg-white p-8 rounded-md w-full">
          <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                  {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
              ]}
            //   width={500}
              height={300}
          />
      </div>
  );
}

export default DashboardLineGraph