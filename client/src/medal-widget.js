function widget(element_id, sortBy) {
  sortBy = sortBy || 'gold';

  class MedalCount extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        medals: [],
        sortBy: this.props.sortBy,
        error: ''
      };
      this.handleSorterChange = this.handleSorterChange.bind(this);
    }
    componentDidMount() {
      fetch(
        'https://cors-anywhere.herokuapp.com/https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json',
        {
          method: 'get'
        }
      )
        .then(response => response.json())
        .then(data =>
          this.setState(
            {
              medals: data,
              error: ''
            },
            () => {
              this.calculateTotals();
            }
          )
        )
        .catch(err => {
          console.log('Error in fetching medal data', err);
          this.setState({ error: 'Unable to load Medal data' });
        });
    }
    componentDidUpdate(prevProps, prevState) {
      if(prevState.sortBy !== this.state.sortBy) {
        this.sortByMedal();
      }
    }
    calculateTotals() {
      this.setState((prevState, props) => {
        let medals = prevState.medals;
        medals.forEach(medal => {
          medal.total = medal.gold + medal.bronze + medal.silver;
        });
        return {medals: medals}
      }, this.sortByMedal);
    }
    sortByMedal() {
      this.setState((prevState, props) => {
        let medals = prevState.medals;
        let sorter = prevState.sortBy;
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
        });
        return {medals:medals};
      });
    }
    handleSorterChange(e) {
      const newSorter = e.target.id;
      this.setState({ sortBy: newSorter });
    }

    render() {
      const err = this.state.error || null;
      return (
        <div>
          <table className="container">
            <caption> MEDAL COUNT </caption>
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col" />
                <th scope="col" className="code" />
                <th
                  scope="col"
                  className={this.state.sortBy === 'gold' ? 'active' : ''}
                >
                  <div
                    className="medal"
                    id="gold"
                    onClick={this.handleSorterChange}
                  />
                </th>
                <th
                  scope="col"
                  className={this.state.sortBy === 'silver' ? 'active' : ''}
                >
                  <div
                    className="medal"
                    id="silver"
                    onClick={this.handleSorterChange}
                  />
                </th>
                <th
                  scope="col"
                  className={this.state.sortBy === 'bronze' ? 'active' : ''}
                >
                  <div
                    className="medal"
                    id="bronze"
                    onClick={this.handleSorterChange}
                  />
                </th>
                <th
                  scope="col"
                  className={this.state.sortBy === 'total' ? 'active' : ''}
                >
                  <div id="total" onClick={this.handleSorterChange}>
                    TOTAL
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.medals.map((medal, i) => {
                if (i < 10) {
                  return (
                    <tr>
                      <td scope="row">{i + 1}</td>
                      <td data-title="Flag">
                        <div className="flag" id={medal.code.toLowerCase()} />
                      </td>
                      <td data-title="Country">
                        <div className="code">{medal.code}</div>
                      </td>
                      <td data-title="Gold">
                        <div className="count">{medal.gold}</div>
                      </td>
                      <td data-title="Silver">
                        <div className="count">{medal.silver}</div>
                      </td>
                      <td data-title="Bronze">
                        <div className="count">{medal.bronze}</div>
                      </td>
                      <td data-title="Total">
                        <div className="total">{medal.total}</div>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <div>{err}</div>
        </div>
      );
    }
  }
  ReactDOM.render(<MedalCount sortBy={sortBy} />, document.getElementById(element_id));
}
