var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function widget(element_id, sortBy) {
  sortBy = sortBy || 'gold';

  var MedalCount = function (_React$Component) {
    _inherits(MedalCount, _React$Component);

    function MedalCount(props) {
      _classCallCheck(this, MedalCount);

      var _this = _possibleConstructorReturn(this, (MedalCount.__proto__ || Object.getPrototypeOf(MedalCount)).call(this, props));

      _this.state = {
        mounted: 'Mounted with state!',
        medals: [{
          "code": "USA",
          "gold": 9,
          "silver": 7,
          "bronze": 12
        }, {
          "code": "NOR",
          "gold": 11,
          "silver": 5,
          "bronze": 10
        }, {
          "code": "RUS",
          "gold": 13,
          "silver": 11,
          "bronze": 9
        }, {
          "code": "NED",
          "gold": 8,
          "silver": 7,
          "bronze": 9
        }, {
          "code": "FRA",
          "gold": 4,
          "silver": 4,
          "bronze": 7
        }, {
          "code": "SWE",
          "gold": 2,
          "silver": 7,
          "bronze": 6
        }, {
          "code": "ITA",
          "gold": 0,
          "silver": 2,
          "bronze": 6
        }, {
          "code": "CAN",
          "gold": 10,
          "silver": 10,
          "bronze": 5
        }, {
          "code": "SUI",
          "gold": 6,
          "silver": 3,
          "bronze": 2
        }, {
          "code": "BLR",
          "gold": 5,
          "silver": 0,
          "bronze": 1
        }, {
          "code": "GER",
          "gold": 8,
          "silver": 6,
          "bronze": 5
        }, {
          "code": "AUT",
          "gold": 4,
          "silver": 8,
          "bronze": 5
        }, {
          "code": "CHN",
          "gold": 3,
          "silver": 4,
          "bronze": 2
        }],
        sortBy: sortBy
      };
      return _this;
    }

    _createClass(MedalCount, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        console.log(this.state.mounted);
        $.ajax({
          method: 'GET',
          url: 'http://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json',
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function success(data) {
            console.log('this is component did mount data: ', data);
            _this2.setState({
              medalCounts: data
            });
          },
          error: function error(err) {
            console.log('get request error: ', err);
          }
        });
        this.calculateTotals();
        this.sortByMedal();
      }
    }, {
      key: 'calculateTotals',
      value: function calculateTotals() {
        var medals = this.state.medals;
        medals.forEach(function (medal) {
          medal.total = medal.gold + medal.bronze + medal.silver;
        });
        this.setState({ medals: medals });
      }
    }, {
      key: 'sortByMedal',
      value: function sortByMedal() {
        var medals = this.state.medals;
        var sorter = this.state.sortBy;
        medals.sort(function (a, b) {
          return b[sorter] - a[sorter];
        });
        this.setState({ medals: medals });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        return React.createElement(
          'table',
          { className: 'responsive-table' },
          React.createElement(
            'caption',
            null,
            ' Medal Count '
          ),
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                { scope: 'col' },
                'Rank'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Flag'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Country'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Gold'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Silver'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Bronze'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Total'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            this.state.medals.map(function (medal, i) {
              if (i < 10) {
                return React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'th',
                    { scope: 'row' },
                    i + 1
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Flag' },
                    'Flag Here'
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Country' },
                    _this3.state.medals[i].code
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Gold' },
                    _this3.state.medals[i].gold
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Silver' },
                    _this3.state.medals[i].silver
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Bronze' },
                    _this3.state.medals[i].bronze
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Total' },
                    _this3.state.medals[i].total
                  )
                );
              }
            }),
            ' }'
          )
        );
      }
    }]);

    return MedalCount;
  }(React.Component);

  ReactDOM.render(React.createElement(MedalCount, null), document.getElementById(element_id));
};