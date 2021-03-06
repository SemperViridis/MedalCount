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
        medals: [],
        sortBy: _this.props.sortBy,
        error: ''
      };
      _this.handleSorterChange = _this.handleSorterChange.bind(_this);
      return _this;
    }

    _createClass(MedalCount, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        fetch('https://cors-anywhere.herokuapp.com/https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json', {
          method: 'get'
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          return _this2.setState({
            medals: data,
            error: ''
          }, function () {
            _this2.calculateTotals();
          });
        }).catch(function (err) {
          console.log('Error in fetching medal data', err);
          _this2.setState({ error: 'Unable to load Medal data' });
        });
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevState.sortBy !== this.state.sortBy) {
          this.sortByMedal();
        }
      }
    }, {
      key: 'calculateTotals',
      value: function calculateTotals() {
        this.setState(function (prevState, props) {
          var medals = prevState.medals;
          medals.forEach(function (medal) {
            medal.total = medal.gold + medal.bronze + medal.silver;
          });
          return { medals: medals };
        }, this.sortByMedal);
      }
    }, {
      key: 'sortByMedal',
      value: function sortByMedal() {
        this.setState(function (prevState, props) {
          var medals = prevState.medals;
          var sorter = prevState.sortBy;
          var tiebreaker = 'gold';
          if (sorter === 'gold') {
            tiebreaker = 'silver';
          }
          medals.sort(function (a, b) {
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
          return { medals: medals };
        });
      }
    }, {
      key: 'handleSorterChange',
      value: function handleSorterChange(e) {
        var newSorter = e.target.id;
        this.setState({ sortBy: newSorter });
      }
    }, {
      key: 'render',
      value: function render() {
        var err = this.state.error || null;
        return React.createElement(
          'div',
          null,
          React.createElement(
            'table',
            { className: 'container' },
            React.createElement(
              'caption',
              null,
              ' MEDAL COUNT '
            ),
            React.createElement(
              'thead',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement('th', { scope: 'col' }),
                React.createElement('th', { scope: 'col' }),
                React.createElement('th', { scope: 'col', className: 'code' }),
                React.createElement(
                  'th',
                  {
                    scope: 'col',
                    className: this.state.sortBy === 'gold' ? 'active' : ''
                  },
                  React.createElement('div', {
                    className: 'medal',
                    id: 'gold',
                    onClick: this.handleSorterChange
                  })
                ),
                React.createElement(
                  'th',
                  {
                    scope: 'col',
                    className: this.state.sortBy === 'silver' ? 'active' : ''
                  },
                  React.createElement('div', {
                    className: 'medal',
                    id: 'silver',
                    onClick: this.handleSorterChange
                  })
                ),
                React.createElement(
                  'th',
                  {
                    scope: 'col',
                    className: this.state.sortBy === 'bronze' ? 'active' : ''
                  },
                  React.createElement('div', {
                    className: 'medal',
                    id: 'bronze',
                    onClick: this.handleSorterChange
                  })
                ),
                React.createElement(
                  'th',
                  {
                    scope: 'col',
                    className: this.state.sortBy === 'total' ? 'active' : ''
                  },
                  React.createElement(
                    'div',
                    { id: 'total', onClick: this.handleSorterChange },
                    'TOTAL'
                  )
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
                      'td',
                      { scope: 'row' },
                      i + 1
                    ),
                    React.createElement(
                      'td',
                      { 'data-title': 'Flag' },
                      React.createElement('div', { className: 'flag', id: medal.code.toLowerCase() })
                    ),
                    React.createElement(
                      'td',
                      { 'data-title': 'Country' },
                      React.createElement(
                        'div',
                        { className: 'code' },
                        medal.code
                      )
                    ),
                    React.createElement(
                      'td',
                      { 'data-title': 'Gold' },
                      React.createElement(
                        'div',
                        { className: 'count' },
                        medal.gold
                      )
                    ),
                    React.createElement(
                      'td',
                      { 'data-title': 'Silver' },
                      React.createElement(
                        'div',
                        { className: 'count' },
                        medal.silver
                      )
                    ),
                    React.createElement(
                      'td',
                      { 'data-title': 'Bronze' },
                      React.createElement(
                        'div',
                        { className: 'count' },
                        medal.bronze
                      )
                    ),
                    React.createElement(
                      'td',
                      { 'data-title': 'Total' },
                      React.createElement(
                        'div',
                        { className: 'total' },
                        medal.total
                      )
                    )
                  );
                }
              })
            )
          ),
          React.createElement(
            'div',
            null,
            err
          )
        );
      }
    }]);

    return MedalCount;
  }(React.Component);

  ReactDOM.render(React.createElement(MedalCount, { sortBy: sortBy }), document.getElementById(element_id));
}