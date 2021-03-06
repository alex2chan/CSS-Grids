<template lang="html">
  <div>
    <div class="header-container text-center mb-3">
      <b-form-group>
        <label for="itemBgColor">Item Background Color: <i class="far fa-question-circle" v-b-tooltip.hover title="Changes the background color of the items"></i></label>
        <b-form-input id="itemBgColor" type="color" v-model="itemBgColor"></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="alignItems">Align Items: <i class="far fa-question-circle" v-b-tooltip.hover title="Changes the vertical alignment of the items"></i></label>
        <b-form-select id="alignItems" v-model="alignItems" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group>
        <label for="justifyItems">Justify Items: <i class="far fa-question-circle" v-b-tooltip.hover title="Changes the horizontal alignment of the items"></i></label>
        <b-form-select id="justifyItems" v-model="justifyItems" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group>
        <label for="alignContent">Align Content: <i class="far fa-question-circle" v-b-tooltip.hover title="Changes the vertical alignment of the grid"></i></label>
        <b-form-select id="alignContent" v-model="alignContent" :options="contentOptions"></b-form-select>
      </b-form-group>
      <b-form-group>
        <label for="justifyContent">Justify Content: <i class="far fa-question-circle" v-b-tooltip.hover title="Changes the horizontal alignment of the grid"></i></label>
        <b-form-select id="justifyContent" v-model="justifyContent" :options="contentOptions"></b-form-select>
      </b-form-group>
    </div>
    <div class="container mb-5 text-center">
      <b-form-group>
        <label for="gridTemplateColumns">Grid Template Columns: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines the explicit columns of the grid"></i></label>
        <b-form-input id="gridTemplateColumns" type="text" v-model="gridTemplateColumns"></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="gridTemplateRows">Grid Template Rows: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines the explicit rows of the grid"></i></label>
        <b-form-input id="gridTemplateRows" type="text" v-model="gridTemplateRows"></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="gridAutoColumns">Grid Auto Columns: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines the implicit columns of the grid"></i></label>
        <b-form-input id="gridAutoColumns" type="text" v-model="gridAutoColumns"></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="gridAutoRows">Grid Auto Rows: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines the implicit rows of the grid"></i></label>
        <b-form-input id="gridAutoRows" type="text" v-model="gridAutoRows"></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="gridAutoFlow">Grid Auto Flow: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines the auto-placement algorithm of items"></i></label>
        <b-form-select id="gridAutoFlow" v-model="gridAutoFlow" :options="gridAutoFlowOptions"></b-form-select>
      </b-form-group>
      <b-form-group>
        <label for="gridGap">Grid Gap: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines grid gaps where Left is Row and Right is Column"></i></label>
        <b-form-input id="gridGap" type="text" v-model="gridGap"></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="gridColumnGap">Grid Column Gap: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines the grid column gap"></i></label>
        <b-form-input id="gridColumnGap" type="text" v-model="gridColumnGap"></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="gridRowGap">Grid Row Gap: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines the grid row gap"></i></label>
        <b-form-input id="gridRowGap" type="text" v-model="gridRowGap"></b-form-input>
      </b-form-group>
      <b-form-group
      class="gridArea">
        <label for="gridTemplateAreas">Grid Template Areas: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines named areas in the grid (Be sure that the areas are defined in rectangles only, it can be vertically or horizontally)"></i></label>
        <b-form-input id="gridTemplateAreas" type="text" v-model="gridTemplateAreas"></b-form-input>
      </b-form-group>
      <code class="code text-left">
        <pre class="text-light">
          {{ getGridCode() }}
          .grid {

            {{ beautify(gridStyleCode) }}
          }
        </pre>
      </code>
    </div>
    <div class="button-container mb-5">
      <b-button
      variant="success"
      @click="addItem()">
      Add Item
      </b-button>
      <b-button
      variant="warning"
      @click="preSet()">
      Preset
      </b-button>
      <b-button
      variant="danger"
      @click="clearItems()">
      Clear All Items
      </b-button>
    </div>
    <div class="resizable">
      <div class="grid mb-5" :style="[gridStyle]" id="grid">
        <b-form-checkbox size="sm" :class="{[item.name]: true}" v-for="item in items" v-model="itemObject" :value="item" button :key="item.id" :style="item">
          {{ item.name.substring(4) }}
        </b-form-checkbox>
      </div>
    </div>
    <div v-if="itemObject.name">
      <hr>
      <h4 class="text-warning text-center">{{itemObject.name}}</h4>
      <div class="container text-center">
        <b-form-group>
          <label for="gridColumn">Grid Column: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines the column position/span of the item"></i></label>
          <b-form-input id="gridColumn" type="text" v-model="itemObject.gridColumn"></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="gridRow">Grid Row: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines the row position/span of the item"></i></label>
          <b-form-input id="gridRow" type="text" v-model="itemObject.gridRow"></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="alignSelf">Align Self: <i class="far fa-question-circle" v-b-tooltip.hover title="Changes the vertical position of the items (Overwrites the align-items grid property)"></i></label>
          <b-form-select id="alignSelf" type="text" v-model="itemObject.alignSelf" :options="options"></b-form-select>
        </b-form-group>
        <b-form-group>
          <label for="justifySelf">Justify Self: <i class="far fa-question-circle" v-b-tooltip.hover title="Changes the horizontal position of the items (Overwrites the justify-items grid property)"></i></label>
          <b-form-select id="justifySelf" type="text" v-model="itemObject.justifySelf" :options="options"></b-form-select>
        </b-form-group>
        <b-form-group
        class="gridArea">
          <label for="gridArea">Grid Area: <i class="far fa-question-circle" v-b-tooltip.hover title="Defines the named area to place the item in"></i></label>
          <b-form-input id="gridArea" type="text" v-model="itemObject.gridArea"></b-form-input>
        </b-form-group>
        <code class="code text-left">
          <pre class="text-light">
            {{ getItemCode(itemObject.name) }}
            .{{itemObject.name}} {

              {{ beautify(itemStyleCode) }}
            }
          </pre>
        </code>
      </div>
      <div class="text-center">
        <b-button
        variant="danger"
        size="sm"
        @click="removeItem(itemObject.name)">
        Delete Item
        </b-button>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CssGrids',
  data() {
    return {
      alignItems: 'stretch',
      justifyItems: 'stretch',
      alignContent: 'center',
      justifyContent: 'center',
      gridColumnGap: '1em',
      gridRowGap: '1em',
      gridAutoFlow: 'initial',
      gridTemplateColumns: 'repeat(auto-fit, 50px)',
      gridTemplateRows: 'repeat(auto-fit, 50px)',
      gridTemplateAreas: '"header header header" "sidebar sidebar ." ". footer footer"',
      gridAutoRows: '50px',
      gridAutoColumns: '50px',
      itemBgColor: '#cb99e2',
      gridAutoFlowOptions: [
        { value: 'initial', text: 'initial' },
        { value: 'row', text: 'row' },
        { value: 'column', text: 'column' },
        { value: 'row dense', text: 'row dense' },
        { value: 'column dense', text: 'column dense' }
      ],
      options: [
        { value: 'initial', text: 'initial' },
        { value: 'start', text: 'start' },
        { value: 'end', text: 'end' },
        { value: 'center', text: 'center' },
        { value: 'stretch', text: 'stretch' }
      ],
      contentOptions: [
        { value: 'initial', text: 'initial' },
        { value: 'start', text: 'start' },
        { value: 'end', text: 'end' },
        { value: 'center', text: 'center' },
        { value: 'stretch', text: 'stretch' },
        { value: 'space-around', text: 'space-around' },
        { value: 'space-between', text: 'space-between' },
        { value: 'space-evenly', text: 'space-evenly' }
      ],
      items: [],
      itemsRemoved: [],
      itemObject: {
        name: null,
        gridColumn: null,
        gridRow: null,
        alignSelf: null,
        justifySelf: null,
        gridArea: null
      },
      gridStyleCode: '',
      itemStyleCode: ''
    }
  },
  methods: {
    addItem() {
      var item = {
        gridColumn: 'initial',
        gridRow: 'initial',
        alignSelf: null,
        justifySelf: null,
        gridArea: 'initial'
      }
      if (this.itemsRemoved.length > 0) {
        item.name = this.itemsRemoved[this.itemsRemoved.length-1]
        this.items.push(item)
        this.itemsRemoved.pop()
      } else {
        var l = this.items.length
        item.name = 'item' + l
        this.items.push(item)
      }
    },
    removeItem(itemName) {
      var item = this.items.find(x => x.name == itemName)
      var idx = this.items.indexOf(item)
      this.items.splice(idx, 1)
      this.itemsRemoved.push(itemName)
      this.itemsRemoved.sort(function(a, b) {
        var aI = parseInt(a.substring(4))
        var bI = parseInt(b.substring(4))
        return bI - aI
      })
      if (this.itemObject) {
        this.itemObject.name = null
      }
    },
    clearItems() {
      this.items = []
      if (this.itemObject) {
        this.itemObject.name = null
      }
    },
    inverseColor(color) {
      // code taken from http://www.mattlag.com/scripting/hexcolorinverter.php
      var hexnum = color.substring(1)
      hexnum = hexnum.toUpperCase();
      var splitnum = hexnum.split("");
      var resultnum = "";
      var simplenum = "FEDCBA9876".split("");
      var complexnum = new Array();
      complexnum.A = "5";
      complexnum.B = "4";
      complexnum.C = "3";
      complexnum.D = "2";
      complexnum.E = "1";
      complexnum.F = "0";

      for(var i = 0; i < 6; i++){
        if(!isNaN(splitnum[i])) {
          resultnum += simplenum[splitnum[i]];
        } else if(complexnum[splitnum[i]]){
          resultnum += complexnum[splitnum[i]];
        } else {
          alert("Hex colors must only include hex numbers 0-9, and A-F");
          return false;
        }
      }

      return "#" + resultnum;
    },
    preSet() {
      this.items = []
      if (this.itemObject) {
        this.itemObject.name = null
      }
      var itemSubObject = {
        alignSelf: null,
        justifySelf: null
      }
      this.items.push({
        name: 'item0',
        gridColumn: '1/span 2',
        gridRow: '1/2',
        ...itemSubObject
      })
      this.items.push({
        name: 'item1',
        gridColumn: '3/4',
        gridRow: '1/span 2',
        ...itemSubObject
      })
      this.items.push({
        name: 'item2',
        gridColumn: '2/span 2',
        gridRow: '3/4',
        ...itemSubObject
      })
      this.items.push({
        name: 'item3',
        gridColumn: '1/2',
        gridRow: '2/span 2',
        ...itemSubObject
      })
    },
    getGridCode() {
      setTimeout(() => {
        var el = document.querySelector('div.grid')
        var colorTerm = /\s--i.+?(color:#).{6};/g
        var code = el.style.cssText.replace(colorTerm, '')
        var dashedTerm = /--/g
        code = code.replace(dashedTerm, '')
        var addSpaceTerm = /(ns:|ws:|as:)/g
        code = code.replace(addSpaceTerm, '$1 ')
        this.gridStyleCode = code
      }, 1)
    },
    getItemCode(itemName) {
      setTimeout(() => {
        var el = document.querySelector('div.grid div.' + itemName)
        this.itemStyleCode = el.style.cssText
      }, 1)
    },
    beautify(code) {
      var searchTerm = /;/g
      return code.replace(searchTerm, ';\n')
    }
  },
  computed: {
    gridStyle() {
      return {
        alignItems: this.alignItems,
        justifyItems: this.justifyItems,
        alignContent: this.alignContent,
        justifyContent: this.justifyContent,
        gridColumnGap: this.gridColumnGap,
        gridRowGap: this.gridRowGap,
        gridAutoFlow: this.gridAutoFlow,
        '--item-bg-color': this.itemBgColor,
        '--inverse-color': this.inverseColor(this.itemBgColor),
        '--grid-template-columns': this.gridTemplateColumns,
        '--grid-template-rows': this.gridTemplateRows,
        '--grid-auto-columns': this.gridAutoColumns,
        '--grid-auto-rows': this.gridAutoRows,
        '--grid-template-areas': this.gridTemplateAreas
      }
    },
    gridGap: {
      get: function () {
        return this.gridRowGap + ' ' + this.gridColumnGap
      },
      set: function (newValue) {
        var regex = /\d+\w+/g
        var found = newValue.match(regex)
        if (found != null && found.length == 2) {
          this.gridRowGap = found[0]
          this.gridColumnGap = found[1]
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
pre, code{
  white-space: pre-line;
}
hr {
  background-color: purple;
}
input, div >>> select {
  text-align-last: center;
}
div >>> label.btn.btn-secondary {
  background-color: var(--item-bg-color);
  border: none;
}
div >>> label.btn.btn-secondary.active {
  background-color: var(--inverse-color);
  border: none;
}
.grid {
  display: grid;
  grid-template-columns: var(--grid-template-columns);
  grid-template-rows: var(--grid-template-rows);
  grid-auto-columns: var(--grid-auto-columns);
  grid-auto-rows: var(--grid-auto-rows);
  grid-template-areas: var(--grid-template-areas);
}
.resizable {
  width: auto;
  height: auto;
  border: 1px solid white;
  resize: horizontal;
  margin: auto;
  overflow: scroll;
}
.grid > div {
  border: 1px solid #c342d2;
  background: var(--item-bg-color);
  opacity: 0.75;
}
.header-container {
  display: grid;
  place-content: center;
  grid-template-columns: repeat(auto-fit, 12em);
  grid-column-gap: 1em;
}
.button-container {
  display: grid;
  justify-content: center;
  place-items: center;
  grid-template-columns: repeat(auto-fit, 10em);
  grid-column-gap: 5em;
  grid-row-gap: 1em;
}
.container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(auto, 23em));
  grid-column-gap: 1em;
}
@media (min-width: 992px) {
  .code {
    grid-column: 1/3;
    place-self: center;
  }
  .gridArea {
    grid-column: 1/3;
  }
}
</style>
