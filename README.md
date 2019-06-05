# CSS-Grids

It is recommended to take a look at the 'Complete Guide to Grid' in which this app is based on: https://css-tricks.com/snippets/css/complete-guide-grid/

This app is built for learning purposes only.

## Setup

To run locally, first get npm:
https://www.npmjs.com/get-npm

Then clone the repository to a folder and at that folder, run:
```
npm install
```
to install the dependencies

Then run it in development mode:
```
npm run serve
```

## Notes

#### Using the repeat() and minmax() CSS functions
Whenever things become repetitive, for example declaring:
```
.grid {
  grid-template-columns: 100px 100px 100px
}
```

We can shorten it by using the repeat() function like so:
```
.grid {
  grid-template-columns: repeat(3, 100px)
}
```

Which translates to 'repeat 100px 3 times'.
The first argument in the repeat function takes in the number of times you want to repeat something.
The second argument takes in the value that you want to repeat.

The minmax function takes in the minimum and maximum size and restricts an element's size to be between them. This provides a bit of flexibility to CSS grids.

More information can be found here:  
https://developer.mozilla.org/en-US/docs/Web/CSS/repeat  
https://developer.mozilla.org/en-US/docs/Web/CSS/minmax

#### Using the keywords min-content, max-content, auto, auto-fill, auto-fit
This is where CSS grids can become really flexible. Instead of just putting a fixed size like "100px", one could instead use the keyword "auto" to automatically size an element based on its content. The same goes with min-content and max-content.

The keywords auto-fill and auto-fit can be used as the first argument of the repeat function. When "auto-fill" is used with the repeat function on the grid-template-columns property, the width of the grid will span the entire width of its parent. If the width of the parent changes depending on screen size or some other factors, the grid will also react to that. 

When "auto-fit" is used, "auto-fill" is first executed, then any empty grid items will be collapsed. The effect that this has is that the grid items are now placed in the center.

This is not everything CSS grids has to offer, more information can be found here:  
https://developer.mozilla.org/en-US/docs/Web/CSS/grid

#### Grid Template Areas
When defining grid template areas, the cells have to form a rectangle **only**, otherwise the declaration is invalid. It can be a vertical or a horizontal rectangle. An "L" shape would not work.

More information can be found here:  
https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas

#### CSS Variables in Vue
To make the CSS properties reactive, the convention of CSS variables are used. By using CSS variables I can directly manipulate the CSS property to any valid value. In Vue, we would want the CSS variable to be referenced to a property in the data or the computed object so that it becomes reactive. Then we could reference this property to a html element (for e.g. the input element) by binding it to a v-model attribute.

This is not the end because variables in CSS are referenced within the <style></style> block only. So the CSS variables that have been defined in the data or computed object property has to be put back into the <style></style> block. To do that, we bind the style property to the data or computed object property that contains our CSS variables.

More information can be found here:  
https://github.com/vuejs/vue/issues/7346  
https://developer.mozilla.org/en-US/docs/Web/CSS/var  
https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties 
