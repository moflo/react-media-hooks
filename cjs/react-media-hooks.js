'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var MediaQueryList =
/*#__PURE__*/
function () {
  function MediaQueryList(targetWindow, query, listener) {
    var _this = this;

    this.nativeMediaQueryList = targetWindow.matchMedia(query);
    this.active = true; // Safari doesn't clear up listener with removeListener
    // when the listener is already waiting in the event queue.
    // Having an active flag to make sure the listener is not called
    // after we removeListener.

    this.cancellableListener = function () {
      _this.matches = _this.nativeMediaQueryList.matches;

      if (_this.active) {
        listener.apply(void 0, arguments);
      }
    };

    this.nativeMediaQueryList.addListener(this.cancellableListener);
    this.matches = this.nativeMediaQueryList.matches;
  }

  var _proto = MediaQueryList.prototype;

  _proto.cancel = function cancel() {
    this.active = false;
    this.nativeMediaQueryList.removeListener(this.cancellableListener);
  };

  return MediaQueryList;
}();

var useMediaHook = function useMediaHook(query) {
  var _useState = react.useState(null),
      isMobile = _useState[0],
      setIsMobile = _useState[1];

  var mobileQuery = query || 'only screen and (max-width: 992px)';

  function updateMatches() {
    var _mediaQueryList = mediaQueryList,
        matches = _mediaQueryList.matches;
    setIsMobile(matches);
  }

  var mediaQueryList = null;
  react.useEffect(function () {
    // if (typeof window !== 'object') return;
    // const targetWindow = this.props.targetWindow || window;
    var targetWindow = window; // invariant(
    //   typeof targetWindow.matchMedia === 'function',
    //   '<Media targetWindow> does not support `matchMedia`.'
    // );

    mediaQueryList = new MediaQueryList(targetWindow, mobileQuery, updateMatches);
    updateMatches();
    return function () {
      mediaQueryList && mediaQueryList.cancel();
    };
  }, [isMobile]);
  return isMobile;
};

exports.useMediaHook = useMediaHook;
