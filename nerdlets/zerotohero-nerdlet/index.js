
import React from 'react';
import { Grid, GridItem, HeadingText, Icon, PlatformStateContext, Checkbox } from 'nr1';
import Z2HIcon from './icon.png';
import ChartRow from '../../components/ChartRow/index';
import MultiChart from '../../components/MultiChart';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class ZerotoheroNerdletNerdlet extends React.Component {
    constructor(props) {
        super(props)
        this.state = { slowOnly: true }
    }
    render() {
        const accountId="<ACCOUNT ID>"
        const appConfig=[
            {
                name: "Test Data",
                icon: Icon.TYPE.PROFILES__EVENTS__LIKE,
                likeClause: "%<APPLICATION NAME/PATTERN>%"
            },
            {
                name: "Proxies",
                icon: Icon.TYPE.HARDWARE_AND_SOFTWARE__SOFTWARE__DECISIONS,
                likeClause: "%<PROXY NAME/PATTERN>%"
            },
            {
                name: "Services",
                icon: Icon.TYPE.HARDWARE_AND_SOFTWARE__SOFTWARE__CORRELATION_REASONING,
                likeClause: "%<SERVICE NAME/PATTERN>%"
            }
        ]

        return <PlatformStateContext.Consumer>
            {(platformUrlState) => {
                const {slowOnly} = this.state
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
                    return <ChartRow key={index} row={row} accountId={accountId} sinceClause={sinceClause} uniqueId={index} duration={slowOnly ? 0.5 : 0}/>
                })
                
                const slowToggle = (event) => {
                    this.setState({ slowOnly: event.target.checked})
                }

                return <>
                    <Grid>
                        <GridItem columnSpan={1} className="AppIcon"><img src={Z2HIcon} alt="Zero to Hero" height="80"/></GridItem>
                        <GridItem columnSpan={8} >
                            <HeadingText
                                tagType={HeadingText.TAG_TYPE.H1}
                                className="MainHeading"
                            >
                                Zero to Hero!
                            </HeadingText>
                        </GridItem>
                        <GridItem columnSpan={3}>
                            <Checkbox onChange={slowToggle} defaultChecked={slowOnly} label='Slow transactions only' />
                        </GridItem>
                    </Grid>
                    <Grid className="MultiChartRow">
                        <GridItem columnSpan={12}>
                            <MultiChart accountId={accountId} sinceClause={sinceClause}/>
                        </GridItem>
                    </Grid>
                    {rows}
                </>
            }}
        </PlatformStateContext.Consumer>
}}
