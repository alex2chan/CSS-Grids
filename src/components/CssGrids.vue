<template lang="html">
  <div>
    <div class="header-container text-center mb-3">
      <b-form-group
      label-for="itemBgColor"
      label="Item Background Color:">
        <b-form-input id="itemBgColor" type="color" v-model="itemBgColor"></b-form-input>
      </b-form-group>
      <b-form-group
      label-for="alignItems"
      label="Align Items:">
        <b-form-select id="alignItems" v-model="alignItems" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group
      label-for="justifyItems"
      label="Justify Items:">
        <b-form-select id="justifyItems" v-model="justifyItems" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group
      label-for="alignContent"
      label="Align Content:">
        <b-form-select id="alignContent" v-model="alignContent" :options="contentOptions"></b-form-select>
      </b-form-group>
      <b-form-group
      label-for="justifyContent"
      label="Justify Content:">
        <b-form-select id="justifyContent" v-model="justifyContent" :options="contentOptions"></b-form-select>
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
      <code class="code text-left">
        <pre class="text-light">
          {{ getGridCode() }}
          .grid {

            {{ beautify(gridStyleCode) }}
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
          <b-form-input id="gridColumn" type="text" v-model="itemObject.gridColumn"></b-form-input>
        </b-form-group>
        <b-form-group
        label-for="gridRow"
        label="Grid Row:">
          <b-form-input id="gridRow" type="text" v-model="itemObject.gridRow"></b-form-input>
        </b-form-group>
        <b-form-group
        label-for="alignSelf"
        label="Align Self:">
          <b-form-select id="alignSelf" type="text" v-model="itemObject.alignSelf" :options="options"></b-form-select>
        </b-form-group>
        <b-form-group
        label-for="justifySelf"
        label="Justify Self:">
          <b-form-select id="justifySelf" type="text" v-model="itemObject.justifySelf" :options="options"></b-form-select>
        </b-form-group>
        <code class="item-code text-left">
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
    <table v-if="checkGrid" id="table" class="text-center" align="center">
      <colgroup>
        <col :class="{[col.name]: true}" v-for="col in gridTemplateColumnsArray" :style="{width: returnLength(col.width, gridColumnGap)}">
      </colgroup>
      <tr v-for="row in gridTemplateRowsArray" :style="{height: returnLength(row.height, gridRowGap)}">
        <td v-for="col in gridTemplateColumnsArray">
        </td>
      </tr>
    </table>
    <div class="grid mb-5" :style="[gridStyle, gridTop]" id="grid">
      <b-form-checkbox size="sm" :class="{[item.name]: true}" v-for="item in items" v-model="itemObject" :value="item" button :key="item.id" :style="item">
        {{ item.name.substring(4) }}
      </b-form-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alignItems: 'stretch',
      justifyItems: 'stretch',
      alignContent: 'center',
      justifyContent: 'center',
      gridColumnGap: '1em',
      gridRowGap: '1em',
      gridAutoFlow: 'unset',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 200px))',
      gridTemplateRows: 'repeat(auto-fit, minmax(100px, 200px))',
      gridAutoRows: '100px',
      gridAutoColumns: '100px',
      itemBgColor: '#cb99e2',
      gridAutoFlowOptions: [
        { value: 'unset', text: 'unset' },
        { value: 'row', text: 'row' },
        { value: 'column', text: 'column' },
        { value: 'row dense', text: 'row dense' },
        { value: 'column dense', text: 'column dense' }
      ],
      options: [
        { value: 'unset', text: 'unset' },
        { value: 'start', text: 'start' },
        { value: 'end', text: 'end' },
        { value: 'center', text: 'center' },
        { value: 'stretch', text: 'stretch' }
      ],
      contentOptions: [
        { value: 'unset', text: 'unset' },
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
        justifySelf: null
      },
      gridStyleCode: '',
      itemStyleCode: ''
    }
  },
  methods: {
    addItem() {
      var item = {
        gridColumn: null,
        gridRow: null,
        alignSelf: null,
        justifySelf: null
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
      this.items.push({
        name: 'item0',
        gridColumn: '1/span 2',
        gridRow: '1/2',
        alignSelf: null,
        justifySelf: null
      })
      this.items.push({
        name: 'item1',
        gridColumn: '3/4',
        gridRow: '1/span 2',
        alignSelf: null,
        justifySelf: null
      })
      this.items.push({
        name: 'item2',
        gridColumn: '2/span 2',
        gridRow: '3/4',
        alignSelf: null,
        justifySelf: null
      })
      this.items.push({
        name: 'item3',
        gridColumn: '1/2',
        gridRow: '2/span 2',
        alignSelf: null,
        justifySelf: null
      })
    },
    getGridCode() {
      setTimeout(() => {
        var el = document.querySelector('div.grid')
        var colorTerm = /\s--i.+?(color:#).{6};/g
        var code = el.style.cssText.replace(colorTerm, '')
        var dashedTerm = /--/g
        code = code.replace(dashedTerm, '')
        var addSpaceTerm = /(ns:|ws:)/g
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
    },
    returnLength(length, gridGap) {
      if (gridGap) {
        return 'calc(' + length + ' + ' + gridGap + ')'
      } else {
        return length
      }
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
        '--grid-auto-rows': this.gridAutoRows
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
    },
    gridTemplateColumnsArray() {
      var gridColumns = this.gridTemplateColumns.split(' ')
      var columnArray = []
      var columnObject = {}
      for (var i = 0; i < gridColumns.length; i++) {
        columnObject.name = 'col' + i
        columnObject.width = gridColumns[i]
        columnArray.push({
          name: columnObject.name,
          width: columnObject.width
        })
      }
      return columnArray
    },
    gridTemplateRowsArray() {
      var gridRows = this.gridTemplateRows.split(' ')
      var rowArray = []
      var rowObject = {}
      for (var i = 0; i < gridRows.length; i++) {
        rowObject.name = 'row' + i
        rowObject.height = gridRows[i]
        rowArray.push({
          name: rowObject.name,
          height: rowObject.height
        })
      }
      return rowArray
    },
    gridTop() {
      var whiteSpace = /\s/g
      var columnString = this.gridTemplateRows.replace(whiteSpace, ' + ')
      var calcString = 'calc(-1*(' + columnString + ') - ' + this.gridTemplateRowsArray.length.toString() + '*' + this.gridRowGap + ' + ' + this.gridRowGap + '/2)'
      if (this.checkGrid) {
        return {
          top: calcString
        }
      } else {
        return {
          top: 'unset'
        }
      }
    },
    checkGrid() {
      var regexp = /\d+\w+/g
      var columnArray = [...this.gridTemplateColumns.matchAll(regexp)]
      var rowArray = [...this.gridTemplateRows.matchAll(regexp)]
      if (columnArray.length == this.gridTemplateColumnsArray.length && rowArray.length == this.gridTemplateRowsArray.length) {
        return true
      } else {
        return false
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
.table {
  position: static;
}
tr, td {
  border: 1px dashed #c342d2;
}
.grid {
  display: grid;
  position: relative;
  grid-template-columns: var(--grid-template-columns);
  grid-template-rows: var(--grid-template-rows);
  grid-auto-columns: var(--grid-auto-columns);
  grid-auto-rows: var(--grid-auto-rows);
}
.grid > div {
  border: 1px solid #c342d2;
  background: var(--item-bg-color);
  opacity: 0.75;
}
.header-container {
  display: grid;
  place-content: center;
  grid-template-columns: repeat(auto-fit, 11em);
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
  .code, .item-code {
    grid-column: 1/3;
    place-self: center;
  }
}
</style>
