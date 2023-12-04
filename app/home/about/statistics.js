import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import historyImage from "../../res/images/history.jpeg"
import partnersImage from "../../res/images/google.png"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

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

function ContactPage({location}) {

    const members = require('../../../data/team.json')

    let heHim = 0;
    let sheHer = 0;
    let theyTheir = 0;

    let sheHerTech = 27.6;
    let theyTheirTech = 1.10833333;
    let heHimTech = 100 - sheHerTech - theyTheirTech;

    let sheHerGeorgetown = 56;
    let heHimGeorgetown = 44;
    let theyTheirGeorgetown = 0;

    let sfsCount = 0;
    let msbCount = 0;
    let collegeCount = 0;
    let nursingCount = 0;
    let healthCount = 0;

    members.forEach(i => {

        if (i.gender == 'M') heHim++;
        if (i.gender == 'F') sheHer++;
        if (i.gender == 'O') theyTheir++;

        if (i.school == "MSB") msbCount++;
        if (i.school == "College") collegeCount++;
        if (i.school == "SFS") sfsCount++;
        if (i.school == "Nursing") nursingCount++;
        if (i.school == "Health") healthCount++;

    })

    let techCorrelation = correlationCoefficient([ heHim, sheHer, theyTheir ], [ heHimTech, sheHerTech, theyTheirTech ]);
    let sheHerPercent = (sheHer / (sheHer + heHim + theyTheir)) * 100;

    let genderDistance = Math.abs(sheHerPercent - 50) - Math.abs(sheHerGeorgetown - 50);

    let msbPercent = msbCount / (msbCount + collegeCount + sfsCount + nursingCount + healthCount)
    let collegePercent = collegeCount / (msbCount + collegeCount + sfsCount + nursingCount + healthCount)
    let sfsPercent = sfsCount / (msbCount + collegeCount + sfsCount + nursingCount + healthCount)

    return (
        <Layout location={location} crumbLabel="Contact">
            <section>
                <div
                class="mx-auto max-w-screen-xl px-4 py-48 lg:flex  lg:items-center"
                >
                    <div class="mx-auto max-w-4xl text-center">
                        <h1 class="text-3xl font-extrabold sm:text-5xl">
                            Statistics About GDT
                        </h1>
                        <p className="text-xl mt-4 mb-16 max-w-2xl">Learn about Georgetown Disruptive Tech's founding, history, operations, structure, finances, and more.</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto pb-16 px-4 flex gap-8 flex-col md:flex-row">
                    <div className="w-full md:w-1/3 text-slate-200">
                        <Pie data={{
                            labels: ['He/Him', 'She/Her', 'They/Their'],
                            datasets: [
                                {
                                    label: 'Number of Members',
                                    data: [heHim, sheHer, theyTheir],
                                    backgroundColor: [
                                        'rgba(54, 162, 235, 0.6)',
                                        'rgba(255, 99, 132, 0.6)',
                                        'rgba(132, 132, 132, 0.6)',
                                    ],
                                    borderWidth: 0,
                                },
                            ],
                        }} />
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="font-bold text-4xl mb-4">Gender Diversity at GDT</h2>
                        <p className="mb-2 text-lg">
                            Georgetown Disruptive Tech is one of the most gender-diverse technology clubs in the industry. Our 
                            data has a correlation of {Math.floor(techCorrelation * 100)}% to the tech industry, because we have {sheHerPercent}% women,
                            whereas the tech industry sits at {sheHerTech}%.
                        </p>
                        <p className="mb-2 text-lg">
                            Compared to Georgetown University, we still have a way to go. At last estimate, Georgetown has {sheHerGeorgetown}% female representation
                            from its undergraduate students. In comparison, our {sheHerPercent}% is {genderDistance}% further from 50% than Georgetown, and
                            we have made a commitment to fix that.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-32">
                <div className="max-w-6xl mx-auto pb-16 px-4 flex gap-8 flex-col-reverse md:flex-row">
                    <div className="w-full md:w-2/3">
                        <h2 className="font-bold text-4xl mb-4">Variety of Viewpoints</h2>
                        <p className="mb-2 text-lg">
                            Georgetown Disruptive Tech is made up of a number of different schools, majors, and viewpoints. Our distribution in schools 
                            closely mirrors that of the greater Georgetown student body. 
                        </p>
                        <p className="mb-2 text-lg">
                            In short, we have {collegePercent * 100}% representation from the college, {msbPercent * 100}% from the MSB, and 
                            {sfsPercent * 100}% from the SFS. Our leadership closely reflects these percentages, as we think it is important that
                            everyone is properly represented at GDT.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 text-slate-200">
                        <Pie data={{
                            labels: ['College', 'MSB', 'SFS', "Health", "Nursing"],
                            datasets: [
                                {
                                    label: 'Number of Members',
                                    data: [collegeCount, msbCount, sfsCount, healthCount, nursingCount],
                                    backgroundColor: [
                                        'rgb(17, 138, 178, 0.6)',
                                        'rgb(239, 71, 111, 0.6)',
                                        'rgb(255, 209, 102, 0.6)',
                                        'rgb(6, 214, 160, 0.6)',
                                        'rgb(66, 72, 116, 0.6)',
                                    ],
                                    borderWidth: 0,
                                },
                            ],
                        }} />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const Head = () => <Seo title="Statistics About GDT"  />

export default ContactPage
