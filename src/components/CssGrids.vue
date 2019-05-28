<template lang="html">
  <div>
    <div class="header-container text-center mb-3">
      <b-form-group
      label-for="itemBgColor"
      label="Item Background Color:">
        <b-form-input id="itemBgColor" type="color" v-model="itemBgColor"></b-form-input>
      </b-form-group>
      <b-form-group
      label-for="align"
      label="Align Items:">
        <b-form-select id="align" v-model="alignItems" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group
      label-for="align"
      label="Justify Items:">
        <b-form-select id="align" v-model="justifyItems" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group
      label-for="align"
      label="Justify Content:">
        <b-form-select id="align" v-model="justifyContent" :options="justifyContentOptions"></b-form-select>
      </b-form-group>
    </div>
    <div class="container mb-5 text-center">
      <b-form-group
      label-for="gridTemplateColumns"
      label="Grid Template Columns:">
        <b-form-input id="gridTemplateColumns" type="text" v-model="gridTemplateColumns"></b-form-input>
      </b-form-group>
      <b-form-group
      label-for="gridTemplateRows"
      label="Grid Template Rows:">
        <b-form-input id="gridTemplateRows" type="text" v-model="gridTemplateRows"></b-form-input>
      </b-form-group>
      <b-form-group
      label-for="gridAutoColumns"
      label="Grid Auto Columns:">
        <b-form-input id="gridAutoColumns" type="text" v-model="gridAutoColumns"></b-form-input>
      </b-form-group>
      <b-form-group
      label-for="gridAutoRows"
      label="Grid Auto Rows:">
        <b-form-input id="gridAutoRows" type="text" v-model="gridAutoRows"></b-form-input>
      </b-form-group>
      <b-form-group
      label-for="gridAutoFlow"
      label="Grid Auto Flow:">
        <b-form-select id="gridAutoFlow" v-model="gridAutoFlow" :options="gridAutoFlowOptions"></b-form-select>
      </b-form-group>
      <b-form-group
      label-for="gridGap"
      label="Grid Gap:">
        <b-form-input id="gridGap" type="text" v-model="gridGap"></b-form-input>
      </b-form-group>
      <b-form-group
      label-for="gridColumnGap"
      label="Grid Column Gap:">
        <b-form-input id="gridColumnGap" type="text" v-model="gridColumnGap"></b-form-input>
      </b-form-group>
      <b-form-group
      label-for="gridRowGap"
      label="Grid Row Gap:">
        <b-form-input id="gridRowGap" type="text" v-model="gridRowGap"></b-form-input>
      </b-form-group>
      <code class="code text-left mt-5">
        <pre class="text-light">
          .grid {
            display: grid;
            justify-content: {{justifyContent}};
            grid-template-columns: {{gridTemplateColumns}};
            grid-template-rows: {{gridTemplateRows}};
            grid-auto-columns: {{gridAutoColumns}};
            grid-auto-rows: {{gridAutoRows}};
            grid-column-gap: {{gridColumnGap}};
            grid-row-gap: {{gridRowGap}};
            grid-gap: {{gridGap}};
            align-items: {{alignItems}};
            justify-items: {{justifyItems}};
            grid-auto-flow: {{gridAutoFlow}};
          }
        </pre>
      </code>
    </div>
    <div v-if="itemObject.name">
      <hr>
      <h4 class="text-warning text-center">{{itemObject.name}}</h4>
      <div class="container text-center">
        <b-form-group
        label-for="gridColumn"
        label="Grid Column:">
          <b-form-input id="gridColumn" type="text" v-model="itemObject.gridColumn" @input="putChange(itemObject.name, 'gridColumn')"></b-form-input>
        </b-form-group>
        <b-form-group
        label-for="gridRow"
        label="Grid Row:">
          <b-form-input id="gridRow" type="text" v-model="itemObject.gridRow" @input="putChange(itemObject.name, 'gridRow')"></b-form-input>
        </b-form-group>
        <b-form-group
        label-for="alignSelf"
        label="Align Self:">
          <b-form-select id="alignSelf" type="text" v-model="itemObject.alignSelf" :options="options" @input="putChange(itemObject.name, 'alignSelf')"></b-form-select>
        </b-form-group>
        <b-form-group
        label-for="justifySelf"
        label="Justify Self:">
          <b-form-select id="justifySelf" type="text" v-model="itemObject.justifySelf" :options="options" @input="putChange(itemObject.name, 'justifySelf')"></b-form-select>
        </b-form-group>
        <code class="item-code text-left mt-5">
          <pre class="text-light">
            .{{itemObject.name}} {
              gridColumn: {{itemObject.gridColumn}},
              gridRow: {{itemObject.gridRow}},
              alignSelf: {{itemObject.alignSelf}},
              justifySelf: {{itemObject.justifySelf}},
            }
          </pre>
        </code>
      </div>
      <hr>
    </div>
    <div class="mb-5">
      <b-row align-h="around">
        <b-col class="text-right">
          <b-button
          variant="success"
          @click="addItem()">
          Add Item
          </b-button>
        </b-col>
        <b-col class="text-center">
          <b-button
          variant="warning"
          @click="preSet()">
          Preset
          </b-button>
        </b-col class="text-left">
        <b-col>
          <b-button
          variant="danger"
          @click="clearItems()">
          Clear All Items
          </b-button>
        </b-col>
      </b-row>
    </div>
    <div class="grid mb-5" :style="cssProps">
      <b-form-checkbox :class="{[item.name]: true}" v-for="item in items" v-model="itemObject" :value="item" button>
        {{ item.name }}
        <b-button
        variant="danger"
        size="sm"
        @click="removeItem(item)">
        X
        </b-button>
      </b-form-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemBgColor: '#cb99e2',
      alignItems: 'stretch',
      justifyItems: 'stretch',
      justifyContent: 'center',
      gridTemplateColumns: 'repeat(3, 150px)',
      gridTemplateRows: 'repeat(3, 100px)',
      gridAutoRows: '150px',
      gridAutoColumns: '150px',
      gridColumnGap: '1em',
      gridRowGap: '1em',
      gridAutoFlow: 'row',
      gridAutoFlowOptions: [
        { value: 'auto', text: 'auto' },
        { value: 'row', text: 'row' },
        { value: 'column', text: 'column' },
        { value: 'row-dense', text: 'row-dense' },
        { value: 'column-dense', text: 'column-dense' }
      ],
      options: [
        { value: 'auto', text: 'auto' },
        { value: 'start', text: 'start' },
        { value: 'end', text: 'end' },
        { value: 'center', text: 'center' },
        { value: 'stretch', text: 'stretch' }
      ],
      justifyContentOptions: [
        { value: 'auto', text: 'auto' },
        { value: 'start', text: 'start' },
        { value: 'end', text: 'end' },
        { value: 'center', text: 'center' },
        { value: 'stretch', text: 'stretch' },
        { value: 'space-around', text: 'space-around' },
        { value: 'space-between', text: 'space-between' },
        { value: 'space-evenly', text: 'space-evenly' }
      ],
      items: [],
      itemObject: {
        name: null,
        gridColumn: null,
        gridRow: null,
        alignSelf: null,
        justifySelf: null
      }
    }
  },
  methods: {
    addItem() {
      var l = this.items.length
      this.items.push({
        name: 'item' + l,
        gridColumn: null,
        gridRow: null,
        alignSelf: null,
        justifySelf: null
      })
    },
    removeItem(item) {
      var idx = this.items.indexOf(item)
      this.items.splice(idx, 1)
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
    putChange(itemName, key) {
      var el = document.querySelector("div.grid div." + itemName)
      el.style[key] = this.itemObject[key]
    },
    inverseColor(color) {
      // code taken from http://www.mattlag.com/scripting/hexcolorinverter.php
      var hexnum = color.substring(1)
      var hexnum = hexnum.toUpperCase();
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
      this.items.push({
        name: 'item0',
        gridColumn: null,
        gridRow: null,
        alignSelf: null,
        justifySelf: null
      })
      setTimeout(() => {
        var el = document.querySelector("div.grid div.item0")
        el.style['gridColumn'] = '1/span 3'
        el.style['gridRow'] = '1/2'
      }, 1)
      this.items.push({
        name: 'item1',
        gridColumn: null,
        gridRow: null,
        alignSelf: null,
        justifySelf: null
      })
      setTimeout(() => {
        var el = document.querySelector("div.grid div.item1")
        el.style['gridColumn'] = '3/4'
        el.style['gridRow'] = '1/span 3'
      }, 1)
      this.items.push({
        name: 'item2',
        gridColumn: null,
        gridRow: null,
        alignSelf: null,
        justifySelf: null
      })
      setTimeout(() => {
        var el = document.querySelector("div.grid div.item2")
        el.style['gridColumn'] = '-4/span 3'
        el.style['gridRow'] = '3/4'
      }, 1)
      this.items.push({
        name: 'item3',
        gridColumn: null,
        gridRow: null,
        alignSelf: null,
        justifySelf: null
      })
      setTimeout(() => {
        var el = document.querySelector("div.grid div.item3")
        el.style['gridColumn'] = '1/2'
        el.style['gridRow'] = '1/span 3'
      }, 1)
    }
  },
  computed: {
    cssProps() {
      return {
        '--item-bg-color': this.itemBgColor,
        '--inverse-color': this.inverseColor(this.itemBgColor),
        '--align-items': this.alignItems,
        '--justify-items': this.justifyItems,
        '--justify-content': this.justifyContent,
        '--grid-template-columns': this.gridTemplateColumns,
        '--grid-template-rows': this.gridTemplateRows,
        '--grid-auto-columns': this.gridAutoColumns,
        '--grid-auto-rows': this.gridAutoRows,
        '--grid-column-gap': this.gridColumnGap,
        '--grid-row-gap': this.gridRowGap,
        '--grid-gap': this.gridRowGap + ' ' + this.gridColumnGap,
        '--grid-auto-flow': this.gridAutoFlow,
      }
    },
    gridGap: {
      // getter
      get: function () {
        return this.gridRowGap + ' ' + this.gridColumnGap
      },
      // setter
      set: function (newValue) {
        var regex = /\d(em|fr|px|rem)/g
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
div >>> label.btn.btn-secondary {
  background-color: var(--item-bg-color);
  border: 1px solid;
}
div >>> label.btn.btn-secondary.active {
  background-color: var(--inverse-color);
  border: 1px solid;
}
.grid {
  display: grid;
  justify-content: var(--justify-content);
  grid-template-columns: var(--grid-template-columns);
  grid-template-rows: var(--grid-template-rows);
  grid-auto-columns: var(--grid-auto-columns);
  grid-auto-rows: var(--grid-auto-rows);
  grid-column-gap: var(--grid-column-gap);
  grid-row-gap: var(--grid-row-gap);
  grid-gap: var(--grid-gap);
  align-items: var(--align-items);
  justify-items: var(--justify-items);
  grid-auto-flow: var(--grid-auto-flow);
}
.grid > div {
  border: 1px solid #c342d2;
  background: var(--item-bg-color);
  opacity: 0.75;
}
.input-width {
  width: 200px;
}
.header-container {
  display: grid;
  justify-content: center;
  grid-auto-rows: minmax(1em, auto);
  grid-auto-flow: row;
  grid-column-gap: 1em;
}
@media (min-width: 40em) {
  .header-container {
    grid-template-columns: repeat(4, 11em);
    grid-column-gap: 1em;
  }
  .container {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 18em);
    grid-template-rows: auto;
    grid-column-gap: 1em;
  }
}
.container {
  display: grid;
  justify-content: center;
  grid-auto-flow: row;
  grid-column-gap: 1em;
}
.code {
  grid-area: 1/3/5/4;
  place-self: center;
}
.item-code {
  grid-area: 1/3/3/4;
  align-self: center;
}
hr {
  background-color: purple;
  width: 75em;
}
input, div >>> select {
  text-align: center;
}
</style>