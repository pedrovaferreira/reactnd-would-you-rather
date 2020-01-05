import React from 'react'

function Statistics(props){

    const { values } = props;
    const [ valueA, valueB ] = values;
    const notAnswered = valueA + valueB === 0;

    if(notAnswered) 
        return (
            <div className="bar">
                <div className="not-answers">
                    <div>No answers yet </div>
                </div>
            </div>
        )

    const calcPercent = Math.floor((valueA / (valueA + valueB )) * 100);
    const percent = Math.min(Math.max(calcPercent, 10), 90)
    const statisticsA = calcPercent;
    const statisticsB = 100 - calcPercent;
    return (
        <div className="bar">
            <div className="vote" style={{ width : `${percent}%`}}>
                <div>{valueA} ({statisticsA}%)</div>
            </div>
            <div className="vote">
                <div>{valueB} ({statisticsB}%)</div>
            </div>
        </div>
    )
}

export default Statistics;