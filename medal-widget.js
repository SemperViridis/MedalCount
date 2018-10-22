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
        medals: [],
        sortBy: sortBy
      };
      _this.handleSorterChange = _this.handleSorterChange.bind(_this);
      return _this;
    }

    _createClass(MedalCount, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        console.log(this.state.mounted);
        $.ajax({
          method: 'GET',
          url: 'https://cors-escape.herokuapp.com/https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json',
          success: function success(data) {
            console.log('data from ajax request', data);
            _this2.setState({
              medals: data
            }, function () {
              _this2.calculateTotals();
              _this2.sortByMedal();
            });
          },
          error: function error(err) {
            console.log('get request error: ', err);
          }
        });
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

        this.setState({ medals: medals });
      }
    }, {
      key: 'handleSorterChange',
      value: function handleSorterChange(e) {
        var newSorter = e.target.id;
        console.log(newSorter);
        this.setState({ sortBy: newSorter }, this.sortByMedal);
      }
    }, {
      key: 'render',
      value: function render() {
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
                { scope: 'col', className: 'code' },
                'Country'
              ),
              React.createElement(
                'th',
                { scope: 'col', onClick: this.handleSorterChange },
                React.createElement('div', { className: 'medal', id: 'gold' })
              ),
              React.createElement(
                'th',
                { scope: 'col', onClick: this.handleSorterChange },
                React.createElement('div', { className: 'medal', id: 'silver' })
              ),
              React.createElement(
                'th',
                { scope: 'col', onClick: this.handleSorterChange },
                React.createElement('div', { className: 'medal', id: 'bronze' })
              ),
              React.createElement(
                'th',
                { scope: 'col', id: 'total', onClick: this.handleSorterChange },
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
                    React.createElement('div', { className: 'flag', id: medal.code.toLowerCase() })
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Country' },
                    medal.code
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Gold' },
                    medal.gold
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Silver' },
                    medal.silver
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Bronze' },
                    medal.bronze
                  ),
                  React.createElement(
                    'td',
                    { 'data-title': 'Total' },
                    medal.total
                  )
                );
              }
            })
          )
        );
      }
    }]);

    return MedalCount;
  }(React.Component);

  ReactDOM.render(React.createElement(MedalCount, null), document.getElementById(element_id));
};