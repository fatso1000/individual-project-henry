"use strict";

var _object = _interopRequireDefault(require("object.assign"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _package = require("react-test-renderer/package.json");

var _testUtils = _interopRequireDefault(require("react-dom/test-utils"));

var _semver = _interopRequireDefault(require("semver"));

var _checkPropTypes2 = _interopRequireDefault(require("prop-types/checkPropTypes"));

var _has = _interopRequireDefault(require("has"));

var _reactIs = require("react-is");

var _enzyme = require("enzyme");

var _Utils = require("enzyme/build/Utils");

var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));

var _enzymeAdapterUtils = require("enzyme-adapter-utils");

var _findCurrentFiberUsingSlowPath = _interopRequireDefault(require("./findCurrentFiberUsingSlowPath"));

var _detectFiberTags = _interopRequireDefault(require("./detectFiberTags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var is164 = !!_testUtils["default"].Simulate.touchStart; // 16.4+

var is165 = !!_testUtils["default"].Simulate.auxClick; // 16.5+

var is166 = is165 && !_react["default"].unstable_AsyncMode; // 16.6+

var is168 = is166 && typeof _testUtils["default"].act === 'function';

var hasShouldComponentUpdateBug = _semver["default"].satisfies(_package.version, '< 16.8'); // Lazily populated if DOM is available.


var FiberTags = null;

function nodeAndSiblingsArray(nodeWithSibling) {
  var array = [];
  var node = nodeWithSibling;

  while (node != null) {
    array.push(node);
    node = node.sibling;
  }

  return array;
}

function flatten(arr) {
  var result = [];
  var stack = [{
    i: 0,
    array: arr
  }];

  while (stack.length) {
    var n = stack.pop();

    while (n.i < n.array.length) {
      var el = n.array[n.i];
      n.i += 1;

      if (Array.isArray(el)) {
        stack.push(n);
        stack.push({
          i: 0,
          array: el
        });
        break;
      }

      result.push(el);
    }
  }

  return result;
}

function nodeTypeFromType(type) {
  if (type === _reactIs.Portal) {
    return 'portal';
  }

  return (0, _enzymeAdapterUtils.nodeTypeFromType)(type);
}

function isMemo(type) {
  return (0, _enzymeAdapterUtils.compareNodeTypeOf)(type, _reactIs.Memo);
}

function isLazy(type) {
  return (0, _enzymeAdapterUtils.compareNodeTypeOf)(type, _reactIs.Lazy);
}

function unmemoType(type) {
  return isMemo(type) ? type.type : type;
}

function checkIsSuspenseAndCloneElement(el, _ref) {
  var suspenseFallback = _ref.suspenseFallback;

  if (!(0, _reactIs.isSuspense)(el)) {
    return el;
  }

  var children = el.props.children;

  if (suspenseFallback) {
    var fallback = el.props.fallback;
    children = replaceLazyWithFallback(children, fallback);
  }

  var FakeSuspenseWrapper = function FakeSuspenseWrapper(props) {
    return /*#__PURE__*/_react["default"].createElement(el.type, _objectSpread(_objectSpread({}, el.props), props), children);
  };

  return /*#__PURE__*/_react["default"].createElement(FakeSuspenseWrapper, null, children);
}

function elementToTree(el) {
  if (!(0, _reactIs.isPortal)(el)) {
    return (0, _enzymeAdapterUtils.elementToTree)(el, elementToTree);
  }

  var children = el.children,
      containerInfo = el.containerInfo;
  var props = {
    children: children,
    containerInfo: containerInfo
  };
  return {
    nodeType: 'portal',
    type: _reactIs.Portal,
    props: props,
    key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(el.key),
    ref: el.ref || null,
    instance: null,
    rendered: elementToTree(el.children)
  };
}

function _toTree(vnode) {
  if (vnode == null) {
    return null;
  } // TODO(lmr): I'm not really sure I understand whether or not this is what
  // i should be doing, or if this is a hack for something i'm doing wrong
  // somewhere else. Should talk to sebastian about this perhaps


  var node = (0, _findCurrentFiberUsingSlowPath["default"])(vnode);

  switch (node.tag) {
    case FiberTags.HostRoot:
      return childrenToTree(node.child);

    case FiberTags.HostPortal:
      {
        var containerInfo = node.stateNode.containerInfo,
            children = node.memoizedProps;
        var props = {
          containerInfo: containerInfo,
          children: children
        };
        return {
          nodeType: 'portal',
          type: _reactIs.Portal,
          props: props,
          key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
          ref: node.ref,
          instance: null,
          rendered: childrenToTree(node.child)
        };
      }

    case FiberTags.ClassComponent:
      return {
        nodeType: 'class',
        type: node.type,
        props: _objectSpread({}, node.memoizedProps),
        key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
        ref: node.ref,
        instance: node.stateNode,
        rendered: childrenToTree(node.child)
      };

    case FiberTags.FunctionalComponent:
      return {
        nodeType: 'function',
        type: node.type,
        props: _objectSpread({}, node.memoizedProps),
        key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
        ref: node.ref,
        instance: null,
        rendered: childrenToTree(node.child)
      };

    case FiberTags.MemoClass:
      return {
        nodeType: 'class',
        type: node.elementType.type,
        props: _objectSpread({}, node.memoizedProps),
        key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
        ref: node.ref,
        instance: node.stateNode,
        rendered: childrenToTree(node.child.child)
      };

    case FiberTags.MemoSFC:
      {
        var renderedNodes = flatten(nodeAndSiblingsArray(node.child).map(_toTree));

        if (renderedNodes.length === 0) {
          renderedNodes = [node.memoizedProps.children];
        }

        return {
          nodeType: 'function',
          type: node.elementType,
          props: _objectSpread({}, node.memoizedProps),
          key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
          ref: node.ref,
          instance: null,
          rendered: renderedNodes
        };
      }

    case FiberTags.HostComponent:
      {
        var _renderedNodes = flatten(nodeAndSiblingsArray(node.child).map(_toTree));

        if (_renderedNodes.length === 0) {
          _renderedNodes = [node.memoizedProps.children];
        }

        return {
          nodeType: 'host',
          type: node.type,
          props: _objectSpread({}, node.memoizedProps),
          key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
          ref: node.ref,
          instance: node.stateNode,
          rendered: _renderedNodes
        };
      }

    case FiberTags.HostText:
      return node.memoizedProps;

    case FiberTags.Fragment:
    case FiberTags.Mode:
    case FiberTags.ContextProvider:
    case FiberTags.ContextConsumer:
      return childrenToTree(node.child);

    case FiberTags.Profiler:
    case FiberTags.ForwardRef:
      {
        return {
          nodeType: 'function',
          type: node.type,
          props: _objectSpread({}, node.pendingProps),
          key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
          ref: node.ref,
          instance: null,
          rendered: childrenToTree(node.child)
        };
      }

    case FiberTags.Suspense:
      {
        return {
          nodeType: 'function',
          type: _reactIs.Suspense,
          props: _objectSpread({}, node.memoizedProps),
          key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
          ref: node.ref,
          instance: null,
          rendered: childrenToTree(node.child)
        };
      }

    case FiberTags.Lazy:
      return childrenToTree(node.child);

    case FiberTags.OffscreenComponent:
      return _toTree(node.child);

    default:
      throw new Error("Enzyme Internal Error: unknown node with tag ".concat(node.tag));
  }
}

function childrenToTree(node) {
  if (!node) {
    return null;
  }

  var children = nodeAndSiblingsArray(node);

  if (children.length === 0) {
    return null;
  }

  if (children.length === 1) {
    return _toTree(children[0]);
  }

  return flatten(children.map(_toTree));
}

function _nodeToHostNode(_node) {
  // NOTE(lmr): node could be a function component
  // which wont have an instance prop, but we can get the
  // host node associated with its return value at that point.
  // Although this breaks down if the return value is an array,
  // as is possible with React 16.
  var node = _node;

  while (node && !Array.isArray(node) && node.instance === null) {
    node = node.rendered;
  } // if the SFC returned null effectively, there is no host node.


  if (!node) {
    return null;
  }

  var mapper = function mapper(item) {
    if (item && item.instance) return _reactDom["default"].findDOMNode(item.instance);
    return null;
  };

  if (Array.isArray(node)) {
    return node.map(mapper);
  }

  if (Array.isArray(node.rendered) && node.nodeType === 'class') {
    return node.rendered.map(mapper);
  }

  return mapper(node);
}

function replaceLazyWithFallback(node, fallback) {
  if (!node) {
    return null;
  }

  if (Array.isArray(node)) {
    return node.map(function (el) {
      return replaceLazyWithFallback(el, fallback);
    });
  }

  if (isLazy(node.type)) {
    return fallback;
  }

  return _objectSpread(_objectSpread({}, node), {}, {
    props: _objectSpread(_objectSpread({}, node.props), {}, {
      children: replaceLazyWithFallback(node.props.children, fallback)
    })
  });
}

var eventOptions = {
  animation: true,
  pointerEvents: is164,
  auxClick: is165
};

function getEmptyStateValue() {
  // this handles a bug in React 16.0 - 16.2
  // see https://github.com/facebook/react/commit/39be83565c65f9c522150e52375167568a2a1459
  // also see https://github.com/facebook/react/pull/11965
  var EmptyState = /*#__PURE__*/function (_React$Component) {
    _inherits(EmptyState, _React$Component);

    var _super = _createSuper(EmptyState);

    function EmptyState() {
      _classCallCheck(this, EmptyState);

      return _super.apply(this, arguments);
    }

    _createClass(EmptyState, [{
      key: "render",
      value: function render() {
        return null;
      }
    }]);

    return EmptyState;
  }(_react["default"].Component);

  var testRenderer = new _shallow["default"]();
  testRenderer.render( /*#__PURE__*/_react["default"].createElement(EmptyState));
  return testRenderer._instance.state;
}

function wrapAct(fn) {
  if (!is168) {
    return fn();
  }

  var returnVal;

  _testUtils["default"].act(function () {
    returnVal = fn();
  });

  return returnVal;
}

function getProviderDefaultValue(Provider) {
  // React stores references to the Provider's defaultValue differently across versions.
  if ('_defaultValue' in Provider._context) {
    return Provider._context._defaultValue;
  }

  if ('_currentValue' in Provider._context) {
    return Provider._context._currentValue;
  }

  throw new Error('Enzyme Internal Error: can’t figure out how to get Provider’s default value');
}

function makeFakeElement(type) {
  return {
    $$typeof: _reactIs.Element,
    type: type
  };
}

function isStateful(Component) {
  return Component.prototype && (Component.prototype.isReactComponent || Array.isArray(Component.__reactAutoBindPairs) // fallback for createClass components
  );
}

var ReactSeventeenAdapter = /*#__PURE__*/function (_EnzymeAdapter) {
  _inherits(ReactSeventeenAdapter, _EnzymeAdapter);

  var _super2 = _createSuper(ReactSeventeenAdapter);

  function ReactSeventeenAdapter() {
    var _this;

    _classCallCheck(this, ReactSeventeenAdapter);

    _this = _super2.call(this);
    var lifecycles = _this.options.lifecycles;
    _this.options = _objectSpread(_objectSpread({}, _this.options), {}, {
      enableComponentDidUpdateOnSetState: true,
      // TODO: remove, semver-major
      legacyContextMode: 'parent',
      lifecycles: _objectSpread(_objectSpread({}, lifecycles), {}, {
        componentDidUpdate: {
          onSetState: true
        },
        getDerivedStateFromProps: {
          hasShouldComponentUpdateBug: hasShouldComponentUpdateBug
        },
        getSnapshotBeforeUpdate: true,
        setState: {
          skipsComponentDidUpdateOnNullish: true
        },
        getChildContext: {
          calledByRenderer: false
        },
        getDerivedStateFromError: is166
      })
    });
    return _this;
  }

  _createClass(ReactSeventeenAdapter, [{
    key: "createMountRenderer",
    value: function createMountRenderer(options) {
      (0, _enzymeAdapterUtils.assertDomAvailable)('mount');

      if ((0, _has["default"])(options, 'suspenseFallback')) {
        throw new TypeError('`suspenseFallback` is not supported by the `mount` renderer');
      }

      if (FiberTags === null) {
        // Requires DOM.
        FiberTags = (0, _detectFiberTags["default"])();
      }

      var attachTo = options.attachTo,
          hydrateIn = options.hydrateIn,
          wrappingComponentProps = options.wrappingComponentProps;
      var domNode = hydrateIn || attachTo || global.document.createElement('div');
      var instance = null;
      var adapter = this;
      return _objectSpread({
        render: function render(el, context, callback) {
          return wrapAct(function () {
            if (instance === null) {
              var type = el.type,
                  props = el.props,
                  ref = el.ref;

              var wrapperProps = _objectSpread({
                Component: type,
                props: props,
                wrappingComponentProps: wrappingComponentProps,
                context: context
              }, ref && {
                refProp: ref
              });

              var ReactWrapperComponent = (0, _enzymeAdapterUtils.createMountWrapper)(el, _objectSpread(_objectSpread({}, options), {}, {
                adapter: adapter
              }));

              var wrappedEl = /*#__PURE__*/_react["default"].createElement(ReactWrapperComponent, wrapperProps);

              instance = hydrateIn ? _reactDom["default"].hydrate(wrappedEl, domNode) : _reactDom["default"].render(wrappedEl, domNode);

              if (typeof callback === 'function') {
                callback();
              }
            } else {
              instance.setChildProps(el.props, context, callback);
            }
          });
        },
        unmount: function unmount() {
          _reactDom["default"].unmountComponentAtNode(domNode);

          instance = null;
        },
        getNode: function getNode() {
          if (!instance) {
            return null;
          }

          return (0, _enzymeAdapterUtils.getNodeFromRootFinder)(adapter.isCustomComponent, _toTree(instance._reactInternals), options);
        },
        simulateError: function simulateError(nodeHierarchy, rootNode, error) {
          var isErrorBoundary = function isErrorBoundary(_ref2) {
            var elInstance = _ref2.instance,
                type = _ref2.type;

            if (is166 && type && type.getDerivedStateFromError) {
              return true;
            }

            return elInstance && elInstance.componentDidCatch;
          };

          var _ref3 = nodeHierarchy.find(isErrorBoundary) || {},
              catchingInstance = _ref3.instance,
              catchingType = _ref3.type;

          (0, _enzymeAdapterUtils.simulateError)(error, catchingInstance, rootNode, nodeHierarchy, nodeTypeFromType, adapter.displayNameOfNode, is166 ? catchingType : undefined);
        },
        simulateEvent: function simulateEvent(node, event, mock) {
          var mappedEvent = (0, _enzymeAdapterUtils.mapNativeEventNames)(event, eventOptions);
          var eventFn = _testUtils["default"].Simulate[mappedEvent];

          if (!eventFn) {
            throw new TypeError("ReactWrapper::simulate() event '".concat(event, "' does not exist"));
          }

          wrapAct(function () {
            eventFn(adapter.nodeToHostNode(node), mock);
          });
        },
        batchedUpdates: function batchedUpdates(fn) {
          return fn(); // return ReactDOM.unstable_batchedUpdates(fn);
        },
        getWrappingComponentRenderer: function getWrappingComponentRenderer() {
          return _objectSpread(_objectSpread({}, this), (0, _enzymeAdapterUtils.getWrappingComponentMountRenderer)({
            toTree: function toTree(inst) {
              return _toTree(inst._reactInternals);
            },
            getMountWrapperInstance: function getMountWrapperInstance() {
              return instance;
            }
          }));
        }
      }, is168 && {
        wrapInvoke: wrapAct
      });
    }
  }, {
    key: "createShallowRenderer",
    value: function createShallowRenderer() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var adapter = this;
      var renderer = new _shallow["default"]();
      var suspenseFallback = options.suspenseFallback;

      if (typeof suspenseFallback !== 'undefined' && typeof suspenseFallback !== 'boolean') {
        throw TypeError('`options.suspenseFallback` should be boolean or undefined');
      }

      var isDOM = false;
      var cachedNode = null;
      var lastComponent = null;
      var wrappedComponent = null;
      var sentinel = {}; // wrap memo components with a PureComponent, or a class component with sCU

      var wrapPureComponent = function wrapPureComponent(Component, compare) {
        if (!is166) {
          throw new RangeError('this function should not be called in React < 16.6. Please report this!');
        }

        if (lastComponent !== Component) {
          if (isStateful(Component)) {
            wrappedComponent = /*#__PURE__*/function (_Component) {
              _inherits(wrappedComponent, _Component);

              var _super3 = _createSuper(wrappedComponent);

              function wrappedComponent() {
                _classCallCheck(this, wrappedComponent);

                return _super3.apply(this, arguments);
              }

              return wrappedComponent;
            }(Component);

            if (compare) {
              wrappedComponent.prototype.shouldComponentUpdate = function (nextProps) {
                return !compare(_this2.props, nextProps);
              };
            } else {
              wrappedComponent.prototype.isPureReactComponent = true;
            }
          } else {
            var memoized = sentinel;
            var prevProps;

            wrappedComponent = function wrappedComponentFn(props) {
              var shouldUpdate = memoized === sentinel || (compare ? !compare(prevProps, props) : !(0, _enzymeShallowEqual["default"])(prevProps, props));

              if (shouldUpdate) {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }

                memoized = Component.apply(void 0, [_objectSpread(_objectSpread({}, Component.defaultProps), props)].concat(args));
                prevProps = props;
              }

              return memoized;
            };
          }

          (0, _object["default"])(wrappedComponent, Component, {
            displayName: adapter.displayNameOfNode({
              type: Component
            })
          });
          lastComponent = Component;
        }

        return wrappedComponent;
      }; // Wrap functional components on versions prior to 16.5,
      // to avoid inadvertently pass a `this` instance to it.


      var wrapFunctionalComponent = function wrapFunctionalComponent(Component) {
        if (is166 && (0, _has["default"])(Component, 'defaultProps')) {
          if (lastComponent !== Component) {
            wrappedComponent = (0, _object["default"])( // eslint-disable-next-line new-cap
            function (props) {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }

              return Component.apply(void 0, [_objectSpread(_objectSpread({}, Component.defaultProps), props)].concat(args));
            }, Component, {
              displayName: adapter.displayNameOfNode({
                type: Component
              })
            });
            lastComponent = Component;
          }

          return wrappedComponent;
        }

        if (is165) {
          return Component;
        }

        if (lastComponent !== Component) {
          wrappedComponent = (0, _object["default"])(function () {
            return Component.apply(void 0, arguments);
          }, // eslint-disable-line new-cap
          Component);
          lastComponent = Component;
        }

        return wrappedComponent;
      };

      var renderElement = function renderElement(elConfig) {
        for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          rest[_key3 - 1] = arguments[_key3];
        }

        var renderedEl = renderer.render.apply(renderer, [elConfig].concat(rest));
        var typeIsExisted = !!(renderedEl && renderedEl.type);

        if (is166 && typeIsExisted) {
          var clonedEl = checkIsSuspenseAndCloneElement(renderedEl, {
            suspenseFallback: suspenseFallback
          });
          var elementIsChanged = clonedEl.type !== renderedEl.type;

          if (elementIsChanged) {
            return renderer.render.apply(renderer, [_objectSpread(_objectSpread({}, elConfig), {}, {
              type: clonedEl.type
            })].concat(rest));
          }
        }

        return renderedEl;
      };

      return {
        render: function render(el, unmaskedContext) {
          var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
              _ref4$providerValues = _ref4.providerValues,
              providerValues = _ref4$providerValues === void 0 ? new Map() : _ref4$providerValues;

          cachedNode = el;
          /* eslint consistent-return: 0 */

          if (typeof el.type === 'string') {
            isDOM = true;
          } else if ((0, _reactIs.isContextProvider)(el)) {
            providerValues.set(el.type, el.props.value);
            var MockProvider = (0, _object["default"])(function (props) {
              return props.children;
            }, el.type);
            return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
              return renderElement(_objectSpread(_objectSpread({}, el), {}, {
                type: MockProvider
              }));
            });
          } else if ((0, _reactIs.isContextConsumer)(el)) {
            var Provider = adapter.getProviderFromConsumer(el.type);
            var value = providerValues.has(Provider) ? providerValues.get(Provider) : getProviderDefaultValue(Provider);
            var MockConsumer = (0, _object["default"])(function (props) {
              return props.children(value);
            }, el.type);
            return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
              return renderElement(_objectSpread(_objectSpread({}, el), {}, {
                type: MockConsumer
              }));
            });
          } else {
            isDOM = false;
            var renderedEl = el;

            if (isLazy(renderedEl)) {
              throw TypeError('`React.lazy` is not supported by shallow rendering.');
            }

            renderedEl = checkIsSuspenseAndCloneElement(renderedEl, {
              suspenseFallback: suspenseFallback
            });
            var _renderedEl = renderedEl,
                Component = _renderedEl.type;
            var context = (0, _enzymeAdapterUtils.getMaskedContext)(Component.contextTypes, unmaskedContext);

            if (isMemo(el.type)) {
              var _el$type = el.type,
                  InnerComp = _el$type.type,
                  compare = _el$type.compare;
              return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
                return renderElement(_objectSpread(_objectSpread({}, el), {}, {
                  type: wrapPureComponent(InnerComp, compare)
                }), context);
              });
            }

            if (!isStateful(Component) && typeof Component === 'function') {
              return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
                return renderElement(_objectSpread(_objectSpread({}, renderedEl), {}, {
                  type: wrapFunctionalComponent(Component)
                }), context);
              });
            }

            if (isStateful) {
              // fix react bug; see implementation of `getEmptyStateValue`
              var emptyStateValue = getEmptyStateValue();

              if (emptyStateValue) {
                Object.defineProperty(Component.prototype, 'state', {
                  configurable: true,
                  enumerable: true,
                  get: function get() {
                    return null;
                  },
                  set: function set(value) {
                    if (value !== emptyStateValue) {
                      Object.defineProperty(this, 'state', {
                        configurable: true,
                        enumerable: true,
                        value: value,
                        writable: true
                      });
                    }

                    return true;
                  }
                });
              }
            }

            return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
              return renderElement(renderedEl, context);
            });
          }
        },
        unmount: function unmount() {
          renderer.unmount();
        },
        getNode: function getNode() {
          if (isDOM) {
            return elementToTree(cachedNode);
          }

          var output = renderer.getRenderOutput();
          return {
            nodeType: nodeTypeFromType(cachedNode.type),
            type: cachedNode.type,
            props: cachedNode.props,
            key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(cachedNode.key),
            ref: cachedNode.ref,
            instance: renderer._instance,
            rendered: Array.isArray(output) ? flatten(output).map(function (el) {
              return elementToTree(el);
            }) : elementToTree(output)
          };
        },
        simulateError: function simulateError(nodeHierarchy, rootNode, error) {
          (0, _enzymeAdapterUtils.simulateError)(error, renderer._instance, cachedNode, nodeHierarchy.concat(cachedNode), nodeTypeFromType, adapter.displayNameOfNode, is166 ? cachedNode.type : undefined);
        },
        simulateEvent: function simulateEvent(node, event) {
          for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
            args[_key4 - 2] = arguments[_key4];
          }

          var handler = node.props[(0, _enzymeAdapterUtils.propFromEvent)(event, eventOptions)];

          if (handler) {
            (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
              // TODO(lmr): create/use synthetic events
              // TODO(lmr): emulate React's event propagation
              // ReactDOM.unstable_batchedUpdates(() => {
              handler.apply(void 0, args); // });
            });
          }
        },
        batchedUpdates: function batchedUpdates(fn) {
          return fn(); // return ReactDOM.unstable_batchedUpdates(fn);
        },
        checkPropTypes: function checkPropTypes(typeSpecs, values, location, hierarchy) {
          return (0, _checkPropTypes2["default"])(typeSpecs, values, location, (0, _enzymeAdapterUtils.displayNameOfNode)(cachedNode), function () {
            return (0, _enzymeAdapterUtils.getComponentStack)(hierarchy.concat([cachedNode]));
          });
        }
      };
    }
  }, {
    key: "createStringRenderer",
    value: function createStringRenderer(options) {
      if ((0, _has["default"])(options, 'suspenseFallback')) {
        throw new TypeError('`suspenseFallback` should not be specified in options of string renderer');
      }

      return {
        render: function render(el, context) {
          if (options.context && (el.type.contextTypes || options.childContextTypes)) {
            var childContextTypes = _objectSpread(_objectSpread({}, el.type.contextTypes || {}), options.childContextTypes);

            var ContextWrapper = (0, _enzymeAdapterUtils.createRenderWrapper)(el, context, childContextTypes);
            return _server["default"].renderToStaticMarkup( /*#__PURE__*/_react["default"].createElement(ContextWrapper));
          }

          return _server["default"].renderToStaticMarkup(el);
        }
      };
    } // Provided a bag of options, return an `EnzymeRenderer`. Some options can be implementation
    // specific, like `attach` etc. for React, but not part of this interface explicitly.
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "createRenderer",
    value: function createRenderer(options) {
      switch (options.mode) {
        case _enzyme.EnzymeAdapter.MODES.MOUNT:
          return this.createMountRenderer(options);

        case _enzyme.EnzymeAdapter.MODES.SHALLOW:
          return this.createShallowRenderer(options);

        case _enzyme.EnzymeAdapter.MODES.STRING:
          return this.createStringRenderer(options);

        default:
          throw new Error("Enzyme Internal Error: Unrecognized mode: ".concat(options.mode));
      }
    }
  }, {
    key: "wrap",
    value: function wrap(element) {
      return (0, _enzymeAdapterUtils.wrap)(element);
    } // converts an RSTNode to the corresponding JSX Pragma Element. This will be needed
    // in order to implement the `Wrapper.mount()` and `Wrapper.shallow()` methods, but should
    // be pretty straightforward for people to implement.
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "nodeToElement",
    value: function nodeToElement(node) {
      if (!node || _typeof(node) !== 'object') return null;
      var type = node.type;
      return /*#__PURE__*/_react["default"].createElement(unmemoType(type), (0, _enzymeAdapterUtils.propsWithKeysAndRef)(node));
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "matchesElementType",
    value: function matchesElementType(node, matchingType) {
      if (!node) {
        return node;
      }

      var type = node.type;
      return unmemoType(type) === unmemoType(matchingType);
    }
  }, {
    key: "elementToNode",
    value: function elementToNode(element) {
      return elementToTree(element);
    }
  }, {
    key: "nodeToHostNode",
    value: function nodeToHostNode(node) {
      var supportsArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var nodes = _nodeToHostNode(node);

      if (Array.isArray(nodes) && !supportsArray) {
        return nodes[0];
      }

      return nodes;
    }
  }, {
    key: "displayNameOfNode",
    value: function displayNameOfNode(node) {
      if (!node) return null;
      var type = node.type,
          $$typeof = node.$$typeof;
      var nodeType = type || $$typeof; // newer node types may be undefined, so only test if the nodeType exists

      if (nodeType) {
        switch (nodeType) {
          case (is166 ? _reactIs.ConcurrentMode : _reactIs.AsyncMode) || NaN:
            return is166 ? 'ConcurrentMode' : 'AsyncMode';

          case _reactIs.Fragment || NaN:
            return 'Fragment';

          case _reactIs.StrictMode || NaN:
            return 'StrictMode';

          case _reactIs.Profiler || NaN:
            return 'Profiler';

          case _reactIs.Portal || NaN:
            return 'Portal';

          case _reactIs.Suspense || NaN:
            return 'Suspense';

          default:
        }
      }

      var $$typeofType = type && type.$$typeof;

      switch ($$typeofType) {
        case _reactIs.ContextConsumer || NaN:
          return 'ContextConsumer';

        case _reactIs.ContextProvider || NaN:
          return 'ContextProvider';

        case _reactIs.Memo || NaN:
          {
            var nodeName = (0, _enzymeAdapterUtils.displayNameOfNode)(node);
            return typeof nodeName === 'string' ? nodeName : "Memo(".concat((0, _enzymeAdapterUtils.displayNameOfNode)(type), ")");
          }

        case _reactIs.ForwardRef || NaN:
          {
            if (type.displayName) {
              return type.displayName;
            }

            var name = (0, _enzymeAdapterUtils.displayNameOfNode)({
              type: type.render
            });
            return name ? "ForwardRef(".concat(name, ")") : 'ForwardRef';
          }

        case _reactIs.Lazy || NaN:
          {
            return 'lazy';
          }

        default:
          return (0, _enzymeAdapterUtils.displayNameOfNode)(node);
      }
    }
  }, {
    key: "isValidElement",
    value: function isValidElement(element) {
      return (0, _reactIs.isElement)(element);
    }
  }, {
    key: "isValidElementType",
    value: function isValidElementType(object) {
      return !!object && (0, _reactIs.isValidElementType)(object);
    }
  }, {
    key: "isFragment",
    value: function isFragment(fragment) {
      return (0, _Utils.typeOfNode)(fragment) === _reactIs.Fragment;
    }
  }, {
    key: "isCustomComponent",
    value: function isCustomComponent(type) {
      var fakeElement = makeFakeElement(type);
      return !!type && (typeof type === 'function' || (0, _reactIs.isForwardRef)(fakeElement) || (0, _reactIs.isContextProvider)(fakeElement) || (0, _reactIs.isContextConsumer)(fakeElement) || (0, _reactIs.isSuspense)(fakeElement));
    }
  }, {
    key: "isContextConsumer",
    value: function isContextConsumer(type) {
      return !!type && (0, _reactIs.isContextConsumer)(makeFakeElement(type));
    }
  }, {
    key: "isCustomComponentElement",
    value: function isCustomComponentElement(inst) {
      if (!inst || !this.isValidElement(inst)) {
        return false;
      }

      return this.isCustomComponent(inst.type);
    }
  }, {
    key: "getProviderFromConsumer",
    value: function getProviderFromConsumer(Consumer) {
      // React stores references to the Provider on a Consumer differently across versions.
      if (Consumer) {
        var Provider;

        if (Consumer._context) {
          // check this first, to avoid a deprecation warning
          Provider = Consumer._context.Provider;
        } else if (Consumer.Provider) {
          Provider = Consumer.Provider;
        }

        if (Provider) {
          return Provider;
        }
      }

      throw new Error('Enzyme Internal Error: can’t figure out how to get Provider from Consumer');
    }
  }, {
    key: "createElement",
    value: function createElement() {
      return /*#__PURE__*/_react["default"].createElement.apply(_react["default"], arguments);
    }
  }, {
    key: "wrapWithWrappingComponent",
    value: function wrapWithWrappingComponent(node, options) {
      return {
        RootFinder: _enzymeAdapterUtils.RootFinder,
        node: (0, _enzymeAdapterUtils.wrapWithWrappingComponent)(_react["default"].createElement, node, options)
      };
    }
  }]);

  return ReactSeventeenAdapter;
}(_enzyme.EnzymeAdapter);

module.exports = ReactSeventeenAdapter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWFjdFNldmVudGVlbkFkYXB0ZXIuanMiXSwibmFtZXMiOlsiaXMxNjQiLCJUZXN0VXRpbHMiLCJTaW11bGF0ZSIsInRvdWNoU3RhcnQiLCJpczE2NSIsImF1eENsaWNrIiwiaXMxNjYiLCJSZWFjdCIsInVuc3RhYmxlX0FzeW5jTW9kZSIsImlzMTY4IiwiYWN0IiwiaGFzU2hvdWxkQ29tcG9uZW50VXBkYXRlQnVnIiwic2VtdmVyIiwic2F0aXNmaWVzIiwidGVzdFJlbmRlcmVyVmVyc2lvbiIsIkZpYmVyVGFncyIsIm5vZGVBbmRTaWJsaW5nc0FycmF5Iiwibm9kZVdpdGhTaWJsaW5nIiwiYXJyYXkiLCJub2RlIiwicHVzaCIsInNpYmxpbmciLCJmbGF0dGVuIiwiYXJyIiwicmVzdWx0Iiwic3RhY2siLCJpIiwibGVuZ3RoIiwibiIsInBvcCIsImVsIiwiQXJyYXkiLCJpc0FycmF5Iiwibm9kZVR5cGVGcm9tVHlwZSIsInR5cGUiLCJQb3J0YWwiLCJpc01lbW8iLCJNZW1vIiwiaXNMYXp5IiwiTGF6eSIsInVubWVtb1R5cGUiLCJjaGVja0lzU3VzcGVuc2VBbmRDbG9uZUVsZW1lbnQiLCJzdXNwZW5zZUZhbGxiYWNrIiwiY2hpbGRyZW4iLCJwcm9wcyIsImZhbGxiYWNrIiwicmVwbGFjZUxhenlXaXRoRmFsbGJhY2siLCJGYWtlU3VzcGVuc2VXcmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImVsZW1lbnRUb1RyZWUiLCJjb250YWluZXJJbmZvIiwibm9kZVR5cGUiLCJrZXkiLCJyZWYiLCJpbnN0YW5jZSIsInJlbmRlcmVkIiwidG9UcmVlIiwidm5vZGUiLCJ0YWciLCJIb3N0Um9vdCIsImNoaWxkcmVuVG9UcmVlIiwiY2hpbGQiLCJIb3N0UG9ydGFsIiwic3RhdGVOb2RlIiwibWVtb2l6ZWRQcm9wcyIsIkNsYXNzQ29tcG9uZW50IiwiRnVuY3Rpb25hbENvbXBvbmVudCIsIk1lbW9DbGFzcyIsImVsZW1lbnRUeXBlIiwiTWVtb1NGQyIsInJlbmRlcmVkTm9kZXMiLCJtYXAiLCJIb3N0Q29tcG9uZW50IiwiSG9zdFRleHQiLCJGcmFnbWVudCIsIk1vZGUiLCJDb250ZXh0UHJvdmlkZXIiLCJDb250ZXh0Q29uc3VtZXIiLCJQcm9maWxlciIsIkZvcndhcmRSZWYiLCJwZW5kaW5nUHJvcHMiLCJTdXNwZW5zZSIsIk9mZnNjcmVlbkNvbXBvbmVudCIsIkVycm9yIiwibm9kZVRvSG9zdE5vZGUiLCJfbm9kZSIsIm1hcHBlciIsIml0ZW0iLCJSZWFjdERPTSIsImZpbmRET01Ob2RlIiwiZXZlbnRPcHRpb25zIiwiYW5pbWF0aW9uIiwicG9pbnRlckV2ZW50cyIsImdldEVtcHR5U3RhdGVWYWx1ZSIsIkVtcHR5U3RhdGUiLCJDb21wb25lbnQiLCJ0ZXN0UmVuZGVyZXIiLCJTaGFsbG93UmVuZGVyZXIiLCJyZW5kZXIiLCJfaW5zdGFuY2UiLCJzdGF0ZSIsIndyYXBBY3QiLCJmbiIsInJldHVyblZhbCIsImdldFByb3ZpZGVyRGVmYXVsdFZhbHVlIiwiUHJvdmlkZXIiLCJfY29udGV4dCIsIl9kZWZhdWx0VmFsdWUiLCJfY3VycmVudFZhbHVlIiwibWFrZUZha2VFbGVtZW50IiwiJCR0eXBlb2YiLCJFbGVtZW50IiwiaXNTdGF0ZWZ1bCIsInByb3RvdHlwZSIsImlzUmVhY3RDb21wb25lbnQiLCJfX3JlYWN0QXV0b0JpbmRQYWlycyIsIlJlYWN0U2V2ZW50ZWVuQWRhcHRlciIsImxpZmVjeWNsZXMiLCJvcHRpb25zIiwiZW5hYmxlQ29tcG9uZW50RGlkVXBkYXRlT25TZXRTdGF0ZSIsImxlZ2FjeUNvbnRleHRNb2RlIiwiY29tcG9uZW50RGlkVXBkYXRlIiwib25TZXRTdGF0ZSIsImdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyIsImdldFNuYXBzaG90QmVmb3JlVXBkYXRlIiwic2V0U3RhdGUiLCJza2lwc0NvbXBvbmVudERpZFVwZGF0ZU9uTnVsbGlzaCIsImdldENoaWxkQ29udGV4dCIsImNhbGxlZEJ5UmVuZGVyZXIiLCJnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IiLCJUeXBlRXJyb3IiLCJhdHRhY2hUbyIsImh5ZHJhdGVJbiIsIndyYXBwaW5nQ29tcG9uZW50UHJvcHMiLCJkb21Ob2RlIiwiZ2xvYmFsIiwiZG9jdW1lbnQiLCJhZGFwdGVyIiwiY29udGV4dCIsImNhbGxiYWNrIiwid3JhcHBlclByb3BzIiwicmVmUHJvcCIsIlJlYWN0V3JhcHBlckNvbXBvbmVudCIsIndyYXBwZWRFbCIsImh5ZHJhdGUiLCJzZXRDaGlsZFByb3BzIiwidW5tb3VudCIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJnZXROb2RlIiwiaXNDdXN0b21Db21wb25lbnQiLCJfcmVhY3RJbnRlcm5hbHMiLCJzaW11bGF0ZUVycm9yIiwibm9kZUhpZXJhcmNoeSIsInJvb3ROb2RlIiwiZXJyb3IiLCJpc0Vycm9yQm91bmRhcnkiLCJlbEluc3RhbmNlIiwiY29tcG9uZW50RGlkQ2F0Y2giLCJmaW5kIiwiY2F0Y2hpbmdJbnN0YW5jZSIsImNhdGNoaW5nVHlwZSIsImRpc3BsYXlOYW1lT2ZOb2RlIiwidW5kZWZpbmVkIiwic2ltdWxhdGVFdmVudCIsImV2ZW50IiwibW9jayIsIm1hcHBlZEV2ZW50IiwiZXZlbnRGbiIsImJhdGNoZWRVcGRhdGVzIiwiZ2V0V3JhcHBpbmdDb21wb25lbnRSZW5kZXJlciIsImluc3QiLCJnZXRNb3VudFdyYXBwZXJJbnN0YW5jZSIsIndyYXBJbnZva2UiLCJyZW5kZXJlciIsImlzRE9NIiwiY2FjaGVkTm9kZSIsImxhc3RDb21wb25lbnQiLCJ3cmFwcGVkQ29tcG9uZW50Iiwic2VudGluZWwiLCJ3cmFwUHVyZUNvbXBvbmVudCIsImNvbXBhcmUiLCJSYW5nZUVycm9yIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwibmV4dFByb3BzIiwiaXNQdXJlUmVhY3RDb21wb25lbnQiLCJtZW1vaXplZCIsInByZXZQcm9wcyIsIndyYXBwZWRDb21wb25lbnRGbiIsInNob3VsZFVwZGF0ZSIsImFyZ3MiLCJkZWZhdWx0UHJvcHMiLCJkaXNwbGF5TmFtZSIsIndyYXBGdW5jdGlvbmFsQ29tcG9uZW50IiwicmVuZGVyRWxlbWVudCIsImVsQ29uZmlnIiwicmVzdCIsInJlbmRlcmVkRWwiLCJ0eXBlSXNFeGlzdGVkIiwiY2xvbmVkRWwiLCJlbGVtZW50SXNDaGFuZ2VkIiwidW5tYXNrZWRDb250ZXh0IiwicHJvdmlkZXJWYWx1ZXMiLCJNYXAiLCJzZXQiLCJ2YWx1ZSIsIk1vY2tQcm92aWRlciIsImdldFByb3ZpZGVyRnJvbUNvbnN1bWVyIiwiaGFzIiwiZ2V0IiwiTW9ja0NvbnN1bWVyIiwiY29udGV4dFR5cGVzIiwiSW5uZXJDb21wIiwiZW1wdHlTdGF0ZVZhbHVlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJvdXRwdXQiLCJnZXRSZW5kZXJPdXRwdXQiLCJjb25jYXQiLCJoYW5kbGVyIiwiY2hlY2tQcm9wVHlwZXMiLCJ0eXBlU3BlY3MiLCJ2YWx1ZXMiLCJsb2NhdGlvbiIsImhpZXJhcmNoeSIsImNoaWxkQ29udGV4dFR5cGVzIiwiQ29udGV4dFdyYXBwZXIiLCJSZWFjdERPTVNlcnZlciIsInJlbmRlclRvU3RhdGljTWFya3VwIiwibW9kZSIsIkVuenltZUFkYXB0ZXIiLCJNT0RFUyIsIk1PVU5UIiwiY3JlYXRlTW91bnRSZW5kZXJlciIsIlNIQUxMT1ciLCJjcmVhdGVTaGFsbG93UmVuZGVyZXIiLCJTVFJJTkciLCJjcmVhdGVTdHJpbmdSZW5kZXJlciIsImVsZW1lbnQiLCJtYXRjaGluZ1R5cGUiLCJzdXBwb3J0c0FycmF5Iiwibm9kZXMiLCJDb25jdXJyZW50TW9kZSIsIkFzeW5jTW9kZSIsIk5hTiIsIlN0cmljdE1vZGUiLCIkJHR5cGVvZlR5cGUiLCJub2RlTmFtZSIsIm5hbWUiLCJvYmplY3QiLCJmcmFnbWVudCIsImZha2VFbGVtZW50IiwiaXNWYWxpZEVsZW1lbnQiLCJDb25zdW1lciIsIlJvb3RGaW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoi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aW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnJlc29sdmVkXG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVucmVzb2x2ZWRcbmltcG9ydCBTaGFsbG93UmVuZGVyZXIgZnJvbSAncmVhY3QtdGVzdC1yZW5kZXJlci9zaGFsbG93JztcbmltcG9ydCB7IHZlcnNpb24gYXMgdGVzdFJlbmRlcmVyVmVyc2lvbiB9IGZyb20gJ3JlYWN0LXRlc3QtcmVuZGVyZXIvcGFja2FnZS5qc29uJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW5yZXNvbHZlZFxuaW1wb3J0IFRlc3RVdGlscyBmcm9tICdyZWFjdC1kb20vdGVzdC11dGlscyc7XG5pbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcic7XG5pbXBvcnQgY2hlY2tQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcyc7XG5pbXBvcnQgaGFzIGZyb20gJ2hhcyc7XG5pbXBvcnQge1xuICBBc3luY01vZGUsXG4gIENvbmN1cnJlbnRNb2RlLFxuICBDb250ZXh0Q29uc3VtZXIsXG4gIENvbnRleHRQcm92aWRlcixcbiAgRWxlbWVudCxcbiAgRm9yd2FyZFJlZixcbiAgRnJhZ21lbnQsXG4gIGlzQ29udGV4dENvbnN1bWVyLFxuICBpc0NvbnRleHRQcm92aWRlcixcbiAgaXNFbGVtZW50LFxuICBpc0ZvcndhcmRSZWYsXG4gIGlzUG9ydGFsLFxuICBpc1N1c3BlbnNlLFxuICBpc1ZhbGlkRWxlbWVudFR5cGUsXG4gIExhenksXG4gIE1lbW8sXG4gIFBvcnRhbCxcbiAgUHJvZmlsZXIsXG4gIFN0cmljdE1vZGUsXG4gIFN1c3BlbnNlLFxufSBmcm9tICdyZWFjdC1pcyc7XG5pbXBvcnQgeyBFbnp5bWVBZGFwdGVyIH0gZnJvbSAnZW56eW1lJztcbmltcG9ydCB7IHR5cGVPZk5vZGUgfSBmcm9tICdlbnp5bWUvYnVpbGQvVXRpbHMnO1xuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICdlbnp5bWUtc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQge1xuICBkaXNwbGF5TmFtZU9mTm9kZSxcbiAgZWxlbWVudFRvVHJlZSBhcyB1dGlsRWxlbWVudFRvVHJlZSxcbiAgbm9kZVR5cGVGcm9tVHlwZSBhcyB1dGlsTm9kZVR5cGVGcm9tVHlwZSxcbiAgbWFwTmF0aXZlRXZlbnROYW1lcyxcbiAgcHJvcEZyb21FdmVudCxcbiAgYXNzZXJ0RG9tQXZhaWxhYmxlLFxuICB3aXRoU2V0U3RhdGVBbGxvd2VkLFxuICBjcmVhdGVSZW5kZXJXcmFwcGVyLFxuICBjcmVhdGVNb3VudFdyYXBwZXIsXG4gIHByb3BzV2l0aEtleXNBbmRSZWYsXG4gIGVuc3VyZUtleU9yVW5kZWZpbmVkLFxuICBzaW11bGF0ZUVycm9yLFxuICB3cmFwLFxuICBnZXRNYXNrZWRDb250ZXh0LFxuICBnZXRDb21wb25lbnRTdGFjayxcbiAgUm9vdEZpbmRlcixcbiAgZ2V0Tm9kZUZyb21Sb290RmluZGVyLFxuICB3cmFwV2l0aFdyYXBwaW5nQ29tcG9uZW50LFxuICBnZXRXcmFwcGluZ0NvbXBvbmVudE1vdW50UmVuZGVyZXIsXG4gIGNvbXBhcmVOb2RlVHlwZU9mLFxufSBmcm9tICdlbnp5bWUtYWRhcHRlci11dGlscyc7XG5pbXBvcnQgZmluZEN1cnJlbnRGaWJlclVzaW5nU2xvd1BhdGggZnJvbSAnLi9maW5kQ3VycmVudEZpYmVyVXNpbmdTbG93UGF0aCc7XG5pbXBvcnQgZGV0ZWN0RmliZXJUYWdzIGZyb20gJy4vZGV0ZWN0RmliZXJUYWdzJztcblxuY29uc3QgaXMxNjQgPSAhIVRlc3RVdGlscy5TaW11bGF0ZS50b3VjaFN0YXJ0OyAvLyAxNi40K1xuY29uc3QgaXMxNjUgPSAhIVRlc3RVdGlscy5TaW11bGF0ZS5hdXhDbGljazsgLy8gMTYuNStcbmNvbnN0IGlzMTY2ID0gaXMxNjUgJiYgIVJlYWN0LnVuc3RhYmxlX0FzeW5jTW9kZTsgLy8gMTYuNitcbmNvbnN0IGlzMTY4ID0gaXMxNjYgJiYgdHlwZW9mIFRlc3RVdGlscy5hY3QgPT09ICdmdW5jdGlvbic7XG5cbmNvbnN0IGhhc1Nob3VsZENvbXBvbmVudFVwZGF0ZUJ1ZyA9IHNlbXZlci5zYXRpc2ZpZXModGVzdFJlbmRlcmVyVmVyc2lvbiwgJzwgMTYuOCcpO1xuXG4vLyBMYXppbHkgcG9wdWxhdGVkIGlmIERPTSBpcyBhdmFpbGFibGUuXG5sZXQgRmliZXJUYWdzID0gbnVsbDtcblxuZnVuY3Rpb24gbm9kZUFuZFNpYmxpbmdzQXJyYXkobm9kZVdpdGhTaWJsaW5nKSB7XG4gIGNvbnN0IGFycmF5ID0gW107XG4gIGxldCBub2RlID0gbm9kZVdpdGhTaWJsaW5nO1xuICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XG4gICAgYXJyYXkucHVzaChub2RlKTtcbiAgICBub2RlID0gbm9kZS5zaWJsaW5nO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGNvbnN0IHN0YWNrID0gW3sgaTogMCwgYXJyYXk6IGFyciB9XTtcbiAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgIGNvbnN0IG4gPSBzdGFjay5wb3AoKTtcbiAgICB3aGlsZSAobi5pIDwgbi5hcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGVsID0gbi5hcnJheVtuLmldO1xuICAgICAgbi5pICs9IDE7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbCkpIHtcbiAgICAgICAgc3RhY2sucHVzaChuKTtcbiAgICAgICAgc3RhY2sucHVzaCh7IGk6IDAsIGFycmF5OiBlbCB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaChlbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG5vZGVUeXBlRnJvbVR5cGUodHlwZSkge1xuICBpZiAodHlwZSA9PT0gUG9ydGFsKSB7XG4gICAgcmV0dXJuICdwb3J0YWwnO1xuICB9XG5cbiAgcmV0dXJuIHV0aWxOb2RlVHlwZUZyb21UeXBlKHR5cGUpO1xufVxuXG5mdW5jdGlvbiBpc01lbW8odHlwZSkge1xuICByZXR1cm4gY29tcGFyZU5vZGVUeXBlT2YodHlwZSwgTWVtbyk7XG59XG5cbmZ1bmN0aW9uIGlzTGF6eSh0eXBlKSB7XG4gIHJldHVybiBjb21wYXJlTm9kZVR5cGVPZih0eXBlLCBMYXp5KTtcbn1cblxuZnVuY3Rpb24gdW5tZW1vVHlwZSh0eXBlKSB7XG4gIHJldHVybiBpc01lbW8odHlwZSkgPyB0eXBlLnR5cGUgOiB0eXBlO1xufVxuXG5mdW5jdGlvbiBjaGVja0lzU3VzcGVuc2VBbmRDbG9uZUVsZW1lbnQoZWwsIHsgc3VzcGVuc2VGYWxsYmFjayB9KSB7XG4gIGlmICghaXNTdXNwZW5zZShlbCkpIHtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBsZXQgeyBjaGlsZHJlbiB9ID0gZWwucHJvcHM7XG5cbiAgaWYgKHN1c3BlbnNlRmFsbGJhY2spIHtcbiAgICBjb25zdCB7IGZhbGxiYWNrIH0gPSBlbC5wcm9wcztcbiAgICBjaGlsZHJlbiA9IHJlcGxhY2VMYXp5V2l0aEZhbGxiYWNrKGNoaWxkcmVuLCBmYWxsYmFjayk7XG4gIH1cblxuICBjb25zdCBGYWtlU3VzcGVuc2VXcmFwcGVyID0gKHByb3BzKSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIGVsLnR5cGUsXG4gICAgeyAuLi5lbC5wcm9wcywgLi4ucHJvcHMgfSxcbiAgICBjaGlsZHJlbixcbiAgKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmFrZVN1c3BlbnNlV3JhcHBlciwgbnVsbCwgY2hpbGRyZW4pO1xufVxuXG5mdW5jdGlvbiBlbGVtZW50VG9UcmVlKGVsKSB7XG4gIGlmICghaXNQb3J0YWwoZWwpKSB7XG4gICAgcmV0dXJuIHV0aWxFbGVtZW50VG9UcmVlKGVsLCBlbGVtZW50VG9UcmVlKTtcbiAgfVxuXG4gIGNvbnN0IHsgY2hpbGRyZW4sIGNvbnRhaW5lckluZm8gfSA9IGVsO1xuICBjb25zdCBwcm9wcyA9IHsgY2hpbGRyZW4sIGNvbnRhaW5lckluZm8gfTtcblxuICByZXR1cm4ge1xuICAgIG5vZGVUeXBlOiAncG9ydGFsJyxcbiAgICB0eXBlOiBQb3J0YWwsXG4gICAgcHJvcHMsXG4gICAga2V5OiBlbnN1cmVLZXlPclVuZGVmaW5lZChlbC5rZXkpLFxuICAgIHJlZjogZWwucmVmIHx8IG51bGwsXG4gICAgaW5zdGFuY2U6IG51bGwsXG4gICAgcmVuZGVyZWQ6IGVsZW1lbnRUb1RyZWUoZWwuY2hpbGRyZW4pLFxuICB9O1xufVxuXG5mdW5jdGlvbiB0b1RyZWUodm5vZGUpIHtcbiAgaWYgKHZub2RlID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBUT0RPKGxtcik6IEknbSBub3QgcmVhbGx5IHN1cmUgSSB1bmRlcnN0YW5kIHdoZXRoZXIgb3Igbm90IHRoaXMgaXMgd2hhdFxuICAvLyBpIHNob3VsZCBiZSBkb2luZywgb3IgaWYgdGhpcyBpcyBhIGhhY2sgZm9yIHNvbWV0aGluZyBpJ20gZG9pbmcgd3JvbmdcbiAgLy8gc29tZXdoZXJlIGVsc2UuIFNob3VsZCB0YWxrIHRvIHNlYmFzdGlhbiBhYm91dCB0aGlzIHBlcmhhcHNcbiAgY29uc3Qgbm9kZSA9IGZpbmRDdXJyZW50RmliZXJVc2luZ1Nsb3dQYXRoKHZub2RlKTtcbiAgc3dpdGNoIChub2RlLnRhZykge1xuICAgIGNhc2UgRmliZXJUYWdzLkhvc3RSb290OlxuICAgICAgcmV0dXJuIGNoaWxkcmVuVG9UcmVlKG5vZGUuY2hpbGQpO1xuICAgIGNhc2UgRmliZXJUYWdzLkhvc3RQb3J0YWw6IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc3RhdGVOb2RlOiB7IGNvbnRhaW5lckluZm8gfSxcbiAgICAgICAgbWVtb2l6ZWRQcm9wczogY2hpbGRyZW4sXG4gICAgICB9ID0gbm9kZTtcbiAgICAgIGNvbnN0IHByb3BzID0geyBjb250YWluZXJJbmZvLCBjaGlsZHJlbiB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbm9kZVR5cGU6ICdwb3J0YWwnLFxuICAgICAgICB0eXBlOiBQb3J0YWwsXG4gICAgICAgIHByb3BzLFxuICAgICAgICBrZXk6IGVuc3VyZUtleU9yVW5kZWZpbmVkKG5vZGUua2V5KSxcbiAgICAgICAgcmVmOiBub2RlLnJlZixcbiAgICAgICAgaW5zdGFuY2U6IG51bGwsXG4gICAgICAgIHJlbmRlcmVkOiBjaGlsZHJlblRvVHJlZShub2RlLmNoaWxkKSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgRmliZXJUYWdzLkNsYXNzQ29tcG9uZW50OlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbm9kZVR5cGU6ICdjbGFzcycsXG4gICAgICAgIHR5cGU6IG5vZGUudHlwZSxcbiAgICAgICAgcHJvcHM6IHsgLi4ubm9kZS5tZW1vaXplZFByb3BzIH0sXG4gICAgICAgIGtleTogZW5zdXJlS2V5T3JVbmRlZmluZWQobm9kZS5rZXkpLFxuICAgICAgICByZWY6IG5vZGUucmVmLFxuICAgICAgICBpbnN0YW5jZTogbm9kZS5zdGF0ZU5vZGUsXG4gICAgICAgIHJlbmRlcmVkOiBjaGlsZHJlblRvVHJlZShub2RlLmNoaWxkKSxcbiAgICAgIH07XG4gICAgY2FzZSBGaWJlclRhZ3MuRnVuY3Rpb25hbENvbXBvbmVudDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5vZGVUeXBlOiAnZnVuY3Rpb24nLFxuICAgICAgICB0eXBlOiBub2RlLnR5cGUsXG4gICAgICAgIHByb3BzOiB7IC4uLm5vZGUubWVtb2l6ZWRQcm9wcyB9LFxuICAgICAgICBrZXk6IGVuc3VyZUtleU9yVW5kZWZpbmVkKG5vZGUua2V5KSxcbiAgICAgICAgcmVmOiBub2RlLnJlZixcbiAgICAgICAgaW5zdGFuY2U6IG51bGwsXG4gICAgICAgIHJlbmRlcmVkOiBjaGlsZHJlblRvVHJlZShub2RlLmNoaWxkKSxcbiAgICAgIH07XG4gICAgY2FzZSBGaWJlclRhZ3MuTWVtb0NsYXNzOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbm9kZVR5cGU6ICdjbGFzcycsXG4gICAgICAgIHR5cGU6IG5vZGUuZWxlbWVudFR5cGUudHlwZSxcbiAgICAgICAgcHJvcHM6IHsgLi4ubm9kZS5tZW1vaXplZFByb3BzIH0sXG4gICAgICAgIGtleTogZW5zdXJlS2V5T3JVbmRlZmluZWQobm9kZS5rZXkpLFxuICAgICAgICByZWY6IG5vZGUucmVmLFxuICAgICAgICBpbnN0YW5jZTogbm9kZS5zdGF0ZU5vZGUsXG4gICAgICAgIHJlbmRlcmVkOiBjaGlsZHJlblRvVHJlZShub2RlLmNoaWxkLmNoaWxkKSxcbiAgICAgIH07XG4gICAgY2FzZSBGaWJlclRhZ3MuTWVtb1NGQzoge1xuICAgICAgbGV0IHJlbmRlcmVkTm9kZXMgPSBmbGF0dGVuKG5vZGVBbmRTaWJsaW5nc0FycmF5KG5vZGUuY2hpbGQpLm1hcCh0b1RyZWUpKTtcbiAgICAgIGlmIChyZW5kZXJlZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZW5kZXJlZE5vZGVzID0gW25vZGUubWVtb2l6ZWRQcm9wcy5jaGlsZHJlbl07XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBub2RlVHlwZTogJ2Z1bmN0aW9uJyxcbiAgICAgICAgdHlwZTogbm9kZS5lbGVtZW50VHlwZSxcbiAgICAgICAgcHJvcHM6IHsgLi4ubm9kZS5tZW1vaXplZFByb3BzIH0sXG4gICAgICAgIGtleTogZW5zdXJlS2V5T3JVbmRlZmluZWQobm9kZS5rZXkpLFxuICAgICAgICByZWY6IG5vZGUucmVmLFxuICAgICAgICBpbnN0YW5jZTogbnVsbCxcbiAgICAgICAgcmVuZGVyZWQ6IHJlbmRlcmVkTm9kZXMsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlIEZpYmVyVGFncy5Ib3N0Q29tcG9uZW50OiB7XG4gICAgICBsZXQgcmVuZGVyZWROb2RlcyA9IGZsYXR0ZW4obm9kZUFuZFNpYmxpbmdzQXJyYXkobm9kZS5jaGlsZCkubWFwKHRvVHJlZSkpO1xuICAgICAgaWYgKHJlbmRlcmVkTm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbmRlcmVkTm9kZXMgPSBbbm9kZS5tZW1vaXplZFByb3BzLmNoaWxkcmVuXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5vZGVUeXBlOiAnaG9zdCcsXG4gICAgICAgIHR5cGU6IG5vZGUudHlwZSxcbiAgICAgICAgcHJvcHM6IHsgLi4ubm9kZS5tZW1vaXplZFByb3BzIH0sXG4gICAgICAgIGtleTogZW5zdXJlS2V5T3JVbmRlZmluZWQobm9kZS5rZXkpLFxuICAgICAgICByZWY6IG5vZGUucmVmLFxuICAgICAgICBpbnN0YW5jZTogbm9kZS5zdGF0ZU5vZGUsXG4gICAgICAgIHJlbmRlcmVkOiByZW5kZXJlZE5vZGVzLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBGaWJlclRhZ3MuSG9zdFRleHQ6XG4gICAgICByZXR1cm4gbm9kZS5tZW1vaXplZFByb3BzO1xuICAgIGNhc2UgRmliZXJUYWdzLkZyYWdtZW50OlxuICAgIGNhc2UgRmliZXJUYWdzLk1vZGU6XG4gICAgY2FzZSBGaWJlclRhZ3MuQ29udGV4dFByb3ZpZGVyOlxuICAgIGNhc2UgRmliZXJUYWdzLkNvbnRleHRDb25zdW1lcjpcbiAgICAgIHJldHVybiBjaGlsZHJlblRvVHJlZShub2RlLmNoaWxkKTtcbiAgICBjYXNlIEZpYmVyVGFncy5Qcm9maWxlcjpcbiAgICBjYXNlIEZpYmVyVGFncy5Gb3J3YXJkUmVmOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBub2RlVHlwZTogJ2Z1bmN0aW9uJyxcbiAgICAgICAgdHlwZTogbm9kZS50eXBlLFxuICAgICAgICBwcm9wczogeyAuLi5ub2RlLnBlbmRpbmdQcm9wcyB9LFxuICAgICAgICBrZXk6IGVuc3VyZUtleU9yVW5kZWZpbmVkKG5vZGUua2V5KSxcbiAgICAgICAgcmVmOiBub2RlLnJlZixcbiAgICAgICAgaW5zdGFuY2U6IG51bGwsXG4gICAgICAgIHJlbmRlcmVkOiBjaGlsZHJlblRvVHJlZShub2RlLmNoaWxkKSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgRmliZXJUYWdzLlN1c3BlbnNlOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBub2RlVHlwZTogJ2Z1bmN0aW9uJyxcbiAgICAgICAgdHlwZTogU3VzcGVuc2UsXG4gICAgICAgIHByb3BzOiB7IC4uLm5vZGUubWVtb2l6ZWRQcm9wcyB9LFxuICAgICAgICBrZXk6IGVuc3VyZUtleU9yVW5kZWZpbmVkKG5vZGUua2V5KSxcbiAgICAgICAgcmVmOiBub2RlLnJlZixcbiAgICAgICAgaW5zdGFuY2U6IG51bGwsXG4gICAgICAgIHJlbmRlcmVkOiBjaGlsZHJlblRvVHJlZShub2RlLmNoaWxkKSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgRmliZXJUYWdzLkxhenk6XG4gICAgICByZXR1cm4gY2hpbGRyZW5Ub1RyZWUobm9kZS5jaGlsZCk7XG4gICAgY2FzZSBGaWJlclRhZ3MuT2Zmc2NyZWVuQ29tcG9uZW50OlxuICAgICAgcmV0dXJuIHRvVHJlZShub2RlLmNoaWxkKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbnp5bWUgSW50ZXJuYWwgRXJyb3I6IHVua25vd24gbm9kZSB3aXRoIHRhZyAke25vZGUudGFnfWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoaWxkcmVuVG9UcmVlKG5vZGUpIHtcbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgY2hpbGRyZW4gPSBub2RlQW5kU2libGluZ3NBcnJheShub2RlKTtcbiAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gdG9UcmVlKGNoaWxkcmVuWzBdKTtcbiAgfVxuICByZXR1cm4gZmxhdHRlbihjaGlsZHJlbi5tYXAodG9UcmVlKSk7XG59XG5cbmZ1bmN0aW9uIG5vZGVUb0hvc3ROb2RlKF9ub2RlKSB7XG4gIC8vIE5PVEUobG1yKTogbm9kZSBjb3VsZCBiZSBhIGZ1bmN0aW9uIGNvbXBvbmVudFxuICAvLyB3aGljaCB3b250IGhhdmUgYW4gaW5zdGFuY2UgcHJvcCwgYnV0IHdlIGNhbiBnZXQgdGhlXG4gIC8vIGhvc3Qgbm9kZSBhc3NvY2lhdGVkIHdpdGggaXRzIHJldHVybiB2YWx1ZSBhdCB0aGF0IHBvaW50LlxuICAvLyBBbHRob3VnaCB0aGlzIGJyZWFrcyBkb3duIGlmIHRoZSByZXR1cm4gdmFsdWUgaXMgYW4gYXJyYXksXG4gIC8vIGFzIGlzIHBvc3NpYmxlIHdpdGggUmVhY3QgMTYuXG4gIGxldCBub2RlID0gX25vZGU7XG4gIHdoaWxlIChub2RlICYmICFBcnJheS5pc0FycmF5KG5vZGUpICYmIG5vZGUuaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICBub2RlID0gbm9kZS5yZW5kZXJlZDtcbiAgfVxuICAvLyBpZiB0aGUgU0ZDIHJldHVybmVkIG51bGwgZWZmZWN0aXZlbHksIHRoZXJlIGlzIG5vIGhvc3Qgbm9kZS5cbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBtYXBwZXIgPSAoaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtICYmIGl0ZW0uaW5zdGFuY2UpIHJldHVybiBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtLmluc3RhbmNlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZS5tYXAobWFwcGVyKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlLnJlbmRlcmVkKSAmJiBub2RlLm5vZGVUeXBlID09PSAnY2xhc3MnKSB7XG4gICAgcmV0dXJuIG5vZGUucmVuZGVyZWQubWFwKG1hcHBlcik7XG4gIH1cbiAgcmV0dXJuIG1hcHBlcihub2RlKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUxhenlXaXRoRmFsbGJhY2sobm9kZSwgZmFsbGJhY2spIHtcbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZS5tYXAoKGVsKSA9PiByZXBsYWNlTGF6eVdpdGhGYWxsYmFjayhlbCwgZmFsbGJhY2spKTtcbiAgfVxuICBpZiAoaXNMYXp5KG5vZGUudHlwZSkpIHtcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICAuLi5ub2RlLFxuICAgIHByb3BzOiB7XG4gICAgICAuLi5ub2RlLnByb3BzLFxuICAgICAgY2hpbGRyZW46IHJlcGxhY2VMYXp5V2l0aEZhbGxiYWNrKG5vZGUucHJvcHMuY2hpbGRyZW4sIGZhbGxiYWNrKSxcbiAgICB9LFxuICB9O1xufVxuXG5jb25zdCBldmVudE9wdGlvbnMgPSB7XG4gIGFuaW1hdGlvbjogdHJ1ZSxcbiAgcG9pbnRlckV2ZW50czogaXMxNjQsXG4gIGF1eENsaWNrOiBpczE2NSxcbn07XG5cbmZ1bmN0aW9uIGdldEVtcHR5U3RhdGVWYWx1ZSgpIHtcbiAgLy8gdGhpcyBoYW5kbGVzIGEgYnVnIGluIFJlYWN0IDE2LjAgLSAxNi4yXG4gIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvY29tbWl0LzM5YmU4MzU2NWM2NWY5YzUyMjE1MGU1MjM3NTE2NzU2OGEyYTE0NTlcbiAgLy8gYWxzbyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvMTE5NjVcblxuICBjbGFzcyBFbXB0eVN0YXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgY29uc3QgdGVzdFJlbmRlcmVyID0gbmV3IFNoYWxsb3dSZW5kZXJlcigpO1xuICB0ZXN0UmVuZGVyZXIucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRW1wdHlTdGF0ZSkpO1xuICByZXR1cm4gdGVzdFJlbmRlcmVyLl9pbnN0YW5jZS5zdGF0ZTtcbn1cblxuZnVuY3Rpb24gd3JhcEFjdChmbikge1xuICBpZiAoIWlzMTY4KSB7XG4gICAgcmV0dXJuIGZuKCk7XG4gIH1cbiAgbGV0IHJldHVyblZhbDtcbiAgVGVzdFV0aWxzLmFjdCgoKSA9PiB7IHJldHVyblZhbCA9IGZuKCk7IH0pO1xuICByZXR1cm4gcmV0dXJuVmFsO1xufVxuXG5mdW5jdGlvbiBnZXRQcm92aWRlckRlZmF1bHRWYWx1ZShQcm92aWRlcikge1xuICAvLyBSZWFjdCBzdG9yZXMgcmVmZXJlbmNlcyB0byB0aGUgUHJvdmlkZXIncyBkZWZhdWx0VmFsdWUgZGlmZmVyZW50bHkgYWNyb3NzIHZlcnNpb25zLlxuICBpZiAoJ19kZWZhdWx0VmFsdWUnIGluIFByb3ZpZGVyLl9jb250ZXh0KSB7XG4gICAgcmV0dXJuIFByb3ZpZGVyLl9jb250ZXh0Ll9kZWZhdWx0VmFsdWU7XG4gIH1cbiAgaWYgKCdfY3VycmVudFZhbHVlJyBpbiBQcm92aWRlci5fY29udGV4dCkge1xuICAgIHJldHVybiBQcm92aWRlci5fY29udGV4dC5fY3VycmVudFZhbHVlO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignRW56eW1lIEludGVybmFsIEVycm9yOiBjYW7igJl0IGZpZ3VyZSBvdXQgaG93IHRvIGdldCBQcm92aWRlcuKAmXMgZGVmYXVsdCB2YWx1ZScpO1xufVxuXG5mdW5jdGlvbiBtYWtlRmFrZUVsZW1lbnQodHlwZSkge1xuICByZXR1cm4geyAkJHR5cGVvZjogRWxlbWVudCwgdHlwZSB9O1xufVxuXG5mdW5jdGlvbiBpc1N0YXRlZnVsKENvbXBvbmVudCkge1xuICByZXR1cm4gQ29tcG9uZW50LnByb3RvdHlwZSAmJiAoXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50XG4gICAgfHwgQXJyYXkuaXNBcnJheShDb21wb25lbnQuX19yZWFjdEF1dG9CaW5kUGFpcnMpIC8vIGZhbGxiYWNrIGZvciBjcmVhdGVDbGFzcyBjb21wb25lbnRzXG4gICk7XG59XG5cbmNsYXNzIFJlYWN0U2V2ZW50ZWVuQWRhcHRlciBleHRlbmRzIEVuenltZUFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHsgbGlmZWN5Y2xlcyB9ID0gdGhpcy5vcHRpb25zO1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIC4uLnRoaXMub3B0aW9ucyxcbiAgICAgIGVuYWJsZUNvbXBvbmVudERpZFVwZGF0ZU9uU2V0U3RhdGU6IHRydWUsIC8vIFRPRE86IHJlbW92ZSwgc2VtdmVyLW1ham9yXG4gICAgICBsZWdhY3lDb250ZXh0TW9kZTogJ3BhcmVudCcsXG4gICAgICBsaWZlY3ljbGVzOiB7XG4gICAgICAgIC4uLmxpZmVjeWNsZXMsXG4gICAgICAgIGNvbXBvbmVudERpZFVwZGF0ZToge1xuICAgICAgICAgIG9uU2V0U3RhdGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wczoge1xuICAgICAgICAgIGhhc1Nob3VsZENvbXBvbmVudFVwZGF0ZUJ1ZyxcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U25hcHNob3RCZWZvcmVVcGRhdGU6IHRydWUsXG4gICAgICAgIHNldFN0YXRlOiB7XG4gICAgICAgICAgc2tpcHNDb21wb25lbnREaWRVcGRhdGVPbk51bGxpc2g6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGdldENoaWxkQ29udGV4dDoge1xuICAgICAgICAgIGNhbGxlZEJ5UmVuZGVyZXI6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3I6IGlzMTY2LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlTW91bnRSZW5kZXJlcihvcHRpb25zKSB7XG4gICAgYXNzZXJ0RG9tQXZhaWxhYmxlKCdtb3VudCcpO1xuICAgIGlmIChoYXMob3B0aW9ucywgJ3N1c3BlbnNlRmFsbGJhY2snKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYHN1c3BlbnNlRmFsbGJhY2tgIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBtb3VudGAgcmVuZGVyZXInKTtcbiAgICB9XG4gICAgaWYgKEZpYmVyVGFncyA9PT0gbnVsbCkge1xuICAgICAgLy8gUmVxdWlyZXMgRE9NLlxuICAgICAgRmliZXJUYWdzID0gZGV0ZWN0RmliZXJUYWdzKCk7XG4gICAgfVxuICAgIGNvbnN0IHsgYXR0YWNoVG8sIGh5ZHJhdGVJbiwgd3JhcHBpbmdDb21wb25lbnRQcm9wcyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBkb21Ob2RlID0gaHlkcmF0ZUluIHx8IGF0dGFjaFRvIHx8IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgaW5zdGFuY2UgPSBudWxsO1xuICAgIGNvbnN0IGFkYXB0ZXIgPSB0aGlzO1xuICAgIHJldHVybiB7XG4gICAgICByZW5kZXIoZWwsIGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB3cmFwQWN0KCgpID0+IHtcbiAgICAgICAgICBpZiAoaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdHlwZSwgcHJvcHMsIHJlZiB9ID0gZWw7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyUHJvcHMgPSB7XG4gICAgICAgICAgICAgIENvbXBvbmVudDogdHlwZSxcbiAgICAgICAgICAgICAgcHJvcHMsXG4gICAgICAgICAgICAgIHdyYXBwaW5nQ29tcG9uZW50UHJvcHMsXG4gICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgIC4uLihyZWYgJiYgeyByZWZQcm9wOiByZWYgfSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgUmVhY3RXcmFwcGVyQ29tcG9uZW50ID0gY3JlYXRlTW91bnRXcmFwcGVyKGVsLCB7IC4uLm9wdGlvbnMsIGFkYXB0ZXIgfSk7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVkRWwgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0V3JhcHBlckNvbXBvbmVudCwgd3JhcHBlclByb3BzKTtcbiAgICAgICAgICAgIGluc3RhbmNlID0gaHlkcmF0ZUluXG4gICAgICAgICAgICAgID8gUmVhY3RET00uaHlkcmF0ZSh3cmFwcGVkRWwsIGRvbU5vZGUpXG4gICAgICAgICAgICAgIDogUmVhY3RET00ucmVuZGVyKHdyYXBwZWRFbCwgZG9tTm9kZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnNldENoaWxkUHJvcHMoZWwucHJvcHMsIGNvbnRleHQsIGNhbGxiYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUoZG9tTm9kZSk7XG4gICAgICAgIGluc3RhbmNlID0gbnVsbDtcbiAgICAgIH0sXG4gICAgICBnZXROb2RlKCkge1xuICAgICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldE5vZGVGcm9tUm9vdEZpbmRlcihcbiAgICAgICAgICBhZGFwdGVyLmlzQ3VzdG9tQ29tcG9uZW50LFxuICAgICAgICAgIHRvVHJlZShpbnN0YW5jZS5fcmVhY3RJbnRlcm5hbHMpLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgc2ltdWxhdGVFcnJvcihub2RlSGllcmFyY2h5LCByb290Tm9kZSwgZXJyb3IpIHtcbiAgICAgICAgY29uc3QgaXNFcnJvckJvdW5kYXJ5ID0gKHsgaW5zdGFuY2U6IGVsSW5zdGFuY2UsIHR5cGUgfSkgPT4ge1xuICAgICAgICAgIGlmIChpczE2NiAmJiB0eXBlICYmIHR5cGUuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGVsSW5zdGFuY2UgJiYgZWxJbnN0YW5jZS5jb21wb25lbnREaWRDYXRjaDtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgaW5zdGFuY2U6IGNhdGNoaW5nSW5zdGFuY2UsXG4gICAgICAgICAgdHlwZTogY2F0Y2hpbmdUeXBlLFxuICAgICAgICB9ID0gbm9kZUhpZXJhcmNoeS5maW5kKGlzRXJyb3JCb3VuZGFyeSkgfHwge307XG5cbiAgICAgICAgc2ltdWxhdGVFcnJvcihcbiAgICAgICAgICBlcnJvcixcbiAgICAgICAgICBjYXRjaGluZ0luc3RhbmNlLFxuICAgICAgICAgIHJvb3ROb2RlLFxuICAgICAgICAgIG5vZGVIaWVyYXJjaHksXG4gICAgICAgICAgbm9kZVR5cGVGcm9tVHlwZSxcbiAgICAgICAgICBhZGFwdGVyLmRpc3BsYXlOYW1lT2ZOb2RlLFxuICAgICAgICAgIGlzMTY2ID8gY2F0Y2hpbmdUeXBlIDogdW5kZWZpbmVkLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHNpbXVsYXRlRXZlbnQobm9kZSwgZXZlbnQsIG1vY2spIHtcbiAgICAgICAgY29uc3QgbWFwcGVkRXZlbnQgPSBtYXBOYXRpdmVFdmVudE5hbWVzKGV2ZW50LCBldmVudE9wdGlvbnMpO1xuICAgICAgICBjb25zdCBldmVudEZuID0gVGVzdFV0aWxzLlNpbXVsYXRlW21hcHBlZEV2ZW50XTtcbiAgICAgICAgaWYgKCFldmVudEZuKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgUmVhY3RXcmFwcGVyOjpzaW11bGF0ZSgpIGV2ZW50ICcke2V2ZW50fScgZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgfVxuICAgICAgICB3cmFwQWN0KCgpID0+IHtcbiAgICAgICAgICBldmVudEZuKGFkYXB0ZXIubm9kZVRvSG9zdE5vZGUobm9kZSksIG1vY2spO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBiYXRjaGVkVXBkYXRlcyhmbikge1xuICAgICAgICByZXR1cm4gZm4oKTtcbiAgICAgICAgLy8gcmV0dXJuIFJlYWN0RE9NLnVuc3RhYmxlX2JhdGNoZWRVcGRhdGVzKGZuKTtcbiAgICAgIH0sXG4gICAgICBnZXRXcmFwcGluZ0NvbXBvbmVudFJlbmRlcmVyKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRoaXMsXG4gICAgICAgICAgLi4uZ2V0V3JhcHBpbmdDb21wb25lbnRNb3VudFJlbmRlcmVyKHtcbiAgICAgICAgICAgIHRvVHJlZTogKGluc3QpID0+IHRvVHJlZShpbnN0Ll9yZWFjdEludGVybmFscyksXG4gICAgICAgICAgICBnZXRNb3VudFdyYXBwZXJJbnN0YW5jZTogKCkgPT4gaW5zdGFuY2UsXG4gICAgICAgICAgfSksXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgLi4uKGlzMTY4ICYmIHsgd3JhcEludm9rZTogd3JhcEFjdCB9KSxcbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlU2hhbGxvd1JlbmRlcmVyKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGFkYXB0ZXIgPSB0aGlzO1xuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFNoYWxsb3dSZW5kZXJlcigpO1xuICAgIGNvbnN0IHsgc3VzcGVuc2VGYWxsYmFjayB9ID0gb3B0aW9ucztcbiAgICBpZiAodHlwZW9mIHN1c3BlbnNlRmFsbGJhY2sgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBzdXNwZW5zZUZhbGxiYWNrICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignYG9wdGlvbnMuc3VzcGVuc2VGYWxsYmFja2Agc2hvdWxkIGJlIGJvb2xlYW4gb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIGxldCBpc0RPTSA9IGZhbHNlO1xuICAgIGxldCBjYWNoZWROb2RlID0gbnVsbDtcblxuICAgIGxldCBsYXN0Q29tcG9uZW50ID0gbnVsbDtcbiAgICBsZXQgd3JhcHBlZENvbXBvbmVudCA9IG51bGw7XG4gICAgY29uc3Qgc2VudGluZWwgPSB7fTtcblxuICAgIC8vIHdyYXAgbWVtbyBjb21wb25lbnRzIHdpdGggYSBQdXJlQ29tcG9uZW50LCBvciBhIGNsYXNzIGNvbXBvbmVudCB3aXRoIHNDVVxuICAgIGNvbnN0IHdyYXBQdXJlQ29tcG9uZW50ID0gKENvbXBvbmVudCwgY29tcGFyZSkgPT4ge1xuICAgICAgaWYgKCFpczE2Nikge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGhpcyBmdW5jdGlvbiBzaG91bGQgbm90IGJlIGNhbGxlZCBpbiBSZWFjdCA8IDE2LjYuIFBsZWFzZSByZXBvcnQgdGhpcyEnKTtcbiAgICAgIH1cbiAgICAgIGlmIChsYXN0Q29tcG9uZW50ICE9PSBDb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGlzU3RhdGVmdWwoQ29tcG9uZW50KSkge1xuICAgICAgICAgIHdyYXBwZWRDb21wb25lbnQgPSBjbGFzcyBleHRlbmRzIENvbXBvbmVudCB7fTtcbiAgICAgICAgICBpZiAoY29tcGFyZSkge1xuICAgICAgICAgICAgd3JhcHBlZENvbXBvbmVudC5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gKG5leHRQcm9wcykgPT4gKFxuICAgICAgICAgICAgICAhY29tcGFyZSh0aGlzLnByb3BzLCBuZXh0UHJvcHMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3cmFwcGVkQ29tcG9uZW50LnByb3RvdHlwZS5pc1B1cmVSZWFjdENvbXBvbmVudCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBtZW1vaXplZCA9IHNlbnRpbmVsO1xuICAgICAgICAgIGxldCBwcmV2UHJvcHM7XG4gICAgICAgICAgd3JhcHBlZENvbXBvbmVudCA9IGZ1bmN0aW9uIHdyYXBwZWRDb21wb25lbnRGbihwcm9wcywgLi4uYXJncykge1xuICAgICAgICAgICAgY29uc3Qgc2hvdWxkVXBkYXRlID0gbWVtb2l6ZWQgPT09IHNlbnRpbmVsIHx8IChjb21wYXJlXG4gICAgICAgICAgICAgID8gIWNvbXBhcmUocHJldlByb3BzLCBwcm9wcylcbiAgICAgICAgICAgICAgOiAhc2hhbGxvd0VxdWFsKHByZXZQcm9wcywgcHJvcHMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSkge1xuICAgICAgICAgICAgICBtZW1vaXplZCA9IENvbXBvbmVudCh7IC4uLkNvbXBvbmVudC5kZWZhdWx0UHJvcHMsIC4uLnByb3BzIH0sIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICBwcmV2UHJvcHMgPSBwcm9wcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtZW1vaXplZDtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgd3JhcHBlZENvbXBvbmVudCxcbiAgICAgICAgICBDb21wb25lbnQsXG4gICAgICAgICAgeyBkaXNwbGF5TmFtZTogYWRhcHRlci5kaXNwbGF5TmFtZU9mTm9kZSh7IHR5cGU6IENvbXBvbmVudCB9KSB9LFxuICAgICAgICApO1xuICAgICAgICBsYXN0Q29tcG9uZW50ID0gQ29tcG9uZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdyYXBwZWRDb21wb25lbnQ7XG4gICAgfTtcblxuICAgIC8vIFdyYXAgZnVuY3Rpb25hbCBjb21wb25lbnRzIG9uIHZlcnNpb25zIHByaW9yIHRvIDE2LjUsXG4gICAgLy8gdG8gYXZvaWQgaW5hZHZlcnRlbnRseSBwYXNzIGEgYHRoaXNgIGluc3RhbmNlIHRvIGl0LlxuICAgIGNvbnN0IHdyYXBGdW5jdGlvbmFsQ29tcG9uZW50ID0gKENvbXBvbmVudCkgPT4ge1xuICAgICAgaWYgKGlzMTY2ICYmIGhhcyhDb21wb25lbnQsICdkZWZhdWx0UHJvcHMnKSkge1xuICAgICAgICBpZiAobGFzdENvbXBvbmVudCAhPT0gQ29tcG9uZW50KSB7XG4gICAgICAgICAgd3JhcHBlZENvbXBvbmVudCA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbmV3LWNhcFxuICAgICAgICAgICAgKHByb3BzLCAuLi5hcmdzKSA9PiBDb21wb25lbnQoeyAuLi5Db21wb25lbnQuZGVmYXVsdFByb3BzLCAuLi5wcm9wcyB9LCAuLi5hcmdzKSxcbiAgICAgICAgICAgIENvbXBvbmVudCxcbiAgICAgICAgICAgIHsgZGlzcGxheU5hbWU6IGFkYXB0ZXIuZGlzcGxheU5hbWVPZk5vZGUoeyB0eXBlOiBDb21wb25lbnQgfSkgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGxhc3RDb21wb25lbnQgPSBDb21wb25lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdyYXBwZWRDb21wb25lbnQ7XG4gICAgICB9XG4gICAgICBpZiAoaXMxNjUpIHtcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudDtcbiAgICAgIH1cblxuICAgICAgaWYgKGxhc3RDb21wb25lbnQgIT09IENvbXBvbmVudCkge1xuICAgICAgICB3cmFwcGVkQ29tcG9uZW50ID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAoLi4uYXJncykgPT4gQ29tcG9uZW50KC4uLmFyZ3MpLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcbiAgICAgICAgICBDb21wb25lbnQsXG4gICAgICAgICk7XG4gICAgICAgIGxhc3RDb21wb25lbnQgPSBDb21wb25lbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gd3JhcHBlZENvbXBvbmVudDtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyRWxlbWVudCA9IChlbENvbmZpZywgLi4ucmVzdCkgPT4ge1xuICAgICAgY29uc3QgcmVuZGVyZWRFbCA9IHJlbmRlcmVyLnJlbmRlcihlbENvbmZpZywgLi4ucmVzdCk7XG5cbiAgICAgIGNvbnN0IHR5cGVJc0V4aXN0ZWQgPSAhIShyZW5kZXJlZEVsICYmIHJlbmRlcmVkRWwudHlwZSk7XG4gICAgICBpZiAoaXMxNjYgJiYgdHlwZUlzRXhpc3RlZCkge1xuICAgICAgICBjb25zdCBjbG9uZWRFbCA9IGNoZWNrSXNTdXNwZW5zZUFuZENsb25lRWxlbWVudChyZW5kZXJlZEVsLCB7IHN1c3BlbnNlRmFsbGJhY2sgfSk7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudElzQ2hhbmdlZCA9IGNsb25lZEVsLnR5cGUgIT09IHJlbmRlcmVkRWwudHlwZTtcbiAgICAgICAgaWYgKGVsZW1lbnRJc0NoYW5nZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVuZGVyZXIucmVuZGVyKHsgLi4uZWxDb25maWcsIHR5cGU6IGNsb25lZEVsLnR5cGUgfSwgLi4ucmVzdCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlbmRlcmVkRWw7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICByZW5kZXIoZWwsIHVubWFza2VkQ29udGV4dCwge1xuICAgICAgICBwcm92aWRlclZhbHVlcyA9IG5ldyBNYXAoKSxcbiAgICAgIH0gPSB7fSkge1xuICAgICAgICBjYWNoZWROb2RlID0gZWw7XG4gICAgICAgIC8qIGVzbGludCBjb25zaXN0ZW50LXJldHVybjogMCAqL1xuICAgICAgICBpZiAodHlwZW9mIGVsLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaXNET00gPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQ29udGV4dFByb3ZpZGVyKGVsKSkge1xuICAgICAgICAgIHByb3ZpZGVyVmFsdWVzLnNldChlbC50eXBlLCBlbC5wcm9wcy52YWx1ZSk7XG4gICAgICAgICAgY29uc3QgTW9ja1Byb3ZpZGVyID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIChwcm9wcykgPT4gcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgICBlbC50eXBlLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHdpdGhTZXRTdGF0ZUFsbG93ZWQoKCkgPT4gcmVuZGVyRWxlbWVudCh7IC4uLmVsLCB0eXBlOiBNb2NrUHJvdmlkZXIgfSkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQ29udGV4dENvbnN1bWVyKGVsKSkge1xuICAgICAgICAgIGNvbnN0IFByb3ZpZGVyID0gYWRhcHRlci5nZXRQcm92aWRlckZyb21Db25zdW1lcihlbC50eXBlKTtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3ZpZGVyVmFsdWVzLmhhcyhQcm92aWRlcilcbiAgICAgICAgICAgID8gcHJvdmlkZXJWYWx1ZXMuZ2V0KFByb3ZpZGVyKVxuICAgICAgICAgICAgOiBnZXRQcm92aWRlckRlZmF1bHRWYWx1ZShQcm92aWRlcik7XG4gICAgICAgICAgY29uc3QgTW9ja0NvbnN1bWVyID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIChwcm9wcykgPT4gcHJvcHMuY2hpbGRyZW4odmFsdWUpLFxuICAgICAgICAgICAgZWwudHlwZSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiB3aXRoU2V0U3RhdGVBbGxvd2VkKCgpID0+IHJlbmRlckVsZW1lbnQoeyAuLi5lbCwgdHlwZTogTW9ja0NvbnN1bWVyIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpc0RPTSA9IGZhbHNlO1xuICAgICAgICAgIGxldCByZW5kZXJlZEVsID0gZWw7XG4gICAgICAgICAgaWYgKGlzTGF6eShyZW5kZXJlZEVsKSkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdgUmVhY3QubGF6eWAgaXMgbm90IHN1cHBvcnRlZCBieSBzaGFsbG93IHJlbmRlcmluZy4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZW5kZXJlZEVsID0gY2hlY2tJc1N1c3BlbnNlQW5kQ2xvbmVFbGVtZW50KHJlbmRlcmVkRWwsIHsgc3VzcGVuc2VGYWxsYmFjayB9KTtcbiAgICAgICAgICBjb25zdCB7IHR5cGU6IENvbXBvbmVudCB9ID0gcmVuZGVyZWRFbDtcblxuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBnZXRNYXNrZWRDb250ZXh0KENvbXBvbmVudC5jb250ZXh0VHlwZXMsIHVubWFza2VkQ29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoaXNNZW1vKGVsLnR5cGUpKSB7XG4gICAgICAgICAgICBjb25zdCB7IHR5cGU6IElubmVyQ29tcCwgY29tcGFyZSB9ID0gZWwudHlwZTtcblxuICAgICAgICAgICAgcmV0dXJuIHdpdGhTZXRTdGF0ZUFsbG93ZWQoKCkgPT4gcmVuZGVyRWxlbWVudChcbiAgICAgICAgICAgICAgeyAuLi5lbCwgdHlwZTogd3JhcFB1cmVDb21wb25lbnQoSW5uZXJDb21wLCBjb21wYXJlKSB9LFxuICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFpc1N0YXRlZnVsKENvbXBvbmVudCkgJiYgdHlwZW9mIENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHdpdGhTZXRTdGF0ZUFsbG93ZWQoKCkgPT4gcmVuZGVyRWxlbWVudChcbiAgICAgICAgICAgICAgeyAuLi5yZW5kZXJlZEVsLCB0eXBlOiB3cmFwRnVuY3Rpb25hbENvbXBvbmVudChDb21wb25lbnQpIH0sXG4gICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaXNTdGF0ZWZ1bCkge1xuICAgICAgICAgICAgLy8gZml4IHJlYWN0IGJ1Zzsgc2VlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRFbXB0eVN0YXRlVmFsdWVgXG4gICAgICAgICAgICBjb25zdCBlbXB0eVN0YXRlVmFsdWUgPSBnZXRFbXB0eVN0YXRlVmFsdWUoKTtcbiAgICAgICAgICAgIGlmIChlbXB0eVN0YXRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudC5wcm90b3R5cGUsICdzdGF0ZScsIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBlbXB0eVN0YXRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzdGF0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHdpdGhTZXRTdGF0ZUFsbG93ZWQoKCkgPT4gcmVuZGVyRWxlbWVudChyZW5kZXJlZEVsLCBjb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1bm1vdW50KCkge1xuICAgICAgICByZW5kZXJlci51bm1vdW50KCk7XG4gICAgICB9LFxuICAgICAgZ2V0Tm9kZSgpIHtcbiAgICAgICAgaWYgKGlzRE9NKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnRUb1RyZWUoY2FjaGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gcmVuZGVyZXIuZ2V0UmVuZGVyT3V0cHV0KCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbm9kZVR5cGU6IG5vZGVUeXBlRnJvbVR5cGUoY2FjaGVkTm9kZS50eXBlKSxcbiAgICAgICAgICB0eXBlOiBjYWNoZWROb2RlLnR5cGUsXG4gICAgICAgICAgcHJvcHM6IGNhY2hlZE5vZGUucHJvcHMsXG4gICAgICAgICAga2V5OiBlbnN1cmVLZXlPclVuZGVmaW5lZChjYWNoZWROb2RlLmtleSksXG4gICAgICAgICAgcmVmOiBjYWNoZWROb2RlLnJlZixcbiAgICAgICAgICBpbnN0YW5jZTogcmVuZGVyZXIuX2luc3RhbmNlLFxuICAgICAgICAgIHJlbmRlcmVkOiBBcnJheS5pc0FycmF5KG91dHB1dClcbiAgICAgICAgICAgID8gZmxhdHRlbihvdXRwdXQpLm1hcCgoZWwpID0+IGVsZW1lbnRUb1RyZWUoZWwpKVxuICAgICAgICAgICAgOiBlbGVtZW50VG9UcmVlKG91dHB1dCksXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgc2ltdWxhdGVFcnJvcihub2RlSGllcmFyY2h5LCByb290Tm9kZSwgZXJyb3IpIHtcbiAgICAgICAgc2ltdWxhdGVFcnJvcihcbiAgICAgICAgICBlcnJvcixcbiAgICAgICAgICByZW5kZXJlci5faW5zdGFuY2UsXG4gICAgICAgICAgY2FjaGVkTm9kZSxcbiAgICAgICAgICBub2RlSGllcmFyY2h5LmNvbmNhdChjYWNoZWROb2RlKSxcbiAgICAgICAgICBub2RlVHlwZUZyb21UeXBlLFxuICAgICAgICAgIGFkYXB0ZXIuZGlzcGxheU5hbWVPZk5vZGUsXG4gICAgICAgICAgaXMxNjYgPyBjYWNoZWROb2RlLnR5cGUgOiB1bmRlZmluZWQsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgc2ltdWxhdGVFdmVudChub2RlLCBldmVudCwgLi4uYXJncykge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gbm9kZS5wcm9wc1twcm9wRnJvbUV2ZW50KGV2ZW50LCBldmVudE9wdGlvbnMpXTtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICB3aXRoU2V0U3RhdGVBbGxvd2VkKCgpID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE8obG1yKTogY3JlYXRlL3VzZSBzeW50aGV0aWMgZXZlbnRzXG4gICAgICAgICAgICAvLyBUT0RPKGxtcik6IGVtdWxhdGUgUmVhY3QncyBldmVudCBwcm9wYWdhdGlvblxuICAgICAgICAgICAgLy8gUmVhY3RET00udW5zdGFibGVfYmF0Y2hlZFVwZGF0ZXMoKCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlciguLi5hcmdzKTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYmF0Y2hlZFVwZGF0ZXMoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgIC8vIHJldHVybiBSZWFjdERPTS51bnN0YWJsZV9iYXRjaGVkVXBkYXRlcyhmbik7XG4gICAgICB9LFxuICAgICAgY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBoaWVyYXJjaHkpIHtcbiAgICAgICAgcmV0dXJuIGNoZWNrUHJvcFR5cGVzKFxuICAgICAgICAgIHR5cGVTcGVjcyxcbiAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgICAgbG9jYXRpb24sXG4gICAgICAgICAgZGlzcGxheU5hbWVPZk5vZGUoY2FjaGVkTm9kZSksXG4gICAgICAgICAgKCkgPT4gZ2V0Q29tcG9uZW50U3RhY2soaGllcmFyY2h5LmNvbmNhdChbY2FjaGVkTm9kZV0pKSxcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZVN0cmluZ1JlbmRlcmVyKG9wdGlvbnMpIHtcbiAgICBpZiAoaGFzKG9wdGlvbnMsICdzdXNwZW5zZUZhbGxiYWNrJykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2BzdXNwZW5zZUZhbGxiYWNrYCBzaG91bGQgbm90IGJlIHNwZWNpZmllZCBpbiBvcHRpb25zIG9mIHN0cmluZyByZW5kZXJlcicpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgcmVuZGVyKGVsLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRleHQgJiYgKGVsLnR5cGUuY29udGV4dFR5cGVzIHx8IG9wdGlvbnMuY2hpbGRDb250ZXh0VHlwZXMpKSB7XG4gICAgICAgICAgY29uc3QgY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gICAgICAgICAgICAuLi4oZWwudHlwZS5jb250ZXh0VHlwZXMgfHwge30pLFxuICAgICAgICAgICAgLi4ub3B0aW9ucy5jaGlsZENvbnRleHRUeXBlcyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IENvbnRleHRXcmFwcGVyID0gY3JlYXRlUmVuZGVyV3JhcHBlcihlbCwgY29udGV4dCwgY2hpbGRDb250ZXh0VHlwZXMpO1xuICAgICAgICAgIHJldHVybiBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0YXRpY01hcmt1cChSZWFjdC5jcmVhdGVFbGVtZW50KENvbnRleHRXcmFwcGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RhdGljTWFya3VwKGVsKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIC8vIFByb3ZpZGVkIGEgYmFnIG9mIG9wdGlvbnMsIHJldHVybiBhbiBgRW56eW1lUmVuZGVyZXJgLiBTb21lIG9wdGlvbnMgY2FuIGJlIGltcGxlbWVudGF0aW9uXG4gIC8vIHNwZWNpZmljLCBsaWtlIGBhdHRhY2hgIGV0Yy4gZm9yIFJlYWN0LCBidXQgbm90IHBhcnQgb2YgdGhpcyBpbnRlcmZhY2UgZXhwbGljaXRseS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgY3JlYXRlUmVuZGVyZXIob3B0aW9ucykge1xuICAgIHN3aXRjaCAob3B0aW9ucy5tb2RlKSB7XG4gICAgICBjYXNlIEVuenltZUFkYXB0ZXIuTU9ERVMuTU9VTlQ6IHJldHVybiB0aGlzLmNyZWF0ZU1vdW50UmVuZGVyZXIob3B0aW9ucyk7XG4gICAgICBjYXNlIEVuenltZUFkYXB0ZXIuTU9ERVMuU0hBTExPVzogcmV0dXJuIHRoaXMuY3JlYXRlU2hhbGxvd1JlbmRlcmVyKG9wdGlvbnMpO1xuICAgICAgY2FzZSBFbnp5bWVBZGFwdGVyLk1PREVTLlNUUklORzogcmV0dXJuIHRoaXMuY3JlYXRlU3RyaW5nUmVuZGVyZXIob3B0aW9ucyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVuenltZSBJbnRlcm5hbCBFcnJvcjogVW5yZWNvZ25pemVkIG1vZGU6ICR7b3B0aW9ucy5tb2RlfWApO1xuICAgIH1cbiAgfVxuXG4gIHdyYXAoZWxlbWVudCkge1xuICAgIHJldHVybiB3cmFwKGVsZW1lbnQpO1xuICB9XG5cbiAgLy8gY29udmVydHMgYW4gUlNUTm9kZSB0byB0aGUgY29ycmVzcG9uZGluZyBKU1ggUHJhZ21hIEVsZW1lbnQuIFRoaXMgd2lsbCBiZSBuZWVkZWRcbiAgLy8gaW4gb3JkZXIgdG8gaW1wbGVtZW50IHRoZSBgV3JhcHBlci5tb3VudCgpYCBhbmQgYFdyYXBwZXIuc2hhbGxvdygpYCBtZXRob2RzLCBidXQgc2hvdWxkXG4gIC8vIGJlIHByZXR0eSBzdHJhaWdodGZvcndhcmQgZm9yIHBlb3BsZSB0byBpbXBsZW1lbnQuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gIG5vZGVUb0VsZW1lbnQobm9kZSkge1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHsgdHlwZSB9ID0gbm9kZTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh1bm1lbW9UeXBlKHR5cGUpLCBwcm9wc1dpdGhLZXlzQW5kUmVmKG5vZGUpKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gIG1hdGNoZXNFbGVtZW50VHlwZShub2RlLCBtYXRjaGluZ1R5cGUpIHtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBjb25zdCB7IHR5cGUgfSA9IG5vZGU7XG4gICAgcmV0dXJuIHVubWVtb1R5cGUodHlwZSkgPT09IHVubWVtb1R5cGUobWF0Y2hpbmdUeXBlKTtcbiAgfVxuXG4gIGVsZW1lbnRUb05vZGUoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50VG9UcmVlKGVsZW1lbnQpO1xuICB9XG5cbiAgbm9kZVRvSG9zdE5vZGUobm9kZSwgc3VwcG9ydHNBcnJheSA9IGZhbHNlKSB7XG4gICAgY29uc3Qgbm9kZXMgPSBub2RlVG9Ib3N0Tm9kZShub2RlKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlcykgJiYgIXN1cHBvcnRzQXJyYXkpIHtcbiAgICAgIHJldHVybiBub2Rlc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9XG5cbiAgZGlzcGxheU5hbWVPZk5vZGUobm9kZSkge1xuICAgIGlmICghbm9kZSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgeyB0eXBlLCAkJHR5cGVvZiB9ID0gbm9kZTtcblxuICAgIGNvbnN0IG5vZGVUeXBlID0gdHlwZSB8fCAkJHR5cGVvZjtcblxuICAgIC8vIG5ld2VyIG5vZGUgdHlwZXMgbWF5IGJlIHVuZGVmaW5lZCwgc28gb25seSB0ZXN0IGlmIHRoZSBub2RlVHlwZSBleGlzdHNcbiAgICBpZiAobm9kZVR5cGUpIHtcbiAgICAgIHN3aXRjaCAobm9kZVR5cGUpIHtcbiAgICAgICAgY2FzZSAoaXMxNjYgPyBDb25jdXJyZW50TW9kZSA6IEFzeW5jTW9kZSkgfHwgTmFOOiByZXR1cm4gaXMxNjYgPyAnQ29uY3VycmVudE1vZGUnIDogJ0FzeW5jTW9kZSc7XG4gICAgICAgIGNhc2UgRnJhZ21lbnQgfHwgTmFOOiByZXR1cm4gJ0ZyYWdtZW50JztcbiAgICAgICAgY2FzZSBTdHJpY3RNb2RlIHx8IE5hTjogcmV0dXJuICdTdHJpY3RNb2RlJztcbiAgICAgICAgY2FzZSBQcm9maWxlciB8fCBOYU46IHJldHVybiAnUHJvZmlsZXInO1xuICAgICAgICBjYXNlIFBvcnRhbCB8fCBOYU46IHJldHVybiAnUG9ydGFsJztcbiAgICAgICAgY2FzZSBTdXNwZW5zZSB8fCBOYU46IHJldHVybiAnU3VzcGVuc2UnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0ICQkdHlwZW9mVHlwZSA9IHR5cGUgJiYgdHlwZS4kJHR5cGVvZjtcblxuICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICBjYXNlIENvbnRleHRDb25zdW1lciB8fCBOYU46IHJldHVybiAnQ29udGV4dENvbnN1bWVyJztcbiAgICAgIGNhc2UgQ29udGV4dFByb3ZpZGVyIHx8IE5hTjogcmV0dXJuICdDb250ZXh0UHJvdmlkZXInO1xuICAgICAgY2FzZSBNZW1vIHx8IE5hTjoge1xuICAgICAgICBjb25zdCBub2RlTmFtZSA9IGRpc3BsYXlOYW1lT2ZOb2RlKG5vZGUpO1xuICAgICAgICByZXR1cm4gdHlwZW9mIG5vZGVOYW1lID09PSAnc3RyaW5nJyA/IG5vZGVOYW1lIDogYE1lbW8oJHtkaXNwbGF5TmFtZU9mTm9kZSh0eXBlKX0pYDtcbiAgICAgIH1cbiAgICAgIGNhc2UgRm9yd2FyZFJlZiB8fCBOYU46IHtcbiAgICAgICAgaWYgKHR5cGUuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYW1lID0gZGlzcGxheU5hbWVPZk5vZGUoeyB0eXBlOiB0eXBlLnJlbmRlciB9KTtcbiAgICAgICAgcmV0dXJuIG5hbWUgPyBgRm9yd2FyZFJlZigke25hbWV9KWAgOiAnRm9yd2FyZFJlZic7XG4gICAgICB9XG4gICAgICBjYXNlIExhenkgfHwgTmFOOiB7XG4gICAgICAgIHJldHVybiAnbGF6eSc7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiByZXR1cm4gZGlzcGxheU5hbWVPZk5vZGUobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgaXNWYWxpZEVsZW1lbnQoZWxlbWVudCkge1xuICAgIHJldHVybiBpc0VsZW1lbnQoZWxlbWVudCk7XG4gIH1cblxuICBpc1ZhbGlkRWxlbWVudFR5cGUob2JqZWN0KSB7XG4gICAgcmV0dXJuICEhb2JqZWN0ICYmIGlzVmFsaWRFbGVtZW50VHlwZShvYmplY3QpO1xuICB9XG5cbiAgaXNGcmFnbWVudChmcmFnbWVudCkge1xuICAgIHJldHVybiB0eXBlT2ZOb2RlKGZyYWdtZW50KSA9PT0gRnJhZ21lbnQ7XG4gIH1cblxuICBpc0N1c3RvbUNvbXBvbmVudCh0eXBlKSB7XG4gICAgY29uc3QgZmFrZUVsZW1lbnQgPSBtYWtlRmFrZUVsZW1lbnQodHlwZSk7XG4gICAgcmV0dXJuICEhdHlwZSAmJiAoXG4gICAgICB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgfHwgaXNGb3J3YXJkUmVmKGZha2VFbGVtZW50KVxuICAgICAgfHwgaXNDb250ZXh0UHJvdmlkZXIoZmFrZUVsZW1lbnQpXG4gICAgICB8fCBpc0NvbnRleHRDb25zdW1lcihmYWtlRWxlbWVudClcbiAgICAgIHx8IGlzU3VzcGVuc2UoZmFrZUVsZW1lbnQpXG4gICAgKTtcbiAgfVxuXG4gIGlzQ29udGV4dENvbnN1bWVyKHR5cGUpIHtcbiAgICByZXR1cm4gISF0eXBlICYmIGlzQ29udGV4dENvbnN1bWVyKG1ha2VGYWtlRWxlbWVudCh0eXBlKSk7XG4gIH1cblxuICBpc0N1c3RvbUNvbXBvbmVudEVsZW1lbnQoaW5zdCkge1xuICAgIGlmICghaW5zdCB8fCAhdGhpcy5pc1ZhbGlkRWxlbWVudChpbnN0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pc0N1c3RvbUNvbXBvbmVudChpbnN0LnR5cGUpO1xuICB9XG5cbiAgZ2V0UHJvdmlkZXJGcm9tQ29uc3VtZXIoQ29uc3VtZXIpIHtcbiAgICAvLyBSZWFjdCBzdG9yZXMgcmVmZXJlbmNlcyB0byB0aGUgUHJvdmlkZXIgb24gYSBDb25zdW1lciBkaWZmZXJlbnRseSBhY3Jvc3MgdmVyc2lvbnMuXG4gICAgaWYgKENvbnN1bWVyKSB7XG4gICAgICBsZXQgUHJvdmlkZXI7XG4gICAgICBpZiAoQ29uc3VtZXIuX2NvbnRleHQpIHsgLy8gY2hlY2sgdGhpcyBmaXJzdCwgdG8gYXZvaWQgYSBkZXByZWNhdGlvbiB3YXJuaW5nXG4gICAgICAgICh7IFByb3ZpZGVyIH0gPSBDb25zdW1lci5fY29udGV4dCk7XG4gICAgICB9IGVsc2UgaWYgKENvbnN1bWVyLlByb3ZpZGVyKSB7XG4gICAgICAgICh7IFByb3ZpZGVyIH0gPSBDb25zdW1lcik7XG4gICAgICB9XG4gICAgICBpZiAoUHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0VuenltZSBJbnRlcm5hbCBFcnJvcjogY2Fu4oCZdCBmaWd1cmUgb3V0IGhvdyB0byBnZXQgUHJvdmlkZXIgZnJvbSBDb25zdW1lcicpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoLi4uYXJncyk7XG4gIH1cblxuICB3cmFwV2l0aFdyYXBwaW5nQ29tcG9uZW50KG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgUm9vdEZpbmRlcixcbiAgICAgIG5vZGU6IHdyYXBXaXRoV3JhcHBpbmdDb21wb25lbnQoUmVhY3QuY3JlYXRlRWxlbWVudCwgbm9kZSwgb3B0aW9ucyksXG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0U2V2ZW50ZWVuQWRhcHRlcjtcbiJdfQ==
//# sourceMappingURL=ReactSeventeenAdapter.js.map