function widget (element_id, sortBy) {
  sortBy = sortBy || 'gold';

  class MedalCount extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        mounted: 'Mounted with state!',
        medals: [{
           "code": "USA",
           "gold": 9,
           "silver": 7,
           "bronze": 12
         },
         {
           "code": "NOR",
           "gold": 11,
           "silver": 5,
           "bronze": 10
         },
         {
           "code": "RUS",
           "gold": 13,
           "silver": 11,
           "bronze": 9
         },
         {
           "code": "NED",
           "gold": 8,
           "silver": 7,
           "bronze": 9
         },
         {
           "code": "FRA",
           "gold": 4,
           "silver": 4,
           "bronze": 7
         },
         {
           "code": "SWE",
           "gold": 2,
           "silver": 7,
           "bronze": 6
         },
         {
           "code": "ITA",
           "gold": 0,
           "silver": 2,
           "bronze": 6
         },
         {
           "code": "CAN",
           "gold": 10,
           "silver": 10,
           "bronze": 5
         },
         {
           "code": "SUI",
           "gold": 6,
           "silver": 3,
           "bronze": 2
         },
         {
           "code": "BLR",
           "gold": 5,
           "silver": 0,
           "bronze": 1
         },
         {
           "code": "GER",
           "gold": 8,
           "silver": 6,
           "bronze": 5
         },
         {
           "code": "AUT",
           "gold": 4,
           "silver": 8,
           "bronze": 5
         },
         {
           "code": "CHN",
           "gold": 3,
           "silver": 4,
           "bronze": 2
         }
       ],
       sortBy: sortBy
      }
    }
    componentDidMount () {
      console.log(this.state.mounted);
      $.ajax({
        method: 'GET',
        url: 'http://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json',
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: (data) => {
          console.log('this is component did mount data: ', data);
          this.setState({
            medalCounts: data
          });
        },
        error: (err) => {
          console.log('get request error: ', err);
        }
      })
      this.calculateTotals();
      this.sortByMedal();

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
      medals.sort((a, b) => {
        return b[sorter] - a[sorter];
      })
      this.setState({medals: medals});
    }

    render() {
      return (
        <table className="responsive-table">
          <caption> Medal Count </caption>
          <thead>
            <tr>
            <th scope="col">Rank</th>
            <th scope="col">Flag</th>
            <th scope="col">Country</th>
            <th scope="col">Gold</th>
            <th scope="col">Silver</th>
            <th scope="col">Bronze</th>
            <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
          { this.state.medals.map((medal, i) => {
            if (i < 10) {
              return(
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td data-title="Flag">Flag Here</td>
                  <td data-title="Country">{this.state.medals[i].code}</td>
                  <td data-title="Gold">{this.state.medals[i].gold}</td>
                  <td data-title="Silver">{this.state.medals[i].silver}</td>
                  <td data-title="Bronze">{this.state.medals[i].bronze}</td>
                  <td data-title="Total">{this.state.medals[i].total}</td>
                </tr>
              )
            }

          })

          } }
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
