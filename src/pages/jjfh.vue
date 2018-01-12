<style scoped>
  
.box {
  display: flex;
  flex-direction: column;
}

.fix {
  flex-shrink: 0;
}

.flx {
  flex: 1 1 auto;
  overflow: auto;
}

</style>

<template>
  
<div class = "box" :id = "`box${rn}`">
  <mob-bar class = "fix" title = "基金分红详情" />
  <mob-list-fh
    class = "flx"
    :cols = "cols"
    :rows = "rows"
    :loading = "loading"
    :hasNextPage = "hasNextPage"
    :page = "page"
  />
</div>

</template>

<script>

import {
  getRnHex,
  getUrlParam
} from "commons/func.js";

import mobBar from "components/mob-bar.vue";
import mobListFh from "components/mob-list-fh.vue";

// const pro_name = getUrlParam("pro_name");
// const pro_code = getUrlParam("pro_code");

const { pro_name, pro_code } = getUrlParam(location.search);
let pos = 0;
const pageSize = 20;

const cols = [
  { title: "除息日", field: "dividend_date" },
  { title: "分红日", field: "payment_date" },
  { title: "说明", field: "payment_plan" }
];
  
export default {

  components: {
    mobBar,
    mobListFh
  },
  props: [],
  data() {
    return {
      rn: getRnHex(),
      loading: false,
      hasNextPage: true,
      rows: []
    };
  },

  methods: {

    autoHeight: function() {
      $(`#box${this.rn}`).css("height", $(window).height());
    },

    page: function() {

      this.loading = true;
      __hqCallTql.send("CWServ.tdxzx_jyfunc", [{
        "callno": "102",
        pro_code,
        "pos": pos,
        "count": pageSize
      }], res => {

        this.loading = false;
        let data = FormatResult(res);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        pos += pageSize;
        if(data.rows.length < pageSize) {
          this.hasNextPage = false;
        }

        this.rows = [...this.rows, ...data.rows];
      });
    }
  },

  computed: {

    cols: function() {
      return cols;
    }
  },

  mounted: function() {

    this.autoHeight();
    this.page();
  }
}

</script>