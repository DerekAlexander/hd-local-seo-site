/**
 * Color palette extracted from Figma design
 * All colors match the original design exactly
 */

export const colors = {
  // Text colors
  text: {
    dark: 'rgba(30, 30, 30, 1)',           // #1e1e1e
    gray: 'rgba(117, 117, 117, 1)',        // #757575
    lightGray: 'rgba(217, 217, 217, 1)',   // #d9d9d9
    darkGreen: 'rgba(27, 52, 0, 1)',       // #1b3400
    oliveGreen: 'rgba(35, 47, 19, 1)',     // #232f13 (with 55% opacity in design)
    blue: 'rgba(77, 108, 161, 1)',         // #4d6ca1
    teal: 'rgba(3, 25, 31, 1)',            // #03191f
    white: 'rgba(255, 255, 255, 1)',       // #ffffff
    offWhite: 'rgba(250, 250, 250, 1)',    // #fafafa
    black: 'rgba(0, 0, 0, 1)',             // #000000
  },

  // Background colors
  background: {
    white: 'rgba(255, 255, 255, 1)',       // #ffffff
    offWhite: 'rgba(250, 250, 250, 1)',    // #fafafa
    darkTeal: 'rgba(3, 25, 31, 1)',        // #03191f
    darkGreen: 'rgba(27, 52, 0, 1)',       // #1b3400
    darkGray: 'rgba(30, 30, 30, 1)',       // #1e1e1e
    gold: 'rgba(255, 195, 72, 1)',         // #ffc348
    goldLight: 'rgba(245, 201, 110, 1)',   // #f5c96e
    goldSemiTransparent: 'rgba(255, 195, 72, 0.53)',  // #ffc348 at 53% opacity
    blue: 'rgba(94, 138, 235, 1)',         // #5e8aeb
    tealSemiTransparent: 'rgba(3, 25, 31, 0.5)',      // #03191f at 50% opacity
  },

  // Border colors
  border: {
    light: 'rgba(217, 217, 217, 1)',       // #d9d9d9
    dark: 'rgba(30, 30, 30, 1)',           // #1e1e1e
    black: 'rgba(0, 0, 0, 1)',             // #000000
  },

  // Special
  shadow: 'rgba(0, 0, 0, 0.5)',            // Black at 50% opacity for shadows
};

export default colors;
