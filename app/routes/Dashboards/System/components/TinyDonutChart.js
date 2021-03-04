import React from 'react';
import PropTypes from 'prop-types';
import {  
    PieChart, 
    Pie,
    Cell
} from './../../../../components/recharts';

import colors from './../../../../colors';

const TinyDonutChart = (props) => {
    const data = [
        {name: 'Group A', value: props.percent !== undefined ? parseInt(props.percent) : 0},
        {name: 'Group B', value: props.percent !== undefined ? 100 - parseInt(props.percent) : 0}
    ];
    
    return (
        <PieChart width={ 80 } height={ 80 }>
            <Pie
                data={data}
                dataKey="value"
                stroke={ colors[ props.strokeColor ] }
                innerRadius={ 28 }
                outerRadius={ 35 } 
                fill={ colors[ props.pieBg ] }
            >
            <Cell fill={ colors[ props.pieColor ] } />
            </Pie>
        </PieChart>
    )
};

TinyDonutChart.propTypes = {
    pieColor: PropTypes.string,
    strokeColor: PropTypes.string,
    pieBg: PropTypes.string
};
TinyDonutChart.defaultProps = {
    pieColor: "primary",
    strokeColor: "white",
    pieBg: "200"
};

export { TinyDonutChart };
