import React from 'react';
import { Grid, GridItem, HeadingText, Icon, PlatformStateContext } from 'nr1';
import Z2HIcon from './icon.png';
import ChartRow from '../../components/ChartRow/index'

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class ZerotoheroNerdletNerdlet extends React.Component {
    render() {
        const accountId=1951995
        const appName="My Application (Ruby)"
        const appConfig=[
            {
                name: "My Application (Ruby)",
                icon: Icon.TYPE.PROFILES__EVENTS__LIKE,
                likeClause: "%My Application%"
            },
            {
                name: "Proxies",
                icon: Icon.TYPE.HARDWARE_AND_SOFTWARE__SOFTWARE__DECISIONS,
                likeClause: "%Proxy%"
            },
            {
                name: "Services",
                icon: Icon.TYPE.HARDWARE_AND_SOFTWARE__SOFTWARE__CORRELATION_REASONING,
                likeClause: "%Service"
            }
        ]
        return <PlatformStateContext.Consumer>
            {(platformUrlState) => {
                console.debug("platformUrlState",platformUrlState)
                console.log("timeRange",platformUrlState.timeRange)
                let sinceClause = ""
                if(platformUrlState && platformUrlState.timeRange) {
                    if(platformUrlState.timeRange.duration) {
                        sinceClause = `since ${platformUrlState.timeRange.duration/1000/60} minutes ago`
                    } else if(platformUrlState.timeRange.begin_time && platformUrlState.timeRange.end_time){
                        sinceClause = `since ${platformUrlState.timeRange.begin_time} until ${platformUrlState.timeRange.end_time}`
                    }
                }
                const rows = appConfig.map((row, index)=>{
                    console.log(`${index}: ${row.name} - ${row.likeClause}`)
                    return <ChartRow key={index} row={row} accountId={accountId} sinceClause={sinceClause} uniqueId={index}/>
                })
                console.log("rows", rows)
                return <>
                    <Grid>
                        <GridItem columnSpan={1} className="AppIcon"><img src={Z2HIcon} alt="Zero to Hero" height="80"/></GridItem>
                        <GridItem columnSpan={11} >
                            <HeadingText
                                tagType={HeadingText.TAG_TYPE.H1}
                                className="MainHeading"
                            >
                                Zero to Hero!
                            </HeadingText>
                        </GridItem>
                    </Grid>
                    {rows}
                </>
            }}
        </PlatformStateContext.Consumer>
}}
