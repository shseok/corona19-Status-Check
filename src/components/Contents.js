import { useState, useEffect } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
 
const Contents = () => {

    const optionsBar = {
        plugins: {
            title: { display: true, text: "누적 확진자 추이", font: { size: 17 }},
            legend: { display: true, position: "bottom" },
        },
    };
    const optionsLine = {
        plugins: {
            title: { display: true, text:"월별 격리자 현황", font: { size: 17 } },
            legend: { display: true, labels: { fontColor: "black" }, position: "bottom"},
        },
    };
    const optionsDoughnut = {
        plugins: {
            title: { display: true, text:`누적 확진, 해제, 사망(${(new Date()).getFullYear()-1}/${(new Date()).getMonth()+1}월)`, font: { size: 17 } },
            legend: { display: true, labels: { fontColor: "black" }, position: "bottom" },
        },
    };
    const optionsNewDoughnut = {
        plugins: {
            title: { display: true, text:`누적 확진, 해제, 사망(${(new Date()).getFullYear()}/${(new Date()).getMonth()+1}월)`, font: { size: 17 } },
            legend: { display: true, labels: { fontColor: "black" }, position: "bottom" },
        },
    };


    const [confirmedData, setConfirmedData] = useState({});
    const [quarantinedData, setQuarantinedData] = useState({});
    const [comparedData, setComparedData] = useState({});
    const [comparedData2021, setComparedData2021] = useState({});

    useEffect(() => { // class에서 mount되었을 때 -> 바로 method를 실행하는 효과
        
        const fetchEvents = async () => {
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr").catch(e => console.log(e));
            makeDate(res.data);
        }
        const makeDate = (items) => {
            const arr = items.reduce((acc, cur) => {
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();
                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const death = cur.Deaths;
                const recovered = cur.Recovered;

                // console.log(cur);
                const findItem = acc.find(a => a.year === year && a.month === month);
                
                if (!findItem) {
                    acc.push({ year, month, date, confirmed, active, death, recovered });
                }
                if (findItem && findItem.date < date) {
                    findItem.active = active;
                    findItem.death = death;
                    findItem.date = date;
                    findItem.year = year;
                    findItem.month = month;
                    findItem.recovered = recovered;
                    findItem.confirmed = confirmed;
                }
                // console.log(acc);
                return acc;
            }, [])
            // console.log(arr);

            const labels = arr.filter(a => a.year === 2020).map(a => `${a.month + 1}월`)
            setConfirmedData({
                labels : labels, // labels로 축약해서 써도 된다.
                datasets: [
                    {
                        label: "2020 국내 누적 확진자",
                        backgroundColor: "salmon",
                        borderColor: "salmon",
                        fill: true,
                        data: arr.filter(a => a.year === 2020).map(a => a.confirmed)
                    },{
                        label: "2021 국내 누적 확진자",
                        backgroundColor: "skyblue",
                        fill: true,
                        data: arr.filter(a => a.year === 2021).map(a => a.confirmed)
                    },
                ]
            });
            setQuarantinedData({
                labels : labels,
                datasets: [
                    {
                        label: "2020 월별 격리자 현황",
                        borderColor: "salmon",
                        fill: false,
                        data: arr.filter(a => a.year === 2020).map(a => a.active)
                    },
                    {
                        label: "2021 월별 격리자 현황",
                        borderColor: "skyblue",
                        fill: false,
                        data: arr.filter(a => a.year === 2021).map(a => a.active)
                    },
                ]
            });
            const last = arr.filter(a => a.year === 2020 && a.month === 11);
            setComparedData({
                labels : ["확진자", "격리해제", "사망"],
                datasets: [
                    {
                        label: "누적 확진, 해제, 사망 비율",
                        backgroundColor: ["#ff3d67", "#059bff", "#ffc233"],
                        borderColor: ["#ff3d67", "#059bff", "#ffc233"],
                        fill: false,
                        data: [last[0].confirmed, last[0].recovered, last[0].death]
                    },
                ]
            });
            const last2021 = arr[arr.length - 2];
            console.log(arr.filter(a => a.year === 2021).map(a => a.active));
            setComparedData2021({
                labels : ["확진자", "격리해제", "사망"],
                datasets: [
                    {
                        label: "누적 확진, 해제, 사망 비율",
                        backgroundColor: ["#ff3d67", "#059bff", "#ffc233"],
                        borderColor: ["#ff3d67", "#059bff", "#ffc233"],
                        fill: false,
                        data: [last2021.confirmed, last2021.recovered, last2021.death]
                    },
                ]
            });
        }

        fetchEvents();
    }, []) // 반드시 []처리를 해줘야한다. 

    return (
        <section>
            <h2>국내 코로나 현황</h2>
                <div className="contents">
                    <div className="bar">
                        <Bar data={confirmedData} options={optionsBar} />
                    </div>
                    <div className="line">
                        <Line data={quarantinedData} options={optionsLine} />
                </div>
                    <div className="doughnut1">
                        <Doughnut data={comparedData} options={optionsDoughnut} />
                </div>
                    <div className="doughnut2">
                        <Doughnut data={comparedData2021} options={optionsNewDoughnut} />
                    </div>
                </div>
{/*             
                <div className="contents2">
                    
                </div> */}
        </section>
    )
}

export default Contents
