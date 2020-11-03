import { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner, NerdGraphQuery, LineChart } from 'nr1';

export default class MultiChart extends Component {
    static propTypes = {
        accountId: PropTypes.number.isRequired,
        sinceClause: PropTypes.string
     }
    
    constructor(props) {
        super(props)
        this.state = { data:null }
    }
    
    async componentDidMount() {
        this.loadData()
    }
    
    loadData() {
        const { accountId, sinceClause } = this.props
        const variables = {
            id: accountId
        }
    
        let query = `
            query($id: Int!) {
                actor {
                    account(id: $id) {
                        server: nrql(query: "SELECT count(*) as 'transactions' from Transaction where appName='wordpree-test-data' timeseries ${sinceClause}") {results}
                        browser: nrql(query: "select count(*) as 'pageViews' FROM PageView where appName='wordpree-test-data' timeseries ${sinceClause}") {results}
                    }
                }
            }
        `
        const q = NerdGraphQuery.query({ query: query, variables: variables });
        console.log(q)
        let formattedData = []
        q.then(results => {
            formattedData.push( results.data.actor.account.server.results.map((datapoint) => {
                return {
                    x: datapoint.endTimeSeconds*1000,
                    y: datapoint.transactions
                }
            }))
            formattedData.push( results.data.actor.account.browser.results.map((datapoint) => {
                return {
                    x: datapoint.endTimeSeconds*1000,
                    y: datapoint.pageViews
                }
            }))
            this.setState({ data: formattedData })
        }).catch((error) => { console.log(error); })
    }
    render() {
        const { data } = this.state
        let returnVal = <Spinner />
        if(data) {
            returnVal=<div>Multichart goes here</div>
        }
        return returnVal
    }
}