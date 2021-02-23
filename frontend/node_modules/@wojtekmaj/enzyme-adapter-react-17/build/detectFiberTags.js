"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _enzymeAdapterUtils = require("enzyme-adapter-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function getFiber(element) {
  var container = global.document.createElement('div');
  var inst = null;

  var Tester = /*#__PURE__*/function (_React$Component) {
    _inherits(Tester, _React$Component);

    var _super = _createSuper(Tester);

    function Tester() {
      _classCallCheck(this, Tester);

      return _super.apply(this, arguments);
    }

    _createClass(Tester, [{
      key: "render",
      value: function render() {
        inst = this;
        return element;
      }
    }]);

    return Tester;
  }(_react["default"].Component);

  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(Tester), container);

  return inst._reactInternals.child;
}

function getLazyFiber(LazyComponent) {
  var container = global.document.createElement('div');
  var inst = null;

  var Tester = /*#__PURE__*/function (_React$Component2) {
    _inherits(Tester, _React$Component2);

    var _super2 = _createSuper(Tester);

    function Tester() {
      _classCallCheck(this, Tester);

      return _super2.apply(this, arguments);
    }

    _createClass(Tester, [{
      key: "render",
      value: function render() {
        inst = this;
        return /*#__PURE__*/_react["default"].createElement(LazyComponent);
      }
    }]);

    return Tester;
  }(_react["default"].Component);

  var SuspenseWrapper = /*#__PURE__*/function (_React$Component3) {
    _inherits(SuspenseWrapper, _React$Component3);

    var _super3 = _createSuper(SuspenseWrapper);

    function SuspenseWrapper() {
      _classCallCheck(this, SuspenseWrapper);

      return _super3.apply(this, arguments);
    }

    _createClass(SuspenseWrapper, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Suspense, {
          fallback: false
        }, /*#__PURE__*/_react["default"].createElement(Tester));
      }
    }]);

    return SuspenseWrapper;
  }(_react["default"].Component);

  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(SuspenseWrapper), container);

  return inst._reactInternals.child;
}

module.exports = function detectFiberTags() {
  var supportsMode = typeof _react["default"].StrictMode !== 'undefined';
  var supportsContext = typeof _react["default"].createContext !== 'undefined';
  var supportsForwardRef = typeof _react["default"].forwardRef !== 'undefined';
  var supportsMemo = typeof _react["default"].memo !== 'undefined';
  var supportsProfiler = typeof _react["default"].unstable_Profiler !== 'undefined' || typeof _react["default"].Profiler !== 'undefined';
  var supportsSuspense = typeof _react["default"].Suspense !== 'undefined';
  var supportsLazy = typeof _react["default"].lazy !== 'undefined';

  function Fn() {
    return null;
  }

  var Cls = /*#__PURE__*/function (_React$Component4) {
    _inherits(Cls, _React$Component4);

    var _super4 = _createSuper(Cls);

    function Cls() {
      _classCallCheck(this, Cls);

      return _super4.apply(this, arguments);
    }

    _createClass(Cls, [{
      key: "render",
      value: function render() {
        return null;
      }
    }]);

    return Cls;
  }(_react["default"].Component);

  var Ctx = null;
  var FwdRef = null;
  var LazyComponent = null;

  if (supportsContext) {
    Ctx = /*#__PURE__*/_react["default"].createContext();
  }

  if (supportsForwardRef) {
    // React will warn if we don't have both arguments.
    // eslint-disable-next-line no-unused-vars
    FwdRef = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
      return null;
    });
  }

  if (supportsLazy) {
    LazyComponent = /*#__PURE__*/_react["default"].lazy(function () {
      return (0, _enzymeAdapterUtils.fakeDynamicImport)(function () {
        return null;
      });
    });
  }

  return {
    HostRoot: getFiber('test')["return"]["return"].tag,
    // Go two levels above to find the root
    ClassComponent: getFiber( /*#__PURE__*/_react["default"].createElement(Cls)).tag,
    Fragment: getFiber([['nested']]).tag,
    FunctionalComponent: getFiber( /*#__PURE__*/_react["default"].createElement(Fn)).tag,
    MemoSFC: supportsMemo ? getFiber( /*#__PURE__*/_react["default"].createElement( /*#__PURE__*/_react["default"].memo(Fn))).tag : -1,
    MemoClass: supportsMemo ? getFiber( /*#__PURE__*/_react["default"].createElement( /*#__PURE__*/_react["default"].memo(Cls))).tag : -1,
    HostPortal: getFiber( /*#__PURE__*/_reactDom["default"].createPortal(null, global.document.createElement('div'))).tag,
    HostComponent: getFiber( /*#__PURE__*/_react["default"].createElement('span')).tag,
    HostText: getFiber('text').tag,
    Mode: supportsMode ? getFiber( /*#__PURE__*/_react["default"].createElement(_react["default"].StrictMode)).tag : -1,
    ContextConsumer: supportsContext ? getFiber( /*#__PURE__*/_react["default"].createElement(Ctx.Consumer, null, function () {
      return null;
    })).tag : -1,
    ContextProvider: supportsContext ? getFiber( /*#__PURE__*/_react["default"].createElement(Ctx.Provider, {
      value: null
    }, null)).tag : -1,
    ForwardRef: supportsForwardRef ? getFiber( /*#__PURE__*/_react["default"].createElement(FwdRef)).tag : -1,
    Profiler: supportsProfiler ? getFiber( /*#__PURE__*/_react["default"].createElement(_react["default"].Profiler || _react["default"].unstable_Profiler, {
      id: 'mock',
      onRender: function onRender() {}
    })).tag : -1,
    Suspense: supportsSuspense ? getFiber( /*#__PURE__*/_react["default"].createElement(_react["default"].Suspense, {
      fallback: false
    })).tag : -1,
    Lazy: supportsLazy ? getLazyFiber(LazyComponent).tag : -1,
    OffscreenComponent: supportsLazy ? getLazyFiber('div')["return"]["return"].tag // Go two levels above to find the root
    : -1
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXRlY3RGaWJlclRhZ3MuanMiXSwibmFtZXMiOlsiZ2V0RmliZXIiLCJlbGVtZW50IiwiY29udGFpbmVyIiwiZ2xvYmFsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5zdCIsIlRlc3RlciIsIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJfcmVhY3RJbnRlcm5hbHMiLCJjaGlsZCIsImdldExhenlGaWJlciIsIkxhenlDb21wb25lbnQiLCJTdXNwZW5zZVdyYXBwZXIiLCJTdXNwZW5zZSIsImZhbGxiYWNrIiwibW9kdWxlIiwiZXhwb3J0cyIsImRldGVjdEZpYmVyVGFncyIsInN1cHBvcnRzTW9kZSIsIlN0cmljdE1vZGUiLCJzdXBwb3J0c0NvbnRleHQiLCJjcmVhdGVDb250ZXh0Iiwic3VwcG9ydHNGb3J3YXJkUmVmIiwiZm9yd2FyZFJlZiIsInN1cHBvcnRzTWVtbyIsIm1lbW8iLCJzdXBwb3J0c1Byb2ZpbGVyIiwidW5zdGFibGVfUHJvZmlsZXIiLCJQcm9maWxlciIsInN1cHBvcnRzU3VzcGVuc2UiLCJzdXBwb3J0c0xhenkiLCJsYXp5IiwiRm4iLCJDbHMiLCJDdHgiLCJGd2RSZWYiLCJwcm9wcyIsInJlZiIsIkhvc3RSb290IiwidGFnIiwiQ2xhc3NDb21wb25lbnQiLCJGcmFnbWVudCIsIkZ1bmN0aW9uYWxDb21wb25lbnQiLCJNZW1vU0ZDIiwiTWVtb0NsYXNzIiwiSG9zdFBvcnRhbCIsImNyZWF0ZVBvcnRhbCIsIkhvc3RDb21wb25lbnQiLCJIb3N0VGV4dCIsIk1vZGUiLCJDb250ZXh0Q29uc3VtZXIiLCJDb25zdW1lciIsIkNvbnRleHRQcm92aWRlciIsIlByb3ZpZGVyIiwidmFsdWUiLCJGb3J3YXJkUmVmIiwiaWQiLCJvblJlbmRlciIsIkxhenkiLCJPZmZzY3JlZW5Db21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QyxDQXpCQTtBQTBCTFgsSUFBQUEsUUFBUSxFQUFFRixnQkFBZ0IsR0FDdEI5QixRQUFRLGVBQUNRLGtCQUFNSCxhQUFOLENBQXFCRyxrQkFBTXdCLFFBQU4sSUFBa0J4QixrQkFBTXVCLGlCQUE3QyxFQUFpRTtBQUFFNkIsTUFBQUEsRUFBRSxFQUFFLE1BQU47QUFBY0MsTUFBQUEsUUFBZCxzQkFBeUIsQ0FBRTtBQUEzQixLQUFqRSxDQUFELENBQVIsQ0FBMEdsQixHQURwRixHQUV0QixDQUFDLENBNUJBO0FBNkJMMUIsSUFBQUEsUUFBUSxFQUFFZ0IsZ0JBQWdCLEdBQ3RCakMsUUFBUSxlQUFDUSxrQkFBTUgsYUFBTixDQUFvQkcsa0JBQU1TLFFBQTFCLEVBQW9DO0FBQUVDLE1BQUFBLFFBQVEsRUFBRTtBQUFaLEtBQXBDLENBQUQsQ0FBUixDQUFtRXlCLEdBRDdDLEdBRXRCLENBQUMsQ0EvQkE7QUFnQ0xtQixJQUFBQSxJQUFJLEVBQUU1QixZQUFZLEdBQ2RwQixZQUFZLENBQUNDLGFBQUQsQ0FBWixDQUE0QjRCLEdBRGQsR0FFZCxDQUFDLENBbENBO0FBbUNMb0IsSUFBQUEsa0JBQWtCLEVBQUU3QixZQUFZLEdBQzVCcEIsWUFBWSxDQUFDLEtBQUQsQ0FBWixxQkFBa0M2QixHQUROLENBQ1U7QUFEVixNQUU1QixDQUFDO0FBckNBLEdBQVA7QUF1Q0QsQ0F2RUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBmYWtlRHluYW1pY0ltcG9ydCB9IGZyb20gJ2VuenltZS1hZGFwdGVyLXV0aWxzJztcblxuZnVuY3Rpb24gZ2V0RmliZXIoZWxlbWVudCkge1xuICBjb25zdCBjb250YWluZXIgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBpbnN0ID0gbnVsbDtcbiAgY2xhc3MgVGVzdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICBpbnN0ID0gdGhpcztcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgfVxuICBSZWFjdERPTS5yZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChUZXN0ZXIpLCBjb250YWluZXIpO1xuICByZXR1cm4gaW5zdC5fcmVhY3RJbnRlcm5hbHMuY2hpbGQ7XG59XG5cbmZ1bmN0aW9uIGdldExhenlGaWJlcihMYXp5Q29tcG9uZW50KSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IGluc3QgPSBudWxsO1xuXG4gIGNsYXNzIFRlc3RlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgaW5zdCA9IHRoaXM7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMYXp5Q29tcG9uZW50KTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBTdXNwZW5zZVdyYXBwZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBSZWFjdC5TdXNwZW5zZSxcbiAgICAgICAgeyBmYWxsYmFjazogZmFsc2UgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXN0ZXIpLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3VzcGVuc2VXcmFwcGVyKSwgY29udGFpbmVyKTtcbiAgcmV0dXJuIGluc3QuX3JlYWN0SW50ZXJuYWxzLmNoaWxkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRldGVjdEZpYmVyVGFncygpIHtcbiAgY29uc3Qgc3VwcG9ydHNNb2RlID0gdHlwZW9mIFJlYWN0LlN0cmljdE1vZGUgIT09ICd1bmRlZmluZWQnO1xuICBjb25zdCBzdXBwb3J0c0NvbnRleHQgPSB0eXBlb2YgUmVhY3QuY3JlYXRlQ29udGV4dCAhPT0gJ3VuZGVmaW5lZCc7XG4gIGNvbnN0IHN1cHBvcnRzRm9yd2FyZFJlZiA9IHR5cGVvZiBSZWFjdC5mb3J3YXJkUmVmICE9PSAndW5kZWZpbmVkJztcbiAgY29uc3Qgc3VwcG9ydHNNZW1vID0gdHlwZW9mIFJlYWN0Lm1lbW8gIT09ICd1bmRlZmluZWQnO1xuICBjb25zdCBzdXBwb3J0c1Byb2ZpbGVyID0gdHlwZW9mIFJlYWN0LnVuc3RhYmxlX1Byb2ZpbGVyICE9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgUmVhY3QuUHJvZmlsZXIgIT09ICd1bmRlZmluZWQnO1xuICBjb25zdCBzdXBwb3J0c1N1c3BlbnNlID0gdHlwZW9mIFJlYWN0LlN1c3BlbnNlICE9PSAndW5kZWZpbmVkJztcbiAgY29uc3Qgc3VwcG9ydHNMYXp5ID0gdHlwZW9mIFJlYWN0LmxhenkgIT09ICd1bmRlZmluZWQnO1xuXG4gIGZ1bmN0aW9uIEZuKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNsYXNzIENscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIGxldCBDdHggPSBudWxsO1xuICBsZXQgRndkUmVmID0gbnVsbDtcbiAgbGV0IExhenlDb21wb25lbnQgPSBudWxsO1xuICBpZiAoc3VwcG9ydHNDb250ZXh0KSB7XG4gICAgQ3R4ID0gUmVhY3QuY3JlYXRlQ29udGV4dCgpO1xuICB9XG4gIGlmIChzdXBwb3J0c0ZvcndhcmRSZWYpIHtcbiAgICAvLyBSZWFjdCB3aWxsIHdhcm4gaWYgd2UgZG9uJ3QgaGF2ZSBib3RoIGFyZ3VtZW50cy5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBGd2RSZWYgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiBudWxsKTtcbiAgfVxuICBpZiAoc3VwcG9ydHNMYXp5KSB7XG4gICAgTGF6eUNvbXBvbmVudCA9IFJlYWN0LmxhenkoKCkgPT4gZmFrZUR5bmFtaWNJbXBvcnQoKCkgPT4gbnVsbCkpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBIb3N0Um9vdDogZ2V0RmliZXIoJ3Rlc3QnKS5yZXR1cm4ucmV0dXJuLnRhZywgLy8gR28gdHdvIGxldmVscyBhYm92ZSB0byBmaW5kIHRoZSByb290XG4gICAgQ2xhc3NDb21wb25lbnQ6IGdldEZpYmVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2xzKSkudGFnLFxuICAgIEZyYWdtZW50OiBnZXRGaWJlcihbWyduZXN0ZWQnXV0pLnRhZyxcbiAgICBGdW5jdGlvbmFsQ29tcG9uZW50OiBnZXRGaWJlcihSZWFjdC5jcmVhdGVFbGVtZW50KEZuKSkudGFnLFxuICAgIE1lbW9TRkM6IHN1cHBvcnRzTWVtb1xuICAgICAgPyBnZXRGaWJlcihSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0Lm1lbW8oRm4pKSkudGFnXG4gICAgICA6IC0xLFxuICAgIE1lbW9DbGFzczogc3VwcG9ydHNNZW1vXG4gICAgICA/IGdldEZpYmVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QubWVtbyhDbHMpKSkudGFnXG4gICAgICA6IC0xLFxuICAgIEhvc3RQb3J0YWw6IGdldEZpYmVyKFJlYWN0RE9NLmNyZWF0ZVBvcnRhbChudWxsLCBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpKS50YWcsXG4gICAgSG9zdENvbXBvbmVudDogZ2V0RmliZXIoUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicpKS50YWcsXG4gICAgSG9zdFRleHQ6IGdldEZpYmVyKCd0ZXh0JykudGFnLFxuICAgIE1vZGU6IHN1cHBvcnRzTW9kZVxuICAgICAgPyBnZXRGaWJlcihSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LlN0cmljdE1vZGUpKS50YWdcbiAgICAgIDogLTEsXG4gICAgQ29udGV4dENvbnN1bWVyOiBzdXBwb3J0c0NvbnRleHRcbiAgICAgID8gZ2V0RmliZXIoUmVhY3QuY3JlYXRlRWxlbWVudChDdHguQ29uc3VtZXIsIG51bGwsICgpID0+IG51bGwpKS50YWdcbiAgICAgIDogLTEsXG4gICAgQ29udGV4dFByb3ZpZGVyOiBzdXBwb3J0c0NvbnRleHRcbiAgICAgID8gZ2V0RmliZXIoUmVhY3QuY3JlYXRlRWxlbWVudChDdHguUHJvdmlkZXIsIHsgdmFsdWU6IG51bGwgfSwgbnVsbCkpLnRhZ1xuICAgICAgOiAtMSxcbiAgICBGb3J3YXJkUmVmOiBzdXBwb3J0c0ZvcndhcmRSZWZcbiAgICAgID8gZ2V0RmliZXIoUmVhY3QuY3JlYXRlRWxlbWVudChGd2RSZWYpKS50YWdcbiAgICAgIDogLTEsXG4gICAgUHJvZmlsZXI6IHN1cHBvcnRzUHJvZmlsZXJcbiAgICAgID8gZ2V0RmliZXIoUmVhY3QuY3JlYXRlRWxlbWVudCgoUmVhY3QuUHJvZmlsZXIgfHwgUmVhY3QudW5zdGFibGVfUHJvZmlsZXIpLCB7IGlkOiAnbW9jaycsIG9uUmVuZGVyKCkge30gfSkpLnRhZ1xuICAgICAgOiAtMSxcbiAgICBTdXNwZW5zZTogc3VwcG9ydHNTdXNwZW5zZVxuICAgICAgPyBnZXRGaWJlcihSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LlN1c3BlbnNlLCB7IGZhbGxiYWNrOiBmYWxzZSB9KSkudGFnXG4gICAgICA6IC0xLFxuICAgIExhenk6IHN1cHBvcnRzTGF6eVxuICAgICAgPyBnZXRMYXp5RmliZXIoTGF6eUNvbXBvbmVudCkudGFnXG4gICAgICA6IC0xLFxuICAgIE9mZnNjcmVlbkNvbXBvbmVudDogc3VwcG9ydHNMYXp5XG4gICAgICA/IGdldExhenlGaWJlcignZGl2JykucmV0dXJuLnJldHVybi50YWcgLy8gR28gdHdvIGxldmVscyBhYm92ZSB0byBmaW5kIHRoZSByb290XG4gICAgICA6IC0xLFxuICB9O1xufTtcbiJdfQ==
//# sourceMappingURL=detectFiberTags.js.map