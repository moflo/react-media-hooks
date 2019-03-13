import React from 'react';
import {render, cleanup} from 'react-testing-library'

import { useMediaHook } from '../index';

function createMockMediaMatcher(matches) {
    return () => ({
      matches,
      addListener: () => {},
      removeListener: () => {}
    });
  }
  
function testHook(useHook, props) {
    const RenderProp = ({children, ...rest}) => children(useHook(rest))
    const returnVal = {}
    render(
      <RenderProp {...props}>
        {val => {
          // may need some special treatment if the
          // return value is not an object of values...
          console.log('testHook, return value: ', val)
          let values = {val}
          Object.assign(returnVal, values)
          return null
        }}
      </RenderProp>,
    )
    return returnVal
  }
  
describe('rendered on the server', () => {
    beforeEach(() => {
      window.matchMedia = createMockMediaMatcher(true);

    });

    it('returns a value', () => {
      const mediaHook = testHook(useMediaHook);

      expect(mediaHook.val).toMatch(true);
    });
  });
