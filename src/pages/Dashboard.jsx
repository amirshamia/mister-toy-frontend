

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { BasicAccordion } from '../cmp/BasicAccordion';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
    const [labelsCount, setLabelsCount] = useState()
    const [labelsPrices, setLabelsPrices] = useState()

    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    useEffect(() => {
        toyService.getLabelsCount().then(setLabelsCount)
        toyService.getLabelsPrices().then(setLabelsPrices)
    }, [])

    const dataLabels = {
        labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'],
        datasets: [
            {
                label: '# of Votes',
                data: labelsCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(200, 159, 64, 0.2)',
                    'rgba(12, 180, 64, 0.2)',
                    'rgba(155, 179, 64, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(200, 159, 64, 1)',
                    'rgba(12, 180, 64, 1)',
                    'rgba(155, 179, 64, 1)',

                ],
                borderWidth: 1,
            },
        ],
    };
    const data = {
        labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'],
        datasets: [
            {
                label: 'Prices',
                data: labelsPrices,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    if (!labelsCount) return <div>loading</div>
    return (
        <>
            <section className='flex justify-center charts-container'>
                <article >
                    <Doughnut data={dataLabels} />
                </article>
                <article>
                    <Bar data={data} />
                </article>
            </section>
            <BasicAccordion />
        </>

    )
}
