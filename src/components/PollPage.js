import React from 'react'
import Poll from './Poll'
function PollPage(props){
    return <Poll id={props.match.params.id} isFullContent={true} />
}

export default PollPage
