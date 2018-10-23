function widget (element_id, sortBy) {
  sortBy = sortBy || 'gold';

  class MedalCount extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        medals: [],
       sortBy: sortBy,
       error: ''
      }
      this.handleSorterChange = this.handleSorterChange.bind(this);
    }
    componentDidMount () {
      fetch('https://cors-anywhere.herokuapp.com/https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json', {
        method: 'get'
      })
      .then(response => response.json())
      .then(data => this.setState({
            medals: data,
            error: ''
          }, () => {
            this.calculateTotals();
            this.sortByMedal();
          }))
      .catch(err => {
        console.log('Error in fetching medal data', err);
        this.setState({error: 'Unable to load Medal data'})

      })
    }
    calculateTotals () {
      let medals = this.state.medals
      medals.forEach(medal => {
        medal.total = medal.gold + medal.bronze + medal.silver;
      })
      this.setState({medals: medals});
    }
    sortByMedal () {
      let medals = this.state.medals;
      let sorter = this.state.sortBy;
      let tiebreaker = 'gold';
      if (sorter === 'gold') {
        tiebreaker = 'silver';
      }
      medals.sort((a, b) => {

          if (a[sorter] > b[sorter]) {
            return -1;
          }
          if (a[sorter] < b[sorter]) {
            return 1;
          }
          if (a[tiebreaker] > b[tiebreaker]) {
            return -1;
          }
          if (a[tiebreaker] < b[tiebreaker]) {
            return 1;
          }
          return 0;
        })

      this.setState({medals: medals});

    }
    handleSorterChange (e) {
      const newSorter = e.target.id;
      console.log(newSorter);
      this.setState({sortBy: newSorter}, this.sortByMedal);

    }

    render() {
      const err = this.state.error || null;
      return (
        <div>
        <table className="tableContainer">
          <caption> MEDAL COUNT </caption>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col" className="code"></th>
              <th scope="col" className={this.state.sortBy === 'gold' ? 'active' : ''}><div className="medal" id="gold" onClick={this.handleSorterChange}></div></th>
              <th scope="col" className={this.state.sortBy === 'silver' ? 'active' : ''}><div className="medal" id="silver" onClick={this.handleSorterChange}></div></th>
              <th scope="col" className={this.state.sortBy === 'bronze' ? 'active' : ''}><div className="medal" id="bronze" onClick={this.handleSorterChange}></div></th>
              <th scope="col"  className={this.state.sortBy === 'total' ? 'active' : ''}><div id="total" onClick={this.handleSorterChange}>TOTAL</div></th>
            </tr>
          </thead>
          <tbody>
          { this.state.medals.map((medal, i) => {
            if (i < 10) {
              return(
                <tr>
                  <td scope="row">{i + 1}</td>
                  <td data-title="Flag"><div className="flag" id={medal.code.toLowerCase()}></div></td>
                  <td data-title="Country"><div className="code">{medal.code}</div></td>
                  <td data-title="Gold" className="count"><div>{medal.gold}</div></td>
                  <td data-title="Silver" className="count"><div>{medal.silver}</div></td>
                  <td data-title="Bronze" className="count"><div>{medal.bronze}</div></td>
                  <td data-title="Total"><div className="total">{medal.total}</div></td>
                </tr>

              )
            }
          })

          }
          </tbody>
        </table>
        <div>{this.state.error}</div>
        </div>
      );
    }
  }
  ReactDOM.render(
    <MedalCount />,
    document.getElementById(element_id)
  );
};
