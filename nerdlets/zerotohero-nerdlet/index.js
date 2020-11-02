import React from 'react';
import { Grid, GridItem, HeadingText, PieChart, LineChart, BillboardChart, Icon } from 'nr1';
import Z2HIcon from './icon.png';

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
        const rows = appConfig.map((row, index)=>{
            console.log(`${index}: ${row.name} - ${row.likeClause}`)
            return <Grid key={index} className="ChartRow">
            <GridItem columnSpan={2}>
                <HeadingText tagType={HeadingText.TAG_TYPE.H2}>
                <Icon sizeType={Icon.SIZE_TYPE.LARGE} type={row.icon} /> {row.name}
                </HeadingText>
                <BillboardChart
                    accountId={accountId}
                    query={`select count(*) as 'Transactions' FROM Transaction where appName like '${row.likeClause}' SINCE 1 week ago`}
                    fullWidth
                />
            </GridItem>
            <GridItem columnSpan={5}>
                <PieChart
                    accountId={accountId}
                    query={`select count(*) as 'Transactions' FROM Transaction where appName like '${row.likeClause}' facet appName limit 100 SINCE 1 week ago`}
                    fullWidth
                    fullHeight
                />
            </GridItem>
            <GridItem columnSpan={5}>
                <LineChart
                    accountId={accountId}
                    query={`select count(*) as 'Transactions' FROM Transaction where appName like '${row.likeClause}' facet appName limit max timeseries SINCE 1 week ago`}
                    fullWidth
                    fullHeight
                />
            </GridItem>
        </Grid>
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
        </>;
    }
}
