import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import historyImage from "../../res/images/history.jpeg"
import partnersImage from "../../res/images/google.png"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

function average(csv, header) {

    let sum = 0;

    for (let i = 0; i < csv.length; i++) {
        
        sum += csv[i][header] || 0

    }

    return sum / csv.length;

}

function sum(csv, header) {

    let sum = 0;

    for (let i = 0; i < csv.length; i++) {
        
        sum += csv[i][header] || 0

    }

    return sum;

}

function correlationCoefficient(X, Y)
{
     
    let n = Math.min(X.length, Y.length);
    let sum_X = 0, sum_Y = 0, sum_XY = 0;
    let squareSum_X = 0, squareSum_Y = 0;
    
    for(let i = 0; i < n; i++)
    {
         
        // Sum of elements of array X.
        sum_X = sum_X + X[i];
    
        // Sum of elements of array Y.
        sum_Y = sum_Y + Y[i];
    
        // Sum of X[i] * Y[i].
        sum_XY = sum_XY + X[i] * Y[i];
    
        // Sum of square of array elements.
        squareSum_X = squareSum_X + X[i] * X[i];
        squareSum_Y = squareSum_Y + Y[i] * Y[i];
    }
    
    // Use formula for calculating correlation
    // coefficient.
    return (n * sum_XY - sum_X * sum_Y)/
    (Math.sqrt((n * squareSum_X -
            sum_X * sum_X) *
               (n * squareSum_Y -
            sum_Y * sum_Y)));
}

function maxHeader(csv, headers) {

    const sums = {}

    for (let i = 0; i < csv.length; i++) {
        
        for (const header of headers) {

            sums[header] += csv[header]
            
        }

    }

    return Object.keys(sums).map(i => {

        return { key: i, value: sums[i] }

    }).sort((a, b) => a.value - b.value)[0].key

}

function ContactPage({location}) {

    const finances = require('../../../data/finances.json')

    const year = new Date().getFullYear()

    return (
        <Layout location={location} crumbLabel="Contact">
            <section>
                <div
                class="mx-auto max-w-screen-xl px-4 py-48 lg:flex  lg:items-center"
                >
                    <div class="mx-auto max-w-4xl text-center">
                        <h1 class="text-3xl font-extrabold sm:text-5xl">
                            Finances for GDT
                        </h1>
                        <p className="text-xl mt-4 mb-16 max-w-2xl">Learn about Georgetown Disruptive Tech's founding, history, operations, structure, finances, and more.</p>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-6xl mx-auto pb-16 px-4 flex gap-8 flex-col md:flex-row">
                    <div className="w-full md:w-2/3">
                        <h2 className="font-bold text-4xl mb-4">The State of GDT in {year}</h2>
                        <p className="mb-2 text-lg">
                            In {year} alone, GDT grew from an endowment of ${finances[0].endowment} to ${finances[finances.length - 1].carry}. This was realized through an 
                            average profit of ${Math.floor(average(finances, 'profit'))} per week during this period, or ${Math.floor(sum(finances, 'profit') / 12)} per 
                            month. Our main source of revenue was {maxHeader(finances, [ "donations", 'grants', 'general_revenue', 'product_revenue' ])}.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 text-slate-800">
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto pb-16 px-4">
                <Line 
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'GDT Endowment',
                                    },
                                    legend: {
                                        display: false
                                    },
                                },
                            }}
                            data={{
                                labels: finances.map(i => i.date),
                                datasets: [
                                {
                                    fill: true,
                                    label: 'GDT Endowment',
                                    data: finances.map(i => i.endowment),
                                    borderColor: 'rgb(53, 162, 235)',
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                },
                                ],
                            }} />
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto pb-16 px-4 flex gap-8 flex-col md:flex-row">
                    <div className="w-full md:w-1/3 text-slate-800">
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="font-bold text-4xl mb-4">Profits, Costs, and Revenue</h2>
                        <p className="mb-2 text-lg">
                        </p>
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto pb-16 px-4">
                    <Line 
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Balance Sheet',
                                },
                                legend: {
                                    display: true
                                },
                            },
                        }}
                        data={{
                            labels: finances.map(i => i.date),
                            datasets: [
                                {
                                    fill: true,
                                    label: 'Profit',
                                    data: finances.map(i => i.profit),
                                    borderColor: 'rgb(53, 162, 235)',
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                },
                                {
                                    fill: true,
                                    label: 'Revenue',
                                    data: finances.map(i => i.total_revenue),
                                    borderColor: 'rgb(162, 235, 53)',
                                    backgroundColor: 'rgba(162, 235, 53, 0.5)',
                                },
                                {
                                    fill: true,
                                    label: 'Costs',
                                    data: finances.map(i => i.total_cost),
                                    borderColor: 'rgb(235, 53, 162)',
                                    backgroundColor: 'rgba(235, 53, 162, 0.5)',
                                },
                            ],
                        }} />
                </div>
            </section>
        </Layout>
    )
}

export const Head = () => <Seo title="Finances for GDT"  />

export default ContactPage
