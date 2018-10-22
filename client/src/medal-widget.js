function widget (element_id, sortBy) {
  sortBy = sortBy || 'gold';

  class MedalCount extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        mounted: 'Mounted with state!',
        medals: [],
       sortBy: sortBy
      }
      this.handleSorterChange = this.handleSorterChange.bind(this);
    }
    componentDidMount () {
      console.log(this.state.mounted);
      $.ajax({
        method: 'GET',
        url: 'https://cors-escape.herokuapp.com/https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json',
        success: (data) => {
          console.log('data from ajax request', data);
          this.setState({
            medals: data
          }, () => {
            this.calculateTotals();
            this.sortByMedal();
          });
        },
        error: (err) => {
          console.log('get request error: ', err);
        }
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
      return (
        <table className="responsive-table">
          <caption> Medal Count </caption>
          <thead>
            <tr>
            <th scope="col">Rank</th>
            <th scope="col">Flag</th>
            <th scope="col" className="code">Country</th>
            <th scope="col" onClick={this.handleSorterChange}><div className="medal" id="gold"></div></th>
            <th scope="col" onClick={this.handleSorterChange}><div className="medal" id="silver"></div></th>
            <th scope="col" onClick={this.handleSorterChange}><div className="medal" id="bronze"></div></th>
            <th scope="col" id="total" onClick={this.handleSorterChange}>Total</th>
            </tr>
          </thead>
          <tbody>
          { this.state.medals.map((medal, i) => {
            if (i < 10) {
              return(
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td data-title="Flag"><div className="flag" id={medal.code.toLowerCase()}></div></td>
                  <td data-title="Country">{medal.code}</td>
                  <td data-title="Gold">{medal.gold}</td>
                  <td data-title="Silver">{medal.silver}</td>
                  <td data-title="Bronze">{medal.bronze}</td>
                  <td data-title="Total">{medal.total}</td>
                </tr>
              )
            }
          })

          }
          </tbody>
        </table>
      );
    }
  }
  ReactDOM.render(
    <MedalCount />,
    document.getElementById(element_id)
  );
};
