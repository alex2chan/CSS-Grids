<template lang="html">
  <div>
    <b-row>
      <b-col>
        <b-form-group
        label-for="itemBgColor"
        label="Item Background Color:">
          <b-form-input id="itemBgColor" type="color" v-model="itemBgColor"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
        label-for="align"
        label="Align Items:">
          <b-form-select id="align" v-model="alignItems" :options="options"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
        label-for="align"
        label="Justify Items:">
          <b-form-select id="align" v-model="justifyItems" :options="options"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
        label-for="align"
        label="Justify Content:">
          <b-form-select id="align" v-model="justifyContent" :options="justifyContentOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="container mb-5">
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
      <b-input-group
      class="mb-2"
      append="em"
      prepend="Grid Column Gap:">
        <b-form-input id="gridColumnGap" type="number" v-model="gridColumnGap"></b-form-input>
      </b-input-group>
      <b-input-group
      append="em"
      prepend="Grid Row Gap:">
        <b-form-input id="gridRowGap" type="number" v-model="gridRowGap"></b-form-input>
      </b-input-group>
    </div>
    <div class="text-center mb-5">
      <b-row>
        <b-col>
          <b-button
          variant="success"
          @click="addItem()">
          Add Item
          </b-button>
        </b-col>
        <b-col>
          <b-button
          variant="danger"
          @click="clearItems()">
          Clear All Items
          </b-button>
        </b-col>
      </b-row>
    </div>
    <div class="grid1 mb-5" :style="cssProps">
      <div class="itemA" v-for="item in items">
        {{ item }}
        <b-button
        variant="danger"
        size="sm"
        @click="removeItem(item)">
        X
        </b-button>
      </div>
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
      gridTemplateColumns: 'repeat(3, auto)',
      gridTemplateRows: 'repeat(3, auto)',
      gridAutoRows: '150px',
      gridAutoColumns: '150px',
      gridColumnGap: '1',
      gridRowGap: '1',
      gridAutoFlow: 'row',
      gridAutoFlowOptions: [
        { value: 'row', text: 'row' },
        { value: 'column', text: 'column' },
        { value: 'row-dense', text: 'row-dense' },
        { value: 'column-dense', text: 'column-dense' }
      ],
      options: [
        { value: 'start', text: 'start' },
        { value: 'end', text: 'end' },
        { value: 'center', text: 'center' },
        { value: 'stretch', text: 'stretch' }
      ],
      justifyContentOptions: [
        { value: 'start', text: 'start' },
        { value: 'end', text: 'end' },
        { value: 'center', text: 'center' },
        { value: 'stretch', text: 'stretch' },
        { value: 'space-around', text: 'space-around' },
        { value: 'space-between', text: 'space-between' },
        { value: 'space-evenly', text: 'space-evenly' }
      ],
      items: []
    }
  },
  mounted() {
    console.log(this.items.length)
  },
  methods: {
    addItem() {
      var l = this.items.length
      this.items.push('item' + l)
    },
    removeItem(item) {
      var idx = this.items.indexOf(item)
      this.items.splice(idx, 1)
    },
    clearItems() {
      this.items = []
    }
  },
  computed: {
    cssProps() {
      return {
        '--item-bg-color': this.itemBgColor,
        '--align-items': this.alignItems,
        '--justify-items': this.justifyItems,
        '--justify-content': this.justifyContent,
        '--grid-template-columns': this.gridTemplateColumns,
        '--grid-template-rows': this.gridTemplateRows,
        '--grid-auto-columns': this.gridAutoColumns,
        '--grid-auto-rows': this.gridAutoRows,
        '--grid-column-gap': this.gridColumnGap + 'em',
        '--grid-row-gap': this.gridRowGap + 'em',
        '--grid-auto-flow': this.gridAutoFlow
      }
    }
  }
}
</script>

<style lang="css" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
}
.grid1 {
  display: grid;
  justify-content: var(--justify-content);
  grid-template-columns: var(--grid-template-columns);
  grid-template-rows: var(--grid-template-rows);
  grid-auto-columns: var(--grid-auto-columns);
  grid-auto-rows: var(--grid-auto-rows);
  grid-column-gap: var(--grid-column-gap);
  grid-row-gap: var(--grid-row-gap);
  align-items: var(--align-items);
  justify-items: var(--justify-items);
  grid-auto-flow: var(--grid-auto-flow);
}
.grid1 > div {
  border: 1px solid #c342d2;
  background: var(--item-bg-color);
  padding: 5px;
  /* opacity: 0.35; */
}
/* .itemA {
  grid-column: var(--grid-column);
  grid-row: 2/3;
} */
/* .item-b {
  grid-column: 2/3;
  grid-row: 2/3;
}
.item-c {
  grid-column: 3/4;
  grid-row: 3/4;
}
.item-d {
  grid-column: 4/5;
  grid-row: 2/3;
}
.item-e {
  grid-column: 5/6;
  grid-row: 1/2;
} */
.input-width {
  width: 200px;
}
.container {
  display: grid;
  justify-content: center;
  grid-auto-columns: auto auto;
  grid-auto-flow: row;
}
</style>
