import React from "react";

import "../../assets/css/crosstable.css";

class CrossTable extends React.Component {

    render() {
        return(<table>
            <tr>
                <th rowSpan={2} colSpan={2}></th>
                <th colSpan={this.props.entries.length}>{this.props.columnHeading}</th>
            </tr>
            <tr>
                {this.props.entries.map((entry, i) => (
                    <th key={i}>{entry.heading}</th>
                ))}
            </tr>
            {this.props.entries.map((entry, i) => (
                <tr key={i}>
                    {i === 0 ? <th rowSpan={this.props.entries.length} className="rowHeading">{this.props.rowHeading}</th> : null}
                    <th>{entry.heading}</th>
                    {entry.scores.map((score, j) => (
                        <td key={j} style={{textAlign: "center"}} className={i === j ? 'crossCell' : 'normalCell'}>{score}</td>
                    ))}
                </tr>
            ))}
        </table>)
    }
}

export default CrossTable;