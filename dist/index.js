var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS((exports, module) => {
  if (true) {
    (function() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);
      }
      var ReactVersion = "18.3.1";
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactCurrentDispatcher = {
        current: null
      };
      var ReactCurrentBatchConfig = {
        transition: null
      };
      var ReactCurrentActQueue = {
        current: null,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false
      };
      var ReactCurrentOwner = {
        current: null
      };
      var ReactDebugCurrentFrame = {};
      var currentExtraStackFrame = null;
      function setExtraStackFrame(stack) {
        {
          currentExtraStackFrame = stack;
        }
      }
      {
        ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
          {
            currentExtraStackFrame = stack;
          }
        };
        ReactDebugCurrentFrame.getCurrentStack = null;
        ReactDebugCurrentFrame.getStackAddendum = function() {
          var stack = "";
          if (currentExtraStackFrame) {
            stack += currentExtraStackFrame;
          }
          var impl = ReactDebugCurrentFrame.getCurrentStack;
          if (impl) {
            stack += impl() || "";
          }
          return stack;
        };
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var ReactSharedInternals = {
        ReactCurrentDispatcher,
        ReactCurrentBatchConfig,
        ReactCurrentOwner
      };
      {
        ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
        ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
      }
      function warn(format) {
        {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;_key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format, args);
          }
        }
      }
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var didWarnStateUpdateForUnmountedComponent = {};
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor;
          var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
          var warningKey = componentName + "." + callerName;
          if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
            return;
          }
          error("Can't call %s on a component that is not yet mounted. " + "This is a no-op, but it might indicate a bug in your application. " + "Instead, assign to `this.state` directly or define a `state = {};` " + "class property with the desired state in the %s component.", callerName, componentName);
          didWarnStateUpdateForUnmountedComponent[warningKey] = true;
        }
      }
      var ReactNoopUpdateQueue = {
        isMounted: function(publicInstance) {
          return false;
        },
        enqueueForceUpdate: function(publicInstance, callback, callerName) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance, partialState, callback, callerName) {
          warnNoop(publicInstance, "setState");
        }
      };
      var assign = Object.assign;
      var emptyObject = {};
      {
        Object.freeze(emptyObject);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
          throw new Error("setState(...): takes an object of state variables to update or a " + "function which returns an object of state variables.");
        }
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      {
        var deprecatedAPIs = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in " + "componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see " + "https://github.com/facebook/react/issues/3236)."]
        };
        var defineDeprecationWarning = function(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function() {
              warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
              return;
            }
          });
        };
        for (var fnName in deprecatedAPIs) {
          if (deprecatedAPIs.hasOwnProperty(fnName)) {
            defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
          }
        }
      }
      function ComponentDummy() {}
      ComponentDummy.prototype = Component.prototype;
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy;
      pureComponentPrototype.constructor = PureComponent;
      assign(pureComponentPrototype, Component.prototype);
      pureComponentPrototype.isPureReactComponent = true;
      function createRef() {
        var refObject = {
          current: null
        };
        {
          Object.seal(refObject);
        }
        return refObject;
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s." + " This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). " + "This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function() {
          {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result " + "in `undefined` being returned. If you need to access the same " + "value within the child component, you should pass it as a different " + "prop. (https://reactjs.org/link/special-props)", displayName);
            }
          }
        };
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function() {
          {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result " + "in `undefined` being returned. If you need to access the same " + "value within the child component, you should pass it as a different " + "prop. (https://reactjs.org/link/special-props)", displayName);
            }
          }
        };
        warnAboutAccessingRef.isReactWarning = true;
        Object.defineProperty(props, "ref", {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
      function warnIfStringRefCannotBeAutoConverted(config) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". ' + "Support for string refs will be removed in a future major release. " + "This case cannot be automatically converted to an arrow function. " + "We ask you to manually fix this case by using useRef() or createRef() instead. " + "Learn more about using refs safely here: " + "https://reactjs.org/link/strict-mode-string-ref", componentName, config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      var ReactElement = function(type, key, ref, self2, source, owner, props) {
        var element = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref,
          props,
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self2
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function createElement(type, config, children) {
        var propName;
        var props = {};
        var key = null;
        var ref = null;
        var self2 = null;
        var source = null;
        if (config != null) {
          if (hasValidRef(config)) {
            ref = config.ref;
            {
              warnIfStringRefCannotBeAutoConverted(config);
            }
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          self2 = config.__self === undefined ? null : config.__self;
          source = config.__source === undefined ? null : config.__source;
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);
          for (var i = 0;i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }
          {
            if (Object.freeze) {
              Object.freeze(childArray);
            }
          }
          props.children = childArray;
        }
        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;
          for (propName in defaultProps) {
            if (props[propName] === undefined) {
              props[propName] = defaultProps[propName];
            }
          }
        }
        {
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
        return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
        return newElement;
      }
      function cloneElement(element, config, children) {
        if (element === null || element === undefined) {
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
        }
        var propName;
        var props = assign({}, element.props);
        var key = element.key;
        var ref = element.ref;
        var self2 = element._self;
        var source = element._source;
        var owner = element._owner;
        if (config != null) {
          if (hasValidRef(config)) {
            ref = config.ref;
            owner = ReactCurrentOwner.current;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          var defaultProps;
          if (element.type && element.type.defaultProps) {
            defaultProps = element.type.defaultProps;
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              if (config[propName] === undefined && defaultProps !== undefined) {
                props[propName] = defaultProps[propName];
              } else {
                props[propName] = config[propName];
              }
            }
          }
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);
          for (var i = 0;i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }
          props.children = childArray;
        }
        return ReactElement(element.type, key, ref, self2, source, owner, props);
      }
      function isValidElement(object) {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var SEPARATOR = ".";
      var SUBSEPARATOR = ":";
      function escape(key) {
        var escapeRegex = /[=:]/g;
        var escaperLookup = {
          "=": "=0",
          ":": "=2"
        };
        var escapedString = key.replace(escapeRegex, function(match) {
          return escaperLookup[match];
        });
        return "$" + escapedString;
      }
      var didWarnAboutMaps = false;
      var userProvidedKeyEscapeRegex = /\/+/g;
      function escapeUserProvidedKey(text) {
        return text.replace(userProvidedKeyEscapeRegex, "$&/");
      }
      function getElementKey(element, index) {
        if (typeof element === "object" && element !== null && element.key != null) {
          {
            checkKeyStringCoercion(element.key);
          }
          return escape("" + element.key);
        }
        return index.toString(36);
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if (type === "undefined" || type === "boolean") {
          children = null;
        }
        var invokeCallback = false;
        if (children === null) {
          invokeCallback = true;
        } else {
          switch (type) {
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
              }
          }
        }
        if (invokeCallback) {
          var _child = children;
          var mappedChild = callback(_child);
          var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
          if (isArray(mappedChild)) {
            var escapedChildKey = "";
            if (childKey != null) {
              escapedChildKey = escapeUserProvidedKey(childKey) + "/";
            }
            mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
              return c;
            });
          } else if (mappedChild != null) {
            if (isValidElement(mappedChild)) {
              {
                if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                  checkKeyStringCoercion(mappedChild.key);
                }
              }
              mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
            }
            array.push(mappedChild);
          }
          return 1;
        }
        var child;
        var nextName;
        var subtreeCount = 0;
        var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
        if (isArray(children)) {
          for (var i = 0;i < children.length; i++) {
            child = children[i];
            nextName = nextNamePrefix + getElementKey(child, i);
            subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
          }
        } else {
          var iteratorFn = getIteratorFn(children);
          if (typeof iteratorFn === "function") {
            var iterableChildren = children;
            {
              if (iteratorFn === iterableChildren.entries) {
                if (!didWarnAboutMaps) {
                  warn("Using Maps as children is not supported. " + "Use an array of keyed ReactElements instead.");
                }
                didWarnAboutMaps = true;
              }
            }
            var iterator = iteratorFn.call(iterableChildren);
            var step;
            var ii = 0;
            while (!(step = iterator.next()).done) {
              child = step.value;
              nextName = nextNamePrefix + getElementKey(child, ii++);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else if (type === "object") {
            var childrenString = String(children);
            throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). " + "If you meant to render a collection of children, use an array " + "instead.");
          }
        }
        return subtreeCount;
      }
      function mapChildren(children, func, context) {
        if (children == null) {
          return children;
        }
        var result = [];
        var count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function countChildren(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      }
      function forEachChildren(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      }
      function toArray2(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      }
      function onlyChild(children) {
        if (!isValidElement(children)) {
          throw new Error("React.Children.only expected to receive a single React element child.");
        }
        return children;
      }
      function createContext(defaultValue) {
        var context = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null
        };
        context.Provider = {
          $$typeof: REACT_PROVIDER_TYPE,
          _context: context
        };
        var hasWarnedAboutUsingNestedContextConsumers = false;
        var hasWarnedAboutUsingConsumerProvider = false;
        var hasWarnedAboutDisplayNameOnConsumer = false;
        {
          var Consumer = {
            $$typeof: REACT_CONTEXT_TYPE,
            _context: context
          };
          Object.defineProperties(Consumer, {
            Provider: {
              get: function() {
                if (!hasWarnedAboutUsingConsumerProvider) {
                  hasWarnedAboutUsingConsumerProvider = true;
                  error("Rendering <Context.Consumer.Provider> is not supported and will be removed in " + "a future major release. Did you mean to render <Context.Provider> instead?");
                }
                return context.Provider;
              },
              set: function(_Provider) {
                context.Provider = _Provider;
              }
            },
            _currentValue: {
              get: function() {
                return context._currentValue;
              },
              set: function(_currentValue) {
                context._currentValue = _currentValue;
              }
            },
            _currentValue2: {
              get: function() {
                return context._currentValue2;
              },
              set: function(_currentValue2) {
                context._currentValue2 = _currentValue2;
              }
            },
            _threadCount: {
              get: function() {
                return context._threadCount;
              },
              set: function(_threadCount) {
                context._threadCount = _threadCount;
              }
            },
            Consumer: {
              get: function() {
                if (!hasWarnedAboutUsingNestedContextConsumers) {
                  hasWarnedAboutUsingNestedContextConsumers = true;
                  error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in " + "a future major release. Did you mean to render <Context.Consumer> instead?");
                }
                return context.Consumer;
              }
            },
            displayName: {
              get: function() {
                return context.displayName;
              },
              set: function(displayName) {
                if (!hasWarnedAboutDisplayNameOnConsumer) {
                  warn("Setting `displayName` on Context.Consumer has no effect. " + "You should set it directly on the context with Context.displayName = '%s'.", displayName);
                  hasWarnedAboutDisplayNameOnConsumer = true;
                }
              }
            }
          });
          context.Consumer = Consumer;
        }
        {
          context._currentRenderer = null;
          context._currentRenderer2 = null;
        }
        return context;
      }
      var Uninitialized = -1;
      var Pending = 0;
      var Resolved = 1;
      var Rejected = 2;
      function lazyInitializer(payload) {
        if (payload._status === Uninitialized) {
          var ctor = payload._result;
          var thenable = ctor();
          thenable.then(function(moduleObject2) {
            if (payload._status === Pending || payload._status === Uninitialized) {
              var resolved = payload;
              resolved._status = Resolved;
              resolved._result = moduleObject2;
            }
          }, function(error2) {
            if (payload._status === Pending || payload._status === Uninitialized) {
              var rejected = payload;
              rejected._status = Rejected;
              rejected._result = error2;
            }
          });
          if (payload._status === Uninitialized) {
            var pending = payload;
            pending._status = Pending;
            pending._result = thenable;
          }
        }
        if (payload._status === Resolved) {
          var moduleObject = payload._result;
          {
            if (moduleObject === undefined) {
              error("lazy: Expected the result of a dynamic imp" + "ort() call. " + `Instead received: %s

Your code should look like: 
  ` + "const MyComponent = lazy(() => imp" + `ort('./MyComponent'))

` + "Did you accidentally put curly braces around the import?", moduleObject);
            }
          }
          {
            if (!("default" in moduleObject)) {
              error("lazy: Expected the result of a dynamic imp" + "ort() call. " + `Instead received: %s

Your code should look like: 
  ` + "const MyComponent = lazy(() => imp" + "ort('./MyComponent'))", moduleObject);
            }
          }
          return moduleObject.default;
        } else {
          throw payload._result;
        }
      }
      function lazy(ctor) {
        var payload = {
          _status: Uninitialized,
          _result: ctor
        };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: payload,
          _init: lazyInitializer
        };
        {
          var defaultProps;
          var propTypes;
          Object.defineProperties(lazyType, {
            defaultProps: {
              configurable: true,
              get: function() {
                return defaultProps;
              },
              set: function(newDefaultProps) {
                error("React.lazy(...): It is not supported to assign `defaultProps` to " + "a lazy component import. Either specify them where the component " + "is defined, or create a wrapping component around it.");
                defaultProps = newDefaultProps;
                Object.defineProperty(lazyType, "defaultProps", {
                  enumerable: true
                });
              }
            },
            propTypes: {
              configurable: true,
              get: function() {
                return propTypes;
              },
              set: function(newPropTypes) {
                error("React.lazy(...): It is not supported to assign `propTypes` to " + "a lazy component import. Either specify them where the component " + "is defined, or create a wrapping component around it.");
                propTypes = newPropTypes;
                Object.defineProperty(lazyType, "propTypes", {
                  enumerable: true
                });
              }
            }
          });
        }
        return lazyType;
      }
      function forwardRef(render) {
        {
          if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
            error("forwardRef requires a render function but received a `memo` " + "component. Instead of forwardRef(memo(...)), use " + "memo(forwardRef(...)).");
          } else if (typeof render !== "function") {
            error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
          } else {
            if (render.length !== 0 && render.length !== 2) {
              error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
            }
          }
          if (render != null) {
            if (render.defaultProps != null || render.propTypes != null) {
              error("forwardRef render functions do not support propTypes or defaultProps. " + "Did you accidentally pass a React component?");
            }
          }
        }
        var elementType = {
          $$typeof: REACT_FORWARD_REF_TYPE,
          render
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              if (!render.name && !render.displayName) {
                render.displayName = name;
              }
            }
          });
        }
        return elementType;
      }
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
            return true;
          }
        }
        return false;
      }
      function memo(type, compare) {
        {
          if (!isValidElementType(type)) {
            error("memo: The first argument must be a component. Instead " + "received: %s", type === null ? "null" : typeof type);
          }
        }
        var elementType = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: compare === undefined ? null : compare
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              if (!type.name && !type.displayName) {
                type.displayName = name;
              }
            }
          });
        }
        return elementType;
      }
      function resolveDispatcher() {
        var dispatcher = ReactCurrentDispatcher.current;
        {
          if (dispatcher === null) {
            error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for" + ` one of the following reasons:
` + `1. You might have mismatching versions of React and the renderer (such as React DOM)
` + `2. You might be breaking the Rules of Hooks
` + `3. You might have more than one copy of React in the same app
` + "See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
          }
        }
        return dispatcher;
      }
      function useContext(Context) {
        var dispatcher = resolveDispatcher();
        {
          if (Context._context !== undefined) {
            var realContext = Context._context;
            if (realContext.Consumer === Context) {
              error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be " + "removed in a future major release. Did you mean to call useContext(Context) instead?");
            } else if (realContext.Provider === Context) {
              error("Calling useContext(Context.Provider) is not supported. " + "Did you mean to call useContext(Context) instead?");
            }
          }
        }
        return dispatcher.useContext(Context);
      }
      function useState(initialState) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useState(initialState);
      }
      function useReducer(reducer, initialArg, init) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useReducer(reducer, initialArg, init);
      }
      function useRef(initialValue) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useRef(initialValue);
      }
      function useEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useEffect(create, deps);
      }
      function useInsertionEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useInsertionEffect(create, deps);
      }
      function useLayoutEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useLayoutEffect(create, deps);
      }
      function useCallback(callback, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useCallback(callback, deps);
      }
      function useMemo(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useMemo(create, deps);
      }
      function useImperativeHandle(ref, create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useImperativeHandle(ref, create, deps);
      }
      function useDebugValue(value, formatterFn) {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDebugValue(value, formatterFn);
        }
      }
      function useTransition() {
        var dispatcher = resolveDispatcher();
        return dispatcher.useTransition();
      }
      function useDeferredValue(value) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useDeferredValue(value);
      }
      function useId() {
        var dispatcher = resolveDispatcher();
        return dispatcher.useId();
      }
      function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
      }
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {}
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. " + "This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === undefined) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return `
` + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap;
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== undefined) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = undefined;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split(`
`);
            var controlLines = control.stack.split(`
`);
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              c--;
            }
            for (;s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher$1.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {}
            }
          }
        }
        return "";
      }
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location2, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = undefined;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; " + "it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`." + "This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s" + " `%s` is invalid; the type checker " + "function must return `null` or an `Error` but returned a %s. " + "You may have forgotten to pass an argument to the type checker " + "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " + "shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location2, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            setExtraStackFrame(stack);
          } else {
            setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
          var name = getComponentNameFromType(ReactCurrentOwner.current.type);
          if (name) {
            return `

Check the render method of \`` + name + "`.";
          }
        }
        return "";
      }
      function getSourceInfoErrorAddendum(source) {
        if (source !== undefined) {
          var fileName = source.fileName.replace(/^.*[\\\/]/, "");
          var lineNumber = source.lineNumber;
          return `

Check your code at ` + fileName + ":" + lineNumber + ".";
        }
        return "";
      }
      function getSourceInfoErrorAddendumForProps(elementProps) {
        if (elementProps !== null && elementProps !== undefined) {
          return getSourceInfoErrorAddendum(elementProps.__source);
        }
        return "";
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum();
        if (!info) {
          var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
          if (parentName) {
            info = `

Check the top-level render call using <` + parentName + ">.";
          }
        }
        return info;
      }
      function validateExplicitKey(element, parentType) {
        if (!element._store || element._store.validated || element.key != null) {
          return;
        }
        element._store.validated = true;
        var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return;
        }
        ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
        var childOwner = "";
        if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
          childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
        }
        {
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.' + "%s%s See https://reactjs.org/link/warning-keys for more information.", currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        if (typeof node !== "object") {
          return;
        }
        if (isArray(node)) {
          for (var i = 0;i < node.length; i++) {
            var child = node[i];
            if (isValidElement(child)) {
              validateExplicitKey(child, parentType);
            }
          }
        } else if (isValidElement(node)) {
          if (node._store) {
            node._store.validated = true;
          }
        } else if (node) {
          var iteratorFn = getIteratorFn(node);
          if (typeof iteratorFn === "function") {
            if (iteratorFn !== node.entries) {
              var iterator = iteratorFn.call(node);
              var step;
              while (!(step = iterator.next()).done) {
                if (isValidElement(step.value)) {
                  validateExplicitKey(step.value, parentType);
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === undefined || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass " + "definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0;i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. " + "React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function createElementWithValidation(type, props, children) {
        var validType = isValidElementType(type);
        if (!validType) {
          var info = "";
          if (type === undefined || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
            info += " You likely forgot to export your component from the file " + "it's defined in, or you might have mixed up default and named imports.";
          }
          var sourceInfo = getSourceInfoErrorAddendumForProps(props);
          if (sourceInfo) {
            info += sourceInfo;
          } else {
            info += getDeclarationErrorAddendum();
          }
          var typeString;
          if (type === null) {
            typeString = "null";
          } else if (isArray(type)) {
            typeString = "array";
          } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
            typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
            info = " Did you accidentally export a JSX literal instead of a component?";
          } else {
            typeString = typeof type;
          }
          {
            error("React.createElement: type is invalid -- expected a string (for " + "built-in components) or a class/function (for composite " + "components) but got: %s.%s", typeString, info);
          }
        }
        var element = createElement.apply(this, arguments);
        if (element == null) {
          return element;
        }
        if (validType) {
          for (var i = 2;i < arguments.length; i++) {
            validateChildKeys(arguments[i], type);
          }
        }
        if (type === REACT_FRAGMENT_TYPE) {
          validateFragmentProps(element);
        } else {
          validatePropTypes(element);
        }
        return element;
      }
      var didWarnAboutDeprecatedCreateFactory = false;
      function createFactoryWithValidation(type) {
        var validatedFactory = createElementWithValidation.bind(null, type);
        validatedFactory.type = type;
        {
          if (!didWarnAboutDeprecatedCreateFactory) {
            didWarnAboutDeprecatedCreateFactory = true;
            warn("React.createFactory() is deprecated and will be removed in " + "a future major release. Consider using JSX " + "or use React.createElement() directly instead.");
          }
          Object.defineProperty(validatedFactory, "type", {
            enumerable: false,
            get: function() {
              warn("Factory.type is deprecated. Access the class directly " + "before passing it to createFactory.");
              Object.defineProperty(this, "type", {
                value: type
              });
              return type;
            }
          });
        }
        return validatedFactory;
      }
      function cloneElementWithValidation(element, props, children) {
        var newElement = cloneElement.apply(this, arguments);
        for (var i = 2;i < arguments.length; i++) {
          validateChildKeys(arguments[i], newElement.type);
        }
        validatePropTypes(newElement);
        return newElement;
      }
      function startTransition(scope, options) {
        var prevTransition = ReactCurrentBatchConfig.transition;
        ReactCurrentBatchConfig.transition = {};
        var currentTransition = ReactCurrentBatchConfig.transition;
        {
          ReactCurrentBatchConfig.transition._updatedFibers = new Set;
        }
        try {
          scope();
        } finally {
          ReactCurrentBatchConfig.transition = prevTransition;
          {
            if (prevTransition === null && currentTransition._updatedFibers) {
              var updatedFibersCount = currentTransition._updatedFibers.size;
              if (updatedFibersCount > 10) {
                warn("Detected a large number of updates inside startTransition. " + "If this is due to a subscription please re-write it to use React provided hooks. " + "Otherwise concurrent mode guarantees are off the table.");
              }
              currentTransition._updatedFibers.clear();
            }
          }
        }
      }
      var didWarnAboutMessageChannel = false;
      var enqueueTaskImpl = null;
      function enqueueTask(task) {
        if (enqueueTaskImpl === null) {
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            var nodeRequire = module && module[requireString];
            enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              {
                if (didWarnAboutMessageChannel === false) {
                  didWarnAboutMessageChannel = true;
                  if (typeof MessageChannel === "undefined") {
                    error("This browser does not have a MessageChannel implementation, " + "so enqueuing tasks via await act(async () => ...) will fail. " + "Please file an issue at https://github.com/facebook/react/issues " + "if you encounter this warning.");
                  }
                }
              }
              var channel = new MessageChannel;
              channel.port1.onmessage = callback;
              channel.port2.postMessage(undefined);
            };
          }
        }
        return enqueueTaskImpl(task);
      }
      var actScopeDepth = 0;
      var didWarnNoAwaitAct = false;
      function act(callback) {
        {
          var prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          if (ReactCurrentActQueue.current === null) {
            ReactCurrentActQueue.current = [];
          }
          var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
          var result;
          try {
            ReactCurrentActQueue.isBatchingLegacy = true;
            result = callback();
            if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
              var queue = ReactCurrentActQueue.current;
              if (queue !== null) {
                ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                flushActQueue(queue);
              }
            }
          } catch (error2) {
            popActScope(prevActScopeDepth);
            throw error2;
          } finally {
            ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
          }
          if (result !== null && typeof result === "object" && typeof result.then === "function") {
            var thenableResult = result;
            var wasAwaited = false;
            var thenable = {
              then: function(resolve, reject) {
                wasAwaited = true;
                thenableResult.then(function(returnValue2) {
                  popActScope(prevActScopeDepth);
                  if (actScopeDepth === 0) {
                    recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                  } else {
                    resolve(returnValue2);
                  }
                }, function(error2) {
                  popActScope(prevActScopeDepth);
                  reject(error2);
                });
              }
            };
            {
              if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                Promise.resolve().then(function() {}).then(function() {
                  if (!wasAwaited) {
                    didWarnNoAwaitAct = true;
                    error("You called act(async () => ...) without await. " + "This could lead to unexpected testing behaviour, " + "interleaving multiple act calls and mixing their " + "scopes. " + "You should - await act(async () => ...);");
                  }
                });
              }
            }
            return thenable;
          } else {
            var returnValue = result;
            popActScope(prevActScopeDepth);
            if (actScopeDepth === 0) {
              var _queue = ReactCurrentActQueue.current;
              if (_queue !== null) {
                flushActQueue(_queue);
                ReactCurrentActQueue.current = null;
              }
              var _thenable = {
                then: function(resolve, reject) {
                  if (ReactCurrentActQueue.current === null) {
                    ReactCurrentActQueue.current = [];
                    recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  } else {
                    resolve(returnValue);
                  }
                }
              };
              return _thenable;
            } else {
              var _thenable2 = {
                then: function(resolve, reject) {
                  resolve(returnValue);
                }
              };
              return _thenable2;
            }
          }
        }
      }
      function popActScope(prevActScopeDepth) {
        {
          if (prevActScopeDepth !== actScopeDepth - 1) {
            error("You seem to have overlapping act() calls, this is not supported. " + "Be sure to await previous act() calls before making a new one. ");
          }
          actScopeDepth = prevActScopeDepth;
        }
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        {
          var queue = ReactCurrentActQueue.current;
          if (queue !== null) {
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                if (queue.length === 0) {
                  ReactCurrentActQueue.current = null;
                  resolve(returnValue);
                } else {
                  recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                }
              });
            } catch (error2) {
              reject(error2);
            }
          } else {
            resolve(returnValue);
          }
        }
      }
      var isFlushing = false;
      function flushActQueue(queue) {
        {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (;i < queue.length; i++) {
                var callback = queue[i];
                do {
                  callback = callback(true);
                } while (callback !== null);
              }
              queue.length = 0;
            } catch (error2) {
              queue = queue.slice(i + 1);
              throw error2;
            } finally {
              isFlushing = false;
            }
          }
        }
      }
      var createElement$1 = createElementWithValidation;
      var cloneElement$1 = cloneElementWithValidation;
      var createFactory = createFactoryWithValidation;
      var Children = {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray2,
        only: onlyChild
      };
      exports.Children = Children;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
      exports.act = act;
      exports.cloneElement = cloneElement$1;
      exports.createContext = createContext;
      exports.createElement = createElement$1;
      exports.createFactory = createFactory;
      exports.createRef = createRef;
      exports.forwardRef = forwardRef;
      exports.isValidElement = isValidElement;
      exports.lazy = lazy;
      exports.memo = memo;
      exports.startTransition = startTransition;
      exports.unstable_act = act;
      exports.useCallback = useCallback;
      exports.useContext = useContext;
      exports.useDebugValue = useDebugValue;
      exports.useDeferredValue = useDeferredValue;
      exports.useEffect = useEffect;
      exports.useId = useId;
      exports.useImperativeHandle = useImperativeHandle;
      exports.useInsertionEffect = useInsertionEffect;
      exports.useLayoutEffect = useLayoutEffect;
      exports.useMemo = useMemo;
      exports.useReducer = useReducer;
      exports.useRef = useRef;
      exports.useState = useState;
      exports.useSyncExternalStore = useSyncExternalStore;
      exports.useTransition = useTransition;
      exports.version = ReactVersion;
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error);
      }
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS((exports, module) => {
  var react_development = __toESM(require_react_development());
  if (false) {} else {
    module.exports = react_development;
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS((exports) => {
  var React = __toESM(require_react());
  if (true) {
    (function() {
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). " + "This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {}
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. " + "This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === undefined) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return `
` + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap;
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== undefined) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = undefined;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split(`
`);
            var controlLines = control.stack.split(`
`);
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              c--;
            }
            for (;s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {}
            }
          }
        }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location2, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = undefined;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; " + "it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`." + "This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s" + " `%s` is invalid; the type checker " + "function must return `null` or an `Error` but returned a %s. " + "You may have forgotten to pass an argument to the type checker " + "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " + "shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location2, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s." + " This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self2) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". ' + "Support for string refs will be removed in a future major release. " + "This case cannot be automatically converted to an arrow function. " + "We ask you to manually fix this case by using useRef() or createRef() instead. " + "Learn more about using refs safely here: " + "https://reactjs.org/link/strict-mode-string-ref", getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result " + "in `undefined` being returned. If you need to access the same " + "value within the child component, you should pass it as a different " + "prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result " + "in `undefined` being returned. If you need to access the same " + "value within the child component, you should pass it as a different " + "prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type, key, ref, self2, source, owner, props) {
        var element = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref,
          props,
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self2
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type, config, maybeKey, source, self2) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== undefined) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self2);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement(object) {
        {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return `

Check the render method of \`` + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== undefined) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return `

Check your code at ` + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = `

Check the top-level render call using <` + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.' + "%s%s See https://reactjs.org/link/warning-keys for more information.", currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0;i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === undefined || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass " + "definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0;i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. " + "React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      var didWarnAboutKeySpread = {};
      function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === undefined || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file " + "it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum(source);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.jsx: type is invalid -- expected a string (for " + "built-in components) or a class/function (for composite " + "components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type, props, key, source, self2);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== undefined) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0;i < children.length; i++) {
                    validateChildKeys(children[i], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. " + "You are likely explicitly calling React.jsxs or React.jsxDEV. " + "Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          {
            if (hasOwnProperty.call(props, "key")) {
              var componentName = getComponentNameFromType(type);
              var keys = Object.keys(props).filter(function(k) {
                return k !== "key";
              });
              var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
              if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                error(`A props object containing a "key" prop is being spread into JSX:
` + `  let props = %s;
` + `  <%s {...props} />
` + `React keys must be passed directly to JSX without using spread:
` + `  let props = %s;
` + "  <%s key={someKey} {...props} />", beforeExample, componentName, afterExample, componentName);
                didWarnAboutKeySpread[componentName + beforeExample] = true;
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }
      var jsx = jsxWithValidationDynamic;
      var jsxs = jsxWithValidationStatic;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = jsx;
      exports.jsxs = jsxs;
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS((exports, module) => {
  var react_jsx_runtime_development = __toESM(require_react_jsx_runtime_development());
  if (false) {} else {
    module.exports = react_jsx_runtime_development;
  }
});

// node_modules/react/cjs/react-jsx-dev-runtime.development.js
var require_react_jsx_dev_runtime_development = __commonJS((exports) => {
  var React = __toESM(require_react());
  if (true) {
    (function() {
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). " + "This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x2) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {}
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. " + "This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === undefined) {
            try {
              throw Error();
            } catch (x2) {
              var match = x2.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return `
` + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap;
      }
      function describeNativeComponentFrame(fn2, construct) {
        if (!fn2 || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn2);
          if (frame !== undefined) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = undefined;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x2) {
                control = x2;
              }
              Reflect.construct(fn2, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x2) {
                control = x2;
              }
              fn2.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x2) {
              control = x2;
            }
            fn2();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split(`
`);
            var controlLines = control.stack.split(`
`);
            var s2 = sampleLines.length - 1;
            var c2 = controlLines.length - 1;
            while (s2 >= 1 && c2 >= 0 && sampleLines[s2] !== controlLines[c2]) {
              c2--;
            }
            for (;s2 >= 1 && c2 >= 0; s2--, c2--) {
              if (sampleLines[s2] !== controlLines[c2]) {
                if (s2 !== 1 || c2 !== 1) {
                  do {
                    s2--;
                    c2--;
                    if (c2 < 0 || sampleLines[s2] !== controlLines[c2]) {
                      var _frame = `
` + sampleLines[s2].replace(" at new ", " at ");
                      if (fn2.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn2.displayName);
                      }
                      {
                        if (typeof fn2 === "function") {
                          componentFrameCache.set(fn2, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s2 >= 1 && c2 >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn2 ? fn2.displayName || fn2.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn2 === "function") {
            componentFrameCache.set(fn2, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn2, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn2, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x2) {}
            }
          }
        }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location2, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = undefined;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; " + "it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`." + "This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s" + " `%s` is invalid; the type checker " + "function must return `null` or an `Error` but returned a %s. " + "You may have forgotten to pass an argument to the type checker " + "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " + "shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location2, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a2) {
        return isArrayImpl(a2);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e2) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s." + " This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self2) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". ' + "Support for string refs will be removed in a future major release. " + "This case cannot be automatically converted to an arrow function. " + "We ask you to manually fix this case by using useRef() or createRef() instead. " + "Learn more about using refs safely here: " + "https://reactjs.org/link/strict-mode-string-ref", getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result " + "in `undefined` being returned. If you need to access the same " + "value within the child component, you should pass it as a different " + "prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result " + "in `undefined` being returned. If you need to access the same " + "value within the child component, you should pass it as a different " + "prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type, key, ref, self2, source, owner, props) {
        var element = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref,
          props,
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self2
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type, config, maybeKey, source, self2) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== undefined) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self2);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement(object) {
        {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return `

Check the render method of \`` + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== undefined) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return `

Check your code at ` + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = `

Check the top-level render call using <` + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.' + "%s%s See https://reactjs.org/link/warning-keys for more information.", currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i2 = 0;i2 < node.length; i2++) {
              var child = node[i2];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === undefined || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass " + "definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i2 = 0;i2 < keys.length; i2++) {
            var key = keys[i2];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. " + "React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      var didWarnAboutKeySpread = {};
      function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === undefined || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file " + "it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum(source);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.jsx: type is invalid -- expected a string (for " + "built-in components) or a class/function (for composite " + "components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type, props, key, source, self2);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== undefined) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i2 = 0;i2 < children.length; i2++) {
                    validateChildKeys(children[i2], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. " + "You are likely explicitly calling React.jsxs or React.jsxDEV. " + "Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          {
            if (hasOwnProperty.call(props, "key")) {
              var componentName = getComponentNameFromType(type);
              var keys = Object.keys(props).filter(function(k2) {
                return k2 !== "key";
              });
              var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
              if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                error(`A props object containing a "key" prop is being spread into JSX:
` + `  let props = %s;
` + `  <%s {...props} />
` + `React keys must be passed directly to JSX without using spread:
` + `  let props = %s;
` + "  <%s key={someKey} {...props} />", beforeExample, componentName, afterExample, componentName);
                didWarnAboutKeySpread[componentName + beforeExample] = true;
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      var jsxDEV$1 = jsxWithValidation;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsxDEV = jsxDEV$1;
    })();
  }
});

// node_modules/react/jsx-dev-runtime.js
var require_jsx_dev_runtime = __commonJS((exports, module) => {
  var react_jsx_dev_runtime_development = __toESM(require_react_jsx_dev_runtime_development());
  if (false) {} else {
    module.exports = react_jsx_dev_runtime_development;
  }
});

// node_modules/tslib/tslib.es6.mjs
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s);i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

// node_modules/@supabase/functions-js/dist/module/helper.js
var resolveFetch = (customFetch) => {
  if (customFetch) {
    return (...args) => customFetch(...args);
  }
  return (...args) => fetch(...args);
};

// node_modules/@supabase/functions-js/dist/module/types.js
class FunctionsError extends Error {
  constructor(message, name = "FunctionsError", context) {
    super(message);
    this.name = name;
    this.context = context;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      context: this.context
    };
  }
}

class FunctionsFetchError extends FunctionsError {
  constructor(context) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
  }
}

class FunctionsRelayError extends FunctionsError {
  constructor(context) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
  }
}

class FunctionsHttpError extends FunctionsError {
  constructor(context) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
  }
}
var FunctionRegion;
(function(FunctionRegion2) {
  FunctionRegion2["Any"] = "any";
  FunctionRegion2["ApNortheast1"] = "ap-northeast-1";
  FunctionRegion2["ApNortheast2"] = "ap-northeast-2";
  FunctionRegion2["ApSouth1"] = "ap-south-1";
  FunctionRegion2["ApSoutheast1"] = "ap-southeast-1";
  FunctionRegion2["ApSoutheast2"] = "ap-southeast-2";
  FunctionRegion2["CaCentral1"] = "ca-central-1";
  FunctionRegion2["EuCentral1"] = "eu-central-1";
  FunctionRegion2["EuWest1"] = "eu-west-1";
  FunctionRegion2["EuWest2"] = "eu-west-2";
  FunctionRegion2["EuWest3"] = "eu-west-3";
  FunctionRegion2["SaEast1"] = "sa-east-1";
  FunctionRegion2["UsEast1"] = "us-east-1";
  FunctionRegion2["UsWest1"] = "us-west-1";
  FunctionRegion2["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {}));

// node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
class FunctionsClient {
  constructor(url, { headers = {}, customFetch, region = FunctionRegion.Any } = {}) {
    this.url = url;
    this.headers = headers;
    this.region = region;
    this.fetch = resolveFetch(customFetch);
  }
  setAuth(token) {
    this.headers.Authorization = `Bearer ${token}`;
  }
  invoke(functionName_1) {
    return __awaiter(this, arguments, undefined, function* (functionName, options = {}) {
      var _a;
      let timeoutId;
      let timeoutController;
      try {
        const { headers, method, body: functionArgs, signal, timeout } = options;
        let _headers = {};
        let { region } = options;
        if (!region) {
          region = this.region;
        }
        const url = new URL(`${this.url}/${functionName}`);
        if (region && region !== "any") {
          _headers["x-region"] = region;
          url.searchParams.set("forceFunctionRegion", region);
        }
        let body;
        if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) {
          if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
            _headers["Content-Type"] = "application/octet-stream";
            body = functionArgs;
          } else if (typeof functionArgs === "string") {
            _headers["Content-Type"] = "text/plain";
            body = functionArgs;
          } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
            body = functionArgs;
          } else {
            _headers["Content-Type"] = "application/json";
            body = JSON.stringify(functionArgs);
          }
        } else {
          if (functionArgs && typeof functionArgs !== "string" && !(typeof Blob !== "undefined" && functionArgs instanceof Blob) && !(functionArgs instanceof ArrayBuffer) && !(typeof FormData !== "undefined" && functionArgs instanceof FormData)) {
            body = JSON.stringify(functionArgs);
          } else {
            body = functionArgs;
          }
        }
        let effectiveSignal = signal;
        if (timeout) {
          timeoutController = new AbortController;
          timeoutId = setTimeout(() => timeoutController.abort(), timeout);
          if (signal) {
            effectiveSignal = timeoutController.signal;
            signal.addEventListener("abort", () => timeoutController.abort());
          } else {
            effectiveSignal = timeoutController.signal;
          }
        }
        const response = yield this.fetch(url.toString(), {
          method: method || "POST",
          headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
          body,
          signal: effectiveSignal
        }).catch((fetchError) => {
          throw new FunctionsFetchError(fetchError);
        });
        const isRelayError = response.headers.get("x-relay-error");
        if (isRelayError && isRelayError === "true") {
          throw new FunctionsRelayError(response);
        }
        if (!response.ok) {
          throw new FunctionsHttpError(response);
        }
        let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== undefined ? _a : "text/plain").split(";")[0].trim();
        let data;
        if (responseType === "application/json") {
          data = yield response.json();
        } else if (responseType === "application/octet-stream" || responseType === "application/pdf") {
          data = yield response.blob();
        } else if (responseType === "text/event-stream") {
          data = response;
        } else if (responseType === "multipart/form-data") {
          data = yield response.formData();
        } else {
          data = yield response.text();
        }
        return { data, error: null, response };
      } catch (error) {
        return {
          data: null,
          error,
          response: error instanceof FunctionsHttpError || error instanceof FunctionsRelayError ? error.context : undefined
        };
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    });
  }
}
// node_modules/@supabase/postgrest-js/dist/index.mjs
var DEFAULT_MAX_RETRIES = 3;
var getRetryDelay = (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000);
var RETRYABLE_STATUS_CODES = [520, 503];
var RETRYABLE_METHODS = [
  "GET",
  "HEAD",
  "OPTIONS"
];
var PostgrestError = class extends Error {
  constructor(context) {
    super(context.message);
    this.name = "PostgrestError";
    this.details = context.details;
    this.hint = context.hint;
    this.code = context.code;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      details: this.details,
      hint: this.hint,
      code: this.code
    };
  }
};
function sleep(ms, signal) {
  return new Promise((resolve) => {
    if (signal === null || signal === undefined ? undefined : signal.aborted) {
      resolve();
      return;
    }
    const id = setTimeout(() => {
      signal === null || signal === undefined || signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    function onAbort() {
      clearTimeout(id);
      resolve();
    }
    signal === null || signal === undefined || signal.addEventListener("abort", onAbort);
  });
}
function shouldRetry(method, status, attemptCount, retryEnabled) {
  if (!retryEnabled || attemptCount >= DEFAULT_MAX_RETRIES)
    return false;
  if (!RETRYABLE_METHODS.includes(method))
    return false;
  if (!RETRYABLE_STATUS_CODES.includes(status))
    return false;
  return true;
}
var PostgrestBuilder = class {
  constructor(builder) {
    var _builder$shouldThrowO, _builder$isMaybeSingl, _builder$shouldStripN, _builder$urlLengthLim, _builder$retry;
    this.shouldThrowOnError = false;
    this.retryEnabled = true;
    this.method = builder.method;
    this.url = builder.url;
    this.headers = new Headers(builder.headers);
    this.schema = builder.schema;
    this.body = builder.body;
    this.shouldThrowOnError = (_builder$shouldThrowO = builder.shouldThrowOnError) !== null && _builder$shouldThrowO !== undefined ? _builder$shouldThrowO : false;
    this.signal = builder.signal;
    this.isMaybeSingle = (_builder$isMaybeSingl = builder.isMaybeSingle) !== null && _builder$isMaybeSingl !== undefined ? _builder$isMaybeSingl : false;
    this.shouldStripNulls = (_builder$shouldStripN = builder.shouldStripNulls) !== null && _builder$shouldStripN !== undefined ? _builder$shouldStripN : false;
    this.urlLengthLimit = (_builder$urlLengthLim = builder.urlLengthLimit) !== null && _builder$urlLengthLim !== undefined ? _builder$urlLengthLim : 8000;
    this.retryEnabled = (_builder$retry = builder.retry) !== null && _builder$retry !== undefined ? _builder$retry : true;
    if (builder.fetch)
      this.fetch = builder.fetch;
    else
      this.fetch = fetch;
  }
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  stripNulls() {
    if (this.headers.get("Accept") === "text/csv")
      throw new Error("stripNulls() cannot be used with csv()");
    this.shouldStripNulls = true;
    return this;
  }
  setHeader(name, value) {
    this.headers = new Headers(this.headers);
    this.headers.set(name, value);
    return this;
  }
  retry(enabled) {
    this.retryEnabled = enabled;
    return this;
  }
  then(onfulfilled, onrejected) {
    var _this = this;
    if (this.schema === undefined) {} else if (["GET", "HEAD"].includes(this.method))
      this.headers.set("Accept-Profile", this.schema);
    else
      this.headers.set("Content-Profile", this.schema);
    if (this.method !== "GET" && this.method !== "HEAD")
      this.headers.set("Content-Type", "application/json");
    if (this.shouldStripNulls) {
      const currentAccept = this.headers.get("Accept");
      if (currentAccept === "application/vnd.pgrst.object+json")
        this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped");
      else if (!currentAccept || currentAccept === "application/json")
        this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped");
    }
    const _fetch = this.fetch;
    const executeWithRetry = async () => {
      let attemptCount = 0;
      while (true) {
        const headers = {};
        _this.headers.forEach((value, key) => {
          headers[key] = value;
        });
        if (attemptCount > 0)
          headers["X-Retry-Count"] = String(attemptCount);
        let res$1;
        try {
          res$1 = await _fetch(_this.url.toString(), {
            method: _this.method,
            headers,
            body: JSON.stringify(_this.body, (_, value) => typeof value === "bigint" ? value.toString() : value),
            signal: _this.signal
          });
        } catch (fetchError) {
          if ((fetchError === null || fetchError === undefined ? undefined : fetchError.name) === "AbortError" || (fetchError === null || fetchError === undefined ? undefined : fetchError.code) === "ABORT_ERR")
            throw fetchError;
          if (!RETRYABLE_METHODS.includes(_this.method))
            throw fetchError;
          if (_this.retryEnabled && attemptCount < DEFAULT_MAX_RETRIES) {
            const delay = getRetryDelay(attemptCount);
            attemptCount++;
            await sleep(delay, _this.signal);
            continue;
          }
          throw fetchError;
        }
        if (shouldRetry(_this.method, res$1.status, attemptCount, _this.retryEnabled)) {
          var _res$headers$get, _res$headers;
          const retryAfterHeader = (_res$headers$get = (_res$headers = res$1.headers) === null || _res$headers === undefined ? undefined : _res$headers.get("Retry-After")) !== null && _res$headers$get !== undefined ? _res$headers$get : null;
          const delay = retryAfterHeader !== null ? Math.max(0, parseInt(retryAfterHeader, 10) || 0) * 1000 : getRetryDelay(attemptCount);
          await res$1.text();
          attemptCount++;
          await sleep(delay, _this.signal);
          continue;
        }
        return await _this.processResponse(res$1);
      }
    };
    let res = executeWithRetry();
    if (!this.shouldThrowOnError)
      res = res.catch((fetchError) => {
        var _fetchError$name2;
        let errorDetails = "";
        let hint = "";
        let code = "";
        const cause = fetchError === null || fetchError === undefined ? undefined : fetchError.cause;
        if (cause) {
          var _cause$message, _cause$code, _fetchError$name, _cause$name;
          const causeMessage = (_cause$message = cause === null || cause === undefined ? undefined : cause.message) !== null && _cause$message !== undefined ? _cause$message : "";
          const causeCode = (_cause$code = cause === null || cause === undefined ? undefined : cause.code) !== null && _cause$code !== undefined ? _cause$code : "";
          errorDetails = `${(_fetchError$name = fetchError === null || fetchError === undefined ? undefined : fetchError.name) !== null && _fetchError$name !== undefined ? _fetchError$name : "FetchError"}: ${fetchError === null || fetchError === undefined ? undefined : fetchError.message}`;
          errorDetails += `

Caused by: ${(_cause$name = cause === null || cause === undefined ? undefined : cause.name) !== null && _cause$name !== undefined ? _cause$name : "Error"}: ${causeMessage}`;
          if (causeCode)
            errorDetails += ` (${causeCode})`;
          if (cause === null || cause === undefined ? undefined : cause.stack)
            errorDetails += `
${cause.stack}`;
        } else {
          var _fetchError$stack;
          errorDetails = (_fetchError$stack = fetchError === null || fetchError === undefined ? undefined : fetchError.stack) !== null && _fetchError$stack !== undefined ? _fetchError$stack : "";
        }
        const urlLength = this.url.toString().length;
        if ((fetchError === null || fetchError === undefined ? undefined : fetchError.name) === "AbortError" || (fetchError === null || fetchError === undefined ? undefined : fetchError.code) === "ABORT_ERR") {
          code = "";
          hint = "Request was aborted (timeout or manual cancellation)";
          if (urlLength > this.urlLengthLimit)
            hint += `. Note: Your request URL is ${urlLength} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`;
        } else if ((cause === null || cause === undefined ? undefined : cause.name) === "HeadersOverflowError" || (cause === null || cause === undefined ? undefined : cause.code) === "UND_ERR_HEADERS_OVERFLOW") {
          code = "";
          hint = "HTTP headers exceeded server limits (typically 16KB)";
          if (urlLength > this.urlLengthLimit)
            hint += `. Your request URL is ${urlLength} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`;
        }
        return {
          success: false,
          error: {
            message: `${(_fetchError$name2 = fetchError === null || fetchError === undefined ? undefined : fetchError.name) !== null && _fetchError$name2 !== undefined ? _fetchError$name2 : "FetchError"}: ${fetchError === null || fetchError === undefined ? undefined : fetchError.message}`,
            details: errorDetails,
            hint,
            code
          },
          data: null,
          count: null,
          status: 0,
          statusText: ""
        };
      });
    return res.then(onfulfilled, onrejected);
  }
  async processResponse(res) {
    var _this2 = this;
    let error = null;
    let data = null;
    let count = null;
    let status = res.status;
    let statusText = res.statusText;
    if (res.ok) {
      var _this$headers$get2, _res$headers$get2;
      if (_this2.method !== "HEAD") {
        var _this$headers$get;
        const body = await res.text();
        if (body === "") {} else if (_this2.headers.get("Accept") === "text/csv")
          data = body;
        else if (_this2.headers.get("Accept") && ((_this$headers$get = _this2.headers.get("Accept")) === null || _this$headers$get === undefined ? undefined : _this$headers$get.includes("application/vnd.pgrst.plan+text")))
          data = body;
        else
          try {
            data = JSON.parse(body);
          } catch (_unused) {
            error = { message: body };
            data = null;
            if (_this2.shouldThrowOnError)
              throw new PostgrestError({
                message: body,
                details: "",
                hint: "",
                code: ""
              });
          }
      }
      const countHeader = (_this$headers$get2 = _this2.headers.get("Prefer")) === null || _this$headers$get2 === undefined ? undefined : _this$headers$get2.match(/count=(exact|planned|estimated)/);
      const contentRange = (_res$headers$get2 = res.headers.get("content-range")) === null || _res$headers$get2 === undefined ? undefined : _res$headers$get2.split("/");
      if (countHeader && contentRange && contentRange.length > 1)
        count = parseInt(contentRange[1]);
      if (_this2.isMaybeSingle && Array.isArray(data))
        if (data.length > 1) {
          error = {
            code: "PGRST116",
            details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
            hint: null,
            message: "JSON object requested, multiple (or no) rows returned"
          };
          data = null;
          count = null;
          status = 406;
          statusText = "Not Acceptable";
        } else if (data.length === 1)
          data = data[0];
        else
          data = null;
    } else {
      const body = await res.text();
      try {
        error = JSON.parse(body);
        if (Array.isArray(error) && res.status === 404) {
          data = [];
          error = null;
          status = 200;
          statusText = "OK";
        }
      } catch (_unused2) {
        if (res.status === 404 && body === "") {
          status = 204;
          statusText = "No Content";
        } else
          error = { message: body };
      }
      if (error && _this2.shouldThrowOnError)
        throw new PostgrestError(error);
    }
    return {
      success: error === null,
      error,
      data,
      count,
      status,
      statusText
    };
  }
  returns() {
    return this;
  }
  overrideTypes() {
    return this;
  }
};
var PostgrestTransformBuilder = class extends PostgrestBuilder {
  throwOnError() {
    return super.throwOnError();
  }
  select(columns) {
    let quoted = false;
    const cleanedColumns = (columns !== null && columns !== undefined ? columns : "*").split("").map((c) => {
      if (/\s/.test(c) && !quoted)
        return "";
      if (c === '"')
        quoted = !quoted;
      return c;
    }).join("");
    this.url.searchParams.set("select", cleanedColumns);
    this.headers.append("Prefer", "return=representation");
    return this;
  }
  order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
    const key = referencedTable ? `${referencedTable}.order` : "order";
    const existingOrder = this.url.searchParams.get(key);
    this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === undefined ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
    return this;
  }
  limit(rows, { foreignTable, referencedTable = foreignTable } = {}) {
    const key = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
    this.url.searchParams.set(key, `${rows}`);
    return this;
  }
  range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
    const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
    const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
    this.url.searchParams.set(keyOffset, `${from}`);
    this.url.searchParams.set(keyLimit, `${to - from + 1}`);
    return this;
  }
  abortSignal(signal) {
    this.signal = signal;
    return this;
  }
  single() {
    this.headers.set("Accept", "application/vnd.pgrst.object+json");
    return this;
  }
  maybeSingle() {
    this.isMaybeSingle = true;
    return this;
  }
  csv() {
    this.headers.set("Accept", "text/csv");
    return this;
  }
  geojson() {
    this.headers.set("Accept", "application/geo+json");
    return this;
  }
  explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
    var _this$headers$get;
    const options = [
      analyze ? "analyze" : null,
      verbose ? "verbose" : null,
      settings ? "settings" : null,
      buffers ? "buffers" : null,
      wal ? "wal" : null
    ].filter(Boolean).join("|");
    const forMediatype = (_this$headers$get = this.headers.get("Accept")) !== null && _this$headers$get !== undefined ? _this$headers$get : "application/json";
    this.headers.set("Accept", `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`);
    if (format === "json")
      return this;
    else
      return this;
  }
  rollback() {
    this.headers.append("Prefer", "tx=rollback");
    return this;
  }
  returns() {
    return this;
  }
  maxAffected(rows) {
    this.headers.append("Prefer", "handling=strict");
    this.headers.append("Prefer", `max-affected=${rows}`);
    return this;
  }
};
var PostgrestReservedCharsRegexp = /* @__PURE__ */ new RegExp("[,()]");
var PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
  throwOnError() {
    return super.throwOnError();
  }
  eq(column, value) {
    this.url.searchParams.append(column, `eq.${value}`);
    return this;
  }
  neq(column, value) {
    this.url.searchParams.append(column, `neq.${value}`);
    return this;
  }
  gt(column, value) {
    this.url.searchParams.append(column, `gt.${value}`);
    return this;
  }
  gte(column, value) {
    this.url.searchParams.append(column, `gte.${value}`);
    return this;
  }
  lt(column, value) {
    this.url.searchParams.append(column, `lt.${value}`);
    return this;
  }
  lte(column, value) {
    this.url.searchParams.append(column, `lte.${value}`);
    return this;
  }
  like(column, pattern) {
    this.url.searchParams.append(column, `like.${pattern}`);
    return this;
  }
  likeAllOf(column, patterns) {
    this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
    return this;
  }
  likeAnyOf(column, patterns) {
    this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
    return this;
  }
  ilike(column, pattern) {
    this.url.searchParams.append(column, `ilike.${pattern}`);
    return this;
  }
  ilikeAllOf(column, patterns) {
    this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
    return this;
  }
  ilikeAnyOf(column, patterns) {
    this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
    return this;
  }
  regexMatch(column, pattern) {
    this.url.searchParams.append(column, `match.${pattern}`);
    return this;
  }
  regexIMatch(column, pattern) {
    this.url.searchParams.append(column, `imatch.${pattern}`);
    return this;
  }
  is(column, value) {
    this.url.searchParams.append(column, `is.${value}`);
    return this;
  }
  isDistinct(column, value) {
    this.url.searchParams.append(column, `isdistinct.${value}`);
    return this;
  }
  in(column, values) {
    const cleanedValues = Array.from(new Set(values)).map((s) => {
      if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s))
        return `"${s}"`;
      else
        return `${s}`;
    }).join(",");
    this.url.searchParams.append(column, `in.(${cleanedValues})`);
    return this;
  }
  notIn(column, values) {
    const cleanedValues = Array.from(new Set(values)).map((s) => {
      if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s))
        return `"${s}"`;
      else
        return `${s}`;
    }).join(",");
    this.url.searchParams.append(column, `not.in.(${cleanedValues})`);
    return this;
  }
  contains(column, value) {
    if (typeof value === "string")
      this.url.searchParams.append(column, `cs.${value}`);
    else if (Array.isArray(value))
      this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
    else
      this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
    return this;
  }
  containedBy(column, value) {
    if (typeof value === "string")
      this.url.searchParams.append(column, `cd.${value}`);
    else if (Array.isArray(value))
      this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
    else
      this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
    return this;
  }
  rangeGt(column, range) {
    this.url.searchParams.append(column, `sr.${range}`);
    return this;
  }
  rangeGte(column, range) {
    this.url.searchParams.append(column, `nxl.${range}`);
    return this;
  }
  rangeLt(column, range) {
    this.url.searchParams.append(column, `sl.${range}`);
    return this;
  }
  rangeLte(column, range) {
    this.url.searchParams.append(column, `nxr.${range}`);
    return this;
  }
  rangeAdjacent(column, range) {
    this.url.searchParams.append(column, `adj.${range}`);
    return this;
  }
  overlaps(column, value) {
    if (typeof value === "string")
      this.url.searchParams.append(column, `ov.${value}`);
    else
      this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
    return this;
  }
  textSearch(column, query, { config, type } = {}) {
    let typePart = "";
    if (type === "plain")
      typePart = "pl";
    else if (type === "phrase")
      typePart = "ph";
    else if (type === "websearch")
      typePart = "w";
    const configPart = config === undefined ? "" : `(${config})`;
    this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
    return this;
  }
  match(query) {
    Object.entries(query).filter(([_, value]) => value !== undefined).forEach(([column, value]) => {
      this.url.searchParams.append(column, `eq.${value}`);
    });
    return this;
  }
  not(column, operator, value) {
    this.url.searchParams.append(column, `not.${operator}.${value}`);
    return this;
  }
  or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
    const key = referencedTable ? `${referencedTable}.or` : "or";
    this.url.searchParams.append(key, `(${filters})`);
    return this;
  }
  filter(column, operator, value) {
    this.url.searchParams.append(column, `${operator}.${value}`);
    return this;
  }
};
var PostgrestQueryBuilder = class {
  constructor(url, { headers = {}, schema, fetch: fetch$1, urlLengthLimit = 8000, retry }) {
    this.url = url;
    this.headers = new Headers(headers);
    this.schema = schema;
    this.fetch = fetch$1;
    this.urlLengthLimit = urlLengthLimit;
    this.retry = retry;
  }
  cloneRequestState() {
    return {
      url: new URL(this.url.toString()),
      headers: new Headers(this.headers)
    };
  }
  select(columns, options) {
    const { head = false, count } = options !== null && options !== undefined ? options : {};
    const method = head ? "HEAD" : "GET";
    let quoted = false;
    const cleanedColumns = (columns !== null && columns !== undefined ? columns : "*").split("").map((c) => {
      if (/\s/.test(c) && !quoted)
        return "";
      if (c === '"')
        quoted = !quoted;
      return c;
    }).join("");
    const { url, headers } = this.cloneRequestState();
    url.searchParams.set("select", cleanedColumns);
    if (count)
      headers.append("Prefer", `count=${count}`);
    return new PostgrestFilterBuilder({
      method,
      url,
      headers,
      schema: this.schema,
      fetch: this.fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry
    });
  }
  insert(values, { count, defaultToNull = true } = {}) {
    var _this$fetch;
    const method = "POST";
    const { url, headers } = this.cloneRequestState();
    if (count)
      headers.append("Prefer", `count=${count}`);
    if (!defaultToNull)
      headers.append("Prefer", `missing=default`);
    if (Array.isArray(values)) {
      const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
      if (columns.length > 0) {
        const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
        url.searchParams.set("columns", uniqueColumns.join(","));
      }
    }
    return new PostgrestFilterBuilder({
      method,
      url,
      headers,
      schema: this.schema,
      body: values,
      fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== undefined ? _this$fetch : fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry
    });
  }
  upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
    var _this$fetch2;
    const method = "POST";
    const { url, headers } = this.cloneRequestState();
    headers.append("Prefer", `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`);
    if (onConflict !== undefined)
      url.searchParams.set("on_conflict", onConflict);
    if (count)
      headers.append("Prefer", `count=${count}`);
    if (!defaultToNull)
      headers.append("Prefer", "missing=default");
    if (Array.isArray(values)) {
      const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
      if (columns.length > 0) {
        const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
        url.searchParams.set("columns", uniqueColumns.join(","));
      }
    }
    return new PostgrestFilterBuilder({
      method,
      url,
      headers,
      schema: this.schema,
      body: values,
      fetch: (_this$fetch2 = this.fetch) !== null && _this$fetch2 !== undefined ? _this$fetch2 : fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry
    });
  }
  update(values, { count } = {}) {
    var _this$fetch3;
    const method = "PATCH";
    const { url, headers } = this.cloneRequestState();
    if (count)
      headers.append("Prefer", `count=${count}`);
    return new PostgrestFilterBuilder({
      method,
      url,
      headers,
      schema: this.schema,
      body: values,
      fetch: (_this$fetch3 = this.fetch) !== null && _this$fetch3 !== undefined ? _this$fetch3 : fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry
    });
  }
  delete({ count } = {}) {
    var _this$fetch4;
    const method = "DELETE";
    const { url, headers } = this.cloneRequestState();
    if (count)
      headers.append("Prefer", `count=${count}`);
    return new PostgrestFilterBuilder({
      method,
      url,
      headers,
      schema: this.schema,
      fetch: (_this$fetch4 = this.fetch) !== null && _this$fetch4 !== undefined ? _this$fetch4 : fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry
    });
  }
};
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o$1) {
    return typeof o$1;
  } : function(o$1) {
    return o$1 && typeof Symbol == "function" && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
  }, _typeof(o);
}
function toPrimitive(t, r) {
  if (_typeof(t) != "object" || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (e !== undefined) {
    var i = e.call(t, r || "default");
    if (_typeof(i) != "object")
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return _typeof(i) == "symbol" ? i : i + "";
}
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r$1) {
      return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1;r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r$1) {
      _defineProperty(e, r$1, t[r$1]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
      Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
    });
  }
  return e;
}
var PostgrestClient = class PostgrestClient2 {
  constructor(url, { headers = {}, schema, fetch: fetch$1, timeout, urlLengthLimit = 8000, retry } = {}) {
    this.url = url;
    this.headers = new Headers(headers);
    this.schemaName = schema;
    this.urlLengthLimit = urlLengthLimit;
    const originalFetch = fetch$1 !== null && fetch$1 !== undefined ? fetch$1 : globalThis.fetch;
    if (timeout !== undefined && timeout > 0)
      this.fetch = (input, init) => {
        const controller = new AbortController;
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        const existingSignal = init === null || init === undefined ? undefined : init.signal;
        if (existingSignal) {
          if (existingSignal.aborted) {
            clearTimeout(timeoutId);
            return originalFetch(input, init);
          }
          const abortHandler = () => {
            clearTimeout(timeoutId);
            controller.abort();
          };
          existingSignal.addEventListener("abort", abortHandler, { once: true });
          return originalFetch(input, _objectSpread2(_objectSpread2({}, init), {}, { signal: controller.signal })).finally(() => {
            clearTimeout(timeoutId);
            existingSignal.removeEventListener("abort", abortHandler);
          });
        }
        return originalFetch(input, _objectSpread2(_objectSpread2({}, init), {}, { signal: controller.signal })).finally(() => clearTimeout(timeoutId));
      };
    else
      this.fetch = originalFetch;
    this.retry = retry;
  }
  from(relation) {
    if (!relation || typeof relation !== "string" || relation.trim() === "")
      throw new Error("Invalid relation name: relation must be a non-empty string.");
    return new PostgrestQueryBuilder(new URL(`${this.url}/${relation}`), {
      headers: new Headers(this.headers),
      schema: this.schemaName,
      fetch: this.fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry
    });
  }
  schema(schema) {
    return new PostgrestClient2(this.url, {
      headers: this.headers,
      schema,
      fetch: this.fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry
    });
  }
  rpc(fn, args = {}, { head = false, get = false, count } = {}) {
    var _this$fetch;
    let method;
    const url = new URL(`${this.url}/rpc/${fn}`);
    let body;
    const _isObject = (v) => v !== null && typeof v === "object" && (!Array.isArray(v) || v.some(_isObject));
    const _hasObjectArg = head && Object.values(args).some(_isObject);
    if (_hasObjectArg) {
      method = "POST";
      body = args;
    } else if (head || get) {
      method = head ? "HEAD" : "GET";
      Object.entries(args).filter(([_, value]) => value !== undefined).map(([name, value]) => [name, Array.isArray(value) ? `{${value.join(",")}}` : `${value}`]).forEach(([name, value]) => {
        url.searchParams.append(name, value);
      });
    } else {
      method = "POST";
      body = args;
    }
    const headers = new Headers(this.headers);
    if (_hasObjectArg)
      headers.set("Prefer", count ? `count=${count},return=minimal` : "return=minimal");
    else if (count)
      headers.set("Prefer", `count=${count}`);
    return new PostgrestFilterBuilder({
      method,
      url,
      headers,
      schema: this.schemaName,
      body,
      fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== undefined ? _this$fetch : fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry
    });
  }
};

// node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
class WebSocketFactory {
  constructor() {}
  static detectEnvironment() {
    var _a;
    if (typeof WebSocket !== "undefined") {
      return { type: "native", wsConstructor: WebSocket };
    }
    const gt = globalThis;
    if (typeof globalThis !== "undefined" && typeof gt.WebSocket !== "undefined") {
      return { type: "native", wsConstructor: gt.WebSocket };
    }
    const gl = typeof global !== "undefined" ? global : undefined;
    if (gl && typeof gl.WebSocket !== "undefined") {
      return { type: "native", wsConstructor: gl.WebSocket };
    }
    if (typeof globalThis !== "undefined" && typeof gt.WebSocketPair !== "undefined" && typeof globalThis.WebSocket === "undefined") {
      return {
        type: "cloudflare",
        error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
        workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
      };
    }
    if (typeof globalThis !== "undefined" && gt.EdgeRuntime || typeof navigator !== "undefined" && ((_a = navigator.userAgent) === null || _a === undefined ? undefined : _a.includes("Vercel-Edge"))) {
      return {
        type: "unsupported",
        error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
        workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
      };
    }
    const _process = globalThis["process"];
    if (_process) {
      const processVersions = _process["versions"];
      if (processVersions && processVersions["node"]) {
        const versionString = processVersions["node"];
        const nodeVersion = parseInt(versionString.replace(/^v/, "").split(".")[0]);
        if (nodeVersion >= 22) {
          if (typeof globalThis.WebSocket !== "undefined") {
            return { type: "native", wsConstructor: globalThis.WebSocket };
          }
          return {
            type: "unsupported",
            error: `Node.js ${nodeVersion} detected but native WebSocket not found.`,
            workaround: "Provide a WebSocket implementation via the transport option."
          };
        }
        return {
          type: "unsupported",
          error: `Node.js ${nodeVersion} detected without native WebSocket support.`,
          workaround: `For Node.js < 22, install "ws" package and provide it via the transport option:
` + `import ws from "ws"
` + "new RealtimeClient(url, { transport: ws })"
        };
      }
    }
    return {
      type: "unsupported",
      error: "Unknown JavaScript runtime without WebSocket support.",
      workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
    };
  }
  static getWebSocketConstructor() {
    const env = this.detectEnvironment();
    if (env.wsConstructor) {
      return env.wsConstructor;
    }
    let errorMessage = env.error || "WebSocket not supported in this environment.";
    if (env.workaround) {
      errorMessage += `

Suggested solution: ${env.workaround}`;
    }
    throw new Error(errorMessage);
  }
  static isWebSocketSupported() {
    try {
      const env = this.detectEnvironment();
      return env.type === "native" || env.type === "ws";
    } catch (_a) {
      return false;
    }
  }
}
var websocket_factory_default = WebSocketFactory;

// node_modules/@supabase/realtime-js/dist/module/lib/version.js
var version = "2.108.2";

// node_modules/@supabase/realtime-js/dist/module/lib/constants.js
var DEFAULT_VERSION = `realtime-js/${version}`;
var VSN_1_0_0 = "1.0.0";
var VSN_2_0_0 = "2.0.0";
var DEFAULT_VSN = VSN_2_0_0;
var DEFAULT_TIMEOUT = 1e4;
var MAX_PUSH_BUFFER_SIZE = 100;
var CHANNEL_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving"
};
var CHANNEL_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave",
  access_token: "access_token"
};
var CONNECTION_STATE = {
  connecting: "connecting",
  open: "open",
  closing: "closing",
  closed: "closed"
};

// node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
class Serializer {
  constructor(allowedMetadataKeys) {
    this.HEADER_LENGTH = 1;
    this.USER_BROADCAST_PUSH_META_LENGTH = 6;
    this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 };
    this.BINARY_ENCODING = 0;
    this.JSON_ENCODING = 1;
    this.BROADCAST_EVENT = "broadcast";
    this.allowedMetadataKeys = [];
    this.allowedMetadataKeys = allowedMetadataKeys !== null && allowedMetadataKeys !== undefined ? allowedMetadataKeys : [];
  }
  encode(msg, callback) {
    if (msg.event === this.BROADCAST_EVENT && !(msg.payload instanceof ArrayBuffer) && typeof msg.payload.event === "string") {
      return callback(this._binaryEncodeUserBroadcastPush(msg));
    }
    let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
    return callback(JSON.stringify(payload));
  }
  _binaryEncodeUserBroadcastPush(message) {
    var _a;
    if (this._isArrayBuffer((_a = message.payload) === null || _a === undefined ? undefined : _a.payload)) {
      return this._encodeBinaryUserBroadcastPush(message);
    } else {
      return this._encodeJsonUserBroadcastPush(message);
    }
  }
  _encodeBinaryUserBroadcastPush(message) {
    var _a, _b;
    const userPayload = (_b = (_a = message.payload) === null || _a === undefined ? undefined : _a.payload) !== null && _b !== undefined ? _b : new ArrayBuffer(0);
    return this._encodeUserBroadcastPush(message, this.BINARY_ENCODING, userPayload);
  }
  _encodeJsonUserBroadcastPush(message) {
    var _a, _b;
    const userPayload = (_b = (_a = message.payload) === null || _a === undefined ? undefined : _a.payload) !== null && _b !== undefined ? _b : {};
    const encoder = new TextEncoder;
    const encodedUserPayload = encoder.encode(JSON.stringify(userPayload)).buffer;
    return this._encodeUserBroadcastPush(message, this.JSON_ENCODING, encodedUserPayload);
  }
  _encodeUserBroadcastPush(message, encodingType, encodedPayload) {
    var _a, _b;
    const topic = message.topic;
    const ref = (_a = message.ref) !== null && _a !== undefined ? _a : "";
    const joinRef = (_b = message.join_ref) !== null && _b !== undefined ? _b : "";
    const userEvent = message.payload.event;
    const rest = this.allowedMetadataKeys ? this._pick(message.payload, this.allowedMetadataKeys) : {};
    const metadata = Object.keys(rest).length === 0 ? "" : JSON.stringify(rest);
    if (joinRef.length > 255) {
      throw new Error(`joinRef length ${joinRef.length} exceeds maximum of 255`);
    }
    if (ref.length > 255) {
      throw new Error(`ref length ${ref.length} exceeds maximum of 255`);
    }
    if (topic.length > 255) {
      throw new Error(`topic length ${topic.length} exceeds maximum of 255`);
    }
    if (userEvent.length > 255) {
      throw new Error(`userEvent length ${userEvent.length} exceeds maximum of 255`);
    }
    if (metadata.length > 255) {
      throw new Error(`metadata length ${metadata.length} exceeds maximum of 255`);
    }
    const metaLength = this.USER_BROADCAST_PUSH_META_LENGTH + joinRef.length + ref.length + topic.length + userEvent.length + metadata.length;
    const header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
    let view = new DataView(header);
    let offset = 0;
    view.setUint8(offset++, this.KINDS.userBroadcastPush);
    view.setUint8(offset++, joinRef.length);
    view.setUint8(offset++, ref.length);
    view.setUint8(offset++, topic.length);
    view.setUint8(offset++, userEvent.length);
    view.setUint8(offset++, metadata.length);
    view.setUint8(offset++, encodingType);
    Array.from(joinRef, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(userEvent, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(metadata, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    var combined = new Uint8Array(header.byteLength + encodedPayload.byteLength);
    combined.set(new Uint8Array(header), 0);
    combined.set(new Uint8Array(encodedPayload), header.byteLength);
    return combined.buffer;
  }
  decode(rawPayload, callback) {
    if (this._isArrayBuffer(rawPayload)) {
      let result = this._binaryDecode(rawPayload);
      return callback(result);
    }
    if (typeof rawPayload === "string") {
      const jsonPayload = JSON.parse(rawPayload);
      const [join_ref, ref, topic, event, payload] = jsonPayload;
      return callback({ join_ref, ref, topic, event, payload });
    }
    return callback({});
  }
  _binaryDecode(buffer) {
    const view = new DataView(buffer);
    const kind = view.getUint8(0);
    const decoder = new TextDecoder;
    switch (kind) {
      case this.KINDS.userBroadcast:
        return this._decodeUserBroadcast(buffer, view, decoder);
    }
  }
  _decodeUserBroadcast(buffer, view, decoder) {
    const topicSize = view.getUint8(1);
    const userEventSize = view.getUint8(2);
    const metadataSize = view.getUint8(3);
    const payloadEncoding = view.getUint8(4);
    let offset = this.HEADER_LENGTH + 4;
    const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    const userEvent = decoder.decode(buffer.slice(offset, offset + userEventSize));
    offset = offset + userEventSize;
    const metadata = decoder.decode(buffer.slice(offset, offset + metadataSize));
    offset = offset + metadataSize;
    const payload = buffer.slice(offset, buffer.byteLength);
    const parsedPayload = payloadEncoding === this.JSON_ENCODING ? JSON.parse(decoder.decode(payload)) : payload;
    const data = {
      type: this.BROADCAST_EVENT,
      event: userEvent,
      payload: parsedPayload
    };
    if (metadataSize > 0) {
      data["meta"] = JSON.parse(metadata);
    }
    return { join_ref: null, ref: null, topic, event: this.BROADCAST_EVENT, payload: data };
  }
  _isArrayBuffer(buffer) {
    var _a;
    return buffer instanceof ArrayBuffer || ((_a = buffer === null || buffer === undefined ? undefined : buffer.constructor) === null || _a === undefined ? undefined : _a.name) === "ArrayBuffer";
  }
  _pick(obj, keys) {
    if (!obj || typeof obj !== "object") {
      return {};
    }
    return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
  }
}

// node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
var PostgresTypes;
(function(PostgresTypes2) {
  PostgresTypes2["abstime"] = "abstime";
  PostgresTypes2["bool"] = "bool";
  PostgresTypes2["date"] = "date";
  PostgresTypes2["daterange"] = "daterange";
  PostgresTypes2["float4"] = "float4";
  PostgresTypes2["float8"] = "float8";
  PostgresTypes2["int2"] = "int2";
  PostgresTypes2["int4"] = "int4";
  PostgresTypes2["int4range"] = "int4range";
  PostgresTypes2["int8"] = "int8";
  PostgresTypes2["int8range"] = "int8range";
  PostgresTypes2["json"] = "json";
  PostgresTypes2["jsonb"] = "jsonb";
  PostgresTypes2["money"] = "money";
  PostgresTypes2["numeric"] = "numeric";
  PostgresTypes2["oid"] = "oid";
  PostgresTypes2["reltime"] = "reltime";
  PostgresTypes2["text"] = "text";
  PostgresTypes2["time"] = "time";
  PostgresTypes2["timestamp"] = "timestamp";
  PostgresTypes2["timestamptz"] = "timestamptz";
  PostgresTypes2["timetz"] = "timetz";
  PostgresTypes2["tsrange"] = "tsrange";
  PostgresTypes2["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
var convertChangeData = (columns, record, options = {}) => {
  var _a;
  const skipTypes = (_a = options.skipTypes) !== null && _a !== undefined ? _a : [];
  if (!record) {
    return {};
  }
  return Object.keys(record).reduce((acc, rec_key) => {
    acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
    return acc;
  }, {});
};
var convertColumn = (columnName, columns, record, skipTypes) => {
  const column = columns.find((x) => x.name === columnName);
  const colType = column === null || column === undefined ? undefined : column.type;
  const value = record[columnName];
  if (colType && !skipTypes.includes(colType)) {
    return convertCell(colType, value);
  }
  return noop(value);
};
var convertCell = (type, value) => {
  if (type.charAt(0) === "_") {
    const dataType = type.slice(1, type.length);
    return toArray(value, dataType);
  }
  switch (type) {
    case PostgresTypes.bool:
      return toBoolean(value);
    case PostgresTypes.float4:
    case PostgresTypes.float8:
    case PostgresTypes.int2:
    case PostgresTypes.int4:
    case PostgresTypes.int8:
    case PostgresTypes.numeric:
    case PostgresTypes.oid:
      return toNumber(value);
    case PostgresTypes.json:
    case PostgresTypes.jsonb:
      return toJson(value);
    case PostgresTypes.timestamp:
      return toTimestampString(value);
    case PostgresTypes.abstime:
    case PostgresTypes.date:
    case PostgresTypes.daterange:
    case PostgresTypes.int4range:
    case PostgresTypes.int8range:
    case PostgresTypes.money:
    case PostgresTypes.reltime:
    case PostgresTypes.text:
    case PostgresTypes.time:
    case PostgresTypes.timestamptz:
    case PostgresTypes.timetz:
    case PostgresTypes.tsrange:
    case PostgresTypes.tstzrange:
      return noop(value);
    default:
      return noop(value);
  }
};
var noop = (value) => {
  return value;
};
var toBoolean = (value) => {
  switch (value) {
    case "t":
      return true;
    case "f":
      return false;
    default:
      return value;
  }
};
var toNumber = (value) => {
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
    }
  }
  return value;
};
var toJson = (value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (_a) {
      return value;
    }
  }
  return value;
};
var toArray = (value, type) => {
  if (typeof value !== "string") {
    return value;
  }
  const lastIdx = value.length - 1;
  const closeBrace = value[lastIdx];
  const openBrace = value[0];
  if (openBrace === "{" && closeBrace === "}") {
    let arr;
    const valTrim = value.slice(1, lastIdx);
    try {
      arr = JSON.parse("[" + valTrim + "]");
    } catch (_) {
      arr = valTrim ? valTrim.split(",") : [];
    }
    return arr.map((val) => convertCell(type, val));
  }
  return value;
};
var toTimestampString = (value) => {
  if (typeof value === "string") {
    return value.replace(" ", "T");
  }
  return value;
};
var httpEndpointURL = (socketUrl) => {
  const wsUrl = new URL(socketUrl);
  wsUrl.protocol = wsUrl.protocol.replace(/^ws/i, "http");
  wsUrl.pathname = wsUrl.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, "");
  if (wsUrl.pathname === "" || wsUrl.pathname === "/") {
    wsUrl.pathname = "/api/broadcast";
  } else {
    wsUrl.pathname = wsUrl.pathname + "/api/broadcast";
  }
  return wsUrl.href;
};

// node_modules/@supabase/phoenix/priv/static/phoenix.mjs
var closure = (value) => {
  if (typeof value === "function") {
    return value;
  } else {
    let closure2 = function() {
      return value;
    };
    return closure2;
  }
};
var globalSelf = typeof self !== "undefined" ? self : null;
var phxWindow = typeof window !== "undefined" ? window : null;
var global2 = globalSelf || phxWindow || globalThis;
var DEFAULT_VSN2 = "2.0.0";
var DEFAULT_TIMEOUT2 = 1e4;
var WS_CLOSE_NORMAL = 1000;
var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
var CHANNEL_STATES2 = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving"
};
var CHANNEL_EVENTS2 = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
};
var TRANSPORTS = {
  longpoll: "longpoll",
  websocket: "websocket"
};
var XHR_STATES = {
  complete: 4
};
var AUTH_TOKEN_PREFIX = "base64url.bearer.phx.";
var Push = class {
  constructor(channel, event, payload, timeout) {
    this.channel = channel;
    this.event = event;
    this.payload = payload || function() {
      return {};
    };
    this.receivedResp = null;
    this.timeout = timeout;
    this.timeoutTimer = null;
    this.recHooks = [];
    this.sent = false;
    this.ref = undefined;
  }
  resend(timeout) {
    this.timeout = timeout;
    this.reset();
    this.send();
  }
  send() {
    if (this.hasReceived("timeout")) {
      return;
    }
    this.startTimeout();
    this.sent = true;
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload(),
      ref: this.ref,
      join_ref: this.channel.joinRef()
    });
  }
  receive(status, callback) {
    if (this.hasReceived(status)) {
      callback(this.receivedResp.response);
    }
    this.recHooks.push({ status, callback });
    return this;
  }
  reset() {
    this.cancelRefEvent();
    this.ref = null;
    this.refEvent = null;
    this.receivedResp = null;
    this.sent = false;
  }
  destroy() {
    this.cancelRefEvent();
    this.cancelTimeout();
  }
  matchReceive({ status, response, _ref }) {
    this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
  }
  cancelRefEvent() {
    if (!this.refEvent) {
      return;
    }
    this.channel.off(this.refEvent);
  }
  cancelTimeout() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = null;
  }
  startTimeout() {
    if (this.timeoutTimer) {
      this.cancelTimeout();
    }
    this.ref = this.channel.socket.makeRef();
    this.refEvent = this.channel.replyEventName(this.ref);
    this.channel.on(this.refEvent, (payload) => {
      this.cancelRefEvent();
      this.cancelTimeout();
      this.receivedResp = payload;
      this.matchReceive(payload);
    });
    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status;
  }
  trigger(status, response) {
    this.channel.trigger(this.refEvent, { status, response });
  }
};
var Timer = class {
  constructor(callback, timerCalc) {
    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = undefined;
    this.tries = 0;
  }
  reset() {
    this.tries = 0;
    clearTimeout(this.timer);
  }
  scheduleTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tries = this.tries + 1;
      this.callback();
    }, this.timerCalc(this.tries + 1));
  }
};
var Channel = class {
  constructor(topic, params, socket) {
    this.state = CHANNEL_STATES2.closed;
    this.topic = topic;
    this.params = closure(params || {});
    this.socket = socket;
    this.bindings = [];
    this.bindingRef = 0;
    this.timeout = this.socket.timeout;
    this.joinedOnce = false;
    this.joinPush = new Push(this, CHANNEL_EVENTS2.join, this.params, this.timeout);
    this.pushBuffer = [];
    this.stateChangeRefs = [];
    this.rejoinTimer = new Timer(() => {
      if (this.socket.isConnected()) {
        this.rejoin();
      }
    }, this.socket.rejoinAfterMs);
    this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
    this.stateChangeRefs.push(this.socket.onOpen(() => {
      this.rejoinTimer.reset();
      if (this.isErrored()) {
        this.rejoin();
      }
    }));
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES2.joined;
      this.rejoinTimer.reset();
      this.pushBuffer.forEach((pushEvent) => pushEvent.send());
      this.pushBuffer = [];
    });
    this.joinPush.receive("error", (reason) => {
      this.state = CHANNEL_STATES2.errored;
      if (this.socket.hasLogger())
        this.socket.log("channel", `error ${this.topic}`, reason);
      if (this.socket.isConnected()) {
        this.rejoinTimer.scheduleTimeout();
      }
    });
    this.onClose(() => {
      this.rejoinTimer.reset();
      if (this.socket.hasLogger())
        this.socket.log("channel", `close ${this.topic}`);
      this.state = CHANNEL_STATES2.closed;
      this.socket.remove(this);
    });
    this.onError((reason) => {
      if (this.socket.hasLogger())
        this.socket.log("channel", `error ${this.topic}`, reason);
      if (this.isJoining()) {
        this.joinPush.reset();
      }
      this.state = CHANNEL_STATES2.errored;
      if (this.socket.isConnected()) {
        this.rejoinTimer.scheduleTimeout();
      }
    });
    this.joinPush.receive("timeout", () => {
      if (this.socket.hasLogger())
        this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
      let leavePush = new Push(this, CHANNEL_EVENTS2.leave, closure({}), this.timeout);
      leavePush.send();
      this.state = CHANNEL_STATES2.errored;
      this.joinPush.reset();
      if (this.socket.isConnected()) {
        this.rejoinTimer.scheduleTimeout();
      }
    });
    this.on(CHANNEL_EVENTS2.reply, (payload, ref) => {
      this.trigger(this.replyEventName(ref), payload);
    });
  }
  join(timeout = this.timeout) {
    if (this.joinedOnce) {
      throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
    } else {
      this.timeout = timeout;
      this.joinedOnce = true;
      this.rejoin();
      return this.joinPush;
    }
  }
  teardown() {
    this.pushBuffer.forEach((push) => push.destroy());
    this.pushBuffer = [];
    this.rejoinTimer.reset();
    this.joinPush.destroy();
    this.state = CHANNEL_STATES2.closed;
    this.bindings = [];
  }
  onClose(callback) {
    this.on(CHANNEL_EVENTS2.close, callback);
  }
  onError(callback) {
    return this.on(CHANNEL_EVENTS2.error, (reason) => callback(reason));
  }
  on(event, callback) {
    let ref = this.bindingRef++;
    this.bindings.push({ event, ref, callback });
    return ref;
  }
  off(event, ref) {
    this.bindings = this.bindings.filter((bind) => {
      return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
    });
  }
  canPush() {
    return this.socket.isConnected() && this.isJoined();
  }
  push(event, payload, timeout = this.timeout) {
    payload = payload || {};
    if (!this.joinedOnce) {
      throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
    }
    let pushEvent = new Push(this, event, function() {
      return payload;
    }, timeout);
    if (this.canPush()) {
      pushEvent.send();
    } else {
      pushEvent.startTimeout();
      this.pushBuffer.push(pushEvent);
    }
    return pushEvent;
  }
  leave(timeout = this.timeout) {
    this.rejoinTimer.reset();
    this.joinPush.cancelTimeout();
    this.state = CHANNEL_STATES2.leaving;
    let onClose = () => {
      if (this.socket.hasLogger())
        this.socket.log("channel", `leave ${this.topic}`);
      this.trigger(CHANNEL_EVENTS2.close, "leave");
    };
    let leavePush = new Push(this, CHANNEL_EVENTS2.leave, closure({}), timeout);
    leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
    leavePush.send();
    if (!this.canPush()) {
      leavePush.trigger("ok", {});
    }
    return leavePush;
  }
  onMessage(_event, payload, _ref) {
    return payload;
  }
  filterBindings(_binding, _payload, _ref) {
    return true;
  }
  isMember(topic, event, payload, joinRef) {
    if (this.topic !== topic) {
      return false;
    }
    if (joinRef && joinRef !== this.joinRef()) {
      if (this.socket.hasLogger())
        this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
      return false;
    } else {
      return true;
    }
  }
  joinRef() {
    return this.joinPush.ref;
  }
  rejoin(timeout = this.timeout) {
    if (this.isLeaving()) {
      return;
    }
    this.socket.leaveOpenTopic(this.topic);
    this.state = CHANNEL_STATES2.joining;
    this.joinPush.resend(timeout);
  }
  trigger(event, payload, ref, joinRef) {
    let handledPayload = this.onMessage(event, payload, ref, joinRef);
    if (payload && !handledPayload) {
      throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
    }
    let eventBindings = this.bindings.filter((bind) => bind.event === event && this.filterBindings(bind, payload, ref));
    for (let i = 0;i < eventBindings.length; i++) {
      let bind = eventBindings[i];
      bind.callback(handledPayload, ref, joinRef || this.joinRef());
    }
  }
  replyEventName(ref) {
    return `chan_reply_${ref}`;
  }
  isClosed() {
    return this.state === CHANNEL_STATES2.closed;
  }
  isErrored() {
    return this.state === CHANNEL_STATES2.errored;
  }
  isJoined() {
    return this.state === CHANNEL_STATES2.joined;
  }
  isJoining() {
    return this.state === CHANNEL_STATES2.joining;
  }
  isLeaving() {
    return this.state === CHANNEL_STATES2.leaving;
  }
};
var Ajax = class {
  static request(method, endPoint, headers, body, timeout, ontimeout, callback) {
    if (global2.XDomainRequest) {
      let req = new global2.XDomainRequest;
      return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
    } else if (global2.XMLHttpRequest) {
      let req = new global2.XMLHttpRequest;
      return this.xhrRequest(req, method, endPoint, headers, body, timeout, ontimeout, callback);
    } else if (global2.fetch && global2.AbortController) {
      return this.fetchRequest(method, endPoint, headers, body, timeout, ontimeout, callback);
    } else {
      throw new Error("No suitable XMLHttpRequest implementation found");
    }
  }
  static fetchRequest(method, endPoint, headers, body, timeout, ontimeout, callback) {
    let options = {
      method,
      headers,
      body
    };
    let controller = null;
    if (timeout) {
      controller = new AbortController;
      const _timeoutId = setTimeout(() => controller.abort(), timeout);
      options.signal = controller.signal;
    }
    global2.fetch(endPoint, options).then((response) => response.text()).then((data) => this.parseJSON(data)).then((data) => callback && callback(data)).catch((err) => {
      if (err.name === "AbortError" && ontimeout) {
        ontimeout();
      } else {
        callback && callback(null);
      }
    });
    return controller;
  }
  static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
    req.timeout = timeout;
    req.open(method, endPoint);
    req.onload = () => {
      let response = this.parseJSON(req.responseText);
      callback && callback(response);
    };
    if (ontimeout) {
      req.ontimeout = ontimeout;
    }
    req.onprogress = () => {};
    req.send(body);
    return req;
  }
  static xhrRequest(req, method, endPoint, headers, body, timeout, ontimeout, callback) {
    req.open(method, endPoint, true);
    req.timeout = timeout;
    for (let [key, value] of Object.entries(headers)) {
      req.setRequestHeader(key, value);
    }
    req.onerror = () => callback && callback(null);
    req.onreadystatechange = () => {
      if (req.readyState === XHR_STATES.complete && callback) {
        let response = this.parseJSON(req.responseText);
        callback(response);
      }
    };
    if (ontimeout) {
      req.ontimeout = ontimeout;
    }
    req.send(body);
    return req;
  }
  static parseJSON(resp) {
    if (!resp || resp === "") {
      return null;
    }
    try {
      return JSON.parse(resp);
    } catch {
      console && console.log("failed to parse JSON response", resp);
      return null;
    }
  }
  static serialize(obj, parentKey) {
    let queryStr = [];
    for (var key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        continue;
      }
      let paramKey = parentKey ? `${parentKey}[${key}]` : key;
      let paramVal = obj[key];
      if (typeof paramVal === "object") {
        queryStr.push(this.serialize(paramVal, paramKey));
      } else {
        queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
      }
    }
    return queryStr.join("&");
  }
  static appendParams(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }
    let prefix = url.match(/\?/) ? "&" : "?";
    return `${url}${prefix}${this.serialize(params)}`;
  }
};
var arrayBufferToBase64 = (buffer) => {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0;i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};
var LongPoll = class {
  constructor(endPoint, protocols) {
    if (protocols && protocols.length === 2 && protocols[1].startsWith(AUTH_TOKEN_PREFIX)) {
      this.authToken = atob(protocols[1].slice(AUTH_TOKEN_PREFIX.length));
    }
    this.endPoint = null;
    this.token = null;
    this.skipHeartbeat = true;
    this.reqs = /* @__PURE__ */ new Set;
    this.awaitingBatchAck = false;
    this.currentBatch = null;
    this.currentBatchTimer = null;
    this.batchBuffer = [];
    this.onopen = function() {};
    this.onerror = function() {};
    this.onmessage = function() {};
    this.onclose = function() {};
    this.pollEndpoint = this.normalizeEndpoint(endPoint);
    this.readyState = SOCKET_STATES.connecting;
    setTimeout(() => this.poll(), 0);
  }
  normalizeEndpoint(endPoint) {
    return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
  }
  endpointURL() {
    return Ajax.appendParams(this.pollEndpoint, { token: this.token });
  }
  closeAndRetry(code, reason, wasClean) {
    this.close(code, reason, wasClean);
    this.readyState = SOCKET_STATES.connecting;
  }
  ontimeout() {
    this.onerror("timeout");
    this.closeAndRetry(1005, "timeout", false);
  }
  isActive() {
    return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
  }
  poll() {
    const headers = { Accept: "application/json" };
    if (this.authToken) {
      headers["X-Phoenix-AuthToken"] = this.authToken;
    }
    this.ajax("GET", headers, null, () => this.ontimeout(), (resp) => {
      if (resp) {
        var { status, token, messages } = resp;
        if (status === 410 && this.token !== null) {
          this.onerror(410);
          this.closeAndRetry(3410, "session_gone", false);
          return;
        }
        this.token = token;
      } else {
        status = 0;
      }
      switch (status) {
        case 200:
          messages.forEach((msg) => {
            setTimeout(() => this.onmessage({ data: msg }), 0);
          });
          this.poll();
          break;
        case 204:
          this.poll();
          break;
        case 410:
          this.readyState = SOCKET_STATES.open;
          this.onopen({});
          this.poll();
          break;
        case 403:
          this.onerror(403);
          this.close(1008, "forbidden", false);
          break;
        case 0:
        case 500:
          this.onerror(500);
          this.closeAndRetry(1011, "internal server error", 500);
          break;
        default:
          throw new Error(`unhandled poll status ${status}`);
      }
    });
  }
  send(body) {
    if (typeof body !== "string") {
      body = arrayBufferToBase64(body);
    }
    if (this.currentBatch) {
      this.currentBatch.push(body);
    } else if (this.awaitingBatchAck) {
      this.batchBuffer.push(body);
    } else {
      this.currentBatch = [body];
      this.currentBatchTimer = setTimeout(() => {
        this.batchSend(this.currentBatch);
        this.currentBatch = null;
      }, 0);
    }
  }
  batchSend(messages) {
    this.awaitingBatchAck = true;
    this.ajax("POST", { "Content-Type": "application/x-ndjson" }, messages.join(`
`), () => this.onerror("timeout"), (resp) => {
      this.awaitingBatchAck = false;
      if (!resp || resp.status !== 200) {
        this.onerror(resp && resp.status);
        this.closeAndRetry(1011, "internal server error", false);
      } else if (this.batchBuffer.length > 0) {
        this.batchSend(this.batchBuffer);
        this.batchBuffer = [];
      }
    });
  }
  close(code, reason, wasClean) {
    for (let req of this.reqs) {
      req.abort();
    }
    this.readyState = SOCKET_STATES.closed;
    let opts = Object.assign({ code: 1000, reason: undefined, wasClean: true }, { code, reason, wasClean });
    this.batchBuffer = [];
    clearTimeout(this.currentBatchTimer);
    this.currentBatchTimer = null;
    if (typeof CloseEvent !== "undefined") {
      this.onclose(new CloseEvent("close", opts));
    } else {
      this.onclose(opts);
    }
  }
  ajax(method, headers, body, onCallerTimeout, callback) {
    let req;
    let ontimeout = () => {
      this.reqs.delete(req);
      onCallerTimeout();
    };
    req = Ajax.request(method, this.endpointURL(), headers, body, this.timeout, ontimeout, (resp) => {
      this.reqs.delete(req);
      if (this.isActive()) {
        callback(resp);
      }
    });
    this.reqs.add(req);
  }
};
var Presence = class _Presence {
  constructor(channel, opts = {}) {
    let events = opts.events || { state: "presence_state", diff: "presence_diff" };
    this.state = {};
    this.pendingDiffs = [];
    this.channel = channel;
    this.joinRef = null;
    this.caller = {
      onJoin: function() {},
      onLeave: function() {},
      onSync: function() {}
    };
    this.channel.on(events.state, (newState) => {
      let { onJoin, onLeave, onSync } = this.caller;
      this.joinRef = this.channel.joinRef();
      this.state = _Presence.syncState(this.state, newState, onJoin, onLeave);
      this.pendingDiffs.forEach((diff) => {
        this.state = _Presence.syncDiff(this.state, diff, onJoin, onLeave);
      });
      this.pendingDiffs = [];
      onSync();
    });
    this.channel.on(events.diff, (diff) => {
      let { onJoin, onLeave, onSync } = this.caller;
      if (this.inPendingSyncState()) {
        this.pendingDiffs.push(diff);
      } else {
        this.state = _Presence.syncDiff(this.state, diff, onJoin, onLeave);
        onSync();
      }
    });
  }
  onJoin(callback) {
    this.caller.onJoin = callback;
  }
  onLeave(callback) {
    this.caller.onLeave = callback;
  }
  onSync(callback) {
    this.caller.onSync = callback;
  }
  list(by) {
    return _Presence.list(this.state, by);
  }
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel.joinRef();
  }
  static syncState(currentState, newState, onJoin, onLeave) {
    let state = this.clone(currentState);
    let joins = {};
    let leaves = {};
    this.map(state, (key, presence) => {
      if (!newState[key]) {
        leaves[key] = presence;
      }
    });
    this.map(newState, (key, newPresence) => {
      let currentPresence = state[key];
      if (currentPresence) {
        let newRefs = newPresence.metas.map((m) => m.phx_ref);
        let curRefs = currentPresence.metas.map((m) => m.phx_ref);
        let joinedMetas = newPresence.metas.filter((m) => curRefs.indexOf(m.phx_ref) < 0);
        let leftMetas = currentPresence.metas.filter((m) => newRefs.indexOf(m.phx_ref) < 0);
        if (joinedMetas.length > 0) {
          joins[key] = newPresence;
          joins[key].metas = joinedMetas;
        }
        if (leftMetas.length > 0) {
          leaves[key] = this.clone(currentPresence);
          leaves[key].metas = leftMetas;
        }
      } else {
        joins[key] = newPresence;
      }
    });
    return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
  }
  static syncDiff(state, diff, onJoin, onLeave) {
    let { joins, leaves } = this.clone(diff);
    if (!onJoin) {
      onJoin = function() {};
    }
    if (!onLeave) {
      onLeave = function() {};
    }
    this.map(joins, (key, newPresence) => {
      let currentPresence = state[key];
      state[key] = this.clone(newPresence);
      if (currentPresence) {
        let joinedRefs = state[key].metas.map((m) => m.phx_ref);
        let curMetas = currentPresence.metas.filter((m) => joinedRefs.indexOf(m.phx_ref) < 0);
        state[key].metas.unshift(...curMetas);
      }
      onJoin(key, currentPresence, newPresence);
    });
    this.map(leaves, (key, leftPresence) => {
      let currentPresence = state[key];
      if (!currentPresence) {
        return;
      }
      let refsToRemove = leftPresence.metas.map((m) => m.phx_ref);
      currentPresence.metas = currentPresence.metas.filter((p) => {
        return refsToRemove.indexOf(p.phx_ref) < 0;
      });
      onLeave(key, currentPresence, leftPresence);
      if (currentPresence.metas.length === 0) {
        delete state[key];
      }
    });
    return state;
  }
  static list(presences, chooser) {
    if (!chooser) {
      chooser = function(key, pres) {
        return pres;
      };
    }
    return this.map(presences, (key, presence) => {
      return chooser(key, presence);
    });
  }
  static map(obj, func) {
    return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
  }
  static clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
};
var serializer_default = {
  HEADER_LENGTH: 1,
  META_LENGTH: 4,
  KINDS: { push: 0, reply: 1, broadcast: 2 },
  encode(msg, callback) {
    if (msg.payload.constructor === ArrayBuffer) {
      return callback(this.binaryEncode(msg));
    } else {
      let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
      return callback(JSON.stringify(payload));
    }
  },
  decode(rawPayload, callback) {
    if (rawPayload.constructor === ArrayBuffer) {
      return callback(this.binaryDecode(rawPayload));
    } else {
      let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
      return callback({ join_ref, ref, topic, event, payload });
    }
  },
  binaryEncode(message) {
    let { join_ref, ref, event, topic, payload } = message;
    let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
    let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
    let view = new DataView(header);
    let offset = 0;
    view.setUint8(offset++, this.KINDS.push);
    view.setUint8(offset++, join_ref.length);
    view.setUint8(offset++, ref.length);
    view.setUint8(offset++, topic.length);
    view.setUint8(offset++, event.length);
    Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    var combined = new Uint8Array(header.byteLength + payload.byteLength);
    combined.set(new Uint8Array(header), 0);
    combined.set(new Uint8Array(payload), header.byteLength);
    return combined.buffer;
  },
  binaryDecode(buffer) {
    let view = new DataView(buffer);
    let kind = view.getUint8(0);
    let decoder = new TextDecoder;
    switch (kind) {
      case this.KINDS.push:
        return this.decodePush(buffer, view, decoder);
      case this.KINDS.reply:
        return this.decodeReply(buffer, view, decoder);
      case this.KINDS.broadcast:
        return this.decodeBroadcast(buffer, view, decoder);
    }
  },
  decodePush(buffer, view, decoder) {
    let joinRefSize = view.getUint8(1);
    let topicSize = view.getUint8(2);
    let eventSize = view.getUint8(3);
    let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
    let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
    offset = offset + joinRefSize;
    let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    let event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    let data = buffer.slice(offset, buffer.byteLength);
    return { join_ref: joinRef, ref: null, topic, event, payload: data };
  },
  decodeReply(buffer, view, decoder) {
    let joinRefSize = view.getUint8(1);
    let refSize = view.getUint8(2);
    let topicSize = view.getUint8(3);
    let eventSize = view.getUint8(4);
    let offset = this.HEADER_LENGTH + this.META_LENGTH;
    let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
    offset = offset + joinRefSize;
    let ref = decoder.decode(buffer.slice(offset, offset + refSize));
    offset = offset + refSize;
    let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    let event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    let data = buffer.slice(offset, buffer.byteLength);
    let payload = { status: event, response: data };
    return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS2.reply, payload };
  },
  decodeBroadcast(buffer, view, decoder) {
    let topicSize = view.getUint8(1);
    let eventSize = view.getUint8(2);
    let offset = this.HEADER_LENGTH + 2;
    let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    let event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    let data = buffer.slice(offset, buffer.byteLength);
    return { join_ref: null, ref: null, topic, event, payload: data };
  }
};
var Socket = class {
  constructor(endPoint, opts = {}) {
    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
    this.channels = [];
    this.sendBuffer = [];
    this.ref = 0;
    this.fallbackRef = null;
    this.timeout = opts.timeout || DEFAULT_TIMEOUT2;
    this.transport = opts.transport || global2.WebSocket || LongPoll;
    this.conn = undefined;
    this.primaryPassedHealthCheck = false;
    this.longPollFallbackMs = opts.longPollFallbackMs;
    this.fallbackTimer = null;
    let envSessionStorage = null;
    try {
      envSessionStorage = global2 && global2.sessionStorage;
    } catch {}
    this.sessionStore = opts.sessionStorage || envSessionStorage;
    this.establishedConnections = 0;
    this.defaultEncoder = serializer_default.encode.bind(serializer_default);
    this.defaultDecoder = serializer_default.decode.bind(serializer_default);
    this.closeWasClean = true;
    this.disconnecting = false;
    this.binaryType = opts.binaryType || "arraybuffer";
    this.connectClock = 1;
    this.pageHidden = false;
    this.encode = undefined;
    this.decode = undefined;
    if (this.transport !== LongPoll) {
      this.encode = opts.encode || this.defaultEncoder;
      this.decode = opts.decode || this.defaultDecoder;
    } else {
      this.encode = this.defaultEncoder;
      this.decode = this.defaultDecoder;
    }
    let awaitingConnectionOnPageShow = null;
    if (phxWindow && phxWindow.addEventListener) {
      phxWindow.addEventListener("pagehide", (_e) => {
        if (this.conn) {
          this.disconnect();
          awaitingConnectionOnPageShow = this.connectClock;
        }
      });
      phxWindow.addEventListener("pageshow", (_e) => {
        if (awaitingConnectionOnPageShow === this.connectClock) {
          awaitingConnectionOnPageShow = null;
          this.connect();
        }
      });
      phxWindow.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          this.pageHidden = true;
        } else {
          this.pageHidden = false;
          if (!this.isConnected() && !this.closeWasClean) {
            this.teardown(() => this.connect());
          }
        }
      });
    }
    this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 30000;
    this.autoSendHeartbeat = opts.autoSendHeartbeat ?? true;
    this.heartbeatCallback = opts.heartbeatCallback ?? (() => {});
    this.rejoinAfterMs = (tries) => {
      if (opts.rejoinAfterMs) {
        return opts.rejoinAfterMs(tries);
      } else {
        return [1000, 2000, 5000][tries - 1] || 1e4;
      }
    };
    this.reconnectAfterMs = (tries) => {
      if (opts.reconnectAfterMs) {
        return opts.reconnectAfterMs(tries);
      } else {
        return [10, 50, 100, 150, 200, 250, 500, 1000, 2000][tries - 1] || 5000;
      }
    };
    this.logger = opts.logger || null;
    if (!this.logger && opts.debug) {
      this.logger = (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data);
      };
    }
    this.longpollerTimeout = opts.longpollerTimeout || 20000;
    this.params = closure(opts.params || {});
    this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
    this.vsn = opts.vsn || DEFAULT_VSN2;
    this.heartbeatTimeoutTimer = null;
    this.heartbeatTimer = null;
    this.heartbeatSentAt = null;
    this.pendingHeartbeatRef = null;
    this.reconnectTimer = new Timer(() => {
      if (this.pageHidden) {
        this.log("Not reconnecting as page is hidden!");
        this.teardown();
        return;
      }
      this.teardown(async () => {
        if (opts.beforeReconnect)
          await opts.beforeReconnect();
        this.connect();
      });
    }, this.reconnectAfterMs);
    this.authToken = opts.authToken;
  }
  getLongPollTransport() {
    return LongPoll;
  }
  replaceTransport(newTransport) {
    this.connectClock++;
    this.closeWasClean = true;
    clearTimeout(this.fallbackTimer);
    this.reconnectTimer.reset();
    if (this.conn) {
      this.conn.close();
      this.conn = null;
    }
    this.transport = newTransport;
  }
  protocol() {
    return location.protocol.match(/^https/) ? "wss" : "ws";
  }
  endPointURL() {
    let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
    if (uri.charAt(0) !== "/") {
      return uri;
    }
    if (uri.charAt(1) === "/") {
      return `${this.protocol()}:${uri}`;
    }
    return `${this.protocol()}://${location.host}${uri}`;
  }
  disconnect(callback, code, reason) {
    this.connectClock++;
    this.disconnecting = true;
    this.closeWasClean = true;
    clearTimeout(this.fallbackTimer);
    this.reconnectTimer.reset();
    this.teardown(() => {
      this.disconnecting = false;
      callback && callback();
    }, code, reason);
  }
  connect(params) {
    if (params) {
      console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
      this.params = closure(params);
    }
    if (this.conn && !this.disconnecting) {
      return;
    }
    if (this.longPollFallbackMs && this.transport !== LongPoll) {
      this.connectWithFallback(LongPoll, this.longPollFallbackMs);
    } else {
      this.transportConnect();
    }
  }
  log(kind, msg, data) {
    this.logger && this.logger(kind, msg, data);
  }
  hasLogger() {
    return this.logger !== null;
  }
  onOpen(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.open.push([ref, callback]);
    return ref;
  }
  onClose(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.close.push([ref, callback]);
    return ref;
  }
  onError(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.error.push([ref, callback]);
    return ref;
  }
  onMessage(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.message.push([ref, callback]);
    return ref;
  }
  onHeartbeat(callback) {
    this.heartbeatCallback = callback;
  }
  ping(callback) {
    if (!this.isConnected()) {
      return false;
    }
    let ref = this.makeRef();
    let startTime = Date.now();
    this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
    let onMsgRef = this.onMessage((msg) => {
      if (msg.ref === ref) {
        this.off([onMsgRef]);
        callback(Date.now() - startTime);
      }
    });
    return true;
  }
  transportName(transport) {
    switch (transport) {
      case LongPoll:
        return "LongPoll";
      default:
        return transport.name;
    }
  }
  transportConnect() {
    this.connectClock++;
    this.closeWasClean = false;
    let protocols = undefined;
    if (this.authToken) {
      protocols = ["phoenix", `${AUTH_TOKEN_PREFIX}${btoa(this.authToken).replace(/=/g, "")}`];
    }
    this.conn = new this.transport(this.endPointURL(), protocols);
    this.conn.binaryType = this.binaryType;
    this.conn.timeout = this.longpollerTimeout;
    this.conn.onopen = () => this.onConnOpen();
    this.conn.onerror = (error) => this.onConnError(error);
    this.conn.onmessage = (event) => this.onConnMessage(event);
    this.conn.onclose = (event) => this.onConnClose(event);
  }
  getSession(key) {
    return this.sessionStore && this.sessionStore.getItem(key);
  }
  storeSession(key, val) {
    this.sessionStore && this.sessionStore.setItem(key, val);
  }
  connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
    clearTimeout(this.fallbackTimer);
    let established = false;
    let primaryTransport = true;
    let openRef, errorRef;
    let fallbackTransportName = this.transportName(fallbackTransport);
    let fallback = (reason) => {
      this.log("transport", `falling back to ${fallbackTransportName}...`, reason);
      this.off([openRef, errorRef]);
      primaryTransport = false;
      this.replaceTransport(fallbackTransport);
      this.transportConnect();
    };
    if (this.getSession(`phx:fallback:${fallbackTransportName}`)) {
      return fallback("memorized");
    }
    this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
    errorRef = this.onError((reason) => {
      this.log("transport", "error", reason);
      if (primaryTransport && !established) {
        clearTimeout(this.fallbackTimer);
        fallback(reason);
      }
    });
    if (this.fallbackRef) {
      this.off([this.fallbackRef]);
    }
    this.fallbackRef = this.onOpen(() => {
      established = true;
      if (!primaryTransport) {
        let fallbackTransportName2 = this.transportName(fallbackTransport);
        if (!this.primaryPassedHealthCheck) {
          this.storeSession(`phx:fallback:${fallbackTransportName2}`, "true");
        }
        return this.log("transport", `established ${fallbackTransportName2} fallback`);
      }
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
      this.ping((rtt) => {
        this.log("transport", "connected to primary after", rtt);
        this.primaryPassedHealthCheck = true;
        clearTimeout(this.fallbackTimer);
      });
    });
    this.transportConnect();
  }
  clearHeartbeats() {
    clearTimeout(this.heartbeatTimer);
    clearTimeout(this.heartbeatTimeoutTimer);
  }
  onConnOpen() {
    if (this.hasLogger())
      this.log("transport", `connected to ${this.endPointURL()}`);
    this.closeWasClean = false;
    this.disconnecting = false;
    this.establishedConnections++;
    this.flushSendBuffer();
    this.reconnectTimer.reset();
    if (this.autoSendHeartbeat) {
      this.resetHeartbeat();
    }
    this.triggerStateCallbacks("open");
  }
  heartbeatTimeout() {
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      this.heartbeatSentAt = null;
      if (this.hasLogger()) {
        this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      }
      try {
        this.heartbeatCallback("timeout");
      } catch (e) {
        this.log("error", "error in heartbeat callback", e);
      }
      this.triggerChanError(new Error("heartbeat timeout"));
      this.closeWasClean = false;
      this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
    }
  }
  resetHeartbeat() {
    if (this.conn && this.conn.skipHeartbeat) {
      return;
    }
    this.pendingHeartbeatRef = null;
    this.clearHeartbeats();
    this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
  }
  teardown(callback, code, reason) {
    if (!this.conn) {
      return callback && callback();
    }
    const connToClose = this.conn;
    this.waitForBufferDone(connToClose, () => {
      if (code) {
        connToClose.close(code, reason || "");
      } else {
        connToClose.close();
      }
      this.waitForSocketClosed(connToClose, () => {
        if (this.conn === connToClose) {
          this.conn.onopen = function() {};
          this.conn.onerror = function() {};
          this.conn.onmessage = function() {};
          this.conn.onclose = function() {};
          this.conn = null;
        }
        callback && callback();
      });
    });
  }
  waitForBufferDone(conn, callback, tries = 1) {
    if (tries === 5 || !conn.bufferedAmount) {
      callback();
      return;
    }
    setTimeout(() => {
      this.waitForBufferDone(conn, callback, tries + 1);
    }, 150 * tries);
  }
  waitForSocketClosed(conn, callback, tries = 1) {
    if (tries === 5 || conn.readyState === SOCKET_STATES.closed) {
      callback();
      return;
    }
    setTimeout(() => {
      this.waitForSocketClosed(conn, callback, tries + 1);
    }, 150 * tries);
  }
  onConnClose(event) {
    if (this.conn)
      this.conn.onclose = () => {};
    if (this.hasLogger())
      this.log("transport", "close", event);
    this.triggerChanError(event);
    this.clearHeartbeats();
    if (!this.closeWasClean) {
      this.reconnectTimer.scheduleTimeout();
    }
    this.triggerStateCallbacks("close", event);
  }
  onConnError(error) {
    if (this.hasLogger())
      this.log("transport", "error", error);
    let transportBefore = this.transport;
    let establishedBefore = this.establishedConnections;
    this.triggerStateCallbacks("error", error, transportBefore, establishedBefore);
    if (transportBefore === this.transport || establishedBefore > 0) {
      this.triggerChanError(error);
    }
  }
  triggerChanError(reason) {
    this.channels.forEach((channel) => {
      if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
        channel.trigger(CHANNEL_EVENTS2.error, reason);
      }
    });
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case SOCKET_STATES.connecting:
        return "connecting";
      case SOCKET_STATES.open:
        return "open";
      case SOCKET_STATES.closing:
        return "closing";
      default:
        return "closed";
    }
  }
  isConnected() {
    return this.connectionState() === "open";
  }
  remove(channel) {
    this.off(channel.stateChangeRefs);
    this.channels = this.channels.filter((c) => c !== channel);
  }
  off(refs) {
    for (let key in this.stateChangeCallbacks) {
      this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
        return refs.indexOf(ref) === -1;
      });
    }
  }
  channel(topic, chanParams = {}) {
    let chan = new Channel(topic, chanParams, this);
    this.channels.push(chan);
    return chan;
  }
  push(data) {
    if (this.hasLogger()) {
      let { topic, event, payload, ref, join_ref } = data;
      this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
    }
    if (this.isConnected()) {
      this.encode(data, (result) => this.conn.send(result));
    } else {
      this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
    }
  }
  makeRef() {
    let newRef = this.ref + 1;
    if (newRef === this.ref) {
      this.ref = 0;
    } else {
      this.ref = newRef;
    }
    return this.ref.toString();
  }
  sendHeartbeat() {
    if (!this.isConnected()) {
      try {
        this.heartbeatCallback("disconnected");
      } catch (e) {
        this.log("error", "error in heartbeat callback", e);
      }
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.heartbeatTimeout();
      return;
    }
    this.pendingHeartbeatRef = this.makeRef();
    this.heartbeatSentAt = Date.now();
    this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
    try {
      this.heartbeatCallback("sent");
    } catch (e) {
      this.log("error", "error in heartbeat callback", e);
    }
    this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
  }
  flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach((callback) => callback());
      this.sendBuffer = [];
    }
  }
  onConnMessage(rawMessage) {
    this.decode(rawMessage.data, (msg) => {
      let { topic, event, payload, ref, join_ref } = msg;
      if (ref && ref === this.pendingHeartbeatRef) {
        const latency = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : undefined;
        this.clearHeartbeats();
        try {
          this.heartbeatCallback(payload.status === "ok" ? "ok" : "error", latency);
        } catch (e) {
          this.log("error", "error in heartbeat callback", e);
        }
        this.pendingHeartbeatRef = null;
        this.heartbeatSentAt = null;
        if (this.autoSendHeartbeat) {
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
      }
      if (this.hasLogger())
        this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`.trim(), payload);
      for (let i = 0;i < this.channels.length; i++) {
        const channel = this.channels[i];
        if (!channel.isMember(topic, event, payload, join_ref)) {
          continue;
        }
        channel.trigger(event, payload, ref, join_ref);
      }
      this.triggerStateCallbacks("message", msg);
    });
  }
  triggerStateCallbacks(event, ...args) {
    try {
      this.stateChangeCallbacks[event].forEach(([_, callback]) => {
        try {
          callback(...args);
        } catch (e) {
          this.log("error", `error in ${event} callback`, e);
        }
      });
    } catch (e) {
      this.log("error", `error triggering ${event} callbacks`, e);
    }
  }
  leaveOpenTopic(topic) {
    let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
    if (dupChannel) {
      if (this.hasLogger())
        this.log("transport", `leaving duplicate topic "${topic}"`);
      dupChannel.leave();
    }
  }
};

// node_modules/@supabase/realtime-js/dist/module/phoenix/presenceAdapter.js
class PresenceAdapter {
  constructor(channel, opts) {
    const phoenixOptions = phoenixPresenceOptions(opts);
    this.presence = new Presence(channel.getChannel(), phoenixOptions);
    this.presence.onJoin((key, currentPresence, newPresence) => {
      const onJoinPayload = PresenceAdapter.onJoinPayload(key, currentPresence, newPresence);
      channel.getChannel().trigger("presence", onJoinPayload);
    });
    this.presence.onLeave((key, currentPresence, leftPresence) => {
      const onLeavePayload = PresenceAdapter.onLeavePayload(key, currentPresence, leftPresence);
      channel.getChannel().trigger("presence", onLeavePayload);
    });
    this.presence.onSync(() => {
      channel.getChannel().trigger("presence", { event: "sync" });
    });
  }
  get state() {
    return PresenceAdapter.transformState(this.presence.state);
  }
  static transformState(state) {
    state = cloneState(state);
    return Object.getOwnPropertyNames(state).reduce((newState, key) => {
      const presences = state[key];
      newState[key] = transformState(presences);
      return newState;
    }, {});
  }
  static onJoinPayload(key, currentPresence, newPresence) {
    const currentPresences = parseCurrentPresences(currentPresence);
    const newPresences = transformState(newPresence);
    return {
      event: "join",
      key,
      currentPresences,
      newPresences
    };
  }
  static onLeavePayload(key, currentPresence, leftPresence) {
    const currentPresences = parseCurrentPresences(currentPresence);
    const leftPresences = transformState(leftPresence);
    return {
      event: "leave",
      key,
      currentPresences,
      leftPresences
    };
  }
}
function transformState(presences) {
  return presences.metas.map((presence) => {
    presence["presence_ref"] = presence["phx_ref"];
    delete presence["phx_ref"];
    delete presence["phx_ref_prev"];
    return presence;
  });
}
function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}
function phoenixPresenceOptions(opts) {
  return (opts === null || opts === undefined ? undefined : opts.events) && { events: opts.events };
}
function parseCurrentPresences(currentPresences) {
  return (currentPresences === null || currentPresences === undefined ? undefined : currentPresences.metas) ? transformState(currentPresences) : [];
}

// node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function(REALTIME_PRESENCE_LISTEN_EVENTS2) {
  REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
  REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
  REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));

class RealtimePresence {
  get state() {
    return this.presenceAdapter.state;
  }
  constructor(channel, opts) {
    this.channel = channel;
    this.presenceAdapter = new PresenceAdapter(this.channel.channelAdapter, opts);
  }
}

// node_modules/@supabase/realtime-js/dist/module/lib/normalizeChannelError.js
function normalizeChannelError(reason) {
  if (reason instanceof Error) {
    return reason;
  }
  if (typeof reason === "string") {
    return new Error(reason);
  }
  if (reason && typeof reason === "object") {
    const obj = reason;
    if (typeof obj.code === "number") {
      const detail = typeof obj.reason === "string" && obj.reason ? ` (${obj.reason})` : "";
      return new Error(`socket closed: ${obj.code}${detail}`, { cause: reason });
    }
    return new Error("channel error: transport failure", { cause: reason });
  }
  return new Error("channel error: connection lost");
}

// node_modules/@supabase/realtime-js/dist/module/phoenix/channelAdapter.js
class ChannelAdapter {
  constructor(socket, topic, params) {
    const phoenixParams = phoenixChannelParams(params);
    this.channel = socket.getSocket().channel(topic, phoenixParams);
    this.socket = socket;
  }
  get state() {
    return this.channel.state;
  }
  set state(state) {
    this.channel.state = state;
  }
  get joinedOnce() {
    return this.channel.joinedOnce;
  }
  get joinPush() {
    return this.channel.joinPush;
  }
  get rejoinTimer() {
    return this.channel.rejoinTimer;
  }
  on(event, callback) {
    return this.channel.on(event, callback);
  }
  off(event, refNumber) {
    this.channel.off(event, refNumber);
  }
  subscribe(timeout) {
    return this.channel.join(timeout);
  }
  unsubscribe(timeout) {
    return this.channel.leave(timeout);
  }
  teardown() {
    this.channel.teardown();
  }
  onClose(callback) {
    this.channel.onClose(callback);
  }
  onError(callback) {
    return this.channel.onError(callback);
  }
  push(event, payload, timeout) {
    let push;
    try {
      push = this.channel.push(event, payload, timeout);
    } catch (error) {
      throw new Error(`tried to push '${event}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`);
    }
    if (this.channel.pushBuffer.length > MAX_PUSH_BUFFER_SIZE) {
      const removedPush = this.channel.pushBuffer.shift();
      removedPush.cancelTimeout();
      this.socket.log("channel", `discarded push due to buffer overflow: ${removedPush.event}`, removedPush.payload());
    }
    return push;
  }
  updateJoinPayload(payload) {
    const oldPayload = this.channel.joinPush.payload();
    this.channel.joinPush.payload = () => Object.assign(Object.assign({}, oldPayload), payload);
  }
  canPush() {
    return this.socket.isConnected() && this.state === CHANNEL_STATES.joined;
  }
  isJoined() {
    return this.state === CHANNEL_STATES.joined;
  }
  isJoining() {
    return this.state === CHANNEL_STATES.joining;
  }
  isClosed() {
    return this.state === CHANNEL_STATES.closed;
  }
  isLeaving() {
    return this.state === CHANNEL_STATES.leaving;
  }
  updateFilterBindings(filterBindings) {
    this.channel.filterBindings = filterBindings;
  }
  updatePayloadTransform(callback) {
    this.channel.onMessage = callback;
  }
  getChannel() {
    return this.channel;
  }
}
function phoenixChannelParams(options) {
  return {
    config: Object.assign({
      broadcast: { ack: false, self: false },
      presence: { key: "", enabled: false },
      private: false
    }, options.config)
  };
}

// node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) {
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function(REALTIME_LISTEN_TYPES2) {
  REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
  REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
  REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
  REALTIME_LISTEN_TYPES2["SYSTEM"] = "system";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function(REALTIME_SUBSCRIBE_STATES2) {
  REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
  REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
  REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
  REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
class RealtimeChannel {
  get state() {
    return this.channelAdapter.state;
  }
  set state(state) {
    this.channelAdapter.state = state;
  }
  get joinedOnce() {
    return this.channelAdapter.joinedOnce;
  }
  get timeout() {
    return this.socket.timeout;
  }
  get joinPush() {
    return this.channelAdapter.joinPush;
  }
  get rejoinTimer() {
    return this.channelAdapter.rejoinTimer;
  }
  constructor(topic, params = { config: {} }, socket) {
    var _a, _b;
    this.topic = topic;
    this.params = params;
    this.socket = socket;
    this.bindings = {};
    this.subTopic = topic.replace(/^realtime:/i, "");
    this.params.config = Object.assign({
      broadcast: { ack: false, self: false },
      presence: { key: "", enabled: false },
      private: false
    }, params.config);
    this.channelAdapter = new ChannelAdapter(this.socket.socketAdapter, topic, this.params);
    this.presence = new RealtimePresence(this);
    this._onClose(() => {
      this.socket._remove(this);
    });
    this._updateFilterTransform();
    this.broadcastEndpointURL = httpEndpointURL(this.socket.socketAdapter.endPointURL());
    this.private = this.params.config.private || false;
    if (!this.private && ((_b = (_a = this.params.config) === null || _a === undefined ? undefined : _a.broadcast) === null || _b === undefined ? undefined : _b.replay)) {
      throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`);
    }
  }
  subscribe(callback, timeout = this.timeout) {
    var _a, _b, _c;
    if (!this.socket.isConnected()) {
      this.socket.connect();
    }
    if (this.channelAdapter.isClosed()) {
      const { config: { broadcast, presence, private: isPrivate } } = this.params;
      const postgres_changes = (_b = (_a = this.bindings.postgres_changes) === null || _a === undefined ? undefined : _a.map((r) => r.filter)) !== null && _b !== undefined ? _b : [];
      const presence_enabled = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0 || ((_c = this.params.config.presence) === null || _c === undefined ? undefined : _c.enabled) === true;
      const accessTokenPayload = {};
      const config = {
        broadcast,
        presence: Object.assign(Object.assign({}, presence), { enabled: presence_enabled }),
        postgres_changes,
        private: isPrivate
      };
      if (this.socket.accessTokenValue) {
        accessTokenPayload.access_token = this.socket.accessTokenValue;
      }
      this._onError((reason) => {
        callback === null || callback === undefined || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, normalizeChannelError(reason));
      });
      this._onClose(() => callback === null || callback === undefined ? undefined : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
      this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
      this._updateFilterMessage();
      this.channelAdapter.subscribe(timeout).receive("ok", async ({ postgres_changes: postgres_changes2 }) => {
        if (!this.socket._isManualToken()) {
          this.socket.setAuth();
        }
        if (postgres_changes2 === undefined) {
          callback === null || callback === undefined || callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        }
        this._updatePostgresBindings(postgres_changes2, callback);
      }).receive("error", (error) => {
        this.state = CHANNEL_STATES.errored;
        const message = Object.values(error).join(", ") || "error";
        callback === null || callback === undefined || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(message, { cause: error }));
      }).receive("timeout", () => {
        callback === null || callback === undefined || callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
      });
    }
    return this;
  }
  _updatePostgresBindings(postgres_changes, callback) {
    var _a;
    const clientPostgresBindings = this.bindings.postgres_changes;
    const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === undefined ? undefined : clientPostgresBindings.length) !== null && _a !== undefined ? _a : 0;
    const newPostgresBindings = [];
    for (let i = 0;i < bindingsLen; i++) {
      const clientPostgresBinding = clientPostgresBindings[i];
      const { filter: { event, schema, table, filter } } = clientPostgresBinding;
      const serverPostgresFilter = postgres_changes && postgres_changes[i];
      if (serverPostgresFilter && serverPostgresFilter.event === event && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.schema, schema) && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.table, table) && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.filter, filter)) {
        newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
      } else {
        this.unsubscribe();
        this.state = CHANNEL_STATES.errored;
        callback === null || callback === undefined || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
        return;
      }
    }
    this.bindings.postgres_changes = newPostgresBindings;
    if (this.state != CHANNEL_STATES.errored && callback) {
      callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
    }
  }
  presenceState() {
    return this.presence.state;
  }
  async track(payload, opts = {}) {
    return await this.send({
      type: "presence",
      event: "track",
      payload
    }, opts.timeout || this.timeout);
  }
  async untrack(opts = {}) {
    return await this.send({
      type: "presence",
      event: "untrack"
    }, opts);
  }
  on(type, filter, callback) {
    const stateCheck = this.channelAdapter.isJoined() || this.channelAdapter.isJoining();
    const typeCheck = type === REALTIME_LISTEN_TYPES.PRESENCE || type === REALTIME_LISTEN_TYPES.POSTGRES_CHANGES;
    if (stateCheck && typeCheck) {
      this.socket.log("channel", `cannot add \`${type}\` callbacks for ${this.topic} after \`subscribe()\`.`);
      throw new Error(`cannot add \`${type}\` callbacks for ${this.topic} after \`subscribe()\`.`);
    }
    return this._on(type, filter, callback);
  }
  async httpSend(event, payload, opts = {}) {
    var _a;
    if (payload === undefined || payload === null) {
      return Promise.reject(new Error("Payload is required for httpSend()"));
    }
    const isBinary = payload instanceof ArrayBuffer || ArrayBuffer.isView(payload);
    const headers = {
      apikey: this.socket.apiKey ? this.socket.apiKey : "",
      "Content-Type": isBinary ? "application/octet-stream" : "application/json"
    };
    if (this.socket.accessTokenValue) {
      headers["Authorization"] = `Bearer ${this.socket.accessTokenValue}`;
    }
    const url = new URL(this.broadcastEndpointURL);
    url.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(event)}`;
    if (this.private) {
      url.searchParams.set("private", "true");
    }
    const options = {
      method: "POST",
      headers,
      body: isBinary ? payload : JSON.stringify(payload)
    };
    const response = await this._fetchWithTimeout(url.toString(), options, (_a = opts.timeout) !== null && _a !== undefined ? _a : this.timeout);
    if (response.status === 202) {
      return { success: true };
    }
    if (response.status === 404) {
      return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. " + "Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. " + "See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));
    }
    let errorMessage = response.statusText;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (_b) {}
    return Promise.reject(new Error(errorMessage));
  }
  async send(args, opts = {}) {
    var _a, _b;
    if (!this.channelAdapter.canPush() && args.type === "broadcast") {
      console.warn("Realtime send() is automatically falling back to REST API. " + "This behavior will be deprecated in the future. " + "Please use httpSend() explicitly for REST delivery.");
      const { event, payload: endpoint_payload } = args;
      const headers = {
        apikey: this.socket.apiKey ? this.socket.apiKey : "",
        "Content-Type": "application/json"
      };
      if (this.socket.accessTokenValue) {
        headers["Authorization"] = `Bearer ${this.socket.accessTokenValue}`;
      }
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify({
          messages: [
            {
              topic: this.subTopic,
              event,
              payload: endpoint_payload,
              private: this.private
            }
          ]
        })
      };
      try {
        const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== undefined ? _a : this.timeout);
        await ((_b = response.body) === null || _b === undefined ? undefined : _b.cancel());
        return response.ok ? "ok" : "error";
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return "timed out";
        } else {
          return "error";
        }
      }
    } else {
      return new Promise((resolve) => {
        var _a2, _b2, _c;
        const push = this.channelAdapter.push(args.type, args, opts.timeout || this.timeout);
        if (args.type === "broadcast" && !((_c = (_b2 = (_a2 = this.params) === null || _a2 === undefined ? undefined : _a2.config) === null || _b2 === undefined ? undefined : _b2.broadcast) === null || _c === undefined ? undefined : _c.ack)) {
          resolve("ok");
        }
        push.receive("ok", () => resolve("ok"));
        push.receive("error", () => resolve("error"));
        push.receive("timeout", () => resolve("timed out"));
      });
    }
  }
  updateJoinPayload(payload) {
    this.channelAdapter.updateJoinPayload(payload);
  }
  async unsubscribe(timeout = this.timeout) {
    return new Promise((resolve) => {
      this.channelAdapter.unsubscribe(timeout).receive("ok", () => resolve("ok")).receive("timeout", () => resolve("timed out")).receive("error", () => resolve("error"));
    });
  }
  teardown() {
    this.channelAdapter.teardown();
  }
  async _fetchWithTimeout(url, options, timeout) {
    const controller = new AbortController;
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
    clearTimeout(id);
    return response;
  }
  _on(type, filter, callback) {
    const typeLower = type.toLocaleLowerCase();
    const ref = this.channelAdapter.on(type, callback);
    const binding = {
      type: typeLower,
      filter,
      callback,
      ref
    };
    if (this.bindings[typeLower]) {
      this.bindings[typeLower].push(binding);
    } else {
      this.bindings[typeLower] = [binding];
    }
    this._updateFilterMessage();
    return this;
  }
  _onClose(callback) {
    this.channelAdapter.onClose(callback);
  }
  _onError(callback) {
    this.channelAdapter.onError(callback);
  }
  _updateFilterMessage() {
    this.channelAdapter.updateFilterBindings((binding, payload, ref) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const typeLower = binding.event.toLocaleLowerCase();
      if (this._notThisChannelEvent(typeLower, ref)) {
        return false;
      }
      const bind = (_a = this.bindings[typeLower]) === null || _a === undefined ? undefined : _a.find((bind2) => bind2.ref === binding.ref);
      if (!bind) {
        return true;
      }
      if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
        if ("id" in bind) {
          const bindId = bind.id;
          const bindEvent = (_b = bind.filter) === null || _b === undefined ? undefined : _b.event;
          return bindId && ((_c = payload.ids) === null || _c === undefined ? undefined : _c.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === undefined ? undefined : bindEvent.toLocaleLowerCase()) === ((_d = payload.data) === null || _d === undefined ? undefined : _d.type.toLocaleLowerCase()));
        } else {
          const bindEvent = (_f = (_e = bind === null || bind === undefined ? undefined : bind.filter) === null || _e === undefined ? undefined : _e.event) === null || _f === undefined ? undefined : _f.toLocaleLowerCase();
          return bindEvent === "*" || bindEvent === ((_g = payload === null || payload === undefined ? undefined : payload.event) === null || _g === undefined ? undefined : _g.toLocaleLowerCase());
        }
      } else {
        return bind.type.toLocaleLowerCase() === typeLower;
      }
    });
  }
  _notThisChannelEvent(event, ref) {
    const { close, error, leave, join } = CHANNEL_EVENTS;
    const events = [close, error, leave, join];
    return ref && events.includes(event) && ref !== this.joinPush.ref;
  }
  _updateFilterTransform() {
    this.channelAdapter.updatePayloadTransform((event, payload, ref) => {
      if (typeof payload === "object" && "ids" in payload) {
        const postgresChanges = payload.data;
        const { schema, table, commit_timestamp, type, errors } = postgresChanges;
        const enrichedPayload = {
          schema,
          table,
          commit_timestamp,
          eventType: type,
          new: {},
          old: {},
          errors
        };
        return Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
      }
      return payload;
    });
  }
  copyBindings(other) {
    if (this.joinedOnce) {
      throw new Error("cannot copy bindings into joined channel");
    }
    for (const kind in other.bindings) {
      for (const binding of other.bindings[kind]) {
        this._on(binding.type, binding.filter, binding.callback);
      }
    }
  }
  static isFilterValueEqual(serverValue, clientValue) {
    const normalizedServer = serverValue !== null && serverValue !== undefined ? serverValue : undefined;
    const normalizedClient = clientValue !== null && clientValue !== undefined ? clientValue : undefined;
    return normalizedServer === normalizedClient;
  }
  _getPayloadRecords(payload) {
    const records = {
      new: {},
      old: {}
    };
    if (payload.type === "INSERT" || payload.type === "UPDATE") {
      records.new = convertChangeData(payload.columns, payload.record);
    }
    if (payload.type === "UPDATE" || payload.type === "DELETE") {
      records.old = convertChangeData(payload.columns, payload.old_record);
    }
    return records;
  }
}

// node_modules/@supabase/realtime-js/dist/module/phoenix/socketAdapter.js
class SocketAdapter {
  constructor(endPoint, options) {
    this.socket = new Socket(endPoint, options);
  }
  get timeout() {
    return this.socket.timeout;
  }
  get endPoint() {
    return this.socket.endPoint;
  }
  get transport() {
    return this.socket.transport;
  }
  get heartbeatIntervalMs() {
    return this.socket.heartbeatIntervalMs;
  }
  get heartbeatCallback() {
    return this.socket.heartbeatCallback;
  }
  set heartbeatCallback(callback) {
    this.socket.heartbeatCallback = callback;
  }
  get heartbeatTimer() {
    return this.socket.heartbeatTimer;
  }
  get pendingHeartbeatRef() {
    return this.socket.pendingHeartbeatRef;
  }
  get reconnectTimer() {
    return this.socket.reconnectTimer;
  }
  get vsn() {
    return this.socket.vsn;
  }
  get encode() {
    return this.socket.encode;
  }
  get decode() {
    return this.socket.decode;
  }
  get reconnectAfterMs() {
    return this.socket.reconnectAfterMs;
  }
  get sendBuffer() {
    return this.socket.sendBuffer;
  }
  get stateChangeCallbacks() {
    return this.socket.stateChangeCallbacks;
  }
  connect() {
    this.socket.connect();
  }
  disconnect(callback, code, reason, timeout = 1e4) {
    return new Promise((resolve) => {
      setTimeout(() => resolve("timeout"), timeout);
      this.socket.disconnect(() => {
        callback();
        resolve("ok");
      }, code, reason);
    });
  }
  push(data) {
    this.socket.push(data);
  }
  log(kind, msg, data) {
    this.socket.log(kind, msg, data);
  }
  makeRef() {
    return this.socket.makeRef();
  }
  onOpen(callback) {
    this.socket.onOpen(callback);
  }
  onClose(callback) {
    this.socket.onClose(callback);
  }
  onError(callback) {
    this.socket.onError(callback);
  }
  onMessage(callback) {
    this.socket.onMessage(callback);
  }
  isConnected() {
    return this.socket.isConnected();
  }
  isConnecting() {
    return this.socket.connectionState() == CONNECTION_STATE.connecting;
  }
  isDisconnecting() {
    return this.socket.connectionState() == CONNECTION_STATE.closing;
  }
  connectionState() {
    return this.socket.connectionState();
  }
  endPointURL() {
    return this.socket.endPointURL();
  }
  sendHeartbeat() {
    this.socket.sendHeartbeat();
  }
  getSocket() {
    return this.socket;
  }
}

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var CONNECTION_TIMEOUTS = {
  HEARTBEAT_INTERVAL: 25000,
  RECONNECT_DELAY: 10,
  HEARTBEAT_TIMEOUT_FALLBACK: 100
};
var RECONNECT_INTERVALS = [1000, 2000, 5000, 1e4];
var DEFAULT_RECONNECT_FALLBACK = 1e4;
function createMemorySessionStorage() {
  const store = new Map;
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    key(index) {
      var _a;
      return (_a = Array.from(store.keys())[index]) !== null && _a !== undefined ? _a : null;
    },
    removeItem(key) {
      store.delete(key);
    },
    setItem(key, value) {
      store.set(key, String(value));
    }
  };
}
function resolveSessionStorage() {
  try {
    if (typeof globalThis !== "undefined" && globalThis.sessionStorage) {
      return globalThis.sessionStorage;
    }
  } catch (_a) {}
  return createMemorySessionStorage();
}
var WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;

class RealtimeClient {
  get endPoint() {
    return this.socketAdapter.endPoint;
  }
  get timeout() {
    return this.socketAdapter.timeout;
  }
  get transport() {
    return this.socketAdapter.transport;
  }
  get heartbeatCallback() {
    return this.socketAdapter.heartbeatCallback;
  }
  get heartbeatIntervalMs() {
    return this.socketAdapter.heartbeatIntervalMs;
  }
  get heartbeatTimer() {
    if (this.worker) {
      return this._workerHeartbeatTimer;
    }
    return this.socketAdapter.heartbeatTimer;
  }
  get pendingHeartbeatRef() {
    if (this.worker) {
      return this._pendingWorkerHeartbeatRef;
    }
    return this.socketAdapter.pendingHeartbeatRef;
  }
  get reconnectTimer() {
    return this.socketAdapter.reconnectTimer;
  }
  get vsn() {
    return this.socketAdapter.vsn;
  }
  get encode() {
    return this.socketAdapter.encode;
  }
  get decode() {
    return this.socketAdapter.decode;
  }
  get reconnectAfterMs() {
    return this.socketAdapter.reconnectAfterMs;
  }
  get sendBuffer() {
    return this.socketAdapter.sendBuffer;
  }
  get stateChangeCallbacks() {
    return this.socketAdapter.stateChangeCallbacks;
  }
  constructor(endPoint, options) {
    var _a;
    this.channels = new Array;
    this.accessTokenValue = null;
    this.accessToken = null;
    this.apiKey = null;
    this.httpEndpoint = "";
    this.headers = {};
    this.params = {};
    this.ref = 0;
    this.serializer = new Serializer;
    this._manuallySetToken = false;
    this._authPromise = null;
    this._workerHeartbeatTimer = undefined;
    this._pendingWorkerHeartbeatRef = null;
    this._pendingDisconnectTimer = null;
    this._disconnectOnEmptyChannelsAfterMs = 0;
    this._resolveFetch = (customFetch) => {
      if (customFetch) {
        return (...args) => customFetch(...args);
      }
      return (...args) => fetch(...args);
    };
    if (!((_a = options === null || options === undefined ? undefined : options.params) === null || _a === undefined ? undefined : _a.apikey)) {
      throw new Error("API key is required to connect to Realtime");
    }
    this.apiKey = options.params.apikey;
    const socketAdapterOptions = this._initializeOptions(options);
    this.socketAdapter = new SocketAdapter(endPoint, socketAdapterOptions);
    this.httpEndpoint = httpEndpointURL(endPoint);
    this.fetch = this._resolveFetch(options === null || options === undefined ? undefined : options.fetch);
  }
  connect() {
    if (this.isConnecting() || this.isDisconnecting() || this.isConnected()) {
      return;
    }
    if (this.accessToken && !this._authPromise) {
      this._setAuthSafely("connect");
    }
    this._setupConnectionHandlers();
    try {
      this.socketAdapter.connect();
    } catch (error) {
      const errorMessage = error.message;
      if (errorMessage.includes("Node.js")) {
        throw new Error(`${errorMessage}

` + `To use Realtime in Node.js, you need to provide a WebSocket implementation:

` + `Option 1: Use Node.js 22+ which has native WebSocket support
` + `Option 2: Install and provide the "ws" package:

` + `  npm install ws

` + `  import ws from "ws"
` + `  const client = new RealtimeClient(url, {
` + `    ...options,
` + `    transport: ws
` + "  })");
      }
      throw new Error(`WebSocket not available: ${errorMessage}`);
    }
    this._handleNodeJsRaceCondition();
  }
  endpointURL() {
    return this.socketAdapter.endPointURL();
  }
  async disconnect(code, reason) {
    this._cancelPendingDisconnect();
    if (this.isDisconnecting()) {
      return "ok";
    }
    return await this.socketAdapter.disconnect(() => {
      clearInterval(this._workerHeartbeatTimer);
      this._terminateWorker();
    }, code, reason);
  }
  getChannels() {
    return this.channels;
  }
  async removeChannel(channel) {
    const status = await channel.unsubscribe();
    if (status === "ok") {
      channel.teardown();
    }
    return status;
  }
  async removeAllChannels() {
    const promises = this.channels.map(async (channel) => {
      const result2 = await channel.unsubscribe();
      channel.teardown();
      return result2;
    });
    const result = await Promise.all(promises);
    await this.disconnect();
    return result;
  }
  log(kind, msg, data) {
    this.socketAdapter.log(kind, msg, data);
  }
  connectionState() {
    return this.socketAdapter.connectionState() || CONNECTION_STATE.closed;
  }
  isConnected() {
    return this.socketAdapter.isConnected();
  }
  isConnecting() {
    return this.socketAdapter.isConnecting();
  }
  isDisconnecting() {
    return this.socketAdapter.isDisconnecting();
  }
  channel(topic, params = { config: {} }) {
    const realtimeTopic = `realtime:${topic}`;
    const exists = this.getChannels().find((c) => c.topic === realtimeTopic);
    if (!exists) {
      const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
      this._cancelPendingDisconnect();
      this.channels.push(chan);
      return chan;
    } else {
      return exists;
    }
  }
  push(data) {
    this.socketAdapter.push(data);
  }
  async setAuth(token = null) {
    this._authPromise = this._performAuth(token);
    try {
      await this._authPromise;
    } finally {
      this._authPromise = null;
    }
  }
  _isManualToken() {
    return this._manuallySetToken;
  }
  async sendHeartbeat() {
    this.socketAdapter.sendHeartbeat();
  }
  onHeartbeat(callback) {
    this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(callback);
  }
  _makeRef() {
    return this.socketAdapter.makeRef();
  }
  _remove(channel) {
    this.channels = this.channels.filter((c) => c.topic !== channel.topic);
    if (this.channels.length === 0) {
      this.log("transport", "no channels remaining, scheduling disconnect");
      this._schedulePendingDisconnect();
    }
  }
  _schedulePendingDisconnect() {
    this._cancelPendingDisconnect();
    if (this._disconnectOnEmptyChannelsAfterMs === 0) {
      this.log("transport", "disconnecting immediately - no channels");
      this.disconnect();
      return;
    }
    this._pendingDisconnectTimer = setTimeout(() => {
      this._pendingDisconnectTimer = null;
      if (this.channels.length === 0) {
        this.log("transport", "deferred disconnect fired - no channels, disconnecting");
        this.disconnect();
      }
    }, this._disconnectOnEmptyChannelsAfterMs);
    this.log("transport", `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`);
  }
  _cancelPendingDisconnect() {
    if (this._pendingDisconnectTimer !== null) {
      this.log("transport", "pending disconnect cancelled - channel activity detected");
      clearTimeout(this._pendingDisconnectTimer);
      this._pendingDisconnectTimer = null;
    }
  }
  async _performAuth(token = null) {
    let tokenToSend;
    let isManualToken = false;
    if (token) {
      tokenToSend = token;
      isManualToken = true;
    } else if (this.accessToken) {
      try {
        tokenToSend = await this.accessToken();
      } catch (e) {
        this.log("error", "Error fetching access token from callback", e);
        tokenToSend = this.accessTokenValue;
      }
    } else {
      tokenToSend = this.accessTokenValue;
    }
    if (isManualToken) {
      this._manuallySetToken = true;
    } else if (this.accessToken) {
      this._manuallySetToken = false;
    }
    if (this.accessTokenValue != tokenToSend) {
      this.accessTokenValue = tokenToSend;
      this.channels.forEach((channel) => {
        const payload = {
          access_token: tokenToSend,
          version: DEFAULT_VERSION
        };
        tokenToSend && channel.updateJoinPayload(payload);
        if (channel.joinedOnce && channel.channelAdapter.isJoined()) {
          channel.channelAdapter.push(CHANNEL_EVENTS.access_token, {
            access_token: tokenToSend
          });
        }
      });
    }
  }
  async _waitForAuthIfNeeded() {
    if (this._authPromise) {
      await this._authPromise;
    }
  }
  _setAuthSafely(context = "general") {
    if (!this._isManualToken()) {
      this.setAuth().catch((e) => {
        this.log("error", `Error setting auth in ${context}`, e);
      });
    }
  }
  _setupConnectionHandlers() {
    this.socketAdapter.onOpen(() => {
      const authPromise = this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve());
      authPromise.catch((e) => {
        this.log("error", "error waiting for auth on connect", e);
      });
      if (this.worker && !this.workerRef) {
        this._startWorkerHeartbeat();
      }
    });
    this.socketAdapter.onClose(() => {
      if (this.worker && this.workerRef) {
        this._terminateWorker();
      }
    });
    this.socketAdapter.onMessage((message) => {
      if (message.ref && message.ref === this._pendingWorkerHeartbeatRef) {
        this._pendingWorkerHeartbeatRef = null;
      }
    });
  }
  _handleNodeJsRaceCondition() {
    if (this.socketAdapter.isConnected()) {
      this.socketAdapter.getSocket().onConnOpen();
    }
  }
  _wrapHeartbeatCallback(heartbeatCallback) {
    return (status, latency) => {
      if (status == "sent")
        this._setAuthSafely();
      if (heartbeatCallback)
        heartbeatCallback(status, latency);
    };
  }
  _startWorkerHeartbeat() {
    if (this.workerUrl) {
      this.log("worker", `starting worker for from ${this.workerUrl}`);
    } else {
      this.log("worker", `starting default worker`);
    }
    const objectUrl = this._workerObjectUrl(this.workerUrl);
    this.workerRef = new Worker(objectUrl);
    this.workerRef.onerror = (error) => {
      this.log("worker", "worker error", error.message);
      this._terminateWorker();
      this.disconnect();
    };
    this.workerRef.onmessage = (event) => {
      if (event.data.event === "keepAlive") {
        this.sendHeartbeat();
      }
    };
    this.workerRef.postMessage({
      event: "start",
      interval: this.heartbeatIntervalMs
    });
  }
  _terminateWorker() {
    if (this.workerRef) {
      this.log("worker", "terminating worker");
      this.workerRef.terminate();
      this.workerRef = undefined;
    }
  }
  _workerObjectUrl(url) {
    let result_url;
    if (url) {
      result_url = url;
    } else {
      const blob = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
      result_url = URL.createObjectURL(blob);
    }
    return result_url;
  }
  _initializeOptions(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    this.worker = (_a = options === null || options === undefined ? undefined : options.worker) !== null && _a !== undefined ? _a : false;
    this.accessToken = (_b = options === null || options === undefined ? undefined : options.accessToken) !== null && _b !== undefined ? _b : null;
    const result = {};
    result.timeout = (_c = options === null || options === undefined ? undefined : options.timeout) !== null && _c !== undefined ? _c : DEFAULT_TIMEOUT;
    result.heartbeatIntervalMs = (_d = options === null || options === undefined ? undefined : options.heartbeatIntervalMs) !== null && _d !== undefined ? _d : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
    this._disconnectOnEmptyChannelsAfterMs = (_e = options === null || options === undefined ? undefined : options.disconnectOnEmptyChannelsAfterMs) !== null && _e !== undefined ? _e : 2 * ((_f = options === null || options === undefined ? undefined : options.heartbeatIntervalMs) !== null && _f !== undefined ? _f : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL);
    result.transport = (_g = options === null || options === undefined ? undefined : options.transport) !== null && _g !== undefined ? _g : websocket_factory_default.getWebSocketConstructor();
    result.params = options === null || options === undefined ? undefined : options.params;
    result.logger = options === null || options === undefined ? undefined : options.logger;
    result.heartbeatCallback = this._wrapHeartbeatCallback(options === null || options === undefined ? undefined : options.heartbeatCallback);
    result.sessionStorage = (_h = options === null || options === undefined ? undefined : options.sessionStorage) !== null && _h !== undefined ? _h : resolveSessionStorage();
    result.reconnectAfterMs = (_j = options === null || options === undefined ? undefined : options.reconnectAfterMs) !== null && _j !== undefined ? _j : (tries) => {
      return RECONNECT_INTERVALS[tries - 1] || DEFAULT_RECONNECT_FALLBACK;
    };
    let defaultEncode;
    let defaultDecode;
    const vsn = (_k = options === null || options === undefined ? undefined : options.vsn) !== null && _k !== undefined ? _k : DEFAULT_VSN;
    switch (vsn) {
      case VSN_1_0_0:
        defaultEncode = (payload, callback) => {
          return callback(JSON.stringify(payload));
        };
        defaultDecode = (payload, callback) => {
          return callback(JSON.parse(payload));
        };
        break;
      case VSN_2_0_0:
        defaultEncode = this.serializer.encode.bind(this.serializer);
        defaultDecode = this.serializer.decode.bind(this.serializer);
        break;
      default:
        throw new Error(`Unsupported serializer version: ${result.vsn}`);
    }
    result.vsn = vsn;
    result.encode = (_l = options === null || options === undefined ? undefined : options.encode) !== null && _l !== undefined ? _l : defaultEncode;
    result.decode = (_m = options === null || options === undefined ? undefined : options.decode) !== null && _m !== undefined ? _m : defaultDecode;
    result.beforeReconnect = this._reconnectAuth.bind(this);
    if ((options === null || options === undefined ? undefined : options.logLevel) || (options === null || options === undefined ? undefined : options.log_level)) {
      this.logLevel = options.logLevel || options.log_level;
      result.params = Object.assign(Object.assign({}, result.params), { log_level: this.logLevel });
    }
    if (this.worker) {
      if (typeof window !== "undefined" && !window.Worker) {
        throw new Error("Web Worker is not supported");
      }
      this.workerUrl = options === null || options === undefined ? undefined : options.workerUrl;
      result.autoSendHeartbeat = !this.worker;
    }
    return result;
  }
  async _reconnectAuth() {
    await this._waitForAuthIfNeeded();
    if (!this.isConnected()) {
      this.connect();
    }
  }
}

// node_modules/iceberg-js/dist/index.mjs
var IcebergError = class extends Error {
  constructor(message, opts) {
    super(message);
    this.name = "IcebergError";
    this.status = opts.status;
    this.icebergType = opts.icebergType;
    this.icebergCode = opts.icebergCode;
    this.details = opts.details;
    this.isCommitStateUnknown = opts.icebergType === "CommitStateUnknownException" || [500, 502, 504].includes(opts.status) && opts.icebergType?.includes("CommitState") === true;
  }
  isNotFound() {
    return this.status === 404;
  }
  isConflict() {
    return this.status === 409;
  }
  isAuthenticationTimeout() {
    return this.status === 419;
  }
};
function buildUrl(baseUrl, path, query) {
  const url = new URL(path, baseUrl);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    }
  }
  return url.toString();
}
async function buildAuthHeaders(auth) {
  if (!auth || auth.type === "none") {
    return {};
  }
  if (auth.type === "bearer") {
    return { Authorization: `Bearer ${auth.token}` };
  }
  if (auth.type === "header") {
    return { [auth.name]: auth.value };
  }
  if (auth.type === "custom") {
    return await auth.getHeaders();
  }
  return {};
}
function createFetchClient(options) {
  const fetchFn = options.fetchImpl ?? globalThis.fetch;
  return {
    async request({
      method,
      path,
      query,
      body,
      headers
    }) {
      const url = buildUrl(options.baseUrl, path, query);
      const authHeaders = await buildAuthHeaders(options.auth);
      const res = await fetchFn(url, {
        method,
        headers: {
          ...body ? { "Content-Type": "application/json" } : {},
          ...authHeaders,
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined
      });
      const text = await res.text();
      const isJson = (res.headers.get("content-type") || "").includes("application/json");
      const data = isJson && text ? JSON.parse(text) : text;
      if (!res.ok) {
        const errBody = isJson ? data : undefined;
        const errorDetail = errBody?.error;
        throw new IcebergError(errorDetail?.message ?? `Request failed with status ${res.status}`, {
          status: res.status,
          icebergType: errorDetail?.type,
          icebergCode: errorDetail?.code,
          details: errBody
        });
      }
      return { status: res.status, headers: res.headers, data };
    }
  };
}
function namespaceToPath(namespace) {
  return namespace.join("\x1F");
}
var NamespaceOperations = class {
  constructor(client, prefix = "") {
    this.client = client;
    this.prefix = prefix;
  }
  async listNamespaces(parent) {
    const query = parent ? { parent: namespaceToPath(parent.namespace) } : undefined;
    const response = await this.client.request({
      method: "GET",
      path: `${this.prefix}/namespaces`,
      query
    });
    return response.data.namespaces.map((ns) => ({ namespace: ns }));
  }
  async createNamespace(id, metadata) {
    const request = {
      namespace: id.namespace,
      properties: metadata?.properties
    };
    const response = await this.client.request({
      method: "POST",
      path: `${this.prefix}/namespaces`,
      body: request
    });
    return response.data;
  }
  async dropNamespace(id) {
    await this.client.request({
      method: "DELETE",
      path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
    });
  }
  async loadNamespaceMetadata(id) {
    const response = await this.client.request({
      method: "GET",
      path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
    });
    return {
      properties: response.data.properties
    };
  }
  async namespaceExists(id) {
    try {
      await this.client.request({
        method: "HEAD",
        path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
      });
      return true;
    } catch (error) {
      if (error instanceof IcebergError && error.status === 404) {
        return false;
      }
      throw error;
    }
  }
  async createNamespaceIfNotExists(id, metadata) {
    try {
      return await this.createNamespace(id, metadata);
    } catch (error) {
      if (error instanceof IcebergError && error.status === 409) {
        return;
      }
      throw error;
    }
  }
};
function namespaceToPath2(namespace) {
  return namespace.join("\x1F");
}
var TableOperations = class {
  constructor(client, prefix = "", accessDelegation) {
    this.client = client;
    this.prefix = prefix;
    this.accessDelegation = accessDelegation;
  }
  async listTables(namespace) {
    const response = await this.client.request({
      method: "GET",
      path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`
    });
    return response.data.identifiers;
  }
  async createTable(namespace, request) {
    const headers = {};
    if (this.accessDelegation) {
      headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
    }
    const response = await this.client.request({
      method: "POST",
      path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`,
      body: request,
      headers
    });
    return response.data.metadata;
  }
  async updateTable(id, request) {
    const response = await this.client.request({
      method: "POST",
      path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
      body: request
    });
    return {
      "metadata-location": response.data["metadata-location"],
      metadata: response.data.metadata
    };
  }
  async dropTable(id, options) {
    await this.client.request({
      method: "DELETE",
      path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
      query: { purgeRequested: String(options?.purge ?? false) }
    });
  }
  async loadTable(id) {
    const headers = {};
    if (this.accessDelegation) {
      headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
    }
    const response = await this.client.request({
      method: "GET",
      path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
      headers
    });
    return response.data.metadata;
  }
  async tableExists(id) {
    const headers = {};
    if (this.accessDelegation) {
      headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
    }
    try {
      await this.client.request({
        method: "HEAD",
        path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
        headers
      });
      return true;
    } catch (error) {
      if (error instanceof IcebergError && error.status === 404) {
        return false;
      }
      throw error;
    }
  }
  async createTableIfNotExists(namespace, request) {
    try {
      return await this.createTable(namespace, request);
    } catch (error) {
      if (error instanceof IcebergError && error.status === 409) {
        return await this.loadTable({ namespace: namespace.namespace, name: request.name });
      }
      throw error;
    }
  }
};
var IcebergRestCatalog = class {
  constructor(options) {
    let prefix = "v1";
    if (options.catalogName) {
      prefix += `/${options.catalogName}`;
    }
    const baseUrl = options.baseUrl.endsWith("/") ? options.baseUrl : `${options.baseUrl}/`;
    this.client = createFetchClient({
      baseUrl,
      auth: options.auth,
      fetchImpl: options.fetch
    });
    this.accessDelegation = options.accessDelegation?.join(",");
    this.namespaceOps = new NamespaceOperations(this.client, prefix);
    this.tableOps = new TableOperations(this.client, prefix, this.accessDelegation);
  }
  async listNamespaces(parent) {
    return this.namespaceOps.listNamespaces(parent);
  }
  async createNamespace(id, metadata) {
    return this.namespaceOps.createNamespace(id, metadata);
  }
  async dropNamespace(id) {
    await this.namespaceOps.dropNamespace(id);
  }
  async loadNamespaceMetadata(id) {
    return this.namespaceOps.loadNamespaceMetadata(id);
  }
  async listTables(namespace) {
    return this.tableOps.listTables(namespace);
  }
  async createTable(namespace, request) {
    return this.tableOps.createTable(namespace, request);
  }
  async updateTable(id, request) {
    return this.tableOps.updateTable(id, request);
  }
  async dropTable(id, options) {
    await this.tableOps.dropTable(id, options);
  }
  async loadTable(id) {
    return this.tableOps.loadTable(id);
  }
  async namespaceExists(id) {
    return this.namespaceOps.namespaceExists(id);
  }
  async tableExists(id) {
    return this.tableOps.tableExists(id);
  }
  async createNamespaceIfNotExists(id, metadata) {
    return this.namespaceOps.createNamespaceIfNotExists(id, metadata);
  }
  async createTableIfNotExists(namespace, request) {
    return this.tableOps.createTableIfNotExists(namespace, request);
  }
};

// node_modules/@supabase/storage-js/dist/index.mjs
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o$1) {
    return typeof o$1;
  } : function(o$1) {
    return o$1 && typeof Symbol == "function" && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
  }, _typeof2(o);
}
function toPrimitive2(t, r) {
  if (_typeof2(t) != "object" || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (e !== undefined) {
    var i = e.call(t, r || "default");
    if (_typeof2(i) != "object")
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function toPropertyKey2(t) {
  var i = toPrimitive2(t, "string");
  return _typeof2(i) == "symbol" ? i : i + "";
}
function _defineProperty2(e, r, t) {
  return (r = toPropertyKey2(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r$1) {
      return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread22(e) {
  for (var r = 1;r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys2(Object(t), true).forEach(function(r$1) {
      _defineProperty2(e, r$1, t[r$1]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r$1) {
      Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
    });
  }
  return e;
}
var StorageError = class extends Error {
  constructor(message, namespace = "storage", status, statusCode) {
    super(message);
    this.__isStorageError = true;
    this.namespace = namespace;
    this.name = namespace === "vectors" ? "StorageVectorsError" : "StorageError";
    this.status = status;
    this.statusCode = statusCode;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
};
function isStorageError(error) {
  return typeof error === "object" && error !== null && "__isStorageError" in error;
}
var StorageApiError = class extends StorageError {
  constructor(message, status, statusCode, namespace = "storage") {
    super(message, namespace, status, statusCode);
    this.name = namespace === "vectors" ? "StorageVectorsApiError" : "StorageApiError";
    this.status = status;
    this.statusCode = statusCode;
  }
  toJSON() {
    return _objectSpread22({}, super.toJSON());
  }
};
var StorageUnknownError = class extends StorageError {
  constructor(message, originalError, namespace = "storage") {
    super(message, namespace);
    this.name = namespace === "vectors" ? "StorageVectorsUnknownError" : "StorageUnknownError";
    this.originalError = originalError;
  }
};
function setHeader(headers, name, value) {
  const result = _objectSpread22({}, headers);
  const nameLower = name.toLowerCase();
  for (const key of Object.keys(result))
    if (key.toLowerCase() === nameLower)
      delete result[key];
  result[nameLower] = value;
  return result;
}
function normalizeHeaders(headers) {
  const result = {};
  for (const [key, value] of Object.entries(headers))
    result[key.toLowerCase()] = value;
  return result;
}
var resolveFetch2 = (customFetch) => {
  if (customFetch)
    return (...args) => customFetch(...args);
  return (...args) => fetch(...args);
};
var isPlainObject = (value) => {
  if (typeof value !== "object" || value === null)
    return false;
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
var recursiveToCamel = (item) => {
  if (Array.isArray(item))
    return item.map((el) => recursiveToCamel(el));
  else if (typeof item === "function" || item !== Object(item))
    return item;
  const result = {};
  Object.entries(item).forEach(([key, value]) => {
    const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ""));
    result[newKey] = recursiveToCamel(value);
  });
  return result;
};
var isValidBucketName = (bucketName) => {
  if (!bucketName || typeof bucketName !== "string")
    return false;
  if (bucketName.length === 0 || bucketName.length > 100)
    return false;
  if (bucketName.trim() !== bucketName)
    return false;
  if (bucketName.includes("/") || bucketName.includes("\\"))
    return false;
  return /^[\w!.\*'() &$@=;:+,?-]+$/.test(bucketName);
};
var _getErrorMessage = (err) => {
  if (typeof err === "object" && err !== null) {
    const e = err;
    if (typeof e.msg === "string")
      return e.msg;
    if (typeof e.message === "string")
      return e.message;
    if (typeof e.error_description === "string")
      return e.error_description;
    if (typeof e.error === "string")
      return e.error;
    if (typeof e.error === "object" && e.error !== null) {
      const nested = e.error;
      if (typeof nested.message === "string")
        return nested.message;
    }
  }
  return JSON.stringify(err);
};
var handleError = async (error, reject, options, namespace) => {
  if (error !== null && typeof error === "object" && "json" in error && typeof error.json === "function") {
    const responseError = error;
    let status = parseInt(String(responseError.status), 10);
    if (!Number.isFinite(status))
      status = 500;
    responseError.json().then((err) => {
      const statusCode = (err === null || err === undefined ? undefined : err.statusCode) || (err === null || err === undefined ? undefined : err.code) || status + "";
      reject(new StorageApiError(_getErrorMessage(err), status, statusCode, namespace));
    }).catch(() => {
      const statusCode = status + "";
      reject(new StorageApiError(responseError.statusText || `HTTP ${status} error`, status, statusCode, namespace));
    });
  } else
    reject(new StorageUnknownError(_getErrorMessage(error), error, namespace));
};
var _getRequestParams = (method, options, parameters, body) => {
  const params = {
    method,
    headers: (options === null || options === undefined ? undefined : options.headers) || {}
  };
  if (method === "GET" || method === "HEAD" || !body)
    return _objectSpread22(_objectSpread22({}, params), parameters);
  if (isPlainObject(body)) {
    var _contentType;
    const headers = (options === null || options === undefined ? undefined : options.headers) || {};
    let contentType;
    for (const [key, value] of Object.entries(headers))
      if (key.toLowerCase() === "content-type")
        contentType = value;
    params.headers = setHeader(headers, "Content-Type", (_contentType = contentType) !== null && _contentType !== undefined ? _contentType : "application/json");
    params.body = JSON.stringify(body);
  } else
    params.body = body;
  if (options === null || options === undefined ? undefined : options.duplex)
    params.duplex = options.duplex;
  return _objectSpread22(_objectSpread22({}, params), parameters);
};
async function _handleRequest(fetcher, method, url, options, parameters, body, namespace) {
  return new Promise((resolve, reject) => {
    fetcher(url, _getRequestParams(method, options, parameters, body)).then((result) => {
      if (!result.ok)
        throw result;
      if (options === null || options === undefined ? undefined : options.noResolveJson)
        return result;
      if (namespace === "vectors") {
        const contentType = result.headers.get("content-type");
        if (result.headers.get("content-length") === "0" || result.status === 204)
          return {};
        if (!contentType || !contentType.includes("application/json"))
          return {};
      }
      return result.json();
    }).then((data) => resolve(data)).catch((error) => handleError(error, reject, options, namespace));
  });
}
function createFetchApi(namespace = "storage") {
  return {
    get: async (fetcher, url, options, parameters) => {
      return _handleRequest(fetcher, "GET", url, options, parameters, undefined, namespace);
    },
    post: async (fetcher, url, body, options, parameters) => {
      return _handleRequest(fetcher, "POST", url, options, parameters, body, namespace);
    },
    put: async (fetcher, url, body, options, parameters) => {
      return _handleRequest(fetcher, "PUT", url, options, parameters, body, namespace);
    },
    head: async (fetcher, url, options, parameters) => {
      return _handleRequest(fetcher, "HEAD", url, _objectSpread22(_objectSpread22({}, options), {}, { noResolveJson: true }), parameters, undefined, namespace);
    },
    remove: async (fetcher, url, body, options, parameters) => {
      return _handleRequest(fetcher, "DELETE", url, options, parameters, body, namespace);
    }
  };
}
var defaultApi = createFetchApi("storage");
var { get, post, put, head, remove } = defaultApi;
var vectorsApi = createFetchApi("vectors");
var BaseApiClient = class {
  constructor(url, headers = {}, fetch$1, namespace = "storage") {
    this.shouldThrowOnError = false;
    this.url = url;
    this.headers = normalizeHeaders(headers);
    this.fetch = resolveFetch2(fetch$1);
    this.namespace = namespace;
  }
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  setHeader(name, value) {
    this.headers = setHeader(this.headers, name, value);
    return this;
  }
  async handleOperation(operation) {
    var _this = this;
    try {
      return {
        data: await operation(),
        error: null
      };
    } catch (error) {
      if (_this.shouldThrowOnError)
        throw error;
      if (isStorageError(error))
        return {
          data: null,
          error
        };
      throw error;
    }
  }
};
var _Symbol$toStringTag$1;
_Symbol$toStringTag$1 = Symbol.toStringTag;
var StreamDownloadBuilder = class {
  constructor(downloadFn, shouldThrowOnError) {
    this.downloadFn = downloadFn;
    this.shouldThrowOnError = shouldThrowOnError;
    this[_Symbol$toStringTag$1] = "StreamDownloadBuilder";
    this.promise = null;
  }
  then(onfulfilled, onrejected) {
    return this.getPromise().then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.getPromise().catch(onrejected);
  }
  finally(onfinally) {
    return this.getPromise().finally(onfinally);
  }
  getPromise() {
    if (!this.promise)
      this.promise = this.execute();
    return this.promise;
  }
  async execute() {
    var _this = this;
    try {
      return {
        data: (await _this.downloadFn()).body,
        error: null
      };
    } catch (error) {
      if (_this.shouldThrowOnError)
        throw error;
      if (isStorageError(error))
        return {
          data: null,
          error
        };
      throw error;
    }
  }
};
var _Symbol$toStringTag;
_Symbol$toStringTag = Symbol.toStringTag;
var BlobDownloadBuilder = class {
  constructor(downloadFn, shouldThrowOnError) {
    this.downloadFn = downloadFn;
    this.shouldThrowOnError = shouldThrowOnError;
    this[_Symbol$toStringTag] = "BlobDownloadBuilder";
    this.promise = null;
  }
  asStream() {
    return new StreamDownloadBuilder(this.downloadFn, this.shouldThrowOnError);
  }
  then(onfulfilled, onrejected) {
    return this.getPromise().then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.getPromise().catch(onrejected);
  }
  finally(onfinally) {
    return this.getPromise().finally(onfinally);
  }
  getPromise() {
    if (!this.promise)
      this.promise = this.execute();
    return this.promise;
  }
  async execute() {
    var _this = this;
    try {
      return {
        data: await (await _this.downloadFn()).blob(),
        error: null
      };
    } catch (error) {
      if (_this.shouldThrowOnError)
        throw error;
      if (isStorageError(error))
        return {
          data: null,
          error
        };
      throw error;
    }
  }
};
var DEFAULT_SEARCH_OPTIONS = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
};
var DEFAULT_FILE_OPTIONS = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: false
};
var StorageFileApi = class extends BaseApiClient {
  constructor(url, headers = {}, bucketId, fetch$1) {
    super(url, headers, fetch$1, "storage");
    this.bucketId = bucketId;
  }
  async uploadOrUpdate(method, path, fileBody, fileOptions) {
    var _this = this;
    return _this.handleOperation(async () => {
      let body;
      const options = _objectSpread22(_objectSpread22({}, DEFAULT_FILE_OPTIONS), fileOptions);
      let headers = _objectSpread22(_objectSpread22({}, _this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
      const metadata = options.metadata;
      if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
        body = new FormData;
        body.append("cacheControl", options.cacheControl);
        if (metadata)
          body.append("metadata", _this.encodeMetadata(metadata));
        body.append("", fileBody);
      } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
        body = fileBody;
        if (!body.has("cacheControl"))
          body.append("cacheControl", options.cacheControl);
        if (metadata && !body.has("metadata"))
          body.append("metadata", _this.encodeMetadata(metadata));
      } else {
        body = fileBody;
        headers["cache-control"] = `max-age=${options.cacheControl}`;
        headers["content-type"] = options.contentType;
        if (metadata)
          headers["x-metadata"] = _this.toBase64(_this.encodeMetadata(metadata));
        if ((typeof ReadableStream !== "undefined" && body instanceof ReadableStream || body && typeof body === "object" && ("pipe" in body) && typeof body.pipe === "function") && !options.duplex)
          options.duplex = "half";
      }
      if (fileOptions === null || fileOptions === undefined ? undefined : fileOptions.headers)
        for (const [key, value] of Object.entries(fileOptions.headers))
          headers = setHeader(headers, key, value);
      const cleanPath = _this._removeEmptyFolders(path);
      const _path = _this._getFinalPath(cleanPath);
      const data = await (method == "PUT" ? put : post)(_this.fetch, `${_this.url}/object/${_path}`, body, _objectSpread22({ headers }, (options === null || options === undefined ? undefined : options.duplex) ? { duplex: options.duplex } : {}));
      return {
        path: cleanPath,
        id: data.Id,
        fullPath: data.Key
      };
    });
  }
  async upload(path, fileBody, fileOptions) {
    return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
  }
  async uploadToSignedUrl(path, token, fileBody, fileOptions) {
    var _this3 = this;
    const cleanPath = _this3._removeEmptyFolders(path);
    const _path = _this3._getFinalPath(cleanPath);
    const url = new URL(_this3.url + `/object/upload/sign/${_path}`);
    url.searchParams.set("token", token);
    return _this3.handleOperation(async () => {
      let body;
      const options = _objectSpread22(_objectSpread22({}, DEFAULT_FILE_OPTIONS), fileOptions);
      let headers = _objectSpread22(_objectSpread22({}, _this3.headers), { "x-upsert": String(options.upsert) });
      const metadata = options.metadata;
      if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
        body = new FormData;
        body.append("cacheControl", options.cacheControl);
        if (metadata)
          body.append("metadata", _this3.encodeMetadata(metadata));
        body.append("", fileBody);
      } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
        body = fileBody;
        if (!body.has("cacheControl"))
          body.append("cacheControl", options.cacheControl);
        if (metadata && !body.has("metadata"))
          body.append("metadata", _this3.encodeMetadata(metadata));
      } else {
        body = fileBody;
        headers["cache-control"] = `max-age=${options.cacheControl}`;
        headers["content-type"] = options.contentType;
        if (metadata)
          headers["x-metadata"] = _this3.toBase64(_this3.encodeMetadata(metadata));
        if ((typeof ReadableStream !== "undefined" && body instanceof ReadableStream || body && typeof body === "object" && ("pipe" in body) && typeof body.pipe === "function") && !options.duplex)
          options.duplex = "half";
      }
      if (fileOptions === null || fileOptions === undefined ? undefined : fileOptions.headers)
        for (const [key, value] of Object.entries(fileOptions.headers))
          headers = setHeader(headers, key, value);
      return {
        path: cleanPath,
        fullPath: (await put(_this3.fetch, url.toString(), body, _objectSpread22({ headers }, (options === null || options === undefined ? undefined : options.duplex) ? { duplex: options.duplex } : {}))).Key
      };
    });
  }
  async createSignedUploadUrl(path, options) {
    var _this4 = this;
    return _this4.handleOperation(async () => {
      let _path = _this4._getFinalPath(path);
      const headers = _objectSpread22({}, _this4.headers);
      if (options === null || options === undefined ? undefined : options.upsert)
        headers["x-upsert"] = "true";
      const data = await post(_this4.fetch, `${_this4.url}/object/upload/sign/${_path}`, {}, { headers });
      const url = new URL(_this4.url + data.url);
      const token = url.searchParams.get("token");
      if (!token)
        throw new StorageError("No token returned by API");
      return {
        signedUrl: url.toString(),
        path,
        token
      };
    });
  }
  async update(path, fileBody, fileOptions) {
    return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
  }
  async move(fromPath, toPath, options) {
    var _this6 = this;
    return _this6.handleOperation(async () => {
      return await post(_this6.fetch, `${_this6.url}/object/move`, {
        bucketId: _this6.bucketId,
        sourceKey: fromPath,
        destinationKey: toPath,
        destinationBucket: options === null || options === undefined ? undefined : options.destinationBucket
      }, { headers: _this6.headers });
    });
  }
  async copy(fromPath, toPath, options) {
    var _this7 = this;
    return _this7.handleOperation(async () => {
      return { path: (await post(_this7.fetch, `${_this7.url}/object/copy`, {
        bucketId: _this7.bucketId,
        sourceKey: fromPath,
        destinationKey: toPath,
        destinationBucket: options === null || options === undefined ? undefined : options.destinationBucket
      }, { headers: _this7.headers })).Key };
    });
  }
  async createSignedUrl(path, expiresIn, options) {
    var _this8 = this;
    return _this8.handleOperation(async () => {
      let _path = _this8._getFinalPath(path);
      const hasTransform = typeof (options === null || options === undefined ? undefined : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0;
      let data = await post(_this8.fetch, `${_this8.url}/object/sign/${_path}`, _objectSpread22({ expiresIn }, hasTransform ? { transform: options.transform } : {}), { headers: _this8.headers });
      const query = new URLSearchParams;
      if (options === null || options === undefined ? undefined : options.download)
        query.set("download", options.download === true ? "" : options.download);
      if ((options === null || options === undefined ? undefined : options.cacheNonce) != null)
        query.set("cacheNonce", String(options.cacheNonce));
      const queryString = query.toString();
      return { signedUrl: encodeURI(`${_this8.url}${data.signedURL}${queryString ? `&${queryString}` : ""}`) };
    });
  }
  async createSignedUrls(paths, expiresIn, options) {
    var _this9 = this;
    return _this9.handleOperation(async () => {
      const data = await post(_this9.fetch, `${_this9.url}/object/sign/${_this9.bucketId}`, {
        expiresIn,
        paths
      }, { headers: _this9.headers });
      const query = new URLSearchParams;
      if (options === null || options === undefined ? undefined : options.download)
        query.set("download", options.download === true ? "" : options.download);
      if ((options === null || options === undefined ? undefined : options.cacheNonce) != null)
        query.set("cacheNonce", String(options.cacheNonce));
      const queryString = query.toString();
      return data.map((datum) => _objectSpread22(_objectSpread22({}, datum), {}, { signedUrl: datum.signedURL ? encodeURI(`${_this9.url}${datum.signedURL}${queryString ? `&${queryString}` : ""}`) : null }));
    });
  }
  download(path, options, parameters) {
    const renderPath = typeof (options === null || options === undefined ? undefined : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0 ? "render/image/authenticated" : "object";
    const query = new URLSearchParams;
    if (options === null || options === undefined ? undefined : options.transform)
      this.applyTransformOptsToQuery(query, options.transform);
    if ((options === null || options === undefined ? undefined : options.cacheNonce) != null)
      query.set("cacheNonce", String(options.cacheNonce));
    const queryString = query.toString();
    const _path = this._getFinalPath(path);
    const downloadFn = () => get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString ? `?${queryString}` : ""}`, {
      headers: this.headers,
      noResolveJson: true
    }, parameters);
    return new BlobDownloadBuilder(downloadFn, this.shouldThrowOnError);
  }
  async info(path) {
    var _this10 = this;
    const _path = _this10._getFinalPath(path);
    return _this10.handleOperation(async () => {
      return recursiveToCamel(await get(_this10.fetch, `${_this10.url}/object/info/${_path}`, { headers: _this10.headers }));
    });
  }
  async exists(path) {
    var _this11 = this;
    const _path = _this11._getFinalPath(path);
    try {
      await head(_this11.fetch, `${_this11.url}/object/${_path}`, { headers: _this11.headers });
      return {
        data: true,
        error: null
      };
    } catch (error) {
      if (_this11.shouldThrowOnError)
        throw error;
      if (isStorageError(error)) {
        var _error$originalError;
        const status = error instanceof StorageApiError ? error.status : error instanceof StorageUnknownError ? (_error$originalError = error.originalError) === null || _error$originalError === undefined ? undefined : _error$originalError.status : undefined;
        if (status !== undefined && [400, 404].includes(status))
          return {
            data: false,
            error
          };
      }
      throw error;
    }
  }
  getPublicUrl(path, options) {
    const _path = this._getFinalPath(path);
    const query = new URLSearchParams;
    if (options === null || options === undefined ? undefined : options.download)
      query.set("download", options.download === true ? "" : options.download);
    if (options === null || options === undefined ? undefined : options.transform)
      this.applyTransformOptsToQuery(query, options.transform);
    if ((options === null || options === undefined ? undefined : options.cacheNonce) != null)
      query.set("cacheNonce", String(options.cacheNonce));
    const queryString = query.toString();
    const renderPath = typeof (options === null || options === undefined ? undefined : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0 ? "render/image" : "object";
    return { data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}`) + (queryString ? `?${queryString}` : "") } };
  }
  async remove(paths) {
    var _this12 = this;
    return _this12.handleOperation(async () => {
      return await remove(_this12.fetch, `${_this12.url}/object/${_this12.bucketId}`, { prefixes: paths }, { headers: _this12.headers });
    });
  }
  async list(path, options, parameters) {
    var _this13 = this;
    return _this13.handleOperation(async () => {
      const body = _objectSpread22(_objectSpread22(_objectSpread22({}, DEFAULT_SEARCH_OPTIONS), options), {}, { prefix: path || "" });
      return await post(_this13.fetch, `${_this13.url}/object/list/${_this13.bucketId}`, body, { headers: _this13.headers }, parameters);
    });
  }
  async listV2(options, parameters) {
    var _this14 = this;
    return _this14.handleOperation(async () => {
      const body = _objectSpread22({}, options);
      return await post(_this14.fetch, `${_this14.url}/object/list-v2/${_this14.bucketId}`, body, { headers: _this14.headers }, parameters);
    });
  }
  encodeMetadata(metadata) {
    return JSON.stringify(metadata);
  }
  toBase64(data) {
    if (typeof Buffer !== "undefined")
      return Buffer.from(data).toString("base64");
    return btoa(data);
  }
  _getFinalPath(path) {
    return `${this.bucketId}/${path.replace(/^\/+/, "")}`;
  }
  _removeEmptyFolders(path) {
    return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  applyTransformOptsToQuery(query, transform) {
    if (transform.width)
      query.set("width", transform.width.toString());
    if (transform.height)
      query.set("height", transform.height.toString());
    if (transform.resize)
      query.set("resize", transform.resize);
    if (transform.format)
      query.set("format", transform.format);
    if (transform.quality)
      query.set("quality", transform.quality.toString());
    return query;
  }
};
var version2 = "2.108.2";
var DEFAULT_HEADERS = { "X-Client-Info": `storage-js/${version2}` };
var StorageBucketApi = class extends BaseApiClient {
  constructor(url, headers = {}, fetch$1, opts) {
    const baseUrl = new URL(url);
    if (opts === null || opts === undefined ? undefined : opts.useNewHostname) {
      if (/supabase\.(co|in|red)$/.test(baseUrl.hostname) && !baseUrl.hostname.includes("storage.supabase."))
        baseUrl.hostname = baseUrl.hostname.replace("supabase.", "storage.supabase.");
    }
    const finalUrl = baseUrl.href.replace(/\/$/, "");
    const finalHeaders = _objectSpread22(_objectSpread22({}, DEFAULT_HEADERS), headers);
    super(finalUrl, finalHeaders, fetch$1, "storage");
  }
  async listBuckets(options) {
    var _this = this;
    return _this.handleOperation(async () => {
      const queryString = _this.listBucketOptionsToQueryString(options);
      return await get(_this.fetch, `${_this.url}/bucket${queryString}`, { headers: _this.headers });
    });
  }
  async getBucket(id) {
    var _this2 = this;
    return _this2.handleOperation(async () => {
      return await get(_this2.fetch, `${_this2.url}/bucket/${id}`, { headers: _this2.headers });
    });
  }
  async createBucket(id, options = { public: false }) {
    var _this3 = this;
    return _this3.handleOperation(async () => {
      return await post(_this3.fetch, `${_this3.url}/bucket`, {
        id,
        name: id,
        type: options.type,
        public: options.public,
        file_size_limit: options.fileSizeLimit,
        allowed_mime_types: options.allowedMimeTypes
      }, { headers: _this3.headers });
    });
  }
  async updateBucket(id, options) {
    var _this4 = this;
    return _this4.handleOperation(async () => {
      return await put(_this4.fetch, `${_this4.url}/bucket/${id}`, {
        id,
        name: id,
        public: options.public,
        file_size_limit: options.fileSizeLimit,
        allowed_mime_types: options.allowedMimeTypes
      }, { headers: _this4.headers });
    });
  }
  async emptyBucket(id) {
    var _this5 = this;
    return _this5.handleOperation(async () => {
      return await post(_this5.fetch, `${_this5.url}/bucket/${id}/empty`, {}, { headers: _this5.headers });
    });
  }
  async deleteBucket(id) {
    var _this6 = this;
    return _this6.handleOperation(async () => {
      return await remove(_this6.fetch, `${_this6.url}/bucket/${id}`, {}, { headers: _this6.headers });
    });
  }
  listBucketOptionsToQueryString(options) {
    const params = {};
    if (options) {
      if ("limit" in options)
        params.limit = String(options.limit);
      if ("offset" in options)
        params.offset = String(options.offset);
      if (options.search)
        params.search = options.search;
      if (options.sortColumn)
        params.sortColumn = options.sortColumn;
      if (options.sortOrder)
        params.sortOrder = options.sortOrder;
    }
    return Object.keys(params).length > 0 ? "?" + new URLSearchParams(params).toString() : "";
  }
};
var StorageAnalyticsClient = class extends BaseApiClient {
  constructor(url, headers = {}, fetch$1) {
    const finalUrl = url.replace(/\/$/, "");
    const finalHeaders = _objectSpread22(_objectSpread22({}, DEFAULT_HEADERS), headers);
    super(finalUrl, finalHeaders, fetch$1, "storage");
  }
  async createBucket(name) {
    var _this = this;
    return _this.handleOperation(async () => {
      return await post(_this.fetch, `${_this.url}/bucket`, { name }, { headers: _this.headers });
    });
  }
  async listBuckets(options) {
    var _this2 = this;
    return _this2.handleOperation(async () => {
      const queryParams = new URLSearchParams;
      if ((options === null || options === undefined ? undefined : options.limit) !== undefined)
        queryParams.set("limit", options.limit.toString());
      if ((options === null || options === undefined ? undefined : options.offset) !== undefined)
        queryParams.set("offset", options.offset.toString());
      if (options === null || options === undefined ? undefined : options.sortColumn)
        queryParams.set("sortColumn", options.sortColumn);
      if (options === null || options === undefined ? undefined : options.sortOrder)
        queryParams.set("sortOrder", options.sortOrder);
      if (options === null || options === undefined ? undefined : options.search)
        queryParams.set("search", options.search);
      const queryString = queryParams.toString();
      const url = queryString ? `${_this2.url}/bucket?${queryString}` : `${_this2.url}/bucket`;
      return await get(_this2.fetch, url, { headers: _this2.headers });
    });
  }
  async deleteBucket(bucketName) {
    var _this3 = this;
    return _this3.handleOperation(async () => {
      return await remove(_this3.fetch, `${_this3.url}/bucket/${bucketName}`, {}, { headers: _this3.headers });
    });
  }
  from(bucketName) {
    var _this4 = this;
    if (!isValidBucketName(bucketName))
      throw new StorageError("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
    const catalog = new IcebergRestCatalog({
      baseUrl: this.url,
      catalogName: bucketName,
      auth: {
        type: "custom",
        getHeaders: async () => _this4.headers
      },
      fetch: this.fetch
    });
    const shouldThrowOnError = this.shouldThrowOnError;
    return new Proxy(catalog, { get(target, prop) {
      const value = target[prop];
      if (typeof value !== "function")
        return value;
      return async (...args) => {
        try {
          return {
            data: await value.apply(target, args),
            error: null
          };
        } catch (error) {
          if (shouldThrowOnError)
            throw error;
          return {
            data: null,
            error
          };
        }
      };
    } });
  }
};
var VectorIndexApi = class extends BaseApiClient {
  constructor(url, headers = {}, fetch$1) {
    const finalUrl = url.replace(/\/$/, "");
    const finalHeaders = _objectSpread22(_objectSpread22({}, DEFAULT_HEADERS), {}, { "Content-Type": "application/json" }, headers);
    super(finalUrl, finalHeaders, fetch$1, "vectors");
  }
  async createIndex(options) {
    var _this = this;
    return _this.handleOperation(async () => {
      return await vectorsApi.post(_this.fetch, `${_this.url}/CreateIndex`, options, { headers: _this.headers }) || {};
    });
  }
  async getIndex(vectorBucketName, indexName) {
    var _this2 = this;
    return _this2.handleOperation(async () => {
      return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetIndex`, {
        vectorBucketName,
        indexName
      }, { headers: _this2.headers });
    });
  }
  async listIndexes(options) {
    var _this3 = this;
    return _this3.handleOperation(async () => {
      return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListIndexes`, options, { headers: _this3.headers });
    });
  }
  async deleteIndex(vectorBucketName, indexName) {
    var _this4 = this;
    return _this4.handleOperation(async () => {
      return await vectorsApi.post(_this4.fetch, `${_this4.url}/DeleteIndex`, {
        vectorBucketName,
        indexName
      }, { headers: _this4.headers }) || {};
    });
  }
};
var VectorDataApi = class extends BaseApiClient {
  constructor(url, headers = {}, fetch$1) {
    const finalUrl = url.replace(/\/$/, "");
    const finalHeaders = _objectSpread22(_objectSpread22({}, DEFAULT_HEADERS), {}, { "Content-Type": "application/json" }, headers);
    super(finalUrl, finalHeaders, fetch$1, "vectors");
  }
  async putVectors(options) {
    var _this = this;
    if (options.vectors.length < 1 || options.vectors.length > 500)
      throw new Error("Vector batch size must be between 1 and 500 items");
    return _this.handleOperation(async () => {
      return await vectorsApi.post(_this.fetch, `${_this.url}/PutVectors`, options, { headers: _this.headers }) || {};
    });
  }
  async getVectors(options) {
    var _this2 = this;
    return _this2.handleOperation(async () => {
      return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetVectors`, options, { headers: _this2.headers });
    });
  }
  async listVectors(options) {
    var _this3 = this;
    if (options.segmentCount !== undefined) {
      if (options.segmentCount < 1 || options.segmentCount > 16)
        throw new Error("segmentCount must be between 1 and 16");
      if (options.segmentIndex !== undefined) {
        if (options.segmentIndex < 0 || options.segmentIndex >= options.segmentCount)
          throw new Error(`segmentIndex must be between 0 and ${options.segmentCount - 1}`);
      }
    }
    return _this3.handleOperation(async () => {
      return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListVectors`, options, { headers: _this3.headers });
    });
  }
  async queryVectors(options) {
    var _this4 = this;
    return _this4.handleOperation(async () => {
      return await vectorsApi.post(_this4.fetch, `${_this4.url}/QueryVectors`, options, { headers: _this4.headers });
    });
  }
  async deleteVectors(options) {
    var _this5 = this;
    if (options.keys.length < 1 || options.keys.length > 500)
      throw new Error("Keys batch size must be between 1 and 500 items");
    return _this5.handleOperation(async () => {
      return await vectorsApi.post(_this5.fetch, `${_this5.url}/DeleteVectors`, options, { headers: _this5.headers }) || {};
    });
  }
};
var VectorBucketApi = class extends BaseApiClient {
  constructor(url, headers = {}, fetch$1) {
    const finalUrl = url.replace(/\/$/, "");
    const finalHeaders = _objectSpread22(_objectSpread22({}, DEFAULT_HEADERS), {}, { "Content-Type": "application/json" }, headers);
    super(finalUrl, finalHeaders, fetch$1, "vectors");
  }
  async createBucket(vectorBucketName) {
    var _this = this;
    return _this.handleOperation(async () => {
      return await vectorsApi.post(_this.fetch, `${_this.url}/CreateVectorBucket`, { vectorBucketName }, { headers: _this.headers }) || {};
    });
  }
  async getBucket(vectorBucketName) {
    var _this2 = this;
    return _this2.handleOperation(async () => {
      return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetVectorBucket`, { vectorBucketName }, { headers: _this2.headers });
    });
  }
  async listBuckets(options = {}) {
    var _this3 = this;
    return _this3.handleOperation(async () => {
      return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListVectorBuckets`, options, { headers: _this3.headers });
    });
  }
  async deleteBucket(vectorBucketName) {
    var _this4 = this;
    return _this4.handleOperation(async () => {
      return await vectorsApi.post(_this4.fetch, `${_this4.url}/DeleteVectorBucket`, { vectorBucketName }, { headers: _this4.headers }) || {};
    });
  }
};
var StorageVectorsClient = class extends VectorBucketApi {
  constructor(url, options = {}) {
    super(url, options.headers || {}, options.fetch);
  }
  from(vectorBucketName) {
    return new VectorBucketScope(this.url, this.headers, vectorBucketName, this.fetch);
  }
  async createBucket(vectorBucketName) {
    var _superprop_getCreateBucket = () => super.createBucket, _this = this;
    return _superprop_getCreateBucket().call(_this, vectorBucketName);
  }
  async getBucket(vectorBucketName) {
    var _superprop_getGetBucket = () => super.getBucket, _this2 = this;
    return _superprop_getGetBucket().call(_this2, vectorBucketName);
  }
  async listBuckets(options = {}) {
    var _superprop_getListBuckets = () => super.listBuckets, _this3 = this;
    return _superprop_getListBuckets().call(_this3, options);
  }
  async deleteBucket(vectorBucketName) {
    var _superprop_getDeleteBucket = () => super.deleteBucket, _this4 = this;
    return _superprop_getDeleteBucket().call(_this4, vectorBucketName);
  }
};
var VectorBucketScope = class extends VectorIndexApi {
  constructor(url, headers, vectorBucketName, fetch$1) {
    super(url, headers, fetch$1);
    this.vectorBucketName = vectorBucketName;
  }
  async createIndex(options) {
    var _superprop_getCreateIndex = () => super.createIndex, _this5 = this;
    return _superprop_getCreateIndex().call(_this5, _objectSpread22(_objectSpread22({}, options), {}, { vectorBucketName: _this5.vectorBucketName }));
  }
  async listIndexes(options = {}) {
    var _superprop_getListIndexes = () => super.listIndexes, _this6 = this;
    return _superprop_getListIndexes().call(_this6, _objectSpread22(_objectSpread22({}, options), {}, { vectorBucketName: _this6.vectorBucketName }));
  }
  async getIndex(indexName) {
    var _superprop_getGetIndex = () => super.getIndex, _this7 = this;
    return _superprop_getGetIndex().call(_this7, _this7.vectorBucketName, indexName);
  }
  async deleteIndex(indexName) {
    var _superprop_getDeleteIndex = () => super.deleteIndex, _this8 = this;
    return _superprop_getDeleteIndex().call(_this8, _this8.vectorBucketName, indexName);
  }
  index(indexName) {
    return new VectorIndexScope(this.url, this.headers, this.vectorBucketName, indexName, this.fetch);
  }
};
var VectorIndexScope = class extends VectorDataApi {
  constructor(url, headers, vectorBucketName, indexName, fetch$1) {
    super(url, headers, fetch$1);
    this.vectorBucketName = vectorBucketName;
    this.indexName = indexName;
  }
  async putVectors(options) {
    var _superprop_getPutVectors = () => super.putVectors, _this9 = this;
    return _superprop_getPutVectors().call(_this9, _objectSpread22(_objectSpread22({}, options), {}, {
      vectorBucketName: _this9.vectorBucketName,
      indexName: _this9.indexName
    }));
  }
  async getVectors(options) {
    var _superprop_getGetVectors = () => super.getVectors, _this10 = this;
    return _superprop_getGetVectors().call(_this10, _objectSpread22(_objectSpread22({}, options), {}, {
      vectorBucketName: _this10.vectorBucketName,
      indexName: _this10.indexName
    }));
  }
  async listVectors(options = {}) {
    var _superprop_getListVectors = () => super.listVectors, _this11 = this;
    return _superprop_getListVectors().call(_this11, _objectSpread22(_objectSpread22({}, options), {}, {
      vectorBucketName: _this11.vectorBucketName,
      indexName: _this11.indexName
    }));
  }
  async queryVectors(options) {
    var _superprop_getQueryVectors = () => super.queryVectors, _this12 = this;
    return _superprop_getQueryVectors().call(_this12, _objectSpread22(_objectSpread22({}, options), {}, {
      vectorBucketName: _this12.vectorBucketName,
      indexName: _this12.indexName
    }));
  }
  async deleteVectors(options) {
    var _superprop_getDeleteVectors = () => super.deleteVectors, _this13 = this;
    return _superprop_getDeleteVectors().call(_this13, _objectSpread22(_objectSpread22({}, options), {}, {
      vectorBucketName: _this13.vectorBucketName,
      indexName: _this13.indexName
    }));
  }
};
var StorageClient = class extends StorageBucketApi {
  constructor(url, headers = {}, fetch$1, opts) {
    super(url, headers, fetch$1, opts);
  }
  from(id) {
    return new StorageFileApi(this.url, this.headers, id, this.fetch);
  }
  get vectors() {
    return new StorageVectorsClient(this.url + "/vector", {
      headers: this.headers,
      fetch: this.fetch
    });
  }
  get analytics() {
    return new StorageAnalyticsClient(this.url + "/iceberg", this.headers, this.fetch);
  }
};

// node_modules/@supabase/auth-js/dist/module/lib/version.js
var version3 = "2.108.2";

// node_modules/@supabase/auth-js/dist/module/lib/constants.js
var AUTO_REFRESH_TICK_DURATION_MS = 30 * 1000;
var AUTO_REFRESH_TICK_THRESHOLD = 3;
var EXPIRY_MARGIN_MS = AUTO_REFRESH_TICK_THRESHOLD * AUTO_REFRESH_TICK_DURATION_MS;
var REFRESH_FAILURE_COOLDOWN_MS = 2 * AUTO_REFRESH_TICK_DURATION_MS;
var GOTRUE_URL = "http://localhost:9999";
var STORAGE_KEY = "supabase.auth.token";
var DEFAULT_HEADERS2 = { "X-Client-Info": `gotrue-js/${version3}` };
var API_VERSION_HEADER_NAME = "X-Supabase-Api-Version";
var API_VERSIONS = {
  "2024-01-01": {
    timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
    name: "2024-01-01"
  }
};
var BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
var JWKS_TTL = 10 * 60 * 1000;

// node_modules/@supabase/auth-js/dist/module/lib/errors.js
class AuthError extends Error {
  constructor(message, status, code) {
    super(message);
    this.__isAuthError = true;
    this.name = "AuthError";
    this.status = status;
    this.code = code;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code
    };
  }
}
function isAuthError(error) {
  return typeof error === "object" && error !== null && "__isAuthError" in error;
}

class AuthApiError extends AuthError {
  constructor(message, status, code) {
    super(message, status, code);
    this.name = "AuthApiError";
    this.status = status;
    this.code = code;
  }
}
function isAuthApiError(error) {
  return isAuthError(error) && error.name === "AuthApiError";
}

class AuthUnknownError extends AuthError {
  constructor(message, originalError) {
    super(message);
    this.name = "AuthUnknownError";
    this.originalError = originalError;
  }
}

class CustomAuthError extends AuthError {
  constructor(message, name, status, code) {
    super(message, status, code);
    this.name = name;
    this.status = status;
  }
}

class AuthSessionMissingError extends CustomAuthError {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, undefined);
  }
}
function isAuthSessionMissingError(error) {
  return isAuthError(error) && error.name === "AuthSessionMissingError";
}

class AuthInvalidTokenResponseError extends CustomAuthError {
  constructor() {
    super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, undefined);
  }
}

class AuthInvalidCredentialsError extends CustomAuthError {
  constructor(message) {
    super(message, "AuthInvalidCredentialsError", 400, undefined);
  }
}

class AuthImplicitGrantRedirectError extends CustomAuthError {
  constructor(message, details = null) {
    super(message, "AuthImplicitGrantRedirectError", 500, undefined);
    this.details = null;
    this.details = details;
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
  }
}
function isAuthImplicitGrantRedirectError(error) {
  return isAuthError(error) && error.name === "AuthImplicitGrantRedirectError";
}

class AuthPKCEGrantCodeExchangeError extends CustomAuthError {
  constructor(message, details = null) {
    super(message, "AuthPKCEGrantCodeExchangeError", 500, undefined);
    this.details = null;
    this.details = details;
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
  }
}

class AuthPKCECodeVerifierMissingError extends CustomAuthError {
  constructor() {
    super("PKCE code verifier not found in storage. " + "This can happen if the auth flow was initiated in a different browser or device, " + "or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), " + "use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found");
  }
}
class AuthRetryableFetchError extends CustomAuthError {
  constructor(message, status) {
    super(message, "AuthRetryableFetchError", status, undefined);
  }
}
function isAuthRetryableFetchError(error) {
  return isAuthError(error) && error.name === "AuthRetryableFetchError";
}

class AuthRefreshDiscardedError extends CustomAuthError {
  constructor(message = "Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)") {
    super(message, "AuthRefreshDiscardedError", 409, undefined);
  }
}
function isAuthRefreshDiscardedError(error) {
  return isAuthError(error) && error.name === "AuthRefreshDiscardedError";
}

class AuthWeakPasswordError extends CustomAuthError {
  constructor(message, status, reasons) {
    super(message, "AuthWeakPasswordError", status, "weak_password");
    this.reasons = reasons;
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), { reasons: this.reasons });
  }
}
class AuthInvalidJwtError extends CustomAuthError {
  constructor(message) {
    super(message, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
}

// node_modules/@supabase/auth-js/dist/module/lib/base64url.js
var TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
var IGNORE_BASE64URL = ` 	
\r=`.split("");
var FROM_BASE64URL = (() => {
  const charMap = new Array(128);
  for (let i = 0;i < charMap.length; i += 1) {
    charMap[i] = -1;
  }
  for (let i = 0;i < IGNORE_BASE64URL.length; i += 1) {
    charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
  }
  for (let i = 0;i < TO_BASE64URL.length; i += 1) {
    charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
  }
  return charMap;
})();
function byteToBase64URL(byte, state, emit) {
  if (byte !== null) {
    state.queue = state.queue << 8 | byte;
    state.queuedBits += 8;
    while (state.queuedBits >= 6) {
      const pos = state.queue >> state.queuedBits - 6 & 63;
      emit(TO_BASE64URL[pos]);
      state.queuedBits -= 6;
    }
  } else if (state.queuedBits > 0) {
    state.queue = state.queue << 6 - state.queuedBits;
    state.queuedBits = 6;
    while (state.queuedBits >= 6) {
      const pos = state.queue >> state.queuedBits - 6 & 63;
      emit(TO_BASE64URL[pos]);
      state.queuedBits -= 6;
    }
  }
}
function byteFromBase64URL(charCode, state, emit) {
  const bits = FROM_BASE64URL[charCode];
  if (bits > -1) {
    state.queue = state.queue << 6 | bits;
    state.queuedBits += 6;
    while (state.queuedBits >= 8) {
      emit(state.queue >> state.queuedBits - 8 & 255);
      state.queuedBits -= 8;
    }
  } else if (bits === -2) {
    return;
  } else {
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(charCode)}"`);
  }
}
function stringFromBase64URL(str) {
  const conv = [];
  const utf8Emit = (codepoint) => {
    conv.push(String.fromCodePoint(codepoint));
  };
  const utf8State = {
    utf8seq: 0,
    codepoint: 0
  };
  const b64State = { queue: 0, queuedBits: 0 };
  const byteEmit = (byte) => {
    stringFromUTF8(byte, utf8State, utf8Emit);
  };
  for (let i = 0;i < str.length; i += 1) {
    byteFromBase64URL(str.charCodeAt(i), b64State, byteEmit);
  }
  return conv.join("");
}
function codepointToUTF8(codepoint, emit) {
  if (codepoint <= 127) {
    emit(codepoint);
    return;
  } else if (codepoint <= 2047) {
    emit(192 | codepoint >> 6);
    emit(128 | codepoint & 63);
    return;
  } else if (codepoint <= 65535) {
    emit(224 | codepoint >> 12);
    emit(128 | codepoint >> 6 & 63);
    emit(128 | codepoint & 63);
    return;
  } else if (codepoint <= 1114111) {
    emit(240 | codepoint >> 18);
    emit(128 | codepoint >> 12 & 63);
    emit(128 | codepoint >> 6 & 63);
    emit(128 | codepoint & 63);
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
function stringToUTF8(str, emit) {
  for (let i = 0;i < str.length; i += 1) {
    let codepoint = str.charCodeAt(i);
    if (codepoint > 55295 && codepoint <= 56319) {
      const highSurrogate = (codepoint - 55296) * 1024 & 65535;
      const lowSurrogate = str.charCodeAt(i + 1) - 56320 & 65535;
      codepoint = (lowSurrogate | highSurrogate) + 65536;
      i += 1;
    }
    codepointToUTF8(codepoint, emit);
  }
}
function stringFromUTF8(byte, state, emit) {
  if (state.utf8seq === 0) {
    if (byte <= 127) {
      emit(byte);
      return;
    }
    for (let leadingBit = 1;leadingBit < 6; leadingBit += 1) {
      if ((byte >> 7 - leadingBit & 1) === 0) {
        state.utf8seq = leadingBit;
        break;
      }
    }
    if (state.utf8seq === 2) {
      state.codepoint = byte & 31;
    } else if (state.utf8seq === 3) {
      state.codepoint = byte & 15;
    } else if (state.utf8seq === 4) {
      state.codepoint = byte & 7;
    } else {
      throw new Error("Invalid UTF-8 sequence");
    }
    state.utf8seq -= 1;
  } else if (state.utf8seq > 0) {
    if (byte <= 127) {
      throw new Error("Invalid UTF-8 sequence");
    }
    state.codepoint = state.codepoint << 6 | byte & 63;
    state.utf8seq -= 1;
    if (state.utf8seq === 0) {
      emit(state.codepoint);
    }
  }
}
function base64UrlToUint8Array(str) {
  const result = [];
  const state = { queue: 0, queuedBits: 0 };
  const onByte = (byte) => {
    result.push(byte);
  };
  for (let i = 0;i < str.length; i += 1) {
    byteFromBase64URL(str.charCodeAt(i), state, onByte);
  }
  return new Uint8Array(result);
}
function stringToUint8Array(str) {
  const result = [];
  stringToUTF8(str, (byte) => result.push(byte));
  return new Uint8Array(result);
}
function bytesToBase64URL(bytes) {
  const result = [];
  const state = { queue: 0, queuedBits: 0 };
  const onChar = (char) => {
    result.push(char);
  };
  bytes.forEach((byte) => byteToBase64URL(byte, state, onChar));
  byteToBase64URL(null, state, onChar);
  return result.join("");
}

// node_modules/@supabase/auth-js/dist/module/lib/helpers.js
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1000);
  return timeNow + expiresIn;
}
function generateCallbackId() {
  return Symbol("auth-callback");
}
var isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";
var localStorageWriteTests = {
  tested: false,
  writable: false
};
var supportsLocalStorage = () => {
  if (!isBrowser()) {
    return false;
  }
  try {
    if (typeof globalThis.localStorage !== "object") {
      return false;
    }
  } catch (e) {
    return false;
  }
  if (localStorageWriteTests.tested) {
    return localStorageWriteTests.writable;
  }
  const randomKey = `lswt-${Math.random()}${Math.random()}`;
  try {
    globalThis.localStorage.setItem(randomKey, randomKey);
    globalThis.localStorage.removeItem(randomKey);
    localStorageWriteTests.tested = true;
    localStorageWriteTests.writable = true;
  } catch (e) {
    localStorageWriteTests.tested = true;
    localStorageWriteTests.writable = false;
  }
  return localStorageWriteTests.writable;
};
function parseParametersFromURL(href) {
  const result = {};
  const url = new URL(href);
  if (url.hash && url.hash[0] === "#") {
    try {
      const hashSearchParams = new URLSearchParams(url.hash.substring(1));
      hashSearchParams.forEach((value, key) => {
        result[key] = value;
      });
    } catch (_e) {}
  }
  url.searchParams.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
var resolveFetch3 = (customFetch) => {
  if (customFetch) {
    return (...args) => customFetch(...args);
  }
  return (...args) => fetch(...args);
};
var looksLikeFetchResponse = (maybeResponse) => {
  return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
};
var setItemAsync = async (storage, key, data) => {
  await storage.setItem(key, JSON.stringify(data));
};
var getItemAsync = async (storage, key) => {
  const value = await storage.getItem(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (_a) {
    return null;
  }
};
var removeItemAsync = async (storage, key) => {
  await storage.removeItem(key);
};

class Deferred {
  constructor() {
    this.promise = new Deferred.promiseConstructor((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }
}
Deferred.promiseConstructor = Promise;
function decodeJWT(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new AuthInvalidJwtError("Invalid JWT structure");
  }
  for (let i = 0;i < parts.length; i++) {
    if (!BASE64URL_REGEX.test(parts[i])) {
      throw new AuthInvalidJwtError("JWT not in base64url format");
    }
  }
  const data = {
    header: JSON.parse(stringFromBase64URL(parts[0])),
    payload: JSON.parse(stringFromBase64URL(parts[1])),
    signature: base64UrlToUint8Array(parts[2]),
    raw: {
      header: parts[0],
      payload: parts[1]
    }
  };
  return data;
}
async function sleep2(time) {
  return await new Promise((accept) => {
    setTimeout(() => accept(null), time);
  });
}
function retryable(fn, isRetryable) {
  const promise = new Promise((accept, reject) => {
    (async () => {
      for (let attempt = 0;attempt < Infinity; attempt++) {
        try {
          const result = await fn(attempt);
          if (!isRetryable(attempt, null, result)) {
            accept(result);
            return;
          }
        } catch (e) {
          if (!isRetryable(attempt, e)) {
            reject(e);
            return;
          }
        }
      }
    })();
  });
  return promise;
}
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}
function generatePKCEVerifier() {
  const verifierLength = 56;
  const array = new Uint32Array(verifierLength);
  if (typeof crypto === "undefined") {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const charSetLen = charSet.length;
    let verifier = "";
    for (let i = 0;i < verifierLength; i++) {
      verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
    }
    return verifier;
  }
  crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}
async function sha256(randomString) {
  const encoder = new TextEncoder;
  const encodedData = encoder.encode(randomString);
  const hash = await crypto.subtle.digest("SHA-256", encodedData);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map((c) => String.fromCharCode(c)).join("");
}
async function generatePKCEChallenge(verifier) {
  const hasCryptoSupport = typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" && typeof TextEncoder !== "undefined";
  if (!hasCryptoSupport) {
    console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
    return verifier;
  }
  const hashed = await sha256(verifier);
  return btoa(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function getCodeChallengeAndMethod(storage, storageKey, isPasswordRecovery = false) {
  const codeVerifier = generatePKCEVerifier();
  let storedCodeVerifier = codeVerifier;
  if (isPasswordRecovery) {
    storedCodeVerifier += "/recovery";
  }
  await setItemAsync(storage, `${storageKey}-code-verifier`, storedCodeVerifier);
  const codeChallenge = await generatePKCEChallenge(codeVerifier);
  const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
  return [codeChallenge, codeChallengeMethod];
}
var API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function parseResponseAPIVersion(response) {
  const apiVersion = response.headers.get(API_VERSION_HEADER_NAME);
  if (!apiVersion) {
    return null;
  }
  if (!apiVersion.match(API_VERSION_REGEX)) {
    return null;
  }
  try {
    const date = new Date(`${apiVersion}T00:00:00.0Z`);
    return date;
  } catch (_e) {
    return null;
  }
}
function validateExp(exp) {
  if (!exp) {
    throw new Error("Missing exp claim");
  }
  const timeNow = Math.floor(Date.now() / 1000);
  if (exp <= timeNow) {
    throw new Error("JWT has expired");
  }
}
function getAlgorithm(alg) {
  switch (alg) {
    case "RS256":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
    case "ES256":
      return {
        name: "ECDSA",
        namedCurve: "P-256",
        hash: { name: "SHA-256" }
      };
    default:
      throw new Error("Invalid alg claim");
  }
}
var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function validateUUID(str) {
  if (!UUID_REGEX.test(str)) {
    throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
  }
}
function assertPasskeyExperimentalEnabled(experimental) {
  if (!experimental.passkey) {
    throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).");
  }
}
function userNotAvailableProxy() {
  const proxyTarget = {};
  return new Proxy(proxyTarget, {
    get: (target, prop) => {
      if (prop === "__isUserNotAvailableProxy") {
        return true;
      }
      if (typeof prop === "symbol") {
        const sProp = prop.toString();
        if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)") {
          return;
        }
      }
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${prop}" property of the session object is not supported. Please use getUser() instead.`);
    },
    set: (_target, prop) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    },
    deleteProperty: (_target, prop) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    }
  });
}
function insecureUserWarningProxy(user, suppressWarningRef) {
  return new Proxy(user, {
    get: (target, prop, receiver) => {
      if (prop === "__isInsecureUserWarningProxy") {
        return true;
      }
      if (typeof prop === "symbol") {
        const sProp = prop.toString();
        if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)" || sProp === "Symbol(nodejs.util.inspect.custom)") {
          return Reflect.get(target, prop, receiver);
        }
      }
      if (!suppressWarningRef.value && typeof prop === "string") {
        console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.");
        suppressWarningRef.value = true;
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// node_modules/@supabase/auth-js/dist/module/lib/fetch.js
var _getErrorMessage2 = (err) => {
  if (typeof err === "object" && err !== null) {
    const e = err;
    if (typeof e.msg === "string")
      return e.msg;
    if (typeof e.message === "string")
      return e.message;
    if (typeof e.error_description === "string")
      return e.error_description;
    if (typeof e.error === "string")
      return e.error;
  }
  return JSON.stringify(err);
};
var NETWORK_ERROR_CODES = [
  500,
  501,
  502,
  503,
  504,
  520,
  521,
  522,
  523,
  524,
  525,
  526,
  527,
  528,
  529,
  530
];
async function handleError2(error) {
  var _a;
  if (!looksLikeFetchResponse(error)) {
    throw new AuthRetryableFetchError(_getErrorMessage2(error), 0);
  }
  if (NETWORK_ERROR_CODES.includes(error.status)) {
    throw new AuthRetryableFetchError(_getErrorMessage2(error), error.status);
  }
  let data;
  try {
    data = await error.json();
  } catch (e) {
    throw new AuthUnknownError(_getErrorMessage2(e), e);
  }
  let errorCode = undefined;
  const responseAPIVersion = parseResponseAPIVersion(error);
  if (responseAPIVersion && responseAPIVersion.getTime() >= API_VERSIONS["2024-01-01"].timestamp && typeof data === "object" && data && typeof data.code === "string") {
    errorCode = data.code;
  } else if (typeof data === "object" && data && typeof data.error_code === "string") {
    errorCode = data.error_code;
  }
  if (!errorCode) {
    if (typeof data === "object" && data && typeof data.weak_password === "object" && data.weak_password && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
      throw new AuthWeakPasswordError(_getErrorMessage2(data), error.status, data.weak_password.reasons);
    }
  } else if (errorCode === "weak_password") {
    throw new AuthWeakPasswordError(_getErrorMessage2(data), error.status, ((_a = data.weak_password) === null || _a === undefined ? undefined : _a.reasons) || []);
  } else if (errorCode === "session_not_found") {
    throw new AuthSessionMissingError;
  }
  throw new AuthApiError(_getErrorMessage2(data), error.status || 500, errorCode);
}
var _getRequestParams2 = (method, options, parameters, body) => {
  const params = { method, headers: (options === null || options === undefined ? undefined : options.headers) || {} };
  if (method === "GET") {
    return params;
  }
  params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options === null || options === undefined ? undefined : options.headers);
  params.body = JSON.stringify(body);
  return Object.assign(Object.assign({}, params), parameters);
};
async function _request(fetcher, method, url, options) {
  var _a;
  const headers = Object.assign({}, options === null || options === undefined ? undefined : options.headers);
  if (!headers[API_VERSION_HEADER_NAME]) {
    headers[API_VERSION_HEADER_NAME] = API_VERSIONS["2024-01-01"].name;
  }
  if (options === null || options === undefined ? undefined : options.jwt) {
    headers["Authorization"] = `Bearer ${options.jwt}`;
  }
  const qs = (_a = options === null || options === undefined ? undefined : options.query) !== null && _a !== undefined ? _a : {};
  if (options === null || options === undefined ? undefined : options.redirectTo) {
    qs["redirect_to"] = options.redirectTo;
  }
  const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
  const data = await _handleRequest2(fetcher, method, url + queryString, {
    headers,
    noResolveJson: options === null || options === undefined ? undefined : options.noResolveJson
  }, {}, options === null || options === undefined ? undefined : options.body);
  return (options === null || options === undefined ? undefined : options.xform) ? options === null || options === undefined ? undefined : options.xform(data) : { data: Object.assign({}, data), error: null };
}
async function _handleRequest2(fetcher, method, url, options, parameters, body) {
  const requestParams = _getRequestParams2(method, options, parameters, body);
  let result;
  try {
    result = await fetcher(url, Object.assign({}, requestParams));
  } catch (e) {
    console.error(e);
    throw new AuthRetryableFetchError(_getErrorMessage2(e), 0);
  }
  if (!result.ok) {
    await handleError2(result);
  }
  if (options === null || options === undefined ? undefined : options.noResolveJson) {
    return result;
  }
  try {
    return await result.json();
  } catch (e) {
    await handleError2(e);
  }
}
function _sessionResponse(data) {
  var _a;
  let session = null;
  if (hasSession(data)) {
    session = Object.assign({}, data);
    if (!data.expires_at) {
      session.expires_at = expiresAt(data.expires_in);
    }
  }
  const user = (_a = data.user) !== null && _a !== undefined ? _a : typeof (data === null || data === undefined ? undefined : data.id) === "string" ? data : null;
  return { data: { session, user }, error: null };
}
function _sessionResponsePassword(data) {
  const response = _sessionResponse(data);
  if (!response.error && data.weak_password && typeof data.weak_password === "object" && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.message && typeof data.weak_password.message === "string" && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
    response.data.weak_password = data.weak_password;
  }
  return response;
}
function _userResponse(data) {
  var _a;
  const user = (_a = data.user) !== null && _a !== undefined ? _a : data;
  return { data: { user }, error: null };
}
function _ssoResponse(data) {
  return { data, error: null };
}
function _generateLinkResponse(data) {
  const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  const properties = {
    action_link,
    email_otp,
    hashed_token,
    redirect_to,
    verification_type
  };
  const user = Object.assign({}, rest);
  return {
    data: {
      properties,
      user
    },
    error: null
  };
}
function _noResolveJsonResponse(data) {
  return data;
}
function hasSession(data) {
  return !!data.access_token && !!data.refresh_token && !!data.expires_in;
}

// node_modules/@supabase/auth-js/dist/module/lib/types.js
var SIGN_OUT_SCOPES = ["global", "local", "others"];

// node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js
class GoTrueAdminApi {
  constructor({ url = "", headers = {}, fetch: fetch2, experimental }) {
    this.url = url;
    this.headers = headers;
    this.fetch = resolveFetch3(fetch2);
    this.experimental = experimental !== null && experimental !== undefined ? experimental : {};
    this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    };
    this.oauth = {
      listClients: this._listOAuthClients.bind(this),
      createClient: this._createOAuthClient.bind(this),
      getClient: this._getOAuthClient.bind(this),
      updateClient: this._updateOAuthClient.bind(this),
      deleteClient: this._deleteOAuthClient.bind(this),
      regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this)
    };
    this.customProviders = {
      listProviders: this._listCustomProviders.bind(this),
      createProvider: this._createCustomProvider.bind(this),
      getProvider: this._getCustomProvider.bind(this),
      updateProvider: this._updateCustomProvider.bind(this),
      deleteProvider: this._deleteCustomProvider.bind(this)
    };
    this.passkey = {
      listPasskeys: this._adminListPasskeys.bind(this),
      deletePasskey: this._adminDeletePasskey.bind(this)
    };
  }
  async signOut(jwt, scope = SIGN_OUT_SCOPES[0]) {
    if (SIGN_OUT_SCOPES.indexOf(scope) < 0) {
      throw new Error(`@supabase/auth-js: Parameter scope must be one of ${SIGN_OUT_SCOPES.join(", ")}`);
    }
    try {
      await _request(this.fetch, "POST", `${this.url}/logout?scope=${scope}`, {
        headers: this.headers,
        jwt,
        noResolveJson: true
      });
      return { data: null, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async inviteUserByEmail(email, options = {}) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/invite`, {
        body: { email, data: options.data },
        headers: this.headers,
        redirectTo: options.redirectTo,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  async generateLink(params) {
    try {
      const { options } = params, rest = __rest(params, ["options"]);
      const body = Object.assign(Object.assign({}, rest), options);
      if ("newEmail" in rest) {
        body.new_email = rest === null || rest === undefined ? undefined : rest.newEmail;
        delete body["newEmail"];
      }
      return await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
        body,
        headers: this.headers,
        xform: _generateLinkResponse,
        redirectTo: options === null || options === undefined ? undefined : options.redirectTo
      });
    } catch (error) {
      if (isAuthError(error)) {
        return {
          data: {
            properties: null,
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  async createUser(attributes) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/users`, {
        body: attributes,
        headers: this.headers,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  async listUsers(params) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
      const pagination = { nextPage: null, lastPage: 0, total: 0 };
      const response = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: true,
        query: {
          page: (_b = (_a = params === null || params === undefined ? undefined : params.page) === null || _a === undefined ? undefined : _a.toString()) !== null && _b !== undefined ? _b : "",
          per_page: (_d = (_c = params === null || params === undefined ? undefined : params.perPage) === null || _c === undefined ? undefined : _c.toString()) !== null && _d !== undefined ? _d : ""
        },
        xform: _noResolveJsonResponse
      });
      if (response.error)
        throw response.error;
      const users = await response.json();
      const total = (_e = response.headers.get("x-total-count")) !== null && _e !== undefined ? _e : 0;
      const links = (_g = (_f = response.headers.get("link")) === null || _f === undefined ? undefined : _f.split(",")) !== null && _g !== undefined ? _g : [];
      if (links.length > 0) {
        links.forEach((link) => {
          const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
          const rel = JSON.parse(link.split(";")[1].split("=")[1]);
          pagination[`${rel}Page`] = page;
        });
        pagination.total = parseInt(total);
      }
      return { data: Object.assign(Object.assign({}, users), pagination), error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { users: [] }, error };
      }
      throw error;
    }
  }
  async getUserById(uid) {
    validateUUID(uid);
    try {
      return await _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
        headers: this.headers,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  async updateUserById(uid, attributes) {
    validateUUID(uid);
    try {
      return await _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
        body: attributes,
        headers: this.headers,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  async deleteUser(id, shouldSoftDelete = false) {
    validateUUID(id);
    try {
      return await _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
        headers: this.headers,
        body: {
          should_soft_delete: shouldSoftDelete
        },
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  async _listFactors(params) {
    validateUUID(params.userId);
    try {
      const { data, error } = await _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
        headers: this.headers,
        xform: (factors) => {
          return { data: { factors }, error: null };
        }
      });
      return { data, error };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _deleteFactor(params) {
    validateUUID(params.userId);
    validateUUID(params.id);
    try {
      const data = await _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
        headers: this.headers
      });
      return { data, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _listOAuthClients(params) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
      const pagination = { nextPage: null, lastPage: 0, total: 0 };
      const response = await _request(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
        headers: this.headers,
        noResolveJson: true,
        query: {
          page: (_b = (_a = params === null || params === undefined ? undefined : params.page) === null || _a === undefined ? undefined : _a.toString()) !== null && _b !== undefined ? _b : "",
          per_page: (_d = (_c = params === null || params === undefined ? undefined : params.perPage) === null || _c === undefined ? undefined : _c.toString()) !== null && _d !== undefined ? _d : ""
        },
        xform: _noResolveJsonResponse
      });
      if (response.error)
        throw response.error;
      const clients = await response.json();
      const total = (_e = response.headers.get("x-total-count")) !== null && _e !== undefined ? _e : 0;
      const links = (_g = (_f = response.headers.get("link")) === null || _f === undefined ? undefined : _f.split(",")) !== null && _g !== undefined ? _g : [];
      if (links.length > 0) {
        links.forEach((link) => {
          const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
          const rel = JSON.parse(link.split(";")[1].split("=")[1]);
          pagination[`${rel}Page`] = page;
        });
        pagination.total = parseInt(total);
      }
      return { data: Object.assign(Object.assign({}, clients), pagination), error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { clients: [] }, error };
      }
      throw error;
    }
  }
  async _createOAuthClient(params) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
        body: params,
        headers: this.headers,
        xform: (client) => {
          return { data: client, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _getOAuthClient(clientId) {
    try {
      return await _request(this.fetch, "GET", `${this.url}/admin/oauth/clients/${clientId}`, {
        headers: this.headers,
        xform: (client) => {
          return { data: client, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _updateOAuthClient(clientId, params) {
    try {
      return await _request(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${clientId}`, {
        body: params,
        headers: this.headers,
        xform: (client) => {
          return { data: client, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _deleteOAuthClient(clientId) {
    try {
      await _request(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${clientId}`, {
        headers: this.headers,
        noResolveJson: true
      });
      return { data: null, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _regenerateOAuthClientSecret(clientId) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/oauth/clients/${clientId}/regenerate_secret`, {
        headers: this.headers,
        xform: (client) => {
          return { data: client, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _listCustomProviders(params) {
    try {
      const query = {};
      if (params === null || params === undefined ? undefined : params.type) {
        query.type = params.type;
      }
      return await _request(this.fetch, "GET", `${this.url}/admin/custom-providers`, {
        headers: this.headers,
        query,
        xform: (data) => {
          var _a;
          return { data: { providers: (_a = data === null || data === undefined ? undefined : data.providers) !== null && _a !== undefined ? _a : [] }, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { providers: [] }, error };
      }
      throw error;
    }
  }
  async _createCustomProvider(params) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/custom-providers`, {
        body: params,
        headers: this.headers,
        xform: (provider) => {
          return { data: provider, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _getCustomProvider(identifier) {
    try {
      return await _request(this.fetch, "GET", `${this.url}/admin/custom-providers/${identifier}`, {
        headers: this.headers,
        xform: (provider) => {
          return { data: provider, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _updateCustomProvider(identifier, params) {
    try {
      return await _request(this.fetch, "PUT", `${this.url}/admin/custom-providers/${identifier}`, {
        body: params,
        headers: this.headers,
        xform: (provider) => {
          return { data: provider, error: null };
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _deleteCustomProvider(identifier) {
    try {
      await _request(this.fetch, "DELETE", `${this.url}/admin/custom-providers/${identifier}`, {
        headers: this.headers,
        noResolveJson: true
      });
      return { data: null, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _adminListPasskeys(params) {
    assertPasskeyExperimentalEnabled(this.experimental);
    validateUUID(params.userId);
    try {
      return await _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/passkeys`, { headers: this.headers, xform: (data) => ({ data, error: null }) });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _adminDeletePasskey(params) {
    assertPasskeyExperimentalEnabled(this.experimental);
    validateUUID(params.userId);
    validateUUID(params.passkeyId);
    try {
      await _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/passkeys/${params.passkeyId}`, { headers: this.headers, noResolveJson: true });
      return { data: null, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
}

// node_modules/@supabase/auth-js/dist/module/lib/local-storage.js
function memoryLocalStorageAdapter(store = {}) {
  return {
    getItem: (key) => {
      return store[key] || null;
    },
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    }
  };
}

// node_modules/@supabase/auth-js/dist/module/lib/locks.js
var internals = {
  debug: !!(globalThis && supportsLocalStorage() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
};

class LockAcquireTimeoutError extends Error {
  constructor(message) {
    super(message);
    this.isAcquireTimeout = true;
  }
}

// node_modules/@supabase/auth-js/dist/module/lib/polyfills.js
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}

// node_modules/@supabase/auth-js/dist/module/lib/web3/ethereum.js
function getAddress(address) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error(`@supabase/auth-js: Address "${address}" is invalid.`);
  }
  return address.toLowerCase();
}
function fromHex(hex) {
  return parseInt(hex, 16);
}
function toHex(value) {
  const bytes = new TextEncoder().encode(value);
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return "0x" + hex;
}
function createSiweMessage(parameters) {
  var _a;
  const { chainId, domain, expirationTime, issuedAt = new Date, nonce, notBefore, requestId, resources, scheme, uri, version: version4 } = parameters;
  {
    if (!Number.isInteger(chainId))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${chainId}`);
    if (!domain)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);
    if (nonce && nonce.length < 8)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${nonce}`);
    if (!uri)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);
    if (version4 !== "1")
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${version4}`);
    if ((_a = parameters.statement) === null || _a === undefined ? undefined : _a.includes(`
`))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${parameters.statement}`);
  }
  const address = getAddress(parameters.address);
  const origin = scheme ? `${scheme}://${domain}` : domain;
  const statement = parameters.statement ? `${parameters.statement}
` : "";
  const prefix = `${origin} wants you to sign in with your Ethereum account:
${address}

${statement}`;
  let suffix = `URI: ${uri}
Version: ${version4}
Chain ID: ${chainId}${nonce ? `
Nonce: ${nonce}` : ""}
Issued At: ${issuedAt.toISOString()}`;
  if (expirationTime)
    suffix += `
Expiration Time: ${expirationTime.toISOString()}`;
  if (notBefore)
    suffix += `
Not Before: ${notBefore.toISOString()}`;
  if (requestId)
    suffix += `
Request ID: ${requestId}`;
  if (resources) {
    let content = `
Resources:`;
    for (const resource of resources) {
      if (!resource || typeof resource !== "string")
        throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${resource}`);
      content += `
- ${resource}`;
    }
    suffix += content;
  }
  return `${prefix}
${suffix}`;
}

// node_modules/@supabase/auth-js/dist/module/lib/webauthn.errors.js
class WebAuthnError extends Error {
  constructor({ message, code, cause, name }) {
    var _a;
    super(message, { cause });
    this.__isWebAuthnError = true;
    this.name = (_a = name !== null && name !== undefined ? name : cause instanceof Error ? cause.name : undefined) !== null && _a !== undefined ? _a : "Unknown Error";
    this.code = code;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code
    };
  }
}

class WebAuthnUnknownError extends WebAuthnError {
  constructor(message, originalError) {
    super({
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: originalError,
      message
    });
    this.name = "WebAuthnUnknownError";
    this.originalError = originalError;
  }
}
function identifyRegistrationError({ error, options }) {
  var _a, _b, _c;
  const { publicKey } = options;
  if (!publicKey) {
    throw Error("options was missing required publicKey property");
  }
  if (error.name === "AbortError") {
    if (options.signal instanceof AbortSignal) {
      return new WebAuthnError({
        message: "Registration ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: error
      });
    }
  } else if (error.name === "ConstraintError") {
    if (((_a = publicKey.authenticatorSelection) === null || _a === undefined ? undefined : _a.requireResidentKey) === true) {
      return new WebAuthnError({
        message: "Discoverable credentials were required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
        cause: error
      });
    } else if (options.mediation === "conditional" && ((_b = publicKey.authenticatorSelection) === null || _b === undefined ? undefined : _b.userVerification) === "required") {
      return new WebAuthnError({
        message: "User verification was required during automatic registration but it could not be performed",
        code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
        cause: error
      });
    } else if (((_c = publicKey.authenticatorSelection) === null || _c === undefined ? undefined : _c.userVerification) === "required") {
      return new WebAuthnError({
        message: "User verification was required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
        cause: error
      });
    }
  } else if (error.name === "InvalidStateError") {
    return new WebAuthnError({
      message: "The authenticator was previously registered",
      code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
      cause: error
    });
  } else if (error.name === "NotAllowedError") {
    return new WebAuthnError({
      message: error.message,
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: error
    });
  } else if (error.name === "NotSupportedError") {
    const validPubKeyCredParams = publicKey.pubKeyCredParams.filter((param) => param.type === "public-key");
    if (validPubKeyCredParams.length === 0) {
      return new WebAuthnError({
        message: 'No entry in pubKeyCredParams was of type "public-key"',
        code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
        cause: error
      });
    }
    return new WebAuthnError({
      message: "No available authenticator supported any of the specified pubKeyCredParams algorithms",
      code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
      cause: error
    });
  } else if (error.name === "SecurityError") {
    const effectiveDomain = window.location.hostname;
    if (!isValidDomain(effectiveDomain)) {
      return new WebAuthnError({
        message: `${window.location.hostname} is an invalid domain`,
        code: "ERROR_INVALID_DOMAIN",
        cause: error
      });
    } else if (publicKey.rp.id !== effectiveDomain) {
      return new WebAuthnError({
        message: `The RP ID "${publicKey.rp.id}" is invalid for this domain`,
        code: "ERROR_INVALID_RP_ID",
        cause: error
      });
    }
  } else if (error.name === "TypeError") {
    if (publicKey.user.id.byteLength < 1 || publicKey.user.id.byteLength > 64) {
      return new WebAuthnError({
        message: "User ID was not between 1 and 64 characters",
        code: "ERROR_INVALID_USER_ID_LENGTH",
        cause: error
      });
    }
  } else if (error.name === "UnknownError") {
    return new WebAuthnError({
      message: "The authenticator was unable to process the specified options, or could not create a new credential",
      code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
      cause: error
    });
  }
  return new WebAuthnError({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: error
  });
}
function identifyAuthenticationError({ error, options }) {
  const { publicKey } = options;
  if (!publicKey) {
    throw Error("options was missing required publicKey property");
  }
  if (error.name === "AbortError") {
    if (options.signal instanceof AbortSignal) {
      return new WebAuthnError({
        message: "Authentication ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: error
      });
    }
  } else if (error.name === "NotAllowedError") {
    return new WebAuthnError({
      message: error.message,
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: error
    });
  } else if (error.name === "SecurityError") {
    const effectiveDomain = window.location.hostname;
    if (!isValidDomain(effectiveDomain)) {
      return new WebAuthnError({
        message: `${window.location.hostname} is an invalid domain`,
        code: "ERROR_INVALID_DOMAIN",
        cause: error
      });
    } else if (publicKey.rpId !== effectiveDomain) {
      return new WebAuthnError({
        message: `The RP ID "${publicKey.rpId}" is invalid for this domain`,
        code: "ERROR_INVALID_RP_ID",
        cause: error
      });
    }
  } else if (error.name === "UnknownError") {
    return new WebAuthnError({
      message: "The authenticator was unable to process the specified options, or could not create a new assertion signature",
      code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
      cause: error
    });
  }
  return new WebAuthnError({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: error
  });
}

// node_modules/@supabase/auth-js/dist/module/lib/webauthn.js
class WebAuthnAbortService {
  createNewAbortSignal() {
    if (this.controller) {
      const abortError = new Error("Cancelling existing WebAuthn API call for new one");
      abortError.name = "AbortError";
      this.controller.abort(abortError);
    }
    const newController = new AbortController;
    this.controller = newController;
    return newController.signal;
  }
  cancelCeremony() {
    if (this.controller) {
      const abortError = new Error("Manually cancelling existing WebAuthn API call");
      abortError.name = "AbortError";
      this.controller.abort(abortError);
      this.controller = undefined;
    }
  }
}
var webAuthnAbortService = new WebAuthnAbortService;
function deserializeCredentialCreationOptions(options) {
  if (!options) {
    throw new Error("Credential creation options are required");
  }
  if (typeof PublicKeyCredential !== "undefined" && "parseCreationOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseCreationOptionsFromJSON === "function") {
    return PublicKeyCredential.parseCreationOptionsFromJSON(options);
  }
  const { challenge: challengeStr, user: userOpts, excludeCredentials } = options, restOptions = __rest(options, ["challenge", "user", "excludeCredentials"]);
  const challenge = base64UrlToUint8Array(challengeStr).buffer;
  const user = Object.assign(Object.assign({}, userOpts), { id: base64UrlToUint8Array(userOpts.id).buffer });
  const result = Object.assign(Object.assign({}, restOptions), {
    challenge,
    user
  });
  if (excludeCredentials && excludeCredentials.length > 0) {
    result.excludeCredentials = new Array(excludeCredentials.length);
    for (let i = 0;i < excludeCredentials.length; i++) {
      const cred = excludeCredentials[i];
      result.excludeCredentials[i] = Object.assign(Object.assign({}, cred), {
        id: base64UrlToUint8Array(cred.id).buffer,
        type: cred.type || "public-key",
        transports: cred.transports
      });
    }
  }
  return result;
}
function deserializeCredentialRequestOptions(options) {
  if (!options) {
    throw new Error("Credential request options are required");
  }
  if (typeof PublicKeyCredential !== "undefined" && "parseRequestOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseRequestOptionsFromJSON === "function") {
    return PublicKeyCredential.parseRequestOptionsFromJSON(options);
  }
  const { challenge: challengeStr, allowCredentials } = options, restOptions = __rest(options, ["challenge", "allowCredentials"]);
  const challenge = base64UrlToUint8Array(challengeStr).buffer;
  const result = Object.assign(Object.assign({}, restOptions), { challenge });
  if (allowCredentials && allowCredentials.length > 0) {
    result.allowCredentials = new Array(allowCredentials.length);
    for (let i = 0;i < allowCredentials.length; i++) {
      const cred = allowCredentials[i];
      result.allowCredentials[i] = Object.assign(Object.assign({}, cred), {
        id: base64UrlToUint8Array(cred.id).buffer,
        type: cred.type || "public-key",
        transports: cred.transports
      });
    }
  }
  return result;
}
function serializeCredentialCreationResponse(credential) {
  var _a;
  if ("toJSON" in credential && typeof credential.toJSON === "function") {
    return credential.toJSON();
  }
  const credentialWithAttachment = credential;
  return {
    id: credential.id,
    rawId: credential.id,
    response: {
      attestationObject: bytesToBase64URL(new Uint8Array(credential.response.attestationObject)),
      clientDataJSON: bytesToBase64URL(new Uint8Array(credential.response.clientDataJSON))
    },
    type: "public-key",
    clientExtensionResults: credential.getClientExtensionResults(),
    authenticatorAttachment: (_a = credentialWithAttachment.authenticatorAttachment) !== null && _a !== undefined ? _a : undefined
  };
}
function serializeCredentialRequestResponse(credential) {
  var _a;
  if ("toJSON" in credential && typeof credential.toJSON === "function") {
    return credential.toJSON();
  }
  const credentialWithAttachment = credential;
  const clientExtensionResults = credential.getClientExtensionResults();
  const assertionResponse = credential.response;
  return {
    id: credential.id,
    rawId: credential.id,
    response: {
      authenticatorData: bytesToBase64URL(new Uint8Array(assertionResponse.authenticatorData)),
      clientDataJSON: bytesToBase64URL(new Uint8Array(assertionResponse.clientDataJSON)),
      signature: bytesToBase64URL(new Uint8Array(assertionResponse.signature)),
      userHandle: assertionResponse.userHandle ? bytesToBase64URL(new Uint8Array(assertionResponse.userHandle)) : undefined
    },
    type: "public-key",
    clientExtensionResults,
    authenticatorAttachment: (_a = credentialWithAttachment.authenticatorAttachment) !== null && _a !== undefined ? _a : undefined
  };
}
function isValidDomain(hostname) {
  return hostname === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(hostname);
}
function browserSupportsWebAuthn() {
  var _a, _b;
  return !!(isBrowser() && ("PublicKeyCredential" in window) && window.PublicKeyCredential && ("credentials" in navigator) && typeof ((_a = navigator === null || navigator === undefined ? undefined : navigator.credentials) === null || _a === undefined ? undefined : _a.create) === "function" && typeof ((_b = navigator === null || navigator === undefined ? undefined : navigator.credentials) === null || _b === undefined ? undefined : _b.get) === "function");
}
async function createCredential(options) {
  try {
    const response = await navigator.credentials.create(options);
    if (!response) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Empty credential response", response)
      };
    }
    if (!(response instanceof PublicKeyCredential)) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Browser returned unexpected credential type", response)
      };
    }
    return { data: response, error: null };
  } catch (err) {
    return {
      data: null,
      error: identifyRegistrationError({
        error: err,
        options
      })
    };
  }
}
async function getCredential(options) {
  try {
    const response = await navigator.credentials.get(options);
    if (!response) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Empty credential response", response)
      };
    }
    if (!(response instanceof PublicKeyCredential)) {
      return {
        data: null,
        error: new WebAuthnUnknownError("Browser returned unexpected credential type", response)
      };
    }
    return { data: response, error: null };
  } catch (err) {
    return {
      data: null,
      error: identifyAuthenticationError({
        error: err,
        options
      })
    };
  }
}
var DEFAULT_CREATION_OPTIONS = {
  hints: ["security-key"],
  authenticatorSelection: {
    authenticatorAttachment: "cross-platform",
    requireResidentKey: false,
    userVerification: "preferred",
    residentKey: "discouraged"
  },
  attestation: "direct"
};
var DEFAULT_REQUEST_OPTIONS = {
  userVerification: "preferred",
  hints: ["security-key"],
  attestation: "direct"
};
function deepMerge(...sources) {
  const isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  const isArrayBufferLike = (val) => val instanceof ArrayBuffer || ArrayBuffer.isView(val);
  const result = {};
  for (const source of sources) {
    if (!source)
      continue;
    for (const key in source) {
      const value = source[key];
      if (value === undefined)
        continue;
      if (Array.isArray(value)) {
        result[key] = value;
      } else if (isArrayBufferLike(value)) {
        result[key] = value;
      } else if (isObject(value)) {
        const existing = result[key];
        if (isObject(existing)) {
          result[key] = deepMerge(existing, value);
        } else {
          result[key] = deepMerge(value);
        }
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}
function mergeCredentialCreationOptions(baseOptions, overrides) {
  return deepMerge(DEFAULT_CREATION_OPTIONS, baseOptions, overrides || {});
}
function mergeCredentialRequestOptions(baseOptions, overrides) {
  return deepMerge(DEFAULT_REQUEST_OPTIONS, baseOptions, overrides || {});
}

class WebAuthnApi {
  constructor(client) {
    this.client = client;
    this.enroll = this._enroll.bind(this);
    this.challenge = this._challenge.bind(this);
    this.verify = this._verify.bind(this);
    this.authenticate = this._authenticate.bind(this);
    this.register = this._register.bind(this);
  }
  async _enroll(params) {
    return this.client.mfa.enroll(Object.assign(Object.assign({}, params), { factorType: "webauthn" }));
  }
  async _challenge({ factorId, webauthn, friendlyName, signal }, overrides) {
    var _a;
    try {
      const { data: challengeResponse, error: challengeError } = await this.client.mfa.challenge({
        factorId,
        webauthn
      });
      if (!challengeResponse) {
        return { data: null, error: challengeError };
      }
      const abortSignal = signal !== null && signal !== undefined ? signal : webAuthnAbortService.createNewAbortSignal();
      if (challengeResponse.webauthn.type === "create") {
        const { user } = challengeResponse.webauthn.credential_options.publicKey;
        if (!user.name) {
          const nameToUse = friendlyName;
          if (!nameToUse) {
            const currentUser = await this.client.getUser();
            const userData = currentUser.data.user;
            const fallbackName = ((_a = userData === null || userData === undefined ? undefined : userData.user_metadata) === null || _a === undefined ? undefined : _a.name) || (userData === null || userData === undefined ? undefined : userData.email) || (userData === null || userData === undefined ? undefined : userData.id) || "User";
            user.name = `${user.id}:${fallbackName}`;
          } else {
            user.name = `${user.id}:${nameToUse}`;
          }
        }
        if (!user.displayName) {
          user.displayName = user.name;
        }
      }
      switch (challengeResponse.webauthn.type) {
        case "create": {
          const options = mergeCredentialCreationOptions(challengeResponse.webauthn.credential_options.publicKey, overrides === null || overrides === undefined ? undefined : overrides.create);
          const { data, error } = await createCredential({
            publicKey: options,
            signal: abortSignal
          });
          if (data) {
            return {
              data: {
                factorId,
                challengeId: challengeResponse.id,
                webauthn: {
                  type: challengeResponse.webauthn.type,
                  credential_response: data
                }
              },
              error: null
            };
          }
          return { data: null, error };
        }
        case "request": {
          const options = mergeCredentialRequestOptions(challengeResponse.webauthn.credential_options.publicKey, overrides === null || overrides === undefined ? undefined : overrides.request);
          const { data, error } = await getCredential(Object.assign(Object.assign({}, challengeResponse.webauthn.credential_options), { publicKey: options, signal: abortSignal }));
          if (data) {
            return {
              data: {
                factorId,
                challengeId: challengeResponse.id,
                webauthn: {
                  type: challengeResponse.webauthn.type,
                  credential_response: data
                }
              },
              error: null
            };
          }
          return { data: null, error };
        }
      }
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      return {
        data: null,
        error: new AuthUnknownError("Unexpected error in challenge", error)
      };
    }
  }
  async _verify({ challengeId, factorId, webauthn }) {
    return this.client.mfa.verify({
      factorId,
      challengeId,
      webauthn
    });
  }
  async _authenticate({ factorId, webauthn: { rpId = typeof window !== "undefined" ? window.location.hostname : undefined, rpOrigins = typeof window !== "undefined" ? [window.location.origin] : undefined, signal } = {} }, overrides) {
    if (!rpId) {
      return {
        data: null,
        error: new AuthError("rpId is required for WebAuthn authentication")
      };
    }
    try {
      if (!browserSupportsWebAuthn()) {
        return {
          data: null,
          error: new AuthUnknownError("Browser does not support WebAuthn", null)
        };
      }
      const { data: challengeResponse, error: challengeError } = await this.challenge({
        factorId,
        webauthn: { rpId, rpOrigins },
        signal
      }, { request: overrides });
      if (!challengeResponse) {
        return { data: null, error: challengeError };
      }
      const { webauthn } = challengeResponse;
      return this._verify({
        factorId,
        challengeId: challengeResponse.challengeId,
        webauthn: {
          type: webauthn.type,
          rpId,
          rpOrigins,
          credential_response: webauthn.credential_response
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      return {
        data: null,
        error: new AuthUnknownError("Unexpected error in authenticate", error)
      };
    }
  }
  async _register({ friendlyName, webauthn: { rpId = typeof window !== "undefined" ? window.location.hostname : undefined, rpOrigins = typeof window !== "undefined" ? [window.location.origin] : undefined, signal } = {} }, overrides) {
    if (!rpId) {
      return {
        data: null,
        error: new AuthError("rpId is required for WebAuthn registration")
      };
    }
    try {
      if (!browserSupportsWebAuthn()) {
        return {
          data: null,
          error: new AuthUnknownError("Browser does not support WebAuthn", null)
        };
      }
      const { data: factor, error: enrollError } = await this._enroll({
        friendlyName
      });
      if (!factor) {
        await this.client.mfa.listFactors().then((factors) => {
          var _a;
          return (_a = factors.data) === null || _a === undefined ? undefined : _a.all.find((v) => v.factor_type === "webauthn" && v.friendly_name === friendlyName && v.status !== "unverified");
        }).then((factor2) => factor2 ? this.client.mfa.unenroll({ factorId: factor2 === null || factor2 === undefined ? undefined : factor2.id }) : undefined);
        return { data: null, error: enrollError };
      }
      const { data: challengeResponse, error: challengeError } = await this._challenge({
        factorId: factor.id,
        friendlyName: factor.friendly_name,
        webauthn: { rpId, rpOrigins },
        signal
      }, {
        create: overrides
      });
      if (!challengeResponse) {
        return { data: null, error: challengeError };
      }
      return this._verify({
        factorId: factor.id,
        challengeId: challengeResponse.challengeId,
        webauthn: {
          rpId,
          rpOrigins,
          type: challengeResponse.webauthn.type,
          credential_response: challengeResponse.webauthn.credential_response
        }
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      return {
        data: null,
        error: new AuthUnknownError("Unexpected error in register", error)
      };
    }
  }
}

// node_modules/@supabase/auth-js/dist/module/GoTrueClient.js
polyfillGlobalThis();
var DEFAULT_OPTIONS = {
  url: GOTRUE_URL,
  storageKey: STORAGE_KEY,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  headers: DEFAULT_HEADERS2,
  flowType: "implicit",
  debug: false,
  hasCustomAuthorizationHeader: false,
  throwOnError: false,
  lockAcquireTimeout: 5000,
  skipAutoInitialize: false,
  experimental: {}
};
var GLOBAL_JWKS = {};

class GoTrueClient {
  get jwks() {
    var _a, _b;
    return (_b = (_a = GLOBAL_JWKS[this.storageKey]) === null || _a === undefined ? undefined : _a.jwks) !== null && _b !== undefined ? _b : { keys: [] };
  }
  set jwks(value) {
    GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { jwks: value });
  }
  get jwks_cached_at() {
    var _a, _b;
    return (_b = (_a = GLOBAL_JWKS[this.storageKey]) === null || _a === undefined ? undefined : _a.cachedAt) !== null && _b !== undefined ? _b : Number.MIN_SAFE_INTEGER;
  }
  set jwks_cached_at(value) {
    GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { cachedAt: value });
  }
  constructor(options) {
    var _a, _b, _c;
    this.userStorage = null;
    this.memoryStorage = null;
    this.stateChangeEmitters = new Map;
    this.autoRefreshTicker = null;
    this.autoRefreshTickTimeout = null;
    this.visibilityChangedCallback = null;
    this.refreshingDeferred = null;
    this.lastRefreshFailure = null;
    this._sessionRemovalEpoch = 0;
    this.initializePromise = null;
    this.detectSessionInUrl = true;
    this.hasCustomAuthorizationHeader = false;
    this.suppressGetSessionWarning = false;
    this.lock = null;
    this.lockAcquired = false;
    this.pendingInLock = [];
    this.broadcastChannel = null;
    this.logger = console.log;
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    this.storageKey = settings.storageKey;
    this.instanceID = (_a = GoTrueClient.nextInstanceID[this.storageKey]) !== null && _a !== undefined ? _a : 0;
    GoTrueClient.nextInstanceID[this.storageKey] = this.instanceID + 1;
    this.logDebugMessages = !!settings.debug;
    if (typeof settings.debug === "function") {
      this.logger = settings.debug;
    }
    if (this.instanceID > 0 && isBrowser()) {
      const message = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
      console.warn(message);
      if (this.logDebugMessages) {
        console.trace(message);
      }
    }
    this.persistSession = settings.persistSession;
    this.autoRefreshToken = settings.autoRefreshToken;
    this.experimental = (_b = settings.experimental) !== null && _b !== undefined ? _b : {};
    this.admin = new GoTrueAdminApi({
      url: settings.url,
      headers: settings.headers,
      fetch: settings.fetch,
      experimental: this.experimental
    });
    this.url = settings.url;
    this.headers = settings.headers;
    this.fetch = resolveFetch3(settings.fetch);
    this.detectSessionInUrl = settings.detectSessionInUrl;
    this.flowType = settings.flowType;
    this.hasCustomAuthorizationHeader = settings.hasCustomAuthorizationHeader;
    this.throwOnError = settings.throwOnError;
    this.lockAcquireTimeout = settings.lockAcquireTimeout;
    if (settings.lock != null) {
      this.lock = settings.lock;
    }
    if (!this.jwks) {
      this.jwks = { keys: [] };
      this.jwks_cached_at = Number.MIN_SAFE_INTEGER;
    }
    this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
      webauthn: new WebAuthnApi(this)
    };
    this.oauth = {
      getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
      approveAuthorization: this._approveAuthorization.bind(this),
      denyAuthorization: this._denyAuthorization.bind(this),
      listGrants: this._listOAuthGrants.bind(this),
      revokeGrant: this._revokeOAuthGrant.bind(this)
    };
    this.passkey = {
      startRegistration: this._startPasskeyRegistration.bind(this),
      verifyRegistration: this._verifyPasskeyRegistration.bind(this),
      startAuthentication: this._startPasskeyAuthentication.bind(this),
      verifyAuthentication: this._verifyPasskeyAuthentication.bind(this),
      list: this._listPasskeys.bind(this),
      update: this._updatePasskey.bind(this),
      delete: this._deletePasskey.bind(this)
    };
    if (this.persistSession) {
      if (settings.storage) {
        this.storage = settings.storage;
      } else {
        if (supportsLocalStorage()) {
          this.storage = globalThis.localStorage;
        } else {
          this.memoryStorage = {};
          this.storage = memoryLocalStorageAdapter(this.memoryStorage);
        }
      }
      if (settings.userStorage) {
        this.userStorage = settings.userStorage;
      }
    } else {
      this.memoryStorage = {};
      this.storage = memoryLocalStorageAdapter(this.memoryStorage);
    }
    if (isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (e) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
      }
      (_c = this.broadcastChannel) === null || _c === undefined || _c.addEventListener("message", async (event) => {
        this._debug("received broadcast notification from other tab or client", event);
        if (event.data.event === "TOKEN_REFRESHED" || event.data.event === "SIGNED_IN") {
          this.lastRefreshFailure = null;
        }
        try {
          await this._notifyAllSubscribers(event.data.event, event.data.session, false);
        } catch (error) {
          this._debug("#broadcastChannel", "error", error);
        }
      });
    }
    if (!settings.skipAutoInitialize) {
      this.initialize().catch((error) => {
        this._debug("#initialize()", "error", error);
      });
    }
  }
  isThrowOnErrorEnabled() {
    return this.throwOnError;
  }
  _returnResult(result) {
    if (this.throwOnError && result && result.error) {
      throw result.error;
    }
    return result;
  }
  _logPrefix() {
    return "GoTrueClient@" + `${this.storageKey}:${this.instanceID} (${version3}) ${new Date().toISOString()}`;
  }
  _debug(...args) {
    if (this.logDebugMessages) {
      this.logger(this._logPrefix(), ...args);
    }
    return this;
  }
  async initialize() {
    if (this.initializePromise) {
      return await this.initializePromise;
    }
    this.initializePromise = (async () => {
      if (this.lock != null) {
        return await this._acquireLock(this.lockAcquireTimeout, async () => {
          return await this._initialize();
        });
      }
      return await this._initialize();
    })();
    return await this.initializePromise;
  }
  async _initialize() {
    var _a;
    try {
      let params = {};
      let callbackUrlType = "none";
      if (isBrowser()) {
        params = parseParametersFromURL(window.location.href);
        if (this._isImplicitGrantCallback(params)) {
          callbackUrlType = "implicit";
        } else if (await this._isPKCECallback(params)) {
          callbackUrlType = "pkce";
        }
      }
      if (isBrowser() && this.detectSessionInUrl && callbackUrlType !== "none") {
        const { data, error } = await this._getSessionFromURL(params, callbackUrlType);
        if (error) {
          this._debug("#_initialize()", "error detecting session from URL", error);
          if (isAuthImplicitGrantRedirectError(error)) {
            const errorCode = (_a = error.details) === null || _a === undefined ? undefined : _a.code;
            if (errorCode === "identity_already_exists" || errorCode === "identity_not_found" || errorCode === "single_identity_not_deletable") {
              return { error };
            }
          }
          return { error };
        }
        const { session, redirectType } = data;
        this._debug("#_initialize()", "detected session in URL", session, "redirect type", redirectType);
        await this._saveSession(session);
        setTimeout(async () => {
          if (redirectType === "recovery") {
            await this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
          } else {
            await this._notifyAllSubscribers("SIGNED_IN", session);
          }
        }, 0);
        return { error: null };
      }
      await this._recoverAndRefresh();
      return { error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ error });
      }
      return this._returnResult({
        error: new AuthUnknownError("Unexpected error during initialization", error)
      });
    } finally {
      await this._handleVisibilityChange();
      this._debug("#_initialize()", "end");
    }
  }
  async signInAnonymously(credentials) {
    var _a, _b, _c;
    try {
      const res = await _request(this.fetch, "POST", `${this.url}/signup`, {
        headers: this.headers,
        body: {
          data: (_b = (_a = credentials === null || credentials === undefined ? undefined : credentials.options) === null || _a === undefined ? undefined : _a.data) !== null && _b !== undefined ? _b : {},
          gotrue_meta_security: { captcha_token: (_c = credentials === null || credentials === undefined ? undefined : credentials.options) === null || _c === undefined ? undefined : _c.captchaToken }
        },
        xform: _sessionResponse
      });
      const { data, error } = res;
      if (error || !data) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      const session = data.session;
      const user = data.user;
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", session);
      }
      return this._returnResult({ data: { user, session }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async signUp(credentials) {
    var _a, _b, _c;
    try {
      let res;
      if ("email" in credentials) {
        const { email, password, options } = credentials;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        res = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: options === null || options === undefined ? undefined : options.emailRedirectTo,
          body: {
            email,
            password,
            data: (_a = options === null || options === undefined ? undefined : options.data) !== null && _a !== undefined ? _a : {},
            gotrue_meta_security: { captcha_token: options === null || options === undefined ? undefined : options.captchaToken },
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod
          },
          xform: _sessionResponse
        });
      } else if ("phone" in credentials) {
        const { phone, password, options } = credentials;
        res = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone,
            password,
            data: (_b = options === null || options === undefined ? undefined : options.data) !== null && _b !== undefined ? _b : {},
            channel: (_c = options === null || options === undefined ? undefined : options.channel) !== null && _c !== undefined ? _c : "sms",
            gotrue_meta_security: { captcha_token: options === null || options === undefined ? undefined : options.captchaToken }
          },
          xform: _sessionResponse
        });
      } else {
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      }
      const { data, error } = res;
      if (error || !data) {
        await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      const session = data.session;
      const user = data.user;
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", session);
      }
      return this._returnResult({ data: { user, session }, error: null });
    } catch (error) {
      await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async signInWithPassword(credentials) {
    try {
      let res;
      if ("email" in credentials) {
        const { email, password, options } = credentials;
        res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            email,
            password,
            gotrue_meta_security: { captcha_token: options === null || options === undefined ? undefined : options.captchaToken }
          },
          xform: _sessionResponsePassword
        });
      } else if ("phone" in credentials) {
        const { phone, password, options } = credentials;
        res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            phone,
            password,
            gotrue_meta_security: { captcha_token: options === null || options === undefined ? undefined : options.captchaToken }
          },
          xform: _sessionResponsePassword
        });
      } else {
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      }
      const { data, error } = res;
      if (error) {
        return this._returnResult({ data: { user: null, session: null }, error });
      } else if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError;
        return this._returnResult({ data: { user: null, session: null }, error: invalidTokenError });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return this._returnResult({
        data: Object.assign({ user: data.user, session: data.session }, data.weak_password ? { weakPassword: data.weak_password } : null),
        error
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async signInWithOAuth(credentials) {
    var _a, _b, _c, _d;
    return await this._handleProviderSignIn(credentials.provider, {
      redirectTo: (_a = credentials.options) === null || _a === undefined ? undefined : _a.redirectTo,
      scopes: (_b = credentials.options) === null || _b === undefined ? undefined : _b.scopes,
      queryParams: (_c = credentials.options) === null || _c === undefined ? undefined : _c.queryParams,
      skipBrowserRedirect: (_d = credentials.options) === null || _d === undefined ? undefined : _d.skipBrowserRedirect
    });
  }
  async exchangeCodeForSession(authCode) {
    await this.initializePromise;
    if (this.lock != null) {
      return this._acquireLock(this.lockAcquireTimeout, async () => {
        return this._exchangeCodeForSession(authCode);
      });
    }
    return this._exchangeCodeForSession(authCode);
  }
  async signInWithWeb3(credentials) {
    const { chain } = credentials;
    switch (chain) {
      case "ethereum":
        return await this.signInWithEthereum(credentials);
      case "solana":
        return await this.signInWithSolana(credentials);
      default:
        throw new Error(`@supabase/auth-js: Unsupported chain "${chain}"`);
    }
  }
  async signInWithEthereum(credentials) {
    var _a, _b, _c, _d, _f, _g, _h, _j, _k, _l, _m;
    let message;
    let signature;
    if ("message" in credentials) {
      message = credentials.message;
      signature = credentials.signature;
    } else {
      const { chain, wallet, statement, options } = credentials;
      let resolvedWallet;
      if (!isBrowser()) {
        if (typeof wallet !== "object" || !(options === null || options === undefined ? undefined : options.url)) {
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        }
        resolvedWallet = wallet;
      } else if (typeof wallet === "object") {
        resolvedWallet = wallet;
      } else {
        const windowAny = window;
        if ("ethereum" in windowAny && typeof windowAny.ethereum === "object" && "request" in windowAny.ethereum && typeof windowAny.ethereum.request === "function") {
          resolvedWallet = windowAny.ethereum;
        } else {
          throw new Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`);
        }
      }
      const url = new URL((_a = options === null || options === undefined ? undefined : options.url) !== null && _a !== undefined ? _a : window.location.href);
      const accounts = await resolvedWallet.request({
        method: "eth_requestAccounts"
      }).then((accs) => accs).catch(() => {
        throw new Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`);
      });
      if (!accounts || accounts.length === 0) {
        throw new Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);
      }
      const address = getAddress(accounts[0]);
      let chainId = (_b = options === null || options === undefined ? undefined : options.signInWithEthereum) === null || _b === undefined ? undefined : _b.chainId;
      if (!chainId) {
        const chainIdHex = await resolvedWallet.request({
          method: "eth_chainId"
        });
        chainId = fromHex(chainIdHex);
      }
      const siweMessage = {
        domain: url.host,
        address,
        statement,
        uri: url.href,
        version: "1",
        chainId,
        nonce: (_c = options === null || options === undefined ? undefined : options.signInWithEthereum) === null || _c === undefined ? undefined : _c.nonce,
        issuedAt: (_f = (_d = options === null || options === undefined ? undefined : options.signInWithEthereum) === null || _d === undefined ? undefined : _d.issuedAt) !== null && _f !== undefined ? _f : new Date,
        expirationTime: (_g = options === null || options === undefined ? undefined : options.signInWithEthereum) === null || _g === undefined ? undefined : _g.expirationTime,
        notBefore: (_h = options === null || options === undefined ? undefined : options.signInWithEthereum) === null || _h === undefined ? undefined : _h.notBefore,
        requestId: (_j = options === null || options === undefined ? undefined : options.signInWithEthereum) === null || _j === undefined ? undefined : _j.requestId,
        resources: (_k = options === null || options === undefined ? undefined : options.signInWithEthereum) === null || _k === undefined ? undefined : _k.resources
      };
      message = createSiweMessage(siweMessage);
      signature = await resolvedWallet.request({
        method: "personal_sign",
        params: [toHex(message), address]
      });
    }
    try {
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({
          chain: "ethereum",
          message,
          signature
        }, ((_l = credentials.options) === null || _l === undefined ? undefined : _l.captchaToken) ? { gotrue_meta_security: { captcha_token: (_m = credentials.options) === null || _m === undefined ? undefined : _m.captchaToken } } : null),
        xform: _sessionResponse
      });
      if (error) {
        throw error;
      }
      if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError;
        return this._returnResult({ data: { user: null, session: null }, error: invalidTokenError });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return this._returnResult({ data: Object.assign({}, data), error });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async signInWithSolana(credentials) {
    var _a, _b, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o;
    let message;
    let signature;
    if ("message" in credentials) {
      message = credentials.message;
      signature = credentials.signature;
    } else {
      const { chain, wallet, statement, options } = credentials;
      let resolvedWallet;
      if (!isBrowser()) {
        if (typeof wallet !== "object" || !(options === null || options === undefined ? undefined : options.url)) {
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        }
        resolvedWallet = wallet;
      } else if (typeof wallet === "object") {
        resolvedWallet = wallet;
      } else {
        const windowAny = window;
        if ("solana" in windowAny && typeof windowAny.solana === "object" && (("signIn" in windowAny.solana) && typeof windowAny.solana.signIn === "function" || ("signMessage" in windowAny.solana) && typeof windowAny.solana.signMessage === "function")) {
          resolvedWallet = windowAny.solana;
        } else {
          throw new Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`);
        }
      }
      const url = new URL((_a = options === null || options === undefined ? undefined : options.url) !== null && _a !== undefined ? _a : window.location.href);
      if ("signIn" in resolvedWallet && resolvedWallet.signIn) {
        const output = await resolvedWallet.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: new Date().toISOString() }, options === null || options === undefined ? undefined : options.signInWithSolana), {
          version: "1",
          domain: url.host,
          uri: url.href
        }), statement ? { statement } : null));
        let outputToProcess;
        if (Array.isArray(output) && output[0] && typeof output[0] === "object") {
          outputToProcess = output[0];
        } else if (output && typeof output === "object" && "signedMessage" in output && "signature" in output) {
          outputToProcess = output;
        } else {
          throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
        }
        if ("signedMessage" in outputToProcess && "signature" in outputToProcess && (typeof outputToProcess.signedMessage === "string" || outputToProcess.signedMessage instanceof Uint8Array) && outputToProcess.signature instanceof Uint8Array) {
          message = typeof outputToProcess.signedMessage === "string" ? outputToProcess.signedMessage : new TextDecoder().decode(outputToProcess.signedMessage);
          signature = outputToProcess.signature;
        } else {
          throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
        }
      } else {
        if (!("signMessage" in resolvedWallet) || typeof resolvedWallet.signMessage !== "function" || !("publicKey" in resolvedWallet) || typeof resolvedWallet !== "object" || !resolvedWallet.publicKey || !("toBase58" in resolvedWallet.publicKey) || typeof resolvedWallet.publicKey.toBase58 !== "function") {
          throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
        }
        message = [
          `${url.host} wants you to sign in with your Solana account:`,
          resolvedWallet.publicKey.toBase58(),
          ...statement ? ["", statement, ""] : [""],
          "Version: 1",
          `URI: ${url.href}`,
          `Issued At: ${(_c = (_b = options === null || options === undefined ? undefined : options.signInWithSolana) === null || _b === undefined ? undefined : _b.issuedAt) !== null && _c !== undefined ? _c : new Date().toISOString()}`,
          ...((_d = options === null || options === undefined ? undefined : options.signInWithSolana) === null || _d === undefined ? undefined : _d.notBefore) ? [`Not Before: ${options.signInWithSolana.notBefore}`] : [],
          ...((_f = options === null || options === undefined ? undefined : options.signInWithSolana) === null || _f === undefined ? undefined : _f.expirationTime) ? [`Expiration Time: ${options.signInWithSolana.expirationTime}`] : [],
          ...((_g = options === null || options === undefined ? undefined : options.signInWithSolana) === null || _g === undefined ? undefined : _g.chainId) ? [`Chain ID: ${options.signInWithSolana.chainId}`] : [],
          ...((_h = options === null || options === undefined ? undefined : options.signInWithSolana) === null || _h === undefined ? undefined : _h.nonce) ? [`Nonce: ${options.signInWithSolana.nonce}`] : [],
          ...((_j = options === null || options === undefined ? undefined : options.signInWithSolana) === null || _j === undefined ? undefined : _j.requestId) ? [`Request ID: ${options.signInWithSolana.requestId}`] : [],
          ...((_l = (_k = options === null || options === undefined ? undefined : options.signInWithSolana) === null || _k === undefined ? undefined : _k.resources) === null || _l === undefined ? undefined : _l.length) ? [
            "Resources",
            ...options.signInWithSolana.resources.map((resource) => `- ${resource}`)
          ] : []
        ].join(`
`);
        const maybeSignature = await resolvedWallet.signMessage(new TextEncoder().encode(message), "utf8");
        if (!maybeSignature || !(maybeSignature instanceof Uint8Array)) {
          throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
        }
        signature = maybeSignature;
      }
    }
    try {
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({ chain: "solana", message, signature: bytesToBase64URL(signature) }, ((_m = credentials.options) === null || _m === undefined ? undefined : _m.captchaToken) ? { gotrue_meta_security: { captcha_token: (_o = credentials.options) === null || _o === undefined ? undefined : _o.captchaToken } } : null),
        xform: _sessionResponse
      });
      if (error) {
        throw error;
      }
      if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError;
        return this._returnResult({ data: { user: null, session: null }, error: invalidTokenError });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return this._returnResult({ data: Object.assign({}, data), error });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async _exchangeCodeForSession(authCode) {
    const storageItem = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
    const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== undefined ? storageItem : "").split("/");
    try {
      if (!codeVerifier && this.flowType === "pkce") {
        throw new AuthPKCECodeVerifierMissingError;
      }
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
        headers: this.headers,
        body: {
          auth_code: authCode,
          code_verifier: codeVerifier
        },
        xform: _sessionResponse
      });
      await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      if (error) {
        throw error;
      }
      if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError;
        return this._returnResult({
          data: { user: null, session: null, redirectType: null },
          error: invalidTokenError
        });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers(redirectType === "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", data.session);
      }
      return this._returnResult({ data: Object.assign(Object.assign({}, data), { redirectType: redirectType !== null && redirectType !== undefined ? redirectType : null }), error });
    } catch (error) {
      await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      if (isAuthError(error)) {
        return this._returnResult({
          data: { user: null, session: null, redirectType: null },
          error
        });
      }
      throw error;
    }
  }
  async signInWithIdToken(credentials) {
    try {
      const { options, provider, token, access_token, nonce } = credentials;
      const res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider,
          id_token: token,
          access_token,
          nonce,
          gotrue_meta_security: { captcha_token: options === null || options === undefined ? undefined : options.captchaToken }
        },
        xform: _sessionResponse
      });
      const { data, error } = res;
      if (error) {
        return this._returnResult({ data: { user: null, session: null }, error });
      } else if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError;
        return this._returnResult({ data: { user: null, session: null }, error: invalidTokenError });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return this._returnResult({ data, error });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async signInWithOtp(credentials) {
    var _a, _b, _c, _d, _f;
    try {
      if ("email" in credentials) {
        const { email, options } = credentials;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        const { error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email,
            data: (_a = options === null || options === undefined ? undefined : options.data) !== null && _a !== undefined ? _a : {},
            create_user: (_b = options === null || options === undefined ? undefined : options.shouldCreateUser) !== null && _b !== undefined ? _b : true,
            gotrue_meta_security: { captcha_token: options === null || options === undefined ? undefined : options.captchaToken },
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod
          },
          redirectTo: options === null || options === undefined ? undefined : options.emailRedirectTo
        });
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      if ("phone" in credentials) {
        const { phone, options } = credentials;
        const { data, error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            phone,
            data: (_c = options === null || options === undefined ? undefined : options.data) !== null && _c !== undefined ? _c : {},
            create_user: (_d = options === null || options === undefined ? undefined : options.shouldCreateUser) !== null && _d !== undefined ? _d : true,
            gotrue_meta_security: { captcha_token: options === null || options === undefined ? undefined : options.captchaToken },
            channel: (_f = options === null || options === undefined ? undefined : options.channel) !== null && _f !== undefined ? _f : "sms"
          }
        });
        return this._returnResult({
          data: { user: null, session: null, messageId: data === null || data === undefined ? undefined : data.message_id },
          error
        });
      }
      throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
    } catch (error) {
      await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async verifyOtp(params) {
    var _a, _b;
    try {
      let redirectTo = undefined;
      let captchaToken = undefined;
      if ("options" in params) {
        redirectTo = (_a = params.options) === null || _a === undefined ? undefined : _a.redirectTo;
        captchaToken = (_b = params.options) === null || _b === undefined ? undefined : _b.captchaToken;
      }
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
        redirectTo,
        xform: _sessionResponse
      });
      if (error) {
        throw error;
      }
      if (!data) {
        const tokenVerificationError = new Error("An error occurred on token verification.");
        throw tokenVerificationError;
      }
      const session = data.session;
      const user = data.user;
      if (session === null || session === undefined ? undefined : session.access_token) {
        await this._saveSession(session);
        await this._notifyAllSubscribers(params.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", session);
      }
      return this._returnResult({ data: { user, session }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async signInWithSSO(params) {
    var _a, _b, _c, _d, _f;
    try {
      let codeChallenge = null;
      let codeChallengeMethod = null;
      if (this.flowType === "pkce") {
        [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
      }
      const result = await _request(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a = params.options) === null || _a === undefined ? undefined : _a.redirectTo) !== null && _b !== undefined ? _b : undefined }), ((_c = params === null || params === undefined ? undefined : params.options) === null || _c === undefined ? undefined : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
        headers: this.headers,
        xform: _ssoResponse
      });
      if (((_d = result.data) === null || _d === undefined ? undefined : _d.url) && isBrowser() && !((_f = params.options) === null || _f === undefined ? undefined : _f.skipBrowserRedirect)) {
        window.location.assign(result.data.url);
      }
      return this._returnResult(result);
    } catch (error) {
      await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async reauthenticate() {
    await this.initializePromise;
    if (this.lock != null) {
      return await this._acquireLock(this.lockAcquireTimeout, async () => {
        return await this._reauthenticate();
      });
    }
    return await this._reauthenticate();
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError)
          throw sessionError;
        if (!session)
          throw new AuthSessionMissingError;
        const { error } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: session.access_token
        });
        return this._returnResult({ data: { user: null, session: null }, error });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async resend(credentials) {
    try {
      const endpoint = `${this.url}/resend`;
      if ("email" in credentials) {
        const { email, type, options } = credentials;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        const { error } = await _request(this.fetch, "POST", endpoint, {
          headers: this.headers,
          body: {
            email,
            type,
            gotrue_meta_security: { captcha_token: options === null || options === undefined ? undefined : options.captchaToken },
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod
          },
          redirectTo: options === null || options === undefined ? undefined : options.emailRedirectTo
        });
        if (error) {
          await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        }
        return this._returnResult({ data: { user: null, session: null }, error });
      } else if ("phone" in credentials) {
        const { phone, type, options } = credentials;
        const { data, error } = await _request(this.fetch, "POST", endpoint, {
          headers: this.headers,
          body: {
            phone,
            type,
            gotrue_meta_security: { captcha_token: options === null || options === undefined ? undefined : options.captchaToken }
          }
        });
        return this._returnResult({
          data: { user: null, session: null, messageId: data === null || data === undefined ? undefined : data.message_id },
          error
        });
      }
      throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
    } catch (error) {
      await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async getSession() {
    await this.initializePromise;
    if (this.lock != null) {
      return await this._acquireLock(this.lockAcquireTimeout, async () => {
        return this._useSession(async (result) => {
          return result;
        });
      });
    }
    return await this._useSession(async (result) => {
      return result;
    });
  }
  async _acquireLock(acquireTimeout, fn) {
    this._debug("#_acquireLock", "begin", acquireTimeout);
    try {
      if (this.lockAcquired) {
        const last = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve();
        const result = (async () => {
          await last;
          return await fn();
        })();
        this.pendingInLock.push((async () => {
          try {
            await result;
          } catch (_e) {}
        })());
        return result;
      }
      return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
        this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
        try {
          this.lockAcquired = true;
          const result = fn();
          this.pendingInLock.push((async () => {
            try {
              await result;
            } catch (e) {}
          })());
          await result;
          while (this.pendingInLock.length) {
            const waitOn = [...this.pendingInLock];
            await Promise.all(waitOn);
            this.pendingInLock.splice(0, waitOn.length);
          }
          return await result;
        } finally {
          this._debug("#_acquireLock", "lock released for storage key", this.storageKey);
          this.lockAcquired = false;
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  async _useSession(fn) {
    this._debug("#_useSession", "begin");
    try {
      const result = await this.__loadSession();
      return await fn(result);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  async __loadSession() {
    this._debug("#__loadSession()", "begin");
    if (this.lock != null && !this.lockAcquired) {
      this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
    }
    try {
      let currentSession = null;
      const maybeSession = await getItemAsync(this.storage, this.storageKey);
      this._debug("#getSession()", "session from storage", maybeSession);
      if (maybeSession !== null) {
        if (this._isValidSession(maybeSession)) {
          currentSession = maybeSession;
        } else {
          this._debug("#getSession()", "session from storage is not valid");
          await this._removeSession();
        }
      }
      if (!currentSession) {
        return { data: { session: null }, error: null };
      }
      const hasExpired = currentSession.expires_at ? currentSession.expires_at * 1000 - Date.now() < EXPIRY_MARGIN_MS : false;
      this._debug("#__loadSession()", `session has${hasExpired ? "" : " not"} expired`, "expires_at", currentSession.expires_at);
      if (!hasExpired) {
        if (this.userStorage) {
          const maybeUser = await getItemAsync(this.userStorage, this.storageKey + "-user");
          if (maybeUser === null || maybeUser === undefined ? undefined : maybeUser.user) {
            currentSession.user = maybeUser.user;
          } else {
            currentSession.user = userNotAvailableProxy();
          }
        }
        if (this.storage.isServer && currentSession.user && !currentSession.user.__isUserNotAvailableProxy) {
          const suppressWarningRef = { value: this.suppressGetSessionWarning };
          currentSession.user = insecureUserWarningProxy(currentSession.user, suppressWarningRef);
          if (suppressWarningRef.value) {
            this.suppressGetSessionWarning = true;
          }
        }
        return { data: { session: currentSession }, error: null };
      }
      const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token);
      if (error) {
        const accessTokenStillValid = !!(currentSession.expires_at && currentSession.expires_at * 1000 > Date.now());
        if (accessTokenStillValid) {
          const stillStored = await getItemAsync(this.storage, this.storageKey);
          if (stillStored && stillStored.refresh_token === currentSession.refresh_token) {
            return this._returnResult({ data: { session: currentSession }, error: null });
          }
        }
        return this._returnResult({ data: { session: null }, error });
      }
      return this._returnResult({ data: { session }, error: null });
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  async getUser(jwt) {
    if (jwt) {
      return await this._getUser(jwt);
    }
    await this.initializePromise;
    let result;
    if (this.lock != null) {
      result = await this._acquireLock(this.lockAcquireTimeout, async () => {
        return await this._getUser();
      });
    } else {
      result = await this._getUser();
    }
    if (result.data.user) {
      this.suppressGetSessionWarning = true;
    }
    return result;
  }
  async _getUser(jwt) {
    try {
      if (jwt) {
        return await _request(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt,
          xform: _userResponse
        });
      }
      return await this._useSession(async (result) => {
        var _a, _b, _c;
        const { data, error } = result;
        if (error) {
          throw error;
        }
        if (!((_a = data.session) === null || _a === undefined ? undefined : _a.access_token) && !this.hasCustomAuthorizationHeader) {
          return { data: { user: null }, error: new AuthSessionMissingError };
        }
        return await _request(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt: (_c = (_b = data.session) === null || _b === undefined ? undefined : _b.access_token) !== null && _c !== undefined ? _c : undefined,
          xform: _userResponse
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        if (isAuthSessionMissingError(error)) {
          await this._removeSession();
          await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        }
        return this._returnResult({ data: { user: null }, error });
      }
      throw error;
    }
  }
  async updateUser(attributes, options = {}) {
    await this.initializePromise;
    if (this.lock != null) {
      return await this._acquireLock(this.lockAcquireTimeout, async () => {
        return await this._updateUser(attributes, options);
      });
    }
    return await this._updateUser(attributes, options);
  }
  async _updateUser(attributes, options = {}) {
    try {
      return await this._useSession(async (result) => {
        const { data: sessionData, error: sessionError } = result;
        if (sessionError) {
          throw sessionError;
        }
        if (!sessionData.session) {
          throw new AuthSessionMissingError;
        }
        const session = sessionData.session;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce" && attributes.email != null) {
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        const { data, error: userError } = await _request(this.fetch, "PUT", `${this.url}/user`, {
          headers: this.headers,
          redirectTo: options === null || options === undefined ? undefined : options.emailRedirectTo,
          body: Object.assign(Object.assign({}, attributes), { code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
          jwt: session.access_token,
          xform: _userResponse
        });
        if (userError) {
          throw userError;
        }
        session.user = data.user;
        await this._saveSession(session);
        await this._notifyAllSubscribers("USER_UPDATED", session);
        return this._returnResult({ data: { user: session.user }, error: null });
      });
    } catch (error) {
      await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null }, error });
      }
      throw error;
    }
  }
  async setSession(currentSession) {
    await this.initializePromise;
    if (this.lock != null) {
      return await this._acquireLock(this.lockAcquireTimeout, async () => {
        return await this._setSession(currentSession);
      });
    }
    return await this._setSession(currentSession);
  }
  async _setSession(currentSession) {
    try {
      if (!currentSession.access_token || !currentSession.refresh_token) {
        throw new AuthSessionMissingError;
      }
      const timeNow = Date.now() / 1000;
      let expiresAt2 = timeNow;
      let hasExpired = true;
      let session = null;
      const { payload } = decodeJWT(currentSession.access_token);
      if (payload.exp) {
        expiresAt2 = payload.exp;
        hasExpired = expiresAt2 <= timeNow;
      }
      if (hasExpired) {
        const { data: refreshedSession, error } = await this._callRefreshToken(currentSession.refresh_token);
        if (error) {
          return this._returnResult({ data: { user: null, session: null }, error });
        }
        if (!refreshedSession) {
          return { data: { user: null, session: null }, error: null };
        }
        session = refreshedSession;
      } else {
        const { data, error } = await this._getUser(currentSession.access_token);
        if (error) {
          return this._returnResult({ data: { user: null, session: null }, error });
        }
        session = {
          access_token: currentSession.access_token,
          refresh_token: currentSession.refresh_token,
          user: data.user,
          token_type: "bearer",
          expires_in: expiresAt2 - timeNow,
          expires_at: expiresAt2
        };
        await this._saveSession(session);
        await this._notifyAllSubscribers("SIGNED_IN", session);
      }
      return this._returnResult({ data: { user: session.user, session }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { session: null, user: null }, error });
      }
      throw error;
    }
  }
  async refreshSession(currentSession) {
    await this.initializePromise;
    if (this.lock != null) {
      return await this._acquireLock(this.lockAcquireTimeout, async () => {
        return await this._refreshSession(currentSession);
      });
    }
    return await this._refreshSession(currentSession);
  }
  async _refreshSession(currentSession) {
    try {
      return await this._useSession(async (result) => {
        var _a;
        if (!currentSession) {
          const { data, error: error2 } = result;
          if (error2) {
            throw error2;
          }
          currentSession = (_a = data.session) !== null && _a !== undefined ? _a : undefined;
        }
        if (!(currentSession === null || currentSession === undefined ? undefined : currentSession.refresh_token)) {
          throw new AuthSessionMissingError;
        }
        const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token);
        if (error) {
          return this._returnResult({ data: { user: null, session: null }, error });
        }
        if (!session) {
          return this._returnResult({ data: { user: null, session: null }, error: null });
        }
        return this._returnResult({ data: { user: session.user, session }, error: null });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error });
      }
      throw error;
    }
  }
  async _getSessionFromURL(params, callbackUrlType) {
    var _a;
    try {
      if (!isBrowser())
        throw new AuthImplicitGrantRedirectError("No browser detected.");
      if (params.error || params.error_description || params.error_code) {
        throw new AuthImplicitGrantRedirectError(params.error_description || "Error in URL with unspecified error_description", {
          error: params.error || "unspecified_error",
          code: params.error_code || "unspecified_code"
        });
      }
      switch (callbackUrlType) {
        case "implicit":
          if (this.flowType === "pkce") {
            throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
          }
          break;
        case "pkce":
          if (this.flowType === "implicit") {
            throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
          }
          break;
        default:
      }
      if (callbackUrlType === "pkce") {
        this._debug("#_initialize()", "begin", "is PKCE flow", true);
        if (!params.code)
          throw new AuthPKCEGrantCodeExchangeError("No code detected.");
        const { data: data2, error: error2 } = await this._exchangeCodeForSession(params.code);
        if (error2)
          throw error2;
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        window.history.replaceState(window.history.state, "", url.toString());
        return {
          data: { session: data2.session, redirectType: (_a = data2.redirectType) !== null && _a !== undefined ? _a : null },
          error: null
        };
      }
      const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type } = params;
      if (!access_token || !expires_in || !refresh_token || !token_type) {
        throw new AuthImplicitGrantRedirectError("No session defined in URL");
      }
      const timeNow = Math.round(Date.now() / 1000);
      const expiresIn = parseInt(expires_in);
      let expiresAt2 = timeNow + expiresIn;
      if (expires_at) {
        expiresAt2 = parseInt(expires_at);
      }
      const actuallyExpiresIn = expiresAt2 - timeNow;
      if (actuallyExpiresIn * 1000 <= AUTO_REFRESH_TICK_DURATION_MS) {
        console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
      }
      const issuedAt = expiresAt2 - expiresIn;
      if (timeNow - issuedAt >= 120) {
        console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", issuedAt, expiresAt2, timeNow);
      } else if (timeNow - issuedAt < 0) {
        console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", issuedAt, expiresAt2, timeNow);
      }
      const { data, error } = await this._getUser(access_token);
      if (error)
        throw error;
      const session = {
        provider_token,
        provider_refresh_token,
        access_token,
        expires_in: expiresIn,
        expires_at: expiresAt2,
        refresh_token,
        token_type,
        user: data.user
      };
      window.location.hash = "";
      this._debug("#_getSessionFromURL()", "clearing window.location.hash");
      return this._returnResult({ data: { session, redirectType: params.type }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { session: null, redirectType: null }, error });
      }
      throw error;
    }
  }
  _isImplicitGrantCallback(params) {
    if (typeof this.detectSessionInUrl === "function") {
      return this.detectSessionInUrl(new URL(window.location.href), params);
    }
    return Boolean(params.access_token || params.error || params.error_description || params.error_code);
  }
  async _isPKCECallback(params) {
    const currentStorageContent = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
    return !!(params.code && currentStorageContent);
  }
  async signOut(options = { scope: "global" }) {
    await this.initializePromise;
    if (this.lock != null) {
      return await this._acquireLock(this.lockAcquireTimeout, async () => {
        return await this._signOut(options);
      });
    }
    return await this._signOut(options);
  }
  async _signOut({ scope } = { scope: "global" }) {
    return await this._useSession(async (result) => {
      var _a;
      const { data, error: sessionError } = result;
      if (sessionError && !isAuthSessionMissingError(sessionError)) {
        return this._returnResult({ error: sessionError });
      }
      const accessToken = (_a = data.session) === null || _a === undefined ? undefined : _a.access_token;
      if (accessToken) {
        const { error } = await this.admin.signOut(accessToken, scope);
        if (error) {
          if (!(isAuthApiError(error) && (error.status === 404 || error.status === 401 || error.status === 403) || isAuthSessionMissingError(error))) {
            return this._returnResult({ error });
          }
        }
      }
      if (scope !== "others") {
        await this._removeSession();
        await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      }
      return this._returnResult({ error: null });
    });
  }
  onAuthStateChange(callback) {
    const id = generateCallbackId();
    const subscription = {
      id,
      callback,
      unsubscribe: () => {
        this._debug("#unsubscribe()", "state change callback with id removed", id);
        this.stateChangeEmitters.delete(id);
      }
    };
    this._debug("#onAuthStateChange()", "registered callback with id", id);
    this.stateChangeEmitters.set(id, subscription);
    (async () => {
      await this.initializePromise;
      if (this.lock != null) {
        await this._acquireLock(this.lockAcquireTimeout, async () => {
          this._emitInitialSession(id);
        });
      } else {
        await this._emitInitialSession(id);
      }
    })();
    return { data: { subscription } };
  }
  async _emitInitialSession(id) {
    return await this._useSession(async (result) => {
      var _a, _b;
      try {
        const { data: { session }, error } = result;
        if (error)
          throw error;
        await ((_a = this.stateChangeEmitters.get(id)) === null || _a === undefined ? undefined : _a.callback("INITIAL_SESSION", session));
        this._debug("INITIAL_SESSION", "callback id", id, "session", session);
      } catch (err) {
        await ((_b = this.stateChangeEmitters.get(id)) === null || _b === undefined ? undefined : _b.callback("INITIAL_SESSION", null));
        this._debug("INITIAL_SESSION", "callback id", id, "error", err);
        if (isAuthSessionMissingError(err)) {
          console.warn(err);
        } else {
          console.error(err);
        }
      }
    });
  }
  async resetPasswordForEmail(email, options = {}) {
    let codeChallenge = null;
    let codeChallengeMethod = null;
    if (this.flowType === "pkce") {
      [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey, true);
    }
    try {
      return await _request(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email,
          code_challenge: codeChallenge,
          code_challenge_method: codeChallengeMethod,
          gotrue_meta_security: { captcha_token: options.captchaToken }
        },
        headers: this.headers,
        redirectTo: options.redirectTo
      });
    } catch (error) {
      await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async getUserIdentities() {
    var _a;
    try {
      const { data, error } = await this.getUser();
      if (error)
        throw error;
      return this._returnResult({ data: { identities: (_a = data.user.identities) !== null && _a !== undefined ? _a : [] }, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async linkIdentity(credentials) {
    if ("token" in credentials) {
      return this.linkIdentityIdToken(credentials);
    }
    return this.linkIdentityOAuth(credentials);
  }
  async linkIdentityOAuth(credentials) {
    var _a;
    try {
      const { data, error } = await this._useSession(async (result) => {
        var _a2, _b, _c, _d, _f;
        const { data: data2, error: error2 } = result;
        if (error2)
          throw error2;
        const url = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
          redirectTo: (_a2 = credentials.options) === null || _a2 === undefined ? undefined : _a2.redirectTo,
          scopes: (_b = credentials.options) === null || _b === undefined ? undefined : _b.scopes,
          queryParams: (_c = credentials.options) === null || _c === undefined ? undefined : _c.queryParams,
          skipBrowserRedirect: true
        });
        return await _request(this.fetch, "GET", url, {
          headers: this.headers,
          jwt: (_f = (_d = data2.session) === null || _d === undefined ? undefined : _d.access_token) !== null && _f !== undefined ? _f : undefined
        });
      });
      if (error)
        throw error;
      if (isBrowser() && !((_a = credentials.options) === null || _a === undefined ? undefined : _a.skipBrowserRedirect)) {
        window.location.assign(data === null || data === undefined ? undefined : data.url);
      }
      return this._returnResult({
        data: { provider: credentials.provider, url: data === null || data === undefined ? undefined : data.url },
        error: null
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { provider: credentials.provider, url: null }, error });
      }
      throw error;
    }
  }
  async linkIdentityIdToken(credentials) {
    return await this._useSession(async (result) => {
      var _a;
      try {
        const { error: sessionError, data: { session } } = result;
        if (sessionError)
          throw sessionError;
        const { options, provider, token, access_token, nonce } = credentials;
        const res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
          headers: this.headers,
          jwt: (_a = session === null || session === undefined ? undefined : session.access_token) !== null && _a !== undefined ? _a : undefined,
          body: {
            provider,
            id_token: token,
            access_token,
            nonce,
            link_identity: true,
            gotrue_meta_security: { captcha_token: options === null || options === undefined ? undefined : options.captchaToken }
          },
          xform: _sessionResponse
        });
        const { data, error } = res;
        if (error) {
          return this._returnResult({ data: { user: null, session: null }, error });
        } else if (!data || !data.session || !data.user) {
          return this._returnResult({
            data: { user: null, session: null },
            error: new AuthInvalidTokenResponseError
          });
        }
        if (data.session) {
          await this._saveSession(data.session);
          await this._notifyAllSubscribers("USER_UPDATED", data.session);
        }
        return this._returnResult({ data, error });
      } catch (error) {
        await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        if (isAuthError(error)) {
          return this._returnResult({ data: { user: null, session: null }, error });
        }
        throw error;
      }
    });
  }
  async unlinkIdentity(identity) {
    try {
      return await this._useSession(async (result) => {
        var _a, _b;
        const { data, error } = result;
        if (error) {
          throw error;
        }
        return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${identity.identity_id}`, {
          headers: this.headers,
          jwt: (_b = (_a = data.session) === null || _a === undefined ? undefined : _a.access_token) !== null && _b !== undefined ? _b : undefined
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _refreshAccessToken(refreshToken) {
    const debugName = `#_refreshAccessToken()`;
    this._debug(debugName, "begin");
    try {
      const startedAt = Date.now();
      return await retryable(async (attempt) => {
        if (attempt > 0) {
          await sleep2(200 * Math.pow(2, attempt - 1));
        }
        this._debug(debugName, "refreshing attempt", attempt);
        return await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
          body: { refresh_token: refreshToken },
          headers: this.headers,
          xform: _sessionResponse
        });
      }, (attempt, error) => {
        const nextBackOffInterval = 200 * Math.pow(2, attempt);
        return error && isAuthRetryableFetchError(error) && Date.now() + nextBackOffInterval - startedAt < AUTO_REFRESH_TICK_DURATION_MS;
      });
    } catch (error) {
      this._debug(debugName, "error", error);
      if (isAuthError(error)) {
        return this._returnResult({ data: { session: null, user: null }, error });
      }
      throw error;
    } finally {
      this._debug(debugName, "end");
    }
  }
  _isValidSession(maybeSession) {
    const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
    return isValidSession;
  }
  async _handleProviderSignIn(provider, options) {
    const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
      redirectTo: options.redirectTo,
      scopes: options.scopes,
      queryParams: options.queryParams
    });
    this._debug("#_handleProviderSignIn()", "provider", provider, "options", options, "url", url);
    if (isBrowser() && !options.skipBrowserRedirect) {
      window.location.assign(url);
    }
    return { data: { provider, url }, error: null };
  }
  async _recoverAndRefresh() {
    var _a, _b;
    const debugName = "#_recoverAndRefresh()";
    this._debug(debugName, "begin");
    try {
      const currentSession = await getItemAsync(this.storage, this.storageKey);
      if (currentSession && this.userStorage) {
        let maybeUser = await getItemAsync(this.userStorage, this.storageKey + "-user");
        if (!this.storage.isServer && Object.is(this.storage, this.userStorage) && !maybeUser) {
          maybeUser = { user: currentSession.user };
          await setItemAsync(this.userStorage, this.storageKey + "-user", maybeUser);
        }
        currentSession.user = (_a = maybeUser === null || maybeUser === undefined ? undefined : maybeUser.user) !== null && _a !== undefined ? _a : userNotAvailableProxy();
      } else if (currentSession && !currentSession.user) {
        if (!currentSession.user) {
          const separateUser = await getItemAsync(this.storage, this.storageKey + "-user");
          if (separateUser && (separateUser === null || separateUser === undefined ? undefined : separateUser.user)) {
            currentSession.user = separateUser.user;
            await removeItemAsync(this.storage, this.storageKey + "-user");
            await setItemAsync(this.storage, this.storageKey, currentSession);
          } else {
            currentSession.user = userNotAvailableProxy();
          }
        }
      }
      this._debug(debugName, "session from storage", currentSession);
      if (!this._isValidSession(currentSession)) {
        this._debug(debugName, "session is not valid");
        if (currentSession !== null) {
          await this._removeSession();
        }
        return;
      }
      const expiresWithMargin = ((_b = currentSession.expires_at) !== null && _b !== undefined ? _b : Infinity) * 1000 - Date.now() < EXPIRY_MARGIN_MS;
      this._debug(debugName, `session has${expiresWithMargin ? "" : " not"} expired with margin of ${EXPIRY_MARGIN_MS}s`);
      if (expiresWithMargin) {
        if (this.autoRefreshToken && currentSession.refresh_token) {
          const { error } = await this._callRefreshToken(currentSession.refresh_token);
          if (error) {
            if (isAuthRefreshDiscardedError(error)) {
              this._debug(debugName, "refresh discarded by commit guard", error);
            } else {
              this._debug(debugName, "refresh failed", error);
            }
          }
        }
      } else if (currentSession.user && currentSession.user.__isUserNotAvailableProxy === true) {
        try {
          const { data, error: userError } = await this._getUser(currentSession.access_token);
          if (!userError && (data === null || data === undefined ? undefined : data.user)) {
            currentSession.user = data.user;
            await this._saveSession(currentSession);
            await this._notifyAllSubscribers("SIGNED_IN", currentSession);
          } else {
            this._debug(debugName, "could not get user data, skipping SIGNED_IN notification");
          }
        } catch (getUserError) {
          console.error("Error getting user data:", getUserError);
          this._debug(debugName, "error getting user data, skipping SIGNED_IN notification", getUserError);
        }
      } else {
        await this._notifyAllSubscribers("SIGNED_IN", currentSession);
      }
    } catch (err) {
      this._debug(debugName, "error", err);
      console.error(err);
      return;
    } finally {
      this._debug(debugName, "end");
    }
  }
  async _callRefreshToken(refreshToken) {
    var _a, _b;
    if (!refreshToken) {
      throw new AuthSessionMissingError;
    }
    if (this.refreshingDeferred) {
      return this.refreshingDeferred.promise;
    }
    if (this.lastRefreshFailure && this.lastRefreshFailure.refreshToken === refreshToken && Date.now() < this.lastRefreshFailure.expiresAt) {
      this._debug("#_callRefreshToken()", "returning cached failure (cooldown active)");
      return this.lastRefreshFailure.result;
    }
    const debugName = `#_callRefreshToken()`;
    this._debug(debugName, "begin");
    try {
      this.refreshingDeferred = new Deferred;
      const storedAtStart = await getItemAsync(this.storage, this.storageKey);
      const { data, error } = await this._refreshAccessToken(refreshToken);
      if (error)
        throw error;
      if (!data.session)
        throw new AuthSessionMissingError;
      const storedAfter = await getItemAsync(this.storage, this.storageKey);
      const storageChangedUnderUs = storedAtStart !== null && (storedAfter === null || storedAfter.refresh_token !== storedAtStart.refresh_token);
      if (storageChangedUnderUs) {
        this._debug(debugName, "commit guard: storage changed since refresh started, discarding rotated tokens", {
          startedWith: "present",
          nowHolds: storedAfter ? "replaced" : "cleared"
        });
        const discarded = {
          data: null,
          error: new AuthRefreshDiscardedError
        };
        this.refreshingDeferred.resolve(discarded);
        return discarded;
      }
      const epochBeforeSave = this._sessionRemovalEpoch;
      await this._saveSession(data.session);
      if (this._sessionRemovalEpoch !== epochBeforeSave) {
        this._debug(debugName, "commit guard (post-save): _removeSession ran during _saveSession, undoing write");
        await removeItemAsync(this.storage, this.storageKey);
        if (this.userStorage) {
          await removeItemAsync(this.userStorage, this.storageKey + "-user");
        }
        const discarded = {
          data: null,
          error: new AuthRefreshDiscardedError
        };
        this.refreshingDeferred.resolve(discarded);
        return discarded;
      }
      await this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
      const result = { data: data.session, error: null };
      this.lastRefreshFailure = null;
      this.refreshingDeferred.resolve(result);
      return result;
    } catch (error) {
      this._debug(debugName, "error", error);
      if (isAuthError(error)) {
        const result = { data: null, error };
        if (!isAuthRetryableFetchError(error)) {
          const storedNow = await getItemAsync(this.storage, this.storageKey);
          const accessTokenStillValid = !!((storedNow === null || storedNow === undefined ? undefined : storedNow.expires_at) && storedNow.expires_at * 1000 > Date.now());
          if (accessTokenStillValid) {
            this._debug(debugName, "proactive refresh failed, access token still valid — preserving session");
          } else {
            await this._removeSession();
          }
        }
        this.lastRefreshFailure = {
          refreshToken,
          result,
          expiresAt: Date.now() + REFRESH_FAILURE_COOLDOWN_MS
        };
        (_a = this.refreshingDeferred) === null || _a === undefined || _a.resolve(result);
        return result;
      }
      (_b = this.refreshingDeferred) === null || _b === undefined || _b.reject(error);
      throw error;
    } finally {
      this.refreshingDeferred = null;
      this._debug(debugName, "end");
    }
  }
  async _notifyAllSubscribers(event, session, broadcast = true) {
    const debugName = `#_notifyAllSubscribers(${event})`;
    this._debug(debugName, "begin", session, `broadcast = ${broadcast}`);
    try {
      if (this.broadcastChannel && broadcast) {
        this.broadcastChannel.postMessage({ event, session });
      }
      const errors = [];
      const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
        try {
          await x.callback(event, session);
        } catch (e) {
          errors.push(e);
        }
      });
      await Promise.all(promises);
      if (errors.length > 0) {
        for (let i = 0;i < errors.length; i += 1) {
          console.error(errors[i]);
        }
        throw errors[0];
      }
    } finally {
      this._debug(debugName, "end");
    }
  }
  async _saveSession(session) {
    this._debug("#_saveSession()", session);
    this.suppressGetSessionWarning = true;
    await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
    const sessionToProcess = Object.assign({}, session);
    const userIsProxy = sessionToProcess.user && sessionToProcess.user.__isUserNotAvailableProxy === true;
    if (this.userStorage) {
      if (!userIsProxy && sessionToProcess.user) {
        await setItemAsync(this.userStorage, this.storageKey + "-user", {
          user: sessionToProcess.user
        });
      } else if (userIsProxy) {}
      const mainSessionData = Object.assign({}, sessionToProcess);
      delete mainSessionData.user;
      const clonedMainSessionData = deepClone(mainSessionData);
      await setItemAsync(this.storage, this.storageKey, clonedMainSessionData);
    } else {
      const clonedSession = deepClone(sessionToProcess);
      await setItemAsync(this.storage, this.storageKey, clonedSession);
    }
  }
  async _removeSession() {
    this._sessionRemovalEpoch += 1;
    this._debug("#_removeSession()");
    this.lastRefreshFailure = null;
    this.suppressGetSessionWarning = false;
    await removeItemAsync(this.storage, this.storageKey);
    await removeItemAsync(this.storage, this.storageKey + "-code-verifier");
    await removeItemAsync(this.storage, this.storageKey + "-user");
    if (this.userStorage) {
      await removeItemAsync(this.userStorage, this.storageKey + "-user");
    }
    await this._notifyAllSubscribers("SIGNED_OUT", null);
  }
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const callback = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      if (callback && isBrowser() && (window === null || window === undefined ? undefined : window.removeEventListener)) {
        window.removeEventListener("visibilitychange", callback);
      }
    } catch (e) {
      console.error("removing visibilitychange callback failed", e);
    }
  }
  async _startAutoRefresh() {
    await this._stopAutoRefresh();
    this._debug("#_startAutoRefresh()");
    const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION_MS);
    this.autoRefreshTicker = ticker;
    if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
      ticker.unref();
    } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
      Deno.unrefTimer(ticker);
    }
    const timeout = setTimeout(async () => {
      await this.initializePromise;
      await this._autoRefreshTokenTick();
    }, 0);
    this.autoRefreshTickTimeout = timeout;
    if (timeout && typeof timeout === "object" && typeof timeout.unref === "function") {
      timeout.unref();
    } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
      Deno.unrefTimer(timeout);
    }
  }
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const ticker = this.autoRefreshTicker;
    this.autoRefreshTicker = null;
    if (ticker) {
      clearInterval(ticker);
    }
    const timeout = this.autoRefreshTickTimeout;
    this.autoRefreshTickTimeout = null;
    if (timeout) {
      clearTimeout(timeout);
    }
  }
  async startAutoRefresh() {
    this._removeVisibilityChangedCallback();
    await this._startAutoRefresh();
  }
  async stopAutoRefresh() {
    this._removeVisibilityChangedCallback();
    await this._stopAutoRefresh();
  }
  async dispose() {
    var _a;
    this._removeVisibilityChangedCallback();
    await this._stopAutoRefresh();
    (_a = this.broadcastChannel) === null || _a === undefined || _a.close();
    this.broadcastChannel = null;
    this.stateChangeEmitters.clear();
  }
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    if (this.lock != null) {
      try {
        await this._acquireLock(0, async () => {
          try {
            const now = Date.now();
            try {
              return await this._useSession(async (result) => {
                const { data: { session } } = result;
                if (!session || !session.refresh_token || !session.expires_at) {
                  this._debug("#_autoRefreshTokenTick()", "no session");
                  return;
                }
                const expiresInTicks = Math.floor((session.expires_at * 1000 - now) / AUTO_REFRESH_TICK_DURATION_MS);
                this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`);
                if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
                  await this._callRefreshToken(session.refresh_token);
                }
              });
            } catch (e) {
              console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
            }
          } finally {
            this._debug("#_autoRefreshTokenTick()", "end");
          }
        });
      } catch (e) {
        if (e instanceof LockAcquireTimeoutError) {
          this._debug("auto refresh token tick lock not available");
        } else {
          throw e;
        }
      }
      return;
    }
    if (this.refreshingDeferred !== null) {
      this._debug("#_autoRefreshTokenTick()", "refresh already in flight, skipping");
      return;
    }
    try {
      const now = Date.now();
      try {
        await this._useSession(async (result) => {
          const { data: { session } } = result;
          if (!session || !session.refresh_token || !session.expires_at) {
            this._debug("#_autoRefreshTokenTick()", "no session");
            return;
          }
          const expiresInTicks = Math.floor((session.expires_at * 1000 - now) / AUTO_REFRESH_TICK_DURATION_MS);
          this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`);
          if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
            await this._callRefreshToken(session.refresh_token);
          }
        });
      } catch (e) {
        console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
      }
    } finally {
      this._debug("#_autoRefreshTokenTick()", "end");
    }
  }
  async _handleVisibilityChange() {
    this._debug("#_handleVisibilityChange()");
    if (!isBrowser() || !(window === null || window === undefined ? undefined : window.addEventListener)) {
      if (this.autoRefreshToken) {
        this.startAutoRefresh();
      }
      return false;
    }
    try {
      this.visibilityChangedCallback = async () => {
        try {
          await this._onVisibilityChanged(false);
        } catch (error) {
          this._debug("#visibilityChangedCallback", "error", error);
        }
      };
      window === null || window === undefined || window.addEventListener("visibilitychange", this.visibilityChangedCallback);
      await this._onVisibilityChanged(true);
    } catch (error) {
      console.error("_handleVisibilityChange", error);
    }
  }
  async _onVisibilityChanged(calledFromInitialize) {
    const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
    this._debug(methodName, "visibilityState", document.visibilityState);
    if (document.visibilityState === "visible") {
      if (this.autoRefreshToken) {
        this._startAutoRefresh();
      }
      if (!calledFromInitialize) {
        await this.initializePromise;
        if (this.lock != null) {
          await this._acquireLock(this.lockAcquireTimeout, async () => {
            if (document.visibilityState !== "visible") {
              this._debug(methodName, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
              return;
            }
            await this._recoverAndRefresh();
          });
        } else {
          if (document.visibilityState !== "visible") {
            this._debug(methodName, "visibilityState is no longer visible, skipping recovery");
            return;
          }
          await this._recoverAndRefresh();
        }
      }
    } else if (document.visibilityState === "hidden") {
      if (this.autoRefreshToken) {
        this._stopAutoRefresh();
      }
    }
  }
  async _getUrlForProvider(url, provider, options) {
    const urlParams = [`provider=${encodeURIComponent(provider)}`];
    if (options === null || options === undefined ? undefined : options.redirectTo) {
      urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
    }
    if (options === null || options === undefined ? undefined : options.scopes) {
      urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
    }
    if (this.flowType === "pkce") {
      const [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
      const flowParams = new URLSearchParams({
        code_challenge: `${encodeURIComponent(codeChallenge)}`,
        code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
      });
      urlParams.push(flowParams.toString());
    }
    if (options === null || options === undefined ? undefined : options.queryParams) {
      const query = new URLSearchParams(options.queryParams);
      urlParams.push(query.toString());
    }
    if (options === null || options === undefined ? undefined : options.skipBrowserRedirect) {
      urlParams.push(`skip_http_redirect=${options.skipBrowserRedirect}`);
    }
    return `${url}?${urlParams.join("&")}`;
  }
  async _unenroll(params) {
    try {
      return await this._useSession(async (result) => {
        var _a;
        const { data: sessionData, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        return await _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
          headers: this.headers,
          jwt: (_a = sessionData === null || sessionData === undefined ? undefined : sessionData.session) === null || _a === undefined ? undefined : _a.access_token
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _enroll(params) {
    try {
      return await this._useSession(async (result) => {
        var _a, _b;
        const { data: sessionData, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        const body = Object.assign({ friendly_name: params.friendlyName, factor_type: params.factorType }, params.factorType === "phone" ? { phone: params.phone } : params.factorType === "totp" ? { issuer: params.issuer } : {});
        const { data, error } = await _request(this.fetch, "POST", `${this.url}/factors`, {
          body,
          headers: this.headers,
          jwt: (_a = sessionData === null || sessionData === undefined ? undefined : sessionData.session) === null || _a === undefined ? undefined : _a.access_token
        });
        if (error) {
          return this._returnResult({ data: null, error });
        }
        if (params.factorType === "totp" && data.type === "totp" && ((_b = data === null || data === undefined ? undefined : data.totp) === null || _b === undefined ? undefined : _b.qr_code)) {
          data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
        }
        return this._returnResult({ data, error: null });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _verify(params) {
    const run = async () => {
      try {
        return await this._useSession(async (result) => {
          var _a;
          const { data: sessionData, error: sessionError } = result;
          if (sessionError) {
            return this._returnResult({ data: null, error: sessionError });
          }
          const body = Object.assign({ challenge_id: params.challengeId }, "webauthn" in params ? {
            webauthn: Object.assign(Object.assign({}, params.webauthn), { credential_response: params.webauthn.type === "create" ? serializeCredentialCreationResponse(params.webauthn.credential_response) : serializeCredentialRequestResponse(params.webauthn.credential_response) })
          } : { code: params.code });
          const { data, error } = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
            body,
            headers: this.headers,
            jwt: (_a = sessionData === null || sessionData === undefined ? undefined : sessionData.session) === null || _a === undefined ? undefined : _a.access_token
          });
          if (error) {
            return this._returnResult({ data: null, error });
          }
          await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1000) + data.expires_in }, data));
          await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
          return this._returnResult({ data, error });
        });
      } catch (error) {
        if (isAuthError(error)) {
          return this._returnResult({ data: null, error });
        }
        throw error;
      }
    };
    if (this.lock != null) {
      return this._acquireLock(this.lockAcquireTimeout, run);
    }
    return run();
  }
  async _challenge(params) {
    const run = async () => {
      try {
        return await this._useSession(async (result) => {
          var _a;
          const { data: sessionData, error: sessionError } = result;
          if (sessionError) {
            return this._returnResult({ data: null, error: sessionError });
          }
          const response = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
            body: params,
            headers: this.headers,
            jwt: (_a = sessionData === null || sessionData === undefined ? undefined : sessionData.session) === null || _a === undefined ? undefined : _a.access_token
          });
          if (response.error) {
            return response;
          }
          const { data } = response;
          if (data.type !== "webauthn") {
            return { data, error: null };
          }
          switch (data.webauthn.type) {
            case "create":
              return {
                data: Object.assign(Object.assign({}, data), { webauthn: Object.assign(Object.assign({}, data.webauthn), { credential_options: Object.assign(Object.assign({}, data.webauthn.credential_options), { publicKey: deserializeCredentialCreationOptions(data.webauthn.credential_options.publicKey) }) }) }),
                error: null
              };
            case "request":
              return {
                data: Object.assign(Object.assign({}, data), { webauthn: Object.assign(Object.assign({}, data.webauthn), { credential_options: Object.assign(Object.assign({}, data.webauthn.credential_options), { publicKey: deserializeCredentialRequestOptions(data.webauthn.credential_options.publicKey) }) }) }),
                error: null
              };
          }
        });
      } catch (error) {
        if (isAuthError(error)) {
          return this._returnResult({ data: null, error });
        }
        throw error;
      }
    };
    if (this.lock != null) {
      return this._acquireLock(this.lockAcquireTimeout, run);
    }
    return run();
  }
  async _challengeAndVerify(params) {
    const { data: challengeData, error: challengeError } = await this._challenge({
      factorId: params.factorId
    });
    if (challengeError) {
      return this._returnResult({ data: null, error: challengeError });
    }
    return await this._verify({
      factorId: params.factorId,
      challengeId: challengeData.id,
      code: params.code
    });
  }
  async _listFactors() {
    var _a;
    const { data: { user }, error: userError } = await this.getUser();
    if (userError) {
      return { data: null, error: userError };
    }
    const data = {
      all: [],
      phone: [],
      totp: [],
      webauthn: []
    };
    for (const factor of (_a = user === null || user === undefined ? undefined : user.factors) !== null && _a !== undefined ? _a : []) {
      data.all.push(factor);
      if (factor.status === "verified") {
        data[factor.factor_type].push(factor);
      }
    }
    return {
      data,
      error: null
    };
  }
  async _getAuthenticatorAssuranceLevel(jwt) {
    var _a, _b, _c, _d;
    if (jwt) {
      try {
        const { payload: payload2 } = decodeJWT(jwt);
        let currentLevel2 = null;
        if (payload2.aal) {
          currentLevel2 = payload2.aal;
        }
        let nextLevel2 = currentLevel2;
        const { data: { user }, error: userError } = await this.getUser(jwt);
        if (userError) {
          return this._returnResult({ data: null, error: userError });
        }
        const verifiedFactors2 = (_b = (_a = user === null || user === undefined ? undefined : user.factors) === null || _a === undefined ? undefined : _a.filter((factor) => factor.status === "verified")) !== null && _b !== undefined ? _b : [];
        if (verifiedFactors2.length > 0) {
          nextLevel2 = "aal2";
        }
        const currentAuthenticationMethods2 = payload2.amr || [];
        return { data: { currentLevel: currentLevel2, nextLevel: nextLevel2, currentAuthenticationMethods: currentAuthenticationMethods2 }, error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return this._returnResult({ data: null, error });
        }
        throw error;
      }
    }
    const { data: { session }, error: sessionError } = await this.getSession();
    if (sessionError) {
      return this._returnResult({ data: null, error: sessionError });
    }
    if (!session) {
      return {
        data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
        error: null
      };
    }
    const { payload } = decodeJWT(session.access_token);
    let currentLevel = null;
    if (payload.aal) {
      currentLevel = payload.aal;
    }
    let nextLevel = currentLevel;
    const verifiedFactors = (_d = (_c = session.user.factors) === null || _c === undefined ? undefined : _c.filter((factor) => factor.status === "verified")) !== null && _d !== undefined ? _d : [];
    if (verifiedFactors.length > 0) {
      nextLevel = "aal2";
    }
    const currentAuthenticationMethods = payload.amr || [];
    return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
  }
  async _getAuthorizationDetails(authorizationId) {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError });
        }
        return await _request(this.fetch, "GET", `${this.url}/oauth/authorizations/${authorizationId}`, {
          headers: this.headers,
          jwt: session.access_token,
          xform: (data) => ({ data, error: null })
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _approveAuthorization(authorizationId, options) {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError });
        }
        const response = await _request(this.fetch, "POST", `${this.url}/oauth/authorizations/${authorizationId}/consent`, {
          headers: this.headers,
          jwt: session.access_token,
          body: { action: "approve" },
          xform: (data) => ({ data, error: null })
        });
        if (response.data && response.data.redirect_url) {
          if (isBrowser() && !(options === null || options === undefined ? undefined : options.skipBrowserRedirect)) {
            window.location.assign(response.data.redirect_url);
          }
        }
        return response;
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _denyAuthorization(authorizationId, options) {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError });
        }
        const response = await _request(this.fetch, "POST", `${this.url}/oauth/authorizations/${authorizationId}/consent`, {
          headers: this.headers,
          jwt: session.access_token,
          body: { action: "deny" },
          xform: (data) => ({ data, error: null })
        });
        if (response.data && response.data.redirect_url) {
          if (isBrowser() && !(options === null || options === undefined ? undefined : options.skipBrowserRedirect)) {
            window.location.assign(response.data.redirect_url);
          }
        }
        return response;
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _listOAuthGrants() {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError });
        }
        return await _request(this.fetch, "GET", `${this.url}/user/oauth/grants`, {
          headers: this.headers,
          jwt: session.access_token,
          xform: (data) => ({ data, error: null })
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _revokeOAuthGrant(options) {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError });
        }
        await _request(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, {
          headers: this.headers,
          jwt: session.access_token,
          query: { client_id: options.clientId },
          noResolveJson: true
        });
        return { data: {}, error: null };
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async fetchJwk(kid, jwks = { keys: [] }) {
    let jwk = jwks.keys.find((key) => key.kid === kid);
    if (jwk) {
      return jwk;
    }
    const now = Date.now();
    jwk = this.jwks.keys.find((key) => key.kid === kid);
    if (jwk && this.jwks_cached_at + JWKS_TTL > now) {
      return jwk;
    }
    const { data, error } = await _request(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
      headers: this.headers
    });
    if (error) {
      throw error;
    }
    if (!data.keys || data.keys.length === 0) {
      return null;
    }
    this.jwks = data;
    this.jwks_cached_at = now;
    jwk = data.keys.find((key) => key.kid === kid);
    if (!jwk) {
      return null;
    }
    return jwk;
  }
  async getClaims(jwt, options = {}) {
    try {
      let token = jwt;
      if (!token) {
        const { data, error } = await this.getSession();
        if (error || !data.session) {
          return this._returnResult({ data: null, error });
        }
        token = data.session.access_token;
      }
      const { header, payload, signature, raw: { header: rawHeader, payload: rawPayload } } = decodeJWT(token);
      if (!(options === null || options === undefined ? undefined : options.allowExpired)) {
        try {
          validateExp(payload.exp);
        } catch (e) {
          throw new AuthInvalidJwtError(e instanceof Error ? e.message : "JWT validation failed");
        }
      }
      const signingKey = !header.alg || header.alg.startsWith("HS") || !header.kid || !(("crypto" in globalThis) && ("subtle" in globalThis.crypto)) ? null : await this.fetchJwk(header.kid, (options === null || options === undefined ? undefined : options.keys) ? { keys: options.keys } : options === null || options === undefined ? undefined : options.jwks);
      if (!signingKey) {
        const { error } = await this.getUser(token);
        if (error) {
          throw error;
        }
        return {
          data: {
            claims: payload,
            header,
            signature
          },
          error: null
        };
      }
      const algorithm = getAlgorithm(header.alg);
      const publicKey = await crypto.subtle.importKey("jwk", signingKey, algorithm, true, [
        "verify"
      ]);
      const isValid = await crypto.subtle.verify(algorithm, publicKey, signature, stringToUint8Array(`${rawHeader}.${rawPayload}`));
      if (!isValid) {
        throw new AuthInvalidJwtError("Invalid JWT signature");
      }
      return {
        data: {
          claims: payload,
          header,
          signature
        },
        error: null
      };
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async signInWithPasskey(credentials) {
    var _a, _b, _c;
    assertPasskeyExperimentalEnabled(this.experimental);
    try {
      if (!browserSupportsWebAuthn()) {
        return this._returnResult({
          data: null,
          error: new AuthUnknownError("Browser does not support WebAuthn", null)
        });
      }
      const { data: options, error: optionsError } = await this._startPasskeyAuthentication({
        options: { captchaToken: (_a = credentials === null || credentials === undefined ? undefined : credentials.options) === null || _a === undefined ? undefined : _a.captchaToken }
      });
      if (optionsError || !options) {
        return this._returnResult({ data: null, error: optionsError });
      }
      const publicKeyOptions = deserializeCredentialRequestOptions(options.options);
      const signal = (_c = (_b = credentials === null || credentials === undefined ? undefined : credentials.options) === null || _b === undefined ? undefined : _b.signal) !== null && _c !== undefined ? _c : webAuthnAbortService.createNewAbortSignal();
      const { data: credential, error: credentialError } = await getCredential({
        publicKey: publicKeyOptions,
        signal
      });
      if (credentialError || !credential) {
        return this._returnResult({
          data: null,
          error: credentialError !== null && credentialError !== undefined ? credentialError : new AuthUnknownError("WebAuthn ceremony failed", null)
        });
      }
      const serialized = serializeCredentialRequestResponse(credential);
      return this._verifyPasskeyAuthentication({
        challengeId: options.challenge_id,
        credential: serialized
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async registerPasskey(credentials) {
    var _a, _b;
    assertPasskeyExperimentalEnabled(this.experimental);
    try {
      if (!browserSupportsWebAuthn()) {
        return this._returnResult({
          data: null,
          error: new AuthUnknownError("Browser does not support WebAuthn", null)
        });
      }
      const { data: options, error: optionsError } = await this._startPasskeyRegistration();
      if (optionsError || !options) {
        return this._returnResult({ data: null, error: optionsError });
      }
      const publicKeyOptions = deserializeCredentialCreationOptions(options.options);
      const signal = (_b = (_a = credentials === null || credentials === undefined ? undefined : credentials.options) === null || _a === undefined ? undefined : _a.signal) !== null && _b !== undefined ? _b : webAuthnAbortService.createNewAbortSignal();
      const { data: credential, error: credentialError } = await createCredential({
        publicKey: publicKeyOptions,
        signal
      });
      if (credentialError || !credential) {
        return this._returnResult({
          data: null,
          error: credentialError !== null && credentialError !== undefined ? credentialError : new AuthUnknownError("WebAuthn ceremony failed", null)
        });
      }
      const serialized = serializeCredentialCreationResponse(credential);
      return this._verifyPasskeyRegistration({
        challengeId: options.challenge_id,
        credential: serialized
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _startPasskeyRegistration() {
    assertPasskeyExperimentalEnabled(this.experimental);
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError });
        }
        const { data, error } = await _request(this.fetch, "POST", `${this.url}/passkeys/registration/options`, {
          headers: this.headers,
          jwt: session.access_token,
          body: {}
        });
        if (error) {
          return this._returnResult({ data: null, error });
        }
        return this._returnResult({ data, error: null });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _verifyPasskeyRegistration(params) {
    assertPasskeyExperimentalEnabled(this.experimental);
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError });
        }
        const { data, error } = await _request(this.fetch, "POST", `${this.url}/passkeys/registration/verify`, {
          headers: this.headers,
          jwt: session.access_token,
          body: {
            challenge_id: params.challengeId,
            credential: params.credential
          }
        });
        if (error) {
          return this._returnResult({ data: null, error });
        }
        return this._returnResult({ data, error: null });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _startPasskeyAuthentication(params) {
    var _a;
    assertPasskeyExperimentalEnabled(this.experimental);
    try {
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/passkeys/authentication/options`, {
        headers: this.headers,
        body: {
          gotrue_meta_security: { captcha_token: (_a = params === null || params === undefined ? undefined : params.options) === null || _a === undefined ? undefined : _a.captchaToken }
        }
      });
      if (error) {
        return this._returnResult({ data: null, error });
      }
      return this._returnResult({ data, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _verifyPasskeyAuthentication(params) {
    assertPasskeyExperimentalEnabled(this.experimental);
    try {
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/passkeys/authentication/verify`, {
        headers: this.headers,
        body: {
          challenge_id: params.challengeId,
          credential: params.credential
        },
        xform: _sessionResponse
      });
      if (error) {
        return this._returnResult({ data: null, error });
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return this._returnResult({ data, error: null });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _listPasskeys() {
    assertPasskeyExperimentalEnabled(this.experimental);
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError });
        }
        const { data, error } = await _request(this.fetch, "GET", `${this.url}/passkeys`, {
          headers: this.headers,
          jwt: session.access_token,
          xform: (data2) => ({ data: data2, error: null })
        });
        if (error) {
          return this._returnResult({ data: null, error });
        }
        return this._returnResult({ data, error: null });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _updatePasskey(params) {
    assertPasskeyExperimentalEnabled(this.experimental);
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError });
        }
        const { data, error } = await _request(this.fetch, "PATCH", `${this.url}/passkeys/${params.passkeyId}`, {
          headers: this.headers,
          jwt: session.access_token,
          body: { friendly_name: params.friendlyName }
        });
        if (error) {
          return this._returnResult({ data: null, error });
        }
        return this._returnResult({ data, error: null });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
  async _deletePasskey(params) {
    assertPasskeyExperimentalEnabled(this.experimental);
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return this._returnResult({ data: null, error: sessionError });
        }
        if (!session) {
          return this._returnResult({ data: null, error: new AuthSessionMissingError });
        }
        const { error } = await _request(this.fetch, "DELETE", `${this.url}/passkeys/${params.passkeyId}`, {
          headers: this.headers,
          jwt: session.access_token,
          noResolveJson: true
        });
        if (error) {
          return this._returnResult({ data: null, error });
        }
        return this._returnResult({ data: null, error: null });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: null, error });
      }
      throw error;
    }
  }
}
GoTrueClient.nextInstanceID = {};
var GoTrueClient_default = GoTrueClient;

// node_modules/@supabase/auth-js/dist/module/AuthClient.js
var AuthClient = GoTrueClient_default;
var AuthClient_default = AuthClient;
// node_modules/@supabase/supabase-js/dist/index.mjs
var version4 = "2.108.2";
var JS_ENV = "";
var JS_RUNTIME_VERSION;
if (typeof Deno !== "undefined") {
  JS_ENV = "deno";
  JS_RUNTIME_VERSION = (_Deno$version = Deno.version) === null || _Deno$version === undefined ? undefined : _Deno$version.deno;
} else if (typeof document !== "undefined")
  JS_ENV = "web";
else if (typeof navigator !== "undefined" && navigator.product === "ReactNative")
  JS_ENV = "react-native";
else {
  JS_ENV = "node";
  JS_RUNTIME_VERSION = typeof process !== "undefined" ? (_process$version = process.version) === null || _process$version === undefined ? undefined : _process$version.replace(/^v/, "") : undefined;
}
var _Deno$version;
var _process$version;
var _runtimeMeta = [`runtime=${JS_ENV}`];
if (JS_RUNTIME_VERSION)
  _runtimeMeta.push(`runtime-version=${JS_RUNTIME_VERSION}`);
var DEFAULT_HEADERS3 = { "X-Client-Info": `supabase-js/${version4}; ${_runtimeMeta.join("; ")}` };
var DEFAULT_GLOBAL_OPTIONS = { headers: DEFAULT_HEADERS3 };
var DEFAULT_DB_OPTIONS = { schema: "public" };
var DEFAULT_AUTH_OPTIONS = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  flowType: "implicit"
};
var DEFAULT_REALTIME_OPTIONS = {};
var DEFAULT_TRACE_PROPAGATION_OPTIONS = {
  enabled: false,
  respectSamplingDecision: true
};
function __awaiter2(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
var otelModulePromise = null;
var OTEL_PKG = "@opentelemetry/api";
function loadOtel() {
  if (otelModulePromise === null)
    otelModulePromise = import(OTEL_PKG).catch(() => null);
  return otelModulePromise;
}
function extractTraceContext() {
  return __awaiter2(this, undefined, undefined, function* () {
    try {
      const otel = yield loadOtel();
      if (!otel || !otel.propagation || !otel.context)
        return null;
      const carrier = {};
      otel.propagation.inject(otel.context.active(), carrier);
      const traceparent = carrier["traceparent"];
      if (!traceparent)
        return null;
      return {
        traceparent,
        tracestate: carrier["tracestate"],
        baggage: carrier["baggage"]
      };
    } catch (_a) {
      return null;
    }
  });
}
function parseTraceParent(traceparent) {
  if (!traceparent || typeof traceparent !== "string")
    return null;
  const parts = traceparent.split("-");
  if (parts.length !== 4)
    return null;
  const [version$1, traceId, parentId, traceFlags] = parts;
  if (version$1.length !== 2 || traceId.length !== 32 || parentId.length !== 16 || traceFlags.length !== 2)
    return null;
  const hexRegex = /^[0-9a-f]+$/i;
  if (!hexRegex.test(version$1) || !hexRegex.test(traceId) || !hexRegex.test(parentId) || !hexRegex.test(traceFlags))
    return null;
  if (traceId === "00000000000000000000000000000000" || parentId === "0000000000000000")
    return null;
  return {
    version: version$1,
    traceId,
    parentId,
    traceFlags,
    isSampled: (parseInt(traceFlags, 16) & 1) === 1
  };
}
function shouldPropagateToTarget(targetUrl, targets) {
  if (!targetUrl || !targets || targets.length === 0)
    return false;
  let url;
  if (targetUrl instanceof URL)
    url = targetUrl;
  else
    try {
      url = new URL(targetUrl);
    } catch (error) {
      return false;
    }
  for (const target of targets)
    try {
      if (typeof target === "string") {
        if (matchStringTarget(url.hostname, target))
          return true;
      } else if (target instanceof RegExp) {
        if (target.test(url.hostname))
          return true;
      } else if (typeof target === "function") {
        if (target(url))
          return true;
      }
    } catch (error) {
      continue;
    }
  return false;
}
function matchStringTarget(hostname, target) {
  if (target === hostname)
    return true;
  if (target.startsWith("*.")) {
    const domain = target.slice(2);
    if (hostname.endsWith(domain)) {
      if (hostname === domain || hostname.endsWith("." + domain))
        return true;
    }
  }
  return false;
}
function getDefaultPropagationTargets(supabaseUrl) {
  const targets = [];
  try {
    const url = new URL(supabaseUrl);
    targets.push(url.hostname);
  } catch (error) {}
  targets.push("*.supabase.co", "*.supabase.in");
  targets.push("localhost", "127.0.0.1", "[::1]");
  return targets;
}
function _typeof3(o) {
  "@babel/helpers - typeof";
  return _typeof3 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o$1) {
    return typeof o$1;
  } : function(o$1) {
    return o$1 && typeof Symbol == "function" && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
  }, _typeof3(o);
}
function toPrimitive3(t, r) {
  if (_typeof3(t) != "object" || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (e !== undefined) {
    var i = e.call(t, r || "default");
    if (_typeof3(i) != "object")
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function toPropertyKey3(t) {
  var i = toPrimitive3(t, "string");
  return _typeof3(i) == "symbol" ? i : i + "";
}
function _defineProperty3(e, r, t) {
  return (r = toPropertyKey3(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r$1) {
      return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread23(e) {
  for (var r = 1;r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys3(Object(t), true).forEach(function(r$1) {
      _defineProperty3(e, r$1, t[r$1]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys3(Object(t)).forEach(function(r$1) {
      Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
    });
  }
  return e;
}
var resolveFetch4 = (customFetch) => {
  if (customFetch)
    return (...args) => customFetch(...args);
  return (...args) => fetch(...args);
};
var resolveHeadersConstructor = () => {
  return Headers;
};
var fetchWithAuth = (supabaseKey, supabaseUrl, getAccessToken, customFetch, tracePropagationOptions) => {
  const fetch$1 = resolveFetch4(customFetch);
  const HeadersConstructor = resolveHeadersConstructor();
  const traceEnabled = (tracePropagationOptions === null || tracePropagationOptions === undefined ? undefined : tracePropagationOptions.enabled) === true;
  const respectSampling = (tracePropagationOptions === null || tracePropagationOptions === undefined ? undefined : tracePropagationOptions.respectSamplingDecision) !== false;
  const traceTargets = traceEnabled ? getDefaultPropagationTargets(supabaseUrl) : null;
  return async (input, init) => {
    var _await$getAccessToken;
    const accessToken = (_await$getAccessToken = await getAccessToken()) !== null && _await$getAccessToken !== undefined ? _await$getAccessToken : supabaseKey;
    let headers = new HeadersConstructor(init === null || init === undefined ? undefined : init.headers);
    if (!headers.has("apikey"))
      headers.set("apikey", supabaseKey);
    if (!headers.has("Authorization"))
      headers.set("Authorization", `Bearer ${accessToken}`);
    if (traceTargets) {
      const traceHeaders = await getTraceHeaders(input, traceTargets, respectSampling);
      if (traceHeaders) {
        if (traceHeaders.traceparent && !headers.has("traceparent"))
          headers.set("traceparent", traceHeaders.traceparent);
        if (traceHeaders.tracestate && !headers.has("tracestate"))
          headers.set("tracestate", traceHeaders.tracestate);
        if (traceHeaders.baggage && !headers.has("baggage"))
          headers.set("baggage", traceHeaders.baggage);
      }
    }
    return fetch$1(input, _objectSpread23(_objectSpread23({}, init), {}, { headers }));
  };
};
async function getTraceHeaders(input, targets, respectSampling) {
  if (!shouldPropagateToTarget(typeof input === "string" ? input : input instanceof URL ? input : input.url, targets))
    return null;
  const traceContext = await extractTraceContext();
  if (!traceContext || !traceContext.traceparent)
    return null;
  if (respectSampling) {
    const parsed = parseTraceParent(traceContext.traceparent);
    if (parsed && !parsed.isSampled)
      return null;
  }
  return traceContext;
}
function normalizeTracePropagation(value) {
  return typeof value === "boolean" ? { enabled: value } : value;
}
function ensureTrailingSlash(url) {
  return url.endsWith("/") ? url : url + "/";
}
function applySettingDefaults(options, defaults) {
  var _DEFAULT_GLOBAL_OPTIO, _globalOptions$header, _ref, _tracePropagationOpti, _ref2, _tracePropagationOpti2;
  const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
  const { db: DEFAULT_DB_OPTIONS$1, auth: DEFAULT_AUTH_OPTIONS$1, realtime: DEFAULT_REALTIME_OPTIONS$1, global: DEFAULT_GLOBAL_OPTIONS$1 } = defaults;
  const tracePropagationOptions = normalizeTracePropagation(options.tracePropagation);
  const DEFAULT_TRACE_PROPAGATION_OPTIONS$1 = normalizeTracePropagation(defaults.tracePropagation);
  const result = {
    db: _objectSpread23(_objectSpread23({}, DEFAULT_DB_OPTIONS$1), dbOptions),
    auth: _objectSpread23(_objectSpread23({}, DEFAULT_AUTH_OPTIONS$1), authOptions),
    realtime: _objectSpread23(_objectSpread23({}, DEFAULT_REALTIME_OPTIONS$1), realtimeOptions),
    storage: {},
    global: _objectSpread23(_objectSpread23(_objectSpread23({}, DEFAULT_GLOBAL_OPTIONS$1), globalOptions), {}, { headers: _objectSpread23(_objectSpread23({}, (_DEFAULT_GLOBAL_OPTIO = DEFAULT_GLOBAL_OPTIONS$1 === null || DEFAULT_GLOBAL_OPTIONS$1 === undefined ? undefined : DEFAULT_GLOBAL_OPTIONS$1.headers) !== null && _DEFAULT_GLOBAL_OPTIO !== undefined ? _DEFAULT_GLOBAL_OPTIO : {}), (_globalOptions$header = globalOptions === null || globalOptions === undefined ? undefined : globalOptions.headers) !== null && _globalOptions$header !== undefined ? _globalOptions$header : {}) }),
    tracePropagation: {
      enabled: (_ref = (_tracePropagationOpti = tracePropagationOptions === null || tracePropagationOptions === undefined ? undefined : tracePropagationOptions.enabled) !== null && _tracePropagationOpti !== undefined ? _tracePropagationOpti : DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === null || DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === undefined ? undefined : DEFAULT_TRACE_PROPAGATION_OPTIONS$1.enabled) !== null && _ref !== undefined ? _ref : false,
      respectSamplingDecision: (_ref2 = (_tracePropagationOpti2 = tracePropagationOptions === null || tracePropagationOptions === undefined ? undefined : tracePropagationOptions.respectSamplingDecision) !== null && _tracePropagationOpti2 !== undefined ? _tracePropagationOpti2 : DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === null || DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === undefined ? undefined : DEFAULT_TRACE_PROPAGATION_OPTIONS$1.respectSamplingDecision) !== null && _ref2 !== undefined ? _ref2 : true
    },
    accessToken: async () => ""
  };
  if (options.accessToken)
    result.accessToken = options.accessToken;
  else
    delete result.accessToken;
  return result;
}
function validateSupabaseUrl(supabaseUrl) {
  const trimmedUrl = supabaseUrl === null || supabaseUrl === undefined ? undefined : supabaseUrl.trim();
  if (!trimmedUrl)
    throw new Error("supabaseUrl is required.");
  if (!trimmedUrl.match(/^https?:\/\//i))
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  try {
    return new URL(ensureTrailingSlash(trimmedUrl));
  } catch (_unused) {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}
var SupabaseAuthClient = class extends AuthClient_default {
  constructor(options) {
    super(options);
  }
};
var SupabaseClient = class {
  constructor(supabaseUrl, supabaseKey, options) {
    var _settings$auth$storag, _settings$global$head;
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    const baseUrl = validateSupabaseUrl(supabaseUrl);
    if (!supabaseKey)
      throw new Error("supabaseKey is required.");
    this.realtimeUrl = new URL("realtime/v1", baseUrl);
    this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
    this.authUrl = new URL("auth/v1", baseUrl);
    this.storageUrl = new URL("storage/v1", baseUrl);
    this.functionsUrl = new URL("functions/v1", baseUrl);
    const defaultStorageKey = `sb-${baseUrl.hostname.split(".")[0]}-auth-token`;
    const DEFAULTS = {
      db: DEFAULT_DB_OPTIONS,
      realtime: DEFAULT_REALTIME_OPTIONS,
      auth: _objectSpread23(_objectSpread23({}, DEFAULT_AUTH_OPTIONS), {}, { storageKey: defaultStorageKey }),
      global: DEFAULT_GLOBAL_OPTIONS,
      tracePropagation: DEFAULT_TRACE_PROPAGATION_OPTIONS
    };
    const settings = applySettingDefaults(options !== null && options !== undefined ? options : {}, DEFAULTS);
    this.settings = settings;
    this.storageKey = (_settings$auth$storag = settings.auth.storageKey) !== null && _settings$auth$storag !== undefined ? _settings$auth$storag : "";
    this.headers = (_settings$global$head = settings.global.headers) !== null && _settings$global$head !== undefined ? _settings$global$head : {};
    if (!settings.accessToken) {
      var _settings$auth;
      this.auth = this._initSupabaseAuthClient((_settings$auth = settings.auth) !== null && _settings$auth !== undefined ? _settings$auth : {}, this.headers, settings.global.fetch);
    } else {
      this.accessToken = settings.accessToken;
      this.auth = new Proxy({}, { get: (_, prop) => {
        throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
      } });
    }
    this.fetch = fetchWithAuth(supabaseKey, supabaseUrl, this._getAccessToken.bind(this), settings.global.fetch, settings.tracePropagation);
    this.realtime = this._initRealtimeClient(_objectSpread23({
      headers: this.headers,
      accessToken: this._getAccessToken.bind(this),
      fetch: this.fetch
    }, settings.realtime));
    if (this.accessToken)
      Promise.resolve(this.accessToken()).then((token) => this.realtime.setAuth(token)).catch((e) => console.warn("Failed to set initial Realtime auth token:", e));
    this.rest = new PostgrestClient(new URL("rest/v1", baseUrl).href, {
      headers: this.headers,
      schema: settings.db.schema,
      fetch: this.fetch,
      timeout: settings.db.timeout,
      urlLengthLimit: settings.db.urlLengthLimit
    });
    this.storage = new StorageClient(this.storageUrl.href, this.headers, this.fetch, options === null || options === undefined ? undefined : options.storage);
    if (!settings.accessToken)
      this._listenForAuthEvents();
  }
  get functions() {
    return new FunctionsClient(this.functionsUrl.href, {
      headers: this.headers,
      customFetch: this.fetch
    });
  }
  from(relation) {
    return this.rest.from(relation);
  }
  schema(schema) {
    return this.rest.schema(schema);
  }
  rpc(fn, args = {}, options = {
    head: false,
    get: false,
    count: undefined
  }) {
    return this.rest.rpc(fn, args, options);
  }
  channel(name, opts = { config: {} }) {
    return this.realtime.channel(name, opts);
  }
  getChannels() {
    return this.realtime.getChannels();
  }
  removeChannel(channel) {
    return this.realtime.removeChannel(channel);
  }
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  async _getAccessToken() {
    var _this = this;
    var _data$session$access_, _data$session;
    if (_this.accessToken)
      return await _this.accessToken();
    const { data } = await _this.auth.getSession();
    return (_data$session$access_ = (_data$session = data.session) === null || _data$session === undefined ? undefined : _data$session.access_token) !== null && _data$session$access_ !== undefined ? _data$session$access_ : _this.supabaseKey;
  }
  _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug, throwOnError, experimental, lockAcquireTimeout, skipAutoInitialize }, headers, fetch$1) {
    const authHeaders = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new SupabaseAuthClient({
      url: this.authUrl.href,
      headers: _objectSpread23(_objectSpread23({}, authHeaders), headers),
      storageKey,
      autoRefreshToken,
      persistSession,
      detectSessionInUrl,
      storage,
      userStorage,
      flowType,
      lock,
      debug,
      throwOnError,
      experimental,
      fetch: fetch$1,
      lockAcquireTimeout,
      skipAutoInitialize,
      hasCustomAuthorizationHeader: Object.keys(this.headers).some((key) => key.toLowerCase() === "authorization")
    });
  }
  _initRealtimeClient(options) {
    return new RealtimeClient(this.realtimeUrl.href, _objectSpread23(_objectSpread23({}, options), {}, { params: _objectSpread23(_objectSpread23({}, { apikey: this.supabaseKey }), options === null || options === undefined ? undefined : options.params) }));
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((event, session) => {
      this._handleTokenChanged(event, "CLIENT", session === null || session === undefined ? undefined : session.access_token);
    });
  }
  _handleTokenChanged(event, source, token) {
    if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
      this.changedAccessToken = token;
      this.realtime.setAuth(token);
    } else if (event === "SIGNED_OUT") {
      this.realtime.setAuth();
      if (source == "STORAGE")
        this.auth.signOut();
      this.changedAccessToken = undefined;
    }
  }
};
var createClient = (supabaseUrl, supabaseKey, options) => {
  return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
function shouldShowDeprecationWarning() {
  if (typeof window !== "undefined")
    return false;
  const _process = globalThis["process"];
  if (!_process)
    return false;
  const processVersion = _process["version"];
  if (processVersion === undefined || processVersion === null)
    return false;
  const versionMatch = processVersion.match(/^v(\d+)\./);
  if (!versionMatch)
    return false;
  return parseInt(versionMatch[1], 10) <= 18;
}
if (shouldShowDeprecationWarning())
  console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");

// node_modules/@jpytrader/fundrates-arb/dist/esm/index.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
/*! For license information please see index.js.LICENSE.txt */
var c;
var d;
var u;
var h;
var p = {};
var f = {};
function g(e2) {
  var t2 = f[e2];
  if (t2 !== undefined)
    return t2.exports;
  var n2 = f[e2] = { exports: {} };
  return p[e2](n2, n2.exports, g), n2.exports;
}
g.m = p, d = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, g.t = function(e2, t2) {
  if (1 & t2 && (e2 = this(e2)), 8 & t2)
    return e2;
  if (typeof e2 == "object" && e2) {
    if (4 & t2 && e2.__esModule)
      return e2;
    if (16 & t2 && typeof e2.then == "function")
      return e2;
  }
  var n2 = Object.create(null);
  g.r(n2);
  var r2 = {};
  c = c || [null, d({}), d([]), d(d)];
  for (var i2 = 2 & t2 && e2;(typeof i2 == "object" || typeof i2 == "function") && !~c.indexOf(i2); i2 = d(i2))
    Object.getOwnPropertyNames(i2).forEach((t3) => r2[t3] = () => e2[t3]);
  return r2.default = () => e2, g.d(n2, r2), n2;
}, g.d = (e2, t2) => {
  for (var n2 in t2)
    g.o(t2, n2) && !g.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: t2[n2] });
}, g.f = {}, g.e = (e2) => Promise.all(Object.keys(g.f).reduce((t2, n2) => (g.f[n2](e2, t2), t2), [])), g.u = (e2) => e2 + ".index.js", g.miniCssF = (e2) => {}, g.g = function() {
  if (typeof globalThis == "object")
    return globalThis;
  try {
    return this || new Function("return this")();
  } catch (e2) {
    if (typeof window == "object")
      return window;
  }
}(), g.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), g.r = (e2) => {
  typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
}, (() => {
  var e2;
  if (typeof import.meta.url == "string" && (e2 = import.meta.url), !e2)
    throw new Error("Automatic publicPath is not supported in this browser");
  e2 = e2.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), g.p = e2;
})(), u = { 792: 0 }, h = (e2) => {
  var t2, n2, { __webpack_esm_ids__: r2, __webpack_esm_modules__: i2, __webpack_esm_runtime__: o2 } = e2, s2 = 0;
  for (t2 in i2)
    g.o(i2, t2) && (g.m[t2] = i2[t2]);
  for (o2 && o2(g);s2 < r2.length; s2++)
    n2 = r2[s2], g.o(u, n2) && u[n2] && u[n2][0](), u[r2[s2]] = 0;
}, g.f.j = (e2, t2) => {
  var n2 = g.o(u, e2) ? u[e2] : undefined;
  if (n2 !== 0)
    if (n2)
      t2.push(n2[1]);
    else {
      var r2 = import("./" + g.u(e2)).then(h, (t3) => {
        throw u[e2] !== 0 && (u[e2] = undefined), t3;
      });
      r2 = Promise.race([r2, new Promise((t3) => n2 = u[e2] = [t3])]), t2.push(n2[1] = r2);
    }
};
var y = {};
g.r(y), g.d(y, { OG: () => Ut, My: () => St, Ph: () => kt, lX: () => It, Id: () => Rt, fg: () => zt, qj: () => Tt, aT: () => Et, lq: () => Ct, z: () => At, Q5: () => $t });
var m = 5;
var b = "fra-arb-state";
var w = ["vireson_arb_state", "fra-arb-config"];
var x = 0;
function S(e2, t2, n2, r2, i2, o2, s2) {
  const a2 = Date.now();
  return { id: `pos_${a2}_${++x}`, pair: e2, exchange: t2, spotOrderId: n2, perpOrderId: r2, spotEntry: i2, perpEntry: o2, sizeUsd: s2, openedAt: a2, fundingCollected: 0, unrealizedPnl: 0, status: "open", lastFundingAccrualAt: a2, marginHealthPct: 100, lastRebalancedAt: a2, executionCost: 0 };
}
function P(e2, t2, n2, r2) {
  return Date.now() - e2.openedAt >= n2 && (r2 != null ? r2 < 0 : t2 <= 0) ? { exit: true, reason: r2 != null ? "max_hold_expired_and_zscore_mean_reverted" : "max_hold_expired_and_funding_flipped" } : { exit: false, reason: "" };
}
function E(e2, t2, n2 = Date.now()) {
  return e2.status !== "open" ? { rebalance: false, reason: "position_not_open" } : t2.rebalanceDays === 0 ? { rebalance: false, reason: "rebalancing_disabled" } : (t2.targetExchange === "hyperliquid" ? t2.usePortfolioMargin : t2.useUnifiedAccount) ? { rebalance: false, reason: "margin_mode_handles_drift" } : n2 - (e2.lastRebalancedAt ?? e2.openedAt) < 86400000 * t2.rebalanceDays ? { rebalance: false, reason: "interval_not_elapsed" } : { rebalance: true, reason: "weekly_hedge_correction" };
}

class k {
  constructor() {
    this.buffers = new Map;
  }
  record(e2, t2, n2) {
    let r2 = this.buffers.get(e2);
    r2 || (r2 = [], this.buffers.set(e2, r2)), r2.push({ rate: t2, timestamp: n2 });
    const i2 = n2 - 604800000, o2 = r2.findIndex((e3) => e3.timestamp >= i2);
    o2 > 0 && r2.splice(0, o2);
  }
  getMean(e2) {
    const t2 = this.buffers.get(e2);
    return !t2 || t2.length < 3 ? null : t2.reduce((e3, t3) => e3 + t3.rate, 0) / t2.length;
  }
  getStdDev(e2) {
    const t2 = this.getMean(e2);
    if (t2 === null)
      return null;
    const n2 = this.buffers.get(e2), r2 = n2.reduce((e3, n3) => e3 + (n3.rate - t2) ** 2, 0) / n2.length;
    return Math.sqrt(r2);
  }
  getZScore(e2) {
    const t2 = this.buffers.get(e2);
    if (!t2 || t2.length < 3)
      return null;
    const n2 = this.getMean(e2), r2 = this.getStdDev(e2);
    return r2 === 0 ? 0 : (t2[t2.length - 1].rate - n2) / r2;
  }
  getSampleCount(e2) {
    return this.buffers.get(e2)?.length ?? 0;
  }
}
function I(e2, t2, n2, r2) {
  if (t2 <= 0 || e2 <= 0)
    return 0;
  const i2 = r2 === "buy" ? e2 - t2 : t2 - e2;
  return i2 <= 0 ? 0 : i2 / t2 * n2;
}

class C {
  constructor(e2, t2, n2, r2) {
    this.pnlHistory = [], this.scanTimer = null, this.persistTimer = null, this.listeners = [], this.eventListeners = [], this.lastNoopKey = "", this.lastNoopEmitAt = 0, this.suppressedNoopCount = 0, this.scanCount = 0, this.manualTick = false, this.fundingRestFailCount = 0, this.fundingHistory = new k, this.config = e2, this.adapter = t2, this.store = n2 ?? null, this.manualTick = r2?.manualTick === true, this.state = { phase: "idle", positions: [], fundingRates: [], totalFundingCollected: 0, totalRealizedPnl: 0, totalExecutionCost: 0, lastScanAt: null, errors: [] };
  }
  async start() {
    if (this.store && await this.restore(), this.update({ phase: "scanning", errors: [] }), this.manualTick)
      return;
    const e2 = 1000 * (this.config.scanIntervalSecs ?? 60);
    this.scan(), this.scanTimer = setInterval(() => this.scan(), e2);
  }
  stop() {
    this.scanTimer && clearInterval(this.scanTimer), this.scanTimer = null, this.persistTimer && clearTimeout(this.persistTimer), this.persistTimer = null, this.persistNow(), this.update({ phase: "idle" });
  }
  teardown() {
    this.scanTimer && clearInterval(this.scanTimer), this.scanTimer = null, this.persistTimer && clearTimeout(this.persistTimer), this.persistTimer = null;
  }
  async closeAllPositions() {
    const e2 = this.state.positions.filter((e3) => e3.status === "open");
    if (e2.length !== 0)
      for (const t2 of e2)
        await this.closePosition(t2, "manual_close_all");
  }
  updateConfig(e2) {
    const t2 = this.config.scanIntervalSecs;
    if (this.config = { ...this.config, ...e2 }, this.scanTimer && e2.scanIntervalSecs !== undefined && e2.scanIntervalSecs !== t2) {
      clearInterval(this.scanTimer);
      const e3 = 1000 * this.config.scanIntervalSecs;
      this.scanTimer = setInterval(() => this.scan(), e3);
    }
    this.schedulePersist();
  }
  subscribe(e2) {
    return this.listeners.push(e2), () => {
      this.listeners = this.listeners.filter((t2) => t2 !== e2);
    };
  }
  onExecution(e2) {
    return this.eventListeners.push(e2), () => {
      this.eventListeners = this.eventListeners.filter((t2) => t2 !== e2);
    };
  }
  async hasCollateral(e2) {
    try {
      if (this.config.dryRun)
        return false;
      const t2 = await this.adapter.getPositions(), n2 = e2.split("/")[0];
      return t2.some((e3) => e3.instrument === "spot" && e3.pair.startsWith(n2) && e3.size > 0);
    } catch {
      return false;
    }
  }
  getState() {
    return { ...this.state };
  }
  getPnlHistory() {
    return [...this.pnlHistory];
  }
  getZScoreWarmup() {
    return this.config.pairs.map((e2) => {
      const t2 = this.fundingHistory.getSampleCount(e2);
      return { pair: e2, samples: t2, required: 3, ready: t2 >= 3 };
    });
  }
  schedulePersist() {
    this.store && (this.persistTimer && clearTimeout(this.persistTimer), this.persistTimer = setTimeout(() => this.persistNow(), 5000));
  }
  async persistNow() {
    if (!this.store)
      return;
    const e2 = { version: 5, savedAt: Date.now(), phase: this.state.phase, positions: this.state.positions, totalFundingCollected: this.state.totalFundingCollected, config: this.config, pnlHistory: this.pnlHistory, isRunning: this.scanTimer !== null };
    try {
      await this.store.save(e2);
    } catch {}
  }
  async restore() {
    if (this.store)
      try {
        const e2 = await this.store.load();
        if (!e2)
          return;
        const t2 = e2.positions.filter((e3) => e3.status === "open" || e3.status === "rebalancing" || e3.status === "rebalance_failed").map((e3) => ({ ...e3, lastRebalancedAt: e3.lastRebalancedAt ?? e3.openedAt, executionCost: e3.executionCost ?? 0 }));
        (t2.length > 0 || e2.pnlHistory && e2.pnlHistory.length > 0) && (this.state = { ...this.state, positions: t2, totalFundingCollected: e2.totalFundingCollected, totalExecutionCost: this.state.totalExecutionCost ?? 0 }, this.pnlHistory = e2.pnlHistory ?? [], t2.length > 0 && this.emit({ type: "rebalance", timestamp: Date.now(), data: { reason: "crash_recovery", restoredCount: t2.length } }));
      } catch {}
  }
  async clearPersistedState() {
    this.store && await this.store.clear(), this.pnlHistory = [];
  }
  async awaitFill(e2, t2) {
    if (e2.status === "filled" || e2.status === "rejected")
      return e2;
    if (!this.adapter.getOrderStatus)
      return e2;
    const n2 = Date.now();
    for (;Date.now() - n2 < 1e4; ) {
      await new Promise((e3) => setTimeout(e3, 500));
      try {
        const n3 = await this.adapter.getOrderStatus(e2.orderId, t2);
        if (n3.status === "filled" || n3.status === "rejected")
          return n3;
      } catch {}
    }
    return { ...e2, status: "rejected" };
  }
  async accumulateFunding(e2) {
    const t2 = Date.now(), n2 = this.state.positions.filter((e3) => e3.status === "open");
    n2.length !== 0 && (!this.config.dryRun && this.adapter.getFundingHistory ? await this.accumulateFundingFromExchange(n2, e2, t2) : this.accumulateFundingApproximation(e2, t2));
  }
  async accumulateFundingFromExchange(e2, t2, n2) {
    const r2 = [...new Set(e2.map((e3) => e3.pair))], i2 = Math.min(...e2.map((e3) => e3.lastFundingAccrualAt || e3.openedAt));
    let o2 = null, s2 = "exchange_settlement";
    for (let e3 = 1;e3 <= 3; e3++)
      try {
        o2 = await this.adapter.getFundingHistory(r2, i2), this.fundingRestFailCount > 0 && this.emit({ type: "funding_recovered", timestamp: n2, data: { previousFailures: this.fundingRestFailCount, recoveredVia: "rest" } }), this.fundingRestFailCount = 0;
        break;
      } catch (t3) {
        this.fundingRestFailCount++, e3 < 3 && (this.emit({ type: "error", timestamp: n2, data: { error: `getFundingHistory REST attempt ${e3}/3 failed — retrying in ${2000 * e3}ms`, context: "funding_rest_retry", attempt: e3 } }), await new Promise((t4) => setTimeout(t4, 2000 * e3)));
      }
    if (o2 === null && this.adapter.getFundingHistoryWs)
      try {
        this.emit({ type: "error", timestamp: n2, data: { error: "REST funding history exhausted retries — attempting WSS fallback", context: "funding_wss_fallback" } });
        const e3 = await this.adapter.getFundingHistoryWs(r2, i2);
        e3.length > 0 && (o2 = e3, s2 = "exchange_settlement_wss", this.fundingRestFailCount > 0 && this.emit({ type: "funding_recovered", timestamp: n2, data: { previousFailures: this.fundingRestFailCount, recoveredVia: "wss" } }), this.fundingRestFailCount = 0);
      } catch {}
    if (o2 === null)
      return this.emit({ type: "error", timestamp: n2, data: { error: "CRITICAL: Both REST and WSS funding sources failed — using last-resort approximation. Funding data may drift from actual settlements.", context: "funding_approximation_last_resort", restAttempts: 3, wssFallbackAttempted: !!this.adapter.getFundingHistoryWs } }), void this.accumulateFundingApproximation(t2, n2, "approximation_last_resort");
    if (o2.length === 0)
      return;
    const a2 = new Map;
    for (const e3 of o2) {
      const t3 = a2.get(e3.pair) ?? { totalAmount: 0, latestSettledAt: 0 };
      t3.totalAmount += e3.amount, t3.latestSettledAt = Math.max(t3.latestSettledAt, e3.settledAt), a2.set(e3.pair, t3);
    }
    let l2 = 0;
    const c2 = this.state.positions.map((e3) => {
      if (e3.status !== "open")
        return e3;
      if (!a2.get(e3.pair))
        return e3;
      const t3 = o2.filter((t4) => t4.pair === e3.pair && t4.settledAt > (e3.lastFundingAccrualAt || e3.openedAt)), n3 = t3.reduce((e4, t4) => e4 + t4.amount, 0);
      if (n3 <= 0)
        return e3;
      l2 += n3;
      const r3 = Math.max(...t3.map((e4) => e4.settledAt));
      return { ...e3, fundingCollected: e3.fundingCollected + n3, lastFundingAccrualAt: r3 };
    });
    if (l2 > 0) {
      const e3 = this.state.totalFundingCollected + l2;
      this.update({ positions: c2, totalFundingCollected: e3 }), this.emit({ type: "funding_collected", timestamp: n2, data: { amount: l2, totalFundingCollected: e3, source: s2, settlementCount: o2.length, dryRun: false } }), this.applyCompounding(n2);
    }
  }
  accumulateFundingApproximation(e2, t2, n2) {
    const r2 = new Map(e2.map((e3) => [e3.pair, e3.rate]));
    let i2 = 0;
    const o2 = this.state.positions.map((e3) => {
      if (e3.status !== "open")
        return e3;
      const n3 = r2.get(e3.pair);
      if (n3 === undefined || n3 <= 0)
        return e3;
      const o3 = t2 - (e3.lastFundingAccrualAt || e3.openedAt);
      if (o3 <= 0)
        return e3;
      const s2 = o3 / 28800000, a2 = n3 * e3.sizeUsd * s2;
      return i2 += a2, { ...e3, fundingCollected: e3.fundingCollected + a2, lastFundingAccrualAt: t2 };
    });
    if (i2 > 0) {
      const e3 = this.state.totalFundingCollected + i2;
      this.update({ positions: o2, totalFundingCollected: e3 }), this.emit({ type: "funding_collected", timestamp: t2, data: { amount: i2, totalFundingCollected: e3, source: n2 ?? "approximation", dryRun: this.config.dryRun } }), this.applyCompounding(t2);
    }
  }
  applyCompounding(e2) {
    if (this.config.yieldMode !== "compound")
      return;
    const t2 = this.config.compoundMinPct / 100;
    let n2 = false;
    const r2 = this.state.positions.map((r3) => {
      if (r3.status !== "open")
        return r3;
      if (r3.fundingCollected <= 0 || r3.sizeUsd <= 0)
        return r3;
      const i2 = r3.fundingCollected / r3.sizeUsd;
      if (i2 < t2)
        return r3;
      const o2 = r3.fundingCollected;
      return n2 = true, this.emit({ type: "funding_compounded", timestamp: e2, data: { positionId: r3.id, pair: r3.pair, amount: o2, previousSizeUsd: r3.sizeUsd, newSizeUsd: r3.sizeUsd + o2, ratio: (100 * i2).toFixed(2) + "%" } }), { ...r3, sizeUsd: r3.sizeUsd + o2, fundingCollected: 0 };
    });
    n2 && this.update({ positions: r2 });
  }
  async updatePnlFromApi() {
    const e2 = this.state.positions.filter((e3) => e3.status === "open");
    if (e2.length === 0)
      return null;
    const t2 = [...new Set(e2.map((e3) => e3.pair))];
    let n2;
    try {
      n2 = await this.adapter.getMarkPrices(t2);
    } catch {
      return null;
    }
    const r2 = new Map(n2.map((e3) => [e3.pair, e3])), i2 = this.state.positions.map((e3) => {
      if (e3.status !== "open")
        return e3;
      const t3 = r2.get(e3.pair);
      if (!t3)
        return e3;
      const n3 = e3.spotEntry > 0 ? e3.sizeUsd / e3.spotEntry : 0, i3 = (t3.spotPrice - e3.spotEntry) * n3 + (e3.perpEntry - t3.perpPrice) * n3, o3 = t3.spotPrice * n3, s3 = t3.perpPrice * n3, a3 = function(e4, t4) {
        return t4 <= 0 ? 100 : e4 / t4 * 100;
      }(o3 || e3.sizeUsd, s3 || e3.sizeUsd);
      return { ...e3, unrealizedPnl: i3, marginHealthPct: a3 };
    });
    this.update({ positions: i2 });
    const o2 = e2.map((e3) => {
      const t3 = r2.get(e3.pair), n3 = i2.find((t4) => t4.id === e3.id);
      return { positionId: e3.id, pair: e3.pair, spotMarkPrice: t3?.spotPrice ?? 0, perpMarkPrice: t3?.perpPrice ?? 0, unrealizedPnl: n3?.unrealizedPnl ?? 0 };
    }), s2 = o2.reduce((e3, t3) => e3 + t3.unrealizedPnl, 0), a2 = { timestamp: Date.now(), totalUnrealizedPnl: s2, totalRealizedPnl: this.state.totalRealizedPnl, totalFundingCollected: this.state.totalFundingCollected, netPnl: s2 + this.state.totalRealizedPnl + this.state.totalFundingCollected, openPositionCount: e2.length, totalExecutionCost: this.state.totalExecutionCost, positionMarks: o2 };
    return this.pnlHistory.push(a2), this.pnlHistory.length > 1440 && (this.pnlHistory = this.pnlHistory.slice(-1440)), this.emit({ type: "pnl_snapshot", timestamp: a2.timestamp, data: { snapshot: a2 } }), a2;
  }
  async reconcilePositions() {
    if (this.config.dryRun)
      return;
    const e2 = this.state.positions.filter((e3) => e3.status === "open");
    if (e2.length === 0)
      return;
    let t2;
    try {
      t2 = await this.adapter.getPositions();
    } catch {
      return;
    }
    const n2 = Date.now();
    for (const r3 of e2) {
      const e3 = r3.pair.split("/")[0], i2 = t2.find((t3) => t3.pair.startsWith(e3) && t3.instrument === "perp" && t3.side === "short");
      if (!i2) {
        this.emit({ type: "reconciliation_drift", timestamp: n2, data: { positionId: r3.id, pair: r3.pair, issue: "internal_position_not_found_on_exchange", message: `Position ${r3.pair} exists internally but not found on exchange — may have been liquidated or closed externally` } });
        continue;
      }
      const o2 = r3.spotEntry > 0 ? r3.sizeUsd / r3.spotEntry : 0;
      if (o2 > 0) {
        const e4 = Math.abs(i2.size - o2) / o2;
        e4 > 0.01 && this.emit({ type: "reconciliation_drift", timestamp: n2, data: { positionId: r3.id, pair: r3.pair, issue: "size_drift", engineSize: o2, exchangeSize: i2.size, driftPct: (100 * e4).toFixed(2), message: `Position ${r3.pair} size drift: engine=${o2.toFixed(6)}, exchange=${i2.size.toFixed(6)} (${(100 * e4).toFixed(2)}% drift)` } });
      }
    }
    const r2 = new Set(e2.map((e3) => e3.pair.split("/")[0]));
    for (const e3 of t2) {
      const t3 = e3.pair.split("/")[0];
      r2.has(t3) || e3.instrument !== "perp" || this.emit({ type: "untracked_position", timestamp: n2, data: { pair: e3.pair, side: e3.side, size: e3.size, message: `Untracked exchange position detected: ${e3.pair} ${e3.side} (size: ${e3.size})` } });
    }
  }
  async tick() {
    return this.scan();
  }
  async scan() {
    try {
      const e2 = await this.adapter.getFundingRates(this.config.pairs), t2 = Date.now();
      for (const n3 of e2)
        this.fundingHistory.record(n3.pair, n3.rate, t2);
      const n2 = this.state.phase === "error";
      this.update({ fundingRates: e2, lastScanAt: t2, phase: this.state.positions.some((e3) => e3.status === "open") ? "monitoring" : "scanning", ...n2 ? { errors: [] } : {} }), n2 && this.emit({ type: "error", timestamp: t2, data: { error: "Recovered from previous error — scanning resumed", context: "recovery" } }), await this.accumulateFunding(e2), await this.updatePnlFromApi(), await this.checkExits(e2), await this.checkRebalances(), await this.checkEntries(e2), this.scanCount++, this.scanCount % 5 == 0 && await this.reconcilePositions(), this.emit({ type: "scan_heartbeat", timestamp: t2, data: { pairsScanned: e2.length, openPositions: this.state.positions.filter((e3) => e3.status === "open").length, phase: this.state.phase } }), this.schedulePersist();
    } catch (e2) {
      const t2 = e2 instanceof Error ? e2.message : String(e2);
      this.update({ phase: "error", errors: [...this.state.errors.slice(-9), t2] }), this.emit({ type: "error", timestamp: Date.now(), data: { error: t2, context: "scan" } });
    }
  }
  async checkEntries(e2) {
    const t2 = [];
    for (const n2 of e2) {
      const e3 = n2.pair;
      if (!this.config.pairs.includes(e3))
        continue;
      const r2 = 100 * n2.rate;
      if (r2 < this.config.minFundingRatePct) {
        t2.push({ pair: e3, reason: `rate ${r2.toFixed(4)}% < threshold ${this.config.minFundingRatePct}%`, reasonCode: "below_threshold", thresholdPct: this.config.minFundingRatePct, ratePct: r2 });
        continue;
      }
      const i2 = this.fundingHistory.getZScore(e3);
      if (i2 !== null && i2 < 2) {
        t2.push({ pair: e3, reason: `rate ${r2.toFixed(4)}% passes floor but z-score ${i2.toFixed(2)} < 2`, reasonCode: "zscore_below_threshold", thresholdPct: this.config.minFundingRatePct, ratePct: r2, zScore: i2 });
        continue;
      }
      if (this.state.positions.some((t3) => t3.pair === e3 && (t3.status === "open" || t3.status === "rebalancing" || t3.status === "rebalance_failed"))) {
        t2.push({ pair: e3, reason: "position already open", reasonCode: "position_open", thresholdPct: this.config.minFundingRatePct, ratePct: r2, zScore: i2 });
        continue;
      }
      const o2 = this.getPositionSize(e3);
      if (o2 <= 0) {
        t2.push({ pair: e3, reason: "allocation is $0", reasonCode: "zero_allocation", thresholdPct: this.config.minFundingRatePct, ratePct: r2, zScore: i2 });
        continue;
      }
      const s2 = await this.hasCollateral(e3);
      await this.openPosition(e3, s2, o2);
    }
    t2.length > 0 && t2.length === this.config.pairs.length && this.emitNoopIfDistinct(t2);
  }
  buildNoopKey(e2) {
    return e2.map((e3) => `${e3.pair}|${e3.reasonCode}|T:${e3.thresholdPct.toFixed(3)}|R:${e3.ratePct.toFixed(4)}${e3.zScore != null ? `|Z:${e3.zScore.toFixed(2)}` : ""}`).sort().join(";");
  }
  emitNoopIfDistinct(e2) {
    const t2 = Date.now(), n2 = this.buildNoopKey(e2), r2 = 3 * (this.config.scanIntervalSecs ?? 60) * 1000;
    if (n2 === this.lastNoopKey && t2 - this.lastNoopEmitAt < r2)
      return void this.suppressedNoopCount++;
    const i2 = this.suppressedNoopCount;
    this.lastNoopKey = n2, this.lastNoopEmitAt = t2, this.suppressedNoopCount = 0, this.emit({ type: "scan_noop", timestamp: t2, data: { pairsScanned: this.config.pairs.length, reasons: e2, suppressedCount: i2 } });
  }
  getPositionSize(e2) {
    return this.config.useCapitalAllocation ? this.config.assetAllocations[e2] ?? 0 : this.config.positionSizeUsd;
  }
  async openPosition(e2, t2 = false, n2) {
    const r2 = n2 ?? this.getPositionSize(e2);
    let i2 = 0, o2 = 0;
    try {
      const t3 = (await this.adapter.getMarkPrices([e2])).find((t4) => t4.pair === e2);
      t3 && (i2 = t3.spotPrice, o2 = t3.perpPrice);
    } catch {
      if (!this.config.dryRun)
        return;
    }
    if (this.config.dryRun) {
      if (t2) {
        const t3 = await this.adapter.placePerpOrder({ pair: e2, side: "sell", sizeUsd: r2, orderType: "market", limitPrice: o2 || undefined });
        if ((await this.awaitFill(t3)).status === "rejected")
          return void this.emit({ type: "error", timestamp: Date.now(), data: { pair: e2, error: `Dry-run perp order rejected for ${e2}`, context: "open_position" } });
        const n3 = S(e2, this.config.targetExchange, "dry_collateral_hold", "dry_short_perp", i2, o2, r2);
        this.update({ phase: "monitoring", positions: [...this.state.positions, n3] }), this.emit({ type: "position_opened", timestamp: Date.now(), data: { pair: e2, dryRun: true, spotEntry: i2, perpEntry: o2, hedgeMode: "collateral+short_perp", slippageGuard: `${this.config.maxSlippagePct}%` } });
      } else {
        const t3 = await this.adapter.placeSpotOrder({ pair: e2, side: "buy", sizeUsd: r2, orderType: "market", limitPrice: i2 || undefined });
        if ((await this.awaitFill(t3)).status === "rejected")
          return void this.emit({ type: "error", timestamp: Date.now(), data: { pair: e2, error: `Dry-run spot order rejected for ${e2}`, context: "open_position" } });
        const n3 = await this.adapter.placePerpOrder({ pair: e2, side: "sell", sizeUsd: r2, orderType: "market", limitPrice: o2 || undefined });
        if ((await this.awaitFill(n3)).status === "rejected")
          return await this.adapter.placeSpotOrder({ pair: e2, side: "sell", sizeUsd: r2, reduceOnly: true }).catch(() => {}), void this.emit({ type: "error", timestamp: Date.now(), data: { pair: e2, error: `Dry-run perp rejected for ${e2} — spot leg rolled back`, context: "open_position_rollback" } });
        const s3 = S(e2, this.config.targetExchange, "dry_spot_buy", "dry_short_perp", i2, o2, r2);
        this.update({ phase: "monitoring", positions: [...this.state.positions, s3] }), this.emit({ type: "position_opened", timestamp: Date.now(), data: { pair: e2, dryRun: true, spotEntry: i2, perpEntry: o2, hedgeMode: "buy_spot+short_perp", slippageGuard: `${this.config.maxSlippagePct}%` } });
      }
      return void this.schedulePersist();
    }
    if (!t2 && this.adapter.getSettlementBalance)
      try {
        const t3 = e2.split("/")[1] || "USDT", n3 = await this.adapter.getSettlementBalance(t3);
        if (n3 < r2) {
          const t4 = `Insufficient settlement balance for ${e2}: available $${n3.toFixed(2)}, required $${r2.toFixed(2)}`;
          return this.update({ errors: [...this.state.errors, t4] }), void this.emit({ type: "error", timestamp: Date.now(), data: { pair: e2, error: t4, context: "balance_validation" } });
        }
      } catch (t3) {
        const n3 = t3 instanceof Error ? t3.message : String(t3);
        console.warn(`Balance check failed for ${e2}, proceeding cautiously:`, n3);
      }
    this.update({ phase: "executing" });
    const s2 = this.config.maxSlippagePct / 100, a2 = i2 > 0 ? i2 * (1 + s2) : undefined, l2 = o2 > 0 ? o2 * (1 - s2) : undefined;
    try {
      if (t2) {
        const t3 = await this.adapter.placePerpOrder({ pair: e2, side: "sell", sizeUsd: r2, orderType: l2 ? "limit" : "market", limitPrice: l2 }), n3 = await this.awaitFill(t3, e2);
        if (n3.status === "rejected")
          throw new Error(`Perp order rejected for ${e2}`);
        const i3 = I(n3.avgPrice, o2 || n3.avgPrice, r2, "sell"), s3 = S(e2, this.config.targetExchange, "collateral_hold", n3.orderId, 0, n3.avgPrice, r2);
        s3.executionCost = i3, this.update({ phase: "monitoring", positions: [...this.state.positions, s3], totalExecutionCost: this.state.totalExecutionCost + i3 }), this.emit({ type: "position_opened", timestamp: Date.now(), data: { pair: e2, perpResult: n3, hedgeMode: "collateral+short_perp", executionCost: i3 } });
      } else {
        const t3 = await this.adapter.placeSpotOrder({ pair: e2, side: "buy", sizeUsd: r2, orderType: a2 ? "limit" : "market", limitPrice: a2 }), n3 = await this.awaitFill(t3, e2);
        if (n3.status === "rejected")
          throw new Error(`Spot order rejected for ${e2}`);
        const s3 = await this.adapter.placePerpOrder({ pair: e2, side: "sell", sizeUsd: r2, orderType: l2 ? "limit" : "market", limitPrice: l2 }), c2 = await this.awaitFill(s3, e2);
        if (c2.status === "rejected") {
          this.emit({ type: "error", timestamp: Date.now(), data: { pair: e2, error: `Perp order rejected for ${e2} — initiating spot rollback`, context: "open_position_rollback" } });
          try {
            const t4 = await this.adapter.placeSpotOrder({ pair: e2, side: "sell", sizeUsd: r2, reduceOnly: true, orderType: "market" }), n4 = await this.awaitFill(t4, e2);
            this.emit({ type: "error", timestamp: Date.now(), data: { pair: e2, error: `Spot rollback ${n4.status === "filled" ? "succeeded" : "FAILED"} for ${e2}`, context: "rollback_result", rollbackResult: n4 } });
          } catch (t4) {
            const n4 = t4 instanceof Error ? t4.message : String(t4);
            this.emit({ type: "error", timestamp: Date.now(), data: { pair: e2, error: `CRITICAL: Spot rollback failed for ${e2}: ${n4} — MANUAL INTERVENTION REQUIRED`, context: "rollback_failure" } });
          }
          throw new Error(`Perp order rejected for ${e2} — position not opened`);
        }
        const d2 = I(n3.avgPrice, i2 || n3.avgPrice, r2, "buy") + I(c2.avgPrice, o2 || c2.avgPrice, r2, "sell"), u2 = S(e2, this.config.targetExchange, n3.orderId, c2.orderId, n3.avgPrice, c2.avgPrice, r2);
        u2.executionCost = d2, this.update({ phase: "monitoring", positions: [...this.state.positions, u2], totalExecutionCost: this.state.totalExecutionCost + d2 }), this.emit({ type: "position_opened", timestamp: Date.now(), data: { pair: e2, spotResult: n3, perpResult: c2, hedgeMode: "buy_spot+short_perp", executionCost: d2 } });
      }
      this.schedulePersist();
    } catch (t3) {
      const n3 = t3 instanceof Error ? t3.message : String(t3);
      this.update({ phase: "monitoring", errors: [...this.state.errors, n3] }), this.emit({ type: "error", timestamp: Date.now(), data: { pair: e2, error: n3 } });
    }
  }
  async checkExits(e2) {
    const t2 = 86400000 * this.config.maxHoldDays;
    for (const n2 of this.state.positions) {
      if (n2.status !== "open")
        continue;
      const r2 = e2.find((e3) => e3.pair === n2.pair), i2 = r2?.rate ?? 0, o2 = this.fundingHistory.getZScore(n2.pair), { exit: s2, reason: a2 } = P(n2, i2, t2, o2);
      s2 && await this.closePosition(n2, a2), n2.marginHealthPct < this.config.marginHealthThresholdPct && this.emit({ type: "margin_warning", timestamp: Date.now(), data: { positionId: n2.id, pair: n2.pair, marginHealthPct: n2.marginHealthPct, threshold: this.config.marginHealthThresholdPct, message: `Margin health ${n2.marginHealthPct.toFixed(1)}% below threshold ${this.config.marginHealthThresholdPct}%` } });
    }
  }
  async checkRebalances() {
    const e2 = Date.now();
    for (const t2 of this.state.positions) {
      if (t2.status !== "open")
        continue;
      const { rebalance: n2 } = E(t2, this.config, e2);
      n2 && await this.rebalancePosition(t2);
    }
  }
  async rebalancePosition(e2) {
    const t2 = e2.spotOrderId === "collateral_hold" || e2.spotOrderId === "dry_collateral_hold", n2 = Date.now();
    let { spotEntry: r2, perpEntry: i2 } = e2;
    try {
      const t3 = (await this.adapter.getMarkPrices([e2.pair])).find((t4) => t4.pair === e2.pair);
      t3 && (r2 = t3.spotPrice, i2 = t3.perpPrice);
    } catch {
      return;
    }
    if (this.updatePositionStatus(e2.id, "rebalancing"), this.config.dryRun) {
      const o3 = this.state.positions.map((o4) => o4.id !== e2.id ? o4 : { ...o4, status: "open", spotEntry: t2 ? o4.spotEntry : r2, perpEntry: i2, lastRebalancedAt: n2 });
      return this.update({ positions: o3 }), this.emit({ type: "rebalance", timestamp: n2, data: { reason: "weekly_hedge_correction", positionId: e2.id, pair: e2.pair, dryRun: true, legsRebalanced: t2 ? "perp_only" : "both", oldEntries: { spot: e2.spotEntry, perp: e2.perpEntry }, newEntries: { spot: t2 ? e2.spotEntry : r2, perp: i2 } } }), void this.schedulePersist();
    }
    const o2 = this.config.maxSlippagePct / 100;
    try {
      if (t2) {
        const t3 = await this.adapter.placePerpOrder({ pair: e2.pair, side: "buy", sizeUsd: e2.sizeUsd, reduceOnly: true, orderType: "limit", limitPrice: i2 * (1 + o2) });
        if ((await this.awaitFill(t3, e2.pair)).status === "rejected")
          return this.updatePositionStatus(e2.id, "open"), void this.emit({ type: "error", timestamp: n2, data: { pair: e2.pair, error: `Rebalance close failed for ${e2.pair} — reverting to open`, context: "rebalance_close" } });
        const r3 = await this.adapter.placePerpOrder({ pair: e2.pair, side: "sell", sizeUsd: e2.sizeUsd, orderType: "limit", limitPrice: i2 * (1 - o2) }), s2 = await this.awaitFill(r3, e2.pair);
        if (s2.status === "rejected")
          return this.updatePositionStatus(e2.id, "rebalance_failed"), void this.emit({ type: "error", timestamp: n2, data: { pair: e2.pair, error: `CRITICAL: Rebalance re-open failed for ${e2.pair} — position is UNHEDGED — MANUAL INTERVENTION REQUIRED`, context: "rebalance_reopen_failure", positionId: e2.id } });
        const a2 = this.state.positions.map((t4) => t4.id !== e2.id ? t4 : { ...t4, status: "open", perpOrderId: s2.orderId, perpEntry: s2.avgPrice, lastRebalancedAt: n2 });
        this.update({ positions: a2 });
      } else {
        const t3 = await this.adapter.placeSpotOrder({ pair: e2.pair, side: "sell", sizeUsd: e2.sizeUsd, reduceOnly: true, orderType: "limit", limitPrice: r2 * (1 - o2) }), s2 = await this.awaitFill(t3, e2.pair), a2 = await this.adapter.placePerpOrder({ pair: e2.pair, side: "buy", sizeUsd: e2.sizeUsd, reduceOnly: true, orderType: "limit", limitPrice: i2 * (1 + o2) }), l2 = await this.awaitFill(a2, e2.pair);
        if (s2.status === "rejected" || l2.status === "rejected")
          return this.updatePositionStatus(e2.id, "open"), void this.emit({ type: "error", timestamp: n2, data: { pair: e2.pair, error: `Rebalance close failed for ${e2.pair} — reverting to open`, context: "rebalance_close" } });
        const c2 = await this.adapter.placeSpotOrder({ pair: e2.pair, side: "buy", sizeUsd: e2.sizeUsd, orderType: "limit", limitPrice: r2 * (1 + o2) }), d2 = await this.awaitFill(c2, e2.pair), u2 = await this.adapter.placePerpOrder({ pair: e2.pair, side: "sell", sizeUsd: e2.sizeUsd, orderType: "limit", limitPrice: i2 * (1 - o2) }), h2 = await this.awaitFill(u2, e2.pair);
        if (d2.status === "rejected" || h2.status === "rejected")
          return this.updatePositionStatus(e2.id, "rebalance_failed"), void this.emit({ type: "error", timestamp: n2, data: { pair: e2.pair, error: `CRITICAL: Rebalance re-open failed for ${e2.pair} — position is UNHEDGED — MANUAL INTERVENTION REQUIRED`, context: "rebalance_reopen_failure", positionId: e2.id } });
        const p2 = this.state.positions.map((t4) => t4.id !== e2.id ? t4 : { ...t4, status: "open", spotOrderId: d2.orderId, perpOrderId: h2.orderId, spotEntry: d2.avgPrice, perpEntry: h2.avgPrice, lastRebalancedAt: n2 });
        this.update({ positions: p2 });
      }
      this.emit({ type: "rebalance", timestamp: n2, data: { reason: "weekly_hedge_correction", positionId: e2.id, pair: e2.pair, legsRebalanced: t2 ? "perp_only" : "both", oldEntries: { spot: e2.spotEntry, perp: e2.perpEntry }, newEntries: { spot: t2 ? e2.spotEntry : r2, perp: i2 } } }), this.schedulePersist();
    } catch (t3) {
      const r3 = t3 instanceof Error ? t3.message : String(t3), i3 = this.state.positions.find((t4) => t4.id === e2.id);
      i3?.status === "rebalancing" && this.updatePositionStatus(e2.id, "rebalance_failed"), this.update({ errors: [...this.state.errors, r3] }), this.emit({ type: "error", timestamp: n2, data: { pair: e2.pair, error: r3, context: "rebalance" } });
    }
  }
  updatePositionStatus(e2, t2) {
    this.update({ positions: this.state.positions.map((n2) => n2.id === e2 ? { ...n2, status: t2 } : n2) });
  }
  async closePosition(e2, t2) {
    const n2 = e2.unrealizedPnl + e2.fundingCollected, r2 = e2.pair.split("/")[1] || "USDT";
    if (this.config.dryRun)
      return this.update({ positions: this.state.positions.map((t3) => t3.id === e2.id ? { ...t3, status: "closed" } : t3), totalRealizedPnl: this.state.totalRealizedPnl + e2.unrealizedPnl }), this.emit({ type: "position_closed", timestamp: Date.now(), data: { posId: e2.id, reason: t2, dryRun: true, fundingCollected: e2.fundingCollected, basisPnl: e2.unrealizedPnl, totalPnl: n2 } }), e2.fundingCollected > 0 && this.config.yieldMode !== "compound" && this.emit({ type: "yield_swept", timestamp: Date.now(), data: { positionId: e2.id, pair: e2.pair, amount: e2.fundingCollected, asset: r2, dryRun: true, message: `Simulated sweep of $${e2.fundingCollected.toFixed(2)} funding yield to spot wallet` } }), void this.schedulePersist();
    this.update({ phase: "exiting" });
    try {
      let i2, o2;
      try {
        const t3 = (await this.adapter.getMarkPrices([e2.pair])).find((t4) => t4.pair === e2.pair);
        if (t3) {
          const e3 = this.config.maxSlippagePct / 100;
          i2 = t3.spotPrice * (1 - e3), o2 = t3.perpPrice * (1 + e3);
        }
      } catch {}
      if (e2.spotOrderId === "collateral_hold" || e2.spotOrderId === "dry_collateral_hold") {
        const t3 = await this.adapter.placePerpOrder({ pair: e2.pair, side: "buy", sizeUsd: e2.sizeUsd, reduceOnly: true, orderType: o2 ? "limit" : "market", limitPrice: o2 });
        if ((await this.awaitFill(t3, e2.pair)).status === "rejected")
          throw new Error(`Close perp order rejected for ${e2.pair}`);
      } else {
        const t3 = await this.adapter.placePerpOrder({ pair: e2.pair, side: "buy", sizeUsd: e2.sizeUsd, reduceOnly: true, orderType: o2 ? "limit" : "market", limitPrice: o2 });
        if ((await this.awaitFill(t3, e2.pair)).status === "rejected")
          throw new Error(`Close perp order rejected for ${e2.pair}`);
        const n3 = await this.adapter.placeSpotOrder({ pair: e2.pair, side: "sell", sizeUsd: e2.sizeUsd, reduceOnly: true, orderType: i2 ? "limit" : "market", limitPrice: i2 });
        (await this.awaitFill(n3, e2.pair)).status === "rejected" && this.emit({ type: "error", timestamp: Date.now(), data: { pair: e2.pair, error: `Close spot order rejected for ${e2.pair} — perp already closed, spot remains`, context: "close_partial" } });
      }
      if (this.update({ phase: "monitoring", positions: this.state.positions.map((t3) => t3.id === e2.id ? { ...t3, status: "closed" } : t3), totalRealizedPnl: this.state.totalRealizedPnl + e2.unrealizedPnl }), this.emit({ type: "position_closed", timestamp: Date.now(), data: { posId: e2.id, reason: t2, fundingCollected: e2.fundingCollected, basisPnl: e2.unrealizedPnl, totalPnl: n2 } }), e2.fundingCollected > 0 && this.adapter.transferToSpot && this.config.yieldMode !== "compound")
        try {
          const t3 = await this.adapter.transferToSpot({ amountUsd: e2.fundingCollected, asset: r2 });
          this.emit({ type: "yield_swept", timestamp: Date.now(), data: { positionId: e2.id, pair: e2.pair, amount: e2.fundingCollected, asset: r2, success: t3, message: t3 ? `Swept $${e2.fundingCollected.toFixed(2)} funding yield to spot wallet` : `Yield sweep failed for $${e2.fundingCollected.toFixed(2)} — funds remain in derivatives wallet` } });
        } catch (t3) {
          const n3 = t3 instanceof Error ? t3.message : String(t3);
          this.emit({ type: "yield_swept", timestamp: Date.now(), data: { positionId: e2.id, pair: e2.pair, amount: e2.fundingCollected, asset: r2, success: false, error: n3 } });
        }
      this.schedulePersist();
    } catch (e3) {
      const t3 = e3 instanceof Error ? e3.message : String(e3);
      this.update({ errors: [...this.state.errors, t3] });
    }
  }
  update(e2) {
    this.state = { ...this.state, ...e2 };
    for (const e3 of this.listeners)
      e3(this.state);
  }
  emit(e2) {
    for (const t2 of this.eventListeners)
      t2(e2);
  }
}
var A = "6.17.0";
function T(e2, t2, n2) {
  const r2 = t2.split("|").map((e3) => e3.trim());
  for (let n3 = 0;n3 < r2.length; n3++)
    switch (t2) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof e2 === t2)
          return;
    }
  const i2 = new Error(`invalid value for type ${t2}`);
  throw i2.code = "INVALID_ARGUMENT", i2.argument = `value.${n2}`, i2.value = e2, i2;
}
async function R(e2) {
  const t2 = Object.keys(e2);
  return (await Promise.all(t2.map((t3) => Promise.resolve(e2[t3])))).reduce((e3, n2, r2) => (e3[t2[r2]] = n2, e3), {});
}
function U(e2, t2, n2) {
  for (let r2 in t2) {
    let i2 = t2[r2];
    const o2 = n2 ? n2[r2] : null;
    o2 && T(i2, o2, r2), Object.defineProperty(e2, r2, { enumerable: true, value: i2, writable: false });
  }
}
function F(e2, t2) {
  if (e2 == null)
    return "null";
  if (t2 == null && (t2 = new Set), typeof e2 == "object") {
    if (t2.has(e2))
      return "[Circular]";
    t2.add(e2);
  }
  if (Array.isArray(e2))
    return "[ " + e2.map((e3) => F(e3, t2)).join(", ") + " ]";
  if (e2 instanceof Uint8Array) {
    const t3 = "0123456789abcdef";
    let n2 = "0x";
    for (let r2 = 0;r2 < e2.length; r2++)
      n2 += t3[e2[r2] >> 4], n2 += t3[15 & e2[r2]];
    return n2;
  }
  if (typeof e2 == "object" && typeof e2.toJSON == "function")
    return F(e2.toJSON(), t2);
  switch (typeof e2) {
    case "boolean":
    case "number":
    case "symbol":
      return e2.toString();
    case "bigint":
      return BigInt(e2).toString();
    case "string":
      return JSON.stringify(e2);
    case "object": {
      const n2 = Object.keys(e2);
      return n2.sort(), "{ " + n2.map((n3) => `${F(n3, t2)}: ${F(e2[n3], t2)}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function O(e2, t2, n2, r2) {
  if (!e2)
    throw function(e3, t3, n3) {
      let r3, i2 = e3;
      {
        const r4 = [];
        if (n3) {
          if ("message" in n3 || "code" in n3 || "name" in n3)
            throw new Error(`value will overwrite populated values: ${F(n3)}`);
          for (const e4 in n3) {
            if (e4 === "shortMessage")
              continue;
            const t4 = n3[e4];
            r4.push(e4 + "=" + F(t4));
          }
        }
        r4.push(`code=${t3}`), r4.push(`version=${A}`), r4.length && (e3 += " (" + r4.join(", ") + ")");
      }
      switch (t3) {
        case "INVALID_ARGUMENT":
          r3 = new TypeError(e3);
          break;
        case "NUMERIC_FAULT":
        case "BUFFER_OVERRUN":
          r3 = new RangeError(e3);
          break;
        default:
          r3 = new Error(e3);
      }
      return U(r3, { code: t3 }), n3 && Object.assign(r3, n3), r3.shortMessage == null && U(r3, { shortMessage: i2 }), r3;
    }(t2, n2, r2);
}
function z(e2, t2, n2, r2) {
  O(e2, t2, "INVALID_ARGUMENT", { argument: n2, value: r2 });
}
var N = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e2, t2) => {
  try {
    if ("test".normalize(t2) !== "test")
      throw new Error("bad");
    if (t2 === "NFD") {
      if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
        throw new Error("broken");
    }
    e2.push(t2);
  } catch (e3) {}
  return e2;
}, []);
function $(e2) {
  O(N.indexOf(e2) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", { operation: "String.prototype.normalize", info: { form: e2 } });
}
function B(e2, t2, n2) {
  if (n2 == null && (n2 = ""), e2 !== t2) {
    let e3 = n2, t3 = "new";
    n2 && (e3 += ".", t3 += " " + n2), O(false, `private constructor; use ${e3}from* methods`, "UNSUPPORTED_OPERATION", { operation: t3 });
  }
}
function L(e2, t2, n2) {
  if (e2 instanceof Uint8Array)
    return n2 ? new Uint8Array(e2) : e2;
  if (typeof e2 == "string" && e2.length % 2 == 0 && e2.match(/^0x[0-9a-f]*$/i)) {
    const t3 = new Uint8Array((e2.length - 2) / 2);
    let n3 = 2;
    for (let r2 = 0;r2 < t3.length; r2++)
      t3[r2] = parseInt(e2.substring(n3, n3 + 2), 16), n3 += 2;
    return t3;
  }
  z(false, "invalid BytesLike value", t2 || "value", e2);
}
function D(e2, t2) {
  return L(e2, t2, false);
}
function _(e2, t2) {
  return L(e2, t2, true);
}
function M(e2, t2) {
  return !(typeof e2 != "string" || !e2.match(/^0x[0-9A-Fa-f]*$/) || typeof t2 == "number" && e2.length !== 2 + 2 * t2 || t2 === true && e2.length % 2 != 0);
}
function W(e2) {
  return M(e2, true) || e2 instanceof Uint8Array;
}
var H = "0123456789abcdef";
function j(e2) {
  const t2 = D(e2);
  let n2 = "0x";
  for (let e3 = 0;e3 < t2.length; e3++) {
    const r2 = t2[e3];
    n2 += H[(240 & r2) >> 4] + H[15 & r2];
  }
  return n2;
}
function K(e2) {
  return "0x" + e2.map((e3) => j(e3).substring(2)).join("");
}
function G(e2) {
  return M(e2, true) ? (e2.length - 2) / 2 : D(e2).length;
}
function V(e2, t2, n2) {
  const r2 = D(e2);
  return n2 != null && n2 > r2.length && O(false, "cannot slice beyond data bounds", "BUFFER_OVERRUN", { buffer: r2, length: r2.length, offset: n2 }), j(r2.slice(t2 ?? 0, n2 ?? r2.length));
}
function q(e2, t2) {
  return function(e3, t3, n2) {
    const r2 = D(e3);
    O(t3 >= r2.length, "padding exceeds data length", "BUFFER_OVERRUN", { buffer: new Uint8Array(r2), length: t3, offset: t3 + 1 });
    const i2 = new Uint8Array(t3);
    return i2.fill(0), n2 ? i2.set(r2, t3 - r2.length) : i2.set(r2, 0), j(i2);
  }(e2, t2, true);
}
function Y(e2) {
  if (!Number.isSafeInteger(e2) || e2 < 0)
    throw new Error(`Wrong positive integer: ${e2}`);
}
function J(e2, ...t2) {
  if (!(e2 instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t2.length > 0 && !t2.includes(e2.length))
    throw new Error(`Expected Uint8Array of length ${t2}, not of length=${e2.length}`);
}
function Z(e2) {
  if (typeof e2 != "function" || typeof e2.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Y(e2.outputLen), Y(e2.blockLen);
}
function X(e2, t2 = true) {
  if (e2.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t2 && e2.finished)
    throw new Error("Hash#digest() has already been called");
}
function Q(e2, t2) {
  J(e2);
  const n2 = t2.outputLen;
  if (e2.length < n2)
    throw new Error(`digestInto() expects output buffer of length at least ${n2}`);
}
var ee = BigInt(4294967295);
var te = BigInt(32);
function ne(e2, t2 = false) {
  return t2 ? { h: Number(e2 & ee), l: Number(e2 >> te & ee) } : { h: 0 | Number(e2 >> te & ee), l: 0 | Number(e2 & ee) };
}
function re(e2, t2 = false) {
  let n2 = new Uint32Array(e2.length), r2 = new Uint32Array(e2.length);
  for (let i2 = 0;i2 < e2.length; i2++) {
    const { h: o2, l: s2 } = ne(e2[i2], t2);
    [n2[i2], r2[i2]] = [o2, s2];
  }
  return [n2, r2];
}
var ie = (e2, t2, n2) => e2 << n2 | t2 >>> 32 - n2;
var oe = (e2, t2, n2) => t2 << n2 | e2 >>> 32 - n2;
var se = (e2, t2, n2) => t2 << n2 - 32 | e2 >>> 64 - n2;
var ae = (e2, t2, n2) => e2 << n2 - 32 | t2 >>> 64 - n2;
var le = { fromBig: ne, split: re, toBig: (e2, t2) => BigInt(e2 >>> 0) << te | BigInt(t2 >>> 0), shrSH: (e2, t2, n2) => e2 >>> n2, shrSL: (e2, t2, n2) => e2 << 32 - n2 | t2 >>> n2, rotrSH: (e2, t2, n2) => e2 >>> n2 | t2 << 32 - n2, rotrSL: (e2, t2, n2) => e2 << 32 - n2 | t2 >>> n2, rotrBH: (e2, t2, n2) => e2 << 64 - n2 | t2 >>> n2 - 32, rotrBL: (e2, t2, n2) => e2 >>> n2 - 32 | t2 << 64 - n2, rotr32H: (e2, t2) => t2, rotr32L: (e2, t2) => e2, rotlSH: ie, rotlSL: oe, rotlBH: se, rotlBL: ae, add: function(e2, t2, n2, r2) {
  const i2 = (t2 >>> 0) + (r2 >>> 0);
  return { h: e2 + n2 + (i2 / 4294967296 | 0) | 0, l: 0 | i2 };
}, add3L: (e2, t2, n2) => (e2 >>> 0) + (t2 >>> 0) + (n2 >>> 0), add3H: (e2, t2, n2, r2) => t2 + n2 + r2 + (e2 / 4294967296 | 0) | 0, add4L: (e2, t2, n2, r2) => (e2 >>> 0) + (t2 >>> 0) + (n2 >>> 0) + (r2 >>> 0), add4H: (e2, t2, n2, r2, i2) => t2 + n2 + r2 + i2 + (e2 / 4294967296 | 0) | 0, add5H: (e2, t2, n2, r2, i2, o2) => t2 + n2 + r2 + i2 + o2 + (e2 / 4294967296 | 0) | 0, add5L: (e2, t2, n2, r2, i2) => (e2 >>> 0) + (t2 >>> 0) + (n2 >>> 0) + (r2 >>> 0) + (i2 >>> 0) };
var ce = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : undefined;
var de = (e2) => e2 instanceof Uint8Array;
var ue = (e2) => new Uint32Array(e2.buffer, e2.byteOffset, Math.floor(e2.byteLength / 4));
var he = (e2) => new DataView(e2.buffer, e2.byteOffset, e2.byteLength);
var pe = (e2, t2) => e2 << 32 - t2 | e2 >>> t2;
if (new Uint8Array(new Uint32Array([287454020]).buffer)[0] !== 68)
  throw new Error("Non little-endian hardware is not supported");
var fe = async () => {};
async function ge(e2, t2, n2) {
  let r2 = Date.now();
  for (let i2 = 0;i2 < e2; i2++) {
    n2(i2);
    const e3 = Date.now() - r2;
    e3 >= 0 && e3 < t2 || (await fe(), r2 += e3);
  }
}
function ye(e2) {
  if (typeof e2 == "string" && (e2 = function(e3) {
    if (typeof e3 != "string")
      throw new Error("utf8ToBytes expected string, got " + typeof e3);
    return new Uint8Array(new TextEncoder().encode(e3));
  }(e2)), !de(e2))
    throw new Error("expected Uint8Array, got " + typeof e2);
  return e2;
}

class me {
  clone() {
    return this._cloneInto();
  }
}
var be = {}.toString;
function we(e2, t2) {
  if (t2 !== undefined && be.call(t2) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e2, t2);
}
function ve(e2) {
  const t2 = (t3) => e2().update(ye(t3)).digest(), n2 = e2();
  return t2.outputLen = n2.outputLen, t2.blockLen = n2.blockLen, t2.create = () => e2(), t2;
}
function xe(e2 = 32) {
  if (ce && typeof ce.getRandomValues == "function")
    return ce.getRandomValues(new Uint8Array(e2));
  throw new Error("crypto.getRandomValues must be defined");
}
var [Se, Pe, Ee] = [[], [], []];
var ke = BigInt(0);
var Ie = BigInt(1);
var Ce = BigInt(2);
var Ae = BigInt(7);
var Te = BigInt(256);
var Re = BigInt(113);
for (let e2 = 0, t2 = Ie, n2 = 1, r2 = 0;e2 < 24; e2++) {
  [n2, r2] = [r2, (2 * n2 + 3 * r2) % 5], Se.push(2 * (5 * r2 + n2)), Pe.push((e2 + 1) * (e2 + 2) / 2 % 64);
  let i2 = ke;
  for (let e3 = 0;e3 < 7; e3++)
    t2 = (t2 << Ie ^ (t2 >> Ae) * Re) % Te, t2 & Ce && (i2 ^= Ie << (Ie << BigInt(e3)) - Ie);
  Ee.push(i2);
}
var [Ue, Fe] = re(Ee, true);
var Oe = (e2, t2, n2) => n2 > 32 ? se(e2, t2, n2) : ie(e2, t2, n2);
var ze = (e2, t2, n2) => n2 > 32 ? ae(e2, t2, n2) : oe(e2, t2, n2);

class Ne extends me {
  constructor(e2, t2, n2, r2 = false, i2 = 24) {
    if (super(), this.blockLen = e2, this.suffix = t2, this.outputLen = n2, this.enableXOF = r2, this.rounds = i2, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, Y(n2), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = ue(this.state);
  }
  keccak() {
    (function(e2, t2 = 24) {
      const n2 = new Uint32Array(10);
      for (let r2 = 24 - t2;r2 < 24; r2++) {
        for (let t4 = 0;t4 < 10; t4++)
          n2[t4] = e2[t4] ^ e2[t4 + 10] ^ e2[t4 + 20] ^ e2[t4 + 30] ^ e2[t4 + 40];
        for (let t4 = 0;t4 < 10; t4 += 2) {
          const r3 = (t4 + 8) % 10, i3 = (t4 + 2) % 10, o2 = n2[i3], s2 = n2[i3 + 1], a2 = Oe(o2, s2, 1) ^ n2[r3], l2 = ze(o2, s2, 1) ^ n2[r3 + 1];
          for (let n3 = 0;n3 < 50; n3 += 10)
            e2[t4 + n3] ^= a2, e2[t4 + n3 + 1] ^= l2;
        }
        let t3 = e2[2], i2 = e2[3];
        for (let n3 = 0;n3 < 24; n3++) {
          const r3 = Pe[n3], o2 = Oe(t3, i2, r3), s2 = ze(t3, i2, r3), a2 = Se[n3];
          t3 = e2[a2], i2 = e2[a2 + 1], e2[a2] = o2, e2[a2 + 1] = s2;
        }
        for (let t4 = 0;t4 < 50; t4 += 10) {
          for (let r3 = 0;r3 < 10; r3++)
            n2[r3] = e2[t4 + r3];
          for (let r3 = 0;r3 < 10; r3++)
            e2[t4 + r3] ^= ~n2[(r3 + 2) % 10] & n2[(r3 + 4) % 10];
        }
        e2[0] ^= Ue[r2], e2[1] ^= Fe[r2];
      }
      n2.fill(0);
    })(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(e2) {
    X(this);
    const { blockLen: t2, state: n2 } = this, r2 = (e2 = ye(e2)).length;
    for (let i2 = 0;i2 < r2; ) {
      const o2 = Math.min(t2 - this.pos, r2 - i2);
      for (let t3 = 0;t3 < o2; t3++)
        n2[this.pos++] ^= e2[i2++];
      this.pos === t2 && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state: e2, suffix: t2, pos: n2, blockLen: r2 } = this;
    e2[n2] ^= t2, 128 & t2 && n2 === r2 - 1 && this.keccak(), e2[r2 - 1] ^= 128, this.keccak();
  }
  writeInto(e2) {
    X(this, false), J(e2), this.finish();
    const t2 = this.state, { blockLen: n2 } = this;
    for (let r2 = 0, i2 = e2.length;r2 < i2; ) {
      this.posOut >= n2 && this.keccak();
      const o2 = Math.min(n2 - this.posOut, i2 - r2);
      e2.set(t2.subarray(this.posOut, this.posOut + o2), r2), this.posOut += o2, r2 += o2;
    }
    return e2;
  }
  xofInto(e2) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(e2);
  }
  xof(e2) {
    return Y(e2), this.xofInto(new Uint8Array(e2));
  }
  digestInto(e2) {
    if (Q(e2, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(e2), this.destroy(), e2;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, this.state.fill(0);
  }
  _cloneInto(e2) {
    const { blockLen: t2, suffix: n2, outputLen: r2, rounds: i2, enableXOF: o2 } = this;
    return e2 || (e2 = new Ne(t2, n2, r2, o2, i2)), e2.state32.set(this.state32), e2.pos = this.pos, e2.posOut = this.posOut, e2.finished = this.finished, e2.rounds = i2, e2.suffix = n2, e2.outputLen = r2, e2.enableXOF = o2, e2.destroyed = this.destroyed, e2;
  }
}
var $e = ((e2, t2, n2) => ve(() => new Ne(t2, e2, n2)))(1, 136, 32);
var Be = false;
var Le = function(e2) {
  return $e(e2);
};
var De = Le;
function _e(e2) {
  const t2 = D(e2, "data");
  return j(De(t2));
}
_e._ = Le, _e.lock = function() {
  Be = true;
}, _e.register = function(e2) {
  if (Be)
    throw new TypeError("keccak256 is locked");
  De = e2;
}, Object.freeze(_e);
var Me = "0x0000000000000000000000000000000000000000000000000000000000000000";
var We = BigInt(0);
var He = BigInt(1);
var je = 9007199254740991;
function Ke(e2, t2) {
  switch (typeof e2) {
    case "bigint":
      return e2;
    case "number":
      return z(Number.isInteger(e2), "underflow", t2 || "value", e2), z(e2 >= -je && e2 <= je, "overflow", t2 || "value", e2), BigInt(e2);
    case "string":
      try {
        if (e2 === "")
          throw new Error("empty string");
        return e2[0] === "-" && e2[1] !== "-" ? -BigInt(e2.substring(1)) : BigInt(e2);
      } catch (n2) {
        z(false, `invalid BigNumberish string: ${n2.message}`, t2 || "value", e2);
      }
  }
  z(false, "invalid BigNumberish value", t2 || "value", e2);
}
function Ge(e2, t2) {
  const n2 = Ke(e2, t2);
  return O(n2 >= We, "unsigned value cannot be negative", "NUMERIC_FAULT", { fault: "overflow", operation: "getUint", value: e2 }), n2;
}
var Ve = "0123456789abcdef";
function qe(e2) {
  if (e2 instanceof Uint8Array) {
    let t2 = "0x0";
    for (const n2 of e2)
      t2 += Ve[n2 >> 4], t2 += Ve[15 & n2];
    return BigInt(t2);
  }
  return Ke(e2);
}
function Ye(e2, t2) {
  switch (typeof e2) {
    case "bigint":
      return z(e2 >= -je && e2 <= je, "overflow", t2 || "value", e2), Number(e2);
    case "number":
      return z(Number.isInteger(e2), "underflow", t2 || "value", e2), z(e2 >= -je && e2 <= je, "overflow", t2 || "value", e2), e2;
    case "string":
      try {
        if (e2 === "")
          throw new Error("empty string");
        return Ye(BigInt(e2), t2);
      } catch (n2) {
        z(false, `invalid numeric string: ${n2.message}`, t2 || "value", e2);
      }
  }
  z(false, "invalid numeric value", t2 || "value", e2);
}
function Je(e2, t2) {
  const n2 = Ge(e2, "value");
  let r2 = n2.toString(16);
  if (t2 == null)
    r2.length % 2 && (r2 = "0" + r2);
  else {
    const i2 = Ye(t2, "width");
    if (i2 === 0 && n2 === We)
      return "0x";
    for (O(2 * i2 >= r2.length, `value exceeds width (${i2} bytes)`, "NUMERIC_FAULT", { operation: "toBeHex", fault: "overflow", value: e2 });r2.length < 2 * i2; )
      r2 = "0" + r2;
  }
  return "0x" + r2;
}
function Ze(e2, t2) {
  const n2 = Ge(e2, "value");
  if (n2 === We) {
    const e3 = t2 != null ? Ye(t2, "width") : 0;
    return new Uint8Array(e3);
  }
  let r2 = n2.toString(16);
  if (r2.length % 2 && (r2 = "0" + r2), t2 != null) {
    const n3 = Ye(t2, "width");
    for (;r2.length < 2 * n3; )
      r2 = "00" + r2;
    O(2 * n3 === r2.length, `value exceeds width (${n3} bytes)`, "NUMERIC_FAULT", { operation: "toBeArray", fault: "overflow", value: e2 });
  }
  const i2 = new Uint8Array(r2.length / 2);
  for (let e3 = 0;e3 < i2.length; e3++) {
    const t3 = 2 * e3;
    i2[e3] = parseInt(r2.substring(t3, t3 + 2), 16);
  }
  return i2;
}
var Xe = BigInt(0);
var Qe = BigInt(1);
var et = BigInt(2);
var tt = BigInt(27);
var nt = BigInt(28);
var rt = BigInt(35);
var it = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var ot = it / et;
var st = Symbol.for("nodejs.util.inspect.custom");
var at = {};
function lt(e2) {
  return q(Ze(e2), 32);
}

class ct {
  #e;
  #t;
  #n;
  #r;
  get r() {
    return this.#e;
  }
  set r(e2) {
    z(G(e2) === 32, "invalid r", "value", e2), this.#e = j(e2);
  }
  get s() {
    return z(parseInt(this.#t.substring(0, 3)) < 8, "non-canonical s; use ._s", "s", this.#t), this.#t;
  }
  set s(e2) {
    z(G(e2) === 32, "invalid s", "value", e2), this.#t = j(e2);
  }
  get _s() {
    return this.#t;
  }
  isValid() {
    return BigInt(this.#t) <= ot;
  }
  get v() {
    return this.#n;
  }
  set v(e2) {
    const t2 = Ye(e2, "value");
    z(t2 === 27 || t2 === 28, "invalid v", "v", e2), this.#n = t2;
  }
  get networkV() {
    return this.#r;
  }
  get legacyChainId() {
    const e2 = this.networkV;
    return e2 == null ? null : ct.getChainId(e2);
  }
  get yParity() {
    return this.v === 27 ? 0 : 1;
  }
  get yParityAndS() {
    const e2 = D(this.s);
    return this.yParity && (e2[0] |= 128), j(e2);
  }
  get compactSerialized() {
    return K([this.r, this.yParityAndS]);
  }
  get serialized() {
    return K([this.r, this.s, this.yParity ? "0x1c" : "0x1b"]);
  }
  constructor(e2, t2, n2, r2) {
    B(e2, at, "Signature"), this.#e = t2, this.#t = n2, this.#n = r2, this.#r = null;
  }
  getCanonical() {
    if (this.isValid())
      return this;
    const e2 = it - BigInt(this._s), t2 = 55 - this.v, n2 = new ct(at, this.r, lt(e2), t2);
    return this.networkV && (n2.#r = this.networkV), n2;
  }
  clone() {
    const e2 = new ct(at, this.r, this._s, this.v);
    return this.networkV && (e2.#r = this.networkV), e2;
  }
  toJSON() {
    const e2 = this.networkV;
    return { _type: "signature", networkV: e2 != null ? e2.toString() : null, r: this.r, s: this._s, v: this.v };
  }
  [st]() {
    return this.toString();
  }
  toString() {
    return this.isValid() ? `Signature { r: ${this.r}, s: ${this._s}, v: ${this.v} }` : `Signature { r: ${this.r}, s: ${this._s}, v: ${this.v}, valid: false }`;
  }
  static getChainId(e2) {
    const t2 = Ke(e2, "v");
    return t2 == tt || t2 == nt ? Xe : (z(t2 >= rt, "invalid EIP-155 v", "v", e2), (t2 - rt) / et);
  }
  static getChainIdV(e2, t2) {
    return Ke(e2) * et + BigInt(35 + t2 - 27);
  }
  static getNormalizedV(e2) {
    const t2 = Ke(e2);
    return t2 === Xe || t2 === tt ? 27 : t2 === Qe || t2 === nt ? 28 : (z(t2 >= rt, "invalid v", "v", e2), t2 & Qe ? 27 : 28);
  }
  static from(e2) {
    function t2(t3, n3) {
      z(t3, n3, "signature", e2);
    }
    if (e2 == null)
      return new ct(at, Me, Me, 27);
    if (typeof e2 == "string") {
      const n3 = D(e2, "signature");
      if (n3.length === 64) {
        const e3 = j(n3.slice(0, 32)), t3 = n3.slice(32, 64), r3 = 128 & t3[0] ? 28 : 27;
        return t3[0] &= 127, new ct(at, e3, j(t3), r3);
      }
      if (n3.length === 65) {
        const e3 = j(n3.slice(0, 32)), t3 = j(n3.slice(32, 64)), r3 = ct.getNormalizedV(n3[64]);
        return new ct(at, e3, t3, r3);
      }
      t2(false, "invalid raw signature length");
    }
    if (e2 instanceof ct)
      return e2.clone();
    const n2 = e2.r;
    t2(n2 != null, "missing r");
    const r2 = lt(n2), i2 = function(e3, n3) {
      if (e3 != null)
        return lt(e3);
      if (n3 != null) {
        t2(M(n3, 32), "invalid yParityAndS");
        const e4 = D(n3);
        return e4[0] &= 127, j(e4);
      }
      t2(false, "missing s");
    }(e2.s, e2.yParityAndS), { networkV: o2, v: s2 } = function(e3, n3, r3) {
      if (e3 != null) {
        const t3 = Ke(e3);
        return { networkV: t3 >= rt ? t3 : undefined, v: ct.getNormalizedV(t3) };
      }
      if (n3 != null)
        return t2(M(n3, 32), "invalid yParityAndS"), { v: 128 & D(n3)[0] ? 28 : 27 };
      if (r3 != null) {
        switch (Ye(r3, "sig.yParity")) {
          case 0:
            return { v: 27 };
          case 1:
            return { v: 28 };
        }
        t2(false, "invalid yParity");
      }
      t2(false, "missing v");
    }(e2.v, e2.yParityAndS, e2.yParity), a2 = new ct(at, r2, i2, s2);
    return o2 && (a2.#r = o2), t2(e2.yParity == null || Ye(e2.yParity, "sig.yParity") === a2.yParity, "yParity mismatch"), t2(e2.yParityAndS == null || e2.yParityAndS === a2.yParityAndS, "yParityAndS mismatch"), a2;
  }
}

class dt extends me {
  constructor(e2, t2, n2, r2) {
    super(), this.blockLen = e2, this.outputLen = t2, this.padOffset = n2, this.isLE = r2, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e2), this.view = he(this.buffer);
  }
  update(e2) {
    X(this);
    const { view: t2, buffer: n2, blockLen: r2 } = this, i2 = (e2 = ye(e2)).length;
    for (let o2 = 0;o2 < i2; ) {
      const s2 = Math.min(r2 - this.pos, i2 - o2);
      if (s2 === r2) {
        const t3 = he(e2);
        for (;r2 <= i2 - o2; o2 += r2)
          this.process(t3, o2);
        continue;
      }
      n2.set(e2.subarray(o2, o2 + s2), this.pos), this.pos += s2, o2 += s2, this.pos === r2 && (this.process(t2, 0), this.pos = 0);
    }
    return this.length += e2.length, this.roundClean(), this;
  }
  digestInto(e2) {
    X(this), Q(e2, this), this.finished = true;
    const { buffer: t2, view: n2, blockLen: r2, isLE: i2 } = this;
    let { pos: o2 } = this;
    t2[o2++] = 128, this.buffer.subarray(o2).fill(0), this.padOffset > r2 - o2 && (this.process(n2, 0), o2 = 0);
    for (let e3 = o2;e3 < r2; e3++)
      t2[e3] = 0;
    (function(e3, t3, n3, r3) {
      if (typeof e3.setBigUint64 == "function")
        return e3.setBigUint64(t3, n3, r3);
      const i3 = BigInt(32), o3 = BigInt(4294967295), s3 = Number(n3 >> i3 & o3), a3 = Number(n3 & o3), l3 = r3 ? 4 : 0, c3 = r3 ? 0 : 4;
      e3.setUint32(t3 + l3, s3, r3), e3.setUint32(t3 + c3, a3, r3);
    })(n2, r2 - 8, BigInt(8 * this.length), i2), this.process(n2, 0);
    const s2 = he(e2), a2 = this.outputLen;
    if (a2 % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l2 = a2 / 4, c2 = this.get();
    if (l2 > c2.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let e3 = 0;e3 < l2; e3++)
      s2.setUint32(4 * e3, c2[e3], i2);
  }
  digest() {
    const { buffer: e2, outputLen: t2 } = this;
    this.digestInto(e2);
    const n2 = e2.slice(0, t2);
    return this.destroy(), n2;
  }
  _cloneInto(e2) {
    e2 || (e2 = new this.constructor), e2.set(...this.get());
    const { blockLen: t2, buffer: n2, length: r2, finished: i2, destroyed: o2, pos: s2 } = this;
    return e2.length = r2, e2.pos = s2, e2.finished = i2, e2.destroyed = o2, r2 % t2 && e2.buffer.set(n2), e2;
  }
}
var ut = (e2, t2, n2) => e2 & t2 ^ ~e2 & n2;
var ht = (e2, t2, n2) => e2 & t2 ^ e2 & n2 ^ t2 & n2;
var pt = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
var ft = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
var gt = new Uint32Array(64);

class yt extends dt {
  constructor() {
    super(64, 32, 8, false), this.A = 0 | ft[0], this.B = 0 | ft[1], this.C = 0 | ft[2], this.D = 0 | ft[3], this.E = 0 | ft[4], this.F = 0 | ft[5], this.G = 0 | ft[6], this.H = 0 | ft[7];
  }
  get() {
    const { A: e2, B: t2, C: n2, D: r2, E: i2, F: o2, G: s2, H: a2 } = this;
    return [e2, t2, n2, r2, i2, o2, s2, a2];
  }
  set(e2, t2, n2, r2, i2, o2, s2, a2) {
    this.A = 0 | e2, this.B = 0 | t2, this.C = 0 | n2, this.D = 0 | r2, this.E = 0 | i2, this.F = 0 | o2, this.G = 0 | s2, this.H = 0 | a2;
  }
  process(e2, t2) {
    for (let n3 = 0;n3 < 16; n3++, t2 += 4)
      gt[n3] = e2.getUint32(t2, false);
    for (let e3 = 16;e3 < 64; e3++) {
      const t3 = gt[e3 - 15], n3 = gt[e3 - 2], r3 = pe(t3, 7) ^ pe(t3, 18) ^ t3 >>> 3, i3 = pe(n3, 17) ^ pe(n3, 19) ^ n3 >>> 10;
      gt[e3] = i3 + gt[e3 - 7] + r3 + gt[e3 - 16] | 0;
    }
    let { A: n2, B: r2, C: i2, D: o2, E: s2, F: a2, G: l2, H: c2 } = this;
    for (let e3 = 0;e3 < 64; e3++) {
      const t3 = c2 + (pe(s2, 6) ^ pe(s2, 11) ^ pe(s2, 25)) + ut(s2, a2, l2) + pt[e3] + gt[e3] | 0, d2 = (pe(n2, 2) ^ pe(n2, 13) ^ pe(n2, 22)) + ht(n2, r2, i2) | 0;
      c2 = l2, l2 = a2, a2 = s2, s2 = o2 + t3 | 0, o2 = i2, i2 = r2, r2 = n2, n2 = t3 + d2 | 0;
    }
    n2 = n2 + this.A | 0, r2 = r2 + this.B | 0, i2 = i2 + this.C | 0, o2 = o2 + this.D | 0, s2 = s2 + this.E | 0, a2 = a2 + this.F | 0, l2 = l2 + this.G | 0, c2 = c2 + this.H | 0, this.set(n2, r2, i2, o2, s2, a2, l2, c2);
  }
  roundClean() {
    gt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
var mt = ve(() => new yt);
var bt = (BigInt(0), BigInt(1));
var wt = BigInt(2);
var vt = (e2) => e2 instanceof Uint8Array;
var xt = Array.from({ length: 256 }, (e2, t2) => t2.toString(16).padStart(2, "0"));
function St(e2) {
  if (!vt(e2))
    throw new Error("Uint8Array expected");
  let t2 = "";
  for (let n2 = 0;n2 < e2.length; n2++)
    t2 += xt[e2[n2]];
  return t2;
}
function Pt(e2) {
  if (typeof e2 != "string")
    throw new Error("hex string expected, got " + typeof e2);
  return BigInt(e2 === "" ? "0" : `0x${e2}`);
}
function Et(e2) {
  if (typeof e2 != "string")
    throw new Error("hex string expected, got " + typeof e2);
  const t2 = e2.length;
  if (t2 % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t2);
  const n2 = new Uint8Array(t2 / 2);
  for (let t3 = 0;t3 < n2.length; t3++) {
    const r2 = 2 * t3, i2 = e2.slice(r2, r2 + 2), o2 = Number.parseInt(i2, 16);
    if (Number.isNaN(o2) || o2 < 0)
      throw new Error("Invalid byte sequence");
    n2[t3] = o2;
  }
  return n2;
}
function kt(e2) {
  return Pt(St(e2));
}
function It(e2) {
  if (!vt(e2))
    throw new Error("Uint8Array expected");
  return Pt(St(Uint8Array.from(e2).reverse()));
}
function Ct(e2, t2) {
  return Et(e2.toString(16).padStart(2 * t2, "0"));
}
function At(e2, t2) {
  return Ct(e2, t2).reverse();
}
function Tt(e2, t2, n2) {
  let r2;
  if (typeof t2 == "string")
    try {
      r2 = Et(t2);
    } catch (n3) {
      throw new Error(`${e2} must be valid hex string, got "${t2}". Cause: ${n3}`);
    }
  else {
    if (!vt(t2))
      throw new Error(`${e2} must be hex string or Uint8Array`);
    r2 = Uint8Array.from(t2);
  }
  const i2 = r2.length;
  if (typeof n2 == "number" && i2 !== n2)
    throw new Error(`${e2} expected ${n2} bytes, got ${i2}`);
  return r2;
}
function Rt(...e2) {
  const t2 = new Uint8Array(e2.reduce((e3, t3) => e3 + t3.length, 0));
  let n2 = 0;
  return e2.forEach((e3) => {
    if (!vt(e3))
      throw new Error("Uint8Array expected");
    t2.set(e3, n2), n2 += e3.length;
  }), t2;
}
var Ut = (e2) => (wt << BigInt(e2 - 1)) - bt;
var Ft = (e2) => new Uint8Array(e2);
var Ot = (e2) => Uint8Array.from(e2);
function zt(e2, t2, n2) {
  if (typeof e2 != "number" || e2 < 2)
    throw new Error("hashLen must be a number");
  if (typeof t2 != "number" || t2 < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n2 != "function")
    throw new Error("hmacFn must be a function");
  let r2 = Ft(e2), i2 = Ft(e2), o2 = 0;
  const s2 = () => {
    r2.fill(1), i2.fill(0), o2 = 0;
  }, a2 = (...e3) => n2(i2, r2, ...e3), l2 = (e3 = Ft()) => {
    i2 = a2(Ot([0]), e3), r2 = a2(), e3.length !== 0 && (i2 = a2(Ot([1]), e3), r2 = a2());
  }, c2 = () => {
    if (o2++ >= 1000)
      throw new Error("drbg: tried 1000 values");
    let e3 = 0;
    const n3 = [];
    for (;e3 < t2; ) {
      r2 = a2();
      const t3 = r2.slice();
      n3.push(t3), e3 += r2.length;
    }
    return Rt(...n3);
  };
  return (e3, t3) => {
    let n3;
    for (s2(), l2(e3);!(n3 = t3(c2())); )
      l2();
    return s2(), n3;
  };
}
var Nt = { bigint: (e2) => typeof e2 == "bigint", function: (e2) => typeof e2 == "function", boolean: (e2) => typeof e2 == "boolean", string: (e2) => typeof e2 == "string", stringOrUint8Array: (e2) => typeof e2 == "string" || e2 instanceof Uint8Array, isSafeInteger: (e2) => Number.isSafeInteger(e2), array: (e2) => Array.isArray(e2), field: (e2, t2) => t2.Fp.isValid(e2), hash: (e2) => typeof e2 == "function" && Number.isSafeInteger(e2.outputLen) };
function $t(e2, t2, n2 = {}) {
  const r2 = (t3, n3, r3) => {
    const i2 = Nt[n3];
    if (typeof i2 != "function")
      throw new Error(`Invalid validator "${n3}", expected function`);
    const o2 = e2[t3];
    if (!(r3 && o2 === undefined || i2(o2, e2)))
      throw new Error(`Invalid param ${String(t3)}=${o2} (${typeof o2}), expected ${n3}`);
  };
  for (const [e3, n3] of Object.entries(t2))
    r2(e3, n3, false);
  for (const [e3, t3] of Object.entries(n2))
    r2(e3, t3, true);
  return e2;
}
var Bt = BigInt(0);
var Lt = BigInt(1);
var Dt = BigInt(2);
var _t = BigInt(3);
var Mt = BigInt(4);
var Wt = BigInt(5);
var Ht = BigInt(8);
function jt(e2, t2) {
  const n2 = e2 % t2;
  return n2 >= Bt ? n2 : t2 + n2;
}
function Kt(e2, t2, n2) {
  if (n2 <= Bt || t2 < Bt)
    throw new Error("Expected power/modulo > 0");
  if (n2 === Lt)
    return Bt;
  let r2 = Lt;
  for (;t2 > Bt; )
    t2 & Lt && (r2 = r2 * e2 % n2), e2 = e2 * e2 % n2, t2 >>= Lt;
  return r2;
}
function Gt(e2, t2, n2) {
  let r2 = e2;
  for (;t2-- > Bt; )
    r2 *= r2, r2 %= n2;
  return r2;
}
function Vt(e2, t2) {
  if (e2 === Bt || t2 <= Bt)
    throw new Error(`invert: expected positive integers, got n=${e2} mod=${t2}`);
  let n2 = jt(e2, t2), r2 = t2, i2 = Bt, o2 = Lt, s2 = Lt, a2 = Bt;
  for (;n2 !== Bt; ) {
    const e3 = r2 / n2, t3 = r2 % n2, l2 = i2 - s2 * e3, c2 = o2 - a2 * e3;
    r2 = n2, n2 = t3, i2 = s2, o2 = a2, s2 = l2, a2 = c2;
  }
  if (r2 !== Lt)
    throw new Error("invert: does not exist");
  return jt(i2, t2);
}
BigInt(9), BigInt(16);
var qt = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function Yt(e2, t2) {
  const n2 = t2 !== undefined ? t2 : e2.toString(2).length;
  return { nBitLength: n2, nByteLength: Math.ceil(n2 / 8) };
}
function Jt(e2) {
  if (typeof e2 != "bigint")
    throw new Error("field order must be bigint");
  const t2 = e2.toString(2).length;
  return Math.ceil(t2 / 8);
}
function Zt(e2) {
  const t2 = Jt(e2);
  return t2 + Math.ceil(t2 / 2);
}

class Xt extends me {
  constructor(e2, t2) {
    super(), this.finished = false, this.destroyed = false, Z(e2);
    const n2 = ye(t2);
    if (this.iHash = e2.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const r2 = this.blockLen, i2 = new Uint8Array(r2);
    i2.set(n2.length > r2 ? e2.create().update(n2).digest() : n2);
    for (let e3 = 0;e3 < i2.length; e3++)
      i2[e3] ^= 54;
    this.iHash.update(i2), this.oHash = e2.create();
    for (let e3 = 0;e3 < i2.length; e3++)
      i2[e3] ^= 106;
    this.oHash.update(i2), i2.fill(0);
  }
  update(e2) {
    return X(this), this.iHash.update(e2), this;
  }
  digestInto(e2) {
    X(this), J(e2, this.outputLen), this.finished = true, this.iHash.digestInto(e2), this.oHash.update(e2), this.oHash.digestInto(e2), this.destroy();
  }
  digest() {
    const e2 = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e2), e2;
  }
  _cloneInto(e2) {
    e2 || (e2 = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t2, iHash: n2, finished: r2, destroyed: i2, blockLen: o2, outputLen: s2 } = this;
    return e2.finished = r2, e2.destroyed = i2, e2.blockLen = o2, e2.outputLen = s2, e2.oHash = t2._cloneInto(e2.oHash), e2.iHash = n2._cloneInto(e2.iHash), e2;
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
}
var Qt = (e2, t2, n2) => new Xt(e2, t2).update(n2).digest();
Qt.create = (e2, t2) => new Xt(e2, t2);
var en = BigInt(0);
var tn = BigInt(1);
function nn(e2) {
  return $t(e2.Fp, qt.reduce((e3, t2) => (e3[t2] = "function", e3), { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" })), $t(e2, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...Yt(e2.n, e2.nBitLength), ...e2, p: e2.Fp.ORDER });
}
var { Ph: rn, aT: on } = y;
var sn = { Err: class extends Error {
  constructor(e2 = "") {
    super(e2);
  }
}, _parseInt(e2) {
  const { Err: t2 } = sn;
  if (e2.length < 2 || e2[0] !== 2)
    throw new t2("Invalid signature integer tag");
  const n2 = e2[1], r2 = e2.subarray(2, n2 + 2);
  if (!n2 || r2.length !== n2)
    throw new t2("Invalid signature integer: wrong length");
  if (128 & r2[0])
    throw new t2("Invalid signature integer: negative");
  if (r2[0] === 0 && !(128 & r2[1]))
    throw new t2("Invalid signature integer: unnecessary leading zero");
  return { d: rn(r2), l: e2.subarray(n2 + 2) };
}, toSig(e2) {
  const { Err: t2 } = sn, n2 = typeof e2 == "string" ? on(e2) : e2;
  if (!(n2 instanceof Uint8Array))
    throw new Error("ui8a expected");
  let r2 = n2.length;
  if (r2 < 2 || n2[0] != 48)
    throw new t2("Invalid signature tag");
  if (n2[1] !== r2 - 2)
    throw new t2("Invalid signature: incorrect length");
  const { d: i2, l: o2 } = sn._parseInt(n2.subarray(2)), { d: s2, l: a2 } = sn._parseInt(o2);
  if (a2.length)
    throw new t2("Invalid signature: left bytes after parsing");
  return { r: i2, s: s2 };
}, hexFromSig(e2) {
  const t2 = (e3) => 8 & Number.parseInt(e3[0], 16) ? "00" + e3 : e3, n2 = (e3) => {
    const t3 = e3.toString(16);
    return 1 & t3.length ? `0${t3}` : t3;
  }, r2 = t2(n2(e2.s)), i2 = t2(n2(e2.r)), o2 = r2.length / 2, s2 = i2.length / 2, a2 = n2(o2), l2 = n2(s2);
  return `30${n2(s2 + o2 + 4)}02${l2}${i2}02${a2}${r2}`;
} };
var an = BigInt(0);
var ln = BigInt(1);
var cn = (BigInt(2), BigInt(3));
function dn(e2) {
  const t2 = function(e3) {
    const t3 = nn(e3);
    return $t(t3, { hash: "hash", hmac: "function", randomBytes: "function" }, { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }), Object.freeze({ lowS: true, ...t3 });
  }(e2), { Fp: n2, n: r2 } = t2, i2 = n2.BYTES + 1, o2 = 2 * n2.BYTES + 1;
  function s2(e3) {
    return jt(e3, r2);
  }
  function a2(e3) {
    return Vt(e3, r2);
  }
  const { ProjectivePoint: l2, normPrivateKeyToScalar: c2, weierstrassEquation: d2, isWithinCurveOrder: u2 } = function(e3) {
    const t3 = function(e4) {
      const t4 = nn(e4);
      $t(t4, { a: "field", b: "field" }, { allowedPrivateKeyLengths: "array", wrapPrivateKey: "boolean", isTorsionFree: "function", clearCofactor: "function", allowInfinityPoint: "boolean", fromBytes: "function", toBytes: "function" });
      const { endo: n4, Fp: r4, a: i4 } = t4;
      if (n4) {
        if (!r4.eql(i4, r4.ZERO))
          throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
        if (typeof n4 != "object" || typeof n4.beta != "bigint" || typeof n4.splitScalar != "function")
          throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
      }
      return Object.freeze({ ...t4 });
    }(e3), { Fp: n3 } = t3, r3 = t3.toBytes || ((e4, t4, r4) => {
      const i4 = t4.toAffine();
      return Rt(Uint8Array.from([4]), n3.toBytes(i4.x), n3.toBytes(i4.y));
    }), i3 = t3.fromBytes || ((e4) => {
      const t4 = e4.subarray(1);
      return { x: n3.fromBytes(t4.subarray(0, n3.BYTES)), y: n3.fromBytes(t4.subarray(n3.BYTES, 2 * n3.BYTES)) };
    });
    function o3(e4) {
      const { a: r4, b: i4 } = t3, o4 = n3.sqr(e4), s4 = n3.mul(o4, e4);
      return n3.add(n3.add(s4, n3.mul(e4, r4)), i4);
    }
    if (!n3.eql(n3.sqr(t3.Gy), o3(t3.Gx)))
      throw new Error("bad generator point: equation left != right");
    function s3(e4) {
      return typeof e4 == "bigint" && an < e4 && e4 < t3.n;
    }
    function a3(e4) {
      if (!s3(e4))
        throw new Error("Expected valid bigint: 0 < bigint < curve.n");
    }
    function l3(e4) {
      const { allowedPrivateKeyLengths: n4, nByteLength: r4, wrapPrivateKey: i4, n: o4 } = t3;
      if (n4 && typeof e4 != "bigint") {
        if (e4 instanceof Uint8Array && (e4 = St(e4)), typeof e4 != "string" || !n4.includes(e4.length))
          throw new Error("Invalid key");
        e4 = e4.padStart(2 * r4, "0");
      }
      let s4;
      try {
        s4 = typeof e4 == "bigint" ? e4 : kt(Tt("private key", e4, r4));
      } catch (t4) {
        throw new Error(`private key must be ${r4} bytes, hex or bigint, not ${typeof e4}`);
      }
      return i4 && (s4 = jt(s4, o4)), a3(s4), s4;
    }
    const c3 = new Map;
    function d3(e4) {
      if (!(e4 instanceof u3))
        throw new Error("ProjectivePoint expected");
    }

    class u3 {
      constructor(e4, t4, r4) {
        if (this.px = e4, this.py = t4, this.pz = r4, e4 == null || !n3.isValid(e4))
          throw new Error("x required");
        if (t4 == null || !n3.isValid(t4))
          throw new Error("y required");
        if (r4 == null || !n3.isValid(r4))
          throw new Error("z required");
      }
      static fromAffine(e4) {
        const { x: t4, y: r4 } = e4 || {};
        if (!e4 || !n3.isValid(t4) || !n3.isValid(r4))
          throw new Error("invalid affine point");
        if (e4 instanceof u3)
          throw new Error("projective point not allowed");
        const i4 = (e5) => n3.eql(e5, n3.ZERO);
        return i4(t4) && i4(r4) ? u3.ZERO : new u3(t4, r4, n3.ONE);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      static normalizeZ(e4) {
        const t4 = n3.invertBatch(e4.map((e5) => e5.pz));
        return e4.map((e5, n4) => e5.toAffine(t4[n4])).map(u3.fromAffine);
      }
      static fromHex(e4) {
        const t4 = u3.fromAffine(i3(Tt("pointHex", e4)));
        return t4.assertValidity(), t4;
      }
      static fromPrivateKey(e4) {
        return u3.BASE.multiply(l3(e4));
      }
      _setWindowSize(e4) {
        this._WINDOW_SIZE = e4, c3.delete(this);
      }
      assertValidity() {
        if (this.is0()) {
          if (t3.allowInfinityPoint && !n3.is0(this.py))
            return;
          throw new Error("bad point: ZERO");
        }
        const { x: e4, y: r4 } = this.toAffine();
        if (!n3.isValid(e4) || !n3.isValid(r4))
          throw new Error("bad point: x or y not FE");
        const i4 = n3.sqr(r4), s4 = o3(e4);
        if (!n3.eql(i4, s4))
          throw new Error("bad point: equation left != right");
        if (!this.isTorsionFree())
          throw new Error("bad point: not in prime-order subgroup");
      }
      hasEvenY() {
        const { y: e4 } = this.toAffine();
        if (n3.isOdd)
          return !n3.isOdd(e4);
        throw new Error("Field doesn't support isOdd");
      }
      equals(e4) {
        d3(e4);
        const { px: t4, py: r4, pz: i4 } = this, { px: o4, py: s4, pz: a4 } = e4, l4 = n3.eql(n3.mul(t4, a4), n3.mul(o4, i4)), c4 = n3.eql(n3.mul(r4, a4), n3.mul(s4, i4));
        return l4 && c4;
      }
      negate() {
        return new u3(this.px, n3.neg(this.py), this.pz);
      }
      double() {
        const { a: e4, b: r4 } = t3, i4 = n3.mul(r4, cn), { px: o4, py: s4, pz: a4 } = this;
        let { ZERO: l4, ZERO: c4, ZERO: d4 } = n3, h4 = n3.mul(o4, o4), p4 = n3.mul(s4, s4), f3 = n3.mul(a4, a4), g3 = n3.mul(o4, s4);
        return g3 = n3.add(g3, g3), d4 = n3.mul(o4, a4), d4 = n3.add(d4, d4), l4 = n3.mul(e4, d4), c4 = n3.mul(i4, f3), c4 = n3.add(l4, c4), l4 = n3.sub(p4, c4), c4 = n3.add(p4, c4), c4 = n3.mul(l4, c4), l4 = n3.mul(g3, l4), d4 = n3.mul(i4, d4), f3 = n3.mul(e4, f3), g3 = n3.sub(h4, f3), g3 = n3.mul(e4, g3), g3 = n3.add(g3, d4), d4 = n3.add(h4, h4), h4 = n3.add(d4, h4), h4 = n3.add(h4, f3), h4 = n3.mul(h4, g3), c4 = n3.add(c4, h4), f3 = n3.mul(s4, a4), f3 = n3.add(f3, f3), h4 = n3.mul(f3, g3), l4 = n3.sub(l4, h4), d4 = n3.mul(f3, p4), d4 = n3.add(d4, d4), d4 = n3.add(d4, d4), new u3(l4, c4, d4);
      }
      add(e4) {
        d3(e4);
        const { px: r4, py: i4, pz: o4 } = this, { px: s4, py: a4, pz: l4 } = e4;
        let { ZERO: c4, ZERO: h4, ZERO: p4 } = n3;
        const f3 = t3.a, g3 = n3.mul(t3.b, cn);
        let y3 = n3.mul(r4, s4), m3 = n3.mul(i4, a4), b3 = n3.mul(o4, l4), w3 = n3.add(r4, i4), v2 = n3.add(s4, a4);
        w3 = n3.mul(w3, v2), v2 = n3.add(y3, m3), w3 = n3.sub(w3, v2), v2 = n3.add(r4, o4);
        let x3 = n3.add(s4, l4);
        return v2 = n3.mul(v2, x3), x3 = n3.add(y3, b3), v2 = n3.sub(v2, x3), x3 = n3.add(i4, o4), c4 = n3.add(a4, l4), x3 = n3.mul(x3, c4), c4 = n3.add(m3, b3), x3 = n3.sub(x3, c4), p4 = n3.mul(f3, v2), c4 = n3.mul(g3, b3), p4 = n3.add(c4, p4), c4 = n3.sub(m3, p4), p4 = n3.add(m3, p4), h4 = n3.mul(c4, p4), m3 = n3.add(y3, y3), m3 = n3.add(m3, y3), b3 = n3.mul(f3, b3), v2 = n3.mul(g3, v2), m3 = n3.add(m3, b3), b3 = n3.sub(y3, b3), b3 = n3.mul(f3, b3), v2 = n3.add(v2, b3), y3 = n3.mul(m3, v2), h4 = n3.add(h4, y3), y3 = n3.mul(x3, v2), c4 = n3.mul(w3, c4), c4 = n3.sub(c4, y3), y3 = n3.mul(w3, m3), p4 = n3.mul(x3, p4), p4 = n3.add(p4, y3), new u3(c4, h4, p4);
      }
      subtract(e4) {
        return this.add(e4.negate());
      }
      is0() {
        return this.equals(u3.ZERO);
      }
      wNAF(e4) {
        return p3.wNAFCached(this, c3, e4, (e5) => {
          const t4 = n3.invertBatch(e5.map((e6) => e6.pz));
          return e5.map((e6, n4) => e6.toAffine(t4[n4])).map(u3.fromAffine);
        });
      }
      multiplyUnsafe(e4) {
        const r4 = u3.ZERO;
        if (e4 === an)
          return r4;
        if (a3(e4), e4 === ln)
          return this;
        const { endo: i4 } = t3;
        if (!i4)
          return p3.unsafeLadder(this, e4);
        let { k1neg: o4, k1: s4, k2neg: l4, k2: c4 } = i4.splitScalar(e4), d4 = r4, h4 = r4, f3 = this;
        for (;s4 > an || c4 > an; )
          s4 & ln && (d4 = d4.add(f3)), c4 & ln && (h4 = h4.add(f3)), f3 = f3.double(), s4 >>= ln, c4 >>= ln;
        return o4 && (d4 = d4.negate()), l4 && (h4 = h4.negate()), h4 = new u3(n3.mul(h4.px, i4.beta), h4.py, h4.pz), d4.add(h4);
      }
      multiply(e4) {
        a3(e4);
        let r4, i4, o4 = e4;
        const { endo: s4 } = t3;
        if (s4) {
          const { k1neg: e5, k1: t4, k2neg: a4, k2: l4 } = s4.splitScalar(o4);
          let { p: c4, f: d4 } = this.wNAF(t4), { p: h4, f: f3 } = this.wNAF(l4);
          c4 = p3.constTimeNegate(e5, c4), h4 = p3.constTimeNegate(a4, h4), h4 = new u3(n3.mul(h4.px, s4.beta), h4.py, h4.pz), r4 = c4.add(h4), i4 = d4.add(f3);
        } else {
          const { p: e5, f: t4 } = this.wNAF(o4);
          r4 = e5, i4 = t4;
        }
        return u3.normalizeZ([r4, i4])[0];
      }
      multiplyAndAddUnsafe(e4, t4, n4) {
        const r4 = u3.BASE, i4 = (e5, t5) => t5 !== an && t5 !== ln && e5.equals(r4) ? e5.multiply(t5) : e5.multiplyUnsafe(t5), o4 = i4(this, t4).add(i4(e4, n4));
        return o4.is0() ? undefined : o4;
      }
      toAffine(e4) {
        const { px: t4, py: r4, pz: i4 } = this, o4 = this.is0();
        e4 == null && (e4 = o4 ? n3.ONE : n3.inv(i4));
        const s4 = n3.mul(t4, e4), a4 = n3.mul(r4, e4), l4 = n3.mul(i4, e4);
        if (o4)
          return { x: n3.ZERO, y: n3.ZERO };
        if (!n3.eql(l4, n3.ONE))
          throw new Error("invZ was invalid");
        return { x: s4, y: a4 };
      }
      isTorsionFree() {
        const { h: e4, isTorsionFree: n4 } = t3;
        if (e4 === ln)
          return true;
        if (n4)
          return n4(u3, this);
        throw new Error("isTorsionFree() has not been declared for the elliptic curve");
      }
      clearCofactor() {
        const { h: e4, clearCofactor: n4 } = t3;
        return e4 === ln ? this : n4 ? n4(u3, this) : this.multiplyUnsafe(t3.h);
      }
      toRawBytes(e4 = true) {
        return this.assertValidity(), r3(u3, this, e4);
      }
      toHex(e4 = true) {
        return St(this.toRawBytes(e4));
      }
    }
    u3.BASE = new u3(t3.Gx, t3.Gy, n3.ONE), u3.ZERO = new u3(n3.ZERO, n3.ONE, n3.ZERO);
    const h3 = t3.nBitLength, p3 = function(e4, t4) {
      const n4 = (e5, t5) => {
        const n5 = t5.negate();
        return e5 ? n5 : t5;
      }, r4 = (e5) => ({ windows: Math.ceil(t4 / e5) + 1, windowSize: 2 ** (e5 - 1) });
      return { constTimeNegate: n4, unsafeLadder(t5, n5) {
        let r5 = e4.ZERO, i4 = t5;
        for (;n5 > en; )
          n5 & tn && (r5 = r5.add(i4)), i4 = i4.double(), n5 >>= tn;
        return r5;
      }, precomputeWindow(e5, t5) {
        const { windows: n5, windowSize: i4 } = r4(t5), o4 = [];
        let s4 = e5, a4 = s4;
        for (let e6 = 0;e6 < n5; e6++) {
          a4 = s4, o4.push(a4);
          for (let e7 = 1;e7 < i4; e7++)
            a4 = a4.add(s4), o4.push(a4);
          s4 = a4.double();
        }
        return o4;
      }, wNAF(t5, i4, o4) {
        const { windows: s4, windowSize: a4 } = r4(t5);
        let { ZERO: l4, BASE: c4 } = e4;
        const d4 = BigInt(2 ** t5 - 1), u4 = 2 ** t5, h4 = BigInt(t5);
        for (let e5 = 0;e5 < s4; e5++) {
          const t6 = e5 * a4;
          let r5 = Number(o4 & d4);
          o4 >>= h4, r5 > a4 && (r5 -= u4, o4 += tn);
          const s5 = t6, p4 = t6 + Math.abs(r5) - 1, f3 = e5 % 2 != 0, g3 = r5 < 0;
          r5 === 0 ? c4 = c4.add(n4(f3, i4[s5])) : l4 = l4.add(n4(g3, i4[p4]));
        }
        return { p: l4, f: c4 };
      }, wNAFCached(e5, t5, n5, r5) {
        const i4 = e5._WINDOW_SIZE || 1;
        let o4 = t5.get(e5);
        return o4 || (o4 = this.precomputeWindow(e5, i4), i4 !== 1 && t5.set(e5, r5(o4))), this.wNAF(i4, o4, n5);
      } };
    }(u3, t3.endo ? Math.ceil(h3 / 2) : h3);
    return { CURVE: t3, ProjectivePoint: u3, normPrivateKeyToScalar: l3, weierstrassEquation: o3, isWithinCurveOrder: s3 };
  }({ ...t2, toBytes(e3, t3, r3) {
    const i3 = t3.toAffine(), o3 = n2.toBytes(i3.x), s3 = Rt;
    return r3 ? s3(Uint8Array.from([t3.hasEvenY() ? 2 : 3]), o3) : s3(Uint8Array.from([4]), o3, n2.toBytes(i3.y));
  }, fromBytes(e3) {
    const t3 = e3.length, r3 = e3[0], s3 = e3.subarray(1);
    if (t3 !== i2 || r3 !== 2 && r3 !== 3) {
      if (t3 === o2 && r3 === 4)
        return { x: n2.fromBytes(s3.subarray(0, n2.BYTES)), y: n2.fromBytes(s3.subarray(n2.BYTES, 2 * n2.BYTES)) };
      throw new Error(`Point of length ${t3} was invalid. Expected ${i2} compressed bytes or ${o2} uncompressed bytes`);
    }
    {
      const e4 = kt(s3);
      if (!(an < (a3 = e4) && a3 < n2.ORDER))
        throw new Error("Point is not on curve");
      const t4 = d2(e4);
      let i3 = n2.sqrt(t4);
      return !(1 & ~r3) != ((i3 & ln) === ln) && (i3 = n2.neg(i3)), { x: e4, y: i3 };
    }
    var a3;
  } }), h2 = (e3) => St(Ct(e3, t2.nByteLength));
  function p2(e3) {
    return e3 > r2 >> ln;
  }
  const f2 = (e3, t3, n3) => kt(e3.slice(t3, n3));

  class g2 {
    constructor(e3, t3, n3) {
      this.r = e3, this.s = t3, this.recovery = n3, this.assertValidity();
    }
    static fromCompact(e3) {
      const n3 = t2.nByteLength;
      return e3 = Tt("compactSignature", e3, 2 * n3), new g2(f2(e3, 0, n3), f2(e3, n3, 2 * n3));
    }
    static fromDER(e3) {
      const { r: t3, s: n3 } = sn.toSig(Tt("DER", e3));
      return new g2(t3, n3);
    }
    assertValidity() {
      if (!u2(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!u2(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(e3) {
      return new g2(this.r, this.s, e3);
    }
    recoverPublicKey(e3) {
      const { r: r3, s: i3, recovery: o3 } = this, c3 = w2(Tt("msgHash", e3));
      if (o3 == null || ![0, 1, 2, 3].includes(o3))
        throw new Error("recovery id invalid");
      const d3 = o3 === 2 || o3 === 3 ? r3 + t2.n : r3;
      if (d3 >= n2.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u3 = 1 & o3 ? "03" : "02", p3 = l2.fromHex(u3 + h2(d3)), f3 = a2(d3), g3 = s2(-c3 * f3), y3 = s2(i3 * f3), m3 = l2.BASE.multiplyAndAddUnsafe(p3, g3, y3);
      if (!m3)
        throw new Error("point at infinify");
      return m3.assertValidity(), m3;
    }
    hasHighS() {
      return p2(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new g2(this.r, s2(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return Et(this.toDERHex());
    }
    toDERHex() {
      return sn.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return Et(this.toCompactHex());
    }
    toCompactHex() {
      return h2(this.r) + h2(this.s);
    }
  }
  const y2 = { isValidPrivateKey(e3) {
    try {
      return c2(e3), true;
    } catch (e4) {
      return false;
    }
  }, normPrivateKeyToScalar: c2, randomPrivateKey: () => {
    const e3 = Zt(t2.n);
    return function(e4, t3, n3 = false) {
      const r3 = e4.length, i3 = Jt(t3), o3 = Zt(t3);
      if (r3 < 16 || r3 < o3 || r3 > 1024)
        throw new Error(`expected ${o3}-1024 bytes of input, got ${r3}`);
      const s3 = jt(n3 ? kt(e4) : It(e4), t3 - Lt) + Lt;
      return n3 ? At(s3, i3) : Ct(s3, i3);
    }(t2.randomBytes(e3), t2.n);
  }, precompute: (e3 = 8, t3 = l2.BASE) => (t3._setWindowSize(e3), t3.multiply(BigInt(3)), t3) };
  function m2(e3) {
    const t3 = e3 instanceof Uint8Array, n3 = typeof e3 == "string", r3 = (t3 || n3) && e3.length;
    return t3 ? r3 === i2 || r3 === o2 : n3 ? r3 === 2 * i2 || r3 === 2 * o2 : e3 instanceof l2;
  }
  const b2 = t2.bits2int || function(e3) {
    const n3 = kt(e3), r3 = 8 * e3.length - t2.nBitLength;
    return r3 > 0 ? n3 >> BigInt(r3) : n3;
  }, w2 = t2.bits2int_modN || function(e3) {
    return s2(b2(e3));
  }, v = Ut(t2.nBitLength);
  function x2(e3) {
    if (typeof e3 != "bigint")
      throw new Error("bigint expected");
    if (!(an <= e3 && e3 < v))
      throw new Error(`bigint expected < 2^${t2.nBitLength}`);
    return Ct(e3, t2.nByteLength);
  }
  const S2 = { lowS: t2.lowS, prehash: false }, P2 = { lowS: t2.lowS, prehash: false };
  return l2.BASE._setWindowSize(8), { CURVE: t2, getPublicKey: function(e3, t3 = true) {
    return l2.fromPrivateKey(e3).toRawBytes(t3);
  }, getSharedSecret: function(e3, t3, n3 = true) {
    if (m2(e3))
      throw new Error("first arg must be private key");
    if (!m2(t3))
      throw new Error("second arg must be public key");
    return l2.fromHex(t3).multiply(c2(e3)).toRawBytes(n3);
  }, sign: function(e3, r3, i3 = S2) {
    const { seed: o3, k2sig: d3 } = function(e4, r4, i4 = S2) {
      if (["recovered", "canonical"].some((e5) => (e5 in i4)))
        throw new Error("sign() legacy options not supported");
      const { hash: o4, randomBytes: d4 } = t2;
      let { lowS: h4, prehash: f3, extraEntropy: y3 } = i4;
      h4 == null && (h4 = true), e4 = Tt("msgHash", e4), f3 && (e4 = Tt("prehashed msgHash", o4(e4)));
      const m3 = w2(e4), v2 = c2(r4), P3 = [x2(v2), x2(m3)];
      if (y3 != null) {
        const e5 = y3 === true ? d4(n2.BYTES) : y3;
        P3.push(Tt("extraEntropy", e5));
      }
      const E2 = Rt(...P3), k2 = m3;
      return { seed: E2, k2sig: function(e5) {
        const t3 = b2(e5);
        if (!u2(t3))
          return;
        const n3 = a2(t3), r5 = l2.BASE.multiply(t3).toAffine(), i5 = s2(r5.x);
        if (i5 === an)
          return;
        const o5 = s2(n3 * s2(k2 + i5 * v2));
        if (o5 === an)
          return;
        let c3 = (r5.x === i5 ? 0 : 2) | Number(r5.y & ln), d5 = o5;
        return h4 && p2(o5) && (d5 = function(e6) {
          return p2(e6) ? s2(-e6) : e6;
        }(o5), c3 ^= 1), new g2(i5, d5, c3);
      } };
    }(e3, r3, i3), h3 = t2;
    return zt(h3.hash.outputLen, h3.nByteLength, h3.hmac)(o3, d3);
  }, verify: function(e3, n3, r3, i3 = P2) {
    const o3 = e3;
    if (n3 = Tt("msgHash", n3), r3 = Tt("publicKey", r3), "strict" in i3)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: c3, prehash: d3 } = i3;
    let u3, h3;
    try {
      if (typeof o3 == "string" || o3 instanceof Uint8Array)
        try {
          u3 = g2.fromDER(o3);
        } catch (e4) {
          if (!(e4 instanceof sn.Err))
            throw e4;
          u3 = g2.fromCompact(o3);
        }
      else {
        if (typeof o3 != "object" || typeof o3.r != "bigint" || typeof o3.s != "bigint")
          throw new Error("PARSE");
        {
          const { r: e4, s: t3 } = o3;
          u3 = new g2(e4, t3);
        }
      }
      h3 = l2.fromHex(r3);
    } catch (e4) {
      if (e4.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return false;
    }
    if (c3 && u3.hasHighS())
      return false;
    d3 && (n3 = t2.hash(n3));
    const { r: p3, s: f3 } = u3, y3 = w2(n3), m3 = a2(f3), b3 = s2(y3 * m3), v2 = s2(p3 * m3), x3 = l2.BASE.multiplyAndAddUnsafe(h3, b3, v2)?.toAffine();
    return !!x3 && s2(x3.x) === p3;
  }, ProjectivePoint: l2, Signature: g2, utils: y2 };
}
function un(e2) {
  return { hash: e2, hmac: (t2, ...n2) => Qt(e2, t2, function(...e3) {
    const t3 = new Uint8Array(e3.reduce((e4, t4) => e4 + t4.length, 0));
    let n3 = 0;
    return e3.forEach((e4) => {
      if (!de(e4))
        throw new Error("Uint8Array expected");
      t3.set(e4, n3), n3 += e4.length;
    }), t3;
  }(...n2)), randomBytes: xe };
}
BigInt(4);
var hn = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
var pn = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var fn = BigInt(1);
var gn = BigInt(2);
var yn = (e2, t2) => (e2 + t2 / gn) / t2;
var mn = function(e2, t2, n2 = false, r2 = {}) {
  if (e2 <= Bt)
    throw new Error(`Expected Field ORDER > 0, got ${e2}`);
  const { nBitLength: i2, nByteLength: o2 } = Yt(e2, t2);
  if (o2 > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const s2 = function(e3) {
    if (e3 % Mt === _t) {
      const t3 = (e3 + Lt) / Mt;
      return function(e4, n3) {
        const r3 = e4.pow(n3, t3);
        if (!e4.eql(e4.sqr(r3), n3))
          throw new Error("Cannot find square root");
        return r3;
      };
    }
    if (e3 % Ht === Wt) {
      const t3 = (e3 - Wt) / Ht;
      return function(e4, n3) {
        const r3 = e4.mul(n3, Dt), i3 = e4.pow(r3, t3), o3 = e4.mul(n3, i3), s3 = e4.mul(e4.mul(o3, Dt), i3), a3 = e4.mul(o3, e4.sub(s3, e4.ONE));
        if (!e4.eql(e4.sqr(a3), n3))
          throw new Error("Cannot find square root");
        return a3;
      };
    }
    return function(e4) {
      const t3 = (e4 - Lt) / Dt;
      let n3, r3, i3;
      for (n3 = e4 - Lt, r3 = 0;n3 % Dt === Bt; n3 /= Dt, r3++)
        ;
      for (i3 = Dt;i3 < e4 && Kt(i3, t3, e4) !== e4 - Lt; i3++)
        ;
      if (r3 === 1) {
        const t4 = (e4 + Lt) / Mt;
        return function(e5, n4) {
          const r4 = e5.pow(n4, t4);
          if (!e5.eql(e5.sqr(r4), n4))
            throw new Error("Cannot find square root");
          return r4;
        };
      }
      const o3 = (n3 + Lt) / Dt;
      return function(e5, s3) {
        if (e5.pow(s3, t3) === e5.neg(e5.ONE))
          throw new Error("Cannot find square root");
        let a3 = r3, l2 = e5.pow(e5.mul(e5.ONE, i3), n3), c2 = e5.pow(s3, o3), d2 = e5.pow(s3, n3);
        for (;!e5.eql(d2, e5.ONE); ) {
          if (e5.eql(d2, e5.ZERO))
            return e5.ZERO;
          let t4 = 1;
          for (let n5 = e5.sqr(d2);t4 < a3 && !e5.eql(n5, e5.ONE); t4++)
            n5 = e5.sqr(n5);
          const n4 = e5.pow(l2, Lt << BigInt(a3 - t4 - 1));
          l2 = e5.sqr(n4), c2 = e5.mul(c2, n4), d2 = e5.mul(d2, l2), a3 = t4;
        }
        return c2;
      };
    }(e3);
  }(e2), a2 = Object.freeze({ ORDER: e2, BITS: i2, BYTES: o2, MASK: Ut(i2), ZERO: Bt, ONE: Lt, create: (t3) => jt(t3, e2), isValid: (t3) => {
    if (typeof t3 != "bigint")
      throw new Error("Invalid field element: expected bigint, got " + typeof t3);
    return Bt <= t3 && t3 < e2;
  }, is0: (e3) => e3 === Bt, isOdd: (e3) => (e3 & Lt) === Lt, neg: (t3) => jt(-t3, e2), eql: (e3, t3) => e3 === t3, sqr: (t3) => jt(t3 * t3, e2), add: (t3, n3) => jt(t3 + n3, e2), sub: (t3, n3) => jt(t3 - n3, e2), mul: (t3, n3) => jt(t3 * n3, e2), pow: (e3, t3) => function(e4, t4, n3) {
    if (n3 < Bt)
      throw new Error("Expected power > 0");
    if (n3 === Bt)
      return e4.ONE;
    if (n3 === Lt)
      return t4;
    let r3 = e4.ONE, i3 = t4;
    for (;n3 > Bt; )
      n3 & Lt && (r3 = e4.mul(r3, i3)), i3 = e4.sqr(i3), n3 >>= Lt;
    return r3;
  }(a2, e3, t3), div: (t3, n3) => jt(t3 * Vt(n3, e2), e2), sqrN: (e3) => e3 * e3, addN: (e3, t3) => e3 + t3, subN: (e3, t3) => e3 - t3, mulN: (e3, t3) => e3 * t3, inv: (t3) => Vt(t3, e2), sqrt: r2.sqrt || ((e3) => s2(a2, e3)), invertBatch: (e3) => function(e4, t3) {
    const n3 = new Array(t3.length), r3 = t3.reduce((t4, r4, i4) => e4.is0(r4) ? t4 : (n3[i4] = t4, e4.mul(t4, r4)), e4.ONE), i3 = e4.inv(r3);
    return t3.reduceRight((t4, r4, i4) => e4.is0(r4) ? t4 : (n3[i4] = e4.mul(t4, n3[i4]), e4.mul(t4, r4)), i3), n3;
  }(a2, e3), cmov: (e3, t3, n3) => n3 ? t3 : e3, toBytes: (e3) => n2 ? At(e3, o2) : Ct(e3, o2), fromBytes: (e3) => {
    if (e3.length !== o2)
      throw new Error(`Fp.fromBytes: expected ${o2}, got ${e3.length}`);
    return n2 ? It(e3) : kt(e3);
  } });
  return Object.freeze(a2);
}(hn, undefined, undefined, { sqrt: function(e2) {
  const t2 = hn, n2 = BigInt(3), r2 = BigInt(6), i2 = BigInt(11), o2 = BigInt(22), s2 = BigInt(23), a2 = BigInt(44), l2 = BigInt(88), c2 = e2 * e2 * e2 % t2, d2 = c2 * c2 * e2 % t2, u2 = Gt(d2, n2, t2) * d2 % t2, h2 = Gt(u2, n2, t2) * d2 % t2, p2 = Gt(h2, gn, t2) * c2 % t2, f2 = Gt(p2, i2, t2) * p2 % t2, g2 = Gt(f2, o2, t2) * f2 % t2, y2 = Gt(g2, a2, t2) * g2 % t2, m2 = Gt(y2, l2, t2) * y2 % t2, b2 = Gt(m2, a2, t2) * g2 % t2, w2 = Gt(b2, n2, t2) * d2 % t2, v = Gt(w2, s2, t2) * f2 % t2, x2 = Gt(v, r2, t2) * c2 % t2, S2 = Gt(x2, gn, t2);
  if (!mn.eql(mn.sqr(S2), e2))
    throw new Error("Cannot find square root");
  return S2;
} });
var bn = function(e2, t2) {
  const n2 = (t3) => dn({ ...e2, ...un(t3) });
  return Object.freeze({ ...n2(t2), create: n2 });
}({ a: BigInt(0), b: BigInt(7), Fp: mn, n: pn, Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"), Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"), h: BigInt(1), lowS: true, endo: { beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"), splitScalar: (e2) => {
  const t2 = pn, n2 = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r2 = -fn * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), i2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), o2 = n2, s2 = BigInt("0x100000000000000000000000000000000"), a2 = yn(o2 * e2, t2), l2 = yn(-r2 * e2, t2);
  let c2 = jt(e2 - a2 * n2 - l2 * i2, t2), d2 = jt(-a2 * r2 - l2 * o2, t2);
  const u2 = c2 > s2, h2 = d2 > s2;
  if (u2 && (c2 = t2 - c2), h2 && (d2 = t2 - d2), c2 > s2 || d2 > s2)
    throw new Error("splitScalar: Endomorphism failed, k=" + e2);
  return { k1neg: u2, k1: c2, k2neg: h2, k2: d2 };
} } }, mt);
BigInt(0), bn.ProjectivePoint;

class wn {
  #i;
  constructor(e2) {
    z(G(e2) === 32, "invalid private key", "privateKey", "[REDACTED]"), this.#i = j(e2);
  }
  get privateKey() {
    return this.#i;
  }
  get publicKey() {
    return wn.computePublicKey(this.#i);
  }
  get compressedPublicKey() {
    return wn.computePublicKey(this.#i, true);
  }
  sign(e2) {
    z(G(e2) === 32, "invalid digest length", "digest", e2);
    const t2 = bn.sign(_(e2), _(this.#i), { lowS: true });
    return ct.from({ r: Je(t2.r, 32), s: Je(t2.s, 32), v: t2.recovery ? 28 : 27 });
  }
  computeSharedSecret(e2) {
    const t2 = wn.computePublicKey(e2);
    return j(bn.getSharedSecret(_(this.#i), D(t2), false));
  }
  static computePublicKey(e2, t2) {
    let n2 = D(e2, "key");
    if (n2.length === 32)
      return j(bn.getPublicKey(n2, !!t2));
    if (n2.length === 64) {
      const e3 = new Uint8Array(65);
      e3[0] = 4, e3.set(n2, 1), n2 = e3;
    }
    return j(bn.ProjectivePoint.fromHex(n2).toRawBytes(t2));
  }
  static recoverPublicKey(e2, t2) {
    z(G(e2) === 32, "invalid digest length", "digest", e2);
    const n2 = ct.from(t2);
    let r2 = bn.Signature.fromCompact(_(K([n2.r, n2.s])));
    r2 = r2.addRecoveryBit(n2.yParity);
    const i2 = r2.recoverPublicKey(_(e2));
    return z(i2 != null, "invalid signature for digest", "signature", t2), "0x" + i2.toHex(false);
  }
  static addPoints(e2, t2, n2) {
    const r2 = bn.ProjectivePoint.fromHex(wn.computePublicKey(e2).substring(2)), i2 = bn.ProjectivePoint.fromHex(wn.computePublicKey(t2).substring(2));
    return "0x" + r2.add(i2).toHex(!!n2);
  }
}
var vn = BigInt(0);
var xn = BigInt(36);
function Sn(e2) {
  const t2 = (e2 = e2.toLowerCase()).substring(2).split(""), n2 = new Uint8Array(40);
  for (let e3 = 0;e3 < 40; e3++)
    n2[e3] = t2[e3].charCodeAt(0);
  const r2 = D(_e(n2));
  for (let e3 = 0;e3 < 40; e3 += 2)
    r2[e3 >> 1] >> 4 >= 8 && (t2[e3] = t2[e3].toUpperCase()), (15 & r2[e3 >> 1]) >= 8 && (t2[e3 + 1] = t2[e3 + 1].toUpperCase());
  return "0x" + t2.join("");
}
var Pn = {};
for (let e2 = 0;e2 < 10; e2++)
  Pn[String(e2)] = String(e2);
for (let e2 = 0;e2 < 26; e2++)
  Pn[String.fromCharCode(65 + e2)] = String(10 + e2);
var En = function() {
  const e2 = {};
  for (let t2 = 0;t2 < 36; t2++)
    e2["0123456789abcdefghijklmnopqrstuvwxyz"[t2]] = BigInt(t2);
  return e2;
}();
function kn(e2) {
  if (z(typeof e2 == "string", "invalid address", "address", e2), e2.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    e2.startsWith("0x") || (e2 = "0x" + e2);
    const t2 = Sn(e2);
    return z(!e2.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t2 === e2, "bad address checksum", "address", e2), t2;
  }
  if (e2.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    z(e2.substring(2, 4) === function(e3) {
      let t3 = (e3 = (e3 = e3.toUpperCase()).substring(4) + e3.substring(0, 2) + "00").split("").map((e4) => Pn[e4]).join("");
      for (;t3.length >= 15; ) {
        let e4 = t3.substring(0, 15);
        t3 = parseInt(e4, 10) % 97 + t3.substring(e4.length);
      }
      let n2 = String(98 - parseInt(t3, 10) % 97);
      for (;n2.length < 2; )
        n2 = "0" + n2;
      return n2;
    }(e2), "bad icap checksum", "address", e2);
    let t2 = function(e3) {
      e3 = e3.toLowerCase();
      let t3 = vn;
      for (let n2 = 0;n2 < e3.length; n2++)
        t3 = t3 * xn + En[e3[n2]];
      return t3;
    }(e2.substring(4)).toString(16);
    for (;t2.length < 40; )
      t2 = "0" + t2;
    return Sn("0x" + t2);
  }
  z(false, "invalid address", "address", e2);
}
async function In(e2, t2) {
  const n2 = await t2;
  return n2 != null && n2 !== "0x0000000000000000000000000000000000000000" || (O(typeof e2 != "string", "unconfigured name", "UNCONFIGURED_NAME", { value: e2 }), z(false, "invalid AddressLike value; did not resolve to a value address", "target", e2)), kn(n2);
}
function Cn(e2, t2) {
  return typeof e2 == "string" ? e2.match(/^0x[0-9a-f]{40}$/i) ? kn(e2) : (O(t2 != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName" }), In(e2, t2.resolveName(e2))) : (n2 = e2) && typeof n2.getAddress == "function" ? In(e2, e2.getAddress()) : e2 && typeof e2.then == "function" ? In(e2, e2) : void z(false, "unsupported addressable value", "target", e2);
  var n2;
}
function An(e2, t2, n2, r2, i2) {
  if (e2 === "BAD_PREFIX" || e2 === "UNEXPECTED_CONTINUE") {
    let e3 = 0;
    for (let r3 = t2 + 1;r3 < n2.length && n2[r3] >> 6 == 2; r3++)
      e3++;
    return e3;
  }
  return e2 === "OVERRUN" ? n2.length - t2 - 1 : 0;
}
function Tn(e2, t2) {
  z(typeof e2 == "string", "invalid string value", "str", e2), t2 != null && ($(t2), e2 = e2.normalize(t2));
  let n2 = [];
  for (let t3 = 0;t3 < e2.length; t3++) {
    const r2 = e2.charCodeAt(t3);
    if (r2 < 128)
      n2.push(r2);
    else if (r2 < 2048)
      n2.push(r2 >> 6 | 192), n2.push(63 & r2 | 128);
    else if ((64512 & r2) == 55296) {
      t3++;
      const i2 = e2.charCodeAt(t3);
      z(t3 < e2.length && (64512 & i2) == 56320, "invalid surrogate pair", "str", e2);
      const o2 = 65536 + ((1023 & r2) << 10) + (1023 & i2);
      n2.push(o2 >> 18 | 240), n2.push(o2 >> 12 & 63 | 128), n2.push(o2 >> 6 & 63 | 128), n2.push(63 & o2 | 128);
    } else
      n2.push(r2 >> 12 | 224), n2.push(r2 >> 6 & 63 | 128), n2.push(63 & r2 | 128);
  }
  return new Uint8Array(n2);
}
function Rn(e2) {
  const t2 = [];
  for (;e2; )
    t2.unshift(255 & e2), e2 >>= 8;
  return t2;
}
function Un(e2) {
  if (Array.isArray(e2)) {
    let t3 = [];
    if (e2.forEach(function(e3) {
      t3 = t3.concat(Un(e3));
    }), t3.length <= 55)
      return t3.unshift(192 + t3.length), t3;
    const n3 = Rn(t3.length);
    return n3.unshift(247 + n3.length), n3.concat(t3);
  }
  const t2 = Array.prototype.slice.call(D(e2, "object"));
  if (t2.length === 1 && t2[0] <= 127)
    return t2;
  if (t2.length <= 55)
    return t2.unshift(128 + t2.length), t2;
  const n2 = Rn(t2.length);
  return n2.unshift(183 + n2.length), n2.concat(t2);
}
Object.freeze({ error: function(e2, t2, n2, r2, i2) {
  z(false, `invalid codepoint at offset ${t2}; ${e2}`, "bytes", n2);
}, ignore: An, replace: function(e2, t2, n2, r2, i2) {
  return e2 === "OVERLONG" ? (z(typeof i2 == "number", "invalid bad code point for replacement", "badCodepoint", i2), r2.push(i2), 0) : (r2.push(65533), An(e2, t2, n2));
} });
var Fn = "0123456789abcdef";
function On(e2) {
  let t2 = "0x";
  for (const n2 of Un(e2))
    t2 += Fn[n2 >> 4], t2 += Fn[15 & n2];
  return t2;
}
function zn(e2) {
  return _e(Tn(e2));
}
var Nn = new Uint8Array(32);
Nn.fill(0);
var $n = BigInt(-1);
var Bn = BigInt(0);
var Ln = BigInt(1);
var Dn = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var _n = Je(Ln, 32);
var Mn = Je(Bn, 32);
var Wn = { name: "string", version: "string", chainId: "uint256", verifyingContract: "address", salt: "bytes32" };
var Hn = ["name", "version", "chainId", "verifyingContract", "salt"];
function jn(e2) {
  return function(t2) {
    return z(typeof t2 == "string", `invalid domain value for ${JSON.stringify(e2)}`, `domain.${e2}`, t2), t2;
  };
}
var Kn = { name: jn("name"), version: jn("version"), chainId: function(e2) {
  const t2 = Ke(e2, "domain.chainId");
  return z(t2 >= 0, "invalid chain ID", "domain.chainId", e2), Number.isSafeInteger(t2) ? Number(t2) : function(e3) {
    let t3 = j(W(e3) ? e3 : Ze(e3)).substring(2);
    for (;t3.startsWith("0"); )
      t3 = t3.substring(1);
    return t3 === "" && (t3 = "0"), "0x" + t3;
  }(t2);
}, verifyingContract: function(e2) {
  try {
    return kn(e2).toLowerCase();
  } catch (e3) {}
  z(false, 'invalid domain value "verifyingContract"', "domain.verifyingContract", e2);
}, salt: function(e2) {
  const t2 = D(e2, "domain.salt");
  return z(t2.length === 32, 'invalid domain value "salt"', "domain.salt", e2), j(t2);
} };
function Gn(e2) {
  {
    const t2 = e2.match(/^(u?)int(\d+)$/);
    if (t2) {
      const n2 = t2[1] === "", r2 = parseInt(t2[2]);
      z(r2 % 8 == 0 && r2 !== 0 && r2 <= 256 && t2[2] === String(r2), "invalid numeric width", "type", e2);
      const i2 = function(e3, t3) {
        const n3 = Ge(Dn, "value"), r3 = BigInt(Ye(t3, "bits"));
        return n3 & (He << r3) - He;
      }(0, n2 ? r2 - 1 : r2), o2 = n2 ? (i2 + Ln) * $n : Bn;
      return function(t3) {
        const r3 = Ke(t3, "value");
        return z(r3 >= o2 && r3 <= i2, `value out-of-bounds for ${e2}`, "value", r3), Je(n2 ? function(e3) {
          let t4 = Ke(e3, "value");
          const n3 = BigInt(Ye(256, "width")), r4 = He << n3 - He;
          return t4 < We ? (t4 = -t4, O(t4 <= r4, "too low", "NUMERIC_FAULT", { operation: "toTwos", fault: "overflow", value: e3 }), (~t4 & (He << n3) - He) + He) : (O(t4 < r4, "too high", "NUMERIC_FAULT", { operation: "toTwos", fault: "overflow", value: e3 }), t4);
        }(r3) : r3, 32);
      };
    }
  }
  {
    const t2 = e2.match(/^bytes(\d+)$/);
    if (t2) {
      const n2 = parseInt(t2[1]);
      return z(n2 !== 0 && n2 <= 32 && t2[1] === String(n2), "invalid bytes width", "type", e2), function(t3) {
        return z(D(t3).length === n2, `invalid length for ${e2}`, "value", t3), function(e3) {
          const t4 = D(e3), n3 = t4.length % 32;
          return n3 ? K([t4, Nn.slice(n3)]) : j(t4);
        }(t3);
      };
    }
  }
  switch (e2) {
    case "address":
      return function(e3) {
        return q(kn(e3), 32);
      };
    case "bool":
      return function(e3) {
        return e3 ? _n : Mn;
      };
    case "bytes":
      return function(e3) {
        return _e(e3);
      };
    case "string":
      return function(e3) {
        return zn(e3);
      };
  }
  return null;
}
function Vn(e2, t2) {
  return `${e2}(${t2.map(({ name: e3, type: t3 }) => t3 + " " + e3).join(",")})`;
}
function qn(e2) {
  const t2 = e2.match(/^([^\x5b]*)((\x5b\d*\x5d)*)(\x5b(\d*)\x5d)$/);
  return t2 ? { base: t2[1], index: t2[2] + t2[4], array: { base: t2[1], prefix: t2[1] + t2[2], count: t2[5] ? parseInt(t2[5]) : -1 } } : { base: e2 };
}

class Yn {
  primaryType;
  #o;
  get types() {
    return JSON.parse(this.#o);
  }
  #s;
  #a;
  constructor(e2) {
    this.#s = new Map, this.#a = new Map;
    const t2 = new Map, n2 = new Map, r2 = new Map, i2 = {};
    Object.keys(e2).forEach((o3) => {
      i2[o3] = e2[o3].map(({ name: t3, type: n3 }) => {
        let { base: r3, index: i3 } = qn(n3);
        return r3 !== "int" || e2.int || (r3 = "int256"), r3 !== "uint" || e2.uint || (r3 = "uint256"), { name: t3, type: r3 + (i3 || "") };
      }), t2.set(o3, new Set), n2.set(o3, []), r2.set(o3, new Set);
    }), this.#o = JSON.stringify(i2);
    for (const r3 in i2) {
      const o3 = new Set;
      for (const s2 of i2[r3]) {
        z(!o3.has(s2.name), `duplicate variable name ${JSON.stringify(s2.name)} in ${JSON.stringify(r3)}`, "types", e2), o3.add(s2.name);
        const i3 = qn(s2.type).base;
        z(i3 !== r3, `circular type reference to ${JSON.stringify(i3)}`, "types", e2), Gn(i3) || (z(n2.has(i3), `unknown type ${JSON.stringify(i3)}`, "types", e2), n2.get(i3).push(r3), t2.get(r3).add(i3));
      }
    }
    const o2 = Array.from(n2.keys()).filter((e3) => n2.get(e3).length === 0);
    z(o2.length !== 0, "missing primary type", "types", e2), z(o2.length === 1, `ambiguous primary types or unused types: ${o2.map((e3) => JSON.stringify(e3)).join(", ")}`, "types", e2), U(this, { primaryType: o2[0] }), function i3(o3, s2) {
      z(!s2.has(o3), `circular type reference to ${JSON.stringify(o3)}`, "types", e2), s2.add(o3);
      for (const e3 of t2.get(o3))
        if (n2.has(e3)) {
          i3(e3, s2);
          for (const t3 of s2)
            r2.get(t3).add(e3);
        }
      s2.delete(o3);
    }(this.primaryType, new Set);
    for (const [e3, t3] of r2) {
      const n3 = Array.from(t3);
      n3.sort(), this.#s.set(e3, Vn(e3, i2[e3]) + n3.map((e4) => Vn(e4, i2[e4])).join(""));
    }
  }
  getEncoder(e2) {
    let t2 = this.#a.get(e2);
    return t2 || (t2 = this.#l(e2), this.#a.set(e2, t2)), t2;
  }
  #l(e2) {
    {
      const t3 = Gn(e2);
      if (t3)
        return t3;
    }
    const t2 = qn(e2).array;
    if (t2) {
      const e3 = t2.prefix, n3 = this.getEncoder(e3);
      return (r2) => {
        z(t2.count === -1 || t2.count === r2.length, `array length mismatch; expected length ${t2.count}`, "value", r2);
        let i2 = r2.map(n3);
        return this.#s.has(e3) && (i2 = i2.map(_e)), _e(K(i2));
      };
    }
    const n2 = this.types[e2];
    if (n2) {
      const t3 = zn(this.#s.get(e2));
      return (e3) => {
        const r2 = n2.map(({ name: t4, type: n3 }) => {
          const r3 = this.getEncoder(n3)(e3[t4]);
          return this.#s.has(n3) ? _e(r3) : r3;
        });
        return r2.unshift(t3), K(r2);
      };
    }
    z(false, `unknown type: ${e2}`, "type", e2);
  }
  encodeType(e2) {
    const t2 = this.#s.get(e2);
    return z(t2, `unknown type: ${JSON.stringify(e2)}`, "name", e2), t2;
  }
  encodeData(e2, t2) {
    return this.getEncoder(e2)(t2);
  }
  hashStruct(e2, t2) {
    return _e(this.encodeData(e2, t2));
  }
  encode(e2) {
    return this.encodeData(this.primaryType, e2);
  }
  hash(e2) {
    return this.hashStruct(this.primaryType, e2);
  }
  _visit(e2, t2, n2) {
    if (Gn(e2))
      return n2(e2, t2);
    const r2 = qn(e2).array;
    if (r2)
      return z(r2.count === -1 || r2.count === t2.length, `array length mismatch; expected length ${r2.count}`, "value", t2), t2.map((e3) => this._visit(r2.prefix, e3, n2));
    const i2 = this.types[e2];
    if (i2)
      return i2.reduce((e3, { name: r3, type: i3 }) => (e3[r3] = this._visit(i3, t2[r3], n2), e3), {});
    z(false, `unknown type: ${e2}`, "type", e2);
  }
  visit(e2, t2) {
    return this._visit(this.primaryType, e2, t2);
  }
  static from(e2) {
    return new Yn(e2);
  }
  static getPrimaryType(e2) {
    return Yn.from(e2).primaryType;
  }
  static hashStruct(e2, t2, n2) {
    return Yn.from(t2).hashStruct(e2, n2);
  }
  static hashDomain(e2) {
    const t2 = [];
    for (const n2 in e2) {
      if (e2[n2] == null)
        continue;
      const r2 = Wn[n2];
      z(r2, `invalid typed-data domain key: ${JSON.stringify(n2)}`, "domain", e2), t2.push({ name: n2, type: r2 });
    }
    return t2.sort((e3, t3) => Hn.indexOf(e3.name) - Hn.indexOf(t3.name)), Yn.hashStruct("EIP712Domain", { EIP712Domain: t2 }, e2);
  }
  static encode(e2, t2, n2) {
    return K(["0x1901", Yn.hashDomain(e2), Yn.from(t2).hash(n2)]);
  }
  static hash(e2, t2, n2) {
    return _e(Yn.encode(e2, t2, n2));
  }
  static async resolveNames(e2, t2, n2, r2) {
    e2 = Object.assign({}, e2);
    for (const t3 in e2)
      e2[t3] == null && delete e2[t3];
    const i2 = {};
    e2.verifyingContract && !M(e2.verifyingContract, 20) && (i2[e2.verifyingContract] = "0x");
    const o2 = Yn.from(t2);
    o2.visit(n2, (e3, t3) => (e3 !== "address" || M(t3, 20) || (i2[t3] = "0x"), t3));
    for (const e3 in i2)
      i2[e3] = await r2(e3);
    return e2.verifyingContract && i2[e2.verifyingContract] && (e2.verifyingContract = i2[e2.verifyingContract]), { domain: e2, value: n2 = o2.visit(n2, (e3, t3) => e3 === "address" && i2[t3] ? i2[t3] : t3) };
  }
  static getPayload(e2, t2, n2) {
    Yn.hashDomain(e2);
    const r2 = {}, i2 = [];
    Hn.forEach((t3) => {
      const n3 = e2[t3];
      n3 != null && (r2[t3] = Kn[t3](n3), i2.push({ name: t3, type: Wn[t3] }));
    });
    const o2 = Yn.from(t2);
    t2 = o2.types;
    const s2 = Object.assign({}, t2);
    return z(s2.EIP712Domain == null, "types must not contain EIP712Domain type", "types.EIP712Domain", t2), s2.EIP712Domain = i2, o2.encode(n2), { types: s2, domain: r2, primaryType: o2.primaryType, message: o2.visit(n2, (e3, t3) => {
      if (e3.match(/^bytes(\d*)/))
        return j(D(t3));
      if (e3.match(/^u?int/))
        return Ke(t3).toString();
      switch (e3) {
        case "address":
          return t3.toLowerCase();
        case "bool":
          return !!t3;
        case "string":
          return z(typeof t3 == "string", "invalid string", "value", t3), t3;
      }
      z(false, "unsupported type", "type", e3);
    }) };
  }
}
var Jn = "0x0000000000000000000000000000000000000000";
function Zn(e2, t2, n2, r2) {
  const { c: i2, dkLen: o2, DK: s2, PRF: a2, PRFSalt: l2 } = function(e3, t3, n3, r3) {
    Z(e3);
    const i3 = we({ dkLen: 32, asyncTick: 10 }, r3), { c: o3, dkLen: s3, asyncTick: a3 } = i3;
    if (Y(o3), Y(s3), Y(a3), o3 < 1)
      throw new Error("PBKDF2: iterations (c) should be >= 1");
    const l3 = ye(t3), c3 = ye(n3), d3 = new Uint8Array(s3), u3 = Qt.create(e3, l3), h3 = u3._cloneInto().update(c3);
    return { c: o3, dkLen: s3, asyncTick: a3, DK: d3, PRF: u3, PRFSalt: h3 };
  }(e2, t2, n2, r2);
  let c2;
  const d2 = new Uint8Array(4), u2 = he(d2), h2 = new Uint8Array(a2.outputLen);
  for (let e3 = 1, t3 = 0;t3 < o2; e3++, t3 += a2.outputLen) {
    const n3 = s2.subarray(t3, t3 + a2.outputLen);
    u2.setInt32(0, e3, false), (c2 = l2._cloneInto(c2)).update(d2).digestInto(h2), n3.set(h2.subarray(0, n3.length));
    for (let e4 = 1;e4 < i2; e4++) {
      a2._cloneInto(c2).update(h2).digestInto(h2);
      for (let e5 = 0;e5 < n3.length; e5++)
        n3[e5] ^= h2[e5];
    }
  }
  return function(e3, t3, n3, r3, i3) {
    return e3.destroy(), t3.destroy(), r3 && r3.destroy(), i3.fill(0), n3;
  }(a2, l2, s2, c2, h2);
}
var [Xn, Qn] = (() => le.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((e2) => BigInt(e2))))();
var er = new Uint32Array(80);
var tr = new Uint32Array(80);

class nr extends dt {
  constructor() {
    super(128, 64, 16, false), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  get() {
    const { Ah: e2, Al: t2, Bh: n2, Bl: r2, Ch: i2, Cl: o2, Dh: s2, Dl: a2, Eh: l2, El: c2, Fh: d2, Fl: u2, Gh: h2, Gl: p2, Hh: f2, Hl: g2 } = this;
    return [e2, t2, n2, r2, i2, o2, s2, a2, l2, c2, d2, u2, h2, p2, f2, g2];
  }
  set(e2, t2, n2, r2, i2, o2, s2, a2, l2, c2, d2, u2, h2, p2, f2, g2) {
    this.Ah = 0 | e2, this.Al = 0 | t2, this.Bh = 0 | n2, this.Bl = 0 | r2, this.Ch = 0 | i2, this.Cl = 0 | o2, this.Dh = 0 | s2, this.Dl = 0 | a2, this.Eh = 0 | l2, this.El = 0 | c2, this.Fh = 0 | d2, this.Fl = 0 | u2, this.Gh = 0 | h2, this.Gl = 0 | p2, this.Hh = 0 | f2, this.Hl = 0 | g2;
  }
  process(e2, t2) {
    for (let n3 = 0;n3 < 16; n3++, t2 += 4)
      er[n3] = e2.getUint32(t2), tr[n3] = e2.getUint32(t2 += 4);
    for (let e3 = 16;e3 < 80; e3++) {
      const t3 = 0 | er[e3 - 15], n3 = 0 | tr[e3 - 15], r3 = le.rotrSH(t3, n3, 1) ^ le.rotrSH(t3, n3, 8) ^ le.shrSH(t3, n3, 7), i3 = le.rotrSL(t3, n3, 1) ^ le.rotrSL(t3, n3, 8) ^ le.shrSL(t3, n3, 7), o3 = 0 | er[e3 - 2], s3 = 0 | tr[e3 - 2], a3 = le.rotrSH(o3, s3, 19) ^ le.rotrBH(o3, s3, 61) ^ le.shrSH(o3, s3, 6), l3 = le.rotrSL(o3, s3, 19) ^ le.rotrBL(o3, s3, 61) ^ le.shrSL(o3, s3, 6), c3 = le.add4L(i3, l3, tr[e3 - 7], tr[e3 - 16]), d3 = le.add4H(c3, r3, a3, er[e3 - 7], er[e3 - 16]);
      er[e3] = 0 | d3, tr[e3] = 0 | c3;
    }
    let { Ah: n2, Al: r2, Bh: i2, Bl: o2, Ch: s2, Cl: a2, Dh: l2, Dl: c2, Eh: d2, El: u2, Fh: h2, Fl: p2, Gh: f2, Gl: g2, Hh: y2, Hl: m2 } = this;
    for (let e3 = 0;e3 < 80; e3++) {
      const t3 = le.rotrSH(d2, u2, 14) ^ le.rotrSH(d2, u2, 18) ^ le.rotrBH(d2, u2, 41), b2 = le.rotrSL(d2, u2, 14) ^ le.rotrSL(d2, u2, 18) ^ le.rotrBL(d2, u2, 41), w2 = d2 & h2 ^ ~d2 & f2, v = u2 & p2 ^ ~u2 & g2, x2 = le.add5L(m2, b2, v, Qn[e3], tr[e3]), S2 = le.add5H(x2, y2, t3, w2, Xn[e3], er[e3]), P2 = 0 | x2, E2 = le.rotrSH(n2, r2, 28) ^ le.rotrBH(n2, r2, 34) ^ le.rotrBH(n2, r2, 39), k2 = le.rotrSL(n2, r2, 28) ^ le.rotrBL(n2, r2, 34) ^ le.rotrBL(n2, r2, 39), I2 = n2 & i2 ^ n2 & s2 ^ i2 & s2, C2 = r2 & o2 ^ r2 & a2 ^ o2 & a2;
      y2 = 0 | f2, m2 = 0 | g2, f2 = 0 | h2, g2 = 0 | p2, h2 = 0 | d2, p2 = 0 | u2, { h: d2, l: u2 } = le.add(0 | l2, 0 | c2, 0 | S2, 0 | P2), l2 = 0 | s2, c2 = 0 | a2, s2 = 0 | i2, a2 = 0 | o2, i2 = 0 | n2, o2 = 0 | r2;
      const A2 = le.add3L(P2, k2, C2);
      n2 = le.add3H(A2, S2, E2, I2), r2 = 0 | A2;
    }
    ({ h: n2, l: r2 } = le.add(0 | this.Ah, 0 | this.Al, 0 | n2, 0 | r2)), { h: i2, l: o2 } = le.add(0 | this.Bh, 0 | this.Bl, 0 | i2, 0 | o2), { h: s2, l: a2 } = le.add(0 | this.Ch, 0 | this.Cl, 0 | s2, 0 | a2), { h: l2, l: c2 } = le.add(0 | this.Dh, 0 | this.Dl, 0 | l2, 0 | c2), { h: d2, l: u2 } = le.add(0 | this.Eh, 0 | this.El, 0 | d2, 0 | u2), { h: h2, l: p2 } = le.add(0 | this.Fh, 0 | this.Fl, 0 | h2, 0 | p2), { h: f2, l: g2 } = le.add(0 | this.Gh, 0 | this.Gl, 0 | f2, 0 | g2), { h: y2, l: m2 } = le.add(0 | this.Hh, 0 | this.Hl, 0 | y2, 0 | m2), this.set(n2, r2, i2, o2, s2, a2, l2, c2, d2, u2, h2, p2, f2, g2, y2, m2);
  }
  roundClean() {
    er.fill(0), tr.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
var rr = ve(() => new nr);
var ir = function() {
  if (typeof self != "undefined")
    return self;
  if (typeof window != "undefined")
    return window;
  if (g.g !== undefined)
    return g.g;
  throw new Error("unable to locate global object");
}();
var or = ir.crypto || ir.msCrypto;
function sr(e2) {
  switch (e2) {
    case "sha256":
      return mt.create();
    case "sha512":
      return rr.create();
  }
  z(false, "invalid hashing algorithm name", "algorithm", e2);
}
var ar = function(e2) {
  return sr("sha256").update(e2).digest();
};
var lr = function(e2) {
  return sr("sha512").update(e2).digest();
};
var cr = ar;
var dr = lr;
var ur = false;
var hr = false;
function pr(e2) {
  const t2 = D(e2, "data");
  return j(cr(t2));
}
function fr(e2) {
  const t2 = D(e2, "data");
  return j(dr(t2));
}
function gr(e2) {
  let t2 = e2.toString(16);
  for (;t2.length < 2; )
    t2 = "0" + t2;
  return "0x" + t2;
}
function yr(e2, t2, n2) {
  let r2 = 0;
  for (let i2 = 0;i2 < n2; i2++)
    r2 = 256 * r2 + e2[t2 + i2];
  return r2;
}
function mr(e2, t2, n2, r2) {
  const i2 = [];
  for (;n2 < t2 + 1 + r2; ) {
    const o2 = br(e2, n2);
    i2.push(o2.result), O((n2 += o2.consumed) <= t2 + 1 + r2, "child data too short", "BUFFER_OVERRUN", { buffer: e2, length: r2, offset: t2 });
  }
  return { consumed: 1 + r2, result: i2 };
}
function br(e2, t2) {
  O(e2.length !== 0, "data too short", "BUFFER_OVERRUN", { buffer: e2, length: 0, offset: 1 });
  const n2 = (t3) => {
    O(t3 <= e2.length, "data short segment too short", "BUFFER_OVERRUN", { buffer: e2, length: e2.length, offset: t3 });
  };
  if (e2[t2] >= 248) {
    const r2 = e2[t2] - 247;
    n2(t2 + 1 + r2);
    const i2 = yr(e2, t2 + 1, r2);
    return n2(t2 + 1 + r2 + i2), mr(e2, t2, t2 + 1 + r2, r2 + i2);
  }
  if (e2[t2] >= 192) {
    const r2 = e2[t2] - 192;
    return n2(t2 + 1 + r2), mr(e2, t2, t2 + 1, r2);
  }
  if (e2[t2] >= 184) {
    const r2 = e2[t2] - 183;
    n2(t2 + 1 + r2);
    const i2 = yr(e2, t2 + 1, r2);
    return n2(t2 + 1 + r2 + i2), { consumed: 1 + r2 + i2, result: j(e2.slice(t2 + 1 + r2, t2 + 1 + r2 + i2)) };
  }
  if (e2[t2] >= 128) {
    const r2 = e2[t2] - 128;
    return n2(t2 + 1 + r2), { consumed: 1 + r2, result: j(e2.slice(t2 + 1, t2 + 1 + r2)) };
  }
  return { consumed: 1, result: gr(e2[t2]) };
}
function wr(e2) {
  const t2 = D(e2, "data"), n2 = br(t2, 0);
  return z(n2.consumed === t2.length, "unexpected junk after rlp payload", "data", e2), n2.result;
}
function vr(e2, t2) {
  return { address: kn(e2), storageKeys: t2.map((e3, t3) => (z(M(e3, 32), "invalid slot", `storageKeys[${t3}]`, e3), e3.toLowerCase())) };
}
function xr(e2) {
  if (Array.isArray(e2))
    return e2.map((t3, n2) => Array.isArray(t3) ? (z(t3.length === 2, "invalid slot set", `value[${n2}]`, t3), vr(t3[0], t3[1])) : (z(t3 != null && typeof t3 == "object", "invalid address-slot set", "value", e2), vr(t3.address, t3.storageKeys)));
  z(e2 != null && typeof e2 == "object", "invalid access list", "value", e2);
  const t2 = Object.keys(e2).map((t3) => {
    const n2 = e2[t3].reduce((e3, t4) => (e3[t4] = true, e3), {});
    return vr(t3, Object.keys(n2).sort());
  });
  return t2.sort((e3, t3) => e3.address.localeCompare(t3.address)), t2;
}
function Sr(e2) {
  let t2;
  return t2 = typeof e2 == "string" ? wn.computePublicKey(e2, false) : e2.publicKey, kn(_e("0x" + t2.substring(4)).substring(26));
}
pr._ = ar, pr.lock = function() {
  ur = true;
}, pr.register = function(e2) {
  if (ur)
    throw new Error("sha256 is locked");
  cr = e2;
}, Object.freeze(pr), fr._ = lr, fr.lock = function() {
  hr = true;
}, fr.register = function(e2) {
  if (hr)
    throw new Error("sha512 is locked");
  dr = e2;
}, Object.freeze(pr);
var Pr = BigInt(0);
var Er = BigInt(2);
var kr = BigInt(27);
var Ir = BigInt(28);
var Cr = BigInt(35);
var Ar = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var Tr = Symbol.for("nodejs.util.inspect.custom");
var Rr = 131072;
var Ur = 128;
function Fr(e2, t2) {
  let n2 = e2.toString(16);
  for (;n2.length < 2; )
    n2 = "0" + n2;
  return n2 += pr(t2).substring(4), "0x" + n2;
}
function Or(e2) {
  return e2 === "0x" ? null : kn(e2);
}
function zr(e2, t2) {
  try {
    return xr(e2);
  } catch (n2) {
    z(false, n2.message, t2, e2);
  }
}
function Nr(e2, t2) {
  try {
    if (!Array.isArray(e2))
      throw new Error("authorizationList: invalid array");
    const t3 = [];
    for (let n2 = 0;n2 < e2.length; n2++) {
      const r2 = e2[n2];
      if (!Array.isArray(r2))
        throw new Error(`authorization[${n2}]: invalid array`);
      if (r2.length !== 6)
        throw new Error(`authorization[${n2}]: wrong length`);
      if (!r2[1])
        throw new Error(`authorization[${n2}]: null address`);
      t3.push({ address: Or(r2[1]), nonce: Br(r2[2], "nonce"), chainId: Br(r2[0], "chainId"), signature: ct.from({ yParity: $r(r2[3], "yParity"), r: q(r2[4], 32), s: q(r2[5], 32) }) });
    }
    return t3;
  } catch (n2) {
    z(false, n2.message, t2, e2);
  }
}
function $r(e2, t2) {
  return e2 === "0x" ? 0 : Ye(e2, t2);
}
function Br(e2, t2) {
  if (e2 === "0x")
    return Pr;
  const n2 = Ke(e2, t2);
  return z(n2 <= Ar, "value exceeds uint size", t2, n2), n2;
}
function Lr(e2, t2) {
  const n2 = Ke(e2, "value"), r2 = Ze(n2);
  return z(r2.length <= 32, "value too large", `tx.${t2}`, n2), r2;
}
function Dr(e2) {
  return xr(e2).map((e3) => [e3.address, e3.storageKeys]);
}
function _r(e2, t2) {
  z(Array.isArray(e2), `invalid ${t2}`, "value", e2);
  for (let t3 = 0;t3 < e2.length; t3++)
    z(M(e2[t3], 32), "invalid ${ param } hash", `value[${t3}]`, e2[t3]);
  return e2;
}
function Mr(e2, t2) {
  let n2;
  try {
    if (n2 = $r(t2[0], "yParity"), n2 !== 0 && n2 !== 1)
      throw new Error("bad yParity");
  } catch (e3) {
    z(false, "invalid yParity", "yParity", t2[0]);
  }
  const r2 = q(t2[1], 32), i2 = q(t2[2], 32), o2 = ct.from({ r: r2, s: i2, yParity: n2 });
  e2.signature = o2;
}

class Wr {
  #c;
  #d;
  #u;
  #h;
  #p;
  #f;
  #g;
  #y;
  #m;
  #b;
  #w;
  #v;
  #x;
  #S;
  #P;
  #E;
  #k;
  #I;
  get type() {
    return this.#c;
  }
  set type(e2) {
    switch (e2) {
      case null:
        this.#c = null;
        break;
      case 0:
      case "legacy":
        this.#c = 0;
        break;
      case 1:
      case "berlin":
      case "eip-2930":
        this.#c = 1;
        break;
      case 2:
      case "london":
      case "eip-1559":
        this.#c = 2;
        break;
      case 3:
      case "cancun":
      case "eip-4844":
        this.#c = 3;
        break;
      case 4:
      case "pectra":
      case "eip-7702":
        this.#c = 4;
        break;
      default:
        z(false, "unsupported transaction type", "type", e2);
    }
  }
  get typeName() {
    switch (this.type) {
      case 0:
        return "legacy";
      case 1:
        return "eip-2930";
      case 2:
        return "eip-1559";
      case 3:
        return "eip-4844";
      case 4:
        return "eip-7702";
    }
    return null;
  }
  get to() {
    const e2 = this.#d;
    return e2 == null && this.type === 3 ? Jn : e2;
  }
  set to(e2) {
    this.#d = e2 == null ? null : kn(e2);
  }
  get nonce() {
    return this.#h;
  }
  set nonce(e2) {
    this.#h = Ye(e2, "value");
  }
  get gasLimit() {
    return this.#p;
  }
  set gasLimit(e2) {
    this.#p = Ke(e2);
  }
  get gasPrice() {
    const e2 = this.#f;
    return e2 != null || this.type !== 0 && this.type !== 1 ? e2 : Pr;
  }
  set gasPrice(e2) {
    this.#f = e2 == null ? null : Ke(e2, "gasPrice");
  }
  get maxPriorityFeePerGas() {
    return this.#g ?? (this.type === 2 || this.type === 3 ? Pr : null);
  }
  set maxPriorityFeePerGas(e2) {
    this.#g = e2 == null ? null : Ke(e2, "maxPriorityFeePerGas");
  }
  get maxFeePerGas() {
    return this.#y ?? (this.type === 2 || this.type === 3 ? Pr : null);
  }
  set maxFeePerGas(e2) {
    this.#y = e2 == null ? null : Ke(e2, "maxFeePerGas");
  }
  get data() {
    return this.#u;
  }
  set data(e2) {
    this.#u = j(e2);
  }
  get value() {
    return this.#m;
  }
  set value(e2) {
    this.#m = Ke(e2, "value");
  }
  get chainId() {
    return this.#b;
  }
  set chainId(e2) {
    this.#b = Ke(e2);
  }
  get signature() {
    return this.#w || null;
  }
  set signature(e2) {
    this.#w = e2 == null ? null : ct.from(e2);
  }
  isValid() {
    const e2 = this.signature;
    if (e2 && !e2.isValid())
      return false;
    const t2 = this.authorizationList;
    if (t2) {
      for (const e3 of t2)
        if (!e3.signature.isValid())
          return false;
    }
    return true;
  }
  get accessList() {
    return (this.#v || null) ?? (this.type === 1 || this.type === 2 || this.type === 3 ? [] : null);
  }
  set accessList(e2) {
    this.#v = e2 == null ? null : xr(e2);
  }
  get authorizationList() {
    const e2 = this.#k || null;
    return e2 == null && this.type === 4 ? [] : e2;
  }
  set authorizationList(e2) {
    this.#k = e2 == null ? null : e2.map((e3) => {
      return { address: kn((t2 = e3).address), nonce: Ke(t2.nonce != null ? t2.nonce : 0), chainId: Ke(t2.chainId != null ? t2.chainId : 0), signature: ct.from(t2.signature) };
      var t2;
    });
  }
  get maxFeePerBlobGas() {
    const e2 = this.#x;
    return e2 == null && this.type === 3 ? Pr : e2;
  }
  set maxFeePerBlobGas(e2) {
    this.#x = e2 == null ? null : Ke(e2, "maxFeePerBlobGas");
  }
  get blobVersionedHashes() {
    let e2 = this.#S;
    return e2 == null && this.type === 3 ? [] : e2;
  }
  set blobVersionedHashes(e2) {
    if (e2 != null) {
      z(Array.isArray(e2), "blobVersionedHashes must be an Array", "value", e2), e2 = e2.slice();
      for (let t2 = 0;t2 < e2.length; t2++)
        z(M(e2[t2], 32), "invalid blobVersionedHash", `value[${t2}]`, e2[t2]);
    }
    this.#S = e2;
  }
  get blobs() {
    return this.#E == null ? null : this.#E.map((e2) => Object.assign({}, e2));
  }
  set blobs(e2) {
    if (e2 == null)
      return void (this.#E = null);
    const t2 = [], n2 = [];
    for (let r2 = 0;r2 < e2.length; r2++) {
      const i2 = e2[r2];
      if (W(i2)) {
        O(this.#P, "adding a raw blob requires a KZG library", "UNSUPPORTED_OPERATION", { operation: "set blobs()" });
        let e3 = D(i2);
        if (z(e3.length <= Rr, "blob is too large", `blobs[${r2}]`, i2), e3.length !== Rr) {
          const t3 = new Uint8Array(Rr);
          t3.set(e3), e3 = t3;
        }
        const o2 = this.#P.blobToKzgCommitment(e3), s2 = j(this.#P.computeBlobKzgProof(e3, o2));
        t2.push({ data: j(e3), commitment: j(o2), proof: s2 }), n2.push(Fr(1, o2));
      } else {
        const e3 = j(i2.data), r3 = j(i2.commitment), o2 = j(i2.proof);
        t2.push({ data: e3, commitment: r3, proof: o2 }), n2.push(Fr(1, r3));
      }
    }
    this.#E = t2, this.#S = n2;
  }
  get kzg() {
    return this.#P;
  }
  set kzg(e2) {
    this.#P = e2 == null ? null : function(e3) {
      return { blobToKzgCommitment: (t2) => {
        if ("computeBlobProof" in e3) {
          if ("blobToKzgCommitment" in e3 && typeof e3.blobToKzgCommitment == "function")
            return D(e3.blobToKzgCommitment(j(t2)));
        } else if ("blobToKzgCommitment" in e3 && typeof e3.blobToKzgCommitment == "function")
          return D(e3.blobToKzgCommitment(t2));
        if ("blobToKZGCommitment" in e3 && typeof e3.blobToKZGCommitment == "function")
          return D(e3.blobToKZGCommitment(j(t2)));
        z(false, "unsupported KZG library", "kzg", e3);
      }, computeBlobKzgProof: (t2, n2) => ("computeBlobProof" in e3) && typeof e3.computeBlobProof == "function" ? D(e3.computeBlobProof(j(t2), j(n2))) : ("computeBlobKzgProof" in e3) && typeof e3.computeBlobKzgProof == "function" ? e3.computeBlobKzgProof(t2, n2) : ("computeBlobKZGProof" in e3) && typeof e3.computeBlobKZGProof == "function" ? D(e3.computeBlobKZGProof(j(t2), j(n2))) : void z(false, "unsupported KZG library", "kzg", e3) };
    }(e2);
  }
  get blobWrapperVersion() {
    return this.#I;
  }
  set blobWrapperVersion(e2) {
    this.#I = e2;
  }
  constructor() {
    this.#c = null, this.#d = null, this.#h = 0, this.#p = Pr, this.#f = null, this.#g = null, this.#y = null, this.#u = "0x", this.#m = Pr, this.#b = Pr, this.#w = null, this.#v = null, this.#x = null, this.#S = null, this.#P = null, this.#E = null, this.#k = null, this.#I = null;
  }
  get hash() {
    return this.signature == null ? null : _e(this.#C(true, false));
  }
  get unsignedHash() {
    return _e(this.unsignedSerialized);
  }
  get from() {
    return this.signature == null ? null : (e2 = this.unsignedHash, t2 = this.signature.getCanonical(), Sr(wn.recoverPublicKey(e2, t2)));
    var e2, t2;
  }
  get fromPublicKey() {
    return this.signature == null ? null : wn.recoverPublicKey(this.unsignedHash, this.signature.getCanonical());
  }
  isSigned() {
    return this.signature != null;
  }
  #C(e2, t2) {
    O(!e2 || this.signature != null, "cannot serialize unsigned transaction; maybe you meant .unsignedSerialized", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
    const n2 = e2 ? this.signature : null;
    switch (this.inferType()) {
      case 0:
        return function(e3, t3) {
          const n3 = [Lr(e3.nonce, "nonce"), Lr(e3.gasPrice || 0, "gasPrice"), Lr(e3.gasLimit, "gasLimit"), e3.to || "0x", Lr(e3.value, "value"), e3.data];
          let r2 = Pr;
          if (e3.chainId != Pr)
            r2 = Ke(e3.chainId, "tx.chainId"), z(!t3 || t3.networkV == null || t3.legacyChainId === r2, "tx.chainId/sig.v mismatch", "sig", t3);
          else if (e3.signature) {
            const t4 = e3.signature.legacyChainId;
            t4 != null && (r2 = t4);
          }
          if (!t3)
            return r2 !== Pr && (n3.push(Ze(r2)), n3.push("0x"), n3.push("0x")), On(n3);
          let i2 = BigInt(27 + t3.yParity);
          return r2 !== Pr ? i2 = ct.getChainIdV(r2, t3.v) : BigInt(t3.v) !== i2 && z(false, "tx.chainId/sig.v mismatch", "sig", t3), n3.push(Ze(i2)), n3.push(Ze(t3.r)), n3.push(Ze(t3._s)), On(n3);
        }(this, n2);
      case 1:
        return function(e3, t3) {
          const n3 = [Lr(e3.chainId, "chainId"), Lr(e3.nonce, "nonce"), Lr(e3.gasPrice || 0, "gasPrice"), Lr(e3.gasLimit, "gasLimit"), e3.to || "0x", Lr(e3.value, "value"), e3.data, Dr(e3.accessList || [])];
          return t3 && (n3.push(Lr(t3.yParity, "recoveryParam")), n3.push(Ze(t3.r)), n3.push(Ze(t3.s))), K(["0x01", On(n3)]);
        }(this, n2);
      case 2:
        return function(e3, t3) {
          const n3 = [Lr(e3.chainId, "chainId"), Lr(e3.nonce, "nonce"), Lr(e3.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"), Lr(e3.maxFeePerGas || 0, "maxFeePerGas"), Lr(e3.gasLimit, "gasLimit"), e3.to || "0x", Lr(e3.value, "value"), e3.data, Dr(e3.accessList || [])];
          return t3 && (n3.push(Lr(t3.yParity, "yParity")), n3.push(Ze(t3.r)), n3.push(Ze(t3.s))), K(["0x02", On(n3)]);
        }(this, n2);
      case 3:
        return function(e3, t3, n3) {
          const r2 = [Lr(e3.chainId, "chainId"), Lr(e3.nonce, "nonce"), Lr(e3.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"), Lr(e3.maxFeePerGas || 0, "maxFeePerGas"), Lr(e3.gasLimit, "gasLimit"), e3.to || Jn, Lr(e3.value, "value"), e3.data, Dr(e3.accessList || []), Lr(e3.maxFeePerBlobGas || 0, "maxFeePerBlobGas"), _r(e3.blobVersionedHashes || [], "blobVersionedHashes")];
          if (t3 && (r2.push(Lr(t3.yParity, "yParity")), r2.push(Ze(t3.r)), r2.push(Ze(t3.s)), n3)) {
            if (e3.blobWrapperVersion != null) {
              const t4 = Ze(e3.blobWrapperVersion), i2 = [];
              for (const { proof: e4 } of n3) {
                const t5 = D(e4), n4 = t5.length / Ur;
                for (let e5 = 0;e5 < t5.length; e5 += n4)
                  i2.push(t5.subarray(e5, e5 + n4));
              }
              return K(["0x03", On([r2, t4, n3.map((e4) => e4.data), n3.map((e4) => e4.commitment), i2])]);
            }
            return K(["0x03", On([r2, n3.map((e4) => e4.data), n3.map((e4) => e4.commitment), n3.map((e4) => e4.proof)])]);
          }
          return K(["0x03", On(r2)]);
        }(this, n2, t2 ? this.blobs : null);
      case 4:
        return function(e3, t3) {
          const n3 = [Lr(e3.chainId, "chainId"), Lr(e3.nonce, "nonce"), Lr(e3.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"), Lr(e3.maxFeePerGas || 0, "maxFeePerGas"), Lr(e3.gasLimit, "gasLimit"), e3.to || "0x", Lr(e3.value, "value"), e3.data, Dr(e3.accessList || []), (r2 = e3.authorizationList || [], r2.map((e4) => [Lr(e4.chainId, "chainId"), e4.address, Lr(e4.nonce, "nonce"), Lr(e4.signature.yParity, "yParity"), Ze(e4.signature.r), Ze(e4.signature._s)]))];
          var r2;
          return t3 && (n3.push(Lr(t3.yParity, "yParity")), n3.push(Ze(t3.r)), n3.push(Ze(t3.s))), K(["0x04", On(n3)]);
        }(this, n2);
    }
    O(false, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
  }
  get serialized() {
    return this.#C(true, true);
  }
  get unsignedSerialized() {
    return this.#C(false, false);
  }
  inferType() {
    const e2 = this.inferTypes();
    return e2.indexOf(2) >= 0 ? 2 : e2.pop();
  }
  inferTypes() {
    const e2 = this.gasPrice != null, t2 = this.maxFeePerGas != null || this.maxPriorityFeePerGas != null, n2 = this.accessList != null, r2 = this.#x != null || this.#S;
    this.maxFeePerGas != null && this.maxPriorityFeePerGas != null && O(this.maxFeePerGas >= this.maxPriorityFeePerGas, "priorityFee cannot be more than maxFee", "BAD_DATA", { value: this }), O(!t2 || this.type !== 0 && this.type !== 1, "transaction type cannot have maxFeePerGas or maxPriorityFeePerGas", "BAD_DATA", { value: this }), O(this.type !== 0 || !n2, "legacy transaction cannot have accessList", "BAD_DATA", { value: this });
    const i2 = [];
    return this.type != null ? i2.push(this.type) : this.authorizationList && this.authorizationList.length ? i2.push(4) : t2 ? i2.push(2) : e2 ? (i2.push(1), n2 || i2.push(0)) : n2 ? (i2.push(1), i2.push(2)) : (r2 && this.to || (i2.push(0), i2.push(1), i2.push(2)), i2.push(3)), i2.sort(), i2;
  }
  isLegacy() {
    return this.type === 0;
  }
  isBerlin() {
    return this.type === 1;
  }
  isLondon() {
    return this.type === 2;
  }
  isCancun() {
    return this.type === 3;
  }
  clone() {
    return Wr.from(this);
  }
  toJSON() {
    const e2 = (e3) => e3 == null ? null : e3.toString();
    return { type: this.type, to: this.to, data: this.data, nonce: this.nonce, gasLimit: e2(this.gasLimit), gasPrice: e2(this.gasPrice), maxPriorityFeePerGas: e2(this.maxPriorityFeePerGas), maxFeePerGas: e2(this.maxFeePerGas), value: e2(this.value), chainId: e2(this.chainId), sig: this.signature ? this.signature.toJSON() : null, accessList: this.accessList };
  }
  [Tr]() {
    return this.toString();
  }
  toString() {
    const e2 = [], t2 = (t3) => {
      let n3 = this[t3];
      typeof n3 == "string" && (n3 = JSON.stringify(n3)), e2.push(`${t3}: ${n3}`);
    };
    this.type && t2("type"), t2("to"), t2("data"), t2("nonce"), t2("gasLimit"), t2("value"), this.chainId != null && t2("chainId"), this.signature && (t2("from"), e2.push(`signature: ${this.signature.toString()}`));
    const n2 = this.authorizationList;
    if (n2) {
      const t3 = [];
      for (const e3 of n2) {
        const n3 = [];
        n3.push(`address: ${JSON.stringify(e3.address)}`), e3.nonce != null && n3.push(`nonce: ${e3.nonce}`), e3.chainId != null && n3.push(`chainId: ${e3.chainId}`), e3.signature && n3.push(`signature: ${e3.signature.toString()}`), t3.push(`Authorization { ${n3.join(", ")} }`);
      }
      e2.push(`authorizations: [ ${t3.join(", ")} ]`);
    }
    return `Transaction { ${e2.join(", ")} }`;
  }
  static from(e2) {
    if (e2 == null)
      return new Wr;
    if (typeof e2 == "string") {
      const t3 = D(e2);
      if (t3[0] >= 127)
        return Wr.from(function(e3) {
          const t4 = wr(e3);
          z(Array.isArray(t4) && (t4.length === 9 || t4.length === 6), "invalid field count for legacy transaction", "data", e3);
          const n2 = { type: 0, nonce: $r(t4[0], "nonce"), gasPrice: Br(t4[1], "gasPrice"), gasLimit: Br(t4[2], "gasLimit"), to: Or(t4[3]), value: Br(t4[4], "value"), data: j(t4[5]), chainId: Pr };
          if (t4.length === 6)
            return n2;
          const r2 = Br(t4[6], "v"), i2 = Br(t4[7], "r"), o2 = Br(t4[8], "s");
          if (i2 === Pr && o2 === Pr)
            n2.chainId = r2;
          else {
            let e4 = (r2 - Cr) / Er;
            e4 < Pr && (e4 = Pr), n2.chainId = e4, z(e4 !== Pr || r2 === kr || r2 === Ir, "non-canonical legacy v", "v", t4[6]), n2.signature = ct.from({ r: q(t4[7], 32), s: q(t4[8], 32), v: r2 });
          }
          return n2;
        }(t3));
      switch (t3[0]) {
        case 1:
          return Wr.from(function(e3) {
            const t4 = wr(D(e3).slice(1));
            z(Array.isArray(t4) && (t4.length === 8 || t4.length === 11), "invalid field count for transaction type: 1", "data", j(e3));
            const n2 = { type: 1, chainId: Br(t4[0], "chainId"), nonce: $r(t4[1], "nonce"), gasPrice: Br(t4[2], "gasPrice"), gasLimit: Br(t4[3], "gasLimit"), to: Or(t4[4]), value: Br(t4[5], "value"), data: j(t4[6]), accessList: zr(t4[7], "accessList") };
            return t4.length === 8 || Mr(n2, t4.slice(8)), n2;
          }(t3));
        case 2:
          return Wr.from(function(e3) {
            const t4 = wr(D(e3).slice(1));
            z(Array.isArray(t4) && (t4.length === 9 || t4.length === 12), "invalid field count for transaction type: 2", "data", j(e3));
            const n2 = { type: 2, chainId: Br(t4[0], "chainId"), nonce: $r(t4[1], "nonce"), maxPriorityFeePerGas: Br(t4[2], "maxPriorityFeePerGas"), maxFeePerGas: Br(t4[3], "maxFeePerGas"), gasPrice: null, gasLimit: Br(t4[4], "gasLimit"), to: Or(t4[5]), value: Br(t4[6], "value"), data: j(t4[7]), accessList: zr(t4[8], "accessList") };
            return t4.length === 9 || Mr(n2, t4.slice(9)), n2;
          }(t3));
        case 3:
          return Wr.from(function(e3) {
            let t4 = wr(D(e3).slice(1)), n2 = "3", r2 = null, i2 = null;
            if (t4.length === 4 && Array.isArray(t4[0])) {
              n2 = "3 (network format)";
              const e4 = t4[1], r3 = t4[2], o3 = t4[3];
              z(Array.isArray(e4), "invalid network format: blobs not an array", "fields[1]", e4), z(Array.isArray(r3), "invalid network format: commitments not an array", "fields[2]", r3), z(Array.isArray(o3), "invalid network format: proofs not an array", "fields[3]", o3), z(e4.length === r3.length, "invalid network format: blobs/commitments length mismatch", "fields", t4), z(e4.length === o3.length, "invalid network format: blobs/proofs length mismatch", "fields", t4), i2 = [];
              for (let n3 = 0;n3 < t4[1].length; n3++)
                i2.push({ data: e4[n3], commitment: r3[n3], proof: o3[n3] });
              t4 = t4[0];
            } else if (t4.length === 5 && Array.isArray(t4[0])) {
              n2 = "3 (EIP-7594 network format)", r2 = Ye(t4[1]);
              const e4 = t4[2], o3 = t4[3], s2 = t4[4];
              z(r2 === 1, `unsupported EIP-7594 network format version: ${r2}`, "fields[1]", r2), z(Array.isArray(e4), "invalid EIP-7594 network format: blobs not an array", "fields[2]", e4), z(Array.isArray(o3), "invalid EIP-7594 network format: commitments not an array", "fields[3]", o3), z(Array.isArray(s2), "invalid EIP-7594 network format: proofs not an array", "fields[4]", s2), z(e4.length === o3.length, "invalid network format: blobs/commitments length mismatch", "fields", t4), z(e4.length * Ur === s2.length, "invalid network format: blobs/proofs length mismatch", "fields", t4), i2 = [];
              for (let t5 = 0;t5 < e4.length; t5++) {
                const n3 = [];
                for (let e5 = 0;e5 < Ur; e5++)
                  n3.push(s2[t5 * Ur + e5]);
                i2.push({ data: e4[t5], commitment: o3[t5], proof: K(n3) });
              }
              t4 = t4[0];
            }
            z(Array.isArray(t4) && (t4.length === 11 || t4.length === 14), `invalid field count for transaction type: ${n2}`, "data", j(e3));
            const o2 = { type: 3, chainId: Br(t4[0], "chainId"), nonce: $r(t4[1], "nonce"), maxPriorityFeePerGas: Br(t4[2], "maxPriorityFeePerGas"), maxFeePerGas: Br(t4[3], "maxFeePerGas"), gasPrice: null, gasLimit: Br(t4[4], "gasLimit"), to: Or(t4[5]), value: Br(t4[6], "value"), data: j(t4[7]), accessList: zr(t4[8], "accessList"), maxFeePerBlobGas: Br(t4[9], "maxFeePerBlobGas"), blobVersionedHashes: t4[10], blobWrapperVersion: r2 };
            i2 && (o2.blobs = i2), z(o2.to != null, `invalid address for transaction type: ${n2}`, "data", e3), z(Array.isArray(o2.blobVersionedHashes), "invalid blobVersionedHashes: must be an array", "data", e3);
            for (let t5 = 0;t5 < o2.blobVersionedHashes.length; t5++)
              z(M(o2.blobVersionedHashes[t5], 32), `invalid blobVersionedHash at index ${t5}: must be length 32`, "data", e3);
            return t4.length === 11 || Mr(o2, t4.slice(11)), o2;
          }(t3));
        case 4:
          return Wr.from(function(e3) {
            const t4 = wr(D(e3).slice(1));
            z(Array.isArray(t4) && (t4.length === 10 || t4.length === 13), "invalid field count for transaction type: 4", "data", j(e3));
            const n2 = { type: 4, chainId: Br(t4[0], "chainId"), nonce: $r(t4[1], "nonce"), maxPriorityFeePerGas: Br(t4[2], "maxPriorityFeePerGas"), maxFeePerGas: Br(t4[3], "maxFeePerGas"), gasPrice: null, gasLimit: Br(t4[4], "gasLimit"), to: Or(t4[5]), value: Br(t4[6], "value"), data: j(t4[7]), accessList: zr(t4[8], "accessList"), authorizationList: Nr(t4[9], "authorizationList") };
            return t4.length === 10 || Mr(n2, t4.slice(10)), n2;
          }(t3));
      }
      O(false, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: "from" });
    }
    const t2 = new Wr;
    return e2.type != null && (t2.type = e2.type), e2.to != null && (t2.to = e2.to), e2.nonce != null && (t2.nonce = e2.nonce), e2.gasLimit != null && (t2.gasLimit = e2.gasLimit), e2.gasPrice != null && (t2.gasPrice = e2.gasPrice), e2.maxPriorityFeePerGas != null && (t2.maxPriorityFeePerGas = e2.maxPriorityFeePerGas), e2.maxFeePerGas != null && (t2.maxFeePerGas = e2.maxFeePerGas), e2.maxFeePerBlobGas != null && (t2.maxFeePerBlobGas = e2.maxFeePerBlobGas), e2.data != null && (t2.data = e2.data), e2.value != null && (t2.value = e2.value), e2.chainId != null && (t2.chainId = e2.chainId), e2.signature != null && (t2.signature = ct.from(e2.signature)), e2.accessList != null && (t2.accessList = e2.accessList), e2.authorizationList != null && (t2.authorizationList = e2.authorizationList), e2.blobVersionedHashes != null && (t2.blobVersionedHashes = e2.blobVersionedHashes), e2.kzg != null && (t2.kzg = e2.kzg), e2.blobWrapperVersion != null && (t2.blobWrapperVersion = e2.blobWrapperVersion), e2.blobs != null && (t2.blobs = e2.blobs), e2.hash != null && (z(t2.isSigned(), "unsigned transaction cannot define '.hash'", "tx", e2), z(t2.hash === e2.hash, "hash mismatch", "tx", e2)), e2.from != null && (z(t2.isSigned(), "unsigned transaction cannot define '.from'", "tx", e2), z(t2.from.toLowerCase() === (e2.from || "").toLowerCase(), "from mismatch", "tx", e2)), t2;
  }
}
function Hr(e2) {
  const t2 = {};
  e2.to && (t2.to = e2.to), e2.from && (t2.from = e2.from), e2.data && (t2.data = j(e2.data));
  const n2 = "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);
  for (const r3 of n2)
    r3 in e2 && e2[r3] != null && (t2[r3] = Ke(e2[r3], `request.${r3}`));
  const r2 = "type,nonce".split(/,/);
  for (const n3 of r2)
    n3 in e2 && e2[n3] != null && (t2[n3] = Ye(e2[n3], `request.${n3}`));
  return e2.accessList && (t2.accessList = xr(e2.accessList)), e2.authorizationList && (t2.authorizationList = e2.authorizationList.slice()), "blockTag" in e2 && (t2.blockTag = e2.blockTag), "enableCcipRead" in e2 && (t2.enableCcipRead = !!e2.enableCcipRead), "customData" in e2 && (t2.customData = e2.customData), "blobVersionedHashes" in e2 && e2.blobVersionedHashes && (t2.blobVersionedHashes = e2.blobVersionedHashes.slice()), "kzg" in e2 && (t2.kzg = e2.kzg), "blobWrapperVersion" in e2 && (t2.blobWrapperVersion = e2.blobWrapperVersion), "blobs" in e2 && e2.blobs && (t2.blobs = e2.blobs.map((e3) => W(e3) ? j(e3) : Object.assign({}, e3))), t2;
}
function jr(e2, t2) {
  if (e2.provider)
    return e2.provider;
  O(false, "missing provider", "UNSUPPORTED_OPERATION", { operation: t2 });
}
async function Kr(e2, t2) {
  let n2 = Hr(t2);
  if (n2.to != null && (n2.to = Cn(n2.to, e2)), n2.from != null) {
    const t3 = n2.from;
    n2.from = Promise.all([e2.getAddress(), Cn(t3, e2)]).then(([e3, t4]) => (z(e3.toLowerCase() === t4.toLowerCase(), "transaction from mismatch", "tx.from", t4), e3));
  } else
    n2.from = e2.getAddress();
  return await R(n2);
}
BigInt(0);

class Gr {
  provider;
  constructor(e2) {
    U(this, { provider: e2 || null });
  }
  async getNonce(e2) {
    return jr(this, "getTransactionCount").getTransactionCount(await this.getAddress(), e2);
  }
  async populateCall(e2) {
    return await Kr(this, e2);
  }
  async populateTransaction(e2) {
    const t2 = jr(this, "populateTransaction"), n2 = await Kr(this, e2);
    n2.nonce == null && (n2.nonce = await this.getNonce("pending")), n2.gasLimit == null && (n2.gasLimit = await this.estimateGas(n2));
    const r2 = await this.provider.getNetwork();
    n2.chainId != null ? z(Ke(n2.chainId) === r2.chainId, "transaction chainId mismatch", "tx.chainId", e2.chainId) : n2.chainId = r2.chainId;
    const i2 = n2.maxFeePerGas != null || n2.maxPriorityFeePerGas != null;
    if (n2.gasPrice == null || n2.type !== 2 && !i2 ? n2.type !== 0 && n2.type !== 1 || !i2 || z(false, "pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "tx", e2) : z(false, "eip-1559 transaction do not support gasPrice", "tx", e2), n2.type !== 2 && n2.type != null || n2.maxFeePerGas == null || n2.maxPriorityFeePerGas == null)
      if (n2.type === 0 || n2.type === 1) {
        const e3 = await t2.getFeeData();
        O(e3.gasPrice != null, "network does not support gasPrice", "UNSUPPORTED_OPERATION", { operation: "getGasPrice" }), n2.gasPrice == null && (n2.gasPrice = e3.gasPrice);
      } else {
        const e3 = await t2.getFeeData();
        if (n2.type == null)
          if (e3.maxFeePerGas != null && e3.maxPriorityFeePerGas != null)
            if (n2.authorizationList && n2.authorizationList.length ? n2.type = 4 : n2.type = 2, n2.gasPrice != null) {
              const e4 = n2.gasPrice;
              delete n2.gasPrice, n2.maxFeePerGas = e4, n2.maxPriorityFeePerGas = e4;
            } else
              n2.maxFeePerGas == null && (n2.maxFeePerGas = e3.maxFeePerGas), n2.maxPriorityFeePerGas == null && (n2.maxPriorityFeePerGas = e3.maxPriorityFeePerGas);
          else
            e3.gasPrice != null ? (O(!i2, "network does not support EIP-1559", "UNSUPPORTED_OPERATION", { operation: "populateTransaction" }), n2.gasPrice == null && (n2.gasPrice = e3.gasPrice), n2.type = 0) : O(false, "failed to get consistent fee data", "UNSUPPORTED_OPERATION", { operation: "signer.getFeeData" });
        else
          n2.type !== 2 && n2.type !== 3 && n2.type !== 4 || (n2.maxFeePerGas == null && (n2.maxFeePerGas = e3.maxFeePerGas), n2.maxPriorityFeePerGas == null && (n2.maxPriorityFeePerGas = e3.maxPriorityFeePerGas));
      }
    else
      n2.type = 2;
    return await R(n2);
  }
  async populateAuthorization(e2) {
    const t2 = Object.assign({}, e2);
    return t2.chainId == null && (t2.chainId = (await jr(this, "getNetwork").getNetwork()).chainId), t2.nonce == null && (t2.nonce = await this.getNonce()), t2;
  }
  async estimateGas(e2) {
    return jr(this, "estimateGas").estimateGas(await this.populateCall(e2));
  }
  async call(e2) {
    return jr(this, "call").call(await this.populateCall(e2));
  }
  async resolveName(e2) {
    const t2 = jr(this, "resolveName");
    return await t2.resolveName(e2);
  }
  async sendTransaction(e2) {
    const t2 = jr(this, "sendTransaction"), n2 = await this.populateTransaction(e2);
    delete n2.from;
    const r2 = Wr.from(n2);
    return await t2.broadcastTransaction(await this.signTransaction(r2));
  }
  authorize(e2) {
    O(false, "authorization not implemented for this signer", "UNSUPPORTED_OPERATION", { operation: "authorize" });
  }
}

class Vr extends Gr {
  address;
  constructor(e2, t2) {
    super(t2), U(this, { address: e2 });
  }
  async getAddress() {
    return this.address;
  }
  connect(e2) {
    return new Vr(this.address, e2);
  }
  #A(e2, t2) {
    O(false, `VoidSigner cannot sign ${e2}`, "UNSUPPORTED_OPERATION", { operation: t2 });
  }
  async signTransaction(e2) {
    this.#A("transactions", "signTransaction");
  }
  async signMessage(e2) {
    this.#A("messages", "signMessage");
  }
  async signTypedData(e2, t2, n2) {
    this.#A("typed-data", "signTypedData");
  }
}

class qr extends Gr {
  address;
  #T;
  constructor(e2, t2) {
    super(t2), z(e2 && typeof e2.sign == "function", "invalid private key", "privateKey", "[ REDACTED ]"), this.#T = e2, U(this, { address: Sr(this.signingKey.publicKey) });
  }
  get signingKey() {
    return this.#T;
  }
  get privateKey() {
    return this.signingKey.privateKey;
  }
  async getAddress() {
    return this.address;
  }
  connect(e2) {
    return new qr(this.#T, e2);
  }
  async signTransaction(e2) {
    e2 = Hr(e2);
    const { to: t2, from: n2 } = await R({ to: e2.to ? Cn(e2.to, this) : undefined, from: e2.from ? Cn(e2.from, this) : undefined });
    t2 != null && (e2.to = t2), n2 != null && (e2.from = n2), e2.from != null && (z(kn(e2.from) === this.address, "transaction from address mismatch", "tx.from", e2.from), delete e2.from);
    const r2 = Wr.from(e2);
    return r2.signature = this.signingKey.sign(r2.unsignedHash), r2.serialized;
  }
  async signMessage(e2) {
    return this.signMessageSync(e2);
  }
  signMessageSync(e2) {
    return this.signingKey.sign(function(e3) {
      return typeof e3 == "string" && (e3 = Tn(e3)), _e(K([Tn(`\x19Ethereum Signed Message:
`), Tn(String(e3.length)), e3]));
    }(e2)).serialized;
  }
  authorizeSync(e2) {
    z(typeof e2.address == "string", "invalid address for authorizeSync", "auth.address", e2);
    const t2 = this.signingKey.sign(function(e3) {
      return z(typeof e3.address == "string", "invalid address for hashAuthorization", "auth.address", e3), _e(K(["0x05", On([e3.chainId != null ? Ze(e3.chainId) : "0x", kn(e3.address), e3.nonce != null ? Ze(e3.nonce) : "0x"])]));
    }(e2));
    return Object.assign({}, { address: kn(e2.address), nonce: Ke(e2.nonce || 0), chainId: Ke(e2.chainId || 0) }, { signature: t2 });
  }
  async authorize(e2) {
    return e2 = Object.assign({}, e2, { address: await Cn(e2.address, this) }), this.authorizeSync(await this.populateAuthorization(e2));
  }
  async signTypedData(e2, t2, n2) {
    const r2 = await Yn.resolveNames(e2, t2, n2, async (e3) => {
      O(this.provider != null, "cannot resolve ENS names without a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName", info: { name: e3 } });
      const t3 = await this.provider.resolveName(e3);
      return O(t3 != null, "unconfigured ENS name", "UNCONFIGURED_NAME", { value: e3 }), t3;
    });
    return this.signingKey.sign(Yn.hash(r2.domain, t2, r2.value)).serialized;
  }
}
var Yr = false;
var Jr = function(e2, t2, n2) {
  return function(e3, t3) {
    const n3 = { sha256: mt, sha512: rr }[e3];
    return z(n3 != null, "invalid hmac algorithm", "algorithm", e3), Qt.create(n3, t3);
  }(e2, t2).update(n2).digest();
};
var Zr = Jr;
function Xr(e2, t2, n2) {
  const r2 = D(t2, "key"), i2 = D(n2, "data");
  return j(Zr(e2, r2, i2));
}
Xr._ = Jr, Xr.lock = function() {
  Yr = true;
}, Xr.register = function(e2) {
  if (Yr)
    throw new Error("computeHmac is locked");
  Zr = e2;
}, Object.freeze(Xr);
var Qr = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
var ei = Uint8Array.from({ length: 16 }, (e2, t2) => t2);
var ti = [ei];
var ni = [ei.map((e2) => (9 * e2 + 5) % 16)];
for (let e2 = 0;e2 < 4; e2++)
  for (let t2 of [ti, ni])
    t2.push(t2[e2].map((e3) => Qr[e3]));
var ri = [[11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8], [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7], [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9], [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6], [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]].map((e2) => new Uint8Array(e2));
var ii = ti.map((e2, t2) => e2.map((e3) => ri[t2][e3]));
var oi = ni.map((e2, t2) => e2.map((e3) => ri[t2][e3]));
var si = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]);
var ai = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]);
var li = (e2, t2) => e2 << t2 | e2 >>> 32 - t2;
function ci(e2, t2, n2, r2) {
  return e2 === 0 ? t2 ^ n2 ^ r2 : e2 === 1 ? t2 & n2 | ~t2 & r2 : e2 === 2 ? (t2 | ~n2) ^ r2 : e2 === 3 ? t2 & r2 | n2 & ~r2 : t2 ^ (n2 | ~r2);
}
var di = new Uint32Array(16);

class ui extends dt {
  constructor() {
    super(64, 20, 8, true), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
  }
  get() {
    const { h0: e2, h1: t2, h2: n2, h3: r2, h4: i2 } = this;
    return [e2, t2, n2, r2, i2];
  }
  set(e2, t2, n2, r2, i2) {
    this.h0 = 0 | e2, this.h1 = 0 | t2, this.h2 = 0 | n2, this.h3 = 0 | r2, this.h4 = 0 | i2;
  }
  process(e2, t2) {
    for (let n3 = 0;n3 < 16; n3++, t2 += 4)
      di[n3] = e2.getUint32(t2, true);
    let n2 = 0 | this.h0, r2 = n2, i2 = 0 | this.h1, o2 = i2, s2 = 0 | this.h2, a2 = s2, l2 = 0 | this.h3, c2 = l2, d2 = 0 | this.h4, u2 = d2;
    for (let e3 = 0;e3 < 5; e3++) {
      const t3 = 4 - e3, h2 = si[e3], p2 = ai[e3], f2 = ti[e3], g2 = ni[e3], y2 = ii[e3], m2 = oi[e3];
      for (let t4 = 0;t4 < 16; t4++) {
        const r3 = li(n2 + ci(e3, i2, s2, l2) + di[f2[t4]] + h2, y2[t4]) + d2 | 0;
        n2 = d2, d2 = l2, l2 = 0 | li(s2, 10), s2 = i2, i2 = r3;
      }
      for (let e4 = 0;e4 < 16; e4++) {
        const n3 = li(r2 + ci(t3, o2, a2, c2) + di[g2[e4]] + p2, m2[e4]) + u2 | 0;
        r2 = u2, u2 = c2, c2 = 0 | li(a2, 10), a2 = o2, o2 = n3;
      }
    }
    this.set(this.h1 + s2 + c2 | 0, this.h2 + l2 + u2 | 0, this.h3 + d2 + r2 | 0, this.h4 + n2 + o2 | 0, this.h0 + i2 + a2 | 0);
  }
  roundClean() {
    di.fill(0);
  }
  destroy() {
    this.destroyed = true, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
var hi = ve(() => new ui);
var pi = false;
var fi = function(e2) {
  return hi(e2);
};
var gi = fi;
function yi(e2) {
  const t2 = D(e2, "data");
  return j(gi(t2));
}
yi._ = fi, yi.lock = function() {
  pi = true;
}, yi.register = function(e2) {
  if (pi)
    throw new TypeError("ripemd160 is locked");
  gi = e2;
}, Object.freeze(yi);
var mi = false;
var bi = function(e2) {
  return new Uint8Array(function(e3) {
    O(or != null, "platform does not support secure random numbers", "UNSUPPORTED_OPERATION", { operation: "randomBytes" }), z(Number.isInteger(e3) && e3 > 0 && e3 <= 1024, "invalid length", "length", e3);
    const t2 = new Uint8Array(e3);
    return or.getRandomValues(t2), t2;
  }(e2));
};
var wi = bi;
function vi(e2) {
  return wi(e2);
}
vi._ = bi, vi.lock = function() {
  mi = true;
}, vi.register = function(e2) {
  if (mi)
    throw new Error("randomBytes is locked");
  wi = e2;
}, Object.freeze(vi);
var xi = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var Si = null;
function Pi(e2) {
  if (Si == null) {
    Si = {};
    for (let e3 = 0;e3 < 58; e3++)
      Si[xi[e3]] = BigInt(e3);
  }
  const t2 = Si[e2];
  return z(t2 != null, "invalid base58 value", "letter", e2), t2;
}
var Ei = BigInt(0);
var ki = BigInt(58);
var Ii = /^[a-z]*$/i;
function Ci(e2, t2) {
  let n2 = 97;
  return e2.reduce((e3, r2) => (r2 === t2 ? n2++ : r2.match(Ii) ? e3.push(String.fromCharCode(n2) + r2) : (n2 = 97, e3.push(r2)), e3), []);
}

class Ai {
  locale;
  constructor(e2) {
    U(this, { locale: e2 });
  }
  split(e2) {
    return e2.toLowerCase().split(/\s+/g);
  }
  join(e2) {
    return e2.join(" ");
  }
}

class Ti extends Ai {
  #u;
  #R;
  constructor(e2, t2, n2) {
    super(e2), this.#u = t2, this.#R = n2, this.#U = null;
  }
  get _data() {
    return this.#u;
  }
  _decodeWords() {
    return z((e2 = this.#u)[0] === "0", "unsupported auwl data", "data", e2), function(e3, t2) {
      for (let n3 = 28;n3 >= 0; n3--)
        e3 = e3.split(" !#$%&'()*+,-./<=>?@[]^_`{|}~"[n3]).join(t2.substring(2 * n3, 2 * n3 + 2));
      const n2 = [], r2 = e3.replace(/(:|([0-9])|([A-Z][a-z]*))/g, (e4, t3, r3, i2) => {
        if (r3)
          for (let e5 = parseInt(r3);e5 >= 0; e5--)
            n2.push(";");
        else
          n2.push(t3.toLowerCase());
        return "";
      });
      if (r2)
        throw new Error(`leftovers: ${JSON.stringify(r2)}`);
      return Ci(Ci(n2, ";"), ":");
    }(e2.substring(59), e2.substring(1, 59));
    var e2;
  }
  #U;
  #F() {
    if (this.#U == null) {
      const e2 = this._decodeWords();
      if (zn(e2.join(`
`) + `
`) !== this.#R)
        throw new Error(`BIP39 Wordlist for ${this.locale} FAILED`);
      this.#U = e2;
    }
    return this.#U;
  }
  getWord(e2) {
    const t2 = this.#F();
    return z(e2 >= 0 && e2 < t2.length, `invalid word index: ${e2}`, "index", e2), t2[e2];
  }
  getWordIndex(e2) {
    return this.#F().indexOf(e2);
  }
}
var Ri = null;

class Ui extends Ti {
  constructor() {
    super("en", "0erleonalorenseinceregesticitStanvetearctssi#ch2Athck&tneLl0And#Il.yLeOutO=S|S%b/ra@SurdU'0Ce[Cid|CountCu'Hie=IdOu,-Qui*Ro[TT]T%T*[Tu$0AptDD-tD*[Ju,M.UltV<)Vi)0Rob-0FairF%dRaid0A(EEntRee0Ead0MRRp%tS!_rmBumCoholErtI&LLeyLowMo,O}PhaReadySoT Ways0A>urAz(gOngOuntU'd0Aly,Ch%Ci|G G!GryIm$K!Noun)Nu$O` Sw T&naTiqueXietyY1ArtOlogyPe?P!Pro=Ril1ChCt-EaEnaGueMMedM%MyOundR<+Re,Ri=RowTTefa@Ti,Tw%k0KPe@SaultSetSi,SumeThma0H!>OmTa{T&dT.udeTra@0Ct]D.Gu,NtTh%ToTumn0Era+OcadoOid0AkeA*AyEsomeFulKw?d0Is:ByChel%C#D+GL<)Lc#y~MbooN<aNn RRelyRga(R*lSeS-SketTt!3A^AnAutyCau'ComeEfF%eG(Ha=H(dLie=LowLtN^Nef./TrayTt Twe&Y#d3Cyc!DKeNdOlogyRdR`Tt _{AdeAmeAnketA,EakE[IndOodO[omOu'UeUrUsh_rdAtDyIlMbNeNusOkO,Rd R(gRrowSsTtomUn)XY_{etA(AndA[A=EadEezeI{Id+IefIghtIngIskOccoliOk&OnzeOomO` OwnUsh2Bb!DdyD+tFf$oIldLbLkL!tNd!Nk Rd&Rg R,SS(e[SyTt Y Zz:Bba+B(B!CtusGeKe~LmM aMpNN$N)lNdyNn#NoeNvasNy#Pab!P.$Pta(RRb#RdRgoRpetRryRtSeShS(o/!Su$TT$ogT^Teg%yTt!UghtU'Ut]Ve3Il(gL yM|NsusNturyRe$Rta(_irAlkAmp]An+AosApt Ar+A'AtEapE{Ee'EfErryE,I{&IefIldIm}yOi)Oo'R#-U{!UnkUrn0G?Nnam#Rc!Tiz&TyVil_imApArifyAwAyE<ErkEv I{I|IffImbIn-IpO{OgO'O`OudOwnUbUmpU, Ut^_^A,C#utDeFfeeIlInL!@L%LumnMb(eMeMf%tM-Mm#Mp<yNc tNdu@NfirmNg*[N}@Nsid NtrolNv()OkOlPp PyR$ReRnR*@/Tt#U^UntryUp!Ur'Us(V Yo>_{Ad!AftAmA}AshAt AwlAzyEamEd.EekEwI{etImeIspIt-OpO[Ou^OwdUci$UelUi'Umb!Un^UshYY,$2BeLtu*PPbo?dRiousRr|Rta(R=Sh]/omTe3C!:DMa+MpN)Ng R(gShUght WnY3AlBa>BrisCadeCemb CideCl(eC%a>C*a'ErF&'F(eFyG*eLayLiv M<dMi'Ni$Nti,NyP?tP&dPos.P`PutyRi=ScribeS tSignSkSpair/royTailTe@VelopVi)Vo>3AgramAlAm#dAryCeE'lEtFf G.$Gn.yLemmaNn NosaurRe@RtSag*eScov Sea'ShSmi[S%d Splay/<)V tVideV%)Zzy5Ct%Cum|G~Lph(Ma(Na>NkeyN%OrSeUb!Ve_ftAg#AmaA,-AwEamE[IftIllInkIpI=OpUmY2CkMbNeR(g/T^Ty1Arf1Nam-:G G!RlyRnR`Sily/Sy1HoOlogyOnomy0GeItUca>1F%t0G1GhtTh 2BowD E@r-Eg<tEm|Eph<tEvat%I>Se0B?kBodyBra)Er+Ot]PloyPow Pty0Ab!A@DD![D%'EmyErgyF%)Ga+G(eH<)JoyLi,OughR-hRollSu*T Ti*TryVelope1Isode0U$Uip0AA'OdeOs]R%Upt0CapeSayS&)Ta>0Ern$H-s1Id&)IlOkeOl=1A@Amp!Ce[Ch<+C.eCludeCu'Ecu>Erci'Hau,Hib.I!I,ItOt-P<dPe@Pi*Pla(Po'P*[T&dTra0EEbrow:Br-CeCultyDeIntI`~L'MeMilyMousNNcyNtasyRmSh]TT$Th TigueUltV%.e3Atu*Bru?yD $EEdElMa!N)/iv$T^V W3B Ct]EldGu*LeLmLt N$NdNeNg NishReRmR,Sc$ShTT}[X_gAmeAshAtAv%EeIghtIpOatO{O%Ow UidUshY_mCusGIlLd~owOdOtR)Re,R+tRkRtu}RumRw?dSsil/ UndX_gi!AmeEqu|EshI&dIn+OgOntO,OwnOz&U.2ElNNnyRna)RyTu*:D+tInLaxy~ yMePRa+Rba+Rd&Rl-Rm|SSpTeTh U+Ze3N $NiusN*Nt!Nu(e/u*2O,0AntFtGg!Ng RaffeRlVe_dAn)A*A[IdeImp'ObeOomOryO=OwUe_tDde[LdOdO'RillaSpelSsipV nWn_bA)A(AntApeA[Av.yEatE&IdIefItOc yOupOwUnt_rdE[IdeIltIt?N3M:B.IrLfMm M, NdPpyRb%RdRshR=,TVeWkZ?d3AdAl`ArtAvyD+hogIght~oLmetLpNRo3Dd&Gh~NtPRe/%y5BbyCkeyLdLeLiday~owMeNeyOdPeRnRr%R'Sp.$/TelUrV 5BGeM<Mb!M%Nd*dNgryNtRd!RryRtSb<d3Brid:1EOn0EaEntifyLe2N%e4LLeg$L}[0A+Ita>M&'Mu}Pa@Po'Pro=Pul'0ChCludeComeC*a'DexD-a>Do%Du,ryF<tFl-tF%mHa!H .Iti$Je@JuryMa>N Noc|PutQuiryS<eSe@SideSpi*/$lTa@T e,ToVe,V.eVol=3On0L<dOla>Sue0Em1Ory:CketGu?RZz3AlousAns~yWel9BInKeUr}yY5D+I)MpNg!Ni%Nk/:Ng?oo3EnEpT^upY3CkDD}yNdNgdomSsTT^&TeTt&Wi4EeIfeO{Ow:BBelB%Dd DyKeMpNgua+PtopR+T T(UghUndryVaWWnWsu.Y Zy3Ad AfArnA=Ctu*FtGG$G&dIsu*M#NdNg`NsOp?dSs#Tt Vel3ArB tyBr?yC&'FeFtGhtKeMbM.NkOnQuid/Tt!VeZ?d5AdAnB, C$CkG-NelyNgOpTt yUdUn+VeY$5CkyGga+Mb N?N^Xury3R-s:Ch(eDG-G}tIdIlInJ%KeMm$NNa+Nda>NgoNs]Nu$P!Rb!R^Rg(R(eRketRria+SkSs/ T^T i$ThTrixTt XimumZe3AdowAnAsu*AtCh<-D$DiaLodyLtMb M%yNt]NuRcyR+R.RryShSsa+T$Thod3Dd!DnightLk~]M-NdNimumN%Nu>Rac!Rr%S ySs/akeXXedXtu*5Bi!DelDifyMM|N.%NkeyN, N`OnR$ReRn(gSqu.oTh T]T%Unta(U'VeVie5ChFf(LeLtiplySc!SeumShroomS-/Tu$3Self/ yTh:I=MePk(Rrow/yT]Tu*3ArCkEdGati=G!@I` PhewR=/TTw%kUtr$V WsXt3CeGht5B!I'M(eeOd!Rm$R`SeTab!TeTh(gTi)VelW5C!?Mb R'T:K0EyJe@Li+Scu*S =Ta(Vious0CurE<Tob 0Or1FF Fi)T&2L1Ay0DI=Ymp-0It0CeEI#L(eLy1EnEraIn]Po'T]1An+B.Ch?dD D(?yG<I|Ig($Ph<0Tr-h0H 0Tdo%T TputTside0AlEnEr0NN 0Yg&0/ 0O}:CtDd!GeIrLa)LmNdaNelN-N` P RadeR|RkRrotRtySsT^ThTi|TrolTt nU'VeYm|3A)AnutArAs<tL-<NN$tyNcilOp!Pp Rfe@Rm.Rs#T2O}OtoRa'Ys-$0AnoCn-Ctu*E)GGe#~LotNkO} Pe/olT^Zza_)A}tA,-A>AyEa'Ed+U{UgUn+2EmEtIntL?LeLi)NdNyOlPul?Rt]S.]Ssib!/TatoTt yV tyWd W _@i)Ai'Ed-tEf Epa*Es|EttyEv|I)IdeIm?yIntI%.yIs#Iva>IzeOb!mO)[Odu)Of.OgramOje@Omo>OofOp tyOsp O>@OudOvide2Bl-Dd(g~LpL'Mpk(N^PilPpyR^a'R.yRpo'R'ShTZz!3Ramid:99Al.yAntumArt E,]I{ItIzO>:Bb.Cco#CeCkD?DioIlInI'~yMpN^NdomN+PidReTeTh V&WZ%3AdyAlAs#BelBuildC$lCei=CipeC%dCyc!Du)F!@F%mFu'G]G*tGul?Je@LaxLea'LiefLyMa(Memb M(dMo=Nd NewNtOp&PairPeatPla)P%tQui*ScueSemb!Si,Sour)Sp#'SultTi*T*atTurnUn]Ve$ViewW?d2Y`m0BBb#CeChDeD+F!GhtGidNgOtPp!SkTu$V$V 5AdA,BotBu,CketM<)OfOkieOmSeTa>UghUndU>Y$5Bb DeGLeNNwayR$:DDd!D}[FeIlLadLm#L#LtLu>MeMp!NdTisfyToshiU)Usa+VeY1A!AnA*Att E}HemeHoolI&)I[%sOrp]OutRapRe&RiptRub1AAr^As#AtC#dC*tCt]Cur.yEdEkGm|Le@~M(?Ni%N'Nt&)RiesRvi)Ss]Tt!TupV&_dowAftAllowA*EdEllEriffIeldIftI}IpIv O{OeOotOpOrtOuld O=RimpRugUff!Y0Bl(gCkDeE+GhtGnL|Lk~yLv Mil?Mp!N)NgR&/ Tua>XZe1A>Et^IIllInIrtUll0AbAmEepEnd I)IdeIghtImOg<OtOwUsh0AllArtI!OkeOo`0A{AkeApIffOw0ApCc Ci$CkDaFtL?Ldi LidLut]L=Me#eNgOnRryRtUlUndUpUr)U`0A)A*Ati$AwnEakEci$EedEllEndH eI)Id IkeInIr.L.OilOns%O#OrtOtRayReadR(gY0Ua*UeezeUir*l_b!AdiumAffA+AirsAmpAndArtA>AyEakEelEmEpE*oI{IllIngO{Oma^O}OolOryO=Ra>gyReetRikeR#gRugg!Ud|UffUmb!Y!0Bje@Bm.BwayC)[ChDd&Ff G?G+,ItMm NNnyN'tP PplyP*meReRfa)R+Rpri'RroundR=ySpe@/a(1AllowAmpApArmE?EetIftImIngIt^Ord1MbolMptomRup/em:B!Ck!GIlL|LkNkPeR+tSk/eTtooXi3A^Am~NN<tNnisNtRm/Xt_nkAtEmeEnE%yE*EyIngIsOughtReeRi=RowUmbUnd 0CketDeG LtMb MeNyPRedSsueT!5A,BaccoDayDdl EGe` I!tK&MatoM%rowNeNgueNightOlO`PP-Pp!R^RnadoRtoi'SsT$Uri,W?dW WnY_{AdeAff-Ag-A(Ansf ApAshA=lAyEatEeEndI$IbeI{Igg ImIpOphyOub!U{UeUlyUmpetU,U`Y2BeIt]Mb!NaN}lRkeyRnRt!1El=EntyI)InI,O1PeP-$:5Ly5B*lla0Ab!Awa*C!Cov D DoFairFoldHappyIf%mIqueItIv 'KnownLo{TilUsu$Veil1Da>GradeHoldOnP Set1B<Ge0A+EEdEfulE![U$0Il.y:C<tCuumGueLidL!yL=NNishP%Rious/Ult3H-!L=tNd%Ntu*NueRbRifyRs]RyS'lT <3Ab!Br<tCiousCt%yDeoEw~a+Nta+Ol(Rtu$RusSaS.Su$T$Vid5C$I)IdLc<oLumeTeYa+:GeG#ItLk~LnutNtRfa*RmRri%ShSp/eT VeY3Al`Ap#ArA'lA` BDd(gEk&dIrdLcome/T_!AtEatEelEnE*IpIsp 0DeD`FeLd~NNdowNeNgNkNn Nt ReSdomSeShT}[5LfM<Nd OdOlRdRkRldRryR`_pE{E,!I,I>Ong::Rd3Ar~ow9UUngU`:3BraRo9NeO", "0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60");
  }
  static wordlist() {
    return Ri == null && (Ri = new Ui), Ri;
  }
}
var Fi = false;
var Oi = function(e2, t2, n2, r2, i2) {
  return function(e3, t3, n3, r3, i3) {
    const o2 = { sha256: mt, sha512: rr }[i3];
    return z(o2 != null, "invalid pbkdf2 algorithm", "algorithm", i3), Zn(o2, e3, t3, { c: n3, dkLen: r3 });
  }(e2, t2, n2, r2, i2);
};
var zi = Oi;
function Ni(e2, t2, n2, r2, i2) {
  const o2 = D(e2, "password"), s2 = D(t2, "salt");
  return j(zi(o2, s2, n2, r2, i2));
}
function $i(e2) {
  return (1 << e2) - 1 << 8 - e2 & 255;
}
function Bi(e2) {
  return (1 << e2) - 1 & 255;
}
function Li(e2, t2) {
  $("NFKD"), t2 == null && (t2 = Ui.wordlist());
  const n2 = t2.split(e2);
  z(n2.length % 3 == 0 && n2.length >= 12 && n2.length <= 24, "invalid mnemonic length", "mnemonic", "[ REDACTED ]");
  const r2 = new Uint8Array(Math.ceil(11 * n2.length / 8));
  let i2 = 0;
  for (let e3 = 0;e3 < n2.length; e3++) {
    let o3 = t2.getWordIndex(n2[e3].normalize("NFKD"));
    z(o3 >= 0, `invalid mnemonic word at index ${e3}`, "mnemonic", "[ REDACTED ]");
    for (let e4 = 0;e4 < 11; e4++)
      o3 & 1 << 10 - e4 && (r2[i2 >> 3] |= 1 << 7 - i2 % 8), i2++;
  }
  const o2 = 32 * n2.length / 3, s2 = $i(n2.length / 3);
  return z((D(pr(r2.slice(0, o2 / 8)))[0] & s2) === (r2[r2.length - 1] & s2), "invalid mnemonic checksum", "mnemonic", "[ REDACTED ]"), j(r2.slice(0, o2 / 8));
}
function Di(e2, t2) {
  z(e2.length % 4 == 0 && e2.length >= 16 && e2.length <= 32, "invalid entropy size", "entropy", "[ REDACTED ]"), t2 == null && (t2 = Ui.wordlist());
  const n2 = [0];
  let r2 = 11;
  for (let t3 = 0;t3 < e2.length; t3++)
    r2 > 8 ? (n2[n2.length - 1] <<= 8, n2[n2.length - 1] |= e2[t3], r2 -= 8) : (n2[n2.length - 1] <<= r2, n2[n2.length - 1] |= e2[t3] >> 8 - r2, n2.push(e2[t3] & Bi(8 - r2)), r2 += 3);
  const i2 = e2.length / 4, o2 = parseInt(pr(e2).substring(2, 4), 16) & $i(i2);
  return n2[n2.length - 1] <<= i2, n2[n2.length - 1] |= o2 >> 8 - i2, t2.join(n2.map((e3) => t2.getWord(e3)));
}
Ni._ = Oi, Ni.lock = function() {
  Fi = true;
}, Ni.register = function(e2) {
  if (Fi)
    throw new Error("pbkdf2 is locked");
  zi = e2;
}, Object.freeze(Ni);
var _i = {};

class Mi {
  phrase;
  password;
  wordlist;
  entropy;
  constructor(e2, t2, n2, r2, i2) {
    r2 == null && (r2 = ""), i2 == null && (i2 = Ui.wordlist()), B(e2, _i, "Mnemonic"), U(this, { phrase: n2, password: r2, wordlist: i2, entropy: t2 });
  }
  computeSeed() {
    const e2 = Tn("mnemonic" + this.password, "NFKD");
    return Ni(Tn(this.phrase, "NFKD"), e2, 2048, 64, "sha512");
  }
  static fromPhrase(e2, t2, n2) {
    const r2 = Li(e2, n2);
    return e2 = Di(D(r2), n2), new Mi(_i, r2, e2, t2, n2);
  }
  static fromEntropy(e2, t2, n2) {
    const r2 = D(e2, "entropy"), i2 = Di(r2, n2);
    return new Mi(_i, j(r2), i2, t2, n2);
  }
  static entropyToPhrase(e2, t2) {
    return Di(D(e2, "entropy"), t2);
  }
  static phraseToEntropy(e2, t2) {
    return Li(e2, t2);
  }
  static isValidMnemonic(e2, t2) {
    try {
      return Li(e2, t2), true;
    } catch (e3) {}
    return false;
  }
}
var Wi;
var Hi;
var ji;
var Ki = function(e2, t2, n2, r2) {
  if (n2 === "a" && !r2)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t2 == "function" ? e2 !== t2 || !r2 : !t2.has(e2))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n2 === "m" ? r2 : n2 === "a" ? r2.call(e2) : r2 ? r2.value : t2.get(e2);
};
var Gi = function(e2, t2, n2, r2, i2) {
  if (r2 === "m")
    throw new TypeError("Private method is not writable");
  if (r2 === "a" && !i2)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof t2 == "function" ? e2 !== t2 || !i2 : !t2.has(e2))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r2 === "a" ? i2.call(e2, n2) : i2 ? i2.value = n2 : t2.set(e2, n2), n2;
};
var Vi = { 16: 10, 24: 12, 32: 14 };
var qi = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145];
var Yi = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
var Ji = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125];
var Zi = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986];
var Xi = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766];
var Qi = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126];
var eo = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436];
var to = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890];
var no = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935];
var ro = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239000, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600];
var io = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998000, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480];
var oo = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795];
var so = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855];
var ao = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239000, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150];
var lo = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998000, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925];
function co(e2) {
  const t2 = [];
  for (let n2 = 0;n2 < e2.length; n2 += 4)
    t2.push(e2[n2] << 24 | e2[n2 + 1] << 16 | e2[n2 + 2] << 8 | e2[n2 + 3]);
  return t2;
}

class uo {
  get key() {
    return Ki(this, Wi, "f").slice();
  }
  constructor(e2) {
    if (Wi.set(this, undefined), Hi.set(this, undefined), ji.set(this, undefined), !(this instanceof uo))
      throw Error("AES must be instanitated with `new`");
    Gi(this, Wi, new Uint8Array(e2), "f");
    const t2 = Vi[this.key.length];
    if (t2 == null)
      throw new TypeError("invalid key size (must be 16, 24 or 32 bytes)");
    Gi(this, ji, [], "f"), Gi(this, Hi, [], "f");
    for (let e3 = 0;e3 <= t2; e3++)
      Ki(this, ji, "f").push([0, 0, 0, 0]), Ki(this, Hi, "f").push([0, 0, 0, 0]);
    const n2 = 4 * (t2 + 1), r2 = this.key.length / 4, i2 = co(this.key);
    let o2;
    for (let e3 = 0;e3 < r2; e3++)
      o2 = e3 >> 2, Ki(this, ji, "f")[o2][e3 % 4] = i2[e3], Ki(this, Hi, "f")[t2 - o2][e3 % 4] = i2[e3];
    let s2, a2 = 0, l2 = r2;
    for (;l2 < n2; ) {
      if (s2 = i2[r2 - 1], i2[0] ^= Yi[s2 >> 16 & 255] << 24 ^ Yi[s2 >> 8 & 255] << 16 ^ Yi[255 & s2] << 8 ^ Yi[s2 >> 24 & 255] ^ qi[a2] << 24, a2 += 1, r2 != 8)
        for (let e4 = 1;e4 < r2; e4++)
          i2[e4] ^= i2[e4 - 1];
      else {
        for (let e4 = 1;e4 < r2 / 2; e4++)
          i2[e4] ^= i2[e4 - 1];
        s2 = i2[r2 / 2 - 1], i2[r2 / 2] ^= Yi[255 & s2] ^ Yi[s2 >> 8 & 255] << 8 ^ Yi[s2 >> 16 & 255] << 16 ^ Yi[s2 >> 24 & 255] << 24;
        for (let e4 = r2 / 2 + 1;e4 < r2; e4++)
          i2[e4] ^= i2[e4 - 1];
      }
      let e3, o3, c2 = 0;
      for (;c2 < r2 && l2 < n2; )
        e3 = l2 >> 2, o3 = l2 % 4, Ki(this, ji, "f")[e3][o3] = i2[c2], Ki(this, Hi, "f")[t2 - e3][o3] = i2[c2++], l2++;
    }
    for (let e3 = 1;e3 < t2; e3++)
      for (let t3 = 0;t3 < 4; t3++)
        s2 = Ki(this, Hi, "f")[e3][t3], Ki(this, Hi, "f")[e3][t3] = oo[s2 >> 24 & 255] ^ so[s2 >> 16 & 255] ^ ao[s2 >> 8 & 255] ^ lo[255 & s2];
  }
  encrypt(e2) {
    if (e2.length != 16)
      throw new TypeError("invalid plaintext size (must be 16 bytes)");
    const t2 = Ki(this, ji, "f").length - 1, n2 = [0, 0, 0, 0];
    let r2 = co(e2);
    for (let e3 = 0;e3 < 4; e3++)
      r2[e3] ^= Ki(this, ji, "f")[0][e3];
    for (let e3 = 1;e3 < t2; e3++) {
      for (let t3 = 0;t3 < 4; t3++)
        n2[t3] = Zi[r2[t3] >> 24 & 255] ^ Xi[r2[(t3 + 1) % 4] >> 16 & 255] ^ Qi[r2[(t3 + 2) % 4] >> 8 & 255] ^ eo[255 & r2[(t3 + 3) % 4]] ^ Ki(this, ji, "f")[e3][t3];
      r2 = n2.slice();
    }
    const i2 = new Uint8Array(16);
    let o2 = 0;
    for (let e3 = 0;e3 < 4; e3++)
      o2 = Ki(this, ji, "f")[t2][e3], i2[4 * e3] = 255 & (Yi[r2[e3] >> 24 & 255] ^ o2 >> 24), i2[4 * e3 + 1] = 255 & (Yi[r2[(e3 + 1) % 4] >> 16 & 255] ^ o2 >> 16), i2[4 * e3 + 2] = 255 & (Yi[r2[(e3 + 2) % 4] >> 8 & 255] ^ o2 >> 8), i2[4 * e3 + 3] = 255 & (Yi[255 & r2[(e3 + 3) % 4]] ^ o2);
    return i2;
  }
  decrypt(e2) {
    if (e2.length != 16)
      throw new TypeError("invalid ciphertext size (must be 16 bytes)");
    const t2 = Ki(this, Hi, "f").length - 1, n2 = [0, 0, 0, 0];
    let r2 = co(e2);
    for (let e3 = 0;e3 < 4; e3++)
      r2[e3] ^= Ki(this, Hi, "f")[0][e3];
    for (let e3 = 1;e3 < t2; e3++) {
      for (let t3 = 0;t3 < 4; t3++)
        n2[t3] = to[r2[t3] >> 24 & 255] ^ no[r2[(t3 + 3) % 4] >> 16 & 255] ^ ro[r2[(t3 + 2) % 4] >> 8 & 255] ^ io[255 & r2[(t3 + 1) % 4]] ^ Ki(this, Hi, "f")[e3][t3];
      r2 = n2.slice();
    }
    const i2 = new Uint8Array(16);
    let o2 = 0;
    for (let e3 = 0;e3 < 4; e3++)
      o2 = Ki(this, Hi, "f")[t2][e3], i2[4 * e3] = 255 & (Ji[r2[e3] >> 24 & 255] ^ o2 >> 24), i2[4 * e3 + 1] = 255 & (Ji[r2[(e3 + 3) % 4] >> 16 & 255] ^ o2 >> 16), i2[4 * e3 + 2] = 255 & (Ji[r2[(e3 + 2) % 4] >> 8 & 255] ^ o2 >> 8), i2[4 * e3 + 3] = 255 & (Ji[255 & r2[(e3 + 1) % 4]] ^ o2);
    return i2;
  }
}
Wi = new WeakMap, Hi = new WeakMap, ji = new WeakMap;

class ho {
  constructor(e2, t2, n2) {
    if (n2 && !(this instanceof n2))
      throw new Error(`${e2} must be instantiated with "new"`);
    Object.defineProperties(this, { aes: { enumerable: true, value: new uo(t2) }, name: { enumerable: true, value: e2 } });
  }
}
var po;
var fo;
var go = function(e2, t2, n2, r2, i2) {
  if (r2 === "m")
    throw new TypeError("Private method is not writable");
  if (r2 === "a" && !i2)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof t2 == "function" ? e2 !== t2 || !i2 : !t2.has(e2))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r2 === "a" ? i2.call(e2, n2) : i2 ? i2.value = n2 : t2.set(e2, n2), n2;
};
var yo = function(e2, t2, n2, r2) {
  if (n2 === "a" && !r2)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t2 == "function" ? e2 !== t2 || !r2 : !t2.has(e2))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n2 === "m" ? r2 : n2 === "a" ? r2.call(e2) : r2 ? r2.value : t2.get(e2);
};

class mo extends ho {
  constructor(e2, t2) {
    if (super("ECC", e2, mo), po.set(this, undefined), fo.set(this, undefined), t2) {
      if (t2.length % 16)
        throw new TypeError("invalid iv size (must be 16 bytes)");
      go(this, po, new Uint8Array(t2), "f");
    } else
      go(this, po, new Uint8Array(16), "f");
    go(this, fo, this.iv, "f");
  }
  get iv() {
    return new Uint8Array(yo(this, po, "f"));
  }
  encrypt(e2) {
    if (e2.length % 16)
      throw new TypeError("invalid plaintext size (must be multiple of 16 bytes)");
    const t2 = new Uint8Array(e2.length);
    for (let n2 = 0;n2 < e2.length; n2 += 16) {
      for (let t3 = 0;t3 < 16; t3++)
        yo(this, fo, "f")[t3] ^= e2[n2 + t3];
      go(this, fo, this.aes.encrypt(yo(this, fo, "f")), "f"), t2.set(yo(this, fo, "f"), n2);
    }
    return t2;
  }
  decrypt(e2) {
    if (e2.length % 16)
      throw new TypeError("invalid ciphertext size (must be multiple of 16 bytes)");
    const t2 = new Uint8Array(e2.length);
    for (let n2 = 0;n2 < e2.length; n2 += 16) {
      const r2 = this.aes.decrypt(e2.subarray(n2, n2 + 16));
      for (let i2 = 0;i2 < 16; i2++)
        t2[n2 + i2] = r2[i2] ^ yo(this, fo, "f")[i2], yo(this, fo, "f")[i2] = e2[n2 + i2];
    }
    return t2;
  }
}
po = new WeakMap, fo = new WeakMap;
new WeakMap, new WeakMap, new WeakSet;
var bo;
var wo;
var vo;
var xo = function(e2, t2, n2, r2, i2) {
  if (r2 === "m")
    throw new TypeError("Private method is not writable");
  if (r2 === "a" && !i2)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof t2 == "function" ? e2 !== t2 || !i2 : !t2.has(e2))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r2 === "a" ? i2.call(e2, n2) : i2 ? i2.value = n2 : t2.set(e2, n2), n2;
};
var So = function(e2, t2, n2, r2) {
  if (n2 === "a" && !r2)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t2 == "function" ? e2 !== t2 || !r2 : !t2.has(e2))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n2 === "m" ? r2 : n2 === "a" ? r2.call(e2) : r2 ? r2.value : t2.get(e2);
};

class Po extends ho {
  constructor(e2, t2) {
    super("CTR", e2, Po), bo.set(this, undefined), wo.set(this, undefined), vo.set(this, undefined), xo(this, vo, new Uint8Array(16), "f"), So(this, vo, "f").fill(0), xo(this, bo, So(this, vo, "f"), "f"), xo(this, wo, 16, "f"), t2 == null && (t2 = 1), typeof t2 == "number" ? this.setCounterValue(t2) : this.setCounterBytes(t2);
  }
  get counter() {
    return new Uint8Array(So(this, vo, "f"));
  }
  setCounterValue(e2) {
    if (!Number.isInteger(e2) || e2 < 0 || e2 > Number.MAX_SAFE_INTEGER)
      throw new TypeError("invalid counter initial integer value");
    for (let t2 = 15;t2 >= 0; --t2)
      So(this, vo, "f")[t2] = e2 % 256, e2 = Math.floor(e2 / 256);
  }
  setCounterBytes(e2) {
    if (e2.length !== 16)
      throw new TypeError("invalid counter initial Uint8Array value length");
    So(this, vo, "f").set(e2);
  }
  increment() {
    for (let e2 = 15;e2 >= 0; e2--) {
      if (So(this, vo, "f")[e2] !== 255) {
        So(this, vo, "f")[e2]++;
        break;
      }
      So(this, vo, "f")[e2] = 0;
    }
  }
  encrypt(e2) {
    var t2, n2;
    const r2 = new Uint8Array(e2);
    for (let e3 = 0;e3 < r2.length; e3++)
      So(this, wo, "f") === 16 && (xo(this, bo, this.aes.encrypt(So(this, vo, "f")), "f"), xo(this, wo, 0, "f"), this.increment()), r2[e3] ^= So(this, bo, "f")[xo(this, wo, (n2 = So(this, wo, "f"), t2 = n2++, n2), "f"), t2];
    return r2;
  }
  decrypt(e2) {
    return this.encrypt(e2);
  }
}
bo = new WeakMap, wo = new WeakMap, vo = new WeakMap, new WeakMap, new WeakMap, new WeakMap;
var Eo = (e2, t2) => e2 << t2 | e2 >>> 32 - t2;
function ko(e2, t2, n2, r2, i2, o2) {
  let s2 = e2[t2++] ^ n2[r2++], a2 = e2[t2++] ^ n2[r2++], l2 = e2[t2++] ^ n2[r2++], c2 = e2[t2++] ^ n2[r2++], d2 = e2[t2++] ^ n2[r2++], u2 = e2[t2++] ^ n2[r2++], h2 = e2[t2++] ^ n2[r2++], p2 = e2[t2++] ^ n2[r2++], f2 = e2[t2++] ^ n2[r2++], g2 = e2[t2++] ^ n2[r2++], y2 = e2[t2++] ^ n2[r2++], m2 = e2[t2++] ^ n2[r2++], b2 = e2[t2++] ^ n2[r2++], w2 = e2[t2++] ^ n2[r2++], v = e2[t2++] ^ n2[r2++], x2 = e2[t2++] ^ n2[r2++], S2 = s2, P2 = a2, E2 = l2, k2 = c2, I2 = d2, C2 = u2, A2 = h2, T2 = p2, R2 = f2, U2 = g2, F2 = y2, O2 = m2, z2 = b2, N2 = w2, $2 = v, B2 = x2;
  for (let e3 = 0;e3 < 8; e3 += 2)
    I2 ^= Eo(S2 + z2 | 0, 7), R2 ^= Eo(I2 + S2 | 0, 9), z2 ^= Eo(R2 + I2 | 0, 13), S2 ^= Eo(z2 + R2 | 0, 18), U2 ^= Eo(C2 + P2 | 0, 7), N2 ^= Eo(U2 + C2 | 0, 9), P2 ^= Eo(N2 + U2 | 0, 13), C2 ^= Eo(P2 + N2 | 0, 18), $2 ^= Eo(F2 + A2 | 0, 7), E2 ^= Eo($2 + F2 | 0, 9), A2 ^= Eo(E2 + $2 | 0, 13), F2 ^= Eo(A2 + E2 | 0, 18), k2 ^= Eo(B2 + O2 | 0, 7), T2 ^= Eo(k2 + B2 | 0, 9), O2 ^= Eo(T2 + k2 | 0, 13), B2 ^= Eo(O2 + T2 | 0, 18), P2 ^= Eo(S2 + k2 | 0, 7), E2 ^= Eo(P2 + S2 | 0, 9), k2 ^= Eo(E2 + P2 | 0, 13), S2 ^= Eo(k2 + E2 | 0, 18), A2 ^= Eo(C2 + I2 | 0, 7), T2 ^= Eo(A2 + C2 | 0, 9), I2 ^= Eo(T2 + A2 | 0, 13), C2 ^= Eo(I2 + T2 | 0, 18), O2 ^= Eo(F2 + U2 | 0, 7), R2 ^= Eo(O2 + F2 | 0, 9), U2 ^= Eo(R2 + O2 | 0, 13), F2 ^= Eo(U2 + R2 | 0, 18), z2 ^= Eo(B2 + $2 | 0, 7), N2 ^= Eo(z2 + B2 | 0, 9), $2 ^= Eo(N2 + z2 | 0, 13), B2 ^= Eo($2 + N2 | 0, 18);
  i2[o2++] = s2 + S2 | 0, i2[o2++] = a2 + P2 | 0, i2[o2++] = l2 + E2 | 0, i2[o2++] = c2 + k2 | 0, i2[o2++] = d2 + I2 | 0, i2[o2++] = u2 + C2 | 0, i2[o2++] = h2 + A2 | 0, i2[o2++] = p2 + T2 | 0, i2[o2++] = f2 + R2 | 0, i2[o2++] = g2 + U2 | 0, i2[o2++] = y2 + F2 | 0, i2[o2++] = m2 + O2 | 0, i2[o2++] = b2 + z2 | 0, i2[o2++] = w2 + N2 | 0, i2[o2++] = v + $2 | 0, i2[o2++] = x2 + B2 | 0;
}
function Io(e2, t2, n2, r2, i2) {
  let o2 = r2 + 0, s2 = r2 + 16 * i2;
  for (let r3 = 0;r3 < 16; r3++)
    n2[s2 + r3] = e2[t2 + 16 * (2 * i2 - 1) + r3];
  for (let r3 = 0;r3 < i2; r3++, o2 += 16, t2 += 16)
    ko(n2, s2, e2, t2, n2, o2), r3 > 0 && (s2 += 16), ko(n2, o2, e2, t2 += 16, n2, s2);
}
function Co(e2, t2, n2) {
  const r2 = we({ dkLen: 32, asyncTick: 10, maxmem: 1073742848 }, n2), { N: i2, r: o2, p: s2, dkLen: a2, asyncTick: l2, maxmem: c2, onProgress: d2 } = r2;
  if (Y(i2), Y(o2), Y(s2), Y(a2), Y(l2), Y(c2), d2 !== undefined && typeof d2 != "function")
    throw new Error("progressCb should be function");
  const u2 = 128 * o2, h2 = u2 / 4;
  if (i2 <= 1 || i2 & i2 - 1 || i2 >= 2 ** (u2 / 8) || i2 > 4294967296)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (s2 < 0 || s2 > 137438953440 / u2)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (a2 < 0 || a2 > 137438953440)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const p2 = u2 * (i2 + s2);
  if (p2 > c2)
    throw new Error(`Scrypt: parameters too large, ${p2} (128 * r * (N + p)) > ${c2} (maxmem)`);
  const f2 = Zn(mt, e2, t2, { c: 1, dkLen: u2 * s2 }), g2 = ue(f2), y2 = ue(new Uint8Array(u2 * i2)), m2 = ue(new Uint8Array(u2));
  let b2 = () => {};
  if (d2) {
    const e3 = 2 * i2 * s2, t3 = Math.max(Math.floor(e3 / 1e4), 1);
    let n3 = 0;
    b2 = () => {
      n3++, !d2 || n3 % t3 && n3 !== e3 || d2(n3 / e3);
    };
  }
  return { N: i2, r: o2, p: s2, dkLen: a2, blockSize32: h2, V: y2, B32: g2, B: f2, tmp: m2, blockMixCb: b2, asyncTick: l2 };
}
function Ao(e2, t2, n2, r2, i2) {
  const o2 = Zn(mt, e2, n2, { c: 1, dkLen: t2 });
  return n2.fill(0), r2.fill(0), i2.fill(0), o2;
}
var To = false;
var Ro = false;
var Uo = async function(e2, t2, n2, r2, i2, o2, s2) {
  return await async function(e3, t3, n3) {
    const { N: r3, r: i3, p: o3, dkLen: s3, blockSize32: a2, V: l2, B32: c2, B: d2, tmp: u2, blockMixCb: h2, asyncTick: p2 } = Co(e3, t3, n3);
    for (let e4 = 0;e4 < o3; e4++) {
      const t4 = a2 * e4;
      for (let e5 = 0;e5 < a2; e5++)
        l2[e5] = c2[t4 + e5];
      let n4 = 0;
      await ge(r3 - 1, p2, () => {
        Io(l2, n4, l2, n4 += a2, i3), h2();
      }), Io(l2, (r3 - 1) * a2, c2, t4, i3), h2(), await ge(r3, p2, () => {
        const e5 = c2[t4 + a2 - 16] % r3;
        for (let n5 = 0;n5 < a2; n5++)
          u2[n5] = c2[t4 + n5] ^ l2[e5 * a2 + n5];
        Io(u2, 0, c2, t4, i3), h2();
      });
    }
    return Ao(e3, s3, d2, l2, u2);
  }(e2, t2, { N: n2, r: r2, p: i2, dkLen: o2, onProgress: s2 });
};
var Fo = function(e2, t2, n2, r2, i2, o2) {
  return function(e3, t3, n3) {
    const { N: r3, r: i3, p: o3, dkLen: s2, blockSize32: a2, V: l2, B32: c2, B: d2, tmp: u2, blockMixCb: h2 } = Co(e3, t3, n3);
    for (let e4 = 0;e4 < o3; e4++) {
      const t4 = a2 * e4;
      for (let e5 = 0;e5 < a2; e5++)
        l2[e5] = c2[t4 + e5];
      for (let e5 = 0, t5 = 0;e5 < r3 - 1; e5++)
        Io(l2, t5, l2, t5 += a2, i3), h2();
      Io(l2, (r3 - 1) * a2, c2, t4, i3), h2();
      for (let e5 = 0;e5 < r3; e5++) {
        const e6 = c2[t4 + a2 - 16] % r3;
        for (let n4 = 0;n4 < a2; n4++)
          u2[n4] = c2[t4 + n4] ^ l2[e6 * a2 + n4];
        Io(u2, 0, c2, t4, i3), h2();
      }
    }
    return Ao(e3, s2, d2, l2, u2);
  }(e2, t2, { N: n2, r: r2, p: i2, dkLen: o2 });
};
var Oo = Uo;
var zo = Fo;
async function No(e2, t2, n2, r2, i2, o2, s2) {
  const a2 = D(e2, "passwd"), l2 = D(t2, "salt");
  return j(await Oo(a2, l2, n2, r2, i2, o2, s2));
}
function $o(e2, t2, n2, r2, i2, o2) {
  const s2 = D(e2, "passwd"), a2 = D(t2, "salt");
  return j(zo(s2, a2, n2, r2, i2, o2));
}
function Bo(e2) {
  const t2 = D(e2, "randomBytes");
  t2[6] = 15 & t2[6] | 64, t2[8] = 63 & t2[8] | 128;
  const n2 = j(t2);
  return [n2.substring(2, 10), n2.substring(10, 14), n2.substring(14, 18), n2.substring(18, 22), n2.substring(22, 34)].join("-");
}
function Lo(e2) {
  return typeof e2 != "string" || e2.startsWith("0x") || (e2 = "0x" + e2), _(e2);
}
function Do(e2, t2) {
  for (e2 = String(e2);e2.length < t2; )
    e2 = "0" + e2;
  return e2;
}
function _o(e2) {
  return typeof e2 == "string" ? Tn(e2, "NFKC") : _(e2);
}
function Mo(e2, t2) {
  const n2 = t2.match(/^([a-z0-9$_.-]*)(:([a-z]+))?(!)?$/i);
  z(n2 != null, "invalid path", "path", t2);
  const r2 = n2[1], i2 = n2[3], o2 = n2[4] === "!";
  let s2 = e2;
  for (const e3 of r2.toLowerCase().split(".")) {
    if (Array.isArray(s2)) {
      if (!e3.match(/^[0-9]+$/))
        break;
      s2 = s2[parseInt(e3)];
    } else if (typeof s2 == "object") {
      let t3 = null;
      for (const n3 in s2)
        if (n3.toLowerCase() === e3) {
          t3 = s2[n3];
          break;
        }
      s2 = t3;
    } else
      s2 = null;
    if (s2 == null)
      break;
  }
  if (z(!o2 || s2 != null, "missing required value", "path", r2), i2 && s2 != null) {
    if (i2 === "int") {
      if (typeof s2 == "string" && s2.match(/^-?[0-9]+$/))
        return parseInt(s2);
      if (Number.isSafeInteger(s2))
        return s2;
    }
    if (i2 === "number" && typeof s2 == "string" && s2.match(/^-?[0-9.]*$/))
      return parseFloat(s2);
    if (i2 === "data" && typeof s2 == "string")
      return Lo(s2);
    if (i2 === "array" && Array.isArray(s2))
      return s2;
    if (i2 === typeof s2)
      return s2;
    z(false, `wrong type found for ${i2} `, "path", r2);
  }
  return s2;
}
No._ = Uo, No.lock = function() {
  Ro = true;
}, No.register = function(e2) {
  if (Ro)
    throw new Error("scrypt is locked");
  Oo = e2;
}, Object.freeze(No), $o._ = Fo, $o.lock = function() {
  To = true;
}, $o.register = function(e2) {
  if (To)
    throw new Error("scryptSync is locked");
  zo = e2;
}, Object.freeze($o);
var Wo = "m/44'/60'/0'/0/0";
function Ho(e2) {
  try {
    const t2 = JSON.parse(e2);
    if ((t2.version != null ? parseInt(t2.version) : 0) === 3)
      return true;
  } catch (e3) {}
  return false;
}
function jo(e2, t2) {
  const n2 = D(t2), r2 = Mo(e2, "crypto.ciphertext:data!");
  z(j(_e(K([n2.slice(16, 32), r2]))).substring(2) === Mo(e2, "crypto.mac:string!").toLowerCase(), "incorrect password", "password", "[ REDACTED ]");
  const i2 = function(e3, t3, n3) {
    if (Mo(e3, "crypto.cipher:string") === "aes-128-ctr") {
      const r3 = Mo(e3, "crypto.cipherparams.iv:data!");
      return j(new Po(t3, r3).decrypt(n3));
    }
    O(false, "unsupported cipher", "UNSUPPORTED_OPERATION", { operation: "decrypt" });
  }(e2, n2.slice(0, 16), r2), o2 = Sr(i2);
  if (e2.address) {
    let t3 = e2.address.toLowerCase();
    t3.startsWith("0x") || (t3 = "0x" + t3), z(kn(t3) === o2, "keystore address/privateKey mismatch", "address", e2.address);
  }
  const s2 = { address: o2, privateKey: i2 };
  if (Mo(e2, "x-ethers.version:string") === "0.1") {
    const t3 = n2.slice(32, 64), r3 = Mo(e2, "x-ethers.mnemonicCiphertext:data!"), i3 = Mo(e2, "x-ethers.mnemonicCounter:data!"), o3 = new Po(t3, i3);
    s2.mnemonic = { path: Mo(e2, "x-ethers.path:string") || Wo, locale: Mo(e2, "x-ethers.locale:string") || "en", entropy: j(D(o3.decrypt(r3))) };
  }
  return s2;
}
function Ko(e2) {
  const t2 = Mo(e2, "crypto.kdf:string");
  if (t2 && typeof t2 == "string") {
    if (t2.toLowerCase() === "scrypt") {
      const n2 = Mo(e2, "crypto.kdfparams.salt:data!"), r2 = Mo(e2, "crypto.kdfparams.n:int!"), i2 = Mo(e2, "crypto.kdfparams.r:int!"), o2 = Mo(e2, "crypto.kdfparams.p:int!");
      z(r2 > 0 && !(r2 & r2 - 1), "invalid kdf.N", "kdf.N", r2), z(i2 > 0 && o2 > 0, "invalid kdf", "kdf", t2);
      const s2 = Mo(e2, "crypto.kdfparams.dklen:int!");
      return z(s2 === 32, "invalid kdf.dklen", "kdf.dflen", s2), { name: "scrypt", salt: n2, N: r2, r: i2, p: o2, dkLen: 64 };
    }
    if (t2.toLowerCase() === "pbkdf2") {
      const t3 = Mo(e2, "crypto.kdfparams.salt:data!"), n2 = Mo(e2, "crypto.kdfparams.prf:string!"), r2 = n2.split("-").pop();
      z(r2 === "sha256" || r2 === "sha512", "invalid kdf.pdf", "kdf.pdf", n2);
      const i2 = Mo(e2, "crypto.kdfparams.c:int!"), o2 = Mo(e2, "crypto.kdfparams.dklen:int!");
      return z(o2 === 32, "invalid kdf.dklen", "kdf.dklen", o2), { name: "pbkdf2", salt: t3, count: i2, dkLen: o2, algorithm: r2 };
    }
  }
  z(false, "unsupported key-derivation function", "kdf", t2);
}
function Go(e2) {
  return new Promise((t2) => {
    setTimeout(() => {
      t2();
    }, e2);
  });
}
function Vo(e2) {
  const t2 = e2.salt != null ? D(e2.salt, "options.salt") : vi(32);
  let n2 = 131072, r2 = 8, i2 = 1;
  return e2.scrypt && (e2.scrypt.N && (n2 = e2.scrypt.N), e2.scrypt.r && (r2 = e2.scrypt.r), e2.scrypt.p && (i2 = e2.scrypt.p)), z(typeof n2 == "number" && n2 > 0 && Number.isSafeInteger(n2) && (BigInt(n2) & BigInt(n2 - 1)) === BigInt(0), "invalid scrypt N parameter", "options.N", n2), z(typeof r2 == "number" && r2 > 0 && Number.isSafeInteger(r2), "invalid scrypt r parameter", "options.r", r2), z(typeof i2 == "number" && i2 > 0 && Number.isSafeInteger(i2), "invalid scrypt p parameter", "options.p", i2), { name: "scrypt", dkLen: 32, salt: t2, N: n2, r: r2, p: i2 };
}
function qo(e2, t2, n2, r2) {
  const i2 = D(n2.privateKey, "privateKey"), o2 = r2.iv != null ? D(r2.iv, "options.iv") : vi(16);
  z(o2.length === 16, "invalid options.iv length", "options.iv", r2.iv);
  const s2 = r2.uuid != null ? D(r2.uuid, "options.uuid") : vi(16);
  z(s2.length === 16, "invalid options.uuid length", "options.uuid", r2.iv);
  const a2 = e2.slice(0, 16), l2 = e2.slice(16, 32), c2 = D(new Po(a2, o2).encrypt(i2)), d2 = _e(K([l2, c2])), u2 = { address: n2.address.substring(2).toLowerCase(), id: Bo(s2), version: 3, Crypto: { cipher: "aes-128-ctr", cipherparams: { iv: j(o2).substring(2) }, ciphertext: j(c2).substring(2), kdf: "scrypt", kdfparams: { salt: j(t2.salt).substring(2), n: t2.N, dklen: 32, p: t2.p, r: t2.r }, mac: d2.substring(2) } };
  if (n2.mnemonic) {
    const t3 = r2.client != null ? r2.client : `ethers/${A}`, i3 = n2.mnemonic.path || Wo, o3 = n2.mnemonic.locale || "en", s3 = e2.slice(32, 64), a3 = D(n2.mnemonic.entropy, "account.mnemonic.entropy"), l3 = vi(16), c3 = D(new Po(s3, l3).encrypt(a3)), d3 = new Date, h2 = "UTC--" + d3.getUTCFullYear() + "-" + Do(d3.getUTCMonth() + 1, 2) + "-" + Do(d3.getUTCDate(), 2) + "T" + Do(d3.getUTCHours(), 2) + "-" + Do(d3.getUTCMinutes(), 2) + "-" + Do(d3.getUTCSeconds(), 2) + ".0Z--" + u2.address;
    u2["x-ethers"] = { client: t3, gethFilename: h2, path: i3, locale: o3, mnemonicCounter: j(l3).substring(2), mnemonicCiphertext: j(c3).substring(2), version: "0.1" };
  }
  return JSON.stringify(u2);
}
function Yo(e2, t2, n2) {
  n2 == null && (n2 = {});
  const r2 = _o(t2), i2 = Vo(n2);
  return qo(D($o(r2, i2.salt, i2.N, i2.r, i2.p, 64)), i2, e2, n2);
}
async function Jo(e2, t2, n2) {
  n2 == null && (n2 = {});
  const r2 = _o(t2), i2 = Vo(n2);
  return qo(D(await No(r2, i2.salt, i2.N, i2.r, i2.p, 64, n2.progressCallback)), i2, e2, n2);
}
var Zo = "m/44'/60'/0'/0/0";
var Xo = new Uint8Array([66, 105, 116, 99, 111, 105, 110, 32, 115, 101, 101, 100]);
var Qo = 2147483648;
var es = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
function ts(e2, t2) {
  let n2 = "";
  for (;e2; )
    n2 = "0123456789abcdef"[e2 % 16] + n2, e2 = Math.trunc(e2 / 16);
  for (;n2.length < 2 * t2; )
    n2 = "0" + n2;
  return "0x" + n2;
}
function ns(e2) {
  const t2 = D(e2);
  return function(e3) {
    const t3 = D(e3);
    let n2 = qe(t3), r2 = "";
    for (;n2; )
      r2 = xi[Number(n2 % ki)] + r2, n2 /= ki;
    for (let e4 = 0;e4 < t3.length && !t3[e4]; e4++)
      r2 = xi[0] + r2;
    return r2;
  }(K([t2, V(pr(pr(t2)), 0, 4)]));
}
var rs = {};
function is(e2, t2, n2, r2) {
  const i2 = new Uint8Array(37);
  e2 & Qo ? (O(r2 != null, "cannot derive child of neutered node", "UNSUPPORTED_OPERATION", { operation: "deriveChild" }), i2.set(D(r2), 1)) : i2.set(D(n2));
  for (let t3 = 24;t3 >= 0; t3 -= 8)
    i2[33 + (t3 >> 3)] = e2 >> 24 - t3 & 255;
  const o2 = D(Xr("sha512", t2, i2));
  return { IL: o2.slice(0, 32), IR: o2.slice(32) };
}
function os(e2, t2) {
  const n2 = t2.split("/");
  z(n2.length > 0, "invalid path", "path", t2), n2[0] === "m" && (z(e2.depth === 0, `cannot derive root path (i.e. path starting with "m/") for a node at non-zero depth ${e2.depth}`, "path", t2), n2.shift());
  let r2 = e2;
  for (let e3 = 0;e3 < n2.length; e3++) {
    const t3 = n2[e3];
    if (t3.match(/^[0-9]+'$/)) {
      const n3 = parseInt(t3.substring(0, t3.length - 1));
      z(n3 < Qo, "invalid path index", `path[${e3}]`, t3), r2 = r2.deriveChild(Qo + n3);
    } else if (t3.match(/^[0-9]+$/)) {
      const n3 = parseInt(t3);
      z(n3 < Qo, "invalid path index", `path[${e3}]`, t3), r2 = r2.deriveChild(n3);
    } else
      z(false, "invalid path component", `path[${e3}]`, t3);
  }
  return r2;
}

class ss extends qr {
  publicKey;
  fingerprint;
  parentFingerprint;
  mnemonic;
  chainCode;
  path;
  index;
  depth;
  constructor(e2, t2, n2, r2, i2, o2, s2, a2, l2) {
    super(t2, l2), B(e2, rs, "HDNodeWallet"), U(this, { publicKey: t2.compressedPublicKey }), U(this, { parentFingerprint: n2, fingerprint: V(yi(pr(this.publicKey)), 0, 4), chainCode: r2, path: i2, index: o2, depth: s2 }), U(this, { mnemonic: a2 });
  }
  connect(e2) {
    return new ss(rs, this.signingKey, this.parentFingerprint, this.chainCode, this.path, this.index, this.depth, this.mnemonic, e2);
  }
  #O() {
    const e2 = { address: this.address, privateKey: this.privateKey }, t2 = this.mnemonic;
    return this.path && t2 && t2.wordlist.locale === "en" && t2.password === "" && (e2.mnemonic = { path: this.path, locale: "en", entropy: t2.entropy }), e2;
  }
  async encrypt(e2, t2) {
    return await Jo(this.#O(), e2, { progressCallback: t2 });
  }
  encryptSync(e2) {
    return Yo(this.#O(), e2);
  }
  get extendedKey() {
    return O(this.depth < 256, "Depth too deep", "UNSUPPORTED_OPERATION", { operation: "extendedKey" }), ns(K(["0x0488ADE4", ts(this.depth, 1), this.parentFingerprint, ts(this.index, 4), this.chainCode, K(["0x00", this.privateKey])]));
  }
  hasPath() {
    return this.path != null;
  }
  neuter() {
    return new as(rs, this.address, this.publicKey, this.parentFingerprint, this.chainCode, this.path, this.index, this.depth, this.provider);
  }
  deriveChild(e2) {
    const t2 = Ye(e2, "index");
    z(t2 <= 4294967295, "invalid index", "index", t2);
    let n2 = this.path;
    n2 && (n2 += "/" + (2147483647 & t2), t2 & Qo && (n2 += "'"));
    const { IR: r2, IL: i2 } = is(t2, this.chainCode, this.publicKey, this.privateKey), o2 = new wn(Je((qe(i2) + BigInt(this.privateKey)) % es, 32));
    return new ss(rs, o2, this.fingerprint, j(r2), n2, t2, this.depth + 1, this.mnemonic, this.provider);
  }
  derivePath(e2) {
    return os(this, e2);
  }
  static #z(e2, t2) {
    z(W(e2), "invalid seed", "seed", "[REDACTED]");
    const n2 = D(e2, "seed");
    z(n2.length >= 16 && n2.length <= 64, "invalid seed", "seed", "[REDACTED]");
    const r2 = D(Xr("sha512", Xo, n2)), i2 = new wn(j(r2.slice(0, 32)));
    return new ss(rs, i2, "0x00000000", j(r2.slice(32)), "m", 0, 0, t2, null);
  }
  static fromExtendedKey(e2) {
    const t2 = Ze(function(e3) {
      let t3 = Ei;
      for (let n3 = 0;n3 < e3.length; n3++)
        t3 *= ki, t3 += Pi(e3[n3]);
      return t3;
    }(e2));
    z(t2.length === 82 || ns(t2.slice(0, 78)) === e2, "invalid extended key", "extendedKey", "[ REDACTED ]");
    const n2 = t2[4], r2 = j(t2.slice(5, 9)), i2 = parseInt(j(t2.slice(9, 13)).substring(2), 16), o2 = j(t2.slice(13, 45)), s2 = t2.slice(45, 78);
    switch (j(t2.slice(0, 4))) {
      case "0x0488b21e":
      case "0x043587cf": {
        const e3 = j(s2);
        return new as(rs, Sr(e3), e3, r2, o2, null, i2, n2, null);
      }
      case "0x0488ade4":
      case "0x04358394 ":
        if (s2[0] !== 0)
          break;
        return new ss(rs, new wn(s2.slice(1)), r2, o2, null, i2, n2, null, null);
    }
    z(false, "invalid extended key prefix", "extendedKey", "[ REDACTED ]");
  }
  static createRandom(e2, t2, n2) {
    e2 == null && (e2 = ""), t2 == null && (t2 = Zo), n2 == null && (n2 = Ui.wordlist());
    const r2 = Mi.fromEntropy(vi(16), e2, n2);
    return ss.#z(r2.computeSeed(), r2).derivePath(t2);
  }
  static fromMnemonic(e2, t2) {
    return t2 || (t2 = Zo), ss.#z(e2.computeSeed(), e2).derivePath(t2);
  }
  static fromPhrase(e2, t2, n2, r2) {
    t2 == null && (t2 = ""), n2 == null && (n2 = Zo), r2 == null && (r2 = Ui.wordlist());
    const i2 = Mi.fromPhrase(e2, t2, r2);
    return ss.#z(i2.computeSeed(), i2).derivePath(n2);
  }
  static fromSeed(e2) {
    return ss.#z(e2, null);
  }
}

class as extends Vr {
  publicKey;
  fingerprint;
  parentFingerprint;
  chainCode;
  path;
  index;
  depth;
  constructor(e2, t2, n2, r2, i2, o2, s2, a2, l2) {
    super(t2, l2), B(e2, rs, "HDNodeVoidWallet"), U(this, { publicKey: n2 }), U(this, { publicKey: n2, fingerprint: V(yi(pr(n2)), 0, 4), parentFingerprint: r2, chainCode: i2, path: o2, index: s2, depth: a2 });
  }
  connect(e2) {
    return new as(rs, this.address, this.publicKey, this.parentFingerprint, this.chainCode, this.path, this.index, this.depth, e2);
  }
  get extendedKey() {
    return O(this.depth < 256, "Depth too deep", "UNSUPPORTED_OPERATION", { operation: "extendedKey" }), ns(K(["0x0488B21E", ts(this.depth, 1), this.parentFingerprint, ts(this.index, 4), this.chainCode, this.publicKey]));
  }
  hasPath() {
    return this.path != null;
  }
  deriveChild(e2) {
    const t2 = Ye(e2, "index");
    z(t2 <= 4294967295, "invalid index", "index", t2);
    let n2 = this.path;
    n2 && (n2 += "/" + (2147483647 & t2), t2 & Qo && (n2 += "'"));
    const { IR: r2, IL: i2 } = is(t2, this.chainCode, this.publicKey, null), o2 = wn.addPoints(i2, this.publicKey, true), s2 = Sr(o2);
    return new as(rs, s2, o2, this.fingerprint, j(r2), n2, t2, this.depth + 1, this.provider);
  }
  derivePath(e2) {
    return os(this, e2);
  }
}
function ls(e2) {
  try {
    if (JSON.parse(e2).encseed)
      return true;
  } catch (e3) {}
  return false;
}
function cs(e2, t2) {
  const n2 = JSON.parse(e2), r2 = _o(t2), i2 = kn(Mo(n2, "ethaddr:string!")), o2 = Lo(Mo(n2, "encseed:string!"));
  z(o2 && o2.length % 16 == 0, "invalid encseed", "json", e2);
  const s2 = D(Ni(r2, r2, 2000, 32, "sha256")).slice(0, 16), a2 = o2.slice(0, 16), l2 = o2.slice(16), c2 = function(e3) {
    if (e3.length < 16)
      throw new TypeError("PKCS#7 invalid length");
    const t3 = e3[e3.length - 1];
    if (t3 > 16)
      throw new TypeError("PKCS#7 padding byte out of range");
    const n3 = e3.length - t3;
    for (let r3 = 0;r3 < t3; r3++)
      if (e3[n3 + r3] !== t3)
        throw new TypeError("PKCS#7 invalid padding byte");
    return new Uint8Array(e3.subarray(0, n3));
  }(D(new mo(s2, a2).decrypt(l2)));
  let d2 = "";
  for (let e3 = 0;e3 < c2.length; e3++)
    d2 += String.fromCharCode(c2[e3]);
  return { address: i2, privateKey: zn(d2) };
}
function ds(e2) {
  return new Promise((t2) => {
    setTimeout(() => {
      t2();
    }, e2);
  });
}

class us extends qr {
  constructor(e2, t2) {
    typeof e2 != "string" || e2.startsWith("0x") || (e2 = "0x" + e2), super(typeof e2 == "string" ? new wn(e2) : e2, t2);
  }
  connect(e2) {
    return new us(this.signingKey, e2);
  }
  async encrypt(e2, t2) {
    const n2 = { address: this.address, privateKey: this.privateKey };
    return await Jo(n2, e2, { progressCallback: t2 });
  }
  encryptSync(e2) {
    return Yo({ address: this.address, privateKey: this.privateKey }, e2);
  }
  static #N(e2) {
    if (z(e2, "invalid JSON wallet", "json", "[ REDACTED ]"), "mnemonic" in e2 && e2.mnemonic && e2.mnemonic.locale === "en") {
      const t3 = Mi.fromEntropy(e2.mnemonic.entropy), n2 = ss.fromMnemonic(t3, e2.mnemonic.path);
      if (n2.address === e2.address && n2.privateKey === e2.privateKey)
        return n2;
      console.log("WARNING: JSON mismatch address/privateKey != mnemonic; fallback onto private key");
    }
    const t2 = new us(e2.privateKey);
    return z(t2.address === e2.address, "address/privateKey mismatch", "json", "[ REDACTED ]"), t2;
  }
  static async fromEncryptedJson(e2, t2, n2) {
    let r2 = null;
    return Ho(e2) ? r2 = await async function(e3, t3, n3) {
      const r3 = JSON.parse(e3), i2 = _o(t3), o2 = Ko(r3);
      if (o2.name === "pbkdf2") {
        n3 && (n3(0), await Go(0));
        const { salt: e4, count: t4, dkLen: s3, algorithm: a3 } = o2, l3 = Ni(i2, e4, t4, s3, a3);
        return n3 && (n3(1), await Go(0)), jo(r3, l3);
      }
      O(o2.name === "scrypt", "cannot be reached", "UNKNOWN_ERROR", { params: o2 });
      const { salt: s2, N: a2, r: l2, p: c2, dkLen: d2 } = o2;
      return jo(r3, await No(i2, s2, a2, l2, c2, d2, n3));
    }(e2, t2, n2) : ls(e2) && (n2 && (n2(0), await ds(0)), r2 = cs(e2, t2), n2 && (n2(1), await ds(0))), us.#N(r2);
  }
  static fromEncryptedJsonSync(e2, t2) {
    let n2 = null;
    return Ho(e2) ? n2 = function(e3, t3) {
      const n3 = JSON.parse(e3), r2 = _o(t3), i2 = Ko(n3);
      if (i2.name === "pbkdf2") {
        const { salt: e4, count: t4, dkLen: o3, algorithm: s3 } = i2;
        return jo(n3, Ni(r2, e4, t4, o3, s3));
      }
      O(i2.name === "scrypt", "cannot be reached", "UNKNOWN_ERROR", { params: i2 });
      const { salt: o2, N: s2, r: a2, p: l2, dkLen: c2 } = i2;
      return jo(n3, $o(r2, o2, s2, a2, l2, c2));
    }(e2, t2) : ls(e2) ? n2 = cs(e2, t2) : z(false, "invalid JSON wallet", "json", "[ REDACTED ]"), us.#N(n2);
  }
  static createRandom(e2) {
    const t2 = ss.createRandom();
    return e2 ? t2.connect(e2) : t2;
  }
  static fromPhrase(e2, t2) {
    const n2 = ss.fromPhrase(e2);
    return t2 ? n2.connect(t2) : n2;
  }
}
var hs = new TextEncoder;
new TextDecoder;

class ps {
  type;
  data;
  constructor(e2, t2) {
    this.type = e2, this.data = t2;
  }
}

class fs extends Error {
  constructor(e2) {
    super(e2);
    const t2 = Object.create(fs.prototype);
    Object.setPrototypeOf(this, t2), Object.defineProperty(this, "name", { configurable: true, enumerable: false, value: fs.name });
  }
}
function gs(e2, t2, n2) {
  const r2 = Math.floor(n2 / 4294967296), i2 = n2;
  e2.setUint32(t2, r2), e2.setUint32(t2 + 4, i2);
}
var ys = { type: -1, encode: function(e2) {
  return e2 instanceof Date ? function({ sec: e3, nsec: t2 }) {
    if (e3 >= 0 && t2 >= 0 && e3 <= 17179869183) {
      if (t2 === 0 && e3 <= 4294967295) {
        const t3 = new Uint8Array(4);
        return new DataView(t3.buffer).setUint32(0, e3), t3;
      }
      {
        const n2 = e3 / 4294967296, r2 = 4294967295 & e3, i2 = new Uint8Array(8), o2 = new DataView(i2.buffer);
        return o2.setUint32(0, t2 << 2 | 3 & n2), o2.setUint32(4, r2), i2;
      }
    }
    {
      const n2 = new Uint8Array(12), r2 = new DataView(n2.buffer);
      return r2.setUint32(0, t2), gs(r2, 4, e3), n2;
    }
  }(function(e3) {
    const t2 = e3.getTime(), n2 = Math.floor(t2 / 1000), r2 = 1e6 * (t2 - 1000 * n2), i2 = Math.floor(r2 / 1e9);
    return { sec: n2 + i2, nsec: r2 - 1e9 * i2 };
  }(e2)) : null;
}, decode: function(e2) {
  const t2 = function(e3) {
    const t3 = new DataView(e3.buffer, e3.byteOffset, e3.byteLength);
    switch (e3.byteLength) {
      case 4:
        return { sec: t3.getUint32(0), nsec: 0 };
      case 8: {
        const e4 = t3.getUint32(0);
        return { sec: 4294967296 * (3 & e4) + t3.getUint32(4), nsec: e4 >>> 2 };
      }
      case 12: {
        const e4 = function(e5) {
          return 4294967296 * e5.getInt32(4) + e5.getUint32(8);
        }(t3);
        return { sec: e4, nsec: t3.getUint32(0) };
      }
      default:
        throw new fs(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${e3.length}`);
    }
  }(e2);
  return new Date(1000 * t2.sec + t2.nsec / 1e6);
} };

class ms {
  static defaultCodec = new ms;
  __brand;
  builtInEncoders = [];
  builtInDecoders = [];
  encoders = [];
  decoders = [];
  constructor() {
    this.register(ys);
  }
  register({ type: e2, encode: t2, decode: n2 }) {
    if (e2 >= 0)
      this.encoders[e2] = t2, this.decoders[e2] = n2;
    else {
      const r2 = -1 - e2;
      this.builtInEncoders[r2] = t2, this.builtInDecoders[r2] = n2;
    }
  }
  tryToEncode(e2, t2) {
    for (let n2 = 0;n2 < this.builtInEncoders.length; n2++) {
      const r2 = this.builtInEncoders[n2];
      if (r2 != null) {
        const i2 = r2(e2, t2);
        if (i2 != null)
          return new ps(-1 - n2, i2);
      }
    }
    for (let n2 = 0;n2 < this.encoders.length; n2++) {
      const r2 = this.encoders[n2];
      if (r2 != null) {
        const i2 = r2(e2, t2);
        if (i2 != null)
          return new ps(n2, i2);
      }
    }
    return e2 instanceof ps ? e2 : null;
  }
  decode(e2, t2, n2) {
    const r2 = t2 < 0 ? this.builtInDecoders[-1 - t2] : this.decoders[t2];
    return r2 ? r2(e2, t2, n2) : new ps(t2, e2);
  }
}

class bs {
  extensionCodec;
  context;
  useBigInt64;
  maxDepth;
  initialBufferSize;
  sortKeys;
  forceFloat32;
  ignoreUndefined;
  forceIntegerToFloat;
  pos;
  view;
  bytes;
  entered = false;
  constructor(e2) {
    this.extensionCodec = e2?.extensionCodec ?? ms.defaultCodec, this.context = e2?.context, this.useBigInt64 = e2?.useBigInt64 ?? false, this.maxDepth = e2?.maxDepth ?? 100, this.initialBufferSize = e2?.initialBufferSize ?? 2048, this.sortKeys = e2?.sortKeys ?? false, this.forceFloat32 = e2?.forceFloat32 ?? false, this.ignoreUndefined = e2?.ignoreUndefined ?? false, this.forceIntegerToFloat = e2?.forceIntegerToFloat ?? false, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
  }
  clone() {
    return new bs({ extensionCodec: this.extensionCodec, context: this.context, useBigInt64: this.useBigInt64, maxDepth: this.maxDepth, initialBufferSize: this.initialBufferSize, sortKeys: this.sortKeys, forceFloat32: this.forceFloat32, ignoreUndefined: this.ignoreUndefined, forceIntegerToFloat: this.forceIntegerToFloat });
  }
  reinitializeState() {
    this.pos = 0;
  }
  encodeSharedRef(e2) {
    if (this.entered)
      return this.clone().encodeSharedRef(e2);
    try {
      return this.entered = true, this.reinitializeState(), this.doEncode(e2, 1), this.bytes.subarray(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  encode(e2) {
    if (this.entered)
      return this.clone().encode(e2);
    try {
      return this.entered = true, this.reinitializeState(), this.doEncode(e2, 1), this.bytes.slice(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  doEncode(e2, t2) {
    if (t2 > this.maxDepth)
      throw new Error(`Too deep objects in depth ${t2}`);
    e2 == null ? this.encodeNil() : typeof e2 == "boolean" ? this.encodeBoolean(e2) : typeof e2 == "number" ? this.forceIntegerToFloat ? this.encodeNumberAsFloat(e2) : this.encodeNumber(e2) : typeof e2 == "string" ? this.encodeString(e2) : this.useBigInt64 && typeof e2 == "bigint" ? this.encodeBigInt64(e2) : this.encodeObject(e2, t2);
  }
  ensureBufferSizeToWrite(e2) {
    const t2 = this.pos + e2;
    this.view.byteLength < t2 && this.resizeBuffer(2 * t2);
  }
  resizeBuffer(e2) {
    const t2 = new ArrayBuffer(e2), n2 = new Uint8Array(t2), r2 = new DataView(t2);
    n2.set(this.bytes), this.view = r2, this.bytes = n2;
  }
  encodeNil() {
    this.writeU8(192);
  }
  encodeBoolean(e2) {
    e2 === false ? this.writeU8(194) : this.writeU8(195);
  }
  encodeNumber(e2) {
    !this.forceIntegerToFloat && Number.isSafeInteger(e2) ? e2 >= 0 ? e2 < 128 ? this.writeU8(e2) : e2 < 256 ? (this.writeU8(204), this.writeU8(e2)) : e2 < 65536 ? (this.writeU8(205), this.writeU16(e2)) : e2 < 4294967296 ? (this.writeU8(206), this.writeU32(e2)) : this.useBigInt64 ? this.encodeNumberAsFloat(e2) : (this.writeU8(207), this.writeU64(e2)) : e2 >= -32 ? this.writeU8(224 | e2 + 32) : e2 >= -128 ? (this.writeU8(208), this.writeI8(e2)) : e2 >= -32768 ? (this.writeU8(209), this.writeI16(e2)) : e2 >= -2147483648 ? (this.writeU8(210), this.writeI32(e2)) : this.useBigInt64 ? this.encodeNumberAsFloat(e2) : (this.writeU8(211), this.writeI64(e2)) : this.encodeNumberAsFloat(e2);
  }
  encodeNumberAsFloat(e2) {
    this.forceFloat32 ? (this.writeU8(202), this.writeF32(e2)) : (this.writeU8(203), this.writeF64(e2));
  }
  encodeBigInt64(e2) {
    e2 >= BigInt(0) ? (this.writeU8(207), this.writeBigUint64(e2)) : (this.writeU8(211), this.writeBigInt64(e2));
  }
  writeStringHeader(e2) {
    if (e2 < 32)
      this.writeU8(160 + e2);
    else if (e2 < 256)
      this.writeU8(217), this.writeU8(e2);
    else if (e2 < 65536)
      this.writeU8(218), this.writeU16(e2);
    else {
      if (!(e2 < 4294967296))
        throw new Error(`Too long string: ${e2} bytes in UTF-8`);
      this.writeU8(219), this.writeU32(e2);
    }
  }
  encodeString(e2) {
    const t2 = function(e3) {
      const t3 = e3.length;
      let n2 = 0, r2 = 0;
      for (;r2 < t3; ) {
        let i2 = e3.charCodeAt(r2++);
        if (4294967168 & i2)
          if (4294965248 & i2) {
            if (i2 >= 55296 && i2 <= 56319 && r2 < t3) {
              const t4 = e3.charCodeAt(r2);
              (64512 & t4) == 56320 && (++r2, i2 = ((1023 & i2) << 10) + (1023 & t4) + 65536);
            }
            n2 += 4294901760 & i2 ? 4 : 3;
          } else
            n2 += 2;
        else
          n2++;
      }
      return n2;
    }(e2);
    this.ensureBufferSizeToWrite(5 + t2), this.writeStringHeader(t2), function(e3, t3, n2) {
      e3.length > 50 ? function(e4, t4, n3) {
        hs.encodeInto(e4, t4.subarray(n3));
      }(e3, t3, n2) : function(e4, t4, n3) {
        const r2 = e4.length;
        let i2 = n3, o2 = 0;
        for (;o2 < r2; ) {
          let n4 = e4.charCodeAt(o2++);
          if (4294967168 & n4) {
            if (4294965248 & n4) {
              if (n4 >= 55296 && n4 <= 56319 && o2 < r2) {
                const t5 = e4.charCodeAt(o2);
                (64512 & t5) == 56320 && (++o2, n4 = ((1023 & n4) << 10) + (1023 & t5) + 65536);
              }
              4294901760 & n4 ? (t4[i2++] = n4 >> 18 & 7 | 240, t4[i2++] = n4 >> 12 & 63 | 128, t4[i2++] = n4 >> 6 & 63 | 128) : (t4[i2++] = n4 >> 12 & 15 | 224, t4[i2++] = n4 >> 6 & 63 | 128);
            } else
              t4[i2++] = n4 >> 6 & 31 | 192;
            t4[i2++] = 63 & n4 | 128;
          } else
            t4[i2++] = n4;
        }
      }(e3, t3, n2);
    }(e2, this.bytes, this.pos), this.pos += t2;
  }
  encodeObject(e2, t2) {
    const n2 = this.extensionCodec.tryToEncode(e2, this.context);
    if (n2 != null)
      this.encodeExtension(n2);
    else if (Array.isArray(e2))
      this.encodeArray(e2, t2);
    else if (ArrayBuffer.isView(e2))
      this.encodeBinary(e2);
    else {
      if (typeof e2 != "object")
        throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(e2)}`);
      this.encodeMap(e2, t2);
    }
  }
  encodeBinary(e2) {
    const t2 = e2.byteLength;
    if (t2 < 256)
      this.writeU8(196), this.writeU8(t2);
    else if (t2 < 65536)
      this.writeU8(197), this.writeU16(t2);
    else {
      if (!(t2 < 4294967296))
        throw new Error(`Too large binary: ${t2}`);
      this.writeU8(198), this.writeU32(t2);
    }
    const n2 = (r2 = e2) instanceof Uint8Array ? r2 : ArrayBuffer.isView(r2) ? new Uint8Array(r2.buffer, r2.byteOffset, r2.byteLength) : function(e3) {
      return e3 instanceof ArrayBuffer || typeof SharedArrayBuffer != "undefined" && e3 instanceof SharedArrayBuffer;
    }(r2) ? new Uint8Array(r2) : Uint8Array.from(r2);
    var r2;
    this.writeU8a(n2);
  }
  encodeArray(e2, t2) {
    const n2 = e2.length;
    if (n2 < 16)
      this.writeU8(144 + n2);
    else if (n2 < 65536)
      this.writeU8(220), this.writeU16(n2);
    else {
      if (!(n2 < 4294967296))
        throw new Error(`Too large array: ${n2}`);
      this.writeU8(221), this.writeU32(n2);
    }
    for (const n3 of e2)
      this.doEncode(n3, t2 + 1);
  }
  countWithoutUndefined(e2, t2) {
    let n2 = 0;
    for (const r2 of t2)
      e2[r2] !== undefined && n2++;
    return n2;
  }
  encodeMap(e2, t2) {
    const n2 = Object.keys(e2);
    this.sortKeys && n2.sort();
    const r2 = this.ignoreUndefined ? this.countWithoutUndefined(e2, n2) : n2.length;
    if (r2 < 16)
      this.writeU8(128 + r2);
    else if (r2 < 65536)
      this.writeU8(222), this.writeU16(r2);
    else {
      if (!(r2 < 4294967296))
        throw new Error(`Too large map object: ${r2}`);
      this.writeU8(223), this.writeU32(r2);
    }
    for (const r3 of n2) {
      const n3 = e2[r3];
      this.ignoreUndefined && n3 === undefined || (this.encodeString(r3), this.doEncode(n3, t2 + 1));
    }
  }
  encodeExtension(e2) {
    if (typeof e2.data == "function") {
      const t3 = e2.data(this.pos + 6), n2 = t3.length;
      if (n2 >= 4294967296)
        throw new Error(`Too large extension object: ${n2}`);
      return this.writeU8(201), this.writeU32(n2), this.writeI8(e2.type), void this.writeU8a(t3);
    }
    const t2 = e2.data.length;
    if (t2 === 1)
      this.writeU8(212);
    else if (t2 === 2)
      this.writeU8(213);
    else if (t2 === 4)
      this.writeU8(214);
    else if (t2 === 8)
      this.writeU8(215);
    else if (t2 === 16)
      this.writeU8(216);
    else if (t2 < 256)
      this.writeU8(199), this.writeU8(t2);
    else if (t2 < 65536)
      this.writeU8(200), this.writeU16(t2);
    else {
      if (!(t2 < 4294967296))
        throw new Error(`Too large extension object: ${t2}`);
      this.writeU8(201), this.writeU32(t2);
    }
    this.writeI8(e2.type), this.writeU8a(e2.data);
  }
  writeU8(e2) {
    this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e2), this.pos++;
  }
  writeU8a(e2) {
    const t2 = e2.length;
    this.ensureBufferSizeToWrite(t2), this.bytes.set(e2, this.pos), this.pos += t2;
  }
  writeI8(e2) {
    this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e2), this.pos++;
  }
  writeU16(e2) {
    this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e2), this.pos += 2;
  }
  writeI16(e2) {
    this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e2), this.pos += 2;
  }
  writeU32(e2) {
    this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e2), this.pos += 4;
  }
  writeI32(e2) {
    this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e2), this.pos += 4;
  }
  writeF32(e2) {
    this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e2), this.pos += 4;
  }
  writeF64(e2) {
    this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e2), this.pos += 8;
  }
  writeU64(e2) {
    this.ensureBufferSizeToWrite(8), function(e3, t2, n2) {
      const r2 = n2 / 4294967296, i2 = n2;
      e3.setUint32(t2, r2), e3.setUint32(t2 + 4, i2);
    }(this.view, this.pos, e2), this.pos += 8;
  }
  writeI64(e2) {
    this.ensureBufferSizeToWrite(8), gs(this.view, this.pos, e2), this.pos += 8;
  }
  writeBigUint64(e2) {
    this.ensureBufferSizeToWrite(8), this.view.setBigUint64(this.pos, e2), this.pos += 8;
  }
  writeBigInt64(e2) {
    this.ensureBufferSizeToWrite(8), this.view.setBigInt64(this.pos, e2), this.pos += 8;
  }
}
var ws = "https://api.hyperliquid.xyz";
var vs = "wss://api.hyperliquid.xyz/ws";
var xs = { BTC: 0, ETH: 1, SOL: 4, XRP: 11, OP: 24, HYPE: 132 };
function Ss(e2) {
  return e2.split("/")[0];
}
var Ps = { name: "Exchange", version: "1", chainId: 1337, verifyingContract: "0x0000000000000000000000000000000000000000" };
var Es = { Agent: [{ name: "source", type: "string" }, { name: "connectionId", type: "bytes32" }] };

class ks {
  constructor(e2) {
    this.ws = null, this.reconnectTimer = null, this.subscribedPairs = [], this.isDestroyed = false, this.callbacks = e2;
  }
  connect() {
    if (!this.isDestroyed)
      try {
        this.ws = new WebSocket(vs), this.ws.onopen = () => {
          this.callbacks.onConnect?.(), this.ws?.send(JSON.stringify({ method: "subscribe", subscription: { type: "allMids" } }));
        }, this.ws.onmessage = (e2) => {
          try {
            const t2 = JSON.parse(String(e2.data));
            t2.channel === "allMids" && t2.data?.mids && this.handleMidsUpdate(t2.data);
          } catch {}
        }, this.ws.onerror = () => {
          this.callbacks.onError?.(new Error("Hyperliquid WebSocket error"));
        }, this.ws.onclose = () => {
          this.callbacks.onDisconnect?.(), this.scheduleReconnect();
        };
      } catch (e2) {
        this.callbacks.onError?.(e2 instanceof Error ? e2 : new Error(String(e2))), this.scheduleReconnect();
      }
  }
  subscribeToFundingRates(e2) {
    if (this.subscribedPairs = e2, this.ws?.readyState === WebSocket.OPEN)
      for (const t2 of e2) {
        const e3 = Ss(t2);
        this.ws.send(JSON.stringify({ method: "subscribe", subscription: { type: "activeAssetCtx", coin: e3 } }));
      }
  }
  handleMidsUpdate(e2) {}
  scheduleReconnect() {
    this.isDestroyed || (this.reconnectTimer = setTimeout(() => this.connect(), 5000));
  }
  disconnect() {
    this.isDestroyed = true, this.reconnectTimer && clearTimeout(this.reconnectTimer), this.ws && (this.ws.onclose = null, this.ws.close(), this.ws = null);
  }
  get connected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
function Is(e2, t2) {
  const n2 = new us(e2.apiKey), r2 = t2?.usePortfolioMargin !== false, i2 = new Set;
  let o2 = false;
  async function s2(e3) {
    const t3 = await fetch(`${ws}/info`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(e3) });
    if (!t3.ok)
      throw new Error(`HL info error: ${t3.status}`);
    return t3.json();
  }
  async function a2(e3, t3) {
    const r3 = await async function(e4, t4, n3, r4 = null, i4 = true) {
      const o4 = function(e5) {
        return t5 = e5, new bs(undefined).encodeSharedRef(t5);
        var t5;
      }(t4), s3 = new ArrayBuffer(8);
      let a3;
      if (new DataView(s3).setBigUint64(0, BigInt(n3), false), r4) {
        const e5 = D(r4);
        a3 = new Uint8Array([...o4, 1, ...e5, ...new Uint8Array(s3)]);
      } else
        a3 = new Uint8Array([...o4, 0, ...new Uint8Array(s3)]);
      const l2 = { source: i4 ? "a" : "b", connectionId: _e(a3) }, c2 = await e4.signTypedData(Ps, Es, l2), { r: d2, s: u2, v: h2 } = ct.from(c2);
      return { r: d2, s: u2, v: h2 };
    }(n2, e3, t3), i3 = { action: e3, nonce: t3, signature: r3, vaultAddress: null }, o3 = await fetch(`${ws}/exchange`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(i3) });
    if (!o3.ok) {
      const e4 = await o3.text();
      throw new Error(`HL exchange error: ${o3.status} – ${e4}`);
    }
    return o3.json();
  }
  return { async getFundingRates(e3) {
    const t3 = await s2({ type: "metaAndAssetCtxs" }), [n3, r3] = t3, i3 = [];
    for (const t4 of e3) {
      const e4 = Ss(t4), o3 = n3.universe.findIndex((t5) => t5.name === e4);
      if (o3 === -1)
        continue;
      const s3 = r3[o3];
      s3 && i3.push({ pair: t4, rate: parseFloat(s3.funding), nextFundingTime: s3.nextFunding ?? Date.now() + 3600000 });
    }
    return i3;
  }, async placeSpotOrder(e3) {
    const t3 = Ss(e3.pair), n3 = { type: "order", orders: [{ a: xs[t3] ?? 0, b: e3.side === "buy", p: e3.limitPrice?.toString() ?? "0", s: (e3.sizeUsd / 1).toString(), r: e3.reduceOnly ?? false, t: e3.orderType === "limit" ? { limit: { tif: "Gtc" } } : { limit: { tif: "Ioc" } } }], grouping: "na" }, r3 = await a2(n3, Date.now()), i3 = r3?.response?.data?.statuses?.[0];
    return i3?.filled ? { orderId: String(i3.filled.oid), filledSize: parseFloat(i3.filled.totalSz), avgPrice: parseFloat(i3.filled.avgPx), status: "filled" } : { orderId: "", filledSize: 0, avgPrice: 0, status: "rejected" };
  }, async placePerpOrder(e3) {
    const t3 = Ss(e3.pair), n3 = xs[t3] ?? 0;
    r2 && await async function() {
      if (!o2)
        try {
          await a2({ type: "userPortfolioMargin", enabled: true }, Date.now()), o2 = true;
        } catch (e4) {
          console.warn("Portfolio margin activation failed (may be in pre-alpha):", e4), o2 = true;
        }
    }(), await async function(e4) {
      if (!i2.has(e4))
        try {
          await a2({ type: "updateLeverage", asset: e4, isCross: true, leverage: 1 }, Date.now()), i2.add(e4);
        } catch (t4) {
          console.warn(`Cross margin setup failed for asset ${e4}:`, t4), i2.add(e4);
        }
    }(n3);
    const s3 = { type: "order", orders: [{ a: n3, b: e3.side === "buy", p: e3.limitPrice?.toString() ?? "0", s: (e3.sizeUsd / 1).toString(), r: e3.reduceOnly ?? false, t: e3.orderType === "limit" ? { limit: { tif: "Gtc" } } : { limit: { tif: "Ioc" } } }], grouping: "na" }, l2 = await a2(s3, Date.now()), c2 = l2?.response?.data?.statuses?.[0];
    return c2?.filled ? { orderId: String(c2.filled.oid), filledSize: parseFloat(c2.filled.totalSz), avgPrice: parseFloat(c2.filled.avgPx), status: "filled" } : { orderId: "", filledSize: 0, avgPrice: 0, status: "rejected" };
  }, getPositions: async () => ((await s2({ type: "clearinghouseState", user: n2.address })).assetPositions ?? []).map((e3) => ({ pair: `${e3.position.coin}/USDT`, side: parseFloat(e3.position.szi) > 0 ? "long" : "short", size: Math.abs(parseFloat(e3.position.szi)), entryPrice: parseFloat(e3.position.entryPx), markPrice: parseFloat(e3.position.positionValue) / Math.abs(parseFloat(e3.position.szi)) || 0, unrealizedPnl: parseFloat(e3.position.unrealizedPnl), instrument: "perp" })), async cancelOrder(e3, t3) {
    await a2({ type: "cancel", cancels: [{ a: 0, o: parseInt(e3, 10) }] }, Date.now());
  }, async getMarkPrices(e3) {
    const t3 = await s2({ type: "metaAndAssetCtxs" }), [n3, r3] = t3, i3 = [];
    for (const t4 of e3) {
      const e4 = Ss(t4), o3 = n3.universe.findIndex((t5) => t5.name === e4);
      if (o3 !== -1 && r3[o3]) {
        const e5 = parseFloat(r3[o3].markPx);
        i3.push({ pair: t4, spotPrice: e5, perpPrice: e5, timestamp: Date.now() });
      }
    }
    return i3;
  }, async getFundingHistory(e3, t3) {
    try {
      const r3 = await s2({ type: "userFunding", user: n2.address, startTime: t3, endTime: Date.now() }), i3 = new Set(e3);
      return (r3 ?? []).map((e4) => {
        const t4 = `${e4.coin}/USDT`;
        return i3.has(t4) ? { pair: t4, amount: parseFloat(e4.usdc), rate: parseFloat(e4.fundingRate), settledAt: e4.time } : null;
      }).filter((e4) => e4 !== null);
    } catch {
      return [];
    }
  }, async getOrderStatus(e3) {
    try {
      const t3 = await s2({ type: "orderStatus", user: n2.address, oid: parseInt(e3, 10) });
      if (t3?.order) {
        const e4 = t3.order, n3 = e4.status === "filled" ? "filled" : e4.status === "partial" ? "partial" : "rejected";
        return { orderId: String(e4.oid), filledSize: parseFloat(e4.sz ?? "0"), avgPrice: parseFloat(e4.avgPx ?? "0"), status: n3 };
      }
      return { orderId: e3, filledSize: 0, avgPrice: 0, status: "rejected" };
    } catch {
      return { orderId: e3, filledSize: 0, avgPrice: 0, status: "rejected" };
    }
  }, async getFundingHistoryWs(e3, t3) {
    const r3 = new Set(e3);
    return new Promise((e4) => {
      const i3 = [];
      let o3 = null, s3 = false;
      const a3 = () => {
        if (!s3) {
          s3 = true;
          try {
            o3?.close();
          } catch {}
          e4(i3);
        }
      }, l2 = setTimeout(a3, 15000);
      try {
        o3 = new WebSocket(vs), o3.onopen = () => {
          o3?.send(JSON.stringify({ method: "subscribe", subscription: { type: "userFundings", user: n2.address } }));
        }, o3.onmessage = (e5) => {
          try {
            const n3 = JSON.parse(String(e5.data));
            if (n3.channel === "userFundings" && n3.data) {
              const e6 = Array.isArray(n3.data) ? n3.data : [n3.data];
              for (const n4 of e6) {
                const e7 = `${n4.coin}/USDT`;
                if (!r3.has(e7))
                  continue;
                const o4 = n4.time ?? Date.now();
                o4 < t3 || i3.push({ pair: e7, amount: parseFloat(n4.usdc ?? "0"), rate: parseFloat(n4.fundingRate ?? "0"), settledAt: o4 });
              }
              i3.length > 0 && (clearTimeout(l2), a3());
            }
          } catch {}
        }, o3.onerror = () => {
          clearTimeout(l2), a3();
        }, o3.onclose = () => {
          clearTimeout(l2), a3();
        };
      } catch {
        clearTimeout(l2), a3();
      }
    });
  }, async transferToSpot(e3) {
    if (r2)
      return true;
    try {
      return await a2({ type: "usdClassTransfer", amount: e3.amountUsd.toFixed(2), toPerp: false }, Date.now()), true;
    } catch (e4) {
      return console.warn("HL usdClassTransfer failed:", e4), false;
    }
  }, async getSettlementBalance(e3) {
    try {
      const e4 = await s2({ type: "clearinghouseState", user: n2.address });
      return parseFloat(e4.marginSummary.totalRawUsd ?? e4.marginSummary.accountValue ?? "0");
    } catch {
      return 0;
    }
  }, async validateKeys() {
    try {
      if (!n2.address || !n2.address.startsWith("0x"))
        return { ok: false, reason: "Invalid wallet private key" };
      const e3 = await s2({ type: "clearinghouseState", user: n2.address });
      return e3 && typeof e3 == "object" && "marginSummary" in e3 ? { ok: true } : { ok: false, reason: "Hyperliquid did not return a valid clearinghouseState" };
    } catch (e3) {
      return { ok: false, reason: e3 instanceof Error ? e3.message : String(e3) };
    }
  } };
}
function Cs(e2) {
  async function t2(e3) {
    const t3 = await fetch(`${ws}/info`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(e3) });
    if (!t3.ok)
      throw new Error(`HL info error: ${t3.status}`);
    return t3.json();
  }
  return { async getFundingRates(e3) {
    const n2 = await t2({ type: "metaAndAssetCtxs" }), [r2, i2] = n2, o2 = [];
    for (const t3 of e3) {
      const e4 = Ss(t3), n3 = r2.universe.findIndex((t4) => t4.name === e4);
      if (n3 === -1)
        continue;
      const s2 = i2[n3];
      s2 && o2.push({ pair: t3, rate: parseFloat(s2.funding), nextFundingTime: s2.nextFunding ?? Date.now() + 3600000 });
    }
    return o2;
  }, placeSpotOrder: async (e3) => ({ orderId: `dry-spot-${Date.now()}`, filledSize: e3.sizeUsd, avgPrice: e3.limitPrice ?? 0, status: "filled" }), placePerpOrder: async (e3) => ({ orderId: `dry-perp-${Date.now()}`, filledSize: e3.sizeUsd, avgPrice: e3.limitPrice ?? 0, status: "filled" }), getPositions: async () => [], async cancelOrder(e3, t3) {}, async getMarkPrices(e3) {
    const n2 = await t2({ type: "metaAndAssetCtxs" }), [r2, i2] = n2, o2 = [];
    for (const t3 of e3) {
      const e4 = Ss(t3), n3 = r2.universe.findIndex((t4) => t4.name === e4);
      if (n3 !== -1 && i2[n3]) {
        const e5 = parseFloat(i2[n3].markPx);
        o2.push({ pair: t3, spotPrice: e5, perpPrice: e5, timestamp: Date.now() });
      }
    }
    return o2;
  }, transferToSpot: async () => true, getSettlementBalance: async () => Infinity, getFundingHistory: async () => [], getOrderStatus: async (e3) => ({ orderId: e3, filledSize: 0, avgPrice: 0, status: "filled" }), validateKeys: async () => ({ ok: true }) };
}
var As = "https://www.okx.com";
function Ts(e2, t2) {
  const [n2, r2] = e2.split("/");
  return t2 === "SWAP" ? `${n2}-USD-SWAP` : `${n2}-${r2}`;
}
async function Rs(e2, t2, n2, r2, i2) {
  const o2 = t2 + n2.toUpperCase() + r2 + i2, s2 = new TextEncoder, a2 = await crypto.subtle.importKey("raw", s2.encode(e2), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), l2 = await crypto.subtle.sign("HMAC", a2, s2.encode(o2));
  return btoa(String.fromCharCode(...new Uint8Array(l2)));
}

class Us {
  constructor(e2) {
    this.ws = null, this.reconnectTimer = null, this.pingTimer = null, this.subscribedPairs = [], this.isDestroyed = false, this.callbacks = e2;
  }
  connect() {
    if (!this.isDestroyed)
      try {
        this.ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public"), this.ws.onopen = () => {
          this.callbacks.onConnect?.(), this.subscribedPairs.length > 0 && this.sendFundingRateSubscription(this.subscribedPairs), this.pingTimer = setInterval(() => {
            this.ws?.readyState === WebSocket.OPEN && this.ws.send("ping");
          }, 25000);
        }, this.ws.onmessage = (e2) => {
          const t2 = String(e2.data);
          if (t2 !== "pong")
            try {
              const e3 = JSON.parse(t2);
              if (e3.arg?.channel === "funding-rate" && e3.data)
                for (const t3 of e3.data) {
                  const e4 = t3.instId.replace("-SWAP", "").replace("-USD", "-USDT").replace("-", "/"), n2 = parseFloat(t3.fundingRate), r2 = parseInt(t3.nextFundingTime, 10);
                  this.callbacks.onFundingRate?.(e4, n2, r2);
                }
            } catch {}
        }, this.ws.onerror = () => {
          this.callbacks.onError?.(new Error("OKX WebSocket error"));
        }, this.ws.onclose = () => {
          this.clearPing(), this.callbacks.onDisconnect?.(), this.scheduleReconnect();
        };
      } catch (e2) {
        this.callbacks.onError?.(e2 instanceof Error ? e2 : new Error(String(e2))), this.scheduleReconnect();
      }
  }
  subscribeToFundingRates(e2) {
    this.subscribedPairs = e2, this.ws?.readyState === WebSocket.OPEN && this.sendFundingRateSubscription(e2);
  }
  sendFundingRateSubscription(e2) {
    const t2 = e2.map((e3) => ({ channel: "funding-rate", instId: Ts(e3, "SWAP") }));
    this.ws?.send(JSON.stringify({ op: "subscribe", args: t2 }));
  }
  clearPing() {
    this.pingTimer && (clearInterval(this.pingTimer), this.pingTimer = null);
  }
  scheduleReconnect() {
    this.isDestroyed || (this.reconnectTimer = setTimeout(() => this.connect(), 5000));
  }
  disconnect() {
    this.isDestroyed = true, this.clearPing(), this.reconnectTimer && clearTimeout(this.reconnectTimer), this.ws && (this.ws.onclose = null, this.ws.close(), this.ws = null);
  }
  get connected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
function Fs(e2, t2) {
  const n2 = new Set;
  let r2 = false;
  const i2 = t2?.useUnifiedAccount !== false;
  async function o2(t3, n3, r3) {
    const i3 = new Date().toISOString(), o3 = r3 ? JSON.stringify(r3) : "", s3 = await Rs(e2.apiSecret, i3, t3, n3, o3), a2 = { "OK-ACCESS-KEY": e2.apiKey, "OK-ACCESS-SIGN": s3, "OK-ACCESS-TIMESTAMP": i3, "OK-ACCESS-PASSPHRASE": e2.passphrase, "Content-Type": "application/json" }, l2 = await fetch(`${As}${n3}`, { method: t3, headers: a2, ...t3 === "POST" && r3 ? { body: o3 } : {} });
    if (!l2.ok) {
      const e3 = await l2.text();
      throw new Error(`OKX ${t3} ${n3} error: ${l2.status} – ${e3}`);
    }
    const c2 = await l2.json();
    if (c2.code !== "0")
      throw new Error(`OKX API error: ${c2.code} – ${c2.msg}`);
    return c2.data;
  }
  async function s2(e3) {
    const t3 = await fetch(`${As}${e3}`, { headers: { "Content-Type": "application/json" } });
    if (!t3.ok)
      throw new Error(`OKX public error: ${t3.status}`);
    const n3 = await t3.json();
    if (n3.code !== "0")
      throw new Error(`OKX public error: ${n3.code}`);
    return n3.data;
  }
  return { async getFundingRates(e3) {
    const t3 = [];
    for (const n3 of e3) {
      const e4 = Ts(n3, "SWAP");
      try {
        const r3 = await s2(`/api/v5/public/funding-rate?instId=${e4}`);
        r3?.[0] && t3.push({ pair: n3, rate: parseFloat(r3[0].fundingRate), nextFundingTime: parseInt(r3[0].nextFundingTime, 10) });
      } catch {}
    }
    return t3;
  }, async placeSpotOrder(e3) {
    const t3 = Ts(e3.pair, "SPOT"), n3 = await o2("POST", "/api/v5/trade/order", { instId: t3, tdMode: "cash", side: e3.side, ordType: e3.orderType === "limit" ? "limit" : "market", sz: String(e3.sizeUsd), ...e3.limitPrice ? { px: String(e3.limitPrice) } : {} }), r3 = n3?.[0];
    if (!r3 || r3.sCode !== "0")
      return { orderId: "", filledSize: 0, avgPrice: 0, status: "rejected" };
    const i3 = await o2("GET", `/api/v5/trade/order?instId=${t3}&ordId=${r3.ordId}`), s3 = i3?.[0];
    return { orderId: r3.ordId, filledSize: parseFloat(s3?.fillSz ?? "0"), avgPrice: parseFloat(s3?.avgPx ?? "0"), status: s3?.state === "filled" ? "filled" : s3?.state === "partially_filled" ? "partial" : "rejected" };
  }, async placePerpOrder(e3) {
    const t3 = Ts(e3.pair, "SWAP"), s3 = e3.pair.split("/")[0];
    i2 && await async function() {
      if (!r2)
        try {
          const e4 = await o2("GET", "/api/v5/account/config"), t4 = e4?.[0];
          if (t4) {
            const e5 = parseInt(t4.acctLv, 10);
            e5 < 3 && console.warn(`OKX account mode is "${e5}" (Simple/Single-ccy). For coin-margined delta-neutral arb, you MUST set your account to Multi-currency margin mode (3) or Portfolio margin mode (4) via the OKX web UI. Go to: Trading → Account Mode → Multi-currency margin.`);
          }
          r2 = true;
        } catch {
          r2 = true;
        }
    }(), await async function(e4, t4) {
      const r3 = `${e4}:${t4}`;
      if (!n2.has(r3))
        try {
          await o2("POST", "/api/v5/account/set-leverage", { instId: e4, lever: "1", mgnMode: "cross", ccy: t4 }), n2.add(r3);
        } catch (t5) {
          console.warn(`OKX leverage setup failed for ${e4}:`, t5), n2.add(r3);
        }
    }(t3, s3);
    const a2 = await o2("POST", "/api/v5/trade/order", { instId: t3, tdMode: "cross", ccy: s3, side: e3.side, posSide: e3.side === "sell" ? "short" : "long", ordType: e3.orderType === "limit" ? "limit" : "market", sz: String(e3.sizeUsd), ...e3.reduceOnly ? { reduceOnly: true } : {}, ...e3.limitPrice ? { px: String(e3.limitPrice) } : {} }), l2 = a2?.[0];
    if (!l2 || l2.sCode !== "0")
      return { orderId: "", filledSize: 0, avgPrice: 0, status: "rejected" };
    const c2 = await o2("GET", `/api/v5/trade/order?instId=${t3}&ordId=${l2.ordId}`), d2 = c2?.[0];
    return { orderId: l2.ordId, filledSize: parseFloat(d2?.fillSz ?? "0"), avgPrice: parseFloat(d2?.avgPx ?? "0"), status: d2?.state === "filled" ? "filled" : d2?.state === "partially_filled" ? "partial" : "rejected" };
  }, getPositions: async () => (await o2("GET", "/api/v5/account/positions") ?? []).map((e3) => ({ pair: e3.instId.replace("-SWAP", "").replace("-USD", "-USDT").replace("-", "/"), side: e3.posSide === "long" ? "long" : "short", size: Math.abs(parseFloat(e3.pos)), entryPrice: parseFloat(e3.avgPx), markPrice: parseFloat(e3.markPx), unrealizedPnl: parseFloat(e3.upl), instrument: e3.instType === "SWAP" ? "perp" : "spot" })), async cancelOrder(e3, t3) {
    const n3 = t3 ? Ts(t3, "SWAP") : "BTC-USD-SWAP";
    await o2("POST", "/api/v5/trade/cancel-order", { instId: n3, ordId: e3 });
  }, async getMarkPrices(e3) {
    const t3 = [];
    for (const n3 of e3)
      try {
        const e4 = Ts(n3, "SPOT"), r3 = Ts(n3, "SWAP"), [i3, o3] = await Promise.all([s2(`/api/v5/market/ticker?instId=${e4}`), s2(`/api/v5/market/ticker?instId=${r3}`)]);
        t3.push({ pair: n3, spotPrice: parseFloat(i3?.[0]?.last ?? "0"), perpPrice: parseFloat(o3?.[0]?.last ?? "0"), timestamp: Date.now() });
      } catch {}
    return t3;
  }, async getFundingHistory(e3, t3) {
    try {
      const n3 = await o2("GET", `/api/v5/account/bills?instType=SWAP&type=8&begin=${t3}&end=${Date.now()}`), r3 = new Set(e3);
      return (n3 ?? []).map((e4) => {
        const t4 = e4.instId.replace("-SWAP", "").replace("-USD", "-USDT").replace("-", "/");
        return r3.has(t4) ? { pair: t4, amount: parseFloat(e4.balChg), rate: 0, settledAt: parseInt(e4.ts, 10) } : null;
      }).filter((e4) => e4 !== null);
    } catch {
      return [];
    }
  }, async getOrderStatus(e3, t3) {
    try {
      const n3 = t3 ? `/api/v5/trade/order?ordId=${e3}&instId=${t3}` : `/api/v5/trade/order?ordId=${e3}`, r3 = await o2("GET", n3), i3 = r3?.[0];
      return i3 ? { orderId: i3.ordId, filledSize: parseFloat(i3.fillSz ?? "0"), avgPrice: parseFloat(i3.avgPx ?? "0"), status: i3.state === "filled" ? "filled" : i3.state === "partially_filled" ? "partial" : "rejected" } : { orderId: e3, filledSize: 0, avgPrice: 0, status: "rejected" };
    } catch {
      return { orderId: e3, filledSize: 0, avgPrice: 0, status: "rejected" };
    }
  }, async getFundingHistoryWs(t3, n3) {
    const r3 = new Set(t3);
    return new Promise((t4) => {
      const i3 = [];
      let o3 = null, s3 = false;
      const a2 = () => {
        if (!s3) {
          s3 = true;
          try {
            o3?.close();
          } catch {}
          t4(i3);
        }
      }, l2 = setTimeout(a2, 15000);
      try {
        o3 = new WebSocket("wss://ws.okx.com:8443/ws/v5/private"), o3.onopen = async () => {
          try {
            const t5 = String(Math.floor(Date.now() / 1000)), n4 = await Rs(e2.apiSecret, t5, "GET", "/users/self/verify", "");
            o3?.send(JSON.stringify({ op: "login", args: [{ apiKey: e2.apiKey, passphrase: e2.passphrase, timestamp: t5, sign: n4 }] }));
          } catch {
            clearTimeout(l2), a2();
          }
        }, o3.onmessage = (e3) => {
          try {
            const t5 = JSON.parse(String(e3.data));
            if (t5.event === "login" && t5.code === "0")
              return o3?.send(JSON.stringify({ op: "subscribe", args: [{ channel: "orders", instType: "SWAP" }] })), void o3?.send(JSON.stringify({ op: "subscribe", args: [{ channel: "balance_and_position" }] }));
            if (t5.arg?.channel === "balance_and_position" && t5.data) {
              for (const e4 of t5.data) {
                const t6 = e4.posData ?? [];
                for (const e5 of t6) {
                  if (!e5.instId || !e5.upl)
                    continue;
                  const t7 = e5.instId.replace("-SWAP", "").replace("-USD", "-USDT").replace("-", "/");
                  if (!r3.has(t7))
                    continue;
                  const o4 = parseInt(e5.uTime ?? String(Date.now()), 10);
                  o4 < n3 || i3.push({ pair: t7, amount: parseFloat(e5.upl ?? "0"), rate: 0, settledAt: o4 });
                }
              }
              i3.length > 0 && (clearTimeout(l2), a2());
            }
          } catch {}
        }, o3.onerror = () => {
          clearTimeout(l2), a2();
        }, o3.onclose = () => {
          clearTimeout(l2), a2();
        };
      } catch {
        clearTimeout(l2), a2();
      }
    });
  }, async transferToSpot(e3) {
    if (i2)
      return true;
    try {
      if (await o2("POST", "/api/v5/asset/transfer", { ccy: "USDT", amt: e3.amountUsd.toFixed(4), from: "18", to: "6", type: "0" }), e3.asset !== "USDT" && e3.asset !== "USD") {
        const t3 = `${e3.asset}-USDT`;
        await o2("POST", "/api/v5/trade/order", { instId: t3, tdMode: "cash", side: "buy", ordType: "market", sz: e3.amountUsd.toFixed(4), tgtCcy: "quote_ccy" });
      }
      return true;
    } catch (e4) {
      return console.warn("OKX transfer to spot failed:", e4), false;
    }
  }, async getSettlementBalance(e3) {
    try {
      const t3 = e3 === "USD" ? "USDT" : e3;
      if (i2) {
        const e4 = await o2("GET", `/api/v5/account/balance?ccy=${t3}`), n3 = e4?.[0]?.details?.find((e5) => e5.ccy === t3);
        return parseFloat(n3?.availEq ?? n3?.cashBal ?? "0");
      }
      {
        const e4 = await o2("GET", `/api/v5/asset/balances?ccy=${t3}`), n3 = e4?.find((e5) => e5.ccy === t3);
        return parseFloat(n3?.availBal ?? "0");
      }
    } catch {
      return 0;
    }
  }, async validateKeys() {
    try {
      const e3 = await o2("GET", "/api/v5/account/config");
      return Array.isArray(e3) && e3.length !== 0 ? { ok: true } : { ok: false, reason: "OKX account/config returned empty payload" };
    } catch (e3) {
      return { ok: false, reason: e3 instanceof Error ? e3.message : String(e3) };
    }
  } };
}
function Os(e2) {
  async function t2(e3) {
    const t3 = await fetch(`${As}${e3}`, { headers: { "Content-Type": "application/json" } });
    if (!t3.ok)
      throw new Error(`OKX public error: ${t3.status}`);
    const n2 = await t3.json();
    if (n2.code !== "0")
      throw new Error(`OKX public error: ${n2.code}`);
    return n2.data;
  }
  return { async getFundingRates(e3) {
    const n2 = [];
    for (const r2 of e3) {
      const e4 = Ts(r2, "SWAP");
      try {
        const i2 = await t2(`/api/v5/public/funding-rate?instId=${e4}`);
        i2?.[0] && n2.push({ pair: r2, rate: parseFloat(i2[0].fundingRate), nextFundingTime: parseInt(i2[0].nextFundingTime, 10) });
      } catch {}
    }
    return n2;
  }, placeSpotOrder: async (e3) => ({ orderId: `dry-spot-${Date.now()}`, filledSize: e3.sizeUsd, avgPrice: e3.limitPrice ?? 0, status: "filled" }), placePerpOrder: async (e3) => ({ orderId: `dry-perp-${Date.now()}`, filledSize: e3.sizeUsd, avgPrice: e3.limitPrice ?? 0, status: "filled" }), getPositions: async () => [], async cancelOrder(e3, t3) {}, async getMarkPrices(e3) {
    const n2 = [];
    for (const r2 of e3)
      try {
        const e4 = Ts(r2, "SPOT"), i2 = Ts(r2, "SWAP"), [o2, s2] = await Promise.all([t2(`/api/v5/market/ticker?instId=${e4}`), t2(`/api/v5/market/ticker?instId=${i2}`)]);
        n2.push({ pair: r2, spotPrice: parseFloat(o2?.[0]?.last ?? "0"), perpPrice: parseFloat(s2?.[0]?.last ?? "0"), timestamp: Date.now() });
      } catch {}
    return n2;
  }, transferToSpot: async () => true, getSettlementBalance: async () => Infinity, getFundingHistory: async () => [], getOrderStatus: async (e3) => ({ orderId: e3, filledSize: 0, avgPrice: 0, status: "filled" }), validateKeys: async () => ({ ok: true }) };
}

class zs {
  constructor(e2 = b) {
    this.migrationDone = false, this.key = e2;
  }
  async save(e2) {
    try {
      const t2 = JSON.stringify(e2);
      localStorage.setItem(this.key, t2);
    } catch {}
  }
  async load() {
    try {
      this.migrationDone || (this.migrationDone = true, this.migrateLegacyKeys());
      const e2 = localStorage.getItem(this.key);
      if (!e2)
        return null;
      const t2 = JSON.parse(e2);
      return t2.version !== 5 && t2.version !== 4 ? (await this.clear(), null) : { ...t2, version: 5, isRunning: t2.isRunning ?? false };
    } catch {
      return await this.clear(), null;
    }
  }
  async clear() {
    try {
      localStorage.removeItem(this.key);
    } catch {}
  }
  migrateLegacyKeys() {
    if (!localStorage.getItem(this.key))
      for (const e2 of w)
        try {
          const t2 = localStorage.getItem(e2);
          if (!t2)
            continue;
          const n2 = JSON.parse(t2);
          return localStorage.setItem(this.key, JSON.stringify({ ...n2, version: 5, isRunning: n2.isRunning ?? false })), void localStorage.removeItem(e2);
        } catch {
          try {
            localStorage.removeItem(e2);
          } catch {}
        }
  }
}
var Ns = ["BTC/USDT", "ETH/USDT", "OP/USDT", "SOL/USDT", "XRP/USDT", "HYPE/USDT"];
var $s = { dryRun: true, targetExchange: "hyperliquid", pairs: ["BTC/USDT", "ETH/USDT"], minFundingRatePct: 0.01, positionSizeUsd: 1e4, maxHoldDays: 180, marginHealthThresholdPct: 50, capitalAllocationPct: 50, rebalanceDays: 0, maxDailyLossUsd: 5000, maxSlippagePct: 0.5, scanIntervalSecs: 60, usePortfolioMargin: true, useUnifiedAccount: true, useCapitalAllocation: false, assetAllocations: {}, yieldMode: "sweep", compoundMinPct: 50 };
var Bs = "fra-ui-settings";
var Ls = "fra-engine-config";
var Ds = { theme: "dark", configOpen: false };
function _s() {
  try {
    const e2 = localStorage.getItem(Bs);
    if (!e2)
      return { ...Ds };
    const t2 = JSON.parse(e2);
    return { ...Ds, ...t2 };
  } catch {
    return { ...Ds };
  }
}
function Ms(e2) {
  try {
    localStorage.setItem(Ls, JSON.stringify(e2));
  } catch {}
}
var Ws = null;
function Hs(e2 = {}, t2, n2, r2, c2) {
  const [d2, u2] = import_react.useState(() => ({ ...function() {
    try {
      const e3 = localStorage.getItem(Ls);
      if (!e3)
        return { ...$s };
      const t3 = JSON.parse(e3);
      return { ...$s, ...t3 };
    } catch {
      return { ...$s };
    }
  }(), ...t2 })), [h2, p2] = import_react.useState(false), [f2, g2] = import_react.useState({ phase: "idle", positions: [], fundingRates: [], totalFundingCollected: 0, totalRealizedPnl: 0, totalExecutionCost: 0, lastScanAt: null, errors: [] }), [y2, m2] = import_react.useState([]), [b2, w2] = import_react.useState([]), v = import_react.useRef(null), x2 = import_react.useRef(false), S2 = import_react.useRef(n2);
  S2.current = n2;
  const P2 = import_react.useRef(r2);
  P2.current = r2;
  const E2 = import_react.useMemo(() => c2 ?? (Ws || (Ws = new zs), Ws), [c2]), k2 = import_react.useMemo(() => {
    if (d2.targetExchange === "hyperliquid") {
      if (e2.hyperliquid)
        return Is(e2.hyperliquid, d2);
      if (d2.dryRun)
        return Cs();
    }
    if (d2.targetExchange === "okx") {
      if (e2.okx)
        return Fs(e2.okx, d2);
      if (d2.dryRun)
        return Os();
    }
    return null;
  }, [d2.targetExchange, d2.dryRun, e2, d2.usePortfolioMargin, d2.useUnifiedAccount]);
  import_react.useEffect(() => {
    if (!k2)
      return;
    const e3 = new C(d2, k2, E2);
    v.current = e3;
    const t3 = e3.subscribe((t4) => {
      g2(t4), m2(e3.getPnlHistory()), w2(e3.getZScoreWarmup());
    }), n3 = e3.onExecution((t4) => {
      S2.current?.(t4), t4.type === "pnl_snapshot" && m2(e3.getPnlHistory()), t4.type === "error" && P2.current?.(new Error(String(t4.data.error)));
    });
    return x2.current ? e3.start() : E2.load().then((t4) => {
      t4 && t4.isRunning && (x2.current = true, p2(true), e3.start());
    }), () => {
      e3.teardown(), t3(), n3();
    };
  }, [k2, E2]);
  const I2 = import_react.useCallback((e3) => {
    u2((t3) => {
      const n3 = { ...t3, ...e3 };
      return v.current?.updateConfig(n3), Ms(n3), n3;
    });
  }, []), A2 = import_react.useCallback(() => {
    x2.current = true, p2(true), v.current?.start();
  }, []), T2 = import_react.useCallback(() => {
    v.current?.stop(), x2.current = false, p2(false);
  }, []), R2 = import_react.useCallback(async () => {
    await v.current?.closeAllPositions();
  }, []);
  return { config: d2, state: f2, pnlHistory: y2, zScoreWarmup: b2, updateConfig: I2, start: A2, stop: T2, closeAllPositions: R2, adapter: k2, running: h2 };
}
function js(e2, t2, n2, r2 = "hyperliquid") {
  const [s2, c2] = import_react.useState([]), [d2, u2] = import_react.useState(false), [h2, p2] = import_react.useState(null), [f2, g2] = import_react.useState(false), y2 = import_react.useRef(null), m2 = import_react.useRef(null), b2 = import_react.useRef(new Map), w2 = import_react.useCallback(async () => {
    if (e2 && n2 && t2.length !== 0) {
      u2(true);
      try {
        const n3 = await e2.getFundingRates(t2);
        c2(n3), p2(null);
      } catch (e3) {
        p2(e3 instanceof Error ? e3.message : String(e3));
      } finally {
        u2(false);
      }
    }
  }, [e2, t2, n2]);
  return import_react.useEffect(() => {
    if (!n2 || t2.length === 0)
      return;
    const e3 = { onFundingRate: (e4, t3, n3) => {
      b2.current.set(e4, { pair: e4, rate: t3, nextFundingTime: n3 }), c2(Array.from(b2.current.values()));
    }, onConnect: () => {
      g2(true), p2(null), y2.current && (clearInterval(y2.current), y2.current = null);
    }, onDisconnect: () => {
      g2(false), n2 && !y2.current && (w2(), y2.current = setInterval(w2, 30000));
    }, onError: (e4) => {
      p2(e4.message);
    } };
    let i2;
    return i2 = r2 === "hyperliquid" ? new ks(e3) : new Us(e3), m2.current = i2, i2.connect(), i2.subscribeToFundingRates(t2), w2(), () => {
      i2.disconnect(), m2.current = null, y2.current && (clearInterval(y2.current), y2.current = null);
    };
  }, [n2, t2, r2, w2]), { rates: s2, loading: d2, error: h2, wsConnected: f2, refetch: w2 };
}
var Ks = ({ text: e2, children: r2, position: i2 = "top" }) => {
  const [o2, s2] = import_react.useState(false), c2 = import_react.useRef(null);
  return import_jsx_runtime.jsxs("div", { ref: c2, style: { position: "relative", display: "inline-flex", alignItems: "center" }, onMouseEnter: () => s2(true), onMouseLeave: () => s2(false), children: [r2, o2 && import_jsx_runtime.jsxs("div", { style: { position: "absolute", ...i2 === "top" ? { bottom: "100%", marginBottom: 6, left: "50%", transform: "translateX(-50%)" } : i2 === "bottom" ? { top: "100%", marginTop: 6, left: "50%", transform: "translateX(-50%)" } : i2 === "right" ? { left: "100%", marginLeft: 6, top: "50%", transform: "translateY(-50%)" } : { right: "100%", marginRight: 6, top: "50%", transform: "translateY(-50%)" }, padding: "8px 12px", fontSize: 12, lineHeight: 1.4, color: "var(--fra-heading, #f9fafb)", backgroundColor: "var(--fra-card, #1f2937)", border: "1px solid var(--fra-border, #374151)", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.4)", whiteSpace: "normal", width: 240, zIndex: 1e4, pointerEvents: "none" }, children: [e2, import_jsx_runtime.jsx("div", { style: { position: "absolute", ...i2 === "top" ? { left: "50%", transform: "translateX(-50%)", top: "100%", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid var(--fra-border, #374151)" } : i2 === "bottom" ? { left: "50%", transform: "translateX(-50%)", bottom: "100%", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "6px solid var(--fra-border, #374151)" } : i2 === "right" ? { top: "50%", transform: "translateY(-50%)", right: "100%", width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderRight: "6px solid var(--fra-border, #374151)" } : { top: "50%", transform: "translateY(-50%)", left: "100%", width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "6px solid var(--fra-border, #374151)" } } })] })] });
};
var Gs = ({ size: e2 = 14 }) => import_jsx_runtime.jsxs("svg", { width: e2, height: e2, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: { color: "var(--fra-muted, #9ca3af)", cursor: "help", flexShrink: 0 }, children: [import_jsx_runtime.jsx("circle", { cx: 12, cy: 12, r: 10 }), import_jsx_runtime.jsx("path", { d: "M12 16v-4" }), import_jsx_runtime.jsx("path", { d: "M12 8h.01" })] });
var Vs = ({ label: e2, value: r2, min: o2, max: s2, step: a2, unit: l2, formatValue: c2, onChange: d2, disabled: u2, tooltip: h2, tooltipPosition: p2 }) => {
  const f2 = c2 ? c2(r2) : `${r2}${l2 ?? ""}`, g2 = (r2 - o2) / (s2 - o2) * 100, y2 = import_react.useCallback((e3) => d2(parseFloat(e3.target.value)), [d2]);
  return import_jsx_runtime.jsxs("div", { style: { marginBottom: 12, opacity: u2 ? 0.5 : 1 }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, alignItems: "center" }, children: [import_jsx_runtime.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 5 }, children: [e2, h2 && import_jsx_runtime.jsx(Ks, { text: h2, position: p2, children: import_jsx_runtime.jsx(Gs, {}) })] }), import_jsx_runtime.jsx("span", { style: { fontWeight: 600 }, children: f2 })] }), import_jsx_runtime.jsx("input", { type: "range", min: o2, max: s2, step: a2, value: r2, onChange: y2, disabled: u2, style: { width: "100%", accentColor: "var(--fra-accent, #3b82f6)", background: `linear-gradient(to right, var(--fra-accent, #3b82f6) ${g2}%, var(--fra-track, #374151) ${g2}%)`, height: 6, borderRadius: 3, appearance: "none", cursor: u2 ? "not-allowed" : "pointer" } })] });
};
var qs = ({ label: r2, checked: i2, onChange: o2, disabled: s2, offLabel: a2, onLabel: l2, tooltip: c2, tooltipPosition: d2 }) => import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, opacity: s2 ? 0.5 : 1 }, children: [import_jsx_runtime.jsxs("span", { style: { fontSize: 13, display: "flex", alignItems: "center", gap: 5 }, children: [a2 && l2 ? import_jsx_runtime.jsxs(import_jsx_runtime.Fragment, { children: [import_jsx_runtime.jsx("span", { style: { opacity: i2 ? 0.5 : 1, fontWeight: i2 ? 400 : 600 }, children: a2 }), " / ", import_jsx_runtime.jsx("span", { style: { opacity: i2 ? 1 : 0.5, fontWeight: i2 ? 600 : 400 }, children: l2 })] }) : r2, c2 && import_jsx_runtime.jsx(Ks, { text: c2, position: d2, children: import_jsx_runtime.jsx(Gs, {}) })] }), import_jsx_runtime.jsx("button", { type: "button", role: "switch", "aria-checked": i2, "aria-label": r2, disabled: s2, onClick: () => o2(!i2), style: { width: 44, height: 24, borderRadius: 12, border: "none", backgroundColor: i2 ? "var(--fra-accent, #3b82f6)" : "var(--fra-track, #374151)", position: "relative", cursor: s2 ? "not-allowed" : "pointer", transition: "background-color 0.2s", flexShrink: 0 }, children: import_jsx_runtime.jsx("span", { style: { display: "block", width: 18, height: 18, borderRadius: "50%", backgroundColor: "var(--fra-thumb, #fff)", position: "absolute", top: 3, left: i2 ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" } }) })] });
var Ys = "fra-exchange-keys";
function Js(e2) {
  try {
    localStorage.setItem(Ys, JSON.stringify(e2));
  } catch {}
}
function Zs(e2, t2) {
  return t2 === "hyperliquid" ? !!e2.hyperliquid?.apiKey : !!(e2.okx?.apiKey && e2.okx?.apiSecret && e2.okx?.passphrase);
}
var Xs = ({ label: e2, value: r2, onChange: i2, disabled: o2 }) => {
  const [s2, a2] = import_react.useState(false);
  return import_jsx_runtime.jsxs("div", { style: { marginBottom: 10 }, children: [import_jsx_runtime.jsx("label", { style: { fontSize: 12, color: "var(--fra-muted, #9ca3af)", display: "block", marginBottom: 4 }, children: e2 }), import_jsx_runtime.jsxs("div", { style: { display: "flex", gap: 6 }, children: [import_jsx_runtime.jsx("input", { type: s2 ? "text" : "password", value: r2, onChange: (e3) => i2(e3.target.value), disabled: o2, style: { flex: 1, padding: "6px 10px", fontSize: 13, fontFamily: "monospace", borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "var(--fra-card, #1f2937)", color: "var(--fra-text, #d1d5db)", outline: "none" }, autoComplete: "off", spellCheck: false }), import_jsx_runtime.jsx("button", { type: "button", onClick: () => a2(!s2), style: { padding: "4px 8px", borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "transparent", color: "var(--fra-muted, #9ca3af)", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" }, children: s2 ? "Hide" : "Show" })] })] });
};
var Qs = ({ label: e2, value: r2 }) => {
  const [i2, o2] = import_react.useState(false), s2 = r2 && r2 !== "Invalid key";
  return import_jsx_runtime.jsxs("div", { style: { marginBottom: 10 }, children: [import_jsx_runtime.jsx("label", { style: { fontSize: 12, color: "var(--fra-muted, #9ca3af)", display: "block", marginBottom: 4 }, children: e2 }), import_jsx_runtime.jsxs("div", { style: { display: "flex", gap: 6 }, children: [import_jsx_runtime.jsx("input", { type: "text", value: r2, readOnly: true, style: { flex: 1, padding: "6px 10px", fontSize: 13, fontFamily: "monospace", borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "var(--fra-card-dim, #111827)", color: r2 === "Invalid key" ? "#ef4444" : "var(--fra-muted, #9ca3af)", outline: "none" }, tabIndex: -1 }), s2 && import_jsx_runtime.jsx("button", { type: "button", onClick: () => {
    s2 && navigator.clipboard.writeText(r2).then(() => {
      o2(true), setTimeout(() => o2(false), 1500);
    });
  }, style: { padding: "4px 8px", borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "transparent", color: i2 ? "#10b981" : "var(--fra-muted, #9ca3af)", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" }, children: i2 ? "Copied!" : "Copy" })] })] });
};
var ea = ({ exchangeKeys: r2, targetExchange: i2, onChange: o2, disabled: a2 }) => {
  const c2 = r2.hyperliquid || { apiKey: "", apiSecret: "" }, d2 = r2.okx || { apiKey: "", apiSecret: "", passphrase: "" }, u2 = import_react.useMemo(() => {
    const e2 = c2.apiKey.trim();
    if (!e2)
      return "";
    try {
      return new us(e2).address;
    } catch {
      return "Invalid key";
    }
  }, [c2.apiKey]), h2 = (e2, t2) => {
    const n2 = { ...r2, okx: { ...d2, [e2]: t2 } };
    o2(n2), Js(n2);
  }, p2 = Zs(r2, i2), f2 = i2 === "hyperliquid" ? p2 ? "Wallet configured" : "No wallet configured" : p2 ? "Keys configured" : "No keys configured", [g2, y2] = import_react.useState(false), [m2, b2] = import_react.useState(null);
  return import_jsx_runtime.jsxs("div", { children: [import_jsx_runtime.jsxs(import_jsx_runtime.Fragment, i2 === "hyperliquid" ? { children: [import_jsx_runtime.jsx(Xs, { label: "Wallet Private Key", value: c2.apiKey, onChange: (e2) => ((e3, t2) => {
    const n2 = { ...r2, hyperliquid: { ...c2, [e3]: t2 } };
    o2(n2), Js(n2);
  })("apiKey", e2), disabled: a2 }), import_jsx_runtime.jsx(Qs, { label: "Wallet Address", value: u2 })] } : { children: [import_jsx_runtime.jsx(Xs, { label: "API Key", value: d2.apiKey, onChange: (e2) => h2("apiKey", e2), disabled: a2 }), import_jsx_runtime.jsx(Xs, { label: "API Secret", value: d2.apiSecret, onChange: (e2) => h2("apiSecret", e2), disabled: a2 }), import_jsx_runtime.jsx(Xs, { label: "Passphrase", value: d2.passphrase, onChange: (e2) => h2("passphrase", e2), disabled: a2 })] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, gap: 8, flexWrap: "wrap" }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--fra-muted, #9ca3af)" }, children: [import_jsx_runtime.jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", backgroundColor: p2 ? "#10b981" : "#6b7280", display: "inline-block" } }), f2] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", gap: 6 }, children: [p2 && import_jsx_runtime.jsx("button", { type: "button", onClick: async () => {
    if (p2 && !a2) {
      y2(true), b2(null);
      try {
        let e2;
        if (e2 = i2 === "hyperliquid" ? Is({ apiKey: c2.apiKey, apiSecret: c2.apiSecret }) : Fs({ apiKey: d2.apiKey, apiSecret: d2.apiSecret, passphrase: d2.passphrase }), e2.validateKeys) {
          const t2 = await e2.validateKeys();
          b2(t2.ok ? { ok: true } : { ok: false, reason: t2.reason });
        } else
          b2({ ok: false, reason: "Adapter does not support validateKeys" });
      } catch (e2) {
        b2({ ok: false, reason: e2 instanceof Error ? e2.message : String(e2) });
      } finally {
        y2(false);
      }
    }
  }, disabled: a2 || g2, style: { padding: "4px 10px", borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "transparent", color: "var(--fra-text, #d1d5db)", cursor: g2 ? "wait" : "pointer", fontSize: 11, fontWeight: 600 }, children: g2 ? "Testing…" : "Test connection" }), p2 && import_jsx_runtime.jsx("button", { type: "button", onClick: () => {
    o2({}), function() {
      try {
        localStorage.removeItem(Ys);
      } catch {}
    }();
  }, disabled: a2, style: { padding: "4px 10px", borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "transparent", color: "#ef4444", cursor: "pointer", fontSize: 11, fontWeight: 600 }, children: "Clear Keys" })] })] }), m2 && import_jsx_runtime.jsx("div", { role: "status", style: { marginTop: 8, padding: "6px 10px", borderRadius: 6, fontSize: 11, backgroundColor: m2.ok ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: m2.ok ? "#10b981" : "#ef4444", border: "1px solid " + (m2.ok ? "#10b981" : "#ef4444") }, children: m2.ok ? "✓ Connection successful — credentials are valid." : `✗ ${m2.reason ?? "Connection failed"}` })] });
};
function ta(e2) {
  const t2 = Math.abs(e2), n2 = e2 < 0 ? "-" : "";
  return t2 >= 1e9 ? `${n2}$${(t2 / 1e9).toFixed(1)}b` : t2 >= 1e6 ? `${n2}$${(t2 / 1e6).toFixed(1)}m` : t2 >= 1000 ? `${n2}$${(t2 / 1000).toFixed(1)}k` : `${n2}$${t2.toFixed(2)}`;
}
function na(e2) {
  const t2 = Math.abs(e2), n2 = e2 < 0 ? "-" : "";
  return t2 >= 1e9 ? `${n2}${(t2 / 1e9).toFixed(1)}b` : t2 >= 1e6 ? `${n2}${(t2 / 1e6).toFixed(1)}m` : t2 >= 1000 ? `${n2}${(t2 / 1000).toFixed(1)}k` : `${n2}${t2.toFixed(2)}`;
}
function ra(e2) {
  return `${e2 >= 0 ? "+" : ""}${ta(e2)}`;
}
var ia = 1096065;
async function oa(e2, t2) {
  try {
    return (await fetch(e2, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(t2) })).ok;
  } catch {
    return false;
  }
}
function sa(e2) {
  return { username: "FRA Engine", embeds: [{ ...e2, footer: e2.footer ?? { text: "Funding Rate Arbitrage Engine" }, timestamp: e2.timestamp ?? new Date().toISOString() }] };
}
var aa = ({ title: e2, defaultOpen: r2 = false, children: i2 }) => {
  const [o2, s2] = import_react.useState(r2);
  return import_jsx_runtime.jsxs("div", { style: { marginBottom: 12 }, children: [import_jsx_runtime.jsxs("button", { type: "button", onClick: () => s2(!o2), style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", border: "none", background: "none", color: "var(--fra-heading, #f9fafb)", fontSize: 13, fontWeight: 600, cursor: "pointer", borderBottom: "1px solid var(--fra-border, #374151)" }, children: [e2, import_jsx_runtime.jsx("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: { transform: o2 ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }, children: import_jsx_runtime.jsx("polyline", { points: "6 9 12 15 18 9" }) })] }), o2 && import_jsx_runtime.jsx("div", { style: { paddingTop: 10 }, children: i2 })] });
};
var la = { "BTC/USDT": "Bitcoin — highest liquidity, tightest spreads. Ideal for large position sizes with minimal slippage.", "ETH/USDT": "Ethereum — second-highest liquidity. Strong funding rate differentials during volatile periods.", "OP/USDT": "Optimism — mid-cap L2 token. Higher funding rate swings but lower liquidity; size positions carefully.", "SOL/USDT": "Solana — high-volatility L1 token. Can produce large funding rate opportunities but wider spreads.", "XRP/USDT": "Ripple — established large-cap. Moderate funding rate opportunities with decent liquidity.", "HYPE/USDT": "HYPE — Hyperliquid native token. Strong liquidity on HL with consistent funding rate opportunities." };
var ca = (e2) => e2.split("/")[0];
var da = ({ config: e2, onChange: r2, exchangeKeys: i2, onKeysChange: o2, disabled: s2, fundingRates: a2 = [], liveBalance: l2 }) => {
  const c2 = new Map(a2.map((e3) => [e3.pair, e3.rate])), d2 = e2.pairs, u2 = e2.dryRun ? e2.positionSizeUsd * d2.length : l2 != null ? l2 : e2.positionSizeUsd * d2.length, h2 = e2.assetAllocations ?? {}, p2 = d2.reduce((e3, t2) => e3 + (h2[t2] ?? 0), 0), f2 = u2 - p2;
  return import_jsx_runtime.jsxs("div", { style: { padding: 16 }, children: [import_jsx_runtime.jsxs("div", { style: { padding: "8px 0", marginBottom: 8, fontSize: 11, color: "var(--fra-muted, #9ca3af)", display: "flex", alignItems: "center", gap: 6 }, children: [import_jsx_runtime.jsx("span", { style: { color: "#10b981", fontWeight: 700 }, children: "✓" }), e2.yieldMode === "compound" ? "Yield auto-compounds into position size" : "Yield sweep to spot is automatic on position close"] }), import_jsx_runtime.jsx(qs, { label: "Dry Run", checked: e2.dryRun, onChange: (e3) => r2({ dryRun: e3 }), disabled: s2, tooltip: "When enabled, the engine simulates all trades without placing real orders on the exchange. Useful for testing strategies, verifying configuration, and observing how the engine behaves before risking real capital. All P&L shown will be simulated.", tooltipPosition: "right" }), e2.dryRun && import_jsx_runtime.jsxs("div", { style: { padding: "10px 12px", marginBottom: 12, borderRadius: 8, backgroundColor: "var(--fra-card, #1f2937)", border: "1px solid var(--fra-border, #374151)" }, children: [import_jsx_runtime.jsx("div", { style: { fontSize: 11, fontWeight: 600, color: "var(--fra-muted, #9ca3af)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }, children: "Simulation Settings" }), import_jsx_runtime.jsx(Vs, { label: "Dry-Run Position Size", value: e2.positionSizeUsd, min: 1000, max: 1e5, step: 1000, formatValue: (e3) => ta(e3), onChange: (e3) => r2({ positionSizeUsd: e3 }), disabled: s2, tooltip: "The simulated USD notional value for each dry-run position. This also determines the simulated spot balance the engine uses to calculate paper P&L and funding accrual.", tooltipPosition: "right" }), import_jsx_runtime.jsx(Vs, { label: "Dry-Run Daily Loss", value: e2.maxDailyLossUsd, min: 500, max: 50000, step: 500, formatValue: (e3) => ta(e3), onChange: (e3) => r2({ maxDailyLossUsd: e3 }), disabled: s2, tooltip: "Informational daily capital budget for the simulation. Used for paper-trading bookkeeping only — no circuit-breaker logic is applied since the delta-neutral structure is inherently market-neutral." })] }), !e2.dryRun && import_jsx_runtime.jsx(aa, { title: import_jsx_runtime.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: ["Position Sizing", import_jsx_runtime.jsx(Ks, { text: "Controls how much capital the engine deploys per trade and in total. Larger positions earn more funding but carry higher liquidation risk.", children: import_jsx_runtime.jsx(Gs, {}) })] }), children: import_jsx_runtime.jsx(Vs, { label: "Position Size", value: e2.positionSizeUsd, min: 1000, max: 1e5, step: 1000, formatValue: (e3) => ta(e3), onChange: (e3) => r2({ positionSizeUsd: e3 }), disabled: s2 || e2.useCapitalAllocation, tooltip: e2.useCapitalAllocation ? "Disabled — per-asset allocations override this global value. Adjust individual asset sliders in the Trading Pairs section." : "The USD notional value of each individual arbitrage position (one spot leg + one perp leg). A $10,000 position means ~$10k long spot and ~$10k short perp opened simultaneously." }) }), import_jsx_runtime.jsxs(aa, { title: import_jsx_runtime.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: ["Engine Settings", import_jsx_runtime.jsx(Ks, { text: "Scan frequency, exchange selection, execution mode, and API keys.", children: import_jsx_runtime.jsx(Gs, {}) })] }), children: [import_jsx_runtime.jsx(Vs, { label: "Scan Interval", value: e2.scanIntervalSecs, min: 10, max: 300, step: 5, formatValue: (e3) => e3 >= 60 ? `${(e3 / 60).toFixed(e3 % 60 == 0 ? 0 : 1)}m` : `${e3}s`, onChange: (e3) => r2({ scanIntervalSecs: e3 }), disabled: s2, tooltip: "How often the engine fetches funding rates, updates P&L, and evaluates entry/exit conditions. Range: 10 seconds to 5 minutes. Shorter intervals react faster to funding rate changes but generate more API calls. The default 60s is a good balance between responsiveness and rate-limit safety.", tooltipPosition: "right" }), import_jsx_runtime.jsxs("div", { style: { marginTop: 4, marginBottom: 12 }, children: [import_jsx_runtime.jsxs("div", { style: { fontSize: 11, fontWeight: 600, color: "var(--fra-muted, #9ca3af)", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }, children: ["Discord Notifications", import_jsx_runtime.jsx(Ks, { text: "Paste a Discord webhook URL to receive real-time notifications for position opens, closes, margin warnings, and daily P&L summaries. Create a webhook in your Discord channel settings → Integrations → Webhooks.", children: import_jsx_runtime.jsx(Gs, {}) }), e2.discordWebhookUrl && import_jsx_runtime.jsx("span", { style: { width: 7, height: 7, borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block" } })] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", gap: 6, alignItems: "center" }, children: [import_jsx_runtime.jsx("input", { type: "url", placeholder: "https://discord.com/api/webhooks/...", value: e2.discordWebhookUrl ?? "", onChange: (e3) => r2({ discordWebhookUrl: e3.target.value || undefined }), disabled: s2, style: { flex: 1, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "var(--fra-card, #1f2937)", color: "var(--fra-text, #d1d5db)", fontSize: 12, fontFamily: "monospace", outline: "none" } }), import_jsx_runtime.jsx("button", { type: "button", disabled: s2 || !e2.discordWebhookUrl, onClick: async () => {
    if (!e2.discordWebhookUrl)
      return;
    const t2 = await async function(e3) {
      return oa(e3, sa({ title: "\uD83D\uDD14 FRA Engine — Test Notification", description: "Your Discord webhook is connected successfully! You will receive notifications for position events, margin warnings, and daily P&L summaries.", color: 9133302, fields: [{ name: "Status", value: "✅ Connected", inline: true }] }));
    }(e2.discordWebhookUrl);
    alert(t2 ? "✅ Test notification sent!" : "❌ Failed — check the webhook URL.");
  }, style: { padding: "6px 10px", borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "transparent", color: e2.discordWebhookUrl ? "#8b5cf6" : "var(--fra-muted, #6b7280)", fontSize: 11, fontWeight: 600, cursor: e2.discordWebhookUrl ? "pointer" : "not-allowed", opacity: e2.discordWebhookUrl ? 1 : 0.5, whiteSpace: "nowrap" }, children: "Test" })] })] }), import_jsx_runtime.jsxs("div", { style: { marginTop: 4, marginBottom: 12 }, children: [import_jsx_runtime.jsx(qs, { label: "Yield Mode", checked: e2.yieldMode === "compound", onChange: (e3) => r2({ yieldMode: e3 ? "compound" : "sweep" }), offLabel: "Sweep", onLabel: "Compound", disabled: s2, tooltip: "Sweep sends realized funding yield to your spot wallet on position close. Compound reinvests yield back into open positions, increasing their size for higher future accrual.", tooltipPosition: "right" }), e2.yieldMode === "compound" && import_jsx_runtime.jsx("div", { style: { marginTop: 4 }, children: import_jsx_runtime.jsx(Vs, { label: "Min. Compound Threshold", value: e2.compoundMinPct, min: 5, max: 100, step: 5, formatValue: (e3) => `${e3}%`, onChange: (e3) => r2({ compoundMinPct: e3 }), disabled: s2, tooltip: "Minimum accumulated funding yield as a percentage of position value before it gets reinvested into the position. Lower values compound more frequently with smaller amounts.", tooltipPosition: "right" }) })] }), import_jsx_runtime.jsx(qs, { label: "Target Exchange", checked: e2.targetExchange === "okx", onChange: (e3) => r2({ targetExchange: e3 ? "okx" : "hyperliquid" }), offLabel: "Hyperliquid", onLabel: "OKX", disabled: s2, tooltip: "Select which exchange to run the delta-neutral arbitrage on. Hyperliquid is an on-chain DEX with lower fees and EIP-712 signing. OKX is a centralized exchange with deeper liquidity. You need valid API keys for the selected exchange.", tooltipPosition: "right" }), (() => {
    const n2 = e2.targetExchange === "hyperliquid" ? e2.usePortfolioMargin : e2.useUnifiedAccount, i3 = e2.targetExchange === "hyperliquid" ? "Portfolio Margin" : "Unified Account", o3 = n2 ? e2.targetExchange === "hyperliquid" ? "Portfolio Margin mode: unifies spot and perp under a single cross-margined pool, making the delta-neutral position effectively unliquidatable. Capital allocation and rebalancing are disabled — the exchange handles margin natively." : "Unified Account mode: spot, futures, and perp positions share a single margin pool. Funding yields settle directly in the collateral asset. Capital allocation and rebalancing are disabled." : "Capital Allocation mode: each asset gets its own position size slider. You control exactly how much capital each pair receives. Rebalancing is available to periodically correct hedge ratio drift.";
    return import_jsx_runtime.jsx(qs, { label: "Execution Mode", checked: !n2, onChange: (t2) => {
      const n3 = {};
      if (e2.targetExchange === "hyperliquid" ? n3.usePortfolioMargin = !t2 : n3.useUnifiedAccount = !t2, t2) {
        if (n3.useCapitalAllocation = true, (e2.rebalanceDays ?? 0) === 0 && (n3.rebalanceDays = 7), Object.keys(h2).length === 0 && d2.length > 0) {
          const e3 = 1000 * Math.floor(u2 / d2.length / 1000), t3 = {};
          for (const n4 of d2)
            t3[n4] = e3;
          n3.assetAllocations = t3;
        }
      } else
        n3.useCapitalAllocation = false, n3.rebalanceDays = 0;
      r2(n3);
    }, disabled: s2, offLabel: i3, onLabel: "Capital Alloc", tooltip: o3, tooltipPosition: "bottom" });
  })(), i2 && o2 && import_jsx_runtime.jsxs("div", { style: { marginTop: 8 }, children: [import_jsx_runtime.jsxs("div", { style: { fontSize: 11, fontWeight: 600, color: "var(--fra-muted, #9ca3af)", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }, children: ["Exchange Keys", import_jsx_runtime.jsx(Ks, { text: "Your exchange API credentials. Required for live trading. Keys are stored locally in your browser and never sent to any third-party server.", position: "right", children: import_jsx_runtime.jsx(Gs, {}) }), import_jsx_runtime.jsx("span", { style: { width: 7, height: 7, borderRadius: "50%", backgroundColor: Zs(i2, e2.targetExchange) ? "#10b981" : "#6b7280", display: "inline-block" } })] }), import_jsx_runtime.jsx(ea, { exchangeKeys: i2, targetExchange: e2.targetExchange, onChange: o2, disabled: s2 })] })] }), import_jsx_runtime.jsxs(aa, { title: import_jsx_runtime.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: ["Risk Controls", import_jsx_runtime.jsx(Ks, { text: "Safety parameters that limit downside risk. These controls can prevent the engine from opening new positions or force it to exit existing ones.", children: import_jsx_runtime.jsx(Gs, {}) })] }), children: [import_jsx_runtime.jsx(Vs, { label: "Min Funding Rate", value: e2.minFundingRatePct, min: 0.001, max: 2, step: 0.001, formatValue: (e3) => `${e3.toFixed(3)}%`, onChange: (e3) => r2({ minFundingRatePct: e3 }), disabled: s2, tooltip: "The minimum funding rate (in %) required before the engine will open a new position. Range: 0.001% to 2%. Higher values mean fewer but more profitable trades. At 0.001%, the engine enters almost any positive funding opportunity. At 2%, only extreme funding spikes trigger entries." }), import_jsx_runtime.jsx(Vs, { label: "Max Hold Time", value: e2.maxHoldDays, min: 90, max: 1095, step: 90, formatValue: (e3) => `${e3}d`, onChange: (e3) => r2({ maxHoldDays: e3 }), disabled: s2, tooltip: "Maximum number of days a position can stay open before the engine automatically closes it. Prevents capital from being locked indefinitely in positions where funding rates have normalized. Range: 90 days (3 months) to 1,095 days (3 years)." }), import_jsx_runtime.jsx(Vs, { label: "Margin Health Threshold", value: e2.marginHealthThresholdPct, min: 10, max: 200, step: 5, formatValue: (e3) => `${e3}%`, onChange: (e3) => r2({ marginHealthThresholdPct: e3 }), disabled: s2, tooltip: "Margin health warning threshold (%). The engine monitors the ratio of spot collateral value to perp notional. When it drops below this threshold, a warning event is emitted — but the position is NEVER force-closed. The delta-neutral structure ensures positions are inherently unliquidatable since spot collateral backs the perp." }), import_jsx_runtime.jsx(Vs, { label: "Max Slippage", value: e2.maxSlippagePct, min: 0.01, max: 5, step: 0.01, formatValue: (e3) => `${e3.toFixed(2)}%`, onChange: (e3) => r2({ maxSlippagePct: e3 }), disabled: s2, tooltip: "Maximum tolerated slippage (%). All entry and exit orders use limit prices derived from mark price ± this tolerance. For a BUY, the limit is set at mark × (1 + slippage). For a SELL, the limit is mark × (1 − slippage). This ensures the perp position cannot be filled at a price that would create immediate negative P&L beyond this threshold, protecting the delta-neutral hedge from adverse fills." })] }), import_jsx_runtime.jsxs(aa, { title: import_jsx_runtime.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: ["Trading Pairs", import_jsx_runtime.jsx(Ks, { text: "Select which trading pairs the engine should monitor for funding rate arbitrage opportunities. When capital allocation is enabled, set per-asset position sizes.", children: import_jsx_runtime.jsx(Gs, {}) })] }), defaultOpen: true, children: [e2.useCapitalAllocation && (() => {
    const n2 = [0, 7, 14, 30, 60, 90], i3 = (e3) => n2.reduce((t2, n3) => Math.abs(n3 - e3) < Math.abs(t2 - e3) ? n3 : t2);
    return import_jsx_runtime.jsx("div", { style: { marginBottom: 8 }, children: import_jsx_runtime.jsx(Vs, { label: "Rebalance Interval", value: e2.rebalanceDays ?? 0, min: 0, max: 90, step: 1, formatValue: (e3) => e3 === 0 ? "Off" : `${e3}d`, onChange: (e3) => r2({ rebalanceDays: i3(e3) }), disabled: s2, tooltip: 'How often the engine closes and re-opens positions to correct hedge ratio drift between spot and perp legs. Positions can drift over time — periodic rebalancing resets the 1:1 hedge ratio. Set to "Off" (0) to disable.', tooltipPosition: "right" }) });
  })(), e2.useCapitalAllocation && import_jsx_runtime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, padding: "6px 8px", marginBottom: 8, borderRadius: 6, backgroundColor: f2 < 0 ? "rgba(239, 68, 68, 0.1)" : "var(--fra-card, #1f2937)", border: "1px solid " + (f2 < 0 ? "rgba(239, 68, 68, 0.3)" : "var(--fra-border, #374151)") }, children: [import_jsx_runtime.jsxs("span", { style: { color: "var(--fra-muted, #9ca3af)" }, children: ["Allocated: ", import_jsx_runtime.jsx("strong", { style: { color: "var(--fra-heading, #f9fafb)" }, children: ta(p2) }), " / ", ta(u2)] }), import_jsx_runtime.jsx("span", { style: { fontWeight: 600, color: f2 < 0 ? "#ef4444" : f2 < 0.1 * u2 ? "#f59e0b" : "#10b981" }, children: f2 >= 0 ? `${ta(f2)} left` : `${ta(Math.abs(f2))} over` })] }), Ns.map((i3) => {
    const o3 = c2.get(i3), a3 = o3 !== undefined ? 100 * o3 : null, l3 = a3 === null ? "var(--fra-muted, #6b7280)" : a3 > 0.01 ? "#10b981" : a3 > 0 ? "#f59e0b" : "#ef4444", d3 = e2.pairs.includes(i3), u3 = h2[i3] ?? 0, p3 = Math.max(1000, f2 + u3);
    return import_jsx_runtime.jsxs("div", { style: { marginBottom: e2.useCapitalAllocation && d3 ? 6 : 2 }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [import_jsx_runtime.jsx("div", { style: { flex: 1 }, children: import_jsx_runtime.jsx(qs, { label: ca(i3), checked: d3, onChange: () => ((t2) => {
      const n2 = e2.pairs.includes(t2) ? e2.pairs.filter((e3) => e3 !== t2) : [...e2.pairs, t2], i4 = { ...e2.assetAllocations };
      n2.includes(t2) || delete i4[t2], r2({ pairs: n2, assetAllocations: i4 });
    })(i3), disabled: s2, tooltip: la[i3] || `Enable ${i3} for funding rate arbitrage scanning.`, tooltipPosition: "right" }) }), import_jsx_runtime.jsx("span", { style: { fontSize: 11, fontWeight: 600, fontFamily: "monospace", color: l3, minWidth: 64, textAlign: "right", paddingRight: 4 }, children: a3 !== null ? `${a3 >= 0 ? "+" : ""}${a3.toFixed(4)}%` : "—" })] }), e2.useCapitalAllocation && d3 && import_jsx_runtime.jsx("div", { style: { paddingLeft: 28, paddingRight: 4, marginTop: -2 }, children: import_jsx_runtime.jsx(Vs, { label: "", value: u3, min: 0, max: p3, step: 500, formatValue: (e3) => ta(e3), onChange: (e3) => ((e4, t2) => {
      r2({ assetAllocations: { ...h2, [e4]: t2 } });
    })(i3, e3), disabled: s2, tooltip: `USD allocation for ${i3}. Determines position size for this specific asset. Maximum is bounded by remaining unallocated balance.`, tooltipPosition: "right" }) })] }, i3);
  })] })] });
};
var ua = ({ size: e2 = 18 }) => import_jsx_runtime.jsxs("svg", { width: e2, height: e2, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", children: [import_jsx_runtime.jsx("line", { x1: 18, y1: 6, x2: 6, y2: 18 }), import_jsx_runtime.jsx("line", { x1: 6, y1: 6, x2: 18, y2: 18 })] });
var ha = ({ label: e2, value: r2, mono: i2 }) => import_jsx_runtime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid var(--fra-border, #374151)" }, children: [import_jsx_runtime.jsx("span", { style: { fontSize: 12, color: "var(--fra-muted, #9ca3af)" }, children: e2 }), import_jsx_runtime.jsx("span", { style: { fontSize: 12, fontWeight: 600, fontFamily: i2 ? "monospace" : "inherit", color: "var(--fra-heading, #f9fafb)" }, children: r2 })] });
var pa = ({ text: e2, color: n2 }) => import_jsx_runtime.jsx("span", { style: { fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, backgroundColor: `${n2}20`, color: n2, letterSpacing: 0.3, textTransform: "uppercase" }, children: e2 });
var fa = ({ position: r2, fundingRate: i2, maxSlippagePct: o2, onClose: s2 }) => {
  const a2 = Date.now() - r2.openedAt, l2 = a2 / 86400000, c2 = Math.floor(a2 / 3600000), d2 = r2.spotOrderId === "collateral_hold" || r2.spotOrderId === "dry_collateral_hold" ? "Collateral + Short Perp" : "Buy Spot + Short Perp", u2 = r2.spotOrderId.startsWith("dry_"), h2 = r2.unrealizedPnl + r2.fundingCollected, p2 = l2 > 0 && r2.sizeUsd > 0 ? r2.fundingCollected / r2.sizeUsd / l2 * 365 * 100 : 0, f2 = r2.spotEntry > 0 ? r2.spotEntry * (1 + o2 / 100) : 0, g2 = r2.perpEntry > 0 ? r2.perpEntry * (1 - o2 / 100) : 0, y2 = r2.status === "closed", m2 = y2 ? r2.fundingCollected : 0, b2 = i2 ? 100 * i2.rate : null;
  return import_jsx_runtime.jsxs("div", { style: { position: "fixed", inset: 0, zIndex: 10001, display: "flex", alignItems: "center", justifyContent: "center" }, children: [import_jsx_runtime.jsx("div", { style: { position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }, onClick: s2 }), import_jsx_runtime.jsxs("div", { style: { position: "relative", width: "90%", maxWidth: 460, maxHeight: "85vh", backgroundColor: "var(--fra-bg, #111827)", border: "1px solid var(--fra-border, #374151)", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column" }, children: [import_jsx_runtime.jsxs("div", { style: { padding: "14px 16px", borderBottom: "1px solid var(--fra-border, #374151)", display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [import_jsx_runtime.jsx("h3", { style: { fontSize: 15, fontWeight: 700, margin: 0, color: "var(--fra-heading, #f9fafb)" }, children: r2.pair }), import_jsx_runtime.jsx(pa, { text: y2 ? "Closed" : "Open", color: y2 ? "#6b7280" : "#10b981" }), u2 && import_jsx_runtime.jsx(pa, { text: "Paper", color: "#f59e0b" })] }), import_jsx_runtime.jsx("button", { type: "button", onClick: s2, style: { padding: 4, borderRadius: 6, border: "none", backgroundColor: "transparent", color: "var(--fra-muted)", cursor: "pointer", display: "flex" }, children: import_jsx_runtime.jsx(ua, {}) })] }), import_jsx_runtime.jsxs("div", { style: { overflowY: "auto", flex: 1, padding: 16 }, children: [import_jsx_runtime.jsxs("div", { style: { marginBottom: 16 }, children: [import_jsx_runtime.jsx("h4", { style: { fontSize: 12, fontWeight: 700, color: "var(--fra-accent, #3b82f6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }, children: "Lifecycle" }), import_jsx_runtime.jsx(ha, { label: "Position ID", value: r2.id, mono: true }), import_jsx_runtime.jsx(ha, { label: "Status", value: import_jsx_runtime.jsx(pa, { text: r2.status, color: r2.status === "open" ? "#10b981" : r2.status === "closing" ? "#f59e0b" : "#6b7280" }) }), import_jsx_runtime.jsx(ha, { label: "Opened", value: new Date(r2.openedAt).toLocaleString() }), import_jsx_runtime.jsx(ha, { label: "Age", value: l2 >= 1 ? `${Math.floor(l2)}d ${c2 % 24}h` : `${c2}h` }), import_jsx_runtime.jsx(ha, { label: "Exchange", value: r2.exchange }), import_jsx_runtime.jsx(ha, { label: "Hedge Mode", value: d2 })] }), import_jsx_runtime.jsxs("div", { style: { marginBottom: 16 }, children: [import_jsx_runtime.jsx("h4", { style: { fontSize: 12, fontWeight: 700, color: "var(--fra-accent, #3b82f6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }, children: "Entry Prices" }), import_jsx_runtime.jsx(ha, { label: "Spot Entry", value: r2.spotEntry > 0 ? `$${r2.spotEntry.toLocaleString(undefined, { maximumFractionDigits: 4 })}` : "—", mono: true }), import_jsx_runtime.jsx(ha, { label: "Perp Entry", value: r2.perpEntry > 0 ? `$${r2.perpEntry.toLocaleString(undefined, { maximumFractionDigits: 4 })}` : "—", mono: true }), import_jsx_runtime.jsx(ha, { label: "Position Size", value: `$${r2.sizeUsd.toLocaleString()}`, mono: true }), import_jsx_runtime.jsx(ha, { label: "Basis Spread", value: r2.spotEntry > 0 && r2.perpEntry > 0 ? `${((r2.perpEntry - r2.spotEntry) / r2.spotEntry * 100).toFixed(4)}%` : "—", mono: true })] }), import_jsx_runtime.jsxs("div", { style: { marginBottom: 16 }, children: [import_jsx_runtime.jsx("h4", { style: { fontSize: 12, fontWeight: 700, color: "var(--fra-accent, #3b82f6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }, children: "Slippage Guard" }), import_jsx_runtime.jsx(ha, { label: "Max Slippage", value: `${o2.toFixed(2)}%`, mono: true }), r2.spotEntry > 0 && import_jsx_runtime.jsx(ha, { label: "Spot Limit (buy)", value: `≤ $${f2.toLocaleString(undefined, { maximumFractionDigits: 4 })}`, mono: true }), r2.perpEntry > 0 && import_jsx_runtime.jsx(ha, { label: "Perp Limit (sell)", value: `≥ $${g2.toLocaleString(undefined, { maximumFractionDigits: 4 })}`, mono: true }), import_jsx_runtime.jsx("div", { style: { fontSize: 10, color: "var(--fra-muted, #9ca3af)", marginTop: 6, lineHeight: 1.5 }, children: "Limit orders ensure both legs fill within the slippage band, preventing leg risk and maintaining delta-neutrality." })] }), import_jsx_runtime.jsxs("div", { style: { marginBottom: 16 }, children: [import_jsx_runtime.jsx("h4", { style: { fontSize: 12, fontWeight: 700, color: "var(--fra-accent, #3b82f6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }, children: "Funding & P&L" }), import_jsx_runtime.jsx(ha, { label: "Funding Collected", value: import_jsx_runtime.jsxs("span", { style: { color: "#3b82f6" }, children: ["$", r2.fundingCollected.toFixed(4)] }) }), import_jsx_runtime.jsx(ha, { label: "Basis P&L", value: import_jsx_runtime.jsxs("span", { style: { color: r2.unrealizedPnl >= 0 ? "#10b981" : "#ef4444" }, children: ["$", r2.unrealizedPnl.toFixed(4)] }) }), import_jsx_runtime.jsx(ha, { label: "Total P&L", value: import_jsx_runtime.jsxs("span", { style: { fontWeight: 700, color: h2 >= 0 ? "#10b981" : "#ef4444" }, children: ["$", h2.toFixed(4)] }) }), import_jsx_runtime.jsx(ha, { label: "Annualized Yield", value: import_jsx_runtime.jsxs("span", { style: { color: p2 > 10 ? "#10b981" : p2 > 0 ? "#f59e0b" : "#ef4444" }, children: [p2.toFixed(1), "%"] }) }), b2 !== null && import_jsx_runtime.jsx(ha, { label: "Current Funding Rate", value: import_jsx_runtime.jsxs("span", { style: { color: b2 > 0 ? "#10b981" : "#ef4444" }, children: [b2 >= 0 ? "+" : "", b2.toFixed(4), "%"] }) })] }), import_jsx_runtime.jsxs("div", { style: { marginBottom: 16 }, children: [import_jsx_runtime.jsx("h4", { style: { fontSize: 12, fontWeight: 700, color: "var(--fra-accent, #3b82f6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }, children: "Margin Health" }), import_jsx_runtime.jsx(ha, { label: "Margin Health", value: import_jsx_runtime.jsxs("span", { style: { color: r2.marginHealthPct >= 80 ? "#10b981" : r2.marginHealthPct >= 50 ? "#f59e0b" : "#ef4444" }, children: [r2.marginHealthPct.toFixed(1), "%"] }) }), import_jsx_runtime.jsx("div", { style: { fontSize: 10, color: "var(--fra-muted, #9ca3af)", marginTop: 4, lineHeight: 1.5 }, children: "Delta-neutral positions are inherently unliquidatable — spot collateral backs the perp short, keeping margin health stable." })] }), import_jsx_runtime.jsxs("div", { children: [import_jsx_runtime.jsx("h4", { style: { fontSize: 12, fontWeight: 700, color: "var(--fra-accent, #3b82f6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }, children: y2 ? "Exit Details" : "Exit Conditions" }), import_jsx_runtime.jsxs(import_jsx_runtime.Fragment, y2 ? { children: [import_jsx_runtime.jsx(ha, { label: "Exit Reason", value: import_jsx_runtime.jsx(pa, { text: "Hold expired + Funding flipped", color: "#f59e0b" }) }), import_jsx_runtime.jsx(ha, { label: "Yield Sweep", value: m2 > 0 ? import_jsx_runtime.jsxs("span", { style: { color: "#10b981" }, children: ["✓ $", m2.toFixed(4), " swept to spot"] }) : import_jsx_runtime.jsx("span", { style: { color: "var(--fra-muted, #9ca3af)" }, children: "No yield to sweep" }) })] } : { children: [import_jsx_runtime.jsx(ha, { label: "Condition 1", value: import_jsx_runtime.jsx("span", b2 !== null && b2 <= 0 ? { style: { color: "#10b981" }, children: "✓ Funding ≤ 0%" } : { style: { color: "var(--fra-muted, #9ca3af)" }, children: "✗ Funding still positive" }) }), import_jsx_runtime.jsx(ha, { label: "Condition 2", value: import_jsx_runtime.jsx("span", { style: { color: "var(--fra-muted, #9ca3af)" }, children: "Max hold time check" }) }), import_jsx_runtime.jsx(ha, { label: "Yield Sweep", value: import_jsx_runtime.jsx("span", { style: { color: "#10b981" }, children: "Auto — yields transfer to spot on close" }) }), import_jsx_runtime.jsx("div", { style: { fontSize: 10, color: "var(--fra-muted, #9ca3af)", marginTop: 6, lineHeight: 1.5 }, children: "Both conditions must be met (AND logic). The delta-neutral structure makes the position safe to hold indefinitely." })] })] })] })] })] });
};
var ga = { idle: "#6b7280", scanning: "#3b82f6", executing: "#f59e0b", monitoring: "#10b981", exiting: "#f97316", error: "#ef4444" };
var ya = ({ state: e2, wsConnected: r2, spotBalances: i2 = [], maxSlippagePct: o2 = 0.5, targetExchange: a2, dryRun: c2 = true, positionSizeUsd: d2 = 1e4, settlementBalance: u2, zScoreWarmup: h2 = [] }) => {
  const [p2, f2] = import_react.useState(null), g2 = e2.positions.filter((e3) => e3.status === "open"), y2 = e2.positions.filter((e3) => e3.status === "closed"), m2 = import_react.useMemo(() => {
    const t2 = new Map;
    for (const n2 of e2.fundingRates)
      t2.set(n2.pair, n2);
    return t2;
  }, [e2.fundingRates]), b2 = g2.length > 0 ? g2.reduce((e3, t2) => e3 + (t2.marginHealthPct ?? 100), 0) / g2.length : null, w2 = b2 === null ? "#6b7280" : b2 >= 80 ? "#10b981" : b2 >= 50 ? "#f59e0b" : "#ef4444", v = b2 === null ? "—" : b2 >= 80 ? "Healthy" : b2 >= 50 ? "Warning" : "Critical";
  return import_jsx_runtime.jsxs("div", { style: { padding: 16 }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }, children: [import_jsx_runtime.jsx("span", { style: { width: 10, height: 10, borderRadius: "50%", backgroundColor: ga[e2.phase] ?? "#6b7280", display: "inline-block", boxShadow: `0 0 6px ${ga[e2.phase] ?? "#6b7280"}` } }), import_jsx_runtime.jsx("span", { style: { fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }, children: e2.phase }), r2 !== undefined && import_jsx_runtime.jsx("span", { style: { fontSize: 10, padding: "2px 6px", borderRadius: 4, backgroundColor: r2 ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)", color: r2 ? "#10b981" : "#ef4444", fontWeight: 600 }, children: r2 ? "WS Live" : "Polling" }), a2 && (() => {
    const e3 = a2 === "hyperliquid", n2 = e3 ? "#8b5cf6" : "#f59e0b";
    return import_jsx_runtime.jsx("span", { style: { fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10, backgroundColor: `${n2}18`, color: n2, letterSpacing: 0.3, whiteSpace: "nowrap" }, title: e3 ? "Hyperliquid: Cross margin with Portfolio Margin mode. Spot collateral backs perp positions. Funding settles in collateral asset." : "OKX: Coin-margined contracts (e.g. BTC-USD-SWAP) under Unified Account (Level 3+). Funding settles in the base collateral asset.", children: e3 ? "Cross · Portfolio Margin" : "Coin-Margined · Unified" });
  })(), b2 !== null && import_jsx_runtime.jsxs("span", { style: { fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10, backgroundColor: `${w2}18`, color: w2, letterSpacing: 0.3, whiteSpace: "nowrap" }, title: `Average margin health across ${g2.length} open position(s): ${b2.toFixed(1)}%`, children: ["Margin ", b2.toFixed(0), "% · ", v] })] }), e2.lastScanAt && import_jsx_runtime.jsxs("div", { style: { fontSize: 11, color: "var(--fra-muted, #9ca3af)", marginBottom: 16 }, children: ["Last scan: ", new Date(e2.lastScanAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }), " '", String(new Date(e2.lastScanAt).getFullYear()).slice(-2), " ", new Date(e2.lastScanAt).toLocaleTimeString()] }), (() => {
    const r3 = g2.reduce((e3, t2) => e3 + t2.sizeUsd, 0), o3 = g2.reduce((e3, t2) => e3 + t2.fundingCollected, 0), s2 = g2.length > 0 ? Math.min(...g2.map((e3) => e3.openedAt)) : Date.now(), l2 = (Date.now() - s2) / 86400000, h3 = l2 > 0 && r3 > 0 ? o3 / r3 / l2 * 365 * 100 : 0, p3 = y2.reduce((e3, t2) => e3 + t2.fundingCollected, 0);
    return import_jsx_runtime.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }, children: [(() => {
      let e3, n2;
      if (c2)
        e3 = ta(d2 * g2.length), n2 = `${g2.length} pos × ${ta(d2)}`;
      else {
        const t2 = u2 ?? 0, r4 = new Set(["USDT", "USDC", "USD", "BUSD", "DAI"]), o4 = i2.filter((e4) => {
          const t3 = e4.pair.split("/")[0];
          return !r4.has(t3) && e4.instrument === "spot" && e4.size > 0;
        }).reduce((e4, t3) => e4 + t3.markPrice * t3.size, 0), s3 = g2.reduce((e4, t3) => e4 + t3.sizeUsd, 0), l3 = a2 === "hyperliquid" ? "USDC" : "USDC/USDT";
        e3 = ta(t2 + o4);
        const c3 = [];
        t2 > 0 && c3.push(`${l3}: ${ta(t2)}`), o4 > 0 && c3.push(`Crypto: ${ta(o4)}`), s3 > 0 && c3.push(`Perp: ${ta(s3)}`), n2 = c3.length > 0 ? c3.join(" · ") : `Spot ${l3}`;
      }
      return import_jsx_runtime.jsx(ma, { label: "Portfolio Balance ($)", value: na(c2 ? d2 * g2.length : (u2 ?? 0) + i2.filter((e4) => {
        const t2 = e4.pair.split("/")[0];
        return !new Set(["USDT", "USDC", "USD", "BUSD", "DAI"]).has(t2) && e4.instrument === "spot" && e4.size > 0;
      }).reduce((e4, t2) => e4 + t2.markPrice * t2.size, 0)), subtitle: n2 });
    })(), import_jsx_runtime.jsx(ma, { label: "Funding Collected ($)", value: na(e2.totalFundingCollected), color: "#3b82f6" }), import_jsx_runtime.jsx(ma, { label: "Portfolio APY (%)", value: h3.toFixed(1), color: h3 > 10 ? "#10b981" : h3 > 0 ? "#f59e0b" : "#ef4444" }), import_jsx_runtime.jsx(ma, { label: "Yield Swept ($)", value: na(p3), color: p3 > 0 ? "#10b981" : "var(--fra-muted, #9ca3af)", subtitle: y2.length > 0 ? `${y2.length} position${y2.length > 1 ? "s" : ""}` : undefined })] });
  })(), (() => {
    const e3 = h2.filter((e4) => !e4.ready);
    return e3.length === 0 ? null : import_jsx_runtime.jsxs("div", { style: { marginTop: 12, marginBottom: 12 }, children: [import_jsx_runtime.jsx("div", { style: { fontSize: 11, color: "var(--fra-muted, #9ca3af)", marginBottom: 8, fontWeight: 600 }, children: "Z-Score Warmup" }), import_jsx_runtime.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px 10px" }, children: e3.map((e4) => import_jsx_runtime.jsxs("div", { style: { padding: 4 }, children: [import_jsx_runtime.jsxs("div", { style: { fontSize: 9, color: "var(--fra-muted, #9ca3af)", textAlign: "center", marginBottom: 2 }, children: [e4.pair, " [", e4.samples, "/", e4.required, "]"] }), import_jsx_runtime.jsx("div", { style: { height: 4, borderRadius: 2, backgroundColor: "var(--fra-border, #374151)", overflow: "hidden" }, children: import_jsx_runtime.jsx("div", { style: { height: "100%", width: `${Math.min(100, e4.samples / e4.required * 100)}%`, borderRadius: 2, backgroundColor: e4.ready ? "#10b981" : "#3b82f6", transition: "width 0.3s, background-color 0.3s" } }) })] }, e4.pair)) })] });
  })(), y2.length > 0 && import_jsx_runtime.jsxs("details", { style: { fontSize: 12 }, children: [import_jsx_runtime.jsxs("summary", { style: { cursor: "pointer", color: "var(--fra-muted, #9ca3af)", marginBottom: 4 }, children: ["Closed (", y2.length, ")"] }), y2.slice(-5).map((e3) => import_jsx_runtime.jsxs("div", { style: { padding: "4px 0", borderBottom: "1px solid var(--fra-border, #374151)", cursor: "pointer" }, onClick: () => f2(e3), children: [e3.pair, " — ", ta(e3.sizeUsd), " — P&L: ", ra(e3.unrealizedPnl)] }, e3.id))] }), p2 && import_jsx_runtime.jsx(fa, { position: p2, fundingRate: m2.get(p2.pair), maxSlippagePct: o2, onClose: () => f2(null) })] });
};
var ma = ({ label: e2, value: r2, color: i2, subtitle: o2 }) => import_jsx_runtime.jsxs("div", { style: { padding: "10px 12px", borderRadius: 8, backgroundColor: "var(--fra-card, #1f2937)", border: "1px solid var(--fra-border, #374151)" }, children: [import_jsx_runtime.jsx("div", { style: { fontSize: 11, color: "var(--fra-muted, #9ca3af)", marginBottom: 2 }, children: e2 }), import_jsx_runtime.jsx("div", { style: { fontSize: 18, fontWeight: 700, color: i2 ?? "var(--fra-heading, #f9fafb)" }, children: r2 }), o2 && import_jsx_runtime.jsx("div", { style: { fontSize: 9, color: "var(--fra-muted, #9ca3af)", marginTop: 1 }, children: o2 })] });
var ba = 16;
var wa = 54;
var va = { "1d": 86400000, "7d": 604800000, "30d": 2592000000 };
function xa(e2, t2) {
  const n2 = new Date(e2);
  return t2 === "1d" ? n2.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : n2.toLocaleDateString([], { month: "short", day: "numeric" });
}
function Sa(e2) {
  const t2 = new Date(e2);
  return `${t2.toLocaleDateString([], { month: "short", day: "numeric" })} ${t2.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
}
var Pa = ({ snapshots: r2, height: o2 = 180, defaultRange: c2 = "30d" }) => {
  const [d2, u2] = import_react.useState(c2), [h2, p2] = import_react.useState(null), f2 = import_react.useRef(null), g2 = o2, y2 = 254, m2 = g2 - ba - 28, b2 = import_react.useMemo(() => {
    if (r2.length === 0)
      return [];
    const e2 = Date.now() - va[d2], t2 = r2.filter((t3) => t3.timestamp >= e2);
    return t2.length < 2 && r2.length >= 2 ? r2.slice(-2) : t2;
  }, [r2, d2]), w2 = import_react.useMemo(() => {
    if (b2.length < 2)
      return null;
    const e2 = b2[0].timestamp, t2 = b2[b2.length - 1].timestamp - e2 || 1;
    let n2 = Infinity, r3 = -Infinity;
    for (const e3 of b2) {
      const t3 = e3.totalExecutionCost ?? 0;
      for (const i3 of [e3.netPnl, e3.totalUnrealizedPnl, e3.totalFundingCollected, -t3])
        i3 < n2 && (n2 = i3), i3 > r3 && (r3 = i3);
    }
    const i2 = 0.1 * (r3 - n2 || 1);
    n2 -= i2, r3 += i2;
    const o3 = r3 - n2, s2 = (n3) => wa + (n3 - e2) / t2 * y2, a2 = (e3) => ba + (1 - (e3 - n2) / o3) * m2, l2 = (e3) => b2.map((t3, n3) => `${n3 === 0 ? "M" : "L"}${s2(t3.timestamp).toFixed(1)},${a2(e3(t3)).toFixed(1)}`).join(" "), c3 = b2.map((e3) => ({ x: s2(e3.timestamp), netY: a2(e3.netPnl), unrealY: a2(e3.totalUnrealizedPnl), fundingY: a2(e3.totalFundingCollected), costY: a2(-(e3.totalExecutionCost ?? 0)) })), u3 = [];
    for (let e3 = 0;e3 <= 4; e3++) {
      const t3 = n2 + o3 * e3 / 4;
      u3.push({ y: a2(t3), label: ta(t3) });
    }
    const h3 = Math.min(b2.length - 1, 3), p3 = [];
    for (let e3 = 0;e3 <= h3; e3++) {
      const t3 = Math.round(e3 / h3 * (b2.length - 1)), n3 = s2(b2[t3].timestamp);
      e3 > 0 && n3 - wa < 20 || e3 < h3 && 308 - n3 < 20 || p3.push({ x: n3, label: xa(b2[t3].timestamp, d2) });
    }
    return { netPath: l2((e3) => e3.netPnl), unrealizedPath: l2((e3) => e3.totalUnrealizedPnl), fundingPath: l2((e3) => e3.totalFundingCollected), costPath: l2((e3) => -(e3.totalExecutionCost ?? 0)), yTicks: u3, xTicks: p3, zeroY: a2(0), points: c3 };
  }, [b2, y2, m2, d2]), v = import_react.useCallback((e2) => {
    if (!f2.current || !w2 || b2.length < 2)
      return;
    const t2 = f2.current.getBoundingClientRect(), n2 = (e2.clientX - t2.left) / t2.width * 320;
    let r3 = 0, i2 = Infinity;
    for (let e3 = 0;e3 < w2.points.length; e3++) {
      const t3 = Math.abs(w2.points[e3].x - n2);
      t3 < i2 && (i2 = t3, r3 = e3);
    }
    p2(r3);
  }, [w2, b2, 320]), x2 = import_react.useCallback(() => p2(null), []);
  if (b2.length < 2)
    return import_jsx_runtime.jsxs("div", { children: [import_jsx_runtime.jsx(Ea, { range: d2, onChange: u2 }), import_jsx_runtime.jsxs("div", { style: { height: o2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--fra-muted, #9ca3af)", backgroundColor: "var(--fra-card, #1f2937)", borderRadius: 8, border: "1px solid var(--fra-border, #374151)", padding: "0 24px", textAlign: "center" }, children: [import_jsx_runtime.jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", style: { opacity: 0.4 }, children: import_jsx_runtime.jsx("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" }) }), import_jsx_runtime.jsx("span", { style: { fontSize: 12, fontWeight: 600 }, children: "No open positions" }), import_jsx_runtime.jsx("span", { style: { fontSize: 10, lineHeight: 1.4, opacity: 0.7 }, children: "Chart populates after the first position opens and P&L snapshots begin recording." })] })] });
  const S2 = h2 !== null ? b2[h2] : b2[b2.length - 1];
  return import_jsx_runtime.jsxs("div", { children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "4px 8px", marginBottom: 8 }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", gap: 12, fontSize: 11, flexWrap: "wrap", minWidth: 0, flex: "1 1 auto" }, children: [import_jsx_runtime.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }, children: [import_jsx_runtime.jsx("span", { style: { width: 10, height: 3, backgroundColor: "#10b981", display: "inline-block", borderRadius: 2, flexShrink: 0 } }), import_jsx_runtime.jsx("span", { style: { color: "var(--fra-muted, #9ca3af)" }, children: "Net" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 700, color: S2.netPnl >= 0 ? "#10b981" : "#ef4444" }, children: ta(S2.netPnl) })] }), import_jsx_runtime.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }, children: [import_jsx_runtime.jsx("span", { style: { width: 10, height: 3, backgroundColor: "#3b82f6", display: "inline-block", borderRadius: 2, flexShrink: 0 } }), import_jsx_runtime.jsx("span", { style: { color: "var(--fra-muted, #9ca3af)" }, children: "Unrl" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 700, color: S2.totalUnrealizedPnl >= 0 ? "#10b981" : "#ef4444" }, children: ta(S2.totalUnrealizedPnl) })] }), import_jsx_runtime.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }, children: [import_jsx_runtime.jsx("span", { style: { width: 10, height: 3, backgroundColor: "#f59e0b", display: "inline-block", borderRadius: 2, flexShrink: 0 } }), import_jsx_runtime.jsx("span", { style: { color: "var(--fra-muted, #9ca3af)" }, children: "Fund" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 700, color: S2.totalFundingCollected >= 0 ? "#f59e0b" : "#ef4444" }, children: ta(S2.totalFundingCollected) })] })] }), import_jsx_runtime.jsx(Ea, { range: d2, onChange: u2 })] }), import_jsx_runtime.jsxs("div", { style: { position: "relative" }, children: [import_jsx_runtime.jsxs("svg", { ref: f2, viewBox: `0 0 320 ${g2}`, style: { width: "100%", height: o2, backgroundColor: "var(--fra-card, #1f2937)", borderRadius: 8, border: "1px solid var(--fra-border, #374151)", cursor: "crosshair" }, onMouseMove: v, onMouseLeave: x2, children: [w2 && w2.zeroY >= ba && w2.zeroY <= ba + m2 && import_jsx_runtime.jsx("line", { x1: wa, y1: w2.zeroY, x2: 308, y2: w2.zeroY, stroke: "var(--fra-border, #374151)", strokeDasharray: "4 3", strokeWidth: 0.8 }), w2?.yTicks.map((e2, r3) => import_jsx_runtime.jsxs("g", { children: [import_jsx_runtime.jsx("line", { x1: wa, y1: e2.y, x2: 308, y2: e2.y, stroke: "var(--fra-border, #374151)", strokeWidth: 0.3 }), import_jsx_runtime.jsx("text", { x: 50, y: e2.y + 3, textAnchor: "end", fontSize: 9, fill: "var(--fra-muted, #9ca3af)", children: e2.label })] }, `y${r3}`)), w2?.xTicks.map((e2, n2) => import_jsx_runtime.jsx("text", { x: e2.x, y: g2 - 4, textAnchor: "middle", fontSize: 9, fill: "var(--fra-muted, #9ca3af)", children: e2.label }, `x${n2}`)), w2 && import_jsx_runtime.jsxs(import_jsx_runtime.Fragment, { children: [import_jsx_runtime.jsx("path", { d: w2.costPath, fill: "none", stroke: "#f43f5e", strokeWidth: 1, strokeLinejoin: "round", opacity: 0.6 }), import_jsx_runtime.jsx("path", { d: w2.fundingPath, fill: "none", stroke: "#f59e0b", strokeWidth: 1.5, strokeLinejoin: "round", opacity: 0.8 }), import_jsx_runtime.jsx("path", { d: w2.unrealizedPath, fill: "none", stroke: "#3b82f6", strokeWidth: 1.5, strokeLinejoin: "round" }), import_jsx_runtime.jsx("path", { d: w2.netPath, fill: "none", stroke: "#10b981", strokeWidth: 2, strokeLinejoin: "round" })] }), h2 !== null && w2 && import_jsx_runtime.jsxs(import_jsx_runtime.Fragment, { children: [import_jsx_runtime.jsx("line", { x1: w2.points[h2].x, y1: ba, x2: w2.points[h2].x, y2: ba + m2, stroke: "var(--fra-muted, #9ca3af)", strokeWidth: 0.6, strokeDasharray: "3 2" }), import_jsx_runtime.jsx("circle", { cx: w2.points[h2].x, cy: w2.points[h2].costY, r: 2.5, fill: "#f43f5e", stroke: "var(--fra-card, #1f2937)", strokeWidth: 1 }), import_jsx_runtime.jsx("circle", { cx: w2.points[h2].x, cy: w2.points[h2].fundingY, r: 3, fill: "#f59e0b", stroke: "var(--fra-card, #1f2937)", strokeWidth: 1.5 }), import_jsx_runtime.jsx("circle", { cx: w2.points[h2].x, cy: w2.points[h2].netY, r: 3, fill: "#10b981", stroke: "var(--fra-card, #1f2937)", strokeWidth: 1.5 }), import_jsx_runtime.jsx("circle", { cx: w2.points[h2].x, cy: w2.points[h2].unrealY, r: 3, fill: "#3b82f6", stroke: "var(--fra-card, #1f2937)", strokeWidth: 1.5 })] })] }), h2 !== null && w2 && import_jsx_runtime.jsxs("div", { style: { position: "absolute", top: 8, left: w2.points[h2].x > 160 ? 8 : undefined, right: w2.points[h2].x <= 160 ? 8 : undefined, backgroundColor: "var(--fra-bg, #111827)", border: "1px solid var(--fra-border, #374151)", borderRadius: 6, padding: "6px 10px", fontSize: 11, pointerEvents: "none", zIndex: 10, minWidth: 130, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }, children: [import_jsx_runtime.jsx("div", { style: { color: "var(--fra-muted, #9ca3af)", marginBottom: 4, fontWeight: 600 }, children: Sa(b2[h2].timestamp) }), import_jsx_runtime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 12 }, children: [import_jsx_runtime.jsx("span", { style: { color: "#10b981" }, children: "Net" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 700, color: b2[h2].netPnl >= 0 ? "#10b981" : "#ef4444" }, children: ta(b2[h2].netPnl) })] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 12 }, children: [import_jsx_runtime.jsx("span", { style: { color: "#3b82f6" }, children: "Unrealized" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 700, color: b2[h2].totalUnrealizedPnl >= 0 ? "#10b981" : "#ef4444" }, children: ta(b2[h2].totalUnrealizedPnl) })] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 12 }, children: [import_jsx_runtime.jsx("span", { style: { color: "#f59e0b" }, children: "Funding" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 700, color: b2[h2].totalFundingCollected >= 0 ? "#f59e0b" : "#ef4444" }, children: ta(b2[h2].totalFundingCollected) })] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 12 }, children: [import_jsx_runtime.jsx("span", { style: { color: "#f43f5e" }, children: "Exec. Cost" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 700, color: (b2[h2].totalExecutionCost ?? 0) > 0 ? "#f43f5e" : "var(--fra-muted, #6b7280)" }, children: (b2[h2].totalExecutionCost ?? 0) > 0 ? `-${ta(b2[h2].totalExecutionCost ?? 0)}` : "$0.00" })] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 12 }, children: [import_jsx_runtime.jsx("span", { style: { color: "var(--fra-muted, #9ca3af)" }, children: "Realized" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 700, color: "var(--fra-text, #d1d5db)" }, children: ta(b2[h2].totalRealizedPnl) })] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 12 }, children: [import_jsx_runtime.jsx("span", { style: { color: "var(--fra-muted, #9ca3af)" }, children: "Positions" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 700, color: "var(--fra-text, #d1d5db)" }, children: b2[h2].openPositionCount })] }), import_jsx_runtime.jsx("div", { style: { marginTop: 4, fontSize: 9, fontStyle: "italic", color: "var(--fra-muted, #9ca3af)", lineHeight: 1.3, maxWidth: 200 }, children: "Cumulative yield from funding payments — isolates strategy alpha from market noise. If Net PnL lags significantly below Cumulative Funding, then execution costs are eroding yield." })] })] })] });
};
var Ea = ({ range: e2, onChange: n2 }) => import_jsx_runtime.jsx("div", { style: { display: "flex", gap: 2, backgroundColor: "var(--fra-card, #1f2937)", borderRadius: 6, padding: 2, border: "1px solid var(--fra-border, #374151)" }, children: ["1d", "7d", "30d"].map((r2) => import_jsx_runtime.jsx("button", { type: "button", onClick: () => n2(r2), style: { padding: "3px 10px", fontSize: 10, fontWeight: 600, border: "none", borderRadius: 4, cursor: "pointer", backgroundColor: r2 === e2 ? "var(--fra-accent, #3b82f6)" : "transparent", color: r2 === e2 ? "#fff" : "var(--fra-muted, #9ca3af)", transition: "all 0.15s" }, children: r2 }, r2)) });
var ka = new Map;
function Ia(e2, t2) {
  let n2 = ka.get(e2);
  return n2 || (n2 = [], ka.set(e2, n2)), n2.length !== 0 && n2[n2.length - 1] === t2 || (n2.push(t2), n2.length > 20 && n2.shift()), n2;
}
var Ca = ({ values: e2, width: r2 = 56, height: i2 = 20, color: o2 }) => {
  if (e2.length < 2)
    return import_jsx_runtime.jsx("svg", { width: r2, height: i2, style: { display: "block" }, children: import_jsx_runtime.jsx("line", { x1: 0, y1: i2 / 2, x2: r2, y2: i2 / 2, stroke: "var(--fra-border, #374151)", strokeWidth: 0.5, strokeDasharray: "2 2" }) });
  const s2 = r2 - 4, a2 = i2 - 4;
  let l2 = Infinity, c2 = -Infinity;
  for (const t2 of e2)
    t2 < l2 && (l2 = t2), t2 > c2 && (c2 = t2);
  const d2 = c2 - l2 || 0.0001, u2 = o2 ?? (e2[e2.length - 1] >= 0 ? "#10b981" : "#ef4444"), h2 = e2.map((t2, n2) => {
    const r3 = 2 + n2 / (e2.length - 1) * s2, i3 = 2 + (1 - (t2 - l2) / d2) * a2;
    return `${r3.toFixed(1)},${i3.toFixed(1)}`;
  }), p2 = 2 .toFixed(1), f2 = (2 + s2).toFixed(1), g2 = (i2 - 2).toFixed(1), y2 = `M${p2},${g2} L${h2.join(" L")} L${f2},${g2} Z`;
  return import_jsx_runtime.jsxs("svg", { width: r2, height: i2, style: { display: "block" }, children: [l2 < 0 && c2 > 0 && import_jsx_runtime.jsx("line", { x1: 2, y1: 2 + (1 - (0 - l2) / d2) * a2, x2: 2 + s2, y2: 2 + (1 - (0 - l2) / d2) * a2, stroke: "var(--fra-border, #374151)", strokeWidth: 0.5, strokeDasharray: "2 2" }), import_jsx_runtime.jsx("path", { d: y2, fill: u2, opacity: 0.1 }), import_jsx_runtime.jsx("polyline", { points: h2.join(" "), fill: "none", stroke: u2, strokeWidth: 1.5, strokeLinejoin: "round", strokeLinecap: "round" }), (() => {
    const n2 = e2[e2.length - 1];
    return import_jsx_runtime.jsx("circle", { cx: 2 + s2, cy: 2 + (1 - (n2 - l2) / d2) * a2, r: 2, fill: u2 });
  })()] });
};
var Aa = ({ fundingRates: r2, positions: i2 = [], layout: o2 = "grid", showTitle: a2 = true }) => {
  const l2 = import_react.useMemo(() => {
    const e2 = {};
    for (const t2 of r2)
      e2[t2.pair] = Ia(t2.pair, t2.rate);
    return e2;
  }, [r2]);
  if (r2.length === 0)
    return null;
  const c2 = o2 === "vertical";
  return import_jsx_runtime.jsxs("div", { style: { marginTop: c2 ? 0 : 16 }, children: [a2 && (() => {
    const o3 = r2.filter((e2) => e2.rate > 0), s2 = 100 * (o3.length > 0 ? o3.reduce((e2, t2) => e2 + t2.rate, 0) / o3.length : 0) * 3 * 365, a3 = i2.filter((e2) => e2.status === "open");
    let l3 = 0;
    if (a3.length > 0) {
      const e2 = new Set(a3.map((e3) => e3.pair)), t2 = r2.filter((t3) => e2.has(t3.pair) && t3.rate > 0);
      t2.length > 0 && (l3 = t2.reduce((e3, t3) => e3 + t3.rate, 0) / t2.length * 100 * 3 * 365);
    }
    return import_jsx_runtime.jsxs("h4", { style: { fontSize: 11, fontWeight: 600, marginBottom: 6, color: "var(--fra-muted, #9ca3af)", textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }, children: [import_jsx_runtime.jsxs("span", { children: [c2 ? "Rates" : "Live Funding Rates", " ", import_jsx_runtime.jsx("span", { style: { fontWeight: 400, opacity: 0.7 }, children: "(8h)" })] }), s2 > 0 && import_jsx_runtime.jsxs("span", { style: { fontWeight: 400, fontSize: 7, color: "var(--fra-muted, #9ca3af)", textTransform: "none", letterSpacing: 0 }, children: ["APY % (mkt. ", s2.toFixed(1), l3 > 0 && import_jsx_runtime.jsxs(import_jsx_runtime.Fragment, { children: [" | ", import_jsx_runtime.jsxs("span", { style: { color: l3 > 30 ? "#10b981" : l3 > 10 ? "#f59e0b" : "var(--fra-muted, #9ca3af)" }, children: ["ptfl. ", l3.toFixed(1)] })] }), ")"] })] });
  })(), import_jsx_runtime.jsx("div", { style: c2 ? { display: "flex", flexDirection: "column", gap: 4 } : { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }, children: r2.map((e2) => import_jsx_runtime.jsxs("div", { style: { padding: c2 ? "5px 8px" : "8px 10px", borderRadius: 6, backgroundColor: "var(--fra-card, #1f2937)", border: "1px solid var(--fra-border, #374151)", fontSize: c2 ? 11 : 12, display: "flex", alignItems: "center", gap: c2 ? 4 : 8 }, children: [import_jsx_runtime.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [import_jsx_runtime.jsx("div", { style: { fontWeight: 600, fontSize: c2 ? 10 : undefined }, children: e2.pair }), import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 4 }, children: [import_jsx_runtime.jsxs("span", { style: { color: e2.rate >= 0 ? "#10b981" : "#ef4444", fontWeight: 700 }, children: [(100 * e2.rate).toFixed(4), "%"] }), import_jsx_runtime.jsxs("span", { style: { color: "var(--fra-muted, #9ca3af)", fontSize: c2 ? 8 : 9, fontWeight: 400, opacity: 0.7 }, children: [(100 * e2.rate * 3 * 365).toFixed(1), "%", import_jsx_runtime.jsx("span", { style: { fontSize: c2 ? 7 : 8 }, children: "y" })] })] })] }), import_jsx_runtime.jsx(Ca, { values: l2[e2.pair] ?? [e2.rate], width: c2 ? 40 : 56, height: c2 ? 16 : 22, color: e2.rate >= 0 ? "#10b981" : "#ef4444" })] }, e2.pair)) })] });
};
var Ta = ({ open: e2 }) => import_jsx_runtime.jsx("svg", { width: 12, height: 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: { transform: e2 ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }, children: import_jsx_runtime.jsx("polyline", { points: "6 9 12 15 18 9" }) });
var Ra = ({ position: r2, fundingRate: i2, spotBalance: s2, maxSlippagePct: a2 }) => {
  const [c2, d2] = import_react.useState(false), [u2, h2] = import_react.useState(false), p2 = function() {
    const [e2, t2] = import_react.useState(() => typeof window != "undefined" && window.innerWidth < 768);
    return import_react.useEffect(() => {
      const e3 = window.matchMedia("(max-width: 767px)"), n2 = () => t2(window.innerWidth < 768);
      return e3.addEventListener("change", n2), () => e3.removeEventListener("change", n2);
    }, []), e2;
  }(), f2 = r2.pair.split("/")[0], g2 = i2 ? (100 * i2.rate).toFixed(4) : "—", y2 = i2?.rate ?? 0, m2 = Date.now() - r2.openedAt, b2 = m2 / 86400000, w2 = b2 >= 1 ? `${Math.floor(b2)}d` : `${Math.floor(m2 / 3600000)}h`, v = b2 > 0 && r2.sizeUsd > 0 ? r2.fundingCollected / r2.sizeUsd / b2 * 365 * 100 : 0, x2 = r2.spotOrderId === "collateral_hold" || r2.spotOrderId === "dry_collateral_hold" ? "Collateral" : "Buy Spot";
  return import_jsx_runtime.jsxs(import_jsx_runtime.Fragment, { children: [import_jsx_runtime.jsxs("div", { style: { marginBottom: 4 }, children: [import_jsx_runtime.jsxs("button", { type: "button", onClick: () => d2((e2) => !e2), style: { width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", border: "1px solid var(--fra-border, #374151)", borderRadius: c2 ? "6px 6px 0 0" : 6, backgroundColor: "var(--fra-card, #1f2937)", color: "var(--fra-heading, #f9fafb)", cursor: "pointer", fontSize: 12 }, children: [import_jsx_runtime.jsx(Ta, { open: c2 }), import_jsx_runtime.jsx("span", { style: { fontWeight: 700, fontSize: 13 }, children: f2 }), import_jsx_runtime.jsx("span", { style: { color: "var(--fra-muted, #9ca3af)", fontSize: 11 }, children: w2 }), import_jsx_runtime.jsxs("span", { style: { marginLeft: "auto", color: y2 >= 0 ? "#10b981" : "#ef4444", fontWeight: 600, fontFamily: "monospace", fontSize: 11 }, children: [g2, "%"] }), import_jsx_runtime.jsx("span", { style: { color: r2.fundingCollected >= 0 ? "#10b981" : "#ef4444", fontWeight: 600, fontFamily: "monospace", fontSize: 11 }, children: ra(r2.fundingCollected) })] }), c2 && import_jsx_runtime.jsxs("div", { style: { padding: "10px 12px", border: "1px solid var(--fra-border, #374151)", borderTop: "none", borderRadius: "0 0 6px 6px", backgroundColor: "var(--fra-card, #1f2937)", fontSize: 12 }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", flexDirection: p2 ? "column" : "row", gap: 8, marginBottom: 10 }, children: [import_jsx_runtime.jsxs("div", { style: { flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "rgba(139,92,246,0.04)", display: "flex", flexDirection: p2 ? "column" : "row", alignItems: p2 ? "flex-start" : "center", justifyContent: "space-between", gap: p2 ? 6 : 8 }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [import_jsx_runtime.jsx("span", { style: { fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 8, backgroundColor: "rgba(139,92,246,0.15)", color: "#8b5cf6" }, children: "SPOT" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 600, color: "var(--fra-heading, #f9fafb)", fontSize: 11 }, children: x2 === "Collateral" ? "Collateral Hold" : "Long Spot" })] }), import_jsx_runtime.jsx("div", { style: { textAlign: p2 ? "left" : "right" }, children: s2 && s2.size > 0 ? import_jsx_runtime.jsxs(import_jsx_runtime.Fragment, { children: [import_jsx_runtime.jsxs("div", { style: { fontFamily: "monospace", fontWeight: 600, color: "var(--fra-heading, #f9fafb)", fontSize: 12 }, children: [s2.size.toFixed(6), " ", f2] }), import_jsx_runtime.jsxs("div", { style: { fontSize: 10, color: "var(--fra-muted, #9ca3af)", marginTop: 2 }, children: ["≈ ", ta(s2.size * s2.markPrice), " · ", "Entry ", ta(r2.spotEntry)] })] }) : import_jsx_runtime.jsxs("div", { style: { color: "var(--fra-muted, #9ca3af)", fontSize: 11 }, children: ["Entry ", ta(r2.spotEntry), " · Size ", ta(r2.sizeUsd)] }) })] }), import_jsx_runtime.jsxs("div", { style: { flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "rgba(239,68,68,0.04)", display: "flex", flexDirection: p2 ? "column" : "row", alignItems: p2 ? "flex-start" : "center", justifyContent: "space-between", gap: p2 ? 6 : 8 }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [import_jsx_runtime.jsx("span", { style: { fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 8, backgroundColor: "rgba(239,68,68,0.15)", color: "#ef4444" }, children: "PERP" }), import_jsx_runtime.jsx("span", { style: { fontWeight: 600, color: "var(--fra-heading, #f9fafb)", fontSize: 11 }, children: "Short Perpetual" })] }), import_jsx_runtime.jsxs("div", { style: { textAlign: p2 ? "left" : "right" }, children: [import_jsx_runtime.jsxs("div", { style: { fontFamily: "monospace", fontWeight: 600, color: "var(--fra-heading, #f9fafb)", fontSize: 12 }, children: [ta(r2.sizeUsd), " notional"] }), import_jsx_runtime.jsxs("div", { style: { fontSize: 10, color: "var(--fra-muted, #9ca3af)", marginTop: 2 }, children: ["Entry ", ta(r2.perpEntry)] })] })] })] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", gap: 8, fontSize: 11, color: "var(--fra-muted, #9ca3af)", borderTop: "1px solid var(--fra-border, #374151)", paddingTop: 8, alignItems: "center", flexWrap: "wrap" }, children: [(() => {
    const e2 = r2.marginHealthPct, t2 = e2 >= 80 ? "#10b981" : e2 >= 50 ? "#f59e0b" : "#ef4444", i3 = e2 >= 80 ? "Healthy" : e2 >= 50 ? "Warning" : "Critical";
    return import_jsx_runtime.jsxs("span", { style: { fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 10, backgroundColor: `${t2}18`, color: t2, whiteSpace: "nowrap" }, title: `Margin health: ${e2.toFixed(1)}%`, children: ["Margin ", e2.toFixed(0), "% · ", i3] });
  })(), (() => {
    const e2 = r2.perpEntry > 0 && r2.spotEntry > 0 ? Math.abs(r2.perpEntry - r2.spotEntry) / r2.spotEntry * 100 : 0, t2 = e2 <= 0.5 * a2 ? "#10b981" : e2 <= a2 ? "#f59e0b" : "#ef4444", i3 = e2 <= 0.5 * a2 ? "Low" : e2 <= a2 ? "Moderate" : "High";
    return import_jsx_runtime.jsxs("span", { style: { fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 10, backgroundColor: `${t2}18`, color: t2, whiteSpace: "nowrap" }, title: `Entry spread: ${e2.toFixed(3)}% (max tolerated: ${a2}%)`, children: ["Slip ", e2.toFixed(2), "% · ", i3] });
  })(), import_jsx_runtime.jsxs("span", { children: ["Basis: ", import_jsx_runtime.jsx("strong", { style: { color: r2.unrealizedPnl >= 0 ? "#10b981" : "#ef4444" }, children: ra(r2.unrealizedPnl) })] }), import_jsx_runtime.jsxs("span", { children: ["APY: ", import_jsx_runtime.jsxs("strong", { style: { color: v > 10 ? "#10b981" : v > 0 ? "#f59e0b" : "#ef4444" }, children: [v.toFixed(1), "%"] })] }), import_jsx_runtime.jsx("button", { type: "button", onClick: (e2) => {
    e2.stopPropagation(), h2(true);
  }, style: { marginLeft: "auto", padding: "3px 8px", borderRadius: 4, border: "1px solid var(--fra-border, #374151)", backgroundColor: "transparent", color: "var(--fra-accent, #3b82f6)", cursor: "pointer", fontSize: 10, fontWeight: 600 }, children: "Details" })] })] })] }), u2 && import_jsx_runtime.jsx(fa, { position: r2, fundingRate: i2, maxSlippagePct: a2, onClose: () => h2(false) })] });
};
var Ua = ({ positions: e2, fundingRates: r2, spotBalances: i2, maxSlippagePct: o2, isDryRun: s2, onCloseAll: a2 }) => {
  const [c2, d2] = import_react.useState(false), u2 = e2.filter((e3) => e3.status === "open"), h2 = new Map(r2.map((e3) => [e3.pair, e3])), p2 = new Map(i2.filter((e3) => e3.instrument === "spot" && e3.size > 0).map((e3) => [e3.pair, e3]));
  return u2.length === 0 ? null : import_jsx_runtime.jsxs("div", { style: { padding: "0 16px 8px" }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [import_jsx_runtime.jsxs("h4", { style: { fontSize: 13, fontWeight: 600, margin: 0, color: "var(--fra-heading, #f9fafb)" }, children: ["Open Positions (", u2.length, ")"] }), s2 && a2 && (c2 ? import_jsx_runtime.jsxs("div", { style: { display: "flex", gap: 4, alignItems: "center" }, children: [import_jsx_runtime.jsx("span", { style: { fontSize: 10, color: "var(--fra-muted, #9ca3af)" }, children: "Close all?" }), import_jsx_runtime.jsx("button", { type: "button", onClick: () => {
    a2(), d2(false);
  }, style: { padding: "2px 8px", fontSize: 10, fontWeight: 700, borderRadius: 4, border: "1px solid #ef4444", backgroundColor: "rgba(239,68,68,0.12)", color: "#ef4444", cursor: "pointer" }, children: "Yes" }), import_jsx_runtime.jsx("button", { type: "button", onClick: () => d2(false), style: { padding: "2px 8px", fontSize: 10, fontWeight: 600, borderRadius: 4, border: "1px solid var(--fra-border, #374151)", backgroundColor: "transparent", color: "var(--fra-muted, #9ca3af)", cursor: "pointer" }, children: "No" })] }) : import_jsx_runtime.jsx("button", { type: "button", onClick: () => d2(true), title: "Close all open positions (paper mode)", style: { padding: "3px 10px", fontSize: 10, fontWeight: 600, borderRadius: 4, border: "1px solid var(--fra-border, #374151)", backgroundColor: "transparent", color: "var(--fra-muted, #9ca3af)", cursor: "pointer", transition: "all 0.15s" }, children: "Close All" }))] }), u2.map((e3) => import_jsx_runtime.jsx(Ra, { position: e3, fundingRate: h2.get(e3.pair), spotBalance: p2.get(e3.pair), maxSlippagePct: o2 }, e3.id))] });
};
var Fa = { margin_warning: { icon: "⚠️", color: "#f59e0b", label: "Margin Warning" }, funding_collected: { icon: "\uD83D\uDCB0", color: "#3b82f6", label: "Funding Collected" }, funding_compounded: { icon: "\uD83D\uDD01", color: "#14b8a6", label: "Compounded" }, position_opened: { icon: "\uD83D\uDCC8", color: "#10b981", label: "Position Opened" }, position_closed: { icon: "\uD83D\uDCC9", color: "#9ca3af", label: "Position Closed" }, yield_swept: { icon: "\uD83C\uDFE6", color: "#14b8a6", label: "Yield Swept" }, error: { icon: "\uD83D\uDD34", color: "#ef4444", label: "Error" }, rebalance: { icon: "\uD83D\uDD04", color: "#8b5cf6", label: "Rebalance" }, pnl_snapshot: { icon: "\uD83D\uDCCA", color: "#6b7280", label: "P&L Snapshot" }, scan_heartbeat: { icon: "\uD83D\uDC93", color: "#6b7280", label: "Scan" }, scan_noop: { icon: "⏭️", color: "#f59e0b", label: "No Entry" } };
var Oa = ["margin_warning", "funding_collected", "funding_compounded", "position_opened", "position_closed", "yield_swept", "error", "rebalance", "scan_noop", "scan_heartbeat"];
function za(e2) {
  const t2 = e2.data;
  switch (e2.type) {
    case "scan_noop":
      return `scan_noop:${t2.reasons.map((e3) => e3.reasonCode ? `${e3.pair}|${e3.reasonCode}|T:${Number(e3.thresholdPct).toFixed(3)}|R:${Number(e3.ratePct).toFixed(4)}${e3.zScore != null ? `|Z:${Number(e3.zScore).toFixed(1)}` : ""}` : `${e3.pair}|${e3.reason}`).sort().join(",")}`;
    case "funding_collected":
      return `funding:${t2.pair ?? ""}:${Number(t2.amount).toFixed(4)}`;
    case "margin_warning":
      return `margin:${t2.pair}:${Number(t2.marginHealthPct).toFixed(1)}`;
    case "scan_heartbeat":
      return `hb:${t2.pairsScanned}:${t2.openPositions}:${t2.phase}`;
    default:
      return `${e2.type}:${JSON.stringify(t2)}`;
  }
}
function Na(e2) {
  const t2 = new Date(e2), n2 = String(t2.getFullYear()).slice(-2);
  return `${t2.toLocaleDateString(undefined, { month: "short", day: "numeric" })} '${n2} ${t2.toLocaleTimeString()}`;
}
var $a = { width: "100%", padding: "4px 0", border: "none", backgroundColor: "transparent", color: "var(--fra-muted, #9ca3af)", fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, letterSpacing: 0.5, flexShrink: 0 };
var Ba = ({ events: i2, pageSize: s2 = 3 }) => {
  const [c2, d2] = import_react.useState(0), u2 = import_react.useRef(0), { pinnedHeartbeat: h2, otherEvents: p2 } = import_react.default.useMemo(() => {
    const e2 = i2.filter((e3) => Oa.includes(e3.type)), t2 = [];
    for (const n3 of e2)
      if (n3.type === "scan_heartbeat") {
        const e3 = t2[t2.length - 1];
        if (e3 && e3.type === "scan_heartbeat") {
          t2[t2.length - 1] = { ...n3, _heartbeatCount: (e3._heartbeatCount ?? 1) + 1 };
          continue;
        }
        t2.push({ ...n3, _heartbeatCount: 1 });
      } else
        t2.push(n3);
    const n2 = [];
    let r2 = "", o2 = 0;
    for (const e3 of t2) {
      const t3 = za(e3);
      if (n2.length > 0 && t3 === r2 && e3.timestamp - o2 < 60000) {
        const t4 = n2[n2.length - 1];
        n2[n2.length - 1] = { ...e3, _heartbeatCount: t4._heartbeatCount, _repeatCount: (t4._repeatCount ?? 1) + 1 };
        continue;
      }
      n2.push({ ...e3, _repeatCount: 1 }), r2 = t3, o2 = e3.timestamp;
    }
    let s3 = null;
    const a2 = [];
    for (const e3 of n2)
      e3.type === "scan_heartbeat" ? s3 = e3 : a2.push(e3);
    return { pinnedHeartbeat: s3, otherEvents: a2 };
  }, [i2]);
  import_react.useEffect(() => {
    p2.length > u2.current && d2(0), u2.current = p2.length;
  }, [p2.length]);
  const f2 = Math.max(1, Math.ceil(p2.length / s2)), g2 = Math.min(c2, f2 - 1), y2 = Math.max(0, p2.length - (g2 + 1) * s2), m2 = p2.length - g2 * s2, b2 = [...p2.slice(y2, m2)].reverse(), w2 = g2 < f2 - 1, v = g2 > 0, x2 = p2.length + (h2 ? 1 : 0), S2 = (e2, r2, i3, o2 = false) => {
    const s3 = Fa[e2.type] ?? { icon: "•", color: "#6b7280", label: e2.type }, a2 = function(e3) {
      const t2 = e3.data, n2 = (e3._repeatCount ?? 1) > 1 ? ` (×${e3._repeatCount})` : "";
      switch (e3.type) {
        case "margin_warning":
          return `${t2.pair} — margin ${Number(t2.marginHealthPct).toFixed(1)}% (threshold ${t2.threshold}%)${n2}`;
        case "funding_collected":
          return `+$${Number(t2.amount).toFixed(4)} (total: ${ta(Number(t2.totalFundingCollected))})${t2.dryRun ? " [paper]" : ""}${n2}`;
        case "position_opened":
          return `${t2.pair} — ${t2.hedgeMode}${t2.dryRun ? " [paper]" : ""}`;
        case "position_closed":
          return `${t2.pair ?? t2.posId} — ${t2.reason} — PnL: ${ta(Number(t2.totalPnl ?? 0))}`;
        case "yield_swept":
          return `${t2.pair} — ${ta(Number(t2.amount))} ${t2.asset} → spot${t2.dryRun ? " [paper]" : t2.success ? " ✓" : " ✗"}`;
        case "funding_compounded":
          return `${t2.pair} — ${ta(Number(t2.amount))} reinvested → new size ${ta(Number(t2.newSizeUsd))}${n2}`;
        case "error":
          return `${t2.pair ?? ""} ${t2.error}`;
        case "rebalance":
          return `${t2.reason} — restored ${t2.restoredCount} positions`;
        case "scan_heartbeat": {
          const n3 = e3._heartbeatCount ?? 1;
          return `Scanned ${t2.pairsScanned} pairs · ${t2.openPositions} open · ${t2.phase}${n3 > 1 ? ` (×${n3})` : ""}`;
        }
        case "scan_noop": {
          const e4 = t2.reasons, r3 = Number(t2.suppressedCount ?? 0), i4 = r3 > 0 ? ` (${r3} suppressed)` : "";
          return e4.map((e5) => e5.reasonCode === "zscore_below_threshold" && e5.zScore != null ? `${e5.pair}: z=${Number(e5.zScore).toFixed(2)} < 2.0 (rate ${Number(e5.ratePct).toFixed(2)}%)` : `${e5.pair}: ${e5.reason}`).join(" · ") + n2 + i4;
        }
        default:
          return JSON.stringify(t2).slice(0, 80);
      }
    }(e2);
    return import_jsx_runtime.jsxs("div", { title: a2, style: { padding: "6px 10px", borderBottom: i3 ? "none" : "1px solid var(--fra-border, #374151)", fontSize: 11, display: "flex", alignItems: "flex-start", gap: 8, height: o2 ? "auto" : 52, minHeight: o2 ? undefined : 52, maxHeight: o2 ? undefined : 52, overflow: "hidden", boxSizing: "border-box", ...o2 ? { backgroundColor: "var(--fra-border, #374151)" } : {} }, children: [import_jsx_runtime.jsx("span", { style: { flexShrink: 0, fontSize: 12 }, children: s3.icon }), import_jsx_runtime.jsxs("div", { style: { flex: 1, minWidth: 0, overflow: "hidden" }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [import_jsx_runtime.jsx("span", { style: { fontWeight: 700, color: s3.color, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }, children: s3.label }), import_jsx_runtime.jsx("span", { style: { fontSize: 9, color: "var(--fra-muted, #9ca3af)", marginLeft: "auto", flexShrink: 0 }, children: Na(e2.timestamp) })] }), import_jsx_runtime.jsx("div", { style: { color: "var(--fra-text, #d1d5db)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", wordBreak: "break-word", lineHeight: "14px" }, children: a2 })] })] }, o2 ? "pinned-hb" : `${e2.timestamp}-${r2}`);
  };
  return import_jsx_runtime.jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [import_jsx_runtime.jsxs("h4", { style: { fontSize: 13, fontWeight: 600, margin: 0, color: "var(--fra-heading, #f9fafb)" }, children: ["Event Log", import_jsx_runtime.jsxs("span", { style: { fontSize: 10, fontWeight: 400, color: "var(--fra-muted, #9ca3af)", marginLeft: 6 }, children: ["(", x2, ")"] })] }), x2 > 0 && import_jsx_runtime.jsxs("button", { type: "button", onClick: () => {
    const e2 = h2 ? [h2, ...p2] : p2, t2 = new Blob([JSON.stringify(e2, null, 2)], { type: "application/json" }), n2 = URL.createObjectURL(t2), r2 = document.createElement("a");
    r2.href = n2, r2.download = `arb-events-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.json`, r2.click(), URL.revokeObjectURL(n2);
  }, style: { padding: "3px 8px", borderRadius: 4, border: "1px solid var(--fra-border, #374151)", backgroundColor: "transparent", color: "var(--fra-muted, #9ca3af)", fontSize: 10, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }, title: "Export event log as JSON", children: [import_jsx_runtime.jsxs("svg", { width: 10, height: 10, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round", children: [import_jsx_runtime.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), import_jsx_runtime.jsx("polyline", { points: "7 10 12 15 17 10" }), import_jsx_runtime.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })] }), "Export"] })] }), import_jsx_runtime.jsx("div", { style: { borderRadius: 6, border: "1px solid var(--fra-border, #374151)", backgroundColor: "var(--fra-card, #1f2937)", display: "flex", flexDirection: "column", overflow: "hidden" }, children: x2 === 0 ? import_jsx_runtime.jsx("div", { style: { padding: 16, textAlign: "center", fontSize: 12, color: "var(--fra-muted, #9ca3af)", height: 52 * s2 + 48, display: "flex", alignItems: "center", justifyContent: "center" }, children: "No events yet — start the engine to see activity" }) : import_jsx_runtime.jsxs(import_jsx_runtime.Fragment, { children: [h2 && S2(h2, 0, false, true), import_jsx_runtime.jsx("button", { type: "button", disabled: !v, onClick: () => d2((e2) => e2 - 1), style: { ...$a, borderBottom: "1px solid var(--fra-border, #374151)", opacity: v ? 1 : 0.3, cursor: v ? "pointer" : "default" }, children: "▲ Newer" }), import_jsx_runtime.jsx("div", { style: { height: 52 * s2, overflow: "hidden", flexShrink: 0 }, children: b2.map((e2, t2) => S2(e2, t2, t2 === b2.length - 1)) }), import_jsx_runtime.jsx("button", { type: "button", disabled: !w2, onClick: () => d2((e2) => e2 + 1), style: { ...$a, borderTop: "1px solid var(--fra-border, #374151)", opacity: w2 ? 1 : 0.3, cursor: w2 ? "pointer" : "default" }, children: "▼ Older" })] }) })] });
};
var La = { "--fra-bg": "#111827", "--fra-card": "#1f2937", "--fra-border": "#374151", "--fra-heading": "#f9fafb", "--fra-text": "#d1d5db", "--fra-muted": "#9ca3af", "--fra-accent": "#3b82f6", "--fra-track": "#374151", "--fra-thumb": "#ffffff" };
var Da = { "--fra-bg": "#f8f9fa", "--fra-card": "#ffffff", "--fra-border": "#d1d5db", "--fra-heading": "#1a1a2e", "--fra-text": "#2d3748", "--fra-muted": "#64748b", "--fra-accent": "#2563eb", "--fra-track": "#cbd5e1", "--fra-thumb": "#ffffff" };
var _a = ({ size: e2 = 16 }) => import_jsx_runtime.jsxs("svg", { width: e2, height: e2, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", children: [import_jsx_runtime.jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }), import_jsx_runtime.jsx("circle", { cx: 12, cy: 12, r: 3 })] });
var Ma = ({ size: e2 = 18 }) => import_jsx_runtime.jsxs("svg", { width: e2, height: e2, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", children: [import_jsx_runtime.jsx("line", { x1: 18, y1: 6, x2: 6, y2: 18 }), import_jsx_runtime.jsx("line", { x1: 6, y1: 6, x2: 18, y2: 18 })] });
var Wa = ({ size: e2 = 16 }) => import_jsx_runtime.jsxs("svg", { width: e2, height: e2, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", children: [import_jsx_runtime.jsx("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }), import_jsx_runtime.jsx("path", { d: "M3 3v5h5" })] });
var Ha = ({ exchangeKeys: r2, onExecution: c2, onError: d2, theme: u2 = "dark", defaultConfig: h2, persistenceStore: p2 }) => {
  const [f2, g2] = import_react.useState(() => _s().theme ?? u2), [y2, m2] = import_react.useState(() => r2 && Object.keys(r2).length > 0 ? r2 : function() {
    try {
      const e2 = localStorage.getItem(Ys);
      return e2 ? JSON.parse(e2) : {};
    } catch {
      return {};
    }
  }()), [b2, w2] = import_react.useState([]), [v, x2] = import_react.useState("dashboard"), S2 = function(e2 = 640) {
    const [t2, n2] = import_react.useState(false);
    return import_react.useEffect(() => {
      const t3 = window.matchMedia(`(max-width: ${e2}px)`);
      n2(t3.matches);
      const r3 = (e3) => n2(e3.matches);
      return t3.addEventListener("change", r3), () => t3.removeEventListener("change", r3);
    }, [e2]), t2;
  }(), [P2, E2] = import_react.useState([]), k2 = import_react.useRef(0), I2 = import_react.useRef(null), C2 = import_react.useCallback((e2) => {
    const t2 = ++k2.current;
    E2((n2) => [...n2, { ...e2, id: t2 }]), setTimeout(() => E2((e3) => e3.filter((e4) => e4.id !== t2)), 5000);
  }, []), A2 = import_react.useCallback((e2) => {
    if (c2?.(e2), w2((t2) => {
      const n2 = [...t2, e2];
      return n2.length > 200 ? n2.slice(-200) : n2;
    }), function(e3, t2) {
      if (!e3)
        return;
      const n2 = t2.data;
      switch (t2.type) {
        case "position_opened":
          (function(e4, t3) {
            const n3 = String(t3.pair ?? ""), r3 = Number(t3.sizeUsd ?? 0), i2 = Number(t3.spotEntry ?? 0), o2 = Number(t3.perpEntry ?? 0), s2 = (100 * Number(t3.fundingRate ?? 0)).toFixed(4);
            oa(e4, sa({ title: `\uD83D\uDCC8 Position Opened — ${n3}`, color: ia, fields: [{ name: "Size", value: ta(r3), inline: true }, { name: "Spot Entry", value: `$${i2.toFixed(2)}`, inline: true }, { name: "Perp Entry", value: `$${o2.toFixed(2)}`, inline: true }, { name: "Funding Rate", value: `${s2}%`, inline: true }, { name: "Mode", value: String(t3.dryRun ? "Paper" : "Live"), inline: true }] }));
          })(e3, n2);
          break;
        case "position_closed":
          (function(e4, t3) {
            const n3 = String(t3.pair ?? t3.posId ?? ""), r3 = String(t3.reason ?? "unknown"), i2 = Number(t3.fundingCollected ?? 0), o2 = Number(t3.basisPnl ?? 0), s2 = Number(t3.totalPnl ?? 0), a2 = Number(t3.holdDays ?? 0);
            oa(e4, sa({ title: `\uD83D\uDCC9 Position Closed — ${n3}`, description: r3 === "funding_flip" ? "⚡ Funding rate flipped negative" : r3 === "max_hold" ? "⏰ Max hold time reached" : r3, color: s2 >= 0 ? ia : 15680580, fields: [{ name: "Funding Collected", value: ra(i2), inline: true }, { name: "Basis P&L", value: ra(o2), inline: true }, { name: "Total P&L", value: ra(s2), inline: true }, { name: "Hold Duration", value: `${a2.toFixed(1)} days`, inline: true }] }));
          })(e3, n2);
          break;
        case "margin_warning":
          (function(e4, t3) {
            const n3 = String(t3.pair ?? t3.posId ?? ""), r3 = Number(t3.marginHealthPct ?? t3.healthPct ?? 0), i2 = Number(t3.threshold ?? 0);
            oa(e4, sa({ title: `⚠️ Margin Warning — ${n3}`, description: "Margin health dropped below configured threshold.", color: 16096779, fields: [{ name: "Current Health", value: `${r3.toFixed(1)}%`, inline: true }, { name: "Threshold", value: `${i2.toFixed(1)}%`, inline: true }] }));
          })(e3, n2);
      }
    }(I2.current?.discordWebhookUrl, e2), e2.type === "position_closed") {
      const t2 = e2.data, n2 = String(t2.reason ?? "");
      if (n2 === "funding_flip" || n2 === "max_hold") {
        const e3 = String(t2.pair ?? t2.posId ?? ""), r3 = Number(t2.totalPnl ?? 0);
        C2({ pair: e3, reason: n2, pnl: r3 });
      }
    }
  }, [c2, C2]), T2 = r2 && Object.keys(r2).length > 0 ? r2 : y2, { config: R2, state: U2, pnlHistory: F2, zScoreWarmup: O2, updateConfig: z2, start: N2, stop: $2, closeAllPositions: B2, adapter: L2, running: D2 } = Hs(T2, h2, A2, d2, p2), _2 = import_react.useMemo(() => [...R2.pairs], [R2.pairs]), { rates: M2, wsConnected: W2 } = js(L2, _2, true, R2.targetExchange), H2 = import_react.useMemo(() => U2.fundingRates.length > 0 ? U2.fundingRates : M2, [M2, U2.fundingRates]);
  import_react.useEffect(() => {
    I2.current = R2;
  }, [R2]), import_react.useEffect(() => {
    if (!R2.discordWebhookUrl || !D2)
      return;
    const e2 = setInterval(() => {
      const e3 = I2.current?.discordWebhookUrl;
      e3 && function(e4, t2, n2) {
        const r3 = t2.positions.filter((e5) => e5.status === "open"), i2 = r3.reduce((e5, t3) => e5 + t3.unrealizedPnl, 0), o2 = r3.reduce((e5, t3) => e5 + t3.fundingCollected, 0), s2 = r3.reduce((e5, t3) => e5 + t3.sizeUsd, 0);
        oa(e4, sa({ title: "\uD83D\uDCCA Daily P&L Summary", color: 3900150, fields: [{ name: "Exchange", value: n2 === "hyperliquid" ? "Hyperliquid" : "OKX", inline: true }, { name: "Open Positions", value: String(r3.length), inline: true }, { name: "Capital Deployed", value: ta(s2), inline: true }, { name: "Funding (Open)", value: ra(o2), inline: true }, { name: "Unrealized P&L", value: ra(i2), inline: true }, { name: "Total Realized", value: ra(t2.totalRealizedPnl), inline: true }, { name: "Lifetime Funding", value: ra(t2.totalFundingCollected), inline: true }, { name: "Net Performance", value: ra(t2.totalRealizedPnl + i2), inline: true }] }));
      }(e3, U2, R2.targetExchange);
    }, 86400000);
    return () => clearInterval(e2);
  }, [R2.discordWebhookUrl, D2, R2.targetExchange, U2]);
  const [j2, K2] = import_react.useState(false), [G2, V2] = import_react.useState(false), [q2, Y2] = import_react.useState([]), [J2, Z2] = import_react.useState(null), [X2, Q2] = import_react.useState(null), ee2 = f2 === "dark" ? La : Da;
  import_react.useEffect(() => {
    if (R2.dryRun || !L2)
      return void Q2(null);
    const e2 = R2.targetExchange === "hyperliquid" ? "USDC" : "USDT";
    let t2 = false;
    const n2 = async () => {
      try {
        const n3 = await L2.getSettlementBalance(e2);
        t2 || Q2(n3);
      } catch {}
    };
    n2();
    const r3 = setInterval(n2, 30000);
    return () => {
      t2 = true, clearInterval(r3);
    };
  }, [L2, R2.dryRun, R2.targetExchange]), import_react.useEffect(() => {
    if (R2.dryRun) {
      const e3 = U2.positions.filter((e4) => e4.status === "open");
      if (e3.length === 0)
        return void Y2([]);
      const t3 = e3.map((e4) => {
        const t4 = e4.spotEntry > 0 ? e4.sizeUsd / e4.spotEntry : 0;
        return { pair: e4.pair, side: "long", size: t4, entryPrice: e4.spotEntry, markPrice: e4.spotEntry, unrealizedPnl: 0, instrument: "spot" };
      });
      return void Y2(t3);
    }
    if (!L2)
      return void Y2([]);
    let e2 = false;
    const t2 = async () => {
      try {
        const t3 = await L2.getPositions();
        e2 || Y2(t3.filter((e3) => e3.instrument === "spot"));
      } catch {}
    };
    t2();
    const n2 = setInterval(t2, 30000);
    return () => {
      e2 = true, clearInterval(n2);
    };
  }, [L2, R2.dryRun, R2.positionSizeUsd, U2.positions]);
  const te2 = import_react.useCallback(() => {
    R2.dryRun || Zs(T2, R2.targetExchange) ? N2() : C2({ pair: "", reason: "missing_keys", pnl: 0, type: "warning" });
  }, [R2.dryRun, R2.targetExchange, T2, N2, C2]);
  return import_jsx_runtime.jsxs("div", { style: { ...ee2, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: "var(--fra-bg)", color: "var(--fra-text)", borderRadius: 12, border: "1px solid var(--fra-border)", overflow: "hidden", minWidth: 320, position: "relative" }, children: [P2.length > 0 && import_jsx_runtime.jsx("div", { style: { position: "absolute", top: S2 ? 100 : 56, right: 12, zIndex: 9000, display: "flex", flexDirection: "column", gap: 6, pointerEvents: "none" }, children: P2.map((r3) => {
    const i2 = r3.type === "warning" || r3.reason === "missing_keys";
    return import_jsx_runtime.jsxs("div", { style: { pointerEvents: "auto", padding: "8px 14px", borderRadius: 8, border: "1px solid " + (i2 ? "#f59e0b" : "var(--fra-border)"), backgroundColor: "var(--fra-card)", boxShadow: "0 4px 16px rgba(0,0,0,0.3)", fontSize: 12, display: "flex", alignItems: "center", gap: 8, animation: "fra-toast-in 0.25s ease-out", maxWidth: 300 }, children: [import_jsx_runtime.jsx("span", { style: { fontSize: 14 }, children: i2 ? "\uD83D\uDD11" : "\uD83D\uDCC9" }), import_jsx_runtime.jsx("div", { children: import_jsx_runtime.jsxs(import_jsx_runtime.Fragment, i2 ? { children: [import_jsx_runtime.jsx("div", { style: { fontWeight: 700, color: "#f59e0b", fontSize: 11 }, children: "API Keys Required" }), import_jsx_runtime.jsxs("div", { style: { color: "var(--fra-muted)", fontSize: 10, marginTop: 1 }, children: ["Configure ", R2.targetExchange === "hyperliquid" ? "Hyperliquid" : "OKX", " API keys in Settings before starting live trading."] })] } : { children: [import_jsx_runtime.jsxs("div", { style: { fontWeight: 700, color: "var(--fra-heading)", fontSize: 11 }, children: [r3.pair, " Closed"] }), import_jsx_runtime.jsxs("div", { style: { color: "var(--fra-muted)", fontSize: 10, marginTop: 1 }, children: [r3.reason === "funding_flip" ? "Funding rate flipped negative" : "Max hold time reached", " · ", import_jsx_runtime.jsx("span", { style: { color: r3.pnl >= 0 ? "#10b981" : "#ef4444", fontWeight: 600 }, children: ra(r3.pnl) })] })] }) }), import_jsx_runtime.jsx("button", { type: "button", onClick: () => E2((e2) => e2.filter((e3) => e3.id !== r3.id)), style: { marginLeft: "auto", background: "none", border: "none", color: "var(--fra-muted)", cursor: "pointer", fontSize: 14, padding: 2, lineHeight: 1 }, children: "×" })] }, r3.id);
  }) }), import_jsx_runtime.jsxs("div", { style: { padding: "14px 16px", borderBottom: "1px solid var(--fra-border)", display: "flex", flexDirection: S2 ? "column" : "row", alignItems: S2 ? "stretch" : "center", justifyContent: "space-between", gap: S2 ? 10 : 0 }, children: [import_jsx_runtime.jsxs("div", { children: [import_jsx_runtime.jsx("h2", { style: { fontSize: 16, fontWeight: 700, margin: 0, color: "var(--fra-heading)" }, children: "Funding Rate Arbitrage" }), import_jsx_runtime.jsxs("span", { style: { fontSize: 11, color: "var(--fra-muted)" }, children: ["Delta-Neutral · ", R2.targetExchange === "hyperliquid" ? "Hyperliquid" : "OKX"] })] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [import_jsx_runtime.jsx("button", { type: "button", onClick: () => {
    g2((e2) => {
      const t2 = e2 === "dark" ? "light" : "dark";
      return function(e3) {
        try {
          const t3 = { ..._s(), ...e3 };
          localStorage.setItem(Bs, JSON.stringify(t3));
        } catch {}
      }({ theme: t2 }), t2;
    });
  }, title: `Switch to ${f2 === "dark" ? "light" : "dark"} mode`, style: { padding: 6, borderRadius: 6, border: "1px solid var(--fra-border)", backgroundColor: "transparent", color: "var(--fra-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }, children: f2 === "dark" ? import_jsx_runtime.jsxs("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", children: [import_jsx_runtime.jsx("circle", { cx: 12, cy: 12, r: 5 }), import_jsx_runtime.jsx("line", { x1: 12, y1: 1, x2: 12, y2: 3 }), import_jsx_runtime.jsx("line", { x1: 12, y1: 21, x2: 12, y2: 23 }), import_jsx_runtime.jsx("line", { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }), import_jsx_runtime.jsx("line", { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }), import_jsx_runtime.jsx("line", { x1: 1, y1: 12, x2: 3, y2: 12 }), import_jsx_runtime.jsx("line", { x1: 21, y1: 12, x2: 23, y2: 12 }), import_jsx_runtime.jsx("line", { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }), import_jsx_runtime.jsx("line", { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 })] }) : import_jsx_runtime.jsx("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", children: import_jsx_runtime.jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }) }) }), import_jsx_runtime.jsx("button", { type: "button", onClick: D2 ? $2 : te2, title: D2 ? "Stop the engine — halts the scan loop and prevents new trades. Open positions remain until manually closed or the engine is restarted." : `Start the engine — begins the ${R2.scanIntervalSecs}s scan loop. The engine will fetch funding rates, evaluate opportunities against your config thresholds, and open delta-neutral positions (spot + perp) when criteria are met. In Dry Run mode, trades are simulated.`, style: { padding: 6, borderRadius: 6, border: "1px solid var(--fra-border)", backgroundColor: D2 ? "rgba(239,68,68,0.12)" : "rgba(16,185,129,0.12)", color: D2 ? "#ef4444" : "#10b981", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }, children: D2 ? import_jsx_runtime.jsxs("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "currentColor", stroke: "none", children: [import_jsx_runtime.jsx("rect", { x: 6, y: 5, width: 4, height: 14, rx: 1 }), import_jsx_runtime.jsx("rect", { x: 14, y: 5, width: 4, height: 14, rx: 1 })] }) : import_jsx_runtime.jsx("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "currentColor", stroke: "none", children: import_jsx_runtime.jsx("polygon", { points: "6,4 20,12 6,20" }) }) }), import_jsx_runtime.jsx("button", { type: "button", onClick: () => K2(true), style: { padding: 6, borderRadius: 6, border: "1px solid var(--fra-border)", backgroundColor: "transparent", color: "var(--fra-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }, title: "Settings", children: import_jsx_runtime.jsx(_a, { size: 16 }) }), import_jsx_runtime.jsxs("button", { type: "button", onClick: () => {
    R2.dryRun ? V2(true) : z2({ dryRun: true });
  }, title: R2.dryRun ? "Paper mode — all trades are simulated. Click to switch to live trading." : "Live mode — real orders are placed on the exchange. Click to switch to paper trading.", style: { padding: "4px 10px", borderRadius: 20, border: "1.5px solid " + (R2.dryRun ? "#f59e0b" : "#ef4444"), backgroundColor: R2.dryRun ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)", color: R2.dryRun ? "#f59e0b" : "#ef4444", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5, transition: "all 0.2s", marginLeft: S2 ? 0 : "auto" }, children: [import_jsx_runtime.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", backgroundColor: R2.dryRun ? "#f59e0b" : "#ef4444", display: "inline-block", boxShadow: "0 0 4px " + (R2.dryRun ? "#f59e0b" : "#ef4444") } }), R2.dryRun ? "Paper" : "Live"] })] })] }), G2 && import_jsx_runtime.jsxs("div", { style: { position: "fixed", inset: 0, zIndex: 1e4, display: "flex", alignItems: "center", justifyContent: "center" }, children: [import_jsx_runtime.jsx("div", { style: { position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }, onClick: () => V2(false) }), import_jsx_runtime.jsxs("div", { style: { ...ee2, position: "relative", width: "90%", maxWidth: 380, backgroundColor: "var(--fra-bg)", border: "1px solid var(--fra-border)", borderRadius: 12, padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }, children: [import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [import_jsx_runtime.jsx("span", { style: { fontSize: 20 }, children: "⚠️" }), import_jsx_runtime.jsx("h3", { style: { fontSize: 15, fontWeight: 700, margin: 0, color: "var(--fra-heading)" }, children: "Switch to Live Trading?" })] }), import_jsx_runtime.jsxs("p", { style: { fontSize: 13, lineHeight: 1.5, color: "var(--fra-text)", marginBottom: 8 }, children: ["This will place ", import_jsx_runtime.jsx("strong", { style: { color: "#ef4444" }, children: "real orders" }), " on ", R2.targetExchange === "hyperliquid" ? "Hyperliquid" : "OKX", " using your API keys. Real capital will be deployed."] }), import_jsx_runtime.jsxs("ul", { style: { fontSize: 12, color: "var(--fra-muted)", margin: "0 0 16px 16px", padding: 0, lineHeight: 1.6 }, children: [import_jsx_runtime.jsx("li", { children: "Spot buy + Perp short orders will execute on-chain" }), import_jsx_runtime.jsx("li", { children: "Margin health monitor tracks position safety" }), import_jsx_runtime.jsx("li", { children: "Positions exit only when funding flips AND max hold time expires" })] }), import_jsx_runtime.jsxs("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" }, children: [import_jsx_runtime.jsx("button", { type: "button", onClick: () => V2(false), style: { padding: "8px 16px", borderRadius: 6, border: "1px solid var(--fra-border)", backgroundColor: "transparent", color: "var(--fra-text)", fontSize: 13, fontWeight: 600, cursor: "pointer" }, children: "Cancel" }), import_jsx_runtime.jsx("button", { type: "button", onClick: () => {
    z2({ dryRun: false }), V2(false);
  }, style: { padding: "8px 16px", borderRadius: 6, border: "none", backgroundColor: "#ef4444", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }, children: "Go Live" })] })] })] }), import_jsx_runtime.jsxs("div", S2 ? { style: { display: "flex", flexDirection: "column", height: "calc(100vh - 80px)", minHeight: 360 }, children: [import_jsx_runtime.jsx("div", { style: { flex: 1, overflowY: "auto", minHeight: 0 }, children: import_jsx_runtime.jsxs("div", v === "dashboard" ? { style: { display: "flex", flexDirection: "column" }, children: [import_jsx_runtime.jsx(ya, { state: U2, wsConnected: W2, spotBalances: q2, maxSlippagePct: R2.maxSlippagePct, targetExchange: R2.targetExchange, dryRun: R2.dryRun, positionSizeUsd: R2.positionSizeUsd, settlementBalance: X2, zScoreWarmup: O2 }), import_jsx_runtime.jsx(Ua, { positions: U2.positions, fundingRates: H2, spotBalances: q2, maxSlippagePct: R2.maxSlippagePct, isDryRun: R2.dryRun, onCloseAll: B2 }), import_jsx_runtime.jsx("div", { style: { flexShrink: 0, padding: "0 16px 16px", borderTop: "1px solid var(--fra-border)", maxHeight: 280, overflow: "auto" }, children: import_jsx_runtime.jsx("div", { style: { paddingTop: 12 }, children: import_jsx_runtime.jsx(Ba, { events: b2 }) }) })] } : { style: { padding: "12px 16px", display: "flex", flexDirection: "column" }, children: [import_jsx_runtime.jsx("h4", { style: { fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--fra-heading)" }, children: "P&L History" }), import_jsx_runtime.jsx("div", { style: { flex: 1, minHeight: 180 }, children: import_jsx_runtime.jsx(Pa, { snapshots: F2, height: 300 }) }), import_jsx_runtime.jsx(Aa, { fundingRates: H2, positions: U2.positions, layout: "grid" })] }) }), import_jsx_runtime.jsx("div", { style: { display: "flex", borderTop: "1px solid var(--fra-border)", backgroundColor: "var(--fra-bg)", flexShrink: 0 }, children: ["dashboard", "chart"].map((e2) => import_jsx_runtime.jsx("button", { type: "button", onClick: () => x2(e2), style: { flex: 1, padding: "10px 0", border: "none", borderTop: v === e2 ? "2px solid var(--fra-accent)" : "2px solid transparent", backgroundColor: "transparent", color: v === e2 ? "var(--fra-heading)" : "var(--fra-muted)", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }, children: e2 === "dashboard" ? "\uD83D\uDCCA Dashboard" : "\uD83D\uDCC8 P&L History" }, e2)) })] } : { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto 1fr", minHeight: 360 }, children: [import_jsx_runtime.jsxs("div", { style: { borderRight: "1px solid var(--fra-border)", display: "flex", flexDirection: "column", overflow: "hidden", gridRow: "1 / -1" }, children: [import_jsx_runtime.jsx("div", { style: { flexShrink: 0 }, children: import_jsx_runtime.jsx(ya, { state: U2, wsConnected: W2, spotBalances: q2, maxSlippagePct: R2.maxSlippagePct, targetExchange: R2.targetExchange, dryRun: R2.dryRun, positionSizeUsd: R2.positionSizeUsd, settlementBalance: X2, zScoreWarmup: O2 }) }), import_jsx_runtime.jsx("div", { style: { flex: "0 0 auto", padding: "0 16px", marginTop: 12 }, children: import_jsx_runtime.jsx(Ba, { events: b2 }) })] }), import_jsx_runtime.jsxs("div", { style: { padding: "12px 16px", overflowY: "auto", display: "flex", flexDirection: "column", gridRow: "1 / -1", maxHeight: 600 }, children: [import_jsx_runtime.jsx("h4", { style: { fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--fra-heading)" }, children: "P&L History" }), import_jsx_runtime.jsxs("div", { style: { display: "flex", gap: 8, minHeight: 180 }, children: [import_jsx_runtime.jsx("div", { style: { flex: 1, minWidth: 0 }, children: import_jsx_runtime.jsx(Pa, { snapshots: F2, height: 240 }) }), import_jsx_runtime.jsx("div", { style: { width: 160, flexShrink: 0, overflowY: "auto", maxHeight: 240 }, children: import_jsx_runtime.jsx(Aa, { fundingRates: H2, positions: U2.positions, layout: "vertical", showTitle: true }) })] }), import_jsx_runtime.jsx("div", { style: { marginTop: 12 } }), import_jsx_runtime.jsx(Ua, { positions: U2.positions, fundingRates: H2, spotBalances: q2, maxSlippagePct: R2.maxSlippagePct, isDryRun: R2.dryRun, onCloseAll: B2 })] })] }), j2 && import_jsx_runtime.jsxs("div", { style: { position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }, children: [import_jsx_runtime.jsx("div", { style: { position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }, onClick: () => K2(false) }), import_jsx_runtime.jsxs("div", { style: { ...ee2, position: "relative", width: "90%", maxWidth: 440, maxHeight: "80vh", backgroundColor: "var(--fra-bg)", border: "1px solid var(--fra-border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column" }, children: [import_jsx_runtime.jsxs("div", { style: { padding: "14px 16px", borderBottom: "1px solid var(--fra-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [import_jsx_runtime.jsx("h3", { style: { fontSize: 15, fontWeight: 700, margin: 0, color: "var(--fra-heading)" }, children: "Configuration" }), import_jsx_runtime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [import_jsx_runtime.jsx("button", { type: "button", onClick: () => {
    window.confirm("Reset all settings to defaults?") && (Ms($s), z2($s), Z2("Settings reset to defaults"));
  }, style: { padding: 4, borderRadius: 6, border: "none", backgroundColor: "transparent", color: "var(--fra-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }, title: "Reset to defaults", children: import_jsx_runtime.jsx(Wa, { size: 16 }) }), import_jsx_runtime.jsx("button", { type: "button", onClick: () => K2(false), style: { padding: 4, borderRadius: 6, border: "none", backgroundColor: "transparent", color: "var(--fra-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }, title: "Close", children: import_jsx_runtime.jsx(Ma, { size: 18 }) })] })] }), import_jsx_runtime.jsx("div", { style: { overflowY: "auto", flex: 1 }, children: import_jsx_runtime.jsx(da, { config: R2, onChange: z2, exchangeKeys: y2, onKeysChange: m2, fundingRates: M2, liveBalance: X2 }) })] })] }), J2 && import_jsx_runtime.jsxs("div", { style: { position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", padding: "10px 20px", borderRadius: 8, backgroundColor: "var(--fra-card, #1f2937)", border: "1px solid var(--fra-border, #374151)", color: "var(--fra-heading, #f9fafb)", fontSize: 13, fontWeight: 600, boxShadow: "0 8px 24px rgba(0,0,0,0.4)", zIndex: 9999, animation: "fra-toast-in 0.25s ease-out" }, ref: (e2) => {
    if (e2) {
      const t2 = setTimeout(() => Z2(null), 2500);
      e2.dataset.timer = String(t2);
    }
  }, children: ["✓ ", J2] })] });
};

// client/use-supabase-fra.tsx
var import_react3 = __toESM(require_react(), 1);

// client/supabase-state-store.ts
class SupabaseStateStore {
  supabase;
  userId;
  constructor(supabase, userId) {
    this.supabase = supabase;
    this.userId = userId;
  }
  async save(state) {
    const { error } = await this.supabase.from("fra_state").upsert({
      user_id: this.userId,
      state,
      version: state.version,
      is_running: state.isRunning ?? false,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });
    if (error) {
      console.warn("[SupabaseStateStore] save failed:", error.message);
      return;
    }
    this.mirrorPositions(state);
    this.mirrorPnlSnapshot(state.pnlHistory);
  }
  async load() {
    const { data, error } = await this.supabase.from("fra_state").select("state, version").eq("user_id", this.userId).maybeSingle();
    if (error || !data)
      return null;
    const parsed = data.state;
    if (parsed.version !== m && parsed.version !== m - 1) {
      await this.clear();
      return null;
    }
    return {
      ...parsed,
      version: m,
      isRunning: parsed.isRunning ?? false
    };
  }
  async clear() {
    await this.supabase.from("fra_state").delete().eq("user_id", this.userId);
    await this.supabase.from("fra_positions").delete().eq("user_id", this.userId);
    await this.supabase.from("fra_pnl_history").delete().eq("user_id", this.userId);
  }
  async mirrorPositions(state) {
    if (!state.positions?.length)
      return;
    await this.supabase.from("fra_positions").upsert(state.positions.map((p2) => ({
      id: p2.id,
      user_id: this.userId,
      pair: p2.pair,
      exchange: p2.exchange,
      size_usd: p2.sizeUsd,
      opened_at: new Date(p2.openedAt).toISOString(),
      funding_collected: p2.fundingCollected,
      unrealized_pnl: p2.unrealizedPnl,
      status: p2.status,
      margin_health_pct: p2.marginHealthPct,
      execution_cost: p2.executionCost,
      raw: p2
    })), { onConflict: "id" });
  }
  async mirrorPnlSnapshot(history) {
    const latest = history[history.length - 1];
    if (!latest)
      return;
    await this.supabase.from("fra_pnl_history").insert({
      user_id: this.userId,
      timestamp: new Date(latest.timestamp).toISOString(),
      net_pnl: latest.netPnl,
      total_realized_pnl: latest.totalRealizedPnl,
      total_unrealized_pnl: latest.totalUnrealizedPnl,
      total_funding_collected: latest.totalFundingCollected,
      total_execution_cost: latest.totalExecutionCost,
      open_position_count: latest.openPositionCount
    });
  }
}

// client/use-subscription.tsx
var import_react2 = __toESM(require_react(), 1);
var ACTIVE_STATUSES = [
  "active",
  "trialing"
];
function useSubscription(supabase, userId) {
  const [status, setStatus] = import_react2.useState(null);
  const [loading, setLoading] = import_react2.useState(true);
  const [error, setError] = import_react2.useState(null);
  const fetchStatus = import_react2.useCallback(async () => {
    if (!userId) {
      setStatus(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: qErr } = await supabase.from("subscriptions").select("status").eq("user_id", userId).in("status", ACTIVE_STATUSES).maybeSingle();
    if (qErr) {
      setError(qErr.message);
      setStatus(null);
    } else {
      setError(null);
      setStatus(data?.status ?? null);
    }
    setLoading(false);
  }, [supabase, userId]);
  import_react2.useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);
  import_react2.useEffect(() => {
    if (!userId)
      return;
    const channel = supabase.channel(`subscriptions:${userId}`).on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "subscriptions",
      filter: `user_id=eq.${userId}`
    }, () => {
      fetchStatus();
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId, fetchStatus]);
  const redirectToCheckout = import_react2.useCallback(async (priceId) => {
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;
    if (!accessToken)
      throw new Error("Not authenticated");
    const { data, error: invokeErr } = await supabase.functions.invoke("create-checkout", {
      body: { priceId },
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (invokeErr)
      throw invokeErr;
    if (data?.url)
      window.location.assign(data.url);
  }, [supabase]);
  const openPortal = import_react2.useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;
    if (!accessToken)
      throw new Error("Not authenticated");
    const { data, error: invokeErr } = await supabase.functions.invoke("create-portal-session", { headers: { Authorization: `Bearer ${accessToken}` } });
    if (invokeErr)
      throw invokeErr;
    if (data?.url)
      window.location.assign(data.url);
  }, [supabase]);
  return import_react2.useMemo(() => ({
    status,
    isActive: status !== null && ACTIVE_STATUSES.includes(status),
    loading,
    error,
    redirectToCheckout,
    openPortal,
    refresh: fetchStatus
  }), [status, loading, error, redirectToCheckout, openPortal, fetchStatus]);
}

// client/use-supabase-fra.tsx
function useSupabaseFra(supabase) {
  const [userId, setUserId] = import_react3.useState(null);
  import_react3.useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active)
        setUserId(data.session?.user.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUserId(session?.user.id ?? null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);
  const subscription = useSubscription(supabase, userId);
  const store = import_react3.useMemo(() => userId && subscription.isActive ? new SupabaseStateStore(supabase, userId) : null, [supabase, userId, subscription.isActive]);
  const [revision, setRevision] = import_react3.useState(0);
  import_react3.useEffect(() => {
    if (!userId || !subscription.isActive)
      return;
    const channel = supabase.channel(`fra_state:${userId}`).on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "fra_state",
      filter: `user_id=eq.${userId}`
    }, () => setRevision((r2) => r2 + 1)).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId, subscription.isActive]);
  return { store, userId, revision, subscription };
}

// client/SubscriptionGate.tsx
var import_react4 = __toESM(require_react(), 1);
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function SubscriptionGate({
  supabase,
  userId,
  priceId,
  autoRedirect = true,
  children
}) {
  const sub = useSubscription(supabase, userId);
  import_react4.useEffect(() => {
    if (!autoRedirect)
      return;
    if (!userId)
      return;
    if (sub.loading)
      return;
    if (sub.isActive)
      return;
    sub.redirectToCheckout(priceId).catch((err) => {
      console.error("[SubscriptionGate] checkout redirect failed", err);
    });
  }, [autoRedirect, userId, sub.loading, sub.isActive, sub, priceId]);
  if (!userId) {
    return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
      style: styles.center,
      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
        children: "Please sign in to access the arbitrage dashboard."
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this);
  }
  if (sub.loading) {
    return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
      style: styles.center,
      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
        children: "Verifying subscription…"
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this);
  }
  if (!sub.isActive) {
    return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
      style: styles.center,
      children: [
        /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h2", {
          style: { marginBottom: 8 },
          children: "Subscription required"
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
          style: { marginBottom: 16, opacity: 0.8 },
          children: "An active subscription is required to use the Funding Rate Arbitrage dashboard."
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsx_dev_runtime.jsxDEV("button", {
          type: "button",
          style: styles.button,
          onClick: () => void sub.redirectToCheckout(priceId),
          children: "Subscribe to continue"
        }, undefined, false, undefined, this),
        sub.error && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
          style: { marginTop: 12, color: "#ef4444", fontSize: 13 },
          children: sub.error
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(jsx_dev_runtime.Fragment, {
    children
  }, undefined, false, undefined, this);
}
var styles = {
  center: {
    minHeight: 240,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    textAlign: "center"
  },
  button: {
    padding: "10px 18px",
    borderRadius: 8,
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: 600,
    cursor: "pointer"
  }
};

// client/index.tsx
var jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
var supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
var PRICE_ID = import.meta.env.VITE_STRIPE_PRICE_ID;
function index() {
  const { store, userId, revision, subscription } = useSupabaseFra(supabase);
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV(SubscriptionGate, {
    supabase,
    userId,
    priceId: PRICE_ID,
    children: store ? /* @__PURE__ */ jsx_dev_runtime2.jsxDEV(jsx_dev_runtime2.Fragment, {
      children: [
        /* @__PURE__ */ jsx_dev_runtime2.jsxDEV(Ha, {
          theme: "dark",
          persistenceStore: store,
          defaultConfig: { dryRun: true },
          onExecution: (e2) => console.log("[FRA]", e2),
          onError: (err) => console.error("[FRA]", err)
        }, revision, false, undefined, this),
        /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("div", {
          style: { textAlign: "center", marginTop: 16 },
          children: /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("button", {
            type: "button",
            onClick: () => void subscription.openPortal(),
            style: {
              padding: "6px 14px",
              borderRadius: 6,
              border: "1px solid #334155",
              background: "transparent",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: 13
            },
            children: "Manage subscription"
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this) : /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("div", {
      style: { textAlign: "center", padding: 24 },
      children: "Loading dashboard…"
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}
export {
  index
};
