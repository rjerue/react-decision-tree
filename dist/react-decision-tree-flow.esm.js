import React from 'react';

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

var WizardContext = /*#__PURE__*/React.createContext({
  tree: {},
  step: '',
  setStep: function setStep() {},
  getControls: function getControls() {
    return {};
  }
});

function Wizard(_ref) {
  var children = _ref.children,
      tree = _ref.tree,
      first = _ref.first;
  // Check tree for bad values
  React.useEffect(function () {
    var allSteps = Object.keys(tree);
    Object.entries(tree).forEach(function (_ref2) {
      var key = _ref2[0],
          dests = _ref2[1];
      dests.forEach(function (d) {
        if (!allSteps.includes(d)) {
          console.warn("Tree definition includes path to " + d + " from " + key + ". However " + d + " is not in tree as a key.");
        }
      });
    });
  }, [tree]);

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

  return React.createElement(WizardContext.Provider, {
    value: {
      tree: tree,
      step: step,
      setStep: setStep,
      getControls: getControls
    }
  }, children);
}

function useControls() {
  var _React$useContext = React.useContext(WizardContext),
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

function Step(_ref) {
  var children = _ref.children,
      name = _ref.name;

  var _useControls = useControls(),
      step = _useControls.step,
      tree = _useControls.tree; // Check if name is bad value


  React.useEffect(function () {
    if (!Object.keys(tree).includes(name)) {
      console.warn("Step component with name " + name + " is not found in step tree!");
    }
  }, [name, tree]);
  return React.createElement(React.Fragment, null, step === name && children);
}

export { Controls, Step, Wizard, WizardContext, useControls };
//# sourceMappingURL=react-decision-tree-flow.esm.js.map
