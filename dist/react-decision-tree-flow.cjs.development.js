'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var Shared = require('Shared');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function Wizard(_ref) {
  var children = _ref.children,
      tree = _ref.tree,
      first = _ref.first;

  var _React$useState = React.useState(first),
      step = _React$useState[0],
      setStep = _React$useState[1];

  var getControls = function getControls() {
    var possibleSteps = tree[step];
    return possibleSteps.reduce(function (accum, step) {
      var _next;

      var next = (_next = {}, _next[step] = function () {
        setStep(step);
      }, _next);
      return _extends({}, accum, {}, next);
    }, {});
  };

  return React.createElement(Shared.WizardContext.Provider, {
    value: {
      tree: tree,
      step: step,
      setStep: setStep,
      getControls: getControls
    }
  }, children);
}

function Step(_ref) {
  var children = _ref.children,
      name = _ref.name;

  var _React$useContext = React.useContext(Shared.WizardContext),
      step = _React$useContext.step;

  return React.createElement(React.Fragment, null, step === name && children);
}

function useControls() {
  var _React$useContext = React.useContext(Shared.WizardContext),
      getControls = _React$useContext.getControls,
      step = _React$useContext.step,
      tree = _React$useContext.tree;

  return {
    step: step,
    tree: tree,
    destinations: getControls()
  };
}
function Controls(_ref) {
  var children = _ref.children;
  var getControls = useControls();
  return React.createElement(React.Fragment, null, children(_extends({}, getControls)));
}

var WizardContext = /*#__PURE__*/React.createContext({
  tree: {},
  step: '',
  setStep: function setStep() {},
  getControls: function getControls() {
    return {};
  }
});

exports.Controls = Controls;
exports.Step = Step;
exports.Wizard = Wizard;
exports.WizardContext = WizardContext;
exports.useControls = useControls;
//# sourceMappingURL=react-decision-tree-flow.cjs.development.js.map
